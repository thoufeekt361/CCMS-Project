import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "student",
        registerNo,
        branch,
        semester,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="navbar1">
        <Navbar />
      </div>

      <div className="form-box">

        <h1 className="register-heading">
          Student Registration
        </h1>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <label>Register Number</label>
        <input
          type="text"
          placeholder="Enter your register number"
          value={registerNo}
          onChange={(e) => setRegisterNo(e.target.value)}
        />

        <label>Branch</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <label>Semester</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
          <option value="S4">S4</option>
          <option value="S5">S5</option>
          <option value="S6">S6</option>
          <option value="S7">S7</option>
          <option value="S8">S8</option>
        </select>

        <button
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="login-link">
          Already have an account?{" "}
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

export default Register;