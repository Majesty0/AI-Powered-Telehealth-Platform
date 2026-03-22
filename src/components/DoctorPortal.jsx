import { useState } from "react";

const queue = [
  { id: 1, name: "James Mwangi", age: 34, risk: "High", symptoms: "Fever, chest pain", wait: "2 min", triage: "Emergency Physician" },
  { id: 2, name: "Aisha Kamau", age: 28, risk: "Medium", symptoms: "Headache, fatigue", wait: "8 min", triage: "GP" },
  { id: 3, name: "Peter Otieno", age: 52, risk: "Low", symptoms: "Cold, runny nose", wait: "14 min", triage: "GP" },
];

const riskColor = { High: "#c62828", Medium: "#e65100", Low: "#2e7d32" };

export default function DoctorPortal() {
  const [selected, setSelected] = useState(null);
  const [rx, setRx] = useState("");
  const [issued, setIssued] = useState(false);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>👨‍⚕️ Doctor Portal</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>Patient queue, AI triage insights, and prescription management.</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "In Queue", value: queue.length, icon: "👥", color: "#1565c0" },
          { label: "Completed Today", value: 12, icon: "✅", color: "#2e7d32" },
          { label: "Avg. Wait", value: "8 min", icon: "⏱️", color: "#e65100" },
          { label: "High Risk", value: 1, icon: "🚨", color: "#c62828" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 10, padding: "14px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center"
          }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#78909c" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}>
        {/* Queue */}
        <div>
          <h4 style={{ color: "#0a2540", marginBottom: 12 }}>Patient Queue</h4>
          {queue.map(p => (
            <div key={p.id} onClick={() => { setSelected(p); setIssued(false); setRx(""); }} style={{
              background: selected?.id === p.id ? "#e3f2fd" : "#fff", borderRadius: 10,
              padding: "14px 16px", cursor: "pointer", marginBottom: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: `1px solid ${selected?.id === p.id ? "#1565c0" : "#e0e0e0"}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: "#0a2540" }}>👤 {p.name}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12,
                  background: `${riskColor[p.risk]}20`, color: riskColor[p.risk]
                }}>{p.risk}</span>
              </div>
              <div style={{ fontSize: 13, color: "#546e7a" }}>{p.symptoms}</div>
              <div style={{ fontSize: 12, color: "#78909c", marginTop: 4 }}>⏱️ Waiting {p.wait}</div>
            </div>
          ))}
        </div>

        {/* Patient detail */}
        {selected ? (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h4 style={{ color: "#0a2540", marginBottom: 4 }}>{selected.name}</h4>
            <div style={{ fontSize: 13, color: "#78909c", marginBottom: 16 }}>Age: {selected.age}</div>

            <div style={{
              background: "#e3f2fd", borderRadius: 8, padding: "12px 14px", marginBottom: 14
            }}>
              <div style={{ fontSize: 12, color: "#1565c0", fontWeight: 600, marginBottom: 6 }}>🤖 AI Triage Summary</div>
              <div style={{ fontSize: 14, color: "#0a2540" }}>Symptoms: <strong>{selected.symptoms}</strong></div>
              <div style={{ fontSize: 14, color: "#0a2540", marginTop: 4 }}>
                Risk: <strong style={{ color: riskColor[selected.risk] }}>{selected.risk}</strong>
              </div>
              <div style={{ fontSize: 14, color: "#0a2540", marginTop: 4 }}>Recommended: {selected.triage}</div>
            </div>

            <div style={{
              background: "#fff3e0", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: "#795548"
            }}>
              💡 <strong>AI Clinical Insight:</strong> Patient presents with {selected.symptoms.toLowerCase()}.
              Consider {selected.risk === "High" ? "immediate evaluation and ECG" : "symptom management and follow-up"}.
            </div>

            <label style={{ fontWeight: 600, fontSize: 13, color: "#546e7a", display: "block", marginBottom: 8 }}>
              Issue Prescription
            </label>
            <textarea
              value={rx}
              onChange={e => setRx(e.target.value)}
              placeholder="e.g. Paracetamol 500mg — 3x daily for 5 days"
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cfd8dc",
                fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", marginBottom: 12
              }}
            />
            {!issued ? (
              <button onClick={() => setIssued(true)} style={{
                width: "100%", padding: "12px", background: "#2e7d32", color: "#fff",
                border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
              }}>
                ✅ Issue Prescription
              </button>
            ) : (
              <div style={{
                background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: 8,
                padding: "12px", textAlign: "center", color: "#2e7d32", fontWeight: 600, fontSize: 14
              }}>
                ✅ Prescription sent to {selected.name}'s account
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#b0bec5", fontSize: 14
          }}>
            Select a patient to view details
          </div>
        )}
      </div>
    </div>
  );
}
