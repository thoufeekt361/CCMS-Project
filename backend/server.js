
const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder for Uploaded Images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("CCMS Backend Running Successfully");
});

// Invalid Route Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

