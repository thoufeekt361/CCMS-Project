import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  FaBell,
  FaSpinner,
  FaUserCircle,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    axios
      .get("http://localhost:5000/api/complaints")
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((err) => console.log(err));
  };

  const categoryCounts = complaints.reduce(
  (acc: any, complaint) => {
    const category = complaint.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category]++;

    return acc;
  },
  {}
);
const totalComplaints = complaints.length;

const pendingCount = complaints.filter(
  (c) => c.status === "Pending"
).length;

const progressCount = complaints.filter(
  (c) => c.status === "In Progress"
).length;

const resolvedCount = complaints.filter(
  (c) => c.status === "Resolved"
).length;

       const chartData = useMemo(
  () => ({
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        borderWidth: 0,
      },
    ],
  }),
  [complaints]
);

  return (
    <div className="dashboard-layout">

      <div className={`sidebar ${sidebarOpen ? "show" : "hide"}`}>
        <img src="/Photos/logo.png" alt="logo" className="logo1" />

        <ul>
          <li onClick={() => navigate("/admin-dashboard")}>
            <FaChartBar /> Dashboard
          </li>

          <li onClick={() => navigate("/manage-complaints")}>
            <FaClipboardList /> Manage Complaints
          </li>

          <li onClick={() => navigate("/manage-students")}>
            <FaUsers /> Manage Students
          </li>

          <li onClick={() => navigate("/admin-profile")}>
            <FaUser /> Profile
          </li>

          <li onClick={() => navigate("/logout")}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      <div className="main-content">

        <div className="top-bar">
          <FaBars
            className="menu-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />

          <div className="top-icons">
            <FaBell className="top-icon" />

            <div
              className="profile-section"
              onClick={() => navigate("/admin-profile")}
            >
              <FaUserCircle className="top-icon" />
              <p className="profile-name">Admin</p>
            </div>
          </div>
        </div>

        <h1>Admin Dashboard</h1>

        <div className="stats-container">

          <div className="stat-card total-card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <h3>{totalComplaints}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card pending-card">
            <div className="card-icon">
              <FaClock />
            </div>
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card progress-card">
            <div className="card-icon">
              <FaSpinner />
            </div>
            <h3>{progressCount}</h3>
            <p>In Progress</p>
          </div>

          <div className="stat-card resolved-card">
            <div className="card-icon">
              <FaCheckCircle />
            </div>
            <h3>{resolvedCount}</h3>
            <p>Resolved</p>
          </div>

        </div>

        <div className="dashboard-row">

          <div className="bottom-section">

            <div className="chart-container">

              <h2>Complaints by Category</h2>

              <div className="doughnut-wrapper">

                <Doughnut
  data={chartData}
  redraw={false}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }}
/>

                <div className="center-text">
                  <h3>{totalComplaints}</h3>
                  <p>Total Complaints</p>
                </div>

              </div>
              <div className="chart-legend">
                {Object.entries(categoryCounts).map(
                  ([category, count]) => (
                    <p key={category}>
                      {category} - {String(count)}
                    </p>
                  )
                )}
              </div>

            </div>

          </div>

          <div className="table-box">

            <h2>Recent Complaints</h2>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Complaint</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {complaints.slice(0, 5).map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint._id.slice(-6)}</td>
                    <td>{complaint.student?.name || "Student"}</td>
                    <td>{complaint.title}</td>
                    <td>{complaint.status}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;