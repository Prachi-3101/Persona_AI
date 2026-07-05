import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatBox({ messages, loading, persona }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 && !loading && (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <span className="text-5xl mb-4">
            {persona === "Hitesh" ? "👨‍🏫" : "👨‍💻"}
          </span>
          <p className="text-lg font-medium text-gray-500">Start a conversation with {persona}</p>
          <p className="text-sm mt-1">Ask anything — I'm here to help!</p>
        </div>
      )}

      {messages.map((message, index) => (
        <Message key={index} message={message} persona={persona} />
      ))}

      {loading && (
        <div className="flex items-start gap-3 mb-6 animate-fadeIn">
          <img
            src={
              persona === "Hitesh"
                ? "https://ui-avatars.com/api/?name=Hitesh+Choudhary&background=6366f1&color=fff&size=80"
                : "https://ui-avatars.com/api/?name=Piyush+Garg&background=059669&color=fff&size=80"
            }
            alt={persona}
            className="w-9 h-9 rounded-full shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1 ml-1">{persona}</p>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm flex gap-1.5">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatBox;
