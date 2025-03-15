const express = require('express');
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB37sruXggjk8JE9L3KAA9ZS2XiNuL74HI`,
            { contents: [{ parts: [{ text: message }] }] }
        );

        const reply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply });
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
