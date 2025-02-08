const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    text: String,
    options: [{ text: String  , nextQuestionId: mongoose.Schema.Types.ObjectId }],
    require:true
  });
  module.exports = mongoose.model("Question", QuestionSchema);