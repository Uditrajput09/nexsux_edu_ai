import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { Bot, UserCircle, GraduationCap, School, BookOpen } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const demoAccounts = [
    { name: 'Rahul (Student)', email: 'student@xyzschool.com', role: 'Student', icon: <UserCircle className="w-8 h-8" /> },
    { name: 'Mr. Sharma (Parent)', email: 'parent@xyzschool.com', role: 'Parent', icon: <BookOpen className="w-8 h-8" /> },
    { name: 'Ms. Neha (Teacher)', email: 'teacher@xyzschool.com', role: 'Teacher', icon: <GraduationCap className="w-8 h-8" /> },
    { name: 'Dr. Principal', email: 'principal@xyzschool.com', role: 'Management', icon: <School className="w-8 h-8" /> }
  ];

  const handleLogin = async (email: string) => {
    setLoading(email);
    try {
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign in to Nexus Edu AI
        </h2>
        <p className="mt-2 text-gray-500">
          Select a demo persona to continue
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <div className="grid grid-cols-1 gap-4">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleLogin(account.email)}
                disabled={loading !== null}
                className={`flex items-center p-5 border rounded-2xl transition-all text-left group
                  ${loading === account.email 
                    ? 'border-blue-500 bg-blue-50 opacity-70' 
                    : 'border-gray-200 hover:border-blue-500 hover:shadow-md hover:bg-gray-50'}`}
              >
                <div className={`p-3 rounded-xl mr-4 ${loading === account.email ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                  {account.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500">{account.role} • {account.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
