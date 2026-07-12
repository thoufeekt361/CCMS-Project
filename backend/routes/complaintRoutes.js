
const express = require("express");
const router = express.Router();

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const upload = require("../middleware/upload");

// Add Complaint (with image upload)
router.post(
  "/add",
  upload.single("image"),
  addComplaint
);

// Get all complaints
router.get(
  "/",
  getComplaints
);

// Update complaint status
router.put(
  "/:id",
  updateComplaintStatus
);

// Delete complaint
router.delete(
  "/:id",
  deleteComplaint
);

module.exports = router;
