// src/app/admin-login/page.jsx
'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success && result.role === 'admin') {
      router.push('/admin');
    } else if (result.success && result.role !== 'admin') {
      alert("Access Denied: You are not an Admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-black text-center mb-6 text-slate-800 uppercase tracking-tighter">
          Admin <span className="text-orange-500">Secure Access</span>
        </h1>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input 
            type="email" placeholder="Admin Email" 
            className="w-full p-3 border rounded-lg"
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 border rounded-lg"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all">
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}