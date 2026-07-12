
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddComplaint from "./pages/AddComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import ManageStudents from "./pages/ManageStudents";
import AdminProfile from "./pages/AdminProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Student */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/add-complaint"
          element={<AddComplaint />}
        />
        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/manage-complaints"
          element={<ManageComplaints />}
        />
        <Route
          path="/manage-students"
          element={<ManageStudents />}
        />
        <Route
          path="/admin-profile"
          element={<AdminProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;