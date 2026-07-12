
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import AdminNavbar from "../components/AdminNavbar";

function Logout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  return (
    <>
        {role === "admin" ? <AdminNavbar /> : <StudentNavbar />}
      <div className="logout-page">

        <div className="logout-card">

          <div className="logout-icon">
            🚪
          </div>

          <h2>Logout</h2>

          <p>
            Are you sure you want to logout from
            Campus Complaint Management System?
          </p>

          <div className="logout-buttons">

            

            <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("role");
    localStorage.removeItem("studentName");
    navigate("/login");
  }}
>
  Logout
</button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Logout;