
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("registerNo", res.data.registerNo || "");
      localStorage.setItem("branch", res.data.branch || "");
      localStorage.setItem("semester", res.data.semester || "");

      if (res.data.role === "admin") {
        localStorage.setItem("role", "admin");
        navigate("/admin-dashboard");
      } else {
        localStorage.setItem("role", "student");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="navbar1">
          <Navbar />
      </div>
      <div className="form-box">

        <h2>
          {role === "student"
            ? "Student Login"
            : role === "admin"
            ? "Admin Login"
            : "Login"}
        </h2>

        <p className="login-message">
          Sign in to continue
        </p>

        <div
          className="role-buttons"
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            className={role === "student" ? "active-btn" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            type="button"
            className={role === "admin" ? "active-btn" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

        <small>Password must contain at least 8 characters.</small>

        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
          style={{
            color: "#2563eb",
            cursor: "pointer",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          Forgot Password?
        </p>

        <button
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>

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

export default Login;