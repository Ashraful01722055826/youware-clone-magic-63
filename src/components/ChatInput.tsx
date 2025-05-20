
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full p-3 border-t border-gray-800 bg-gray-900"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        disabled={disabled}
        className="flex-1 p-2 bg-gray-800 text-white rounded-l-md outline-none focus:ring-1 focus:ring-chat-highlight"
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        className="rounded-l-none bg-chat-highlight text-gray-900 hover:bg-opacity-80 hover:bg-chat-highlight"
      >
        <ArrowRight size={20} />
      </Button>
    </form>
  );
};

export default ChatInput;
