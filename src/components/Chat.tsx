
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
      text: "Hello! I'm an AI Assistant powered by Google Gemini. How can I help you today?",
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
    
    try {
      // Updated API endpoint for Gemini API
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey || ""
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { 
                  text: text 
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
            topP: 0.8,
            topK: 40
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response from Gemini");
      }
      
      const data = await response.json();
      
      // Extract text from the updated Gemini response format
      const aiReply = data.candidates[0].content.parts[0].text;
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiReply,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, there was an error processing your request. Please check your Google API key and try again. Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get Gemini response. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem("ai_api_key", key);
    setApiKey(key);
    setShowSettings(false);
    toast.success("Google Gemini API key saved successfully");
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm an AI assistant powered by Google Gemini. How can I help you today?",
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
                Please set your Google Gemini API key in settings to start chatting.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
