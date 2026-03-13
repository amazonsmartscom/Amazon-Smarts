// src/app/login/page.jsx
'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🚀 Add this line!
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  try {
    const result = await login(email, password); // Wait for the result
    
    if (result.success) {
      // 🚀 FORCE REDIRECT: Use window.location.replace for a clean state refresh
      // or router.push('/') if your context updates instantly.
      window.location.replace('/'); 
    } else {
      setError(result.message);
      setLoading(false);
    }
  } catch (err) {
    setError("Something went wrong. Try again.");
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your GadgetStore account</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <button 
  type="submit" 
  disabled={loading}
  className={`w-full font-bold py-3 rounded-lg transition-colors shadow-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
>
  {loading ? 'Signing In...' : 'Sign In'}
</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          New to GadgetStore?{' '}
          <Link href="/register" className="text-orange-600 hover:underline font-semibold">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}