import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser(e) {
    e.preventDefault();

    if (email === "student@gmail.com" && password === "student123") {
      window.location.href = "/studentdashboard";   // Redirect to student dashboard
    } 
    else if (email === "admin@gmail.com" && password === "admin123") {
      window.location.href = "/admin";              // Admin page if needed
    } 
    else {
      alert("Invalid email or password!");
    }
  }

  return (
    <div className="ach-root">

      <style>{`
        /* PAGE BACKGROUND */
        .ach-root {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #041622, #000000);
          overflow: hidden;
          font-family: "Inter", sans-serif;
          color: #fff;
        }

        /* STARS */
        .ach-stars {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .ach-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
          opacity: 0.8;
          box-shadow: 0 0 6px #fff;
          animation: twinkle 3s infinite ease-in-out,
                     drift 7s infinite linear;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.4); }
          100% { opacity: 0.2; transform: scale(0.9); }
        }

        @keyframes drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        /* SHOOTING STARS */
        .shoot {
          position: absolute;
          width: 250px;
          height: 3px;
          background: linear-gradient(90deg, white, transparent);
          transform: rotate(45deg);
          animation: shoot 4s linear infinite;
        }

        .shoot:nth-child(1) { top: -150px; left: -40px; animation-delay: 0s; }
        .shoot:nth-child(2) { top: -250px; left: 35%; animation-delay: 2s; }
        .shoot:nth-child(3) { top: -350px; left: 70%; animation-delay: 3.2s; }

        @keyframes shoot {
          0% { transform: translate(0,0) rotate(45deg); opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translate(1200px,1100px) rotate(45deg); opacity: 0; }
        }

        /* MAIN LAYOUT */
        .ach-container {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 60px;
          width: 100%;
          max-width: 1500px;
          padding: 60px;
        }

        .ach-title {
          font-size: clamp(40px, 6vw, 85px);
          font-weight: 900;
          margin-bottom: 20px;
        }

        .ach-sub {
          font-size: clamp(16px, 1.8vw, 22px);
          max-width: 700px;
          opacity: 0.85;
        }

        /* FORM */
        .ach-form {
          background: rgba(255,255,255,0.04);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 36px;
          max-width: 480px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        .ach-form-title {
          font-size: 32px;
          text-align: center;
          font-weight: 800;
          margin-bottom: 30px;
        }

        .ach-label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .ach-input {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.5);
          color: #fff;
          margin-bottom: 18px;
          font-size: 16px;
          outline: none;
        }

        .ach-btn {
          width: 100%;
          padding: 16px;
          font-size: 18px;
          font-weight: 800;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(180deg,#0a63ff,#054fd0);
          color: #fff;
          box-shadow: 0 15px 50px rgba(0,102,255,0.4);
          transition: 0.2s;
        }

        .ach-btn:hover {
          transform: translateY(-3px);
        }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .ach-container {
            grid-template-columns: 1fr;
            padding: 30px;
          }
        }

      `}</style>

      {/* STARS */}
      <div className="ach-stars">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="ach-star"
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}
          ></div>
        ))}

        {/* SHOOTING */}
        <div className="shoot"></div>
        <div className="shoot"></div>
        <div className="shoot"></div>
      </div>

      {/* CONTENT */}
      <div className="ach-container">
        <div>
          <h1 className="ach-title">Achieve More, Track Better.</h1>
          <p className="ach-sub">
            Welcome back! Log in to manage your achievements, upload certificates, generate your
            portfolio, and access your student dashboard.
          </p>
        </div>

        {/* FORM */}
        <div className="ach-form">
          <h2 className="ach-form-title">Sign In</h2>

          <form onSubmit={loginUser}>
            <label className="ach-label">Email address</label>
            <input
              type="email"
              className="ach-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="ach-label">Password</label>
            <input
              type="password"
              className="ach-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="ach-btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
