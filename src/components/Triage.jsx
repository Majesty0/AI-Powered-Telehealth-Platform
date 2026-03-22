import { useState } from "react";

const questions = [
  { id: "fever", text: "Do you have a fever?", options: ["Yes", "No", "Not sure"] },
  { id: "duration", text: "How long have you had symptoms?", options: ["Less than 1 day", "1–3 days", "4–7 days", "More than a week"] },
  { id: "pain", text: "Pain severity (1 = mild, 5 = severe)?", options: ["1", "2", "3", "4", "5"] },
  { id: "breathing", text: "Any difficulty breathing?", options: ["Yes", "No", "Mild difficulty"] },
  { id: "location", text: "Where is the main discomfort?", options: ["Head", "Chest", "Abdomen", "Limbs", "Whole body"] },
];

const getRisk = (answers) => {
  let score = 0;
  if (answers.fever === "Yes") score += 2;
  if (answers.breathing === "Yes") score += 3;
  if (["4", "5"].includes(answers.pain)) score += 2;
  if (answers.duration === "More than a week") score += 1;
  if (score >= 5) return { level: "High", color: "#c62828", specialist: "Emergency Physician", emoji: "🚨" };
  if (score >= 3) return { level: "Medium", color: "#e65100", specialist: "General Practitioner", emoji: "⚠️" };
  return { level: "Low", color: "#2e7d32", specialist: "General Practitioner", emoji: "✅" };
};

export default function Triage({ accessMode }) {
  const [symptoms, setSymptoms] = useState("");
  const [step, setStep] = useState("input");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const risk = getRisk(answers);

  const speak = (text) => {
    if (accessMode === "visual" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ color: "#0a2540", marginBottom: 4 }}>🤖 AI Health Triage</h2>
      <p style={{ color: "#546e7a", marginBottom: 24, fontSize: 14 }}>Describe your symptoms and let AI assess your risk level.</p>

      {step === "input" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <label style={{ fontWeight: 600, color: "#0a2540", display: "block", marginBottom: 10 }}>
            Describe your symptoms
          </label>
          <textarea
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            placeholder="e.g. I have a headache and fever since yesterday..."
            rows={4}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #cfd8dc",
              fontSize: 14, resize: "vertical", boxSizing: "border-box", outline: "none"
            }}
          />
          <button
            onClick={() => { setStep("questions"); speak(questions[0].text); }}
            style={{
              marginTop: 16, padding: "12px 24px", background: "#1565c0", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14
            }}
          >
            Start AI Assessment →
          </button>
        </div>
      )}

      {step === "questions" && qIndex < questions.length && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "#78909c" }}>Question {qIndex + 1} of {questions.length}</span>
            <span style={{ fontSize: 13, color: "#78909c" }}>
              <span style={{
                display: "inline-block", height: 6, background: "#e0e0e0", borderRadius: 3, width: 120, verticalAlign: "middle"
              }}>
                <span style={{
                  display: "block", height: 6, background: "#1565c0", borderRadius: 3,
                  width: `${((qIndex + 1) / questions.length) * 100}%`
                }} />
              </span>
            </span>
          </div>
          <div style={{
            background: "#e3f2fd", borderRadius: 10, padding: "16px 20px", marginBottom: 24,
            fontSize: 16, fontWeight: 500, color: "#0a2540"
          }}>
            🤖 {questions[qIndex].text}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {questions[qIndex].options.map(opt => (
              <button key={opt} onClick={() => {
                const newAnswers = { ...answers, [questions[qIndex].id]: opt };
                setAnswers(newAnswers);
                if (qIndex + 1 < questions.length) {
                  setQIndex(qIndex + 1);
                  speak(questions[qIndex + 1].text);
                } else {
                  setStep("result");
                }
              }} style={{
                padding: "12px 16px", border: "2px solid #e0e0e0", borderRadius: 8,
                background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500,
                transition: "all 0.15s", textAlign: "left"
              }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "result" && (
        <div>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 28,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 16
          }}>
            <h3 style={{ color: "#0a2540", marginBottom: 20 }}>AI Assessment Result</h3>
            <div style={{
              border: `2px solid ${risk.color}`, borderRadius: 10, padding: "20px 24px",
              marginBottom: 20, background: `${risk.color}10`
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{risk.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: risk.color }}>{risk.level} Risk</div>
              <div style={{ fontSize: 14, color: "#546e7a", marginTop: 6 }}>
                Recommended specialist: <strong>{risk.specialist}</strong>
              </div>
            </div>

            <h4 style={{ color: "#0a2540", marginBottom: 12 }}>Your Answers Summary</h4>
            {Object.entries(answers).map(([k, v]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between", padding: "8px 0",
                borderBottom: "1px solid #f0f0f0", fontSize: 14
              }}>
                <span style={{ color: "#546e7a", textTransform: "capitalize" }}>{k}</span>
                <span style={{ fontWeight: 600, color: "#0a2540" }}>{v}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setStep("input"); setQIndex(0); setAnswers({}); setSymptoms(""); }}
            style={{
              padding: "12px 24px", background: "#546e7a", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600
            }}
          >
            Start New Assessment
          </button>
        </div>
      )}
    </div>
  );
}
