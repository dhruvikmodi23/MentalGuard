import React, { useState, useEffect } from "react";
import axios from "axios";

const MentalHealthApp = () => {
  const [question, setQuestion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState("Q1");
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [chatbotMessage, setChatbotMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [testStopped, setTestStopped] = useState(false);
  
  useEffect(() => {
    fetchQuestion("q1");
  }, []);

  const fetchQuestion = async (questionId) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/questions/${questionId}`);
      setQuestion(res.data);
      console.log(question);
    } catch (error) {
      console.error("Error fetching question", error);
    }
  };

  const handleAnswer = async (answer, nextQuestionId) => {
    setPreviousQuestions([...previousQuestions, currentQuestionId]);
    setResponses([...responses, { questionId: currentQuestionId, answer }]);
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
      fetchQuestion(nextQuestionId);
    } else {
      await submitResponses();
    }
  };

  const handlePrevious = () => {
    if (previousQuestions.length > 0) {
      const lastQuestionId = previousQuestions.pop();
      setCurrentQuestionId(lastQuestionId);
      fetchQuestion(lastQuestionId);
      setResponses(responses.slice(0, -1));
    }
  };

  const handleStopTest = () => {
    setTestStopped(true);
    submitResponses();
  };

  const submitResponses = async () => {
    try {
      await axios.post("http://localhost:5001/api/responses", {
        responses,
      });
      //fetchAIAnalysis();
    } catch (error) {
      console.error("Error submitting responses", error);
    }
  };

  const fetchAIAnalysis = async () => {
    try {
      const res = await axios.post("http://localhost:5000/ai-analysis", {
        userId: "user123",
      });
      setAnalysis(res.data.insights);
    } catch (error) {
      console.error("Error fetching AI analysis", error);
    }
  };

  const handleChatbotMessage = async () => {
    try {
      const res = await axios.get(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(userMessage)}`);
      setChatbotMessage(res.data.response);
      setUserMessage("");
    } catch (error) {
      console.error("Error communicating with chatbot", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold">Mental Health Assessment</h1>
      {!testStopped && question && (
        <div>
          <p className="text-lg mt-4">{question.text}</p>
          <div className="mt-4">
            {question.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(opt.text, opt.nextQuestionId)}
                className="block w-full h-16 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {opt.text}
              </button>
            ))}
          </div>
          {previousQuestions.length > 0 && (
            <button
              onClick={handlePrevious}
              className="mt-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Previous Question
            </button>
          )}
          <button
            onClick={handleStopTest}
            className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Stop Test
          </button>
        </div>
      )}
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold">AI Analysis</h2>
          <p>{analysis}</p>
        </div>
      )}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-bold">Chatbot Support</h2>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask something..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleChatbotMessage}
          className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Send
        </button>
        {chatbotMessage && <p className="mt-2 p-2 bg-white rounded">{chatbotMessage}</p>}
      </div>
    </div>
  );
};

export default MentalHealthApp;
