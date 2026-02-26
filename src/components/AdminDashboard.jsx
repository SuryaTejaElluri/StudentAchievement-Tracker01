// src/components/AdminDashboard.jsx
import React, { useEffect, useRef, useState } from "react";

export default function AdminDashboard() {
  const [theme, setTheme] = useState("dark");
  const starsRef = useRef(null);

  const [submissions, setSubmissions] = useState([
    { id: 1, student: "Priya Sharma", event: "State Hackathon", category: "Technical", date: "2025-09-21" },
    { id: 2, student: "Rohan Kumar", event: "Blood Donation Camp", category: "Volunteering", date: "2025-09-20" },
    { id: 3, student: "Anjali Verma", event: "AI Workshop", category: "Technical", date: "2025-09-18" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const students = 450;
  const records = 1230;

  // 🌌 Background stars (UNCHANGED)
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
        star.style.width = star.style.height = Math.random() * 2 + 1 + "px";
        container.appendChild(star);
      }
    }
  }, [theme]);

  function handleApprove(id) {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  function handleReject(id) {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  function handleLogout() {
    window.location.href = "/";
  }

  const filtered = submissions.filter(s =>
    (filter === "All" || s.category === filter) &&
    s.student.toLowerCase().includes(search.toLowerCase())
  );

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
          transition:0.4s;
          overflow:hidden;
        }

        .dark{
          background:linear-gradient(to bottom,#000010,#050519,#000000);
          color:#f1f5f9;
        }

        .light{
          background:linear-gradient(to right,#eef2f3,#dfe9f3);
          color:#111;
        }

        .container{
          max-width:1200px;
          width:92%;
          margin:0 auto;
          padding:40px 0;
          flex:1;
          position:relative;
          z-index:5;
        }

        /* ===== NAVBAR ===== */

        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:25px;
        }

        .nav-left{
          display:flex;
          align-items:center;
          gap:25px;
        }

        .nav-links{
          display:flex;
          gap:18px;
          margin-left:20px;
        }

        .nav-item{
          font-size:14px;
          font-weight:500;
          cursor:pointer;
          opacity:0.7;
          transition:0.3s;
          position:relative;
        }

        .nav-item:hover{
          opacity:1;
        }

        .nav-item.active{
          opacity:1;
          font-weight:600;
        }

        .nav-item.active::after{
          content:"";
          position:absolute;
          left:0;
          bottom:-6px;
          width:100%;
          height:2px;
          background:#6366f1;
          border-radius:2px;
        }

        .btn{
          padding:8px 14px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          font-weight:600;
          margin-left:8px;
        }

        .toggle-btn{background:#6366f1;color:white;}
        .logout-btn{background:#ef4444;color:white;}

        /* ===== STATS ===== */

        .stats{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
          margin-bottom:25px;
        }

        .card{
          padding:20px;
          border-radius:12px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.1);
          transition:0.3s;
        }

        .card:hover{
          transform:translateY(-5px);
          box-shadow:0 10px 25px rgba(0,0,0,0.4);
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th,td{padding:10px;}
        th{background:#1e293b;}

        tr:hover{background:rgba(255,255,255,0.05);}

        .success{background:#22c55e;color:black;}
        .danger{background:#ef4444;color:white;}

        /* 🌌 FIXED STARS */

        #stars{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          pointer-events:none;
          z-index:1;
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

        /* ===== FOOTER ===== */

        .footer{
          position:relative;
          padding:1px 5px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(15px);
          border-top:1px solid rgba(255,255,255,0.1);
          overflow:hidden;
          margin-top:150px;
          text-align:center;
        }

        .footer::before{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(120deg,#6a11cb,#2575fc,#ff00cc);
          opacity:0.15;
          animation:wave 12s linear infinite;
        }

        @keyframes wave{
          0%{background-position:0% 50%;}
          100%{background-position:200% 50%;}
        }

        .planet{
          position:absolute;
          border-radius:50%;
          opacity:0.3;
          animation:float 10s infinite alternate ease-in-out;
        }

        .planet.small{
          width:40px;
          height:40px;
          background:radial-gradient(circle,#ff9a00,#ff0066);
          bottom:10px;
          left:10%;
        }

        .planet.blue{
          width:30px;
          height:30px;
          background:radial-gradient(circle,#00c6ff,#0072ff);
          top:10px;
          right:15%;
        }

        @keyframes float{
          from{transform:translateY(0);}
          to{transform:translateY(-15px);}
        }

        @media(max-width:900px){
          .stats{grid-template-columns:1fr;}
        }

      `}</style>

      <div id="stars" ref={starsRef}></div>

      <div className="container">
        <div className="navbar">
          <div className="nav-left">
            <b>🌌 AchieveTrack</b> Admin Panel
            <div className="nav-links">
              <span className="nav-item active">Dashboard</span>
              <span className="nav-item">Submissions</span>
              <span className="nav-item">Reports</span>
              <span className="nav-item">Settings</span>
            </div>
          </div>

          <div>
            <button
              className="btn toggle-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light ☀" : "Dark 🌙"}
            </button>

            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="card">Pending Approvals <b>{filtered.length}</b></div>
          <div className="card">Total Students <b>{students}</b></div>
          <div className="card">Total Records <b>{records}</b></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Event</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s=>(
              <tr key={s.id}>
                <td>{s.student}</td>
                <td>{s.event}</td>
                <td>{s.category}</td>
                <td>{s.date}</td>
                <td>
                  <button className="btn success"
                    onClick={()=>handleApprove(s.id)}>Approve</button>
                  <button className="btn danger"
                    onClick={()=>handleReject(s.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="planet small"></div>
        <div className="planet blue"></div>

        <h3>🌌 AchieveTrack</h3>
        <p>Empowering Student Excellence Across the Galaxy</p>
        <p style={{opacity:0.6,fontSize:"12px"}}>
          © 2026 AchieveTrack • All Rights Reserved 🚀
        </p>
      </div>

    </div>
  );
}