const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
try {
// Get token from header
const token = req.header("Authorization");


if (!token) {
  return res.status(401).json({
    message: "No token, authorization denied",
  });
}

// Verify token
const decoded = jwt.verify(token, "ccmssecret");

// Save user data in request
req.user = decoded;

next();


} catch (err) {
console.log(err);


res.status(401).json({
  message: "Invalid token",
});


}
};

module.exports = authMiddleware;
