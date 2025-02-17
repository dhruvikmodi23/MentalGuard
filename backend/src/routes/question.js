const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.get("/first", async (req, res) => {
  try {
    const firstQuestion = await Question.findOne({
      questionId: "q1",
    });
    res.status(201).json(firstQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error for fetch first question");
  }
});

router.get("/:questionId", async (req, res) => {
  try {
    const question = await Question.findOne({
      questionId: req.params.questionId,
    });
    res.status(201).json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error for fetch next question");
  }
});

router.post("/", async (req, res) => {
  try {
    const { questionId, text, options } = req.body;
    const newQuestion = new Question({
      questionId,
      text,
      options,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error for fetch add question");
  }
});

module.exports = router;
