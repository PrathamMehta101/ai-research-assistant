"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessage = async () => {
    const res = await fetch("http://127.0.0.1:8000/hello");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">AI Research Assistant</h1>

      <div className="w-full max-w-xl space-y-4">
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="w-full rounded-lg bg-black text-white py-3"
        >
          Send
        </button>

        {response && (
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold mb-2">AI</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
