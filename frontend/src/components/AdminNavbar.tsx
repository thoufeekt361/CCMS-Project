import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">

      <div className="admin-logo-section">
        <img src="/Photos/logo.png" alt="Logo" className="admin-logo" />
        <h2>CCMS</h2>
      </div>

      <ul className="admin-nav-links">
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

    </nav>
  );
}

export default AdminNavbar;