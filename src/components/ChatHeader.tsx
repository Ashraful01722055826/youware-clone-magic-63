
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onSettingsClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
      <div className="flex items-center">
        <span className="text-chat-highlight font-semibold text-xl">AI Chat Hub</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettingsClick}
        className="text-gray-400 hover:text-chat-highlight hover:bg-gray-800"
      >
        <Settings size={20} />
      </Button>
    </header>
  );
};

export default ChatHeader;
