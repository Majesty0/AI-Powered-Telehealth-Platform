import { useState } from "react";

const samplePrescriptions = [
  {
    id: "RX001", date: "2025-07-10", doctor: "Dr. Amara Osei",
    medications: [
      { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Every 6 hours", duration: "5 days" },
      { name: "Amoxicillin 250mg", dosage: "1 capsule", frequency: "3x daily", duration: "7 days" },
    ],
    pharmacy: "MedCare Pharmacy, Nairobi",
  },
];

export default function Prescription() {
  const [prescriptions] = useState(samplePrescriptions);
  const [selected, setSelected] = useState(null);
  const [reminders, setReminders] = useState({});
  const [tab, setTab] = useState("list");

  const toggleReminder = (medName) => {
    setReminders(prev => ({ ...prev, [medName]: !prev[medName] }));
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>💊 Prescriptions & Pharmacy</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>View e-prescriptions, medication details, and find pharmacies.</p>

      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0" }}>
        {["list", "pharmacy", "reminders"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "12px", border: "none", cursor: "pointer", fontWeight: 600,
            fontSize: 13, background: tab === t ? "#1565c0" : "#fff", color: tab === t ? "#fff" : "#546e7a",
            textTransform: "capitalize"
          }}>
            {t === "list" ? "📋 Prescriptions" : t === "pharmacy" ? "🏪 Pharmacy" : "⏰ Reminders"}
          </button>
        ))}
      </div>

      {tab === "list" && (
        <div>
          {prescriptions.map(rx => (
            <div key={rx.id} style={{
              background: "#fff", borderRadius: 12, padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 16
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#0a2540" }}>Prescription #{rx.id}</div>
                  <div style={{ fontSize: 13, color: "#78909c" }}>{rx.doctor} · {rx.date}</div>
                </div>
                <span style={{
                  background: "#e8f5e9", color: "#2e7d32", padding: "4px 10px",
                  borderRadius: 20, fontSize: 12, fontWeight: 600
                }}>✅ Active</span>
              </div>
              {rx.medications.map((med, i) => (
                <div key={i} style={{
                  background: "#f8f9fa", borderRadius: 8, padding: "12px 16px", marginBottom: 10
                }}>
                  <div style={{ fontWeight: 600, color: "#0a2540", marginBottom: 4 }}>💊 {med.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12, color: "#546e7a" }}>
                    <span>Dosage: {med.dosage}</span>
                    <span>Frequency: {med.frequency}</span>
                    <span>Duration: {med.duration}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button style={{
                  padding: "8px 16px", background: "#1565c0", color: "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600
                }}>🚚 Order Delivery</button>
                <button style={{
                  padding: "8px 16px", background: "#f5f5f5", color: "#546e7a",
                  border: "1px solid #e0e0e0", borderRadius: 8, cursor: "pointer", fontSize: 13
                }}>📄 Download PDF</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "pharmacy" && (
        <div>
          {[
            { name: "MedCare Pharmacy", dist: "0.8 km", open: true, address: "Tom Mboya St, Nairobi" },
            { name: "HealthPlus Pharmacy", dist: "1.2 km", open: true, address: "Moi Ave, Nairobi" },
            { name: "City Chemist", dist: "2.1 km", open: false, address: "Ronald Ngala St, Nairobi" },
          ].map((p, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, padding: "16px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 12,
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ fontWeight: 700, color: "#0a2540" }}>🏪 {p.name}</div>
                <div style={{ fontSize: 13, color: "#78909c" }}>{p.address}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  📍 {p.dist} away ·{" "}
                  <span style={{ color: p.open ? "#2e7d32" : "#c62828", fontWeight: 600 }}>
                    {p.open ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
              <button disabled={!p.open} style={{
                padding: "8px 16px", background: p.open ? "#2e7d32" : "#b0bec5", color: "#fff",
                border: "none", borderRadius: 8, cursor: p.open ? "pointer" : "not-allowed",
                fontSize: 13, fontWeight: 600
              }}>
                Send Rx
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "reminders" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h4 style={{ color: "#0a2540", marginBottom: 16 }}>Medication Reminders</h4>
          {samplePrescriptions[0].medications.map((med, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0", borderBottom: "1px solid #f0f0f0"
            }}>
              <div>
                <div style={{ fontWeight: 600, color: "#0a2540" }}>{med.name}</div>
                <div style={{ fontSize: 13, color: "#78909c" }}>{med.frequency}</div>
              </div>
              <div
                onClick={() => toggleReminder(med.name)}
                style={{
                  width: 48, height: 26, borderRadius: 13,
                  background: reminders[med.name] ? "#1565c0" : "#e0e0e0",
                  cursor: "pointer", position: "relative", transition: "background 0.2s"
                }}
              >
                <div style={{
                  position: "absolute", top: 3, left: reminders[med.name] ? 24 : 3,
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
