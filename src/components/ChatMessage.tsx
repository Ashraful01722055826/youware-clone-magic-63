
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, timestamp = new Date() }) => {
  return (
    <div
      className={cn(
        "flex mb-4",
        sender === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex items-start max-w-[80%]">
        <div className="flex items-center">
          <div 
            className={cn(
              "flex justify-center items-center w-8 h-8 rounded-full mr-2",
              sender === "user" ? "bg-teal-800 text-white" : "bg-gray-700 text-cyan-400"
            )}
          >
            {sender === "user" ? "Y" : "A"}
          </div>
        </div>
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            sender === "user"
              ? "bg-gray-800 text-white rounded-tr-none"
              : "bg-gray-800 text-white rounded-tl-none border-l-2 border-cyan-400"
          )}
        >
          <div className="flex items-center mb-1">
            <span className={cn("text-xs font-medium", sender === "user" ? "text-teal-400" : "text-cyan-400")}>
              {sender === "user" ? "You" : "AI Assistant"}
            </span>
          </div>
          <p className="text-sm break-words">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
