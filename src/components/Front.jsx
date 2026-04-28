// src/components/Front.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Front() {
  const [theme,      setTheme]      = useState("dark");
  const canvasRef    = useRef(null);
  const animFrameRef = useRef(null);
  const isDark       = theme === "dark";

  // ── Canvas: moving stars + comets ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (!isDark) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animFrameRef.current);
      return () => window.removeEventListener("resize", resize);
    }

    const stars = Array.from({ length: 220 }, () => ({
      x:            Math.random() * window.innerWidth,
      y:            Math.random() * window.innerHeight,
      radius:       Math.random() * 1.7 + 0.3,
      speedX:       (Math.random() - 0.5) * 0.13,
      speedY:       (Math.random() - 0.5) * 0.13,
      opacity:      Math.random() * 0.7 + 0.2,
      opacityDir:   Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.005 + 0.002,
    }));

    const comets = [];
    let cometTimer = 0;

    const spawnComet = () => {
      const angle = (Math.random() * 35 + 15) * (Math.PI / 180);
      const speed = Math.random() * 7 + 9;
      comets.push({
        x:       Math.random() * window.innerWidth  * 0.55,
        y:       Math.random() * window.innerHeight * 0.4,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        length:  Math.random() * 200 + 110,
        width:   Math.random() * 1.8 + 0.6,
        life:    0,
        maxLife: Math.random() * 70 + 80,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.x += s.speedX; s.y += s.speedY;
        s.opacity += s.opacityDir * s.opacitySpeed;
        if (s.opacity >= 0.95) { s.opacity = 0.95; s.opacityDir = -1; }
        if (s.opacity <= 0.1)  { s.opacity = 0.1;  s.opacityDir =  1; }
        if (s.x < 0) s.x = canvas.width;  if (s.x > canvas.width)  s.x = 0;
        if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      }
      cometTimer++;
      if (cometTimer >= 100 && comets.length < 5) { spawnComet(); cometTimer = 0; }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx; c.y += c.vy; c.life++;
        let fade = c.life < 12 ? c.life / 12
          : c.life > c.maxLife * 0.72 ? 1 - (c.life - c.maxLife * 0.72) / (c.maxLife * 0.28)
          : 1;
        fade = Math.max(0, Math.min(1, fade));
        const sp = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
        const tx = c.x - (c.vx / sp) * c.length;
        const ty = c.y - (c.vy / sp) * c.length;
        const g  = ctx.createLinearGradient(tx, ty, c.x, c.y);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.6, `rgba(180,220,255,${0.12 * fade})`);
        g.addColorStop(1, `rgba(255,255,255,${0.88 * fade})`);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = g; ctx.lineWidth = c.width; ctx.lineCap = "round"; ctx.stroke();
        const glow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 5);
        glow.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        if (c.life >= c.maxLife || c.x > canvas.width + 150 || c.y > canvas.height + 150)
          comets.splice(i, 1);
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize); };
  }, [theme]);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className={`page ${theme}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root {
          width:100%; min-height:100%;
          overflow-x:hidden; overflow-y:auto;
          font-family:'Outfit', sans-serif;
        }

        /* ── Page themes ─────────────────────────────────────────────────── */
        .page { min-height:100vh; display:flex; flex-direction:column; position:relative; transition:background 0.5s, color 0.4s; }

        .dark {
          background:
            radial-gradient(ellipse at 18% 12%, #0d1b3e 0%, transparent 48%),
            radial-gradient(ellipse at 82% 78%, #0a0020 0%, transparent 48%),
            linear-gradient(160deg, #020817 0%, #050c1a 55%, #000 100%);
          color:#e2e8f0;
        }
        .light {
          background: linear-gradient(135deg, #f0f4ff 0%, #e9eeff 40%, #f5f0ff 100%);
          color:#1e293b;
        }

        /* ── Canvas ──────────────────────────────────────────────────────── */
        #front-canvas { position:fixed; inset:0; pointer-events:none; z-index:0; transition:opacity 0.5s; }

        /* ── Navbar ──────────────────────────────────────────────────────── */
        .navbar {
          display:flex; justify-content:space-between; align-items:center;
          padding:16px 6%; position:sticky; top:0; z-index:50;
          backdrop-filter:blur(20px); transition:background 0.4s, border 0.4s;
        }
        .dark  .navbar { background:rgba(2,8,23,0.75); border-bottom:1px solid rgba(255,255,255,0.07); }
        .light .navbar { background:rgba(255,255,255,0.82); border-bottom:1px solid rgba(0,0,0,0.07); box-shadow:0 1px 14px rgba(0,0,0,0.06); }

        .nav-logo { font-size:1.15rem; font-weight:800; letter-spacing:-0.3px; display:flex; align-items:center; gap:8px; }
        .dark  .nav-logo { color:#a5f3fc; }
        .light .nav-logo { color:#1e40af; }

        .nav-actions { display:flex; align-items:center; gap:10px; }
        .nav-btn {
          padding:8px 18px; border-radius:9px; border:none; cursor:pointer;
          font-size:13px; font-weight:600; font-family:'Outfit',sans-serif;
          transition:all 0.2s;
        }
        .nav-btn:hover { transform:translateY(-1px); }

        .btn-theme {
          background:rgba(139,92,246,0.15); color:#a78bfa;
          border:1px solid rgba(139,92,246,0.3);
        }
        .btn-theme:hover { background:rgba(139,92,246,0.25); }
        .btn-login {
          background:linear-gradient(135deg,#0ea5e9,#6366f1);
          color:#fff; box-shadow:0 4px 14px rgba(99,102,241,0.35);
        }
        .btn-login:hover { box-shadow:0 6px 20px rgba(99,102,241,0.5); }

        /* ── Sections ────────────────────────────────────────────────────── */
        section { padding:100px 8%; position:relative; z-index:5; }
        .section-label {
          display:inline-block; font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:1.4px;
          padding:5px 14px; border-radius:20px; margin-bottom:18px;
        }
        .dark  .section-label { background:rgba(165,243,252,0.08); color:#a5f3fc; border:1px solid rgba(165,243,252,0.18); }
        .light .section-label { background:rgba(30,64,175,0.07); color:#1e40af; border:1px solid rgba(30,64,175,0.18); }

        /* ── Hero ────────────────────────────────────────────────────────── */
        .hero-section { padding:120px 8% 100px; display:flex; align-items:center; justify-content:center; }
        .hero-inner { max-width:860px; text-align:center; }

        .hero-tagline {
          font-size:clamp(13px,1.4vw,15px); font-weight:600; letter-spacing:1.2px;
          text-transform:uppercase; margin-bottom:22px;
          background:linear-gradient(90deg,#00e5ff,#a855f7,#ff4dc4);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }

        .hero-title {
          font-size:clamp(40px,7vw,88px); font-weight:900;
          line-height:1.04; letter-spacing:-2px; margin-bottom:26px;
        }
        .dark  .hero-title { color:#f1f5f9; }
        .light .hero-title { color:#0f172a; }
        .hero-title .accent {
          background:linear-gradient(135deg,#38bdf8,#818cf8);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }

        .hero-sub {
          font-size:clamp(16px,1.8vw,20px); line-height:1.7; margin-bottom:40px; max-width:680px; margin-left:auto; margin-right:auto;
        }
        .dark  .hero-sub { color:#94a3b8; }
        .light .hero-sub { color:#475569; }

        .hero-cta { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:60px; }
        .cta-primary {
          padding:15px 34px; font-size:15px; font-weight:700; border-radius:12px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#0ea5e9,#6366f1); color:#fff;
          box-shadow:0 8px 28px rgba(99,102,241,0.4); font-family:'Outfit',sans-serif;
          transition:all 0.2s;
        }
        .cta-primary:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(99,102,241,0.55); }
        .cta-secondary {
          padding:15px 34px; font-size:15px; font-weight:600; border-radius:12px; cursor:pointer;
          font-family:'Outfit',sans-serif; transition:all 0.2s;
        }
        .dark  .cta-secondary { background:rgba(255,255,255,0.06); color:#e2e8f0; border:1px solid rgba(255,255,255,0.12); }
        .light .cta-secondary { background:white; color:#334155; border:1px solid #e2e8f0; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
        .cta-secondary:hover { transform:translateY(-2px); }

        /* Stats row */
        .stats-row { display:flex; justify-content:center; gap:0; flex-wrap:wrap; }
        .stat-item { padding:22px 36px; text-align:center; }
        .stat-item:not(:last-child) { border-right:1px solid; }
        .dark  .stat-item:not(:last-child) { border-color:rgba(255,255,255,0.08); }
        .light .stat-item:not(:last-child) { border-color:rgba(0,0,0,0.08); }
        .stat-num { font-size:2rem; font-weight:800; font-family:'JetBrains Mono',monospace; }
        .dark  .stat-num { color:#38bdf8; }
        .light .stat-num { color:#1e40af; }
        .stat-lbl { font-size:12px; font-weight:500; margin-top:4px; }
        .dark  .stat-lbl { color:#475569; }
        .light .stat-lbl { color:#94a3b8; }

        /* ── Features ────────────────────────────────────────────────────── */
        .features-section { padding:90px 8%; }
        .features-header { text-align:center; margin-bottom:54px; }
        .section-title { font-size:clamp(28px,4vw,44px); font-weight:800; letter-spacing:-0.5px; line-height:1.1; }
        .section-desc { font-size:16px; margin-top:14px; max-width:560px; margin-left:auto; margin-right:auto; line-height:1.7; }
        .dark  .section-desc { color:#64748b; }
        .light .section-desc { color:#94a3b8; }

        .features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; }

        .feat-card {
          padding:32px 28px; border-radius:18px; position:relative; overflow:hidden;
          backdrop-filter:blur(14px); transition:transform 0.25s, box-shadow 0.25s;
          cursor:default;
        }
        .feat-card:hover { transform:translateY(-6px); }
        .dark  .feat-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); }
        .light .feat-card { background:white; border:1px solid rgba(0,0,0,0.07); box-shadow:0 4px 16px rgba(0,0,0,0.05); }
        .dark  .feat-card:hover { box-shadow:0 18px 40px rgba(0,0,0,0.35); }
        .light .feat-card:hover { box-shadow:0 18px 40px rgba(0,0,0,0.1); }

        .feat-icon-wrap {
          width:52px; height:52px; border-radius:14px; display:flex; align-items:center;
          justify-content:center; font-size:24px; margin-bottom:18px;
        }
        .feat-card:nth-child(1) .feat-icon-wrap { background:rgba(56,189,248,0.12); }
        .feat-card:nth-child(2) .feat-icon-wrap { background:rgba(167,139,250,0.12); }
        .feat-card:nth-child(3) .feat-icon-wrap { background:rgba(52,211,153,0.12); }
        .feat-card:nth-child(4) .feat-icon-wrap { background:rgba(251,191,36,0.12); }
        .feat-card:nth-child(5) .feat-icon-wrap { background:rgba(248,113,113,0.12); }
        .feat-card:nth-child(6) .feat-icon-wrap { background:rgba(99,102,241,0.12); }

        .feat-title { font-size:17px; font-weight:700; margin-bottom:10px; }
        .feat-desc  { font-size:14px; line-height:1.65; }
        .dark  .feat-desc { color:#64748b; }
        .light .feat-desc { color:#94a3b8; }

        .feat-glow {
          position:absolute; width:100px; height:100px; border-radius:50%;
          filter:blur(40px); right:-10px; top:-10px; opacity:0.07;
        }
        .feat-card:nth-child(1) .feat-glow { background:#38bdf8; }
        .feat-card:nth-child(2) .feat-glow { background:#a78bfa; }
        .feat-card:nth-child(3) .feat-glow { background:#34d399; }
        .feat-card:nth-child(4) .feat-glow { background:#fbbf24; }
        .feat-card:nth-child(5) .feat-glow { background:#f87171; }
        .feat-card:nth-child(6) .feat-glow { background:#6366f1; }

        /* ── How it works ────────────────────────────────────────────────── */
        .how-section { padding:90px 8%; }
        .steps-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:0; margin-top:50px; position:relative; }
        .steps-grid::before {
          content:''; position:absolute; top:36px; left:10%; right:10%; height:2px;
          background:linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent);
          z-index:0;
        }
        .step-item { text-align:center; padding:20px 24px; position:relative; z-index:1; }
        .step-num {
          width:56px; height:56px; border-radius:50%; display:flex; align-items:center;
          justify-content:center; margin:0 auto 16px; font-size:18px; font-weight:800;
          font-family:'JetBrains Mono',monospace; transition:transform 0.2s;
        }
        .step-item:hover .step-num { transform:scale(1.12); }
        .dark  .step-num { background:rgba(99,102,241,0.15); color:#818cf8; border:2px solid rgba(99,102,241,0.3); }
        .light .step-num { background:rgba(99,102,241,0.08); color:#6366f1; border:2px solid rgba(99,102,241,0.2); }
        .step-title { font-size:15px; font-weight:700; margin-bottom:8px; }
        .step-desc  { font-size:13px; line-height:1.6; }
        .dark  .step-desc { color:#64748b; }
        .light .step-desc { color:#94a3b8; }

        /* ── Categories ──────────────────────────────────────────────────── */
        .cat-section { padding:80px 8%; text-align:center; }
        .cat-pills { display:flex; justify-content:center; flex-wrap:wrap; gap:14px; margin-top:36px; }
        .cat-pill {
          padding:14px 26px; border-radius:50px; font-size:14px; font-weight:600;
          backdrop-filter:blur(10px); transition:all 0.2s; cursor:default;
          display:flex; align-items:center; gap:8px;
        }
        .cat-pill:hover { transform:translateY(-3px) scale(1.04); }
        .cp-blue   { background:rgba(56,189,248,0.1); color:#38bdf8; border:1px solid rgba(56,189,248,0.22); }
        .cp-violet { background:rgba(167,139,250,0.1); color:#a78bfa; border:1px solid rgba(167,139,250,0.22); }
        .cp-green  { background:rgba(52,211,153,0.1);  color:#34d399; border:1px solid rgba(52,211,153,0.22); }
        .cp-amber  { background:rgba(251,191,36,0.1);  color:#fbbf24; border:1px solid rgba(251,191,36,0.22); }
        .cp-red    { background:rgba(248,113,113,0.1); color:#f87171; border:1px solid rgba(248,113,113,0.22); }
        .cp-indigo { background:rgba(99,102,241,0.1);  color:#818cf8; border:1px solid rgba(99,102,241,0.22); }

        /* ── Contact ─────────────────────────────────────────────────────── */
        .contact-section { padding:90px 8%; }
        .contact-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; max-width:960px; margin:0 auto; }
        @media(max-width:760px){ .contact-inner { grid-template-columns:1fr; gap:36px; } }

        .contact-left h2 { font-size:clamp(24px,3.5vw,36px); font-weight:800; margin-bottom:14px; letter-spacing:-0.3px; }
        .contact-left p  { font-size:15px; line-height:1.7; margin-bottom:28px; }
        .dark  .contact-left p { color:#64748b; }
        .light .contact-left p { color:#94a3b8; }

        .contact-detail { display:flex; align-items:center; gap:12px; margin-bottom:14px; font-size:14px; }
        .contact-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
        .dark  .contact-icon { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); }
        .light .contact-icon { background:#f1f5f9; border:1px solid #e2e8f0; }

        .contact-form {
          display:flex; flex-direction:column; gap:14px;
          padding:32px; border-radius:18px; backdrop-filter:blur(14px);
        }
        .dark  .contact-form { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); }
        .light .contact-form { background:white; border:1px solid rgba(0,0,0,0.07); box-shadow:0 4px 20px rgba(0,0,0,0.06); }

        .form-input {
          padding:12px 14px; border-radius:9px; font-size:14px; font-family:'Outfit',sans-serif;
          outline:none; transition:border-color 0.2s; resize:none;
        }
        .dark  .form-input { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); color:#e2e8f0; }
        .dark  .form-input:focus { border-color:rgba(99,102,241,0.45); }
        .dark  .form-input::placeholder { color:#334155; }
        .light .form-input { background:#f8fafc; border:1px solid #e2e8f0; color:#1e293b; }
        .light .form-input:focus { border-color:#818cf8; }

        .form-submit {
          padding:13px; border-radius:10px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff;
          font-size:14px; font-weight:700; font-family:'Outfit',sans-serif;
          box-shadow:0 6px 20px rgba(99,102,241,0.4); transition:all 0.2s;
        }
        .form-submit:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(99,102,241,0.55); }

        /* ── Footer ──────────────────────────────────────────────────────── */
        .footer {
          padding:32px 8%; display:flex; justify-content:space-between; align-items:center;
          flex-wrap:wrap; gap:12px; position:relative; z-index:5;
          font-size:13px; font-family:'JetBrains Mono',monospace;
        }
        .dark  .footer { background:rgba(255,255,255,0.02); border-top:1px solid rgba(255,255,255,0.06); color:#334155; }
        .light .footer { background:rgba(0,0,0,0.02); border-top:1px solid rgba(0,0,0,0.06); color:#cbd5e1; }
        .footer-links { display:flex; gap:20px; }
        .footer-link { cursor:pointer; transition:color 0.2s; text-decoration:none; }
        .dark  .footer-link:hover { color:#a5f3fc; }
        .light .footer-link:hover { color:#1e40af; }

        /* ── Divider ─────────────────────────────────────────────────────── */
        .section-sep { height:1px; margin:0 8%; }
        .dark  .section-sep { background:rgba(255,255,255,0.05); }
        .light .section-sep { background:rgba(0,0,0,0.06); }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} id="front-canvas" style={{ opacity: isDark ? 1 : 0 }} />

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="nav-logo">🌌 AchieveTrack</div>
        <div className="nav-actions">
          <button className="nav-btn btn-theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button className="nav-btn btn-login"
            onClick={() => (window.location.href = "/login")}>
            Sign In →
          </button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ position: "relative", zIndex: 5 }}>
        <div className="hero-inner">
          <div className="hero-tagline">🌟 Beyond Grades. Beyond Limits.</div>
          <h1 className="hero-title">
            Student Achievement<br />
            <span className="accent">Tracker</span> 🚀
          </h1>
          <p className="hero-sub">
            Every certificate tells a story. Every competition shapes a journey.
            AchieveTrack transforms scattered achievements into a verified,
            dynamic digital portfolio that reflects true student excellence.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => (window.location.href = "/login")}>
              Start Building Your Journey
            </button>
            <button className="cta-secondary" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
              Explore Features ↓
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">450+</div>
              <div className="stat-lbl">Active Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">1.2K</div>
              <div className="stat-lbl">Achievements Logged</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">98%</div>
              <div className="stat-lbl">Approval Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">6</div>
              <div className="stat-lbl">Categories</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section id="features" className="features-section">
        <div className="features-header">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need<br />to track excellence</h2>
          <p className="section-desc">A full-stack platform built for students and admins to manage achievements seamlessly.</p>
        </div>
        <div className="features-grid">
          {[
            { icon: "📊", title: "Smart Analytics",        desc: "Track participation, growth trends, and performance metrics in real time with beautiful charts." },
            { icon: "🏆", title: "Verified Records",        desc: "Secure admin approval workflows ensure every achievement is credible and authentic." },
            { icon: "🌍", title: "Holistic Development",    desc: "Academics, sports, arts, volunteering & innovation — all in one unified place." },
            { icon: "⚡", title: "Seamless Experience",     desc: "Intuitive dashboards designed for both students and administrators with dark/light themes." },
            { icon: "📥", title: "Export & Reports",        desc: "Download CSV reports, share your portfolio, and present achievements to institutions." },
            { icon: "🔒", title: "Role-Based Access",       desc: "Students manage their own records while admins retain full control over approvals." },
          ].map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-glow"></div>
              <div className="feat-icon-wrap">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <p  className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── How it works ────────────────────────────────────────────────────── */}
      <section className="how-section">
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Simple. Transparent. Powerful.</h2>
        </div>
        <div className="steps-grid">
          {[
            { n: "01", title: "Create Account",    desc: "Sign up as a student in seconds using your college email." },
            { n: "02", title: "Log Achievement",   desc: "Submit your event, category, title and date from your dashboard." },
            { n: "03", title: "Admin Review",      desc: "College admin reviews and approves or rejects the submission." },
            { n: "04", title: "Build Portfolio",   desc: "Approved entries form your verified achievement portfolio." },
          ].map((s, i) => (
            <div className="step-item" key={i}>
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p   className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── Categories ──────────────────────────────────────────────────────── */}
      <section className="cat-section">
        <div className="section-label">Categories</div>
        <h2 className="section-title">Track every kind of win</h2>
        <p className="section-desc" style={{ margin: "14px auto 0" }}>
          From hackathons to marathons, cultural fests to community service — log it all.
        </p>
        <div className="cat-pills">
          <span className="cat-pill cp-blue">  💻 Technical</span>
          <span className="cat-pill cp-violet">🎭 Cultural</span>
          <span className="cat-pill cp-green"> ⚽ Sports</span>
          <span className="cat-pill cp-amber"> 🤝 Volunteering</span>
          <span className="cat-pill cp-red">   🎨 Arts & Design</span>
          <span className="cat-pill cp-indigo">🔬 Research & Innovation</span>
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section className="contact-section">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label">Contact</div>
            <h2>📩 Get In Touch</h2>
            <p>Have questions, feedback, or want to collaborate? We'd love to hear from you.</p>
            <div className="contact-detail">
              <div className="contact-icon">📧</div>
              <span>support@achievetrack.edu</span>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">🏫</div>
              <span>Student Affairs Division</span>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">🕐</div>
              <span>Mon – Fri, 9 AM – 5 PM</span>
            </div>
          </div>

          <div className="contact-form">
            <input className="form-input" type="text"  placeholder="Your Name" />
            <input className="form-input" type="email" placeholder="Your Email" />
            <input className="form-input" type="text"  placeholder="Subject" />
            <textarea className="form-input" rows={4} placeholder="Your Message"></textarea>
            <button className="form-submit">Send Message →</button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <span>🌌 AchieveTrack © 2026 • Empowering Student Excellence</span>
        <div className="footer-links">
          <span className="footer-link">Privacy</span>
          <span className="footer-link">Terms</span>
          <span className="footer-link" onClick={() => (window.location.href = "/login")}>Sign In</span>
        </div>
      </footer>

    </div>
  );
}