import React, { useState } from 'react';

export default function SangeethSection({ onSelectSangeetPackage }) {
  const [songsCount, setSongsCount] = useState(4);
  const [performersCount, setPerformersCount] = useState(10);
  const [atHomeOption, setAtHomeOption] = useState(false);

  const calculatedPrice = (songsCount * 2500) + (performersCount * 500) + (atHomeOption ? 4000 : 0) + 4999;

  const packages = [
    {
      id: 301,
      name: 'Essential Sangeet Starter',
      price: 8999,
      songs: '2 Core Medleys',
      sessions: '5 Hours Studio Choreography',
      idealFor: 'Couple or Solo Entrance',
      features: ['Custom Music Trimming', 'Practice Video Recording', '1 Dedicated Choreographer']
    },
    {
      id: 302,
      name: 'Royal Sangeet Celebration',
      price: 14999,
      songs: '5 Mixed Track Medleys',
      sessions: '12 Hours Studio / Home Sessions',
      idealFor: 'Couple + Family Flashmob',
      isPopular: true,
      features: ['Pro Audio Mixing & Transitions', 'Flashmob Group Syncing', '2 Senior Choreographers', 'Backup Dancer Option']
    },
    {
      id: 303,
      name: 'Destination Wedding Extravaganza',
      price: 24999,
      songs: 'Full Night Performance (8+ Tracks)',
      sessions: '20 Hours Intensive Training',
      idealFor: 'Entire Family + Theme Concepts',
      features: ['On-Site Venue Rehearsal Directing', 'Theme Prop Choreography', '3 Master Directors', 'Stage Entrance Coordination']
    }
  ];

  return (
    <section id="sangeet" className="bg-[#FAF8F5] text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0088FF] block mb-2">WEDDING & SANGEET CHOREOGRAPHY</span>
          <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
            ROYAL SANGEET HUB
          </h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectSangeetPackage && onSelectSangeetPackage({ id: pkg.id, title: pkg.name, price: pkg.price, type: 'Sangeet Package' })}
              className={`p-8 rounded-3xl border flex flex-col justify-between cursor-pointer transition-all shadow-lg ${
                pkg.isPopular
                  ? 'bg-[#0088FF] text-white border-[#0088FF] shadow-[#0088FF]/20'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-xl'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="px-3 py-1 bg-white text-[#0088FF] text-[10px] font-black uppercase rounded-full mb-4 inline-block shadow-sm">
                    MOST POPULAR CHOICE
                  </span>
                )}
                
                <h3 className="text-2xl font-black uppercase font-syne mb-1">{pkg.name}</h3>
                <p className={`text-xs font-bold mb-6 ${pkg.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>{pkg.idealFor}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black font-syne">₹{pkg.price}</span>
                  <span className={`text-xs ml-1 font-semibold ${pkg.isPopular ? 'text-blue-100' : 'text-slate-500'}`}>/ event</span>
                </div>

                <div className={`space-y-3 pt-4 border-t text-xs mb-4 font-medium ${pkg.isPopular ? 'border-white/20 text-blue-50' : 'border-slate-100 text-slate-700'}`}>
                  <div>🎵 <strong>Tracks:</strong> {pkg.songs}</div>
                  <div>💃 <strong>Sessions:</strong> {pkg.sessions}</div>
                  {pkg.features.map((feat, i) => (
                    <div key={i}>✓ {feat}</div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                  pkg.isPopular ? 'bg-white text-[#0088FF] hover:bg-slate-100' : 'bg-[#0088FF] text-white hover:bg-[#0077EE]'
                }`}>
                  Book {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculator Widget */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 max-w-4xl">
          <h3 className="text-2xl font-black uppercase font-syne text-slate-900 mb-6">CUSTOM ESTIMATOR</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-2">Number of Songs: {songsCount}</label>
              <input
                type="range" min="1" max="10" value={songsCount}
                onChange={(e) => setSongsCount(Number(e.target.value))}
                className="w-full accent-[#0088FF]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 font-bold block mb-2">Performers: {performersCount}</label>
              <input
                type="range" min="2" max="30" value={performersCount}
                onChange={(e) => setPerformersCount(Number(e.target.value))}
                className="w-full accent-[#FF0055]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 font-bold block mb-2">Location Preference</label>
              <button
                onClick={() => setAtHomeOption(!atHomeOption)}
                className="w-full py-2.5 px-3 border text-xs font-bold rounded-xl bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100"
              >
                {atHomeOption ? '🏠 At-Home Choreographer (+₹4,000)' : '🏢 In-Studio Rehearsal'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold block">Estimated Price</span>
              <span className="text-3xl font-black text-[#0088FF] font-syne">₹{calculatedPrice}</span>
            </div>

            <button
              onClick={() => onSelectSangeetPackage && onSelectSangeetPackage({
                id: 399,
                title: `Custom Sangeet Package (${songsCount} Songs, ${performersCount} Members)`,
                price: calculatedPrice,
                type: 'Custom Sangeet Package'
              })}
              className="py-3.5 px-6 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-[#0088FF]/20"
            >
              Book Estimate Online
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
