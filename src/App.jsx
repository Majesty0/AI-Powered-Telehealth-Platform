import { useState } from "react";
import Onboarding from "./components/Onboarding";
import Triage from "./components/Triage";
import SignLanguage from "./components/SignLanguage";
import VoiceAssist from "./components/VoiceAssist";
import Consultation from "./components/Consultation";
import Prescription from "./components/Prescription";
import Surveillance from "./components/Surveillance";
import HealthRecords from "./components/HealthRecords";
import DoctorPortal from "./components/DoctorPortal";
import AdminDashboard from "./components/AdminDashboard";

const modules = [
  { id: "onboarding", label: "🏠 Onboarding", icon: "🏠" },
  { id: "triage", label: "🤖 AI Triage", icon: "🤖" },
  { id: "signlang", label: "🤟 Sign Language", icon: "🤟" },
  { id: "voice", label: "🎙️ Voice Assist", icon: "🎙️" },
  { id: "consultation", label: "📹 Consultation", icon: "📹" },
  { id: "prescription", label: "💊 Prescription", icon: "💊" },
  { id: "surveillance", label: "🗺️ Surveillance", icon: "🗺️" },
  { id: "records", label: "📋 Health Records", icon: "📋" },
  { id: "doctor", label: "👨‍⚕️ Doctor Portal", icon: "👨‍⚕️" },
  { id: "admin", label: "📊 Admin Dashboard", icon: "📊" },
];

export default function App() {
  const [active, setActive] = useState("onboarding");
  const [user, setUser] = useState(null);
  const [accessMode, setAccessMode] = useState("standard");

  const renderModule = () => {
    const props = { user, setUser, accessMode, setAccessMode };
    switch (active) {
      case "onboarding": return <Onboarding {...props} />;
      case "triage": return <Triage {...props} />;
      case "signlang": return <SignLanguage {...props} />;
      case "voice": return <VoiceAssist {...props} />;
      case "consultation": return <Consultation {...props} />;
      case "prescription": return <Prescription {...props} />;
      case "surveillance": return <Surveillance {...props} />;
      case "records": return <HealthRecords {...props} />;
      case "doctor": return <DoctorPortal {...props} />;
      case "admin": return <AdminDashboard {...props} />;
      default: return <Onboarding {...props} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", background: "#f0f4f8" }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: "#0a2540", color: "#fff", display: "flex",
        flexDirection: "column", padding: "20px 0", position: "fixed", height: "100vh", overflowY: "auto"
      }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1e3a5f" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#4fc3f7" }}>AfyaEdge AI</div>
          <div style={{ fontSize: 11, color: "#90caf9", marginTop: 4 }}>AI Telemedicine Platform</div>
          {user && (
            <div style={{ marginTop: 10, fontSize: 12, background: "#1e3a5f", borderRadius: 6, padding: "6px 10px" }}>
              👤 {user.name}<br />
              <span style={{ color: "#4fc3f7" }}>Mode: {accessMode}</span>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: "10px 0" }}>
          {modules.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 20px", background: active === m.id ? "#1565c0" : "transparent",
              color: active === m.id ? "#fff" : "#b0c4de", border: "none",
              cursor: "pointer", fontSize: 13, borderLeft: active === m.id ? "3px solid #4fc3f7" : "3px solid transparent",
              transition: "all 0.2s"
            }}>
              {m.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "10px 20px", fontSize: 11, color: "#546e7a", borderTop: "1px solid #1e3a5f" }}>
          AfyaEdge v1.0 Prototype
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 220, flex: 1, padding: 30, minHeight: "100vh" }}>
        {renderModule()}
      </main>
    </div>
  );
}
