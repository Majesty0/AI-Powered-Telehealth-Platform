import { useState } from "react";

const responses = {
  "start consultation": "Opening consultation page. Please wait while I connect you to a doctor.",
  "describe symptoms": "Please describe your symptoms now. I am listening.",
  "find doctor": "Searching for available doctors near you. One moment.",
  "book appointment": "Opening appointment scheduler. Please provide your preferred date.",
  "my records": "Opening your health records. All past consultations are available.",
  "help": "You can say: Start consultation, Describe symptoms, Find doctor, Book appointment, or My records.",
};

export default function VoiceAssist({ accessMode }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [history, setHistory] = useState([]);

  const speak = (text) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported. Use Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onresult = (e) => {
      const said = e.results[0][0].transcript.toLowerCase();
      setTranscript(said);
      const reply = responses[said] || responses[Object.keys(responses).find(k => said.includes(k))] ||
        "I didn't catch that. Say 'help' to hear available commands.";
      setAiReply(reply);
      setHistory(prev => [...prev, { user: said, ai: reply }]);
      speak(reply);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const commands = Object.keys(responses).filter(r => r !== "help");

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>🎙️ Voice Assist (Visually Impaired Mode)</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>
        Full voice navigation for visually impaired users. Click the mic or use Tab + Enter.
      </p>

      {/* Main mic button */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <button
          onClick={startListening}
          aria-label="Start voice input"
          style={{
            width: 120, height: 120, borderRadius: "50%",
            background: listening ? "#c62828" : "#1565c0",
            border: "none", cursor: "pointer", color: "#fff", fontSize: 48,
            boxShadow: listening ? "0 0 0 16px rgba(198,40,40,0.2)" : "0 4px 20px rgba(21,101,192,0.4)",
            transition: "all 0.3s"
          }}
        >
          🎙️
        </button>
        <div style={{ marginTop: 14, fontWeight: 600, color: listening ? "#c62828" : "#1565c0" }}>
          {listening ? "Listening..." : "Tap to Speak"}
        </div>
      </div>

      {/* Conversation */}
      {(transcript || aiReply) && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 16 }}>
          {transcript && (
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "#78909c", fontWeight: 600 }}>YOU SAID</span>
              <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "10px 14px", marginTop: 4, fontSize: 15 }}>
                "{transcript}"
              </div>
            </div>
          )}
          {aiReply && (
            <div>
              <span style={{ fontSize: 12, color: "#1565c0", fontWeight: 600 }}>AI RESPONSE</span>
              <div style={{ background: "#e3f2fd", borderRadius: 8, padding: "10px 14px", marginTop: 4, fontSize: 15, color: "#0a2540" }}>
                🤖 {aiReply}
              </div>
              <button onClick={() => speak(aiReply)} style={{
                marginTop: 8, background: "none", border: "1px solid #1565c0", borderRadius: 6,
                padding: "4px 12px", color: "#1565c0", cursor: "pointer", fontSize: 12
              }}>
                🔊 Repeat
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick commands */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight: 600, color: "#0a2540", marginBottom: 14, fontSize: 14 }}>
          📋 Voice Commands
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {commands.map(cmd => (
            <button key={cmd} onClick={() => {
              setTranscript(cmd);
              const reply = responses[cmd];
              setAiReply(reply);
              setHistory(prev => [...prev, { user: cmd, ai: reply }]);
              speak(reply);
            }} style={{
              padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: 8,
              background: "#fafafa", cursor: "pointer", fontSize: 13, textAlign: "left",
              color: "#0a2540", fontWeight: 500
            }}>
              🎤 "{cmd}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
