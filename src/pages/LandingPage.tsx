import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, Users, Mic, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Nexus Edu AI</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
          <Link to="/login" className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span>New: Voice + AI Avatar Experience</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mb-6">
          Meet Nexus Edu AI <br/>
          <span className="text-gray-500">Your school's intelligent, human-like AI assistant.</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Transform the school experience for students, parents, teachers, and management with role-aware intelligence and secure data access.
        </p>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/20">
            Try Nexus Edu AI <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 text-left w-full">
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <Users className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Aware Intelligence</h3>
            <p className="text-gray-600">Dynamically adapts persona and access levels for students, parents, teachers, and principals.</p>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <Mic className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Voice & Avatar</h3>
            <p className="text-gray-600">Natural voice interactions with visual feedback for a highly engaging experience.</p>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Security</h3>
            <p className="text-gray-600">Strict tool-based authorization ensures users only access data they are permitted to see.</p>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <Bot className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Human Escalation</h3>
            <p className="text-gray-600">Seamlessly hands off to human teachers or management when complex support is needed.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
