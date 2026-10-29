import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PROFILE, EXPERIENCE, PROJECTS, CERTS, SKILLS, MARQUEE } from "./data.js";

function Img({ src, alt = "", fallback, onOpen }) {
  const [bad, setBad] = useState(false);
  useEffect(() => setBad(false), [src]);
  if (!src || bad) return fallback ?? <span className="ph">Belum ada gambar</span>;
  const im = <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
  return onOpen ? <button className="zoom" onClick={onOpen} aria-label={`Perbesar: ${alt}`}>{im}</button> : im;
}

// Pratinjau gambar layar penuh: Esc menutup, panah kiri/kanan berpindah, klik latar menutup.
function Lightbox({ lb, setLb }) {
  const ref = useRef(null);
  const open = !!lb;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector("button")?.focus();
    const step = (d) => setLb((s) => s && { ...s, i: (s.i + d + s.list.length) % s.list.length });
    const key = (e) => {
      if (e.key === "Escape") setLb(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        e.preventDefault();
        const f = [...ref.current.querySelectorAll("button")], i = f.indexOf(document.activeElement);
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); document.body.style.overflow = ""; prev?.focus?.(); };
  }, [open, setLb]);
  if (!lb) return null;
  const it = lb.list[lb.i], many = lb.list.length > 1;
  const go = (d) => setLb({ ...lb, i: (lb.i + d + lb.list.length) % lb.list.length });
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={it.title} ref={ref} onClick={(e) => e.target === e.currentTarget && setLb(null)}>
      <button className="lb-x" onClick={() => setLb(null)} aria-label="Tutup pratinjau">×</button>
      {many && <button className="lb-n lb-p" onClick={() => go(-1)} aria-label="Gambar sebelumnya">‹</button>}
      <figure>
        <img key={it.src} src={it.src} alt={it.title} onError={(e) => { e.currentTarget.alt = "Gambar belum tersedia"; }} />
        <figcaption><b>{it.title}</b><span>{it.sub} · {lb.i + 1} / {lb.list.length}</span></figcaption>
      </figure>
      {many && <button className="lb-n lb-nx" onClick={() => go(1)} aria-label="Gambar berikutnya">›</button>}
    </div>
  );
}

