const mongoose = require("mongoose");
const ResponseSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    responses: [{ question: String, answer: String }],
    require:true
  });
  module.exports = mongoose.model("Response", ResponseSchema);