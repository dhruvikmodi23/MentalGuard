const express = require("express");
const router = express.Router();
const Response = require("../models/Response");
const authenticateToken = require("../middleware/authenticateToken");
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyBAqhUaPiM56huvVbs8na74CrdC50tzo68');

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { responses } = req.body;

    const response = new Response({
      user: req.user.id,
      responses: responses,
    });
    await response.save();
        console.log("response saved");
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

router.post("/ai-analysis", async (req, res) => {
  try {
    const { responses } = req.body;
    

    let prompt=`be my phycological expert and provide feedback based on data which i shared and analyze what mental health issue im facing and provide its solution for that problem give detail summry and act like mental health therapy coach` + {responses}
    
    const responseText = await getGeminiOutput(prompt);
    
    res.status(201).json(responseText);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

async function getGeminiOutput(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const response = await model.generateContent(prompt);
  return response.response.text();
}
 
module.exports = router;
