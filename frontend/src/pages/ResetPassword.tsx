
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message || "Password updated successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="login-page">
      <div className="navbar1">
          <Navbar />
      </div>
      <div className="form-box">
        <h2>Reset Password</h2>

        <p className="register-message">
          Create a new password for your account
        </p>

        <label>New Password</label>

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label>Confirm Password</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <small>
          Password must contain at least 8 characters.
        </small>

        <button
          type="button"
          onClick={handleResetPassword}
        >
          Update Password
        </button>

        <p className="login-link">
          Back to{" "}
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
      </div>
    </div>
  );
}

export default ResetPassword;