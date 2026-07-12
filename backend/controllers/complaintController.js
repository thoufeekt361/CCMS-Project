const Complaint = require("../models/Complaint");
const User = require("../models/User");
const sendEmail = require("../config/mail");

// Add Complaint
exports.addComplaint = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const complaint = new Complaint({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      image: req.file ? req.file.filename : "",
      student: req.body.student,
    });

    await complaint.save();

    const user = await User.findById(req.body.student);

    if (user && user.email) {
      await sendEmail(
        user.email,
        "Complaint Registered Successfully",
        `Hello ${user.name},

Your complaint has been registered successfully.

Complaint Title: ${complaint.title}
Category: ${complaint.category}
Status: Pending

Thank you,
CCMS Team`
      );
    }

    res.json({
      message: "Complaint Added Successfully",
      complaint,
    });
  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Complaints
exports.getComplaints = async (req, res) => {
  try {
    const { student } = req.query;

    let complaints;

    if (student) {
      complaints = await Complaint.find({ student })
        .populate("student", "name email registerNo")
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find()
        .populate("student", "name email registerNo")
        .sort({ createdAt: -1 });
    }

    res.json(complaints);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Complaint Status (FIXED EMAIL ISSUE)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // 1. Find complaint with student info
    const complaint = await Complaint.findById(req.params.id).populate("student");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // 2. Update status
    complaint.status = status;
    await complaint.save();

    // 3. Send email to student
    if (complaint.student && complaint.student.email) {
      await sendEmail(
        complaint.student.email,
        `Complaint Status Updated`,
        `Hello ${complaint.student.name},

Your complaint status has been updated.

Title: ${complaint.title}
Category: ${complaint.category}
New Status: ${complaint.status}

Thank you,
CCMS Team`
      );
    }

    res.json({
      message: "Status Updated Successfully & Email Sent",
      complaint,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      message: "Complaint Deleted Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};