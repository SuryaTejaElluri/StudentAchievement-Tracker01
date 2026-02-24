// src/components/AdminDashboard.jsx
import React, { useEffect, useRef, useState } from "react";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([
    { id: 1, student: "Priya Sharma", event: "State Hackathon", category: "Technical", date: "2025-09-21" },
    { id: 2, student: "Rohan Kumar", event: "Blood Donation Camp", category: "Volunteering", date: "2025-09-20" },
    { id: 3, student: "Anjali Verma", event: "AI Workshop", category: "Technical", date: "2025-09-18" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [students] = useState(450);
  const [records] = useState(1230);

  const starsRef = useRef(null);

  // Star Background
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.top = Math.random() * window.innerHeight + "px";
      star.style.animationDuration = Math.random() * 10 + 10 + "s";
      container.appendChild(star);
    }
  }, []);

  function handleApprove(id) {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  function handleReject(id) {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  function handleLogout() {
    alert("Logged out successfully!");
    window.location.href = "/";
  }

  const filtered = submissions.filter(s =>
    (filter === "All" || s.category === filter) &&
    s.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="root">
      <style>{`

      body { margin:0 }

      .root {
        position: fixed;
        inset:0;
        background: #0f172a;
        color:#f1f5f9;
        font-family: 'Segoe UI', sans-serif;
        overflow:hidden;
        display:flex;
        justify-content:center;
        align-items:center;
      }

      /* STAR BACKGROUND */
      .star {
        position:absolute;
        width:2px;
        height:2px;
        background:#fff;
        border-radius:50%;
        opacity:0.5;
        animation: float linear infinite;
      }

      @keyframes float {
        from { transform: translateY(0px); }
        to { transform: translateY(100vh); }
      }

      .dashboard-wrapper {
        width:90%;
        max-width:1200px;
        background:#111827;
        border-radius:16px;
        border:1px solid #334155;
        box-shadow:0 0 40px rgba(0,0,0,0.6);
        padding:30px;
        position:relative;
        z-index:5;
      }

      .navbar {
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:25px;
      }

      .logout-btn {
        background:#ef4444;
        border:none;
        padding:8px 14px;
        border-radius:8px;
        color:white;
        cursor:pointer;
        font-weight:500;
      }

      .logout-btn:hover {
        box-shadow:0 0 12px #ef4444;
      }

      h2 {
        color:#6366f1;
        margin-bottom:20px;
      }

      .stats {
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:20px;
        margin-bottom:25px;
      }

      .card {
        background:#1e293b;
        padding:20px;
        border-radius:12px;
        border:1px solid #334155;
        transition:0.3s;
      }

      .card:hover {
        transform:translateY(-5px);
        border-color:#6366f1;
        box-shadow:0 0 20px rgba(99,102,241,0.4);
      }

      .number {
        font-size:28px;
        font-weight:bold;
        margin-top:8px;
      }

      .filters {
        display:flex;
        gap:15px;
        margin-bottom:20px;
      }

      input, select {
        padding:8px;
        border-radius:6px;
        border:1px solid #334155;
        background:#0f172a;
        color:#f1f5f9;
      }

      table {
        width:100%;
        border-collapse:collapse;
        background:#1e293b;
        border-radius:12px;
        overflow:hidden;
      }

      th {
        background:#0f172a;
        padding:12px;
        text-align:left;
        color:#94a3b8;
      }

      td {
        padding:12px;
        border-top:1px solid #334155;
      }

      tr:hover {
        background:#0f172a;
      }

      .btn {
        padding:6px 12px;
        border:none;
        border-radius:6px;
        cursor:pointer;
        margin-right:6px;
        font-weight:500;
      }

      .success {
        background:#22c55e;
        color:black;
      }

      .danger {
        background:#ef4444;
        color:white;
      }

      .success:hover { box-shadow:0 0 10px #22c55e; }
      .danger:hover { box-shadow:0 0 10px #ef4444; }

      `}</style>

      <div ref={starsRef}></div>

      <div className="dashboard-wrapper">
        <div className="navbar">
          <div><b>AchieveTrack</b> Admin Panel</div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h2>Admin Dashboard</h2>

        <div className="stats">
          <div className="card">
            Pending Approvals
            <div className="number">{filtered.length}</div>
          </div>
          <div className="card">
            Total Students
            <div className="number">{students}</div>
          </div>
          <div className="card">
            Total Records
            <div className="number">{records}</div>
          </div>
        </div>

        <div className="filters">
          <input
            placeholder="Search student..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option>All</option>
            <option>Technical</option>
            <option>Volunteering</option>
          </select>
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
            {filtered.map(s => (
              <tr key={s.id}>
                <td>{s.student}</td>
                <td>{s.event}</td>
                <td>{s.category}</td>
                <td>{s.date}</td>
                <td>
                  <button className="btn success" onClick={() => handleApprove(s.id)}>Approve</button>
                  <button className="btn danger" onClick={() => handleReject(s.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}