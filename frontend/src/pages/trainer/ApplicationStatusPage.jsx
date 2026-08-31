import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function ApplicationStatusPage({ onClose, onOpenDashboard }) {
  const [code, setCode] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!code) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:5152/api/trainers/status/${code.trim()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Application not found.');
      setStatusData(data);
    } catch (err) {
      setError(err.message || 'Could not fetch status. Check code or mobile number.');
      setStatusData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden relative text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0088FF]">Ethos Trainer Portal</span>
            <h2 className="text-xl font-bold uppercase font-syne text-slate-900">Check Application Status</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Application Code (ETH-TR-100001) or Mobile Number"
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Search className="w-4 h-4" /> {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {statusData && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-left shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase font-syne">{statusData.fullName}</h3>
                  <p className="text-xs text-slate-600 font-medium">{statusData.primaryDanceStyle} • {statusData.city}</p>
                </div>
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-blue-50 text-[#0088FF] border border-blue-200">
                  {statusData.trainerCode}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Application Status:</span>
                  {statusData.status === 'Approved' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : statusData.status === 'Rejected' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Under Review
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Assigned Tier:</span>
                  <span className="font-bold text-[#0088FF] uppercase">{statusData.currentTier} TIER</span>
                </div>

                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Submitted Date:</span>
                  <span className="text-slate-800 font-bold">{new Date(statusData.submittedAt).toLocaleDateString()}</span>
                </div>

                {statusData.videoUrl && (
                  <div className="pt-2 text-xs">
                    <span className="text-slate-500 font-medium block mb-1">Audition Video Reel:</span>
                    <a
                      href={statusData.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0088FF] hover:underline font-semibold break-all"
                    >
                      {statusData.videoUrl}
                    </a>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => onOpenDashboard(statusData.id)}
                    className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    Open Trainer Dashboard <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
