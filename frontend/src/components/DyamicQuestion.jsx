import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicQuestionnaire = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        // Fetch the first question (common for all users)
        axios.get("/api/questions/first").then((res) => setCurrentQuestion(res.data));
    }, []);

    const handleOptionSelect = (option) => {
        const updatedResponses = [...responses, { question: currentQuestion.text, answer: option.text }];
        setResponses(updatedResponses);

        if (option.nextQuestionId) {
            axios.get(`/api/questions/${option.nextQuestionId}`).then((res) => setCurrentQuestion(res.data));
        } else {
            // Submit responses to backend for prediction
            axios.post("/api/responses", { responses: updatedResponses }).then(() => alert("Responses submitted!"));
            setCurrentQuestion(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {currentQuestion ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>
                        <div className="space-y-2">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.text}
                                    className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-xl font-bold">Thank you for completing the questionnaire!</h2>
                )}
            </div>
        </div>
    );
};

export default DynamicQuestionnaire;
