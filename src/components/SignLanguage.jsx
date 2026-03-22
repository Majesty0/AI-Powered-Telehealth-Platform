import { useState, useRef } from "react";

export default function SignLanguage() {
  const [mode, setMode] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [doctorInput, setDoctorInput] = useState("");
  const videoRef = useRef(null);

  const signs = ["Hello", "Pain", "Help", "Fever", "Medicine", "Doctor", "Yes", "No"];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      alert("Camera access denied or unavailable in this browser.");
    }
  };

  const simulateDetection = () => {
    const detected = signs[Math.floor(Math.random() * signs.length)];
    setTranscript(prev => [...prev, { from: "patient", text: detected, time: new Date().toLocaleTimeString() }]);
  };

  const doctorSend = () => {
    if (!doctorInput.trim()) return;
    setTranscript(prev => [...prev, { from: "doctor", text: doctorInput, time: new Date().toLocaleTimeString() }]);
    setDoctorInput("");
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>🤟 AI Sign Language Interpreter</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>
        Bridging communication between hearing-impaired patients and doctors in real time.
      </p>

      {!mode && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { id: "patient", icon: "🧑‍🦯", title: "Patient Mode", desc: "Sign via camera → AI converts to text for doctor" },
            { id: "doctor", icon: "👨‍⚕️", title: "Doctor Mode", desc: "Speak/type → AI converts to sign language for patient" },
          ].map(m => (
            <div key={m.id} onClick={() => setMode(m.id)} style={{
              background: "#fff", borderRadius: 12, padding: 28, cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center",
              border: "2px solid transparent", transition: "all 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#1565c0"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#0a2540", marginBottom: 8 }}>{m.title}</div>
              <div style={{ fontSize: 13, color: "#78909c" }}>{m.desc}</div>
            </div>
          ))}
        </div>
      )}

      {mode && (
        <div>
          <button onClick={() => { setMode(null); setCameraActive(false); }} style={{
            marginBottom: 16, background: "none", border: "none", color: "#1565c0",
            cursor: "pointer", fontSize: 14, fontWeight: 600
          }}>← Back</button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Camera / Avatar Panel */}
            <div style={{ background: "#0a2540", borderRadius: 12, padding: 16, minHeight: 280 }}>
              <div style={{ fontSize: 12, color: "#4fc3f7", fontWeight: 600, marginBottom: 12 }}>
                {mode === "patient" ? "📷 Camera Feed" : "🤖 AI Sign Avatar"}
              </div>
              {mode === "patient" ? (
                <>
                  <video ref={videoRef} autoPlay muted style={{
                    width: "100%", borderRadius: 8, background: "#1e3a5f",
                    minHeight: 180, display: "block"
                  }} />
                  {!cameraActive && (
                    <button onClick={startCamera} style={{
                      marginTop: 12, width: "100%", padding: "10px", background: "#1565c0",
                      color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
                    }}>
                      Enable Camera
                    </button>
                  )}
                  {cameraActive && (
                    <div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8, marginTop: 10,
                        color: "#4fc3f7", fontSize: 13
                      }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: "50%", background: "#4fc3f7",
                          display: "inline-block", animation: "pulse 1s infinite"
                        }} />
                        Detecting signs...
                      </div>
                      <button onClick={simulateDetection} style={{
                        marginTop: 8, width: "100%", padding: "10px", background: "#2e7d32",
                        color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13
                      }}>
                        🤟 Simulate Sign Detection
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  background: "#1e3a5f", borderRadius: 8, minHeight: 200, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#4fc3f7"
                }}>
                  <div style={{ fontSize: 72 }}>🤖</div>
                  <div style={{ fontSize: 13, marginTop: 8 }}>AI Sign Avatar</div>
                  <div style={{ fontSize: 11, color: "#78909c", marginTop: 4 }}>
                    Translating doctor speech to signs
                  </div>
                </div>
              )}
            </div>

            {/* Transcript Panel */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ fontWeight: 600, color: "#0a2540", marginBottom: 12, fontSize: 13 }}>
                📝 Live Transcript
              </div>
              <div style={{ minHeight: 180, overflowY: "auto", marginBottom: 12 }}>
                {transcript.length === 0 && (
                  <div style={{ color: "#b0bec5", fontSize: 13, textAlign: "center", marginTop: 60 }}>
                    Conversation will appear here
                  </div>
                )}
                {transcript.map((t, i) => (
                  <div key={i} style={{
                    marginBottom: 10, display: "flex",
                    justifyContent: t.from === "patient" ? "flex-start" : "flex-end"
                  }}>
                    <div style={{
                      maxWidth: "80%", padding: "8px 12px", borderRadius: 10,
                      background: t.from === "patient" ? "#e3f2fd" : "#e8f5e9",
                      fontSize: 13, color: "#0a2540"
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 11, color: "#78909c", marginBottom: 2 }}>
                        {t.from === "patient" ? "🧑 Patient (via signs)" : "👨‍⚕️ Doctor"} · {t.time}
                      </div>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
              {mode === "doctor" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={doctorInput}
                    onChange={e => setDoctorInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && doctorSend()}
                    placeholder="Type to patient..."
                    style={{
                      flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #cfd8dc",
                      fontSize: 13, outline: "none"
                    }}
                  />
                  <button onClick={doctorSend} style={{
                    padding: "8px 14px", background: "#1565c0", color: "#fff",
                    border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
                  }}>Send</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
