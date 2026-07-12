import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/Photos/logo.png" alt="logo" className="logo" />
        <h1 className="nav">CCMS</h1>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

    </nav>
  );
}

export default Navbar;