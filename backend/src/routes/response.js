const express = require("express");
const router = express.Router();
const Response = require("../models/Response.js");
const authenticateToken = require("../middleware/authenticateToken.js");
const rateLimit = require("express-rate-limit");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require("dotenv").config(); // Load environment variables

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// *Rate Limiter for AI Analysis API (5 requests per minute per IP)*
const aiAnalysisLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: "Too many requests, please try again later." },
});

// *Save User Responses*
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || responses.length === 0) {
      return res.status(400).json({ error: "Responses are required." });
    }

    const response = new Response({
      user: req.user.id,
      responses: responses,
    });

    await response.save();
    console.log("✅ Responses saved successfully");

    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("❌ Error saving responses:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// *AI Analysis Route (with Rate Limiting)*
router.post("/ai-analysis", aiAnalysisLimiter, async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || responses.length === 0) {
      return res.status(400).json({ error: "Responses data is required." });
    }

    let prompt = `You are a professional psychological expert.Provide the top 1-2 potential mental health concerns and a single, brief suggestion in points for each under 50 words, based on the following responses: \n\n${JSON.stringify(responses)}`;

    console.log("🔹 Sending request to Gemini AI...");

    const responseText = await getGeminiOutput(prompt);

    console.log("✅ AI Analysis Success");
    res.status(201).json({ analysis: responseText });

  } catch (error) {
    console.error("❌ Error in AI Analysis:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// *Function to Get AI Response from Google Gemini*
async function getGeminiOutput(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(prompt);

    console.log("🔹 Gemini API Response:" + response);
    
    
    // Check if response structure is valid
    if (!response || !response.response || !response.response.text) {
      throw new Error("Invalid AI response format");
    }
    console.log(response.response.text());
    
    return response.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error("AI service unavailable, please try again later.");
  }
}

module.exports = router;