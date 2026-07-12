import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaBars,
  FaTachometerAlt,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    const studentId = localStorage.getItem("id");

    if (!studentId) {
      console.log("Student ID not found");
      return;
    }

    axios
      .get(`http://localhost:5000/api/complaints?student=${studentId}`)
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-layout">
      <div className="side">
        <div className={`sidebar ${sidebarOpen ? "show" : "hide"}`}>
          <img src="/Photos/logo.png" alt="logo" className="logo1" />

          <ul>
            <li onClick={() => navigate("/dashboard")}>
              <FaTachometerAlt /> Dashboard
            </li>

            <li onClick={() => navigate("/add-complaint")}>
              <FaPlusCircle /> Add Complaint
            </li>

            <li onClick={() => navigate("/my-complaints")}>
              <FaClipboardList /> My Complaints
            </li>

            <li onClick={() => navigate("/profile")}>
              <FaUser /> Profile
            </li>

            <li onClick={() => navigate("/logout")}>
              <FaSignOutAlt /> Logout
            </li>

            <div className="help-content">
              <h3>Need Help?</h3>
              <p>Contact Support</p>
            </div>

            <button
              className="contact-btn"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </ul>
        </div>
      </div>

      <div
        className={`main-content ${
          sidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="top-bar">
          <FaBars
            className="menu-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />

          <div className="top-icons">
            <FaBell
              className="top-icon"
              onClick={() => navigate("/notifications")}
            />

            <div
              className="profile-section"
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle className="top-icon" />

              <div className="profile-info">
                <span className="profile-role">Student</span>
              </div>
            </div>
          </div>
        </div>

        <h1>Dashboard</h1>

        <div className="stats-container">
          <div className="stat-card total-card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <h3>{complaints.length}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card pending-card">
            <div className="card-icon">
              <FaClock />
            </div>
            <h3>
              {complaints.filter((c) => c.status === "Pending").length}
            </h3>
            <p>Pending</p>
          </div>

          <div className="stat-card progress-card">
            <div className="card-icon">
              <FaSpinner />
            </div>
            <h3>
              {complaints.filter((c) => c.status === "In Progress").length}
            </h3>
            <p>In Progress</p>
          </div>

          <div className="stat-card resolved-card">
            <div className="card-icon">
              <FaCheckCircle />
            </div>
            <h3>
              {complaints.filter((c) => c.status === "Resolved").length}
            </h3>
            <p>Resolved</p>
          </div>
        </div>

        <div className="table-box">
          <h2>Recent Complaints</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length > 0 ? (
                complaints.slice(0, 5).map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint._id.slice(-6)}</td>
                    <td>{complaint.title}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;