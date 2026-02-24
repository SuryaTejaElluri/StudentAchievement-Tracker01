import React, { useEffect, useRef, useState } from "react";

export default function StudentDashboard() {
  const starsRef = useRef(null);

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

  const [modalRecord, setModalRecord] = useState(null);

  useEffect(() => {
    document.documentElement.style.cssText += `
      margin:0; padding:0; width:100%; height:100%;
      background:
        radial-gradient(at 50% 20%, rgba(22,25,60,0.92), transparent 60%),
        radial-gradient(at 80% 80%, rgba(10,18,45,0.88), transparent 70%),
        linear-gradient(180deg, #07102a 0%, #021025 100%);
      background-size:cover;
      background-repeat:no-repeat;
      background-position:center;
    `;

    document.body.style.cssText += `
      margin:0; padding:0; width:100%; min-height:100%;
      background:inherit;
    `;
  }, []);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let count = Math.min(Math.max(Math.round((vw * vh) / 350000), 25), 90);
    const stars = [];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "star subtle";
      s.style.top = Math.random() * vh + "px";
      s.style.left = Math.random() * vw + "px";
      s.style.width = s.style.height = Math.random() * 1.5 + 0.6 + "px";
      s.style.opacity = Math.random() * 0.5 + 0.18;
      s.style.animationDuration = Math.random() * 18 + 12 + "s";
      s.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
      container.appendChild(s);
      stars.push(s);
    }

    return () => stars.forEach((s) => s.remove());
  }, []);

  return (
    <div className="student-dashboard-root">
      <style>{`
        .student-dashboard-root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          position: relative;
          overflow-x: hidden;
          background:
            radial-gradient(at 50% 20%, rgba(22,25,60,0.92), transparent 60%),
            radial-gradient(at 80% 80%, rgba(10,18,45,0.88), transparent 70%),
            linear-gradient(180deg, #07102a 0%, #021025 100%);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .dashboard-content {
          width: 100%;
          max-width: 1400px;
          padding: 32px 40px;
          box-sizing: border-box;
          z-index: 5;
          margin-left: 300px;
        }

        .navbar-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          background: rgba(8,10,30,0.9);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 28px rgba(0,0,0,0.45);
          margin-bottom: 28px;
        }
        .navbar-brand {
          color: #e6ffff;
          font-size: 22px;
          font-weight: 700;
          text-decoration: none;
        }

        .btn {
          border-radius: 10px;
          padding: 10px 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
        .btn-success {
          background: linear-gradient(90deg,#06d6a0,#00b894);
          color: #002b20;
        }
        .btn-primary {
          background: linear-gradient(90deg,#0b67ff,#00baff);
          color: #fff;
        }
        .btn-info {
          background: linear-gradient(90deg,#00d2ff,#00a3ff);
          color:#002036;
        }
        .btn-sm { padding: 6px 10px; font-size: 13px; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .card {
          background: rgba(18,18,40,0.88);
          border-radius: 12px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 12px 32px rgba(0,0,0,0.45);
        }

        .stat-card {
          text-align: center;
          transition: .12s;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 50px rgba(0,200,255,0.06);
        }

        .records-card { margin-top: 30px; }

        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead tr { background: rgba(255,255,255,0.03); }
        th, td { padding: 14px 16px; font-size: 14px; color: #eafefe; }
        tbody tr td {
          border-top: 1px dashed rgba(255,255,255,0.04);
        }

        .badge {
          padding: 8px 12px;
          border-radius: 10px;
          font-weight: 800;
        }
        .badge-success { background:#00ffcc; color:#003322; }
        .badge-warning { background:#ffcc00; color:#2a1f00; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index: 999;
        }
        .modal-card {
          background: rgba(10,12,28,0.96);
          padding: 22px;
          border-radius: 12px;
          max-width: 520px;
          width: 100%;
        }

        #stars {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: fall linear infinite;
          box-shadow: 0 0 2px rgba(255,255,255,0.2);
        }
        .star.subtle {
          box-shadow: 0 0 2px rgba(255,255,255,0.12);
        }

        @keyframes fall {
          0% { transform: translateY(-8vh) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--drift, 20px)); opacity: 0; }
        }

        @media (max-width: 1000px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .dashboard-content { padding: 20px; }
        }
      `}</style>

      <div id="stars" ref={starsRef}></div>

      <div className="dashboard-content">
        <div className="navbar-custom">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="#" className="navbar-brand">AchieveTrack</a>
            <span style={{ opacity: 0.75 }}>Student Dashboard</span>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span>Welcome, Student!</span>
            <a href="/" className="btn btn-sm btn-info">Logout</a>
          </div>
        </div>

        <h2 style={{ marginBottom: 20 }}>My Achievements</h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <button className="btn btn-success">Submit New Achievement</button>
          <button className="btn btn-primary">Generate Portfolio (PDF)</button>
        </div>

        <div className="dashboard-grid">
          <div className="card stat-card">
            <h4>Total Achievements</h4>
            <h1>{records.length}</h1>
          </div>

          <div className="card stat-card">
            <h4>Pending Approval</h4>
            <h1>{records.filter(r => r.status === "Pending").length}</h1>
          </div>

          <div className="card stat-card">
            <h4>Top Category</h4>
            <h1>Sports</h1>
          </div>
        </div>

        <div className="card records-card">
          <h4 style={{ marginBottom: 12 }}>My Records</h4>

          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Title/Award</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.event}</td>
                  <td>{r.category}</td>
                  <td>{r.title}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`badge ${
                      r.status === "Approved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => setModalRecord(r)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalRecord && (
          <div className="modal-overlay" onClick={() => setModalRecord(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>{modalRecord.event}</h3>
              <p><strong>Category:</strong> {modalRecord.category}</p>
              <p><strong>Title/Award:</strong> {modalRecord.title}</p>
              <p><strong>Date:</strong> {modalRecord.date}</p>
              <p><strong>Status:</strong> {modalRecord.status}</p>

              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button className="btn btn-sm btn-info" onClick={() => setModalRecord(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
