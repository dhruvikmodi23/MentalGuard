const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {OAuth2Client} = require("google-auth-library");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // Only receive name, email, password from frontend

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "Email is already registered.",
      });
    }

    // Default isAdmin to false when registering from this route
    user = new User({ name, email, password, isAdmin: false, isPremium: false, googleId : null });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name, // Include name in the payload
        email: user.email,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});


router.post("/google", async (req, res) => {
  console.log("Inside Google controller");

  const { name, email, password, token } = req.body;

  console.log("Received token:", token);
  // console.log("Received role:", role);

  try {
      // Verify Google ID Token
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name, sub:googleId } = ticket.getPayload();

      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
          // Create new user (Sign Up)
          user = new User({
              googleId,
              email,
              name: name, // Use Google Name as Username
              password: null, // No password needed for Google Auth
              isAdmin: false,
              isPremium: false,
          });
          await user.save();
      }
      if (!user.googleId) {
          // If user exists but was created with email/password, update googleId
          user.googleId = googleId;
          await user.save();
      }

      // Generate JWT access & refresh tokens
      // Save refresh token to user document
      const payload = {
        user: {
          id: user.id,
          name: user.name, // Include name in the payload
          email: user.email,
          isAdmin: user.isAdmin,
          isPremium: user.isPremium,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) res.status(500).send("Server error");
          res.json({ token });
        }
      );
      // Send response
      res.json({
          message: user.googleId ? "Login Successful" : "Sign-Up Successful",
          accessToken,
          refreshToken,
          user,
      });
  } catch (error) {
      console.error("Google authentication error:", error);
      res.status(500).json({ error: "Google authentication failed" });
  }
}
);

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Logged-In User
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
