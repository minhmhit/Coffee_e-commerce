import { useState, useRef, useEffect } from "react";
import { chatbotAPI } from "../../../services/chatbotAPI";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatbotAPI.chat(input, messages);
      const botMessage = { role: "assistant", content: response.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-amber-600 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-amber-600 text-white p-3 rounded-t-lg">
            Coffee Shop Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.role === "user" ? "bg-amber-100 ml-auto" : "bg-gray-100"
                } max-w-[80%]`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-gray-400">Đang nhập...</div>}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={sendMessage}
              className="bg-amber-600 text-white px-4 rounded-lg"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
