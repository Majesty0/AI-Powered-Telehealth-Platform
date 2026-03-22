import { useState } from "react";

const Card = ({ children, style }) => (
  <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, style, variant = "primary" }) => (
  <button onClick={onClick} style={{
    padding: "12px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600,
    fontSize: 14, transition: "opacity 0.2s",
    background: variant === "primary" ? "#1565c0" : variant === "success" ? "#2e7d32" : "#e0e0e0",
    color: variant === "outline" ? "#333" : "#fff",
    ...style
  }}>
    {children}
  </button>
);

export default function Onboarding({ setUser, setAccessMode }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", otp: "" });
  const [selectedMode, setSelectedMode] = useState("standard");
  const [otpSent, setOtpSent] = useState(false);

  const modes = [
    { id: "standard", label: "Standard User", icon: "👤", desc: "Full visual interface" },
    { id: "hearing", label: "Hearing Impaired", icon: "🤟", desc: "Sign language + captions" },
    { id: "visual", label: "Visually Impaired", icon: "🎙️", desc: "Voice-first navigation" },
  ];

  const steps = ["Welcome", "Accessibility", "Register", "Verify"];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 6 }}>User Onboarding</h2>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s} style={{
            flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 6, fontSize: 12, fontWeight: 600,
            background: step === i ? "#1565c0" : step > i ? "#4caf50" : "#e0e0e0",
            color: step >= i ? "#fff" : "#999"
          }}>{s}</div>
        ))}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <Card>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 64 }}>🏥</div>
            <h2 style={{ color: "#0a2540", margin: "16px 0 8px" }}>Welcome to AfyaEdge AI</h2>
            <p style={{ color: "#546e7a", marginBottom: 28 }}>
              Inclusive AI-powered telemedicine for everyone — including those with hearing and visual impairments.
            </p>
            <Btn onClick={() => setStep(1)}>Get Started →</Btn>
          </div>
        </Card>
      )}

      {/* Step 1: Accessibility mode */}
      {step === 1 && (
        <Card>
          <h3 style={{ color: "#0a2540", marginBottom: 6 }}>Select Accessibility Mode</h3>
          <p style={{ color: "#546e7a", marginBottom: 20, fontSize: 14 }}>Choose how you'd like to interact with the platform.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {modes.map(m => (
              <div key={m.id} onClick={() => setSelectedMode(m.id)} style={{
                border: `2px solid ${selectedMode === m.id ? "#1565c0" : "#e0e0e0"}`,
                borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex",
                alignItems: "center", gap: 14, background: selectedMode === m.id ? "#e3f2fd" : "#fff",
                transition: "all 0.2s"
              }}>
                <span style={{ fontSize: 32 }}>{m.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#0a2540" }}>{m.label}</div>
                  <div style={{ fontSize: 13, color: "#78909c" }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Btn onClick={() => { setAccessMode(selectedMode); setStep(2); }}>Continue →</Btn>
        </Card>
      )}

      {/* Step 2: Registration */}
      {step === 2 && (
        <Card>
          <h3 style={{ color: "#0a2540", marginBottom: 20 }}>Create Your Account</h3>
          {["name", "email", "phone"].map(field => (
            <div key={field} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#546e7a", marginBottom: 6 }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                placeholder={`Enter your ${field}`}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cfd8dc",
                  fontSize: 14, outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          ))}
          <Btn onClick={() => { setOtpSent(true); setStep(3); }} style={{ marginTop: 8 }}>
            Send OTP & Continue →
          </Btn>
        </Card>
      )}

      {/* Step 3: OTP verification */}
      {step === 3 && (
        <Card>
          <h3 style={{ color: "#0a2540", marginBottom: 8 }}>Verify Your Account</h3>
          <p style={{ color: "#546e7a", fontSize: 14, marginBottom: 20 }}>
            {otpSent ? `OTP sent to ${form.phone || form.email}. Enter it below.` : ""}
          </p>
          <div style={{
            background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 8,
            padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#795548"
          }}>
            🔑 Demo OTP: <strong>123456</strong>
          </div>
          <input
            type="text"
            value={form.otp}
            onChange={e => setForm({ ...form, otp: e.target.value })}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #cfd8dc",
              fontSize: 18, letterSpacing: 8, textAlign: "center", outline: "none", boxSizing: "border-box",
              marginBottom: 16
            }}
          />
          <Btn
            onClick={() => {
              if (form.otp === "123456") {
                setUser({ name: form.name || "Demo User", email: form.email, phone: form.phone });
              } else {
                alert("Incorrect OTP. Use 123456 for demo.");
              }
            }}
            variant="success"
          >
            ✅ Verify & Login
          </Btn>
        </Card>
      )}
    </div>
  );
}
