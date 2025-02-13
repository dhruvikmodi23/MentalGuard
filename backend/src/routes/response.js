const express = require("express");
const router = express.Router();
const Response = require("../models/Response");

router.post("/api/responses", async (req, res) => {
  try {
    const { userId, responses } = req.body;

    const response = new Response({
      user: userId,
      responses: {
        questionId: responses.questionId,
        answer: responses.answer,
      },
    });
    await response.save();

    //const aiResponse = await analyzeResponses(responses);
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// async function analyzeResponses(responses) {

//   return { prediction: "Mild Anxiety Detected" };
// }
module.exports = router;
