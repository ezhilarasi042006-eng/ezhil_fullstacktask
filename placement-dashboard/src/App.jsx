
import { useState } from "react";
import {
  LayoutDashboard, BriefcaseBusiness, FileText,
  CalendarDays, Bell, UserRound, Search, LogOut
} from "lucide-react";
import "./App.css";

const jobs = [
  { id: 1, company: "Google", role: "Software Developer", type: "Full Time", location: "Bangalore" },
  { id: 2, company: "Infosys", role: "Data Analyst", type: "Full Time", location: "Chennai" },
  { id: 3, company: "TCS", role: "Graduate Trainee", type: "Internship", location: "Coimbatore" },
  { id: 4, company: "Microsoft", role: "AI Engineer", type: "Full Time", location: "Hyderabad" }
];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState([]);
  const [student, setStudent] = useState("Student");

  const filteredJobs = jobs.filter(job =>
    `${job.company} ${job.role} ${job.location}`
      .toLowerCase().includes(search.toLowerCase())
  );

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Job Openings", icon: BriefcaseBusiness },
    { name: "My Applications", icon: FileText },
    { name: "Interviews", icon: CalendarDays },
    { name: "Notifications", icon: Bell },
    { name: "Profile", icon: UserRound }
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Career<span>Track</span></h2>
        <p className="menu-label">MAIN MENU</p>
        {menu.map(item => (
          <button
            key={item.name}
            className={page === item.name ? "nav active" : "nav"}
            onClick={() => setPage(item.name)}
          >
            <item.icon size={19} /> {item.name}
          </button>
        ))}
        <div className="side-bottom">
          <p>Student Placement Portal</p>
          <button className="nav" onClick={() => setPage("Profile")}>
            <LogOut size={19} /> My Account
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h3>{page}</h3>
            <p>Student Placement Management System</p>
          </div>
          <div className="user">
            <div className="avatar">{student.charAt(0).toUpperCase()}</div>
            <span>{student}</span>
          </div>
        </header>

        {page === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <h1>Welcome, {student}!</h1>
                <p>Your career journey starts here. Track your placement progress.</p>
                <button onClick={() => setPage("Job Openings")}>
                  Explore Jobs →
                </button>
              </div>
              <div className="welcome-icon">🎓</div>
            </section>

            <h3 className="section-title">Placement Overview</h3>
            <section className="stats">
              <div className="stat"><span>Jobs Available</span><h2>{jobs.length}</h2><small>Explore opportunities</small></div>
              <div className="stat"><span>Jobs Applied</span><h2>{applied.length}</h2><small>Your applications</small></div>
              <div className="stat"><span>Interviews</span><h2>1</h2><small>Sample data</small></div>
              <div className="stat"><span>Selected</span><h2>0</h2><small>Sample data</small></div>
            </section>

            <section className="panel">
              <h3>Latest Job Openings</h3>
              {jobs.slice(0, 3).map(job => (
                <div className="job-row" key={job.id}>
                  <div className="company-icon">{job.company[0]}</div>
                  <div className="job-info">
                    <b>{job.role}</b>
                    <p>{job.company} · {job.location}</p>
                  </div>
                  <button className="outline" onClick={() => setPage("Job Openings")}>View</button>
                </div>
              ))}
            </section>
          </>
        )}

        {page === "Job Openings" && (
          <section className="panel">
            <h2>Find Your Next Opportunity</h2>
            <div className="search-box">
              <Search size={19} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search company, role or location..." />
            </div>
            {filteredJobs.map(job => (
              <div className="job-row" key={job.id}>
                <div className="company-icon">{job.company[0]}</div>
                <div className="job-info">
                  <b>{job.role}</b>
                  <p>{job.company} · {job.location} · {job.type}</p>
                </div>
                <button disabled={applied.includes(job.id)}
                  onClick={() => setApplied([...applied, job.id])}>
                  {applied.includes(job.id) ? "Applied ✓" : "Apply Now"}
                </button>
              </div>
            ))}
            {filteredJobs.length === 0 && <p>No matching jobs found.</p>}
          </section>
        )}

        {page === "My Applications" && (
          <section className="panel">
            <h2>My Applications</h2>
            {jobs.filter(j => applied.includes(j.id)).map(job => (
              <div className="job-row" key={job.id}>
                <div className="job-info">
                  <b>{job.role}</b><p>{job.company}</p>
                </div>
                <span className="status">Applied</span>
              </div>
            ))}
            {applied.length === 0 && <p>You have not applied for any jobs yet.</p>}
          </section>
        )}

        {page === "Interviews" && (
          <section className="panel">
            <h2>Interview Schedule</h2>
            <div className="job-row">
              <CalendarDays size={28} />
              <div className="job-info">
                <b>Sample Technical Interview</b>
                <p>Demo schedule · Check with your placement officer</p>
              </div>
            </div>
          </section>
        )}

        {page === "Notifications" && (
          <section className="panel">
            <h2>Notifications</h2>
            <p>🔔 Welcome to the Student Placement Dashboard.</p>
            <p>📢 Check the Job Openings page for available opportunities.</p>
            <p>📅 Contact your placement officer for interview updates.</p>
          </section>
        )}

        {page === "Profile" && (
          <section className="panel profile">
            <h2>Student Profile</h2>
            <label>Student Name</label>
            <input value={student} onChange={e => setStudent(e.target.value)}
              placeholder="Enter your name" />
            <button onClick={() => setPage("Dashboard")}>Save & Return</button>
          </section>
        )}

        <footer>© 2026 CareerTrack · Student Placement Dashboard</footer>
      </main>
    </div>
  );
}