import { useState } from "react";

const stats = [
  { label: "Total Users", value: "12,480", change: "+8%", icon: "👥", color: "#1565c0" },
  { label: "Consultations Today", value: "347", change: "+12%", icon: "📹", color: "#2e7d32" },
  { label: "Active Outbreaks", value: "2", change: "↑ 1", icon: "🚨", color: "#c62828" },
  { label: "Avg Response Time", value: "4.2 min", change: "-0.8 min", icon: "⚡", color: "#e65100" },
];

const trendData = [40, 65, 55, 80, 72, 90, 85, 100, 95, 110, 105, 120];
const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const maxVal = Math.max(...trendData);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>📊 Admin & Public Health Dashboard</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>
        Platform analytics, disease surveillance, and regional health monitoring.
      </p>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 12, padding: "18px 16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: s.change.includes("-") ? "#2e7d32" :
                  s.change.includes("↑") ? "#c62828" : "#1565c0",
                background: "#f5f5f5", borderRadius: 10, padding: "2px 8px"
              }}>{s.change}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, margin: "8px 0 2px" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#78909c" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid #e0e0e0", marginBottom: 20 }}>
        {["overview", "outbreaks", "regions"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
            fontWeight: 600, fontSize: 13, color: activeTab === t ? "#1565c0" : "#78909c",
            borderBottom: activeTab === t ? "2px solid #1565c0" : "2px solid transparent",
            marginBottom: -2, textTransform: "capitalize"
          }}>{t}</button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div>
          {/* Consultation trend chart */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 16 }}>
            <h4 style={{ color: "#0a2540", marginBottom: 20 }}>Consultation Trend (Last 12 Months)</h4>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
              {trendData.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 10, color: "#78909c" }}>{v}</div>
                  <div style={{
                    width: "100%", borderRadius: "4px 4px 0 0",
                    background: i === trendData.length - 1 ? "#1565c0" : "#90caf9",
                    height: `${(v / maxVal) * 100}px`, transition: "height 0.3s"
                  }} />
                  <div style={{ fontSize: 9, color: "#b0bec5" }}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty breakdown */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h4 style={{ color: "#0a2540", marginBottom: 16 }}>Consultations by Specialty</h4>
            {[
              { name: "General Practice", pct: 42, color: "#1565c0" },
              { name: "Internal Medicine", pct: 28, color: "#2e7d32" },
              { name: "Pediatrics", pct: 18, color: "#e65100" },
              { name: "Emergency", pct: 12, color: "#c62828" },
            ].map(s => (
              <div key={s.name} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: "#0a2540", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ color: "#78909c" }}>{s.pct}%</span>
                </div>
                <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4 }}>
                  <div style={{ height: 8, width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "outbreaks" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h4 style={{ color: "#0a2540", marginBottom: 16 }}>Active Outbreak Monitoring</h4>
          {[
            { disease: "Cholera", regions: "Mombasa, Nakuru", cases: 901, trend: "↑ Rising", alert: "High" },
            { disease: "Malaria", regions: "Nairobi, Eldoret", cases: 257, trend: "→ Stable", alert: "Medium" },
          ].map((o, i) => (
            <div key={i} style={{
              border: `1px solid ${o.alert === "High" ? "#ffcdd2" : "#ffe0b2"}`,
              borderRadius: 10, padding: "16px 20px", marginBottom: 14,
              background: o.alert === "High" ? "#fff8f8" : "#fffbf5"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: "#0a2540", fontSize: 16 }}>🦠 {o.disease}</span>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: o.alert === "High" ? "#ffebee" : "#fff3e0",
                  color: o.alert === "High" ? "#c62828" : "#e65100"
                }}>{o.alert} Alert</span>
              </div>
              <div style={{ fontSize: 13, color: "#546e7a" }}>📍 Regions: {o.regions}</div>
              <div style={{ fontSize: 13, color: "#546e7a" }}>Cases: <strong>{o.cases.toLocaleString()}</strong> · Trend: {o.trend}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "regions" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h4 style={{ color: "#0a2540", marginBottom: 16 }}>Regional Health Summary</h4>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                {["Region", "Users", "Consultations", "High Risk Cases", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#78909c", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { region: "Nairobi", users: 5240, consultations: 142, high: 18, status: "Normal" },
                { region: "Mombasa", users: 2890, consultations: 98, high: 45, status: "Alert" },
                { region: "Kisumu", users: 1650, consultations: 54, high: 6, status: "Normal" },
                { region: "Nakuru", users: 2100, consultations: 53, high: 38, status: "Alert" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: "#0a2540" }}>{r.region}</td>
                  <td style={{ padding: "12px", color: "#546e7a" }}>{r.users.toLocaleString()}</td>
                  <td style={{ padding: "12px", color: "#546e7a" }}>{r.consultations}</td>
                  <td style={{ padding: "12px", color: r.high > 20 ? "#c62828" : "#546e7a", fontWeight: r.high > 20 ? 700 : 400 }}>{r.high}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700,
                      background: r.status === "Alert" ? "#ffebee" : "#e8f5e9",
                      color: r.status === "Alert" ? "#c62828" : "#2e7d32"
                    }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
