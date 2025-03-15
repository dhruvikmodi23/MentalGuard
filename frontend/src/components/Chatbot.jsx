import { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import axios from "axios";

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { text: "Hello, How are you?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMessage = { text: input, sender: "user" };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5001/api/chat", { message: input });
            const botReply = { text: res.data.reply || "I'm here to help!", sender: "bot" };
            setMessages(prevMessages => [...prevMessages, botReply]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA]">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
                <div className="bg-[#75E6DA] text-white text-center py-3 text-lg font-semibold rounded-t-lg">
                    AI Counselor ChatBot
                </div>
                <div className="p-4 h-[500px] overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "bot" && (
                                <div className="bg-[#01b5a3] text-white w-10 h-10 flex items-center justify-center rounded-full mr-2">
                                    <IoChatbubbleEllipses />
                                </div>
                            )}
                            <div className={`p-3 max-w-xs rounded-xl text-white ${msg.sender === "user" ? "bg-[#01b5a3]" : "bg-[#01b5a3]"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && <div className="text-gray-500 text-sm text-center">Typing...</div>}
                </div>
                <div className="bg-[#75E6DA] p-3 flex items-center rounded-b-lg">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 rounded-md outline-none bg-white text-black placeholder-gray-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-3 px-4 py-2 bg-white text-[#75E6DA] rounded-md border border-white hover:bg-gray-200 transition"
                        disabled={loading}
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}
