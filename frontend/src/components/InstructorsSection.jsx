import React from 'react';

export default function InstructorsSection() {
  const founders = [
    {
      id: 1,
      name: 'Sophia Bennett',
      role: 'Founder & Master Choreographer',
      bio: '12+ years directing national performances and modern dance ensembles.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-white',
      textColor: 'text-slate-900'
    },
    {
      id: 2,
      name: 'Alisa Morris',
      role: 'Founder & Program Director',
      bio: 'Pioneered commercial hip-hop fusion and international masterclass tours.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-white',
      textColor: 'text-slate-900'
    },
    {
      id: 3,
      name: 'Rohan Sharma',
      role: 'Lead Street & Urban Director',
      bio: 'Specialist in isolations, popping, and high-energy stage performance.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-white',
      textColor: 'text-slate-900'
    },
    {
      id: 4,
      name: 'Ananya Roy',
      role: 'Head Sangeet Choreographer',
      bio: 'Choreographed over 200+ royal wedding entrance dances & flashmobs.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      bgColor: 'bg-white',
      textColor: 'text-slate-900'
    }
  ];

  return (
    <section id="instructors" className="bg-[#FAF8F5] text-slate-900 border-b border-slate-200">
      
      {/* Top Founder Header & Quote */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-b border-slate-200">
        <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight mb-6">
          OUR FOUNDERS & CHOREOGRAPHERS
        </h2>
        
        <div className="max-w-2xl border-l-4 border-[#0088FF] pl-6 py-2 space-y-2">
          <p className="text-xl sm:text-2xl font-serif italic text-slate-700">
            "Find your flow, and dance your truth."
          </p>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0088FF] block">
            — SOPHIA BENNETT, FOUNDER
          </span>
        </div>
      </div>

      {/* Founder Grid with Clean Light Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {founders.map((person) => (
          <div key={person.id} className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all">
            <div className="relative h-72 bg-slate-100 overflow-hidden">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Card Info */}
            <div className="p-6 space-y-2 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-black uppercase font-syne text-slate-900 tracking-tight leading-tight">
                {person.name}
              </h3>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF]">
                {person.role}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {person.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
