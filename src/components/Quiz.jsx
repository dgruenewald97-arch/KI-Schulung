import React, { useState } from "react";
import { Trophy, Check, X } from "lucide-react";
import { QUIZ } from "../data/quiz.js";

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = QUIZ.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
  const choose = (qi, oi) => { if (answers[qi] != null) return; setAnswers((a) => ({ ...a, [qi]: oi })); };

  return (
    <section className="sec">
      <span className="eyebrow"><Trophy size={14} /> Station 5 · Mini-Quiz</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Sitzt es?</h2>
      <p className="lede">Fünf kurze Fragen, Sofort-Feedback. Kein Druck – reines Hirn-Kitzeln.</p>

      {answered === QUIZ.length && (
        <div className="card" style={{ marginTop: 22, borderColor: "rgba(62,224,143,.3)", textAlign: "center" }}>
          <div className="disp" style={{ fontSize: 34, color: "var(--acc)" }}>{score} / {QUIZ.length}</div>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 14.5 }}>
            {score === QUIZ.length ? "Sauber – alles richtig! Du bist bereit." : score >= 3 ? "Stark! Das Fundament sitzt." : "Kein Stress – scroll nochmal durch die Erklärungen."}
          </p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {QUIZ.map((q, qi) => {
          const picked = answers[qi];
          const done = picked != null;
          return (
            <div key={qi} style={{ marginBottom: 26 }}>
              <h3 style={{ fontSize: 17, marginBottom: 14 }}>{qi + 1}. {q.q}</h3>
              {q.opts.map((o, oi) => {
                let cls = "opt";
                if (done && oi === q.correct) cls += " correct";
                else if (done && oi === picked) cls += " wrong";
                return (
                  <button key={oi} className={cls} disabled={done} onClick={() => choose(qi, oi)}>
                    <span className="mk">{done && oi === q.correct ? <Check size={13} /> : done && oi === picked ? <X size={13} /> : ""}</span>
                    {o}
                  </button>
                );
              })}
              {done && <div className="explain">{q.ex}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
