import React, { useState } from "react";
import { Wand2, Play, Loader2, Copy, Check, Shield, X } from "lucide-react";
import { callClaude } from "../api/callClaude.js";

export default function Workshop({ role }) {
  const [ziel, setZiel] = useState("");
  const [kontext, setKontext] = useState(role.ctx);
  const [format, setFormat] = useState("");
  const [ton, setTon] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const assembled =
`# Ziel
${ziel || "… was soll genau rauskommen?"}

# Kontext
${kontext || "… wer bist du, worum geht's?"}

# Format
${format || "… Länge, Struktur, Form (optional)"}

# Ton & Richtlinien
${ton || "… Tonfall, Do's & Don'ts (optional)"}`;

  const run = async () => {
    if (!ziel.trim()) { setErr("Gib zumindest ein Ziel ein – das ist das Herz des Prompts."); return; }
    setLoading(true); setErr(""); setOut("");
    try { setOut(await callClaude(assembled)); }
    catch { setErr("Da ging etwas schief – gleich nochmal versuchen."); }
    finally { setLoading(false); }
  };

  const copy = async () => {
    if (!ziel.trim()) { setErr("Füll zumindest das Ziel aus, dann lohnt sich das Kopieren."); return; }
    setErr("");
    try {
      await navigator.clipboard.writeText(assembled);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setErr("Kopieren hat nicht geklappt – markier den Prompt oben einfach von Hand."); }
  };

  return (
    <section className="sec">
      <span className="eyebrow"><Wand2 size={14} /> Station 4 · Prompt-Werkstatt</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Jetzt du.</h2>
      <p className="lede">Bau deinen ersten starken Prompt aus 4 Bausteinen. Nimm eine echte Aufgabe von dir – aber mit <b>erfundenen</b> Beispieldaten.</p>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="field">
          <label>1. Ziel <span className="hint">– was soll konkret rauskommen?</span></label>
          <input className="inp" value={ziel} onChange={(e) => setZiel(e.target.value)} placeholder={role.zielTipp} />
        </div>
        <div className="field">
          <label>2. Kontext <span className="hint">– wer bist du, worum geht's? (für deine Rolle vorausgefüllt)</span></label>
          <textarea className="ta" rows={2} value={kontext} onChange={(e) => setKontext(e.target.value)} />
        </div>
        <div className="field">
          <label>3. Format <span className="hint">– Länge, Struktur (optional)</span></label>
          <input className="inp" value={format} onChange={(e) => setFormat(e.target.value)} placeholder="z.B. Max. 4 Sätze, freundlicher Schluss" />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>4. Ton & Richtlinien <span className="hint">– Tonfall, Do's & Don'ts (optional)</span></label>
          <input className="inp" value={ton} onChange={(e) => setTon(e.target.value)} placeholder="z.B. Warm & professionell, keine Floskeln, Du-Ansprache" />
        </div>
      </div>

      <div className="label" style={{ padding: "20px 0 8px" }}>Dein zusammengebauter Prompt</div>
      <div className="assembled">{assembled}</div>

      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={run} disabled={loading}>
          {loading ? <><Loader2 size={17} className="spin" /> Prüft …</> : <><Play size={17} /> Prompt prüfen</>}
        </button>
        <button className="btn btn-ghost" onClick={copy} disabled={loading}>
          {copied ? <><Check size={17} /> Kopiert!</> : <><Copy size={17} /> Prompt kopieren</>}
        </button>
      </div>

      {err && <div className="notice" style={{ marginTop: 16 }}><X size={16} /> {err}</div>}

      {out && (
        <div className="card" style={{ marginTop: 18, borderColor: "rgba(62,224,143,.28)" }}>
          <div className="label" style={{ padding: 0, marginBottom: 10 }}>Offline-Check deines Prompts</div>
          <div style={{ whiteSpace: "pre-wrap", fontSize: 14.5 }}>{out}</div>
        </div>
      )}

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Wichtig: Hier nur unkritische Beispiele eingeben – <b>keine echten Kunden- oder Personendaten</b>. Im Job läuft sowas über Langdock.</span>
      </div>
    </section>
  );
}
