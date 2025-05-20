
import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ApiKeyForm from "./ApiKeyForm";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm an AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("ai_api_key")
  );
  
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    // In a real app, you would call the AI API here
    // For now, we'll simulate a response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${text}". This is a simulated response since this is a demo. In a real application, this would connect to an AI API using your provided key.`,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem("ai_api_key", key);
    setApiKey(key);
    setShowSettings(false);
    toast.success("API key saved successfully");
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm an AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat history cleared");
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <ChatHeader onSettingsClick={() => setShowSettings(true)} />
      
      {showSettings ? (
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <ApiKeyForm onSaveApiKey={handleSaveApiKey} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-chat-highlight"
              >
                Back to chat
              </button>
            </div>
            {apiKey && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleClearChat}
                  className="text-red-400 hover:text-red-300"
                >
                  Clear chat history
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} disabled={loading || !apiKey} />
          
          {!apiKey && (
            <div className="p-3 bg-yellow-900 bg-opacity-30 text-center">
              <p className="text-yellow-200 text-sm">
                Please set your API key in settings to start chatting.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
