
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface ApiKeyFormProps {
  onSaveApiKey: (apiKey: string) => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSaveApiKey }) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSaveApiKey(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-cyan-400">Enter your Gemini API Key</h2>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">
        Your API key is stored locally and never sent to any server other than Google's API endpoints.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>
        
        <Button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-32 bg-cyan-400 hover:bg-opacity-80 hover:bg-cyan-400 text-gray-900 font-medium"
        >
          SAVE KEY
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyForm;
