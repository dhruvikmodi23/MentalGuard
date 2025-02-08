import { useState } from "react";
import axios from "axios";


const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const { data } = await axios.post("http://localhost:5001/api/chat", { message: input });
            const botMessage = { sender: "bot", text: data.reply };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 h-[80vh] overflow-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-300 self-start"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex w-full max-w-md mt-2">
                <input
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
