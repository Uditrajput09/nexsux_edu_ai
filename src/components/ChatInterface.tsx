import { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types.js';
import Avatar from './ai/Avatar.js';
import { AnimatePresence } from 'motion/react';
import ChatMessage from './chat/ChatMessage.js';
import ChatInput from './chat/ChatInput.js';
import TypingIndicator from './chat/TypingIndicator.js';
import { useLanguage } from '../contexts/LanguageContext.js';
import { VoiceInteraction } from './ai/VoiceControls.js';
import { AIAgentService } from '../services/aiAgent.js';

export default function ChatInterface({ user }: { user: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiState]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'msg_0',
        role: 'assistant',
        content: `Hi ${user.name.split(' ')[0]}! 👋 I'm Nexus Edu AI, your ${user.role} assistant. What can I help you with today?`,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [user]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAiState('thinking');

    try {
      // Offload intent pre-validation and secure API processing to the Agent Service
      const responseText = await AIAgentService.processMessage(text, user, language);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMsg]);
      
      // Text-to-Speech (TTS) Integration
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop previous speech
        const utterance = new SpeechSynthesisUtterance(responseText);
        
        // Map language strings to BCP 47 language tags if possible
        const langMap: Record<string, string> = {
          'English': 'en-US',
          'Hindi': 'hi-IN',
          'Tamil': 'ta-IN',
          'Telugu': 'te-IN',
          'Marathi': 'mr-IN',
          'Gujarati': 'gu-IN',
          'Kannada': 'kn-IN',
          'Malayalam': 'ml-IN'
        };
        if (langMap[language]) {
          utterance.lang = langMap[language];
        }

        utterance.onstart = () => setAiState('speaking');
        utterance.onend = () => setAiState('idle');
        utterance.onerror = () => setAiState('idle');
        
        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback simulate speaking duration if TTS not supported
        setAiState('speaking');
        setTimeout(() => setAiState('idle'), Math.min(Math.max(responseText.length * 50, 2000), 5000));
      }
      
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting to the server right now. Please try again.",
        timestamp: new Date().toISOString()
      }]);
      setAiState('idle');
    }
  };

  const handleTranscription = (text: string, isFinal: boolean) => {
    if (isFinal) {
      setInput(prev => (prev + ' ' + text).trim());
      setInterimText('');
    } else {
      setInterimText(text);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setAiState('idle');
      setInterimText('');
      if (input.trim()) {
        handleSend(input);
      }
    } else {
      setIsRecording(true);
      setAiState('listening');
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setAiState('idle');
    setInterimText('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 relative">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6 flex flex-col">
          {/* Avatar Section */}
          <div className="flex justify-center shrink-0">
            <Avatar state={aiState} role={user.role} />
          </div>

          {/* Messages */}
          <div className="space-y-6 flex-1 w-full pb-32">
            <AnimatePresence>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {aiState === 'thinking' && <TypingIndicator key="typing" />}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <VoiceInteraction 
        isRecording={isRecording}
        onTranscription={handleTranscription}
        onStop={handleStopRecording}
        language={language}
        interimText={interimText}
      />

      {/* Input Area */}
      <ChatInput 
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleVoice={handleVoiceToggle}
        isRecording={isRecording}
      />
    </div>
  );
}
