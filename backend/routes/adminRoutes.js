const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");


router.get("/complaints", adminController.getAllComplaints);
router.put("/status/:id", adminController.updateStatus);
router.get("/students", adminController.getStudents);

module.exports = router;