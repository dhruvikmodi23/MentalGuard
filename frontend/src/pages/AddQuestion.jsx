import React, { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState([{ text: "", nextQuestionId: "" }]);

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, { text: "", nextQuestionId: "" }]);
    };

    const removeOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/questions", {
                text: questionText,
                options,
            });
            alert("Question added successfully!");
            setQuestionText("");
            setOptions([{ text: "", nextQuestionId: "" }]);
        } catch (error) {
            console.error("Error adding question", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold">Question</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="mb-3">
                        <label className="block text-gray-700">Option {index + 1}</label>
                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Next Question ID (optional)"
                            value={option.nextQuestionId}
                            onChange={(e) => handleOptionChange(index, "nextQuestionId", e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-red-500 mt-1"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addOption} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Add Option
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4 block">
                    Save Question
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;
