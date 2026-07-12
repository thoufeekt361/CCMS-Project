const Complaint = require("../models/Complaint");
const User = require("../models/User");

exports.getAllComplaints = async (req, res) => {

    const complaints = await Complaint.find();

    res.json(complaints);
};

exports.updateStatus = async (req, res) => {

    await Complaint.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        }
    );

    res.json({
        message: "Status Updated"
    });
};

exports.getStudents = async (req, res) => {

    const students = await User.find({
        role: "student"
    });

    res.json(students);
};