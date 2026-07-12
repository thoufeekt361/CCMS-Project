import { Link } from "react-router-dom";

function StudentNavbar() {
  return (
    <nav className="student-navbar">

      <div className="logo-section">
        <img src="/Photos/logo.png" alt="Logo" className="nav-logo" />
        <h2>CCMS</h2>
      </div>

      <ul className="student-nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

    </nav>
  );
}

export default StudentNavbar;