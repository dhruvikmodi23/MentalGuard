import React, { useState } from "react";
import axios from "axios";

const AdminAddQuestion = () => {
  const [questionId, setQuestionId] = useState("");
  const [text, setText] = useState("");
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
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/questions", { questionId, text, options });
      alert("Question added successfully");
      setQuestionId("");
      setText("");
      setOptions([{ text: "", nextQuestionId: "" }]);
    } catch (err) {
      console.error("Error adding question", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">Add a New Question</h2>
        <input
          type="text"
          placeholder="Question ID"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Question Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder="Option Text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, "text", e.target.value)}
              className="w-full border p-2 rounded mb-1"
            />
            <input
              type="text"
              placeholder="Next Question ID"
              value={option.nextQuestionId}
              onChange={(e) => handleOptionChange(index, "nextQuestionId", e.target.value)}
              className="w-full border p-2 rounded mb-1"
            />
            <button type="button" className="text-red-500" onClick={() => removeOption(index)}>
              Remove Option
            </button>
          </div>
        ))}
        <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={addOption}>
          Add Option
        </button>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-4">
          Save Question
        </button>
      </form>
    </div>
  );
};

export default AdminAddQuestion;
