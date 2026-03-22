import { useState } from "react";

const records = {
  consultations: [
    { date: "2025-07-10", doctor: "Dr. Amara Osei", diagnosis: "Upper Respiratory Infection", notes: "Rest and fluids advised" },
    { date: "2025-06-15", doctor: "Dr. Fatima Musa", diagnosis: "Mild Dehydration", notes: "ORS and monitoring" },
  ],
  prescriptions: [
    { date: "2025-07-10", medication: "Paracetamol 500mg", status: "Active" },
    { date: "2025-06-15", medication: "ORS Sachets", status: "Completed" },
  ],
  labResults: [
    { date: "2025-07-08", test: "Full Blood Count", result: "Normal", lab: "PathCare Labs" },
    { date: "2025-06-10", test: "Malaria RDT", result: "Negative", lab: "City Lab" },
  ],
  vaccinations: [
    { vaccine: "COVID-19 (Moderna)", date: "2024-03-12", next: "N/A" },
    { vaccine: "Yellow Fever", date: "2023-08-20", next: "2033-08-20" },
    { vaccine: "Influenza", date: "2024-10-01", next: "2025-10-01" },
  ],
};

export default function HealthRecords({ user }) {
  const [tab, setTab] = useState("consultations");
  const tabs = ["consultations", "prescriptions", "labResults", "vaccinations"];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>📋 Health Records</h2>
      <p style={{ color: "#546e7a", marginBottom: 16, fontSize: 14 }}>
        {user ? `${user.name}'s` : "Your"} complete medical history.
      </p>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Consultations", value: records.consultations.length, icon: "📹" },
          { label: "Prescriptions", value: records.prescriptions.length, icon: "💊" },
          { label: "Lab Results", value: records.labResults.length, icon: "🧪" },
          { label: "Vaccinations", value: records.vaccinations.length, icon: "💉" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 10, padding: "14px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center"
          }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#0a2540", margin: "4px 0" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#78909c" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid #e0e0e0", marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
            fontWeight: 600, fontSize: 13, color: tab === t ? "#1565c0" : "#78909c",
            borderBottom: tab === t ? "2px solid #1565c0" : "2px solid transparent",
            marginBottom: -2, textTransform: "capitalize"
          }}>
            {t.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {tab === "consultations" && records.consultations.map((c, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 10, padding: "16px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: "#0a2540" }}>📹 {c.doctor}</span>
            <span style={{ fontSize: 12, color: "#78909c" }}>{c.date}</span>
          </div>
          <div style={{ fontSize: 14, color: "#0a2540", marginBottom: 4 }}>Diagnosis: <strong>{c.diagnosis}</strong></div>
          <div style={{ fontSize: 13, color: "#546e7a" }}>📝 {c.notes}</div>
        </div>
      ))}

      {tab === "prescriptions" && records.prescriptions.map((p, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 10, padding: "16px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontWeight: 700, color: "#0a2540" }}>💊 {p.medication}</div>
            <div style={{ fontSize: 12, color: "#78909c" }}>{p.date}</div>
          </div>
          <span style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: p.status === "Active" ? "#e8f5e9" : "#f5f5f5",
            color: p.status === "Active" ? "#2e7d32" : "#78909c"
          }}>{p.status}</span>
        </div>
      ))}

      {tab === "labResults" && records.labResults.map((l, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 10, padding: "16px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontWeight: 700, color: "#0a2540" }}>🧪 {l.test}</span>
            <span style={{ fontSize: 12, color: "#78909c" }}>{l.date}</span>
          </div>
          <div style={{ fontSize: 14, color: "#0a2540" }}>
            Result: <strong style={{ color: l.result === "Normal" || l.result === "Negative" ? "#2e7d32" : "#c62828" }}>{l.result}</strong>
          </div>
          <div style={{ fontSize: 12, color: "#78909c", marginTop: 4 }}>Lab: {l.lab}</div>
        </div>
      ))}

      {tab === "vaccinations" && records.vaccinations.map((v, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 10, padding: "16px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontWeight: 700, color: "#0a2540" }}>💉 {v.vaccine}</div>
            <div style={{ fontSize: 12, color: "#78909c" }}>Given: {v.date}</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 12 }}>
            <div style={{ color: "#78909c" }}>Next due:</div>
            <div style={{ fontWeight: 600, color: v.next === "N/A" ? "#2e7d32" : "#e65100" }}>{v.next}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
