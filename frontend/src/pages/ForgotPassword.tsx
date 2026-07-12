
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSendLink = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      alert(
        res.data.message ||
          "Password reset link sent successfully"
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="login-page">
      <div className="navbar1">
          <Navbar />
      </div>
      <div className="form-box">

        <h2>Forgot Password</h2>

        <p className="register-message">
          Enter your registered email address.
        </p>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <small>
          A password reset link will be sent to your email.
        </small>

        <button
          type="button"
          onClick={handleSendLink}
        >
          Send Reset Link
        </button>

        <p className="login-link">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>

        <p className="register-link">
          New User?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Register Here
          </span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;