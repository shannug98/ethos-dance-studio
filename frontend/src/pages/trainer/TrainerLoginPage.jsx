import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function TrainerLoginPage({ API_URL, onBack, onSuccessLogin }) {
  const [credential, setCredential] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credential.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:5152/api/trainers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credential.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Trainer login failed.');

      onSuccessLogin(data.trainerId, data.profile);
    } catch (err) {
      setError(err.message || 'Could not find trainer profile. Try your Application Code or Registered Phone Number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center font-sans">
      <div className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-900 my-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 border border-[#0088FF]/30 flex items-center justify-center text-[#0088FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0088FF]">Ethos Dance Studio</span>
              <h2 className="text-lg font-bold uppercase text-slate-900 font-syne">Trainer Portal Login</h2>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="text-xs text-slate-600 leading-relaxed font-medium">
            Enter your <strong className="text-slate-900">Trainer Application Code</strong> (e.g. <span className="text-[#0088FF] font-bold">ETH-TR-100001</span>), registered <strong className="text-slate-900">WhatsApp Mobile Number</strong>, or <strong className="text-slate-900">Email Address</strong>.
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-700">Application Code / Mobile Number / Email *</label>
            <input
              type="text"
              required
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="e.g. shanmukagaddam98@gmail.com or ETH-TR-100001"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !credential.trim()}
            className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#0088FF]/20 cursor-pointer transition-all"
          >
            {loading ? 'Authenticating...' : 'Log In to Trainer Dashboard'} <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Don't have a trainer code yet?</span>
            <button
              type="button"
              onClick={onBack}
              className="text-[#0088FF] font-bold hover:underline"
            >
              Apply as Trainer
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
