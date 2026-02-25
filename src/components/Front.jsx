// src/components/front.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Front() {
  const [theme, setTheme] = useState("dark");
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    container.innerHTML = "";

    if (theme === "dark") {
      for (let i = 0; i < 60; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = Math.random() * 6 + 6 + "s";
        star.style.width = star.style.height =
          Math.random() * 2 + 1 + "px";
        container.appendChild(star);
      }

      const comet = document.createElement("div");
      comet.className = "comet";
      comet.style.top = "15%";
      container.appendChild(comet);
    }
  }, [theme]);

  return (
    <div className={`page ${theme}`}>
      <style>{`

        html,body,#root{
          margin:0;
          padding:0;
          width:100%;
          min-height:100%;
          overflow-x:hidden;
          overflow-y:auto;
          font-family:'Segoe UI',sans-serif;
        }

        .page{
          min-height:100vh;
          display:flex;
          flex-direction:column;
          overflow:hidden;
        }

        .dark{
          background:
            radial-gradient(circle at 20% 20%, #1b2735 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, #090a0f 0%, transparent 50%),
            linear-gradient(to bottom, #000010 0%, #050519 50%, #000000 100%);
          color:white;
        }

        .light{
          background:linear-gradient(to right,#eef2f3,#dfe9f3);
          color:#111;
        }

        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:18px 5%;
          position:relative;
          z-index:5;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(15px);
          border-bottom:1px solid rgba(255,255,255,0.1);
        }

        .btn{
          padding:8px 14px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          font-weight:600;
          margin-left:10px;
        }

        .toggle-btn{background:#6366f1;color:white;}
        .login-btn{background:#22c55e;color:black;}

        section{
          padding:90px 10%;
          text-align:center;
          position:relative;
          z-index:5;
        }

        .hero-box{
          max-width:950px;
          margin:auto;
          padding:70px;
          border-radius:22px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(18px);
          border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 20px 60px rgba(0,0,0,0.4);
        }

        .tagline{
          font-size:22px;
          margin-bottom:20px;
          letter-spacing:1px;
          background:linear-gradient(90deg,#00eaff,#a855f7,#ff00cc);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          font-weight:600;
        }

        h1{
          font-size:48px;
          margin-bottom:25px;
        }

        p{
          opacity:0.9;
          line-height:1.7;
          font-size:18px;
        }

        .cta-btn{
          margin-top:35px;
          padding:16px 34px;
          font-size:16px;
          border-radius:12px;
          border:none;
          cursor:pointer;
          background:#00eaff;
          color:black;
          font-weight:bold;
          transition:0.3s;
        }

        .cta-btn:hover{
          box-shadow:0 0 25px #00eaff;
          transform:translateY(-3px);
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:30px;
          margin-top:40px;
        }

        .card{
          padding:35px;
          border-radius:18px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.1);
          transition:0.3s;
        }

        .card:hover{
          transform:translateY(-8px);
          box-shadow:0 15px 30px rgba(0,0,0,0.4);
        }

        .contact-wrapper{
          display:flex;
          justify-content:center;
          margin-top:40px;
        }

        .contact-form{
          width:100%;
          max-width:500px;
          display:flex;
          flex-direction:column;
          gap:18px;
          padding:35px;
          border-radius:18px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,0.1);
        }

        .contact-form input,
        .contact-form textarea{
          padding:14px;
          border-radius:8px;
          border:1px solid rgba(255,255,255,0.2);
          background:rgba(255,255,255,0.05);
          color:inherit;
          font-size:15px;
        }

        .contact-form button{
          padding:14px;
          border-radius:8px;
          border:none;
          background:#22c55e;
          font-weight:bold;
          cursor:pointer;
        }

        /* STARS */
        #stars{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          pointer-events:none;
          z-index:0;
          overflow:hidden;
        }

        .star{
          position:absolute;
          top:-10px;
          background:white;
          border-radius:50%;
          opacity:0.8;
          animation:fall linear infinite;
        }

        @keyframes fall{
          0%{transform:translateY(-10vh);opacity:0;}
          10%{opacity:1;}
          100%{transform:translateY(100vh);opacity:0;}
        }

        .comet{
          position:absolute;
          right:100px;
          width:200px;
          height:3px;
          background:linear-gradient(90deg,white,transparent);
          transform:rotate(-35deg);
          animation:shoot 7s linear infinite;
        }

        @keyframes shoot{
          0%{transform:translate(0,0) rotate(-35deg);opacity:0;}
          10%{opacity:1;}
          100%{transform:translate(-400px,400px) rotate(-35deg);opacity:0;}
        }

        /* SMALLER FOOTER */
        .footer{
          padding:40px;
          text-align:center;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(10px);
          border-top:1px solid rgba(255,255,255,0.1);
          font-size:14px;
          position:relative;
          z-index:5;
        }

      `}</style>

      <div id="stars" ref={starsRef}></div>

      {/* NAVBAR */}
      <div className="navbar">
        <div><b>🌌 AchieveTrack</b></div>
        <div>
          <button
            className="btn toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light ☀" : "Dark 🌙"}
          </button>
          <button
            className="btn login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <section>
        <div className="hero-box">

          <div className="tagline">
            🌟 Beyond Grades. Beyond Limits.
          </div>

          <h1>
            Student Achievement Tracker 🚀
          </h1>

          <p>
            Every certificate tells a story. Every competition shapes a journey.
            AchieveTrack transforms scattered achievements into a verified,
            dynamic digital portfolio that reflects true student excellence.
          </p>


          <button
            className="cta-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Start Building Your Journey
          </button>

        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h1>Key Features</h1>
        <div className="grid">
          <div className="card">
            <h3>📊 Smart Analytics</h3>
            <p>Track participation, growth trends, and performance metrics in real time.</p>
          </div>
          <div className="card">
            <h3>🏆 Verified Records</h3>
            <p>Secure admin approvals ensure credibility and authenticity.</p>
          </div>
          <div className="card">
            <h3>🌍 Holistic Development</h3>
            <p>Academics, sports, arts, volunteering & innovation — all in one place.</p>
          </div>
          <div className="card">
            <h3>⚡ Seamless Experience</h3>
            <p>Intuitive dashboards designed for both students and administrators.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section>
        <h2>📩 Get In Touch</h2>
        <p>Have questions or want to collaborate? We'd love to hear from you.</p>

        <div className="contact-wrapper">
          <div className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea rows="4" placeholder="Your Message"></textarea>
            <button>Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="footer">
        🌌 AchieveTrack • Empowering Student Excellence • © 2026
      </div>

    </div>
  );
}