import { useState } from "react";

const regions = [
  { name: "Nairobi", risk: "Medium", cases: 234, disease: "Malaria", lat: 45, lng: 50 },
  { name: "Mombasa", risk: "High", cases: 512, disease: "Cholera", lat: 75, lng: 70 },
  { name: "Kisumu", risk: "Low", cases: 45, disease: "Influenza", lat: 30, lng: 35 },
  { name: "Nakuru", risk: "High", cases: 389, disease: "Cholera", lat: 55, lng: 25 },
  { name: "Eldoret", risk: "Low", cases: 23, disease: "Malaria", lat: 20, lng: 50 },
];

const riskColor = { High: "#c62828", Medium: "#e65100", Low: "#2e7d32" };
const riskBg = { High: "#ffebee", Medium: "#fff3e0", Low: "#e8f5e9" };

export default function Surveillance() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const diseases = ["All", "Cholera", "Malaria", "Ebola", "Influenza"];
  const filtered = filter === "All" ? regions : regions.filter(r => r.disease === filter);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>🗺️ Disease Surveillance AI</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>
        Real-time AI detection of outbreak patterns from anonymized health signals.
      </p>

      {/* Alert banner */}
      <div style={{
        background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 10,
        padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12
      }}>
        <span style={{ fontSize: 24 }}>⚠️</span>
        <div>
          <strong style={{ color: "#795548" }}>AI Alert:</strong>
          <span style={{ color: "#795548", fontSize: 14 }}> Cholera outbreak signal detected in Mombasa and Nakuru regions. Risk level: High.</span>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {diseases.map(d => (
          <button key={d} onClick={() => setFilter(d)} style={{
            padding: "6px 16px", borderRadius: 20, border: `1px solid ${filter === d ? "#1565c0" : "#e0e0e0"}`,
            background: filter === d ? "#1565c0" : "#fff", color: filter === d ? "#fff" : "#546e7a",
            cursor: "pointer", fontSize: 13, fontWeight: 500
          }}>{d}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Heatmap */}
        <div style={{
          background: "#0a2540", borderRadius: 12, padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)", position: "relative", minHeight: 300
        }}>
          <div style={{ fontWeight: 600, color: "#4fc3f7", marginBottom: 14, fontSize: 13 }}>📍 Outbreak Heatmap</div>
          <div style={{ position: "relative", height: 240, background: "#1e3a5f", borderRadius: 8, overflow: "hidden" }}>
            {/* Simulated country outline */}
            <svg viewBox="0 0 100 100" style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.3 }}>
              <path d="M20,10 L80,10 L90,50 L75,90 L50,95 L25,85 L10,60 Z" fill="#2a4a6b" stroke="#4fc3f7" strokeWidth="0.5" />
            </svg>
            {filtered.map(r => (
              <div key={r.name} onClick={() => setSelected(r)} style={{
                position: "absolute", left: `${r.lng}%`, top: `${r.lat}%`,
                width: r.risk === "High" ? 24 : r.risk === "Medium" ? 18 : 14,
                height: r.risk === "High" ? 24 : r.risk === "Medium" ? 18 : 14,
                borderRadius: "50%", background: riskColor[r.risk], opacity: 0.85,
                cursor: "pointer", transform: "translate(-50%, -50%)",
                boxShadow: `0 0 ${r.risk === "High" ? "16px" : "8px"} ${riskColor[r.risk]}`,
                transition: "all 0.2s"
              }} title={r.name} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {["High", "Medium", "Low"].map(l => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#90caf9" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: riskColor[l], display: "inline-block" }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Region list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(r => (
            <div key={r.name} onClick={() => setSelected(r)} style={{
              background: selected?.name === r.name ? riskBg[r.risk] : "#fff",
              borderRadius: 10, padding: "14px 16px", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: `1px solid ${selected?.name === r.name ? riskColor[r.risk] : "#e0e0e0"}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#0a2540" }}>📍 {r.name}</div>
                  <div style={{ fontSize: 13, color: "#546e7a" }}>{r.disease} · {r.cases} cases</div>
                </div>
                <span style={{
                  background: riskBg[r.risk], color: riskColor[r.risk], padding: "4px 10px",
                  borderRadius: 20, fontSize: 12, fontWeight: 700
                }}>
                  {r.risk} Risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={{
          background: "#fff", borderRadius: 12, padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginTop: 16,
          borderLeft: `4px solid ${riskColor[selected.risk]}`
        }}>
          <h4 style={{ color: "#0a2540", marginBottom: 10 }}>🤖 AI Prediction — {selected.name}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { label: "Active Cases", value: selected.cases },
              { label: "Risk Level", value: selected.risk },
              { label: "Primary Disease", value: selected.disease },
            ].map(stat => (
              <div key={stat.label} style={{ background: "#f8f9fa", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#78909c", fontWeight: 600, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0a2540" }}>{stat.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#f8f9fa", borderRadius: 8, padding: "12px 14px", fontSize: 14, color: "#546e7a" }}>
            🤖 <strong>AI Forecast:</strong> Based on current symptom reports, pharmacy demand, and clinic visits,
            cases in {selected.name} are projected to {selected.risk === "High" ? "increase by 30% over the next 7 days" :
              selected.risk === "Medium" ? "stabilize within 5 days with intervention" : "remain contained"}.
          </div>
        </div>
      )}
    </div>
  );
}
