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
    <section id="sangeet" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">WEDDING & SANGEET CHOREOGRAPHY</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            ROYAL SANGEET HUB
          </h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectSangeetPackage && onSelectSangeetPackage({ id: pkg.id, title: pkg.name, price: pkg.price, type: 'Sangeet Package' })}
              className={`p-8 border flex flex-col justify-between cursor-pointer transition-all ${
                pkg.isPopular
                  ? 'bg-[#1F41FF] text-white border-[#1F41FF]'
                  : 'bg-[#111111] text-white border-[#333333] hover:border-slate-500'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="px-3 py-1 bg-[#D0FBF9] text-[#000000] text-[10px] font-extrabold uppercase mb-4 inline-block">
                    MOST POPULAR CHOICE
                  </span>
                )}
                
                <h3 className="text-2xl font-extrabold uppercase font-display mb-1">{pkg.name}</h3>
                <p className="text-xs opacity-90 font-semibold mb-6">{pkg.idealFor}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black font-display">₹{pkg.price}</span>
                  <span className="text-xs opacity-80 ml-1">/ event</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20 text-xs mb-4">
                  <div>🎵 <strong>Tracks:</strong> {pkg.songs}</div>
                  <div>💃 <strong>Sessions:</strong> {pkg.sessions}</div>
                  {pkg.features.map((feat, i) => (
                    <div key={i}>✓ {feat}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculator Widget */}
        <div className="bg-[#111111] border border-[#333333] p-8 max-w-4xl">
          <h3 className="text-2xl font-extrabold uppercase font-display text-white mb-6">CUSTOM ESTIMATOR</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-2">Number of Songs: {songsCount}</label>
              <input
                type="range" min="1" max="10" value={songsCount}
                onChange={(e) => setSongsCount(Number(e.target.value))}
                className="w-full accent-[#1F41FF]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-2">Performers: {performersCount}</label>
              <input
                type="range" min="2" max="30" value={performersCount}
                onChange={(e) => setPerformersCount(Number(e.target.value))}
                className="w-full accent-[#D0FBF9]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-2">Location Preference</label>
              <button
                onClick={() => setAtHomeOption(!atHomeOption)}
                className="w-full py-2.5 px-3 border text-xs font-bold bg-[#222222] border-[#404040] text-white"
              >
                {atHomeOption ? '🏠 At-Home Choreographer (+₹4,000)' : '🏢 In-Studio Rehearsal'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#333333]">
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold block">Estimated Price</span>
              <span className="text-3xl font-black text-[#D0FBF9] font-display">₹{calculatedPrice}</span>
            </div>

            <button
              onClick={() => onSelectSangeetPackage && onSelectSangeetPackage({
                id: 399,
                title: `Custom Sangeet Package (${songsCount} Songs, ${performersCount} Members)`,
                price: calculatedPrice,
                type: 'Custom Sangeet Package'
              })}
              className="btn-cyan text-xs py-3.5 px-6 uppercase font-extrabold"
            >
              Book Estimate Online
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
