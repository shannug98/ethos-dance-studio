import React, { useState } from 'react';
import { Award, Star, Sparkles, UserCheck, X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import ethosFoundersDuo from '../assets/ethos_founders_duo.jpg';
import ethosFounderSreekanth from '../assets/ethos_founder_sreekanth.jpg';
import ethosFounderManikanta from '../assets/ethos_founder_manikanta.jpg';

export default function InstructorsSection() {
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [hoveredFounder, setHoveredFounder] = useState(null);

  const foundersData = {
    manikanta: {
      id: 'manikanta',
      name: 'Mude Manikanta',
      role: 'Co-Founder & Artistic Director',
      badge: 'CO-FOUNDER',
      image: ethosFounderManikanta,
      bio: 'Mude Manikanta is the co-founding pioneer and Artistic Director of Ethos Dance Studio. Renowned for his groundbreaking contemporary fusion, commercial choreography, and stage direction, Manikanta leads creative curriculum, instructor training, and high-energy performance ensembles.',
      highlights: [
        'Master choreographer specializing in Contemporary, Urban Fusion & Bollywood Remix',
        'Directs national dance showcases, stage concerts, and music video concepts',
        'Curated the flagship Ethos Masterclass Curriculum and wedding sangeet programs',
        'Trained under top international guest choreographers across Europe and Asia'
      ],
      quote: '"Artistry begins when technique becomes second nature. At Ethos, we unlock your true movement potential."'
    },
    sreekanth: {
      id: 'sreekanth',
      name: 'Sreekanth Lendugure',
      role: 'Co-Founder & Managing Director',
      badge: 'CO-FOUNDER',
      image: ethosFounderSreekanth,
      bio: 'Sreekanth Lendugure is the visionary co-founder and Managing Director of Ethos Dance Studio. With over a decade of leadership experience in arts management, dance education, and production scale, Sreekanth oversees studio operations, brand partnerships, and strategic expansion across South India.',
      highlights: [
        'Over 10+ years directing large-scale dance productions and masterclasses',
        'Spearheaded Ethos Studio expansion and infrastructure development in Hyderabad',
        'Pioneered corporate & wedding flashmob choreography programs',
        'Mentored 1,000+ dancers into professional performers and certified instructors'
      ],
      quote: '"Dance is not just movement; it is the ultimate expression of human emotion and relentless discipline."'
    }
  };

  const choreographers = [
    {
      id: 1,
      name: 'Mude Manikanta',
      role: 'Co-Founder & Lead Choreographer',
      bio: 'Co-Founder leading choreography development, performance direction, contemporary fusion, and masterclass tours.',
      image: ethosFounderManikanta,
      specialty: 'Co-Founder & Lead Choreographer'
    },
    {
      id: 2,
      name: 'Sreekanth Lendugure',
      role: 'Co-Founder & Executive Director',
      bio: 'Co-Founder driving studio production scale, executive choreography direction, and elite stage ensembles.',
      image: ethosFounderSreekanth,
      specialty: 'Co-Founder & Executive Director'
    },
    {
      id: 3,
      name: 'Rakesh',
      role: 'Assistant Choreographer',
      bio: 'Specialist in street isolations, urban groove musicality, and assisting senior stage ensemble routines.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      specialty: 'Assistant Choreographer'
    },
    {
      id: 4,
      name: 'Chetana',
      role: 'Classical Choreographer',
      bio: 'Expert in classical rhythm, expressive Bharatanatyam fusion, and traditional footwork mechanics.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      specialty: 'Classical Choreographer'
    }
  ];

  const handleFounderClick = (founderKey) => {
    if (hoveredFounder === founderKey) {
      setSelectedFounder(foundersData[founderKey]);
    } else {
      setHoveredFounder(founderKey);
    }
  };

  return (
    <section id="instructors" className="bg-[#FAF8F5] text-slate-900 border-b border-slate-200">
      
      {/* 🌟 1. SECTION: OUR FOUNDERS HEADER & FULL CARD IMAGE BANNER 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-16 border-b border-slate-200">
        
        {/* SECTION TITLE & QUOTE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0088FF] bg-[#0088FF]/10 px-3 py-1 rounded-full inline-block mb-3">
              LEADERSHIP & VISION
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              OUR FOUNDERS
            </h2>
          </div>

          <div className="max-w-md border-l-4 border-[#0088FF] pl-4 py-1">
            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
              "Building a sanctuary where movement meets passion, empowering dancers to turn expression into artistry."
            </p>
          </div>
        </div>

        {/* ELEGANT FULL CARD BANNER */}
        <div
          className="relative max-w-3xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[1.3] min-h-[420px] sm:min-h-[500px] group/container"
          onMouseLeave={() => setHoveredFounder(null)}
        >
          
          {/* FULL FRAME FOUNDERS PHOTO */}
          <img
            src={ethosFoundersDuo}
            alt="Ethos Co-Founders Mude Manikanta & Sreekanth Lendugure"
            className="w-full h-full object-cover object-top filter contrast-105 brightness-105"
          />

          {/* DARK GRADIENT OVERLAY MATRIX */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* TOP LEFT BADGE — STRICTLY "CO-FOUNDERS" */}
          <div className="absolute top-5 left-5 bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-black uppercase px-4 py-1.5 rounded-full border border-white/20 tracking-wider shadow-lg pointer-events-none z-10">
            CO-FOUNDERS
          </div>

          {/* 🎯 PRECISE PERSON HOTSPOT 1: MUDE MANIKANTA (LEFT PERSON HIGHLIGHT) */}
          <div
            onMouseEnter={() => setHoveredFounder('manikanta')}
            onClick={() => handleFounderClick('manikanta')}
            className={`absolute top-[3%] left-[2%] w-[46%] h-[94%] z-20 cursor-pointer rounded-2xl transition-all duration-300 ${
              hoveredFounder === 'manikanta'
                ? 'border-2 border-white/80 bg-white/10 shadow-[0_0_50px_rgba(255,255,255,0.35)] backdrop-brightness-110'
                : 'border-2 border-transparent hover:border-white/40 hover:bg-white/5'
            }`}
            title="Click to highlight, click again for bio"
          >
            {/* UNIQUE LUXURY DARK GLASS HOVER BADGE */}
            <div
              className={`absolute bottom-10 left-3 right-3 sm:left-4 sm:right-4 bg-slate-950/95 backdrop-blur-xl text-white p-3.5 rounded-2xl border border-white/30 shadow-2xl transition-all duration-300 ${
                hoveredFounder === 'manikanta'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0088FF] uppercase tracking-wider mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0088FF] animate-ping" />
                <span>Co-Founder &amp; Artistic Director</span>
              </div>
              <span className="text-sm font-black text-white block font-syne">Mude Manikanta</span>
              <span className="text-[11px] text-slate-300 font-medium block mt-1 font-bold text-[#0088FF]">Tap again to view full bio →</span>
            </div>
          </div>

          {/* 🎯 PRECISE PERSON HOTSPOT 2: SREEKANTH LENDUGURE (RIGHT PERSON HIGHLIGHT) */}
          <div
            onMouseEnter={() => setHoveredFounder('sreekanth')}
            onClick={() => handleFounderClick('sreekanth')}
            className={`absolute top-[3%] left-[50%] w-[48%] h-[94%] z-20 cursor-pointer rounded-2xl transition-all duration-300 ${
              hoveredFounder === 'sreekanth'
                ? 'border-2 border-white/80 bg-white/10 shadow-[0_0_50px_rgba(255,255,255,0.35)] backdrop-brightness-110'
                : 'border-2 border-transparent hover:border-white/40 hover:bg-white/5'
            }`}
            title="Click to highlight, click again for bio"
          >
            {/* UNIQUE LUXURY DARK GLASS HOVER BADGE */}
            <div
              className={`absolute bottom-12 left-3 right-3 sm:left-4 sm:right-4 bg-slate-950/95 backdrop-blur-xl text-white p-3.5 rounded-2xl border border-white/30 shadow-2xl transition-all duration-300 ${
                hoveredFounder === 'sreekanth'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0088FF] uppercase tracking-wider mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0088FF] animate-ping" />
                <span>Co-Founder &amp; Managing Director</span>
              </div>
              <span className="text-sm font-black text-white block font-syne">Sreekanth Lendugure</span>
              <span className="text-[11px] text-slate-300 font-medium block mt-1 font-bold text-[#0088FF]">Tap again to view full bio →</span>
            </div>
          </div>

        </div>

      </div>

      {/* 🌟 2. SECTION: MASTER CHOREOGRAPHERS & FACULTY 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">
            WORLD-CLASS FACULTY
          </span>
          <h3 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 uppercase tracking-tight">
            MASTER CHOREOGRAPHERS
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Train under industry veterans, co-founders, and certified dance specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {choreographers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between text-left"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20">
                    {teacher.specialty}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-lg font-bold font-syne uppercase text-slate-900 tracking-tight leading-snug">
                    {teacher.name}
                  </h4>
                  <span className="text-xs font-bold text-[#0088FF] block uppercase">
                    {teacher.role}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#schedule"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold uppercase rounded-xl transition-colors block text-center"
                >
                  View Classes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 INTERACTIVE FOUNDER PROFILE MODAL POPUP 🌟 */}
      {selectedFounder && (
        <div
          className="fixed inset-0 z-[220] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedFounder(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative my-auto space-y-6 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedFounder(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FOUNDER BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[11px] font-black uppercase rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CO-FOUNDER</span>
            </div>

            {/* HEADER WITH PORTRAIT PHOTO */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={selectedFounder.image}
                alt={selectedFounder.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0088FF]/30 shadow-md shrink-0"
              />
              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight text-slate-900 leading-tight">
                  {selectedFounder.name}
                </h3>
                <p className="text-xs font-bold text-[#0088FF] uppercase tracking-wider mt-1">
                  {selectedFounder.role}
                </p>
              </div>
            </div>

            {/* FULL BIO */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Executive Overview</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedFounder.bio}
              </p>
            </div>

            {/* KEY HIGHLIGHTS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Milestones &amp; Achievements</h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {selectedFounder.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUOTE */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-[#00DFD8] uppercase tracking-widest block">Founder's Philosophy</span>
              <p className="text-xs italic font-serif leading-snug">{selectedFounder.quote}</p>
            </div>

            {/* CLOSE CTA BUTTON */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedFounder(null)}
                className="w-full py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-extrabold uppercase rounded-xl shadow-lg transition-all text-center block"
              >
                Close Founder Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
