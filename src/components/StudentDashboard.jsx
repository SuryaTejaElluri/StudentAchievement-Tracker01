import React, { useEffect, useRef, useState } from "react";

export default function StudentDashboard() {
  const starsRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  const [records] = useState([
    {
      event: "National Robotics Olympiad",
      category: "Technical",
      title: "1st Place Winner",
      date: "2025-08-15",
      status: "Approved",
    },
    {
      event: "Inter-College Debate",
      category: "Cultural",
      title: "Participant",
      date: "2025-07-20",
      status: "Approved",
    },
    {
      event: "Community Cleanup Drive",
      category: "Volunteering",
      title: "Volunteer",
      date: "2025-09-05",
      status: "Pending",
    },
  ]);

  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);

  // Animated counters
  useEffect(() => {
    let t = 0;
    let p = 0;
    const totalVal = records.length;
    const pendingVal = records.filter(r => r.status === "Pending").length;

    const interval = setInterval(() => {
      if (t < totalVal) t++;
      if (p < pendingVal) p++;
      setTotal(t);
      setPending(p);
      if (t === totalVal && p === pendingVal) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, [records]);

  // Stars (only dark mode)
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    container.innerHTML = "";

    if (theme === "dark") {
      for (let i = 0; i < 120; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = Math.random() * 6 + 6 + "s";
        star.style.width = star.style.height =
          Math.random() * 2 + 1 + "px";
        container.appendChild(star);
      }
    }
  }, [theme]);

  const getTopCategory = () => {
    const count = {};
    records.forEach(r => count[r.category] = (count[r.category] || 0) + 1);
    return Object.keys(count).reduce((a,b) => count[a] > count[b] ? a : b);
  };

  return (
    <div className={`page ${theme}`}>
      <style>{`
        html, body, #root {
          margin:0;
          padding:0;
          width:100%;
          height:100%;
          overflow-x:hidden;
          font-family:'Segoe UI',sans-serif;
        }

        .page {
          width:100%;
          min-height:100vh;
          position:relative;
          transition:background 0.4s ease, color 0.4s ease;
        }

        /* 🌙 Dark Theme */
        .dark {
          background:
            radial-gradient(circle at 20% 20%, #1b2735 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, #090a0f 0%, transparent 50%),
            linear-gradient(to bottom, #000010 0%, #050519 50%, #000000 100%);
          color:white;
        }

        /* ☀ Light Theme */
        .light {
          background:linear-gradient(to right,#eef2f3,#dfe9f3);
          color:#111;
        }

        .container {
          max-width:1100px;
          width:90%;
          margin:0 auto;
          padding:40px 100px;
        }

        .navbar {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:15px 20px;
          border-radius:12px;
          margin-bottom:25px;
          transition:0.3s;
        }

        .dark .navbar {
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
        }

        .light .navbar {
          background:white;
          border:1px solid #ddd;
        }

        .btn {
          padding:8px 14px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          font-size:13px;
          font-weight:600;
          margin-left:10px;
          transition:0.3s;
        }

        .btn:hover {
          transform:translateY(-3px);
        }

        .toggle-btn {
          background:#6c63ff;
          color:white;
        }

        .logout-btn {
          background:#ff4d4d;
          color:white;
        }

        .add-btn {
          background:#00c6ff;
          color:white;
          margin-bottom:20px;
        }

        .grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px;
        }

        .card {
          padding:30px;
          border-radius:12px;
          transition:0.3s;
        }

        .dark .card {
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
        }

        .light .card {
          background:white;
          border:1px solid #ddd;
        }

        .card:hover {
          transform:translateY(-6px);
          box-shadow:0 10px 25px rgba(0,0,0,0.3);
        }

        table {
          width:100%;
          margin-top:15px;
          border-collapse:collapse;
          font-size:13px;
        }

        th, td { padding:8px; }

        tr { border-top:1px solid rgba(255,255,255,0.1); }

        .light tr { border-top:1px solid #ddd; }

        .badge {
          padding:4px 8px;
          border-radius:6px;
          font-size:11px;
          font-weight:bold;
        }

        .approved { background:#00ffcc; color:#002b2b; }
        .pending { background:#ffcc00; color:#2b2000; }

        /* Stars */
        #stars {
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
        }

        .star {
          position:absolute;
          top:-10px;
          background:white;
          border-radius:50%;
          opacity:0.8;
          animation:fall linear infinite;
        }

        @keyframes fall {
          0% { transform:translateY(-10vh); opacity:0; }
          10% { opacity:1; }
          100% { transform:translateY(110vh); opacity:0; }
        }

        .footer {
          margin-top:50px;
          padding:15px;
          text-align:center;
          font-size:13px;
          opacity:0.8;
        }

        @media(max-width:900px){
          .grid { grid-template-columns:1fr; }
        }

      `}</style>

      <div id="stars" ref={starsRef}></div>

      <div className="container">
        <div className="navbar">
          <h3>🌌 AchieveTrack</h3>
          <div>
            <button
              className="btn toggle-btn"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? "Light ☀" : "Dark 🌙"}
            </button>

            <button
              className="btn logout-btn"
              onClick={() => (window.location.href = "/")}
            >
              Logout
            </button>
          </div>
        </div>

        <button className="btn add-btn">
          ➕ Add Achievement 
        </button>

        <h3>My Achievements</h3>

        <div className="grid">
          <div className="card">
            <h5>Total Achievements</h5>
            <h1>{total}</h1>
          </div>

          <div className="card">
            <h5>Pending Approval</h5>
            <h1>{pending}</h1>
          </div>

          <div className="card">
            <h5>Top Category</h5>
            <h1>{getTopCategory()}</h1>
          </div>
        </div>

        <div className="card" style={{marginTop:"25px"}}>
          <h4>My Records</h4>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r,i)=>(
                <tr key={i}>
                  <td>{r.event}</td>
                  <td>{r.category}</td>
                  <td>{r.title}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`badge ${r.status==="Approved"?"approved":"pending"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          © 2026 AchieveTrack • Empowering Student Excellence 🚀
        </div>

      </div>
    </div>
  );
}