import { Send, Mic, Square } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (text: string) => void;
  handleVoice: () => void;
  isRecording: boolean;
}

export default function ChatInput({ input, setInput, handleSend, handleVoice, isRecording }: ChatInputProps) {
  return (
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-10 pb-6 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <button 
            onClick={handleVoice}
            className={`p-3 rounded-xl transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Message Nexus Edu AI..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 text-gray-900 placeholder-gray-400 text-[15px]"
            disabled={isRecording}
          />
          
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isRecording}
            className={`p-3 rounded-xl transition-all flex items-center justify-center
              ${input.trim() && !isRecording 
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-3">
            <p className="text-xs text-gray-400">Nexus Edu AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}
