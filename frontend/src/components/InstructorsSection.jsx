import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, ArrowRight, Sparkles } from 'lucide-react';
import ethosFounderManikanta from '../assets/ethos_founder_manikanta.jpg';
import ethosFounderSreekanth from '../assets/ethos_founder_sreekanth.jpg';

export default function InstructorsSection({ onSelectChoreographer }) {
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [hoveredFounder, setHoveredFounder] = useState(null);

  const founders = [
    {
      id: 'manikanta',
      name: 'MUDE MANIKANTA',
      role: 'Co-Founder & Lead Choreographer',
      image: ethosFounderManikanta,
      bio: 'Co-Founder leading choreography development, performance direction, contemporary fusion, and masterclass tours across India. Specialist in Bollywood, Urban Hip-Hop, and stage ensembles.',
      highlights: [
        'Co-Founder & Creative Choreography Director at Ethos Dance Studio',
        '10+ years choreographing major stage productions & celebrity workshops',
        'Specialist in Urban Hip-Hop, Contemporary Fusion & Sangeet Ensembles',
        'Directed masterclass tours trained 5,000+ dancers nationwide'
      ],
      quote: '"Dance is not just movement; it is an emotion sculpted in space and time."'
    },
    {
      id: 'sreekanth',
      name: 'SREEKANTH LENDUGURE',
      role: 'Co-Founder & Executive Director',
      image: ethosFounderSreekanth,
      bio: 'Co-Founder driving studio production scale, executive choreography direction, elite stage ensembles, and national curriculum standards for Ethos Dance Studio.',
      highlights: [
        'Co-Founder & Managing Director driving Ethos Studio expansion',
        'Specialist in Commercial Hip-Hop, Krump, and Stage Production',
        'Curated India’s premier masterclass faculty and studio syllabus',
        'Executive Director for corporate productions & national dance fests'
      ],
      quote: '"Discipline turns talent into mastery. Studio is where icons are forged."'
    }
  ];

  const choreographers = [
    {
      id: 1,
      name: 'MUDE MANIKANTA',
      role: 'CO-FOUNDER & LEAD CHOREOGRAPHER',
      specialty: 'CO-FOUNDER & LEAD CHOREOGRAPHER',
      image: ethosFounderManikanta,
      bio: 'Co-Founder leading choreography development, performance direction, contemporary fusion, and masterclass tours.',
      experienceYears: '10+ Years',
      socials: {
        instagram: 'https://instagram.com/ethosdancestudio',
        youtube: 'https://youtube.com/@ethosdancestudio',
        facebook: 'https://facebook.com/ethosdancestudio',
        twitter: 'https://twitter.com/ethosdancestudio'
      }
    },
    {
      id: 2,
      name: 'SREEKANTH LENDUGURE',
      role: 'CO-FOUNDER & EXECUTIVE DIRECTOR',
      specialty: 'CO-FOUNDER & EXECUTIVE DIRECTOR',
      image: ethosFounderSreekanth,
      bio: 'Co-Founder driving studio production scale, executive choreography direction, and elite stage ensembles.',
      experienceYears: '8+ Years',
      socials: {
        instagram: 'https://instagram.com/ethosdancestudio',
        youtube: 'https://youtube.com/@ethosdancestudio',
        facebook: 'https://facebook.com/ethosdancestudio',
        twitter: 'https://twitter.com/ethosdancestudio'
      }
    },
    {
      id: 3,
      name: 'RAKESH',
      role: 'ASSISTANT CHOREOGRAPHER',
      specialty: 'ASSISTANT CHOREOGRAPHER',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in street isolations, urban groove musicality, and assisting senior stage ensemble routines.',
      experienceYears: '5+ Years',
      socials: {
        instagram: 'https://instagram.com/rakesh_ethos',
        youtube: 'https://youtube.com/@rakesh_dance',
        facebook: 'https://facebook.com/rakesh.dance',
        twitter: 'https://twitter.com/rakesh_dance'
      }
    },
    {
      id: 4,
      name: 'CHETANA',
      role: 'CLASSICAL CHOREOGRAPHER',
      specialty: 'CLASSICAL CHOREOGRAPHER',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Expert in classical rhythm, expressive Bharatanatyam fusion, and traditional footwork mechanics.',
      experienceYears: '6+ Years',
      socials: {
        instagram: 'https://instagram.com/chetana_classical',
        youtube: 'https://youtube.com/@chetana_dance',
        facebook: 'https://facebook.com/chetana.dance',
        twitter: 'https://twitter.com/chetana.dance'
      }
    }
  ];

  return (
    <section id="instructors" className="bg-[#F8FAFC] py-16 sm:py-24 font-sans text-slate-900 border-t border-slate-200">
      
      {/* 🌟 1. SECTION: INTERACTIVE ETHOS CO-FOUNDERS HOVER CARDS 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-20">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0088FF]">
            THE VISIONARIES BEHIND ETHOS
          </span>
          <h3 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 uppercase tracking-tight">
            ETHOS CO-FOUNDERS
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Hover over founder portraits to reveal full executive bios and leadership milestones.
          </p>
        </div>

        {/* 2-COLUMN HOVER CARDS FOR MANIKANTA & SREEKANTH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((f) => {
            const isHovered = hoveredFounder === f.id;
            return (
              <div
                key={f.id}
                onMouseEnter={() => setHoveredFounder(f.id)}
                onMouseLeave={() => setHoveredFounder(null)}
                onClick={() => setSelectedFounder(f)}
                className="relative h-96 sm:h-[420px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border-2 border-slate-300 cursor-pointer group transition-all duration-300 hover:border-[#0088FF] hover:shadow-2xl"
              >
                {/* FOUNDER IMAGE */}
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-300" />

                {/* DEFAULT PERMANENT BADGE AT BOTTOM */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0088FF] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>{f.role}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-syne uppercase text-white tracking-tight leading-tight">
                    {f.name}
                  </h4>
                </div>

                {/* HOVER OVERLAY CARD WITH "MORE INFO" BUTTON */}
                <div
                  className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between text-white transition-all duration-300 ${
                    isHovered
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-widest block">
                      Executive Leadership
                    </span>
                    <h4 className="text-2xl font-black font-syne uppercase text-white tracking-tight">
                      {f.name}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {f.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Tap for full executive bio</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFounder(f);
                      }}
                      className="px-5 py-2.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      View Full Bio <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🌟 2. SECTION: MASTER CHOREOGRAPHERS (DIRECTLY UNDER FOUNDERS WITH SOCIAL ICONS) 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0088FF]">
            WORLD-CLASS FACULTY
          </span>
          <h3 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 uppercase tracking-tight">
            MASTER CHOREOGRAPHERS
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Train under industry veterans, certified dance specialists, and choreography directors.
          </p>
        </div>

        {/* 4-COLUMN RESPONSIVE CHOREOGRAPHER CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {choreographers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => onSelectChoreographer && onSelectChoreographer(teacher)}
              className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#0088FF] transition-all duration-300 group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20">
                    {teacher.specialty}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h4 className="text-lg font-black font-syne uppercase text-slate-900 tracking-tight leading-snug group-hover:text-[#0088FF] transition-colors">
                    {teacher.name}
                  </h4>
                  <span className="text-xs font-bold text-[#0088FF] block uppercase">
                    {teacher.role}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                    {teacher.bio}
                  </p>

                  {/* 🌟 SOCIAL MEDIA ACCOUNTS (EXCLUSIVELY FOR CHOREOGRAPHERS) 🌟 */}
                  <div className="pt-2 flex items-center gap-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                    {/* Facebook Icon */}
                    <a
                      href={teacher.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Facebook Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* Twitter / X Icon */}
                    <a
                      href={teacher.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Twitter / X Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>

                    {/* Instagram Icon */}
                    <a
                      href={teacher.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E4405F] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Instagram Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* YouTube Icon */}
                    <a
                      href={teacher.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF0000] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="YouTube Channel"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectChoreographer) onSelectChoreographer(teacher);
                  }}
                  className="w-full py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase rounded-xl transition-all shadow-md block text-center cursor-pointer"
                >
                  View Profile &amp; Classes →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOUNDER BIO MODAL */}
      {selectedFounder && (
        <div
          className="fixed inset-0 z-[220] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedFounder(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative my-auto space-y-6 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFounder(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[11px] font-black uppercase rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CO-FOUNDER &amp; DIRECTOR</span>
            </div>

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

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Executive Overview</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedFounder.bio}
              </p>
            </div>

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

            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-[#00DFD8] uppercase tracking-widest block">Founder's Philosophy</span>
              <p className="text-xs italic font-serif leading-snug">{selectedFounder.quote}</p>
            </div>

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