function Badge() {
  const sw = useRef(null);
  const [back, setBack] = useState(false);
  const s = useRef({ a: 0, v: 0, dr: false, sx: 0, sa: 0, pa: 0, mv: false, calm: false });

  useEffect(() => {
    const st = s.current;
    st.calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (st.calm) return;
    st.a = 14;
    let raf;
    const tick = () => {
      if (!st.dr) { st.v += -st.a * 0.018; st.v *= 0.985; st.a += st.v; }
      if (sw.current) sw.current.style.transform = `rotate(${st.a}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const down = (e) => { const st = s.current; if (st.calm) return; st.dr = true; st.mv = false; st.sx = e.clientX; st.sa = st.a; st.pa = st.a; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => { const st = s.current; if (!st.dr) return; const d = e.clientX - st.sx; if (Math.abs(d) > 5) st.mv = true; st.pa = st.a; st.a = Math.max(-38, Math.min(38, st.sa + d * 0.22)); st.v = 0; };
  const up = () => { const st = s.current; st.dr = false; st.v = (st.a - st.pa) * 0.6; };
  const toggle = () => { if (!s.current.mv) setBack((b) => !b); s.current.mv = false; };

  return (
    <div className="stage">
      <div className="swing" ref={sw}>
        <div className="strap" aria-hidden="true" />
        <div className="clip" aria-hidden="true" />
        <div
          className={"badge" + (back ? " back" : "")}
          role="button" tabIndex={0} aria-pressed={back}
          aria-label={`Kartu nama ${PROFILE.name}. Tarik untuk mengayun, tekan Enter untuk membalik.`}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onClick={toggle}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setBack((b) => !b); } }}
        >
          <div className="flip">
            <div className="face front">
              <div className="photo"><Img src={PROFILE.photo} alt={`Foto ${PROFILE.name}`} fallback={PROFILE.name.split(" ").map((w) => w[0]).slice(0, 2).join("")} /></div>
              <span className="mono">{PROFILE.company}</span>
              <h3>{PROFILE.name}</h3>
              <small>{PROFILE.role}</small>
              <div className="bc"><i /><span>SUBANG<br />JAWA BARAT, ID</span></div>
            </div>
            <div className="face rear">
              <div>
                <h3>Kontak</h3>
                <dl style={{ margin: 0 }}>
                  <dt>Email</dt><dd>{PROFILE.email}</dd>
                  <dt>Portofolio</dt><dd>{PROFILE.site}</dd>
                  <dt>Lokasi</dt><dd>{PROFILE.location}</dd>
                </dl>
              </div>
              <small style={{ color: "var(--on2)" }}>Terbuka untuk diskusi proyek dan peluang kerja.</small>
            </div>
          </div>
        </div>
      </div>
      <p className="hint mono" aria-hidden="true">Tarik, ayun, atau klik kartunya</p>
    </div>
  );
}

const NAV = [["tentang","Tentang"],["pengalaman","Pengalaman"],["karya","Karya"],["sertifikat","Sertifikat"],["skill","Skill"],["kontak","Kontak"]];
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const tilt = (e) => { if (e.pointerType === "touch" || calm()) return; const c = e.currentTarget, r = c.getBoundingClientRect(); c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg"); c.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 6 + "deg"); };
const untilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
const spot = (e) => { const c = e.currentTarget, r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); };
const unspot = (e) => { e.currentTarget.style.removeProperty("--mx"); e.currentTarget.style.removeProperty("--my"); };

export default function App() {
  const [theme, setTheme] = useState(null);
  const [filter, setFilter] = useState(null);
  const [active, setActive] = useState("");
  const [lb, setLb] = useState(null);
  const bar = useRef(null), ring = useRef(null), top = useRef(null), hdr = useRef(null);

  useEffect(() => {
    const r = document.documentElement;
    theme ? (r.dataset.theme = theme) : delete r.dataset.theme;
  }, [theme]);

  // progres scroll, cincin tombol ke atas, bayangan header
  useEffect(() => {
    const on = () => {
      const h = document.documentElement, p = scrollY / (h.scrollHeight - innerHeight || 1);
      if (bar.current) bar.current.style.width = p * 100 + "%";
      if (ring.current) ring.current.style.strokeDashoffset = 138.2 * (1 - p);
      top.current?.classList.toggle("show", scrollY > 500);
      hdr.current?.classList.toggle("sc", scrollY > 8);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  // elemen muncul bertahap saat di-scroll
  useLayoutEffect(() => {
    if (calm()) return;
    const els = [...document.querySelectorAll(".head,.row,.proj,.cd,.mini>div,.sk>div,.facts>div,.tabs,.mail,.ab p")];
    els.forEach((e) => e.classList.add("rv"));
    const io = new IntersectionObserver((es) => {
      let k = 0;
      es.forEach((en) => { if (en.isIntersecting) { const t = en.target; setTimeout(() => t.classList.add("in"), k++ * 80); io.unobserve(t); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // menu aktif mengikuti section
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((en) => en.isIntersecting && setActive(en.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const e = document.getElementById(id); if (e) io.observe(e); });
    return () => io.disconnect();
  }, []);

  const flipTheme = () => {
    const dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "light" : "dark");
  };

  return (
    <>
      <i id="pg" ref={bar} />
      <header ref={hdr}>
        <div className="w">
          <b>Adha Raka</b>
          <nav>
            {NAV.map(([id, t]) => <a key={id} href={"#" + id} className={active === id ? "act" : undefined}>{t}</a>)}
          </nav>
          <button className="tg" onClick={flipTheme} aria-label="Ganti tema terang atau gelap">◐</button>
          <a className="btn p" href="#kontak">Hubungi saya</a>
        </div>
      </header>

      <main>
        <section className="hero" onMouseMove={spot} onMouseLeave={unspot}>
          <div className="w">
            <div>
              <span className="mono mute">{PROFILE.role} · {PROFILE.location}</span>
              <h1>{"Saya membangun sistem yang menjalankan pabrik, gudang, dan kantor.".split(" ").map((w, i) => <span key={i}><span className="wd" style={{ animationDelay: i * 70 + "ms" }}>{w}</span>{" "}</span>)}</h1>
              <p className="lead">Saya {PROFILE.name}, Staff IT di {PROFILE.company}. Saya mengerjakan ERP, dashboard produksi, dan aplikasi operasional, dari analisis kebutuhan sampai database dan tampilan.</p>
              <div className="cta"><a className="btn p" href="#karya">Lihat karya</a><a className="btn" href="#kontak">Hubungi saya</a></div>
            </div>
            <Badge />
          </div>
        </section>

        <div className="mq" role="img" aria-label={"Teknologi: " + MARQUEE.join(", ")}>
          <div>{[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>

        <section id="tentang">
          <div className="w sec">
            <span className="mono mute">Tentang</span>
            <div className="head"><h2 style={{ maxWidth: "44rem" }}>Dari kebutuhan bisnis sampai sistem yang dipakai tiap hari.</h2></div>
            <div className="ab">
              <div>
                <p>Saya Full-Stack Developer yang terbiasa membuat aplikasi web, sistem informasi, dashboard, dan aplikasi mobile untuk kebutuhan operasional perusahaan.</p>
                <p>Pekerjaan saya mencakup seluruh alur: memahami kebutuhan, merancang database, membangun frontend dan backend, mengintegrasikan data, lalu menguji dan memperbaikinya. Saya sudah bekerja di sistem ERP, procurement, quality assurance, production monitoring, dan manajemen aset IT.</p>
                <div className="mini">
                  <div><b>Backend dan API</b><small>Laravel, PHP, REST API, SQL Server</small></div>
                  <div><b>Web</b><small>ASP.NET, Bootstrap, Tailwind</small></div>
                  <div><b>Mobile</b><small>Flutter, PHP REST API</small></div>
                </div>
              </div>
              <dl className="facts">
                <div><dt>Posisi</dt><dd>{PROFILE.role}, Staff IT</dd></div>
                <div><dt>Perusahaan</dt><dd>{PROFILE.company}</dd></div>
                <div><dt>Kuliah</dt><dd>S1 Sistem Informasi (PJJ), Universitas Siber Asia</dd></div>
                <div><dt>Sebelumnya</dt><dd>D2 RPL, LP3I College Purwakarta</dd></div>
                <div><dt>Lokasi</dt><dd>{PROFILE.location}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="pengalaman" style={{ paddingTop: 0 }}>
          <div className="w sec">
            <span className="mono mute">Pengalaman</span>
            <div className="head"><h2>Kerja dan magang.</h2><p>Diurutkan dari yang terbaru.</p></div>
            <div className="xp">
              {EXPERIENCE.map((x) => (
                <div className="row" key={x.title + x.when}>
                  <div><span className="mono">{x.when}</span></div>
                  <div>
                    <h3>{x.title}</h3><div className="co">{x.org}</div>
                    <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    <div className="tags">{x.stack.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="karya" className="dk">
          <div className="w sec">
            <span className="mono">Karya</span>
            <div className="head"><h2>Sistem yang sudah saya bangun.</h2><p>Sebagian besar berjalan di jaringan internal perusahaan, jadi tampilannya saya tunjukkan lewat gambar.</p></div>
            <div className="pg">
              {PROJECTS.map((p, i) => (
                <article className="proj" key={p.name} onPointerMove={tilt} onPointerLeave={untilt}>
                  <div className="shot"><Img src={p.image} alt={`Tampilan ${p.name}`} onOpen={() => setLb({ list: PROJECTS.map((q) => ({ src: q.image, title: q.name, sub: q.stack })), i })} /></div>
                  <h3>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.name}</a> : p.name}</h3>
                  <div className="st">{p.stack}</div>
                  <p>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sertifikat">
          <div className="w sec">
            <span className="mono mute">Sertifikat</span>
            <div className="head"><h2>Bukti yang bisa dilihat langsung.</h2></div>
            <div className="cg">
              {CERTS.map((c, i) => (
                <article className="cd" key={c.title} onPointerMove={tilt} onPointerLeave={untilt}>
                  <div className="cs"><Img src={c.image} alt={`Sertifikat ${c.title}`} onOpen={() => setLb({ list: CERTS.map((q) => ({ src: q.image, title: q.title, sub: q.meta })), i })} /></div>
                  <div className="mono">{c.meta}</div>
                  <h3>{c.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skill" style={{ background: "var(--paper2)" }}>
          <div className="w sec">
            <span className="mono mute">Skill</span>
            <div className="head"><h2>Yang saya pakai sehari-hari.</h2><p>Klik kategori untuk menyorotnya.</p></div>
            <div className="tabs">
              {Object.keys(SKILLS).map((k) => (
                <button key={k} aria-pressed={filter === k} onClick={() => setFilter(filter === k ? null : k)}>{k}</button>
              ))}
            </div>
            <div className="sk" data-f={filter || undefined}>
              {Object.entries(SKILLS).map(([k, v]) => (
                <div key={k} data-n={k} className={filter === k ? "on" : undefined}><h3>{k}</h3><ul>{v.map((x, i) => <li key={x} style={{ "--i": i }}>{x}</li>)}</ul></div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontak">
          <div className="w sec">
            <span className="mono mute">Kontak</span>
            <h2 style={{ marginBottom: "2rem", maxWidth: "40rem" }}>Punya sistem yang perlu dibangun?</h2>
            <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <p className="mute" style={{ marginTop: "1.5rem" }}>{PROFILE.location}. Terbuka untuk kerja penuh waktu dan proyek.</p>
          </div>
        </section>
      </main>
      <footer><div className="w mono mute">© 2026 {PROFILE.name}</div></footer>
      <Lightbox lb={lb} setLb={setLb} />
      <button ref={top} className="top" aria-label="Kembali ke atas" onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
        <svg viewBox="0 0 48 48" aria-hidden="true"><circle ref={ring} cx="24" cy="24" r="22" /></svg><span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
