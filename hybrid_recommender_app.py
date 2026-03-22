import heapq
import time
from collections import defaultdict

import networkx as nx
import pandas as pd
import streamlit as st


class HybridRecommendationEngine:
    def __init__(self, interactions):
        self.graph = nx.Graph()
        self.user_items = defaultdict(dict)
        self.item_users = defaultdict(dict)
        self._build_graph(interactions)

    @staticmethod
    def _u_node(user_id):
        return f"U:{user_id}"

    @staticmethod
    def _i_node(item_id):
        return f"I:{item_id}"

    def _build_graph(self, interactions):
        for user_id, item_id, rating in interactions:
            self.add_interaction(user_id, item_id, rating)

    def add_interaction(self, user_id, item_id, rating):
        self.user_items[user_id][item_id] = rating
        self.item_users[item_id][user_id] = rating
        self.graph.add_node(self._u_node(user_id), node_type="user")
        self.graph.add_node(self._i_node(item_id), node_type="item")
        self.graph.add_edge(self._u_node(user_id), self._i_node(item_id), weight=rating)

    def _user_similarity(self, u1, u2):
        items_u1 = self.user_items[u1]
        items_u2 = self.user_items[u2]
        if not items_u1 or not items_u2:
            return 0.0

        set_u1 = set(items_u1)
        set_u2 = set(items_u2)
        common = set_u1 & set_u2
        if not common:
            return 0.0

        graph_overlap = len(common) / ((len(set_u1) * len(set_u2)) ** 0.5)

        dot = sum(items_u1[item] * items_u2[item] for item in common)
        norm_u1 = sum(score * score for score in items_u1.values()) ** 0.5
        norm_u2 = sum(score * score for score in items_u2.values()) ** 0.5
        cosine = dot / (norm_u1 * norm_u2) if norm_u1 > 0 and norm_u2 > 0 else 0.0

        return 0.6 * graph_overlap + 0.4 * cosine

    def _item_similarity(self, i1, i2):
        users_i1 = self.item_users[i1]
        users_i2 = self.item_users[i2]
        if not users_i1 or not users_i2:
            return 0.0

        set_i1 = set(users_i1)
        set_i2 = set(users_i2)
        common_users = set_i1 & set_i2
        if not common_users:
            return 0.0

        graph_overlap = len(common_users) / ((len(set_i1) * len(set_i2)) ** 0.5)

        dot = sum(users_i1[user] * users_i2[user] for user in common_users)
        norm_i1 = sum(score * score for score in users_i1.values()) ** 0.5
        norm_i2 = sum(score * score for score in users_i2.values()) ** 0.5
        cosine = dot / (norm_i1 * norm_i2) if norm_i1 > 0 and norm_i2 > 0 else 0.0

        return 0.6 * graph_overlap + 0.4 * cosine

    def find_similar_users(self, user_id, top_k=3):
        if user_id not in self.user_items:
            return []

        candidates = []
        for other_user in self.user_items:
            if other_user == user_id:
                continue
            similarity = self._user_similarity(user_id, other_user)
            if similarity > 0:
                candidates.append((similarity, other_user))

        top = heapq.nlargest(top_k, candidates)
        return [(user, score) for score, user in top]

    def find_similar_items(self, item_id, top_k=3):
        if item_id not in self.item_users:
            return []

        candidates = []
        for other_item in self.item_users:
            if other_item == item_id:
                continue
            similarity = self._item_similarity(item_id, other_item)
            if similarity > 0:
                candidates.append((similarity, other_item))

        top = heapq.nlargest(top_k, candidates)
        return [(item, score) for score, item in top]

    def recommend_top_n(self, user_id, top_n=5, neighbor_k=3):
        if user_id not in self.user_items:
            return []

        seen_items = set(self.user_items[user_id])
        all_items = set(self.item_users)
        candidate_items = all_items - seen_items
        if not candidate_items:
            return []

        similar_users = self.find_similar_users(user_id, top_k=neighbor_k)

        user_cf_scores = defaultdict(float)
        for neighbor_id, sim_score in similar_users:
            for item_id, rating in self.user_items[neighbor_id].items():
                if item_id not in seen_items:
                    user_cf_scores[item_id] += sim_score * rating

        item_cf_scores = defaultdict(float)
        for seen_item, user_rating in self.user_items[user_id].items():
            for candidate in candidate_items:
                sim_item = self._item_similarity(seen_item, candidate)
                if sim_item > 0:
                    item_cf_scores[candidate] += sim_item * user_rating

        popularity_scores = {}
        total_users = max(1, len(self.user_items))
        for item in candidate_items:
            popularity_scores[item] = len(self.item_users[item]) / total_users

        final_scored = []
        for item in candidate_items:
            score = (
                0.65 * user_cf_scores[item]
                + 0.25 * item_cf_scores[item]
                + 0.10 * popularity_scores[item]
            )
            final_scored.append((score, item))

        top_items = heapq.nlargest(top_n, final_scored)
        return [
            {
                "item": item,
                "score": round(score, 4),
                "user_cf": round(user_cf_scores[item], 4),
                "item_cf": round(item_cf_scores[item], 4),
                "popularity": round(popularity_scores[item], 4),
            }
            for score, item in top_items
        ]

    def recommend_realtime(self, user_id, top_n=5, neighbor_k=3):
        started = time.perf_counter()
        results = self.recommend_top_n(user_id, top_n=top_n, neighbor_k=neighbor_k)
        elapsed_ms = (time.perf_counter() - started) * 1000
        return results, round(elapsed_ms, 3)


def default_interactions():
    return [
        ("U1", "I1", 5.0), ("U1", "I2", 4.0), ("U1", "I3", 2.5),
        ("U2", "I1", 4.5), ("U2", "I3", 3.0), ("U2", "I4", 4.0),
        ("U3", "I2", 5.0), ("U3", "I4", 3.5), ("U3", "I5", 4.0),
        ("U4", "I1", 2.0), ("U4", "I5", 4.5), ("U4", "I6", 5.0),
        ("U5", "I2", 4.5), ("U5", "I3", 4.0), ("U5", "I6", 3.5),
    ]


def build_engine(interactions):
    return HybridRecommendationEngine(interactions)


st.set_page_config(page_title="Hybrid Recommendation Engine", layout="wide")
st.title("Hybrid Recommendation Engine Prototype")
st.caption("Graph-based collaborative filtering + similar user/item search + top-N real-time ranking")

if "interactions" not in st.session_state:
    st.session_state.interactions = default_interactions()

engine = build_engine(st.session_state.interactions)

all_users = sorted(engine.user_items.keys())
all_items = sorted(engine.item_users.keys())

with st.sidebar:
    st.header("Controls")
    target_user = st.selectbox("Target User", all_users, index=0)
    top_n = st.slider("Top N Items", min_value=1, max_value=10, value=4)
    neighbor_k = st.slider("Neighbor Search K", min_value=1, max_value=5, value=3)
    probe_item = st.selectbox("Probe Item (similar items)", all_items, index=0)

st.subheader("Current Recommendation Output")
recommendations, latency_ms = engine.recommend_realtime(target_user, top_n=top_n, neighbor_k=neighbor_k)

if recommendations:
    st.write(f"Realtime latency: **{latency_ms} ms**")
    st.dataframe(pd.DataFrame(recommendations), use_container_width=True)
else:
    st.warning("No candidate items available for this user.")

col1, col2 = st.columns(2)
with col1:
    st.subheader("Most Similar Users")
    similar_users = engine.find_similar_users(target_user, top_k=neighbor_k)
    if similar_users:
        st.dataframe(
            pd.DataFrame(similar_users, columns=["user", "similarity"]),
            use_container_width=True,
        )
    else:
        st.info("No similar users found.")

with col2:
    st.subheader("Most Similar Items")
    similar_items = engine.find_similar_items(probe_item, top_k=neighbor_k)
    if similar_items:
        st.dataframe(
            pd.DataFrame(similar_items, columns=["item", "similarity"]),
            use_container_width=True,
        )
    else:
        st.info("No similar items found.")

st.subheader("Real-Time Interaction Update")
u_col, i_col, r_col, a_col = st.columns([1, 1, 1, 1])

with u_col:
    update_user = st.selectbox("User", all_users, index=0, key="update_user")
with i_col:
    update_item = st.selectbox("Item", all_items, index=0, key="update_item")
with r_col:
    update_rating = st.slider("Rating", min_value=1.0, max_value=5.0, value=4.0, step=0.5)

with a_col:
    st.write("")
    st.write("")
    if st.button("Apply Update", use_container_width=True):
        st.session_state.interactions = [
            (u, i, r)
            for (u, i, r) in st.session_state.interactions
            if not (u == update_user and i == update_item)
        ]
        st.session_state.interactions.append((update_user, update_item, float(update_rating)))
        st.success(f"Updated interaction: {update_user} -> {update_item} = {update_rating}")
        st.rerun()