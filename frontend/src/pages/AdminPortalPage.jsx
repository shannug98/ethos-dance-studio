import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import { Lock, ShieldCheck } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid master password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans flex flex-col justify-between">
      
      <Navbar />

      <main className="pt-[76px] w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1">
        
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-[#111111] border border-[#262626] rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl my-8">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#D900FF]/20 border-2 border-[#D900FF] rounded-full flex items-center justify-center mx-auto text-[#D900FF]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black uppercase font-display text-white">ADMIN PORTAL LOGIN</h1>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Restricted Admin Access for Ethos Studio Managers to view bookings, update schedules, and manage workshops.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Master Admin Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D900FF]"
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-[#FF0044] text-center bg-[#FF0044]/10 p-2.5 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#D900FF] hover:bg-[#c000e0] text-black text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-xl"
              >
                Log In to Admin Portal
              </button>
            </form>

            <div className="p-3 bg-[#1A1A1A] border border-[#262626] rounded-xl text-[11px] text-slate-400 text-center">
              Password: <code className="text-[#D0FBF9] font-bold">admin123</code>
            </div>

          </div>
        ) : (
          <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <AdminDashboard
              API_URL={API_URL}
              onClose={() => setIsAuthenticated(false)}
              onLogout={() => setIsAuthenticated(false)}
            />
          </div>
        )}

      </main>

      <Footer />

    </div>
  );
}
