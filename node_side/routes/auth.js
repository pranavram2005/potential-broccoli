const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/admin");
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "Pranav12345";

// Fake user database (Replace with DB)

// Login
router.post(
    "/login",
    [
        body("username").notEmpty(),
        body("password").notEmpty()
    ],
    async (req, res) => {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username }); 

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
          }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
        res.json({ message: "Login successful" });
    }
);

// Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// Middleware to check authentication
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = decoded;
        next();
    });
};

// Protected route (Check auth)
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Authorized" });
});

module.exports = router;
