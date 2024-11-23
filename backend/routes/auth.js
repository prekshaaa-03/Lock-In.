const express = require("express");
const User = require("../mongo");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.json({ status: "success", message: "Login successful" });
    } else {
      res.json({ status: "error", message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ status: "error", message: "User already exists" });
    } else {
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ status: "success", message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});



module.exports = router;
