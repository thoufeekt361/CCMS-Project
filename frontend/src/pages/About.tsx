import Navbar from "../components/Navbar";

function About() {
  return (
    <>
        <Navbar />
        <div className="info-container">
          <h2 className="head">About CCMS</h2>

          <p>
            The Campus Complaint Management System (CCMS) is a web-based
            platform designed to simplify the process of reporting and
            managing complaints within a college campus.
          </p>

          <p>
            Students can easily submit complaints related to classrooms,
            laboratories, hostels, libraries, internet connectivity,
            electrical facilities, water supply, cleanliness, and other
            campus-related issues.
          </p>

          <p>
            The system allows students to track the progress of their
            complaints in real-time while administrators can efficiently
            review, manage, and resolve issues through a centralized
            dashboard.
          </p>

          <h3>Key Features</h3>

          <ul>
            <li>Student Registration and Login</li>
            <li>Online Complaint Submission</li>
            <li>Complaint Status Tracking</li>
            <li>Admin Complaint Management</li>
            <li>Dashboard and Statistics</li>
            <li>Secure User Authentication</li>
            <li>Responsive and User-Friendly Interface</li>
          </ul>

          <h3>Our Mission</h3>

          <p>
            Our mission is to improve communication between students and
            administration by providing a transparent, efficient, and
            reliable complaint management platform that helps create a
            better campus environment.
          </p>
        </div>
    </>
  );
}

export default About;