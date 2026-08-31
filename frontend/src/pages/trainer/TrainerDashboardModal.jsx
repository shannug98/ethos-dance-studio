import React, { useState, useEffect } from 'react';
import { X, Trophy, Star, PlusCircle, CreditCard } from 'lucide-react';

export default function TrainerDashboardModal({ trainerId = 1, onClose }) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Workshop Creation State
  const [showCreateWorkshop, setShowCreateWorkshop] = useState(false);
  const [workshopForm, setWorkshopForm] = useState({
    title: '',
    danceStyle: 'Hip-Hop / Commercial',
    description: '',
    workshopDate: new Date().toISOString().split('T')[0],
    startTime: '07:00 PM',
    endTime: '09:00 PM',
    venue: 'Ethos Studio A, Kukatpally',
    price: 999,
    capacity: 25
  });

  const loadDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5152/api/trainers/dashboard/${trainerId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to load dashboard.');
      setData(json);
    } catch (err) {
      setError(err.message || 'Could not load trainer dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [trainerId]);

  const handlePurchasePass = async (tierId, tierName) => {
    try {
      const res = await fetch(`http://localhost:5152/api/trainers/pass/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainerId, tierId })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Pass purchase failed.');
      alert(`🎉 Congratulations! You activated your ${tierName} Trainer Pass! Confirmation sent via WhatsApp.`);
      loadDashboard();
    } catch (err) {
      alert(err.message || 'Payment failed.');
    }
  };

  const handleCreateWorkshopSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5152/api/trainers/workshops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...workshopForm, trainerProfileId: trainerId })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Workshop creation failed.');
      alert('Workshop submitted to Ethos Admin for approval!');
      setShowCreateWorkshop(false);
      loadDashboard();
    } catch (err) {
      alert(err.message || 'Failed to create workshop.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden relative my-6 text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 border border-[#0088FF]/30 flex items-center justify-center text-[#0088FF] font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold uppercase font-syne text-slate-900 flex items-center gap-2">
                Trainer Portal — {data?.profile?.fullName || 'Shanmuka Gaddam'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Application Code: <span className="text-[#0088FF] font-bold">{data?.profile?.trainerCode || 'ETH-TR-100001'}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="border-b border-slate-200 bg-white px-6 flex items-center gap-6 text-xs font-bold uppercase overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'tier', label: 'Buy / Upgrade Pass' },
            { id: 'workshops', label: 'My Workshops' },
            { id: 'feedback', label: 'Student Feedback' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#0088FF] text-[#0088FF] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 bg-[#F8FAFC]">

          {loading && <div className="text-center py-12 text-slate-500 text-sm font-medium">Loading trainer metrics...</div>}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {!loading && data && (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Stats Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-center space-y-1 shadow-xs">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Current Tier</p>
                      <p className="text-2xl font-black text-[#0088FF] font-syne uppercase">{data.profile.currentTier}</p>
                      <span className="text-[10px] text-slate-500 font-medium">Verified Ethos Trainer</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-center space-y-1 shadow-xs">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Performance Score</p>
                      <p className="text-2xl font-black text-slate-900 font-syne">{data.performance.overallScore} / 100</p>
                      <span className="text-[10px] text-slate-500 font-medium">Top Choreographer</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-center space-y-1 shadow-xs">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Average Student Rating</p>
                      <p className="text-2xl font-black text-emerald-600 font-syne flex items-center justify-center gap-1">
                        {data.performance.averageRating} <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium">{data.performance.totalReviews} Verified Ratings</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-center space-y-1 shadow-xs">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Active Pass Status</p>
                      <p className="text-sm font-black text-emerald-600 uppercase mt-1">
                        {data.activePass ? 'Active Pass' : 'No Active Pass'}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {data.activePass ? `Expires: ${new Date(data.activePass.expiryDate).toLocaleDateString()}` : 'Upgrade to publish'}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Next Steps */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 uppercase font-syne">Host a New Ethos Workshop</h4>
                      <p className="text-xs text-slate-600 font-medium">Create workshop schedule, set pricing, and publish for Ethos student bookings.</p>
                    </div>
                    <button
                      onClick={() => setShowCreateWorkshop(true)}
                      className="px-6 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" /> Create Workshop
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: BUY PASS */}
              {activeTab === 'tier' && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-extrabold uppercase text-slate-900 font-syne">Select Your Ethos Trainer Pass</h3>
                    <p className="text-xs text-slate-600 font-medium">Choose a monthly pass subscription to unlock workshop creation and studio promotion.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 1, name: 'Silver', price: 1999, workshops: '1-2 Workshops / mo', desc: 'Basic studio listing, student feedback, verified trainer badge.' },
                      { id: 2, name: 'Gold', price: 3999, workshops: '3-5 Workshops / mo', desc: 'Enhanced promotion, homepage feature spot, priority slots.' },
                      { id: 3, name: 'Diamond', price: 6999, workshops: 'Unlimited Workshops', desc: 'Premium master badge, homepage banner, social media blast.' }
                    ].map(tier => (
                      <div key={tier.id} className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-[#0088FF] space-y-4 text-center relative flex flex-col justify-between shadow-xs">
                        <div className="space-y-2">
                          <h4 className="text-xl font-black uppercase text-[#0088FF] font-syne">{tier.name} Pass</h4>
                          <div className="text-3xl font-black text-slate-900">₹{tier.price} <span className="text-xs text-slate-500 font-normal">/ month</span></div>
                          <p className="text-xs text-slate-600 font-medium">{tier.desc}</p>
                        </div>
                        <button
                          onClick={() => handlePurchasePass(tier.id, tier.name)}
                          className="w-full py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer mt-4"
                        >
                          <CreditCard className="w-4 h-4" /> Activate {tier.name} Pass
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WORKSHOPS */}
              {activeTab === 'workshops' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold uppercase text-slate-900 font-syne">My Workshops</h3>
                    <button
                      onClick={() => setShowCreateWorkshop(true)}
                      className="px-4 py-2 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PlusCircle className="w-4 h-4" /> New Workshop
                    </button>
                  </div>

                  {data.workshops.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs bg-white border border-slate-200 rounded-2xl font-medium">
                      No workshops created yet. Click "New Workshop" to submit your first session!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.workshops.map(w => (
                        <div key={w.id} className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm font-syne">{w.title}</h4>
                            <p className="text-slate-600 font-medium">{w.danceStyle} • {new Date(w.workshopDate).toLocaleDateString()} ({w.startTime})</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-[#0088FF]">₹{w.price}</span>
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border border-slate-200">
                              {w.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: FEEDBACK */}
              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-extrabold uppercase text-slate-900 font-syne">Student Feedback &amp; Reviews</h3>
                  {data.recentFeedbacks.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs bg-white border border-slate-200 rounded-2xl font-medium">
                      No student feedback received yet. Ratings will appear here after students attend your workshops.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.recentFeedbacks.map(f => (
                        <div key={f.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 text-xs shadow-xs">
                          <div className="flex items-center justify-between text-emerald-600 font-bold">
                            <span className="flex items-center gap-1">{f.rating} ⭐ Rating</span>
                            <span className="text-slate-400 text-[10px]">{new Date(f.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-700 italic font-medium">"{f.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* CREATE WORKSHOP MODAL */}
      {showCreateWorkshop && (
        <div className="fixed inset-0 z-[220] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-lg space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold uppercase font-syne">Create Ethos Workshop</h3>
              <button onClick={() => setShowCreateWorkshop(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleCreateWorkshopSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Workshop Title *</label>
                <input
                  type="text"
                  required
                  value={workshopForm.title}
                  onChange={e => setWorkshopForm({ ...workshopForm, title: e.target.value })}
                  placeholder="e.g. Hip Hop Masterclass & Musicality"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Dance Style</label>
                  <input
                    type="text"
                    value={workshopForm.danceStyle}
                    onChange={e => setWorkshopForm({ ...workshopForm, danceStyle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={workshopForm.price}
                    onChange={e => setWorkshopForm({ ...workshopForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={workshopForm.workshopDate}
                    onChange={e => setWorkshopForm({ ...workshopForm, workshopDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Capacity</label>
                  <input
                    type="number"
                    value={workshopForm.capacity}
                    onChange={e => setWorkshopForm({ ...workshopForm, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={workshopForm.description}
                  onChange={e => setWorkshopForm({ ...workshopForm, description: e.target.value })}
                  placeholder="What students will learn in this session..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl cursor-pointer shadow-md"
              >
                Submit Workshop to Admin
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
