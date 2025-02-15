import { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { text: "Hello, How are you?", sender: "bot" },
        { text: "I'm great! How can I help you?", sender: "user" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
        }
        try {
            const res = await axios.post('http://localhost:5001/api/chat', { message: input });
            setMessages([...messages, userMessage, { sender: 'bot', text: res.data.response }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA]">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
                <div className="bg-[#75E6DA] text-white text-center py-3 text-lg font-semibold rounded-t-lg">
                    AI Counselor ChatBot
                </div>
                <div className="p-4 h-[500px] overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-center mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {msg.sender === "bot" && (
                                <div className="bg-[#01b5a3] text-white w-10 h-10 flex items-center justify-center rounded-full mr-2">
                                    <IoChatbubbleEllipses />
                                </div>
                            )}
                            <div
                                className={`p-3 max-w-xs rounded-xl text-white ${msg.sender === "user" ? "bg-[#01b5a3] text-[#DB9A9A]" : "bg-[#01b5a3]"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-[#75E6DA] p-3 flex items-center rounded-b-lg">
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 rounded-md outline-none bg-[#75E6DA] text-white placeholder-white"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-3 px-4 py-2 bg-white text-[#75E6DA] rounded-md border border-white hover:bg-[#F2E5DC] transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
