const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name: {
type: String,
required: true,
},

email: {
type: String,
required: true,
unique: true,
},

password: {
type: String,
required: true,
},

role: {
type: String,
default: "student",
},

registerNo: {
type: String,
default: "",
},

branch: {
type: String,
default: "",
},

semester: {
type: String,
default: "",
},

resetToken: {
type: String,
default: "",
},
});

module.exports = mongoose.model("User", userSchema);
