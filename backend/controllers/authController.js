const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../config/mail");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      registerNo,
      branch,
      semester,
    } = req.body;

    // Block admin registration
    if (email.toLowerCase() === "admin@gmail.com") {
      return res.status(403).json({
        message: "Admin registration is not allowed.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
      role: "student",
      registerNo,
      branch,
      semester,
    });

    await newUser.save();

    await sendEmail(
      newUser.email,
      "Welcome to CCMS",
      `Hello ${newUser.name},

Welcome to the College Complaint Management System (CCMS).

Your account has been created successfully.

Role: Student

Thank you,
CCMS Team`
    );

    res.json({
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fixed Admin Login
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET
);

      return res.json({
        token,
        id: "admin",
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      registerNo: user.registerNo,
      branch: user.branch,
      semester: user.semester,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Login Failed",
    });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    // Admin password cannot be reset
    if (req.body.email === "admin@gmail.com") {
      return res.status(400).json({
        message: "Admin password cannot be reset.",
      });
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await sendEmail(
      user.email,
      "CCMS Password Reset",
      `Hello ${user.name},

You requested to reset your CCMS password.

Click the link below:

${resetLink}

If you didn't request this, please ignore this email.

Thank you,
CCMS Team`
    );

    res.json({
      message: "Password reset link sent successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to send reset email",
    });
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    const hash = await bcrypt.hash(
      req.body.password,
      10
    );

    user.password = hash;
    user.resetToken = "";

    await user.save();

    res.json({
      message: "Password Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed",
    });
  }
};

// ================= PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    if (req.user.id === "admin") {
      return res.json({
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};