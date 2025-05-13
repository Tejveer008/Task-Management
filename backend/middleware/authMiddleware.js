// authMiddleware.js
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, email, role, etc. }
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" }); // Add return to stop middleware chain
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" }); // Add return to stop middleware chain
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};