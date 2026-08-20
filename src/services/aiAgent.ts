import { User } from '../types.js';

/**
 * AIAgentService
 * 
 * Acts as the frontend orchestrator for the AI Assistant.
 * Note: To maintain strict security constraints and prevent the exposure of the 
 * GEMINI_API_KEY to the browser window, the core LLM tool-calling execution, 
 * secure intent detection, and mock database API execution runs securely on the backend
 * (`server/ai.ts`). This service manages the client-side pre-validation against the
 * AuthContext and coordinates the network requests.
 */
export class AIAgentService {
  /**
   * Processes a user message through the AI Agent.
   */
  static async processMessage(message: string, user: User, language: string): Promise<string> {
    // 1. Client-Side Intent & Permission Pre-Validation against AuthContext
    this.preValidateIntent(message, user);

    try {
      // 2. Secure Backend Tool Execution (Gemini LLM + Mock DB execution)
      const token = localStorage.getItem('token');
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message, language })
      });

      if (!res.ok) {
        throw new Error(`AI Engine rejected request with status: ${res.status}`);
      }

      const data = await res.json();
      
      // 3. Return the natural language response
      return data.message;
    } catch (error) {
      console.error("[AIAgentService] Error communicating with backend agent:", error);
      throw error;
    }
  }

  /**
   * Evaluates the local AuthContext against inferred intents to provide early 
   * security warnings or UI adjustments before the backend strict-validates it.
   */
  private static preValidateIntent(message: string, user: User) {
    const lowerMsg = message.toLowerCase();
    
    // Example: Teacher-only actions
    const isModificationIntent = ['mark', 'update', 'change'].some(k => lowerMsg.includes(k)) && lowerMsg.includes('attendance');
    if (isModificationIntent && user.role !== 'teacher') {
      console.warn(`[AIAgentService Warning]: Detected modification intent from restricted role (${user.role}). The backend will reject execution.`);
    }

    // Example: Principal-only actions
    const isAnalyticsIntent = ['overview', 'school', 'analytics'].some(k => lowerMsg.includes(k)) && lowerMsg.includes('attendance');
    if (isAnalyticsIntent && user.role !== 'principal') {
      console.warn(`[AIAgentService Warning]: Detected analytics intent from restricted role (${user.role}). The backend will limit visibility.`);
    }
  }
}
