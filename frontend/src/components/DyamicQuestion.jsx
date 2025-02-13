import React, { useState, useEffect } from "react";
import axios from "axios";
const DynamicQuestionnaire = () => {
  const [question, setQuestion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [userId, setUserId] = useState(""); // Mock user ID, replace with actual authentication

  useEffect(() => {
    fetchFirstQuestion();
    setUserId(user._id);
  }, []);

  const fetchFirstQuestion = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/questions/first");
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching question", err);
    }
  };

  const fetchNextQuestion = async (nextQuestionId) => {
    if (!nextQuestionId) {
      submitResponses();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5001/api/questions/${nextQuestionId}`);
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching next question", err);
    }
  };

  const handleAnswer = (answer, nextQuestionId) => {
    setResponses([...responses, { questionId: question.questionId, answer }]);
    fetchNextQuestion(nextQuestionId);
  };

  const submitResponses = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/responses", { userId, responses });
      console.log("AI Response:", res.data.aiResponse);
    } catch (err) {
      console.error("Error submitting responses", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {question ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded hover:bg-blue-600"
              onClick={() => handleAnswer(option.text, option.nextQuestionId)}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default DynamicQuestionnaire;
