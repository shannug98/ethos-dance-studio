import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TrainerLoginModal({ API_URL, onClose, onSuccessLogin }) {
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
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0088FF]/10 border border-[#0088FF]/30 flex items-center justify-center text-[#0088FF]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0088FF]">Ethos Dance Studio</span>
              <h2 className="text-base font-bold uppercase text-slate-900 font-syne">Trainer Portal Login</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <div className="text-xs text-slate-600 leading-relaxed font-medium">
            Enter your <strong className="text-slate-900">Trainer Application Code</strong> (e.g. <span className="text-[#0088FF] font-bold">ETH-TR-100001</span>), registered <strong className="text-slate-900">WhatsApp Mobile Number</strong>, or <strong className="text-slate-900">Email Address</strong>.
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Application Code / Mobile Number / Email *</label>
            <input
              type="text"
              required
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="e.g. shanmukagaddam98@gmail.com or ETH-TR-100001"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !credential.trim()}
            className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0088FF]/20 cursor-pointer transition-all"
          >
            {loading ? 'Authenticating...' : 'Log In to Trainer Dashboard'} <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Don't have a trainer code yet?</span>
            <button
              type="button"
              onClick={onClose}
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
