import React, { useState, useEffect, useRef } from "react";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket Server");
    };

    ws.current.onmessage = (event) => {
      const message = event.data;
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket Server");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(input);
      setInput(""); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 dark:bg-slate-600 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Real-time Chat</h1>
      <div className="mb-4 h-64 overflow-y-auto border p-2 bg-white dark:bg-slate-300">
        {messages.map((msg, index) => (
          <div key={index} className="p-1 border-b">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded dark:bg-white"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
