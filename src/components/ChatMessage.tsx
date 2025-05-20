
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
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            sender === "user"
              ? "bg-chat-user text-white rounded-tr-none"
              : "bg-chat-ai text-white rounded-tl-none"
          )}
        >
          <div className="flex items-center mb-1">
            <span className={cn("text-xs font-medium", sender === "user" ? "text-cyan-300" : "text-chat-highlight")}>
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
