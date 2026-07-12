import { useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import StudentNavbar from "../components/StudentNavbar";


function Profile() {
  // 1. Initialize state with all values from localStorage
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem("name") || "",
    registerNo: localStorage.getItem("registerNo") || "",
    email: localStorage.getItem("email") || "",
    branch: localStorage.getItem("branch") || "",
    semester: localStorage.getItem("semester") || "",
    role: localStorage.getItem("role") || "",
  });

  // 2. Handle input changes dynamically as the user types (Strongly typed)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Save modified fields back to localStorage
  const handleSave = () => {
    localStorage.setItem("name", profile.name);
    localStorage.setItem("registerNo", profile.registerNo);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("branch", profile.branch);
    localStorage.setItem("semester", profile.semester);
    localStorage.setItem("role", profile.role);
    setIsEditing(false);
  };

  // 4. Cancel edits and revert state back to original localStorage values
  const handleCancel = () => {
    setProfile({
      name: localStorage.getItem("name") || "",
      registerNo: localStorage.getItem("registerNo") || "",
      email: localStorage.getItem("email") || "",
      branch: localStorage.getItem("branch") || "",
      semester: localStorage.getItem("semester") || "",
      role: localStorage.getItem("role") || "",
    });
    setIsEditing(false);
  };

  // --- Clean Inline Styling Architecture with TypeScript Safety ---
  const styles: Record<string, CSSProperties> = {
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
      <StudentNavbar />
      <div className="profile-card" style={styles.card}>
        <div className="profile-avatar" style={styles.avatar}>👨‍🎓</div>

        <h2 style={styles.title}>Student Profile</h2>

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

          {/* Register No Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Register No</span>
            {isEditing ? (
              <input
                type="text"
                name="registerNo"
                value={profile.registerNo}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.registerNo}</span>
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

          {/* Branch Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Branch</span>
            {isEditing ? (
              <input
                type="text"
                name="branch"
                value={profile.branch}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.branch}</span>
            )}
          </div>

          {/* Semester Field */}
          <div className="detail-row" style={styles.row}>
            <span style={styles.label}>Semester</span>
            {isEditing ? (
              <input
                type="text"
                name="semester"
                value={profile.semester}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span style={styles.value}>{profile.semester}</span>
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

        {/* Dynamic Action Buttons */}
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

export default Profile;