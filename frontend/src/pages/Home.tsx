import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="navbar1">
        <Navbar />
    </div>
      

      <div className="hero">
        <div className="hero-content">
          <h1>Campus Complaint Management System</h1>

          <p>
            Submit your complaints, track their status and help us improve our campus.
          </p>

          <button onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src="/Photos/home.jpeg" alt="Complaint" />
        </div>
      </div>
    </>
  );
}

export default Home;