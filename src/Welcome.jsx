import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, CERTS } from "./data.js";
import "./welcome.css";

const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const GL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]=+*#";

// Isi "log terminal" di sebelah kanan. at = persen progres saat baris muncul.
// Teks ini bebas diubah; angka proyek dan sertifikat diambil otomatis dari data.js.
const LOG = [
  { at: 6, cmd: "whoami", out: PROFILE.name.toLowerCase().replace(/ /g, "-") },
  { at: 24, cmd: "stack --list", out: "Laravel · PHP · C# · ASP.NET · Flutter · SQL Server" },
  { at: 46, cmd: "load projects", out: `${PROJECTS.length} proyek ........ OK` },
  { at: 64, cmd: "load certificates", out: `${CERTS.length} sertifikat ..... OK` },
  { at: 82, cmd: "status", out: "terbuka untuk kerja  ● ONLINE" },
];

// Teks "diterjemahkan" dari huruf acak menjadi nama asli, huruf demi huruf.
function Decode({ text, delay = 0 }) {
  const chars = [...text];
  const [t, setT] = useState(calm() ? 1e9 : 0);
  useEffect(() => {
    if (calm()) return;
    let raf;
    const t0 = performance.now(), end = delay + 300 + chars.length * 70 + 100;
    const tick = (n) => { const d = n - t0; setT(d); if (d < end) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return chars.map((c, i) => {
    const sp = c === " ", done = sp || t >= delay + 300 + i * 70;
    return (
      <span className={"dc" + (done ? " ok" : "")} key={i}>
        <span className="g">{sp ? "\u00A0" : c}</span>
        {!done && <span className="s" aria-hidden="true">{GL[(Math.floor(t / 55) * 7 + i * 13) % GL.length]}</span>}
      </span>
    );
  });
}

export default function Welcome({ onDone }) {
  const [p, setP] = useState(0);
  const [out, setOut] = useState(false);
  const fin = useRef(false), btn = useRef(null), root = useRef(null);
  const words = PROFILE.name.split(" "), l1 = words.slice(0, 2).join(" "), l2 = words.slice(2).join(" ");

  const enter = () => {
    if (fin.current) return;
    fin.current = true; setOut(true);
    setTimeout(onDone, calm() ? 50 : 1300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf, ok = false;
    document.fonts?.ready.then(() => { ok = true; });
    const safety = setTimeout(() => { ok = true; }, 4000);
    const t0 = performance.now(), dur = calm() ? 500 : 3200;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 2.2);
      const v = Math.round(Math.min(e, ok ? 1 : 0.9) * 100);
      setP(v);
      if (v < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => { if (p === 100) btn.current?.focus(); }, [p === 100]);

  const spot = (e) => { root.current?.style.setProperty("--mx", e.clientX + "px"); root.current?.style.setProperty("--my", e.clientY + "px"); };

  return (
    <div ref={root} className={"wel" + (out ? " out" : "")} role="dialog" aria-modal="true" aria-label={`Selamat datang di portofolio ${PROFILE.name}`} onMouseMove={spot}>
      <div className="wel-scan" aria-hidden="true" />
      <div className="wel-top mono">
        <span className="wel-lb"><i /> Portofolio · 2026</span>
        <span className="wel-geo">6°34′S · 107°45′E</span>
        <button className="wel-skip mono" onClick={enter}>Lewati</button>
      </div>

      <div className="wel-body">
        <div>
          <span className="mono wel-hi">Selamat datang</span>
          <h2 aria-label={PROFILE.name}>
            <span className="wl" aria-hidden="true"><Decode text={l1} /></span>
            <span className="wl" aria-hidden="true"><Decode text={l2} delay={450} /><b>.</b></span>
          </h2>
          <p className="wel-role">{PROFILE.role} · {PROFILE.location}</p>
        </div>

        <div className="wel-term" aria-hidden="true">
          <div className="wel-tb"><i /><i /><i /><span className="mono">adha@portofolio: ~</span></div>
          <div className="wel-tc">
            {LOG.filter((l) => p >= l.at).map((l) => (
              <div key={l.cmd}>
                <div className="tl"><span className="pr">$</span><span className="cmd" style={{ "--n": l.cmd.length }}>{l.cmd}</span></div>
                <div className="to">{l.out}</div>
              </div>
            ))}
            {p === 100 && <div className="tl fin">✓ siap. selamat datang.</div>}
            <div className="tl"><span className="pr">$</span><span className="cur" /></div>
          </div>
        </div>
      </div>

      <div className="wel-foot">
        <div className="wel-bar"><i style={{ width: p + "%" }} /></div>
        <div className="wel-row">
          <div className="wel-act">
            <span className="mono wel-st">{p < 100 ? "Memuat portofolio…" : ""}</span>
            <button ref={btn} className={"wel-go" + (p === 100 ? " on" : "")} tabIndex={p === 100 ? 0 : -1} onClick={enter}>Masuk <span aria-hidden="true">↓</span></button>
          </div>
          <div className={"wel-n" + (p === 100 ? " full" : "")}>{String(p).padStart(3, "0")}<small className="mono">%</small></div>
        </div>
      </div>
    </div>
  );
}