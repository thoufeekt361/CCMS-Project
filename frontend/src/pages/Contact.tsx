import Navbar from "../components/Navbar";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="info-container">
        <h2 className="head">Contact Us</h2>

        <p>
          If you have any questions, suggestions, or need assistance
          regarding the Campus Complaint Management System, feel free
          to contact us.
        </p>

        <div className="contact-card">
          <h3>Support Information</h3>

          <p>
            <strong>Email:</strong> support@ccms.edu
          </p>

          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>

          <p>
            <strong>Office:</strong> Student Affairs Department
          </p>

          <p>
            <strong>Working Hours:</strong> Monday - Friday
            <br />
            9:00 AM - 5:00 PM
          </p>
        </div>

        <div className="contact-card">
          <h3>Campus Address</h3>

          <p>
            Campus Complaint Management System
            <br />
            College Administration Block
            <br />
            Your College Name
            <br />
            Kerala, India
          </p>
        </div>

        <p className="contact-footer">
          We are committed to resolving campus issues quickly and
          ensuring a better experience for all students.
        </p>
      </div>
    </>
  );
}

export default Contact;