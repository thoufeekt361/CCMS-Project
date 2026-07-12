import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminProfile() {
  // 1. Initialize state with values from localStorage
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem("name") || "John Doe", // Fallbacks added for demo purposes
    email: localStorage.getItem("email") || "admin@example.com",
    role: localStorage.getItem("role") || "Super Admin",
  });

  // 2. Handle text input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Save changes to localStorage and close edit mode
  const handleSave = () => {
    localStorage.setItem("name", profile.name);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("role", profile.role);
    setIsEditing(false);
  };

  // 4. Discard unsaved changes and reset back to what is in localStorage
  const handleCancel = () => {
    setProfile({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      role: localStorage.getItem("role") || "",
    });
    setIsEditing(false);
  };

  // --- Inline Styles Objects ---
  const styles = {
    page: {
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh",
    },
    card: {
      maxWidth: "450px",
      margin: "50px auto",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "30px",
      textAlign: "center",
    },
    avatar: {
      fontSize: "50px",
      marginBottom: "10px",
    },
    title: {
      color: "#333",
      marginBottom: "25px",
    },
    detailsGroup: {
      textAlign: "left",
      marginBottom: "25px",
    },
    row: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      fontWeight: "600",
      color: "#666",
      fontSize: "14px",
      marginBottom: "5px",
      textTransform: "uppercase",
    },
    value: {
      color: "#222",
      fontSize: "16px",
      padding: "8px 0",
      borderBottom: "1px solid #eee",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #4a90e2",
      backgroundColor: "#fff",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "20px",
    },
    btnEdit: {
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      width: "100%",
    },
    btnSave: {
      backgroundColor: "#2ecc71",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      flex: 1,
    },
    btnCancel: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      flex: 1,
    },
  };

  return (
    <div className="profile-page" style={styles.page}>
      <AdminNavbar />
      <div className="profile-card" style={styles.card}>
        <div className="profile-avatar" style={styles.avatar}>👨‍💼</div>

        <h2 style={styles.title}>Admin Profile</h2>

        <div className="profile-details" style={styles.detailsGroup}>
          {/* Name Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Name</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Email</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.email}</span>
            )}
          </div>

          {/* Role Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Role</span>
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.role}</span>
            )}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="profile-actions" style={styles.actions}>
          {isEditing ? (
            <>
              <button onClick={handleSave} style={styles.btnSave}>
                Save
              </button>
              <button onClick={handleCancel} style={styles.btnCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} style={styles.btnEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;