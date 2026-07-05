import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ message, persona }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 mb-6 animate-fadeIn ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <img
          src={
            persona === "Hitesh"
              ? "/assets/hitesh_sir.jpg"
              : "/assets/pitush_sir.jpeg"
          }
          alt={persona}
          className="w-9 h-9 rounded-full shrink-0 mt-1"
        />
      )}

      <div className={`max-w-[75%] ${isUser ? "" : ""}`}>
        {!isUser && (
          <p className="text-sm font-semibold text-gray-700 mb-1 ml-1">
            {persona}
          </p>
        )}

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-gradient-to-br from-indigo-600 to-indigo-500 text-white"
              : "bg-white border border-gray-200 text-gray-800 shadow-sm"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-strong:text-gray-900 prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-800 [&_pre]:!bg-gray-900 [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-gray-100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
