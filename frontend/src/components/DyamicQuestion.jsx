import { useState, useEffect } from "react";
import axios from "axios";

const MentalHealthApp = () => {
  const [question, setQuestion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [testStopped, setTestStopped] = useState(false);

  useEffect(() => {
    fetchQuestion("q1");
  }, []);

  const fetchQuestion = async (nextQuestionId) => {
    if (!nextQuestionId) {
      handleStopTest();
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
    setPreviousQuestions([...previousQuestions, currentQuestionId]);
    setResponses([...responses, { questiontext: question.text, answer }]);
    setCurrentQuestionId(nextQuestionId);
    fetchQuestion(nextQuestionId);
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
      await axios.post(
        "http://localhost:5001/api/responses",
        { responses },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      fetchAIAnalysis();
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  const fetchAIAnalysis = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/responses/ai-analysis", { responses });
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
    }
  };

  const handleRetakeTest = () => {
    setQuestion(null);
               setResponses([]);
               setCurrentQuestionId("q1");
               setPreviousQuestions([]);
               setAnalysis(null);
               setTestStopped(false);
               fetchQuestion("q1");
  };

  // Convert analysis text into an array of bullet points
  const analysisPoints = analysis
    ? typeof analysis === "string"
      ? analysis.split("\n").filter((point) => point.trim() !== "")
      : analysis
    : [];

  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content with proper spacing below navbar */}
      <div className="flex-1 flex justify-center items-center mt-20 p-6">
        {analysis ? (
          <div className="w-full max-w-5xl bg-gray-50 p-10 rounded-lg shadow-lg border border-gray-300">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">AI Analysis Report</h1>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 overflow-y-auto max-h-[70vh]">
              <ul className="space-y-4">
                {analysisPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <span className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold">✔</span>
                    <p className="text-gray-800 text-lg leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleRetakeTest()}
              className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full"
            >
              Retake Assessment
            </button>
          </div>
        ) : (
          <div className="text-center bg-white p-8 shadow-lg rounded-lg w-full max-w-xl">
            <h1 className="text-2xl font-bold text-gray-800">Mental Health Assessment</h1>
            {question && (
              <div className="mt-6">
                <p className="text-lg font-medium text-gray-700 bg-gray-100 p-4 rounded-md shadow-sm">
                  {question.text}
                </p>
                <div className="mt-4 space-y-3">
                  {question.options.map((opt, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(opt.text, opt.nextQuestionId)}
                      className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  {previousQuestions.length > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleStopTest}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Stop Test
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthApp;