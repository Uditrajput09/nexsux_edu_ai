# Nexus Edu AI - Project Documentation

## 1. Project Overview
**Nexus Edu AI** is a multilingual, AI-powered communication and management hub tailored specifically for Indian schools. It bridges the gap between students, parents, teachers, and principals by providing a role-aware AI assistant and interactive dashboards for school management.

## 2. System Architecture
The application follows a **Full-Stack SPA** architecture.

*   **Frontend**: React 18, Vite, and Tailwind CSS.
*   **Backend**: Node.js and Express.
*   **AI Integration**: Google Gemini API (`@google/genai`).

### Security & API Proxying
To maintain strict security and prevent the exposure of the `GEMINI_API_KEY` to the browser, the application utilizes a Backend-for-Frontend (BFF) pattern:
1. The React frontend sends natural language queries to the local `/api/chat` endpoint.
2. The Express server validates the user's role and authorization token.
3. The server communicates securely with the Gemini API, processes the intent, and interacts with the database.
4. The server returns the final natural language response to the client.

## 3. Technology Stack
*   **UI Framework**: React (TypeScript)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Animations**: Motion (Framer Motion)
*   **Routing**: React Router DOM
*   **Backend Engine**: Express.js
*   **Database (Mock)**: In-memory JavaScript structures (`server/db.ts`)
*   **Voice/TTS**: Web Speech API (`SpeechSynthesis`)

## 4. Core Modules & Features

### A. Role-Based Access Control (RBAC)
The platform defines four distinct personas, each with specific data access and AI capabilities:
*   **Student**: Can view their own attendance and ask academic questions.
*   **Parent**: Can view their child's attendance and ask school-related questions.
*   **Teacher**: Can mark attendance for their class and view student profiles.
*   **Principal (Management)**: Can view school-wide analytics and access overarching system data.

### B. Multilingual AI Assistant
*   Managed by `AIAgentService` on the frontend and `server/ai.ts` on the backend.
*   Supports 8 languages (English, Hindi, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam).
*   Context-aware: The AI knows who it is talking to (e.g., greeting a parent about their specific child).

### C. Voice Interaction
*   Integrated Text-to-Speech (TTS) using native browser capabilities.
*   Maps application languages to proper BCP 47 language tags (e.g., `hi-IN` for Hindi) for accurate pronunciation.

### D. Live Updates (Notifications)
*   Role-filtered notification polling system.
*   The React client polls the `/api/notifications` endpoint every 30 seconds to fetch updates specific to the user's role (e.g., staff meetings only show for teachers/principals).

### E. Attendance Management
*   Visual dashboard for tracking present/absent days.
*   Teachers can mark attendance, which immediately reflects in the database.

## 5. Directory Structure
```text
/
├── server.ts                 # Express backend entry point (API routes, Vite middleware)
├── metadata.json             # AI Studio environment metadata
├── package.json              # Project dependencies and build scripts
├── server/
│   ├── ai.ts                 # Backend Gemini API integration & tool calling
│   └── db.ts                 # Mock database (Users, Attendance, Notifications)
└── src/
    ├── App.tsx               # Primary React entry point & Router
    ├── main.tsx              # React DOM mounting
    ├── types.ts              # Global TypeScript interfaces
    ├── contexts/             # React Contexts (AuthContext, LanguageContext)
    ├── services/             # Frontend services (AIAgentService for AI intent pre-validation)
    ├── pages/                # High-level page components (Landing, Login, Dashboard)
    └── components/           # Reusable UI modules
        ├── chat/             # Chat UI, Input, Typing Indicators
        ├── ai/               # AI Avatars and Voice Controls
        └── layout/           # Sidebar, Header, Right Context Panel, Notifications
```

## 6. Local Development
To run this project locally in VS Code:
1. `npm install` to install all dependencies.
2. Ensure you have a `.env` file with `GEMINI_API_KEY=your_key_here`.
3. `npm run dev` to boot the Express server and Vite frontend concurrently on `http://localhost:3000`.
