import { useState } from "react";

const doctors = [
  { id: 1, name: "Dr. Amara Osei", spec: "General Practitioner", available: true, rating: 4.8, wait: "5 min" },
  { id: 2, name: "Dr. Fatima Musa", spec: "Internal Medicine", available: true, rating: 4.9, wait: "10 min" },
  { id: 3, name: "Dr. James Kariuki", spec: "Emergency Medicine", available: false, rating: 4.7, wait: "Unavailable" },
  { id: 4, name: "Dr. Nkechi Eze", spec: "Pulmonologist", available: true, rating: 4.6, wait: "15 min" },
];

export default function Consultation() {
  const [step, setStep] = useState("search");
  const [selected, setSelected] = useState(null);
  const [callType, setCallType] = useState("video");
  const [inCall, setInCall] = useState(false);
  const [timer, setTimer] = useState(0);
  const [notes, setNotes] = useState("");
  const [timerRef, setTimerRef] = useState(null);

  const startCall = () => {
    setInCall(true);
    const ref = setInterval(() => setTimer(t => t + 1), 1000);
    setTimerRef(ref);
  };

  const endCall = () => {
    setInCall(false);
    clearInterval(timerRef);
    setStep("summary");
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>📹 Virtual Consultation</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>Find a doctor and start a consultation.</p>

      {step === "search" && (
        <div>
          <h4 style={{ color: "#0a2540", marginBottom: 12 }}>Available Doctors</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {doctors.map(d => (
              <div key={d.id} style={{
                background: "#fff", borderRadius: 12, padding: "16px 20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)", display: "flex",
                alignItems: "center", justifyContent: "space-between",
                opacity: d.available ? 1 : 0.6
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", background: "#e3f2fd",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
                  }}>👨‍⚕️</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0a2540" }}>{d.name}</div>
                    <div style={{ fontSize: 13, color: "#78909c" }}>{d.spec}</div>
                    <div style={{ fontSize: 12, color: "#546e7a" }}>⭐ {d.rating} · Wait: {d.wait}</div>
                  </div>
                </div>
                <button
                  disabled={!d.available}
                  onClick={() => { setSelected(d); setStep("book"); }}
                  style={{
                    padding: "10px 18px", background: d.available ? "#1565c0" : "#b0bec5",
                    color: "#fff", border: "none", borderRadius: 8, cursor: d.available ? "pointer" : "not-allowed",
                    fontWeight: 600, fontSize: 13
                  }}
                >
                  {d.available ? "Book" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "book" && selected && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h4 style={{ color: "#0a2540", marginBottom: 20 }}>Book with {selected.name}</h4>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "#546e7a", display: "block", marginBottom: 10 }}>
              Consultation Type
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { id: "video", label: "📹 Video Call" },
                { id: "audio", label: "📞 Audio Call" },
                { id: "sign", label: "🤟 Sign Language" },
              ].map(t => (
                <button key={t.id} onClick={() => setCallType(t.id)} style={{
                  padding: "10px 16px", border: `2px solid ${callType === t.id ? "#1565c0" : "#e0e0e0"}`,
                  borderRadius: 8, background: callType === t.id ? "#e3f2fd" : "#fff",
                  cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#0a2540"
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "#546e7a", display: "block", marginBottom: 8 }}>
              Preferred Date & Time
            </label>
            <input type="datetime-local" style={{
              padding: "10px 14px", borderRadius: 8, border: "1px solid #cfd8dc",
              fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box"
            }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("call")} style={{
              padding: "12px 24px", background: "#1565c0", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
            }}>
              Confirm & Start →
            </button>
            <button onClick={() => setStep("search")} style={{
              padding: "12px 24px", background: "#f5f5f5", color: "#546e7a",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
            }}>
              Back
            </button>
          </div>
        </div>
      )}

      {step === "call" && (
        <div style={{ background: "#0a2540", borderRadius: 16, padding: 24, color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{selected?.name}</div>
              <div style={{ fontSize: 13, color: "#4fc3f7" }}>{callType} call · {formatTime(timer)}</div>
            </div>
            {!inCall ? (
              <button onClick={startCall} style={{
                padding: "10px 20px", background: "#2e7d32", color: "#fff",
                border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
              }}>▶ Start</button>
            ) : (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#c62828", borderRadius: 20, padding: "4px 12px", fontSize: 13
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff8a80", display: "inline-block" }} />
                Live
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{
              background: "#1e3a5f", borderRadius: 10, height: 180,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ fontSize: 48 }}>🧑</div>
              <div style={{ fontSize: 12, color: "#90caf9", marginTop: 8 }}>You</div>
            </div>
            <div style={{
              background: "#1e3a5f", borderRadius: 10, height: 180,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ fontSize: 48 }}>👨‍⚕️</div>
              <div style={{ fontSize: 12, color: "#90caf9", marginTop: 8 }}>{selected?.name}</div>
            </div>
          </div>

          {inCall && (
            <div style={{ background: "#1e3a5f", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#4fc3f7", marginBottom: 6 }}>🤖 AI Live Transcription</div>
              <div style={{ fontSize: 14, color: "#e0e0e0", fontStyle: "italic" }}>
                "Doctor: Please describe your symptoms in detail..."
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {["🎤", "📷", "💬"].map(icon => (
              <button key={icon} style={{
                width: 48, height: 48, borderRadius: "50%", background: "#1e3a5f",
                border: "none", color: "#fff", fontSize: 20, cursor: "pointer"
              }}>{icon}</button>
            ))}
            {inCall && (
              <button onClick={endCall} style={{
                width: 48, height: 48, borderRadius: "50%", background: "#c62828",
                border: "none", color: "#fff", fontSize: 20, cursor: "pointer"
              }}>📵</button>
            )}
          </div>
        </div>
      )}

      {step === "summary" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h4 style={{ color: "#0a2540", marginBottom: 20 }}>✅ Consultation Summary</h4>
          <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "14px 18px", marginBottom: 20, fontSize: 14, color: "#1b5e20" }}>
            Call with <strong>{selected?.name}</strong> completed. Duration: {formatTime(timer)}
          </div>
          <label style={{ fontWeight: 600, fontSize: 13, color: "#546e7a", display: "block", marginBottom: 8 }}>
            AI Generated Notes
          </label>
          <textarea
            value={notes || "Patient reported fever and body aches. Doctor recommends rest and paracetamol. Follow-up in 3 days."}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #cfd8dc",
              fontSize: 14, resize: "vertical", boxSizing: "border-box", outline: "none", marginBottom: 16
            }}
          />
          <button onClick={() => { setStep("search"); setTimer(0); setSelected(null); }} style={{
            padding: "12px 24px", background: "#1565c0", color: "#fff",
            border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
          }}>
            New Consultation
          </button>
        </div>
      )}
    </div>
  );
}
