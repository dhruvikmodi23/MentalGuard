const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      nextQuestionId: { type: String, required: false },
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
