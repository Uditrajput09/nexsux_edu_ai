import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic } from 'lucide-react';

interface VoiceInteractionProps {
  isRecording: boolean;
  onTranscription: (text: string, isFinal: boolean) => void;
  onStop: () => void;
  language: string;
  interimText: string;
}

export function VoiceInteraction({ isRecording, onTranscription, onStop, language, interimText }: VoiceInteractionProps) {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (isRecording) {
        alert("Your browser does not support the Web Speech API. Please try using Chrome, Edge, or Safari.");
        onStop();
      }
      return;
    }

    if (isRecording) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      
      const langMap: Record<string, string> = {
        'English': 'en-US',
        'Hindi': 'hi-IN',
        'Tamil': 'ta-IN',
        'Telugu': 'te-IN',
        'Marathi': 'mr-IN',
        'Bengali': 'bn-IN',
        'Gujarati': 'gu-IN',
        'Punjabi': 'pa-IN',
        'Kannada': 'kn-IN',
        'Malayalam': 'ml-IN',
        'Urdu': 'ur-IN'
      };
      recognition.lang = langMap[language] || 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterim = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          onTranscription(finalTranscript, true);
        } else if (currentInterim) {
          onTranscription(currentInterim, false);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== 'no-speech') {
           onStop();
        }
      };

      recognition.onend = () => {
        // Continuous recognition might stop on its own, ensure UI resets
        onStop();
      };

      try {
        recognition.start();
      } catch (e) {
        console.error("Failed to start speech recognition", e);
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, language]);

  return (
    <AnimatePresence>
      {isRecording && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20 pointer-events-none"
        >
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-5 shadow-2xl flex items-center space-x-4 border border-gray-700/50">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 animate-pulse relative">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-ping" />
              <Mic className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1.5">Listening...</p>
              <p className="text-white text-base font-medium truncate">
                {interimText || "Speak now..."}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
