import React, { useState, useEffect, useRef } from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';
import shanmukaPhoto from '../assets/shanmuka_photo.jpg';
import { Sparkles, Flame, Zap, ArrowUpRight, Radio } from 'lucide-react';

export default function Footer({ onQuickBook }) {
  const [oScale, setOScale] = useState(35); // Initial huge scale covering entire footer picture
  const footerRef = useRef(null);

  const ethosLetters = ['E', 'T', 'H', 'O', 'S'];

  // 🌟 ANIMATION STARTS FROM TAB JUST ABOVE FOOTER AND COVERS ENTIRE FOOTER UNTIL BOTTOM 🌟
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animation starts when scrolling section/tab JUST ABOVE footer
      // (approx 450px before footer top enters bottom of screen)
      const startOffset = windowHeight + 450;
      const totalDistance = rect.height + 450;
      const currentScroll = startOffset - rect.top;

      const progress = Math.min(Math.max(currentScroll / totalDistance, 0), 1);

      // Interpolate O scale from 35 down to 1 as progress goes from 0 to 1
      const calculatedScale = 35 - progress * 34; // Starts at 35 (covers entire footer picture), ends at 1
      setOScale(calculatedScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#030407] text-white pt-10 border-t border-slate-900 relative overflow-hidden font-sans select-none">
      
      {/* 🌟 FULL SCREEN OVERLAY MASK THAT COVERS ENTIRE FOOTER PICTURE AT START 🌟 */}
      <div
        className="absolute inset-0 z-35 bg-[#030407] pointer-events-none transition-opacity duration-200"
        style={{
          opacity: oScale > 8 ? Math.min(1, (oScale - 8) / 12) : 0
        }}
      />

      {/* 🌟 GIANT FULL FOOTER "O" LENS MASK (FULL PICTURE COVERAGE) 🌟 */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#FF0055]/40 via-[#7928CA]/40 to-[#00DFD8]/40 rounded-full blur-[120px] transition-all duration-150"
          style={{
            width: `${oScale * 250}px`,
            height: `${oScale * 250}px`,
            opacity: oScale > 2 ? 0.95 : 0.3
          }}
        />
      </div>

      {/* 🌟 1. INFINITE KINETIC MARQUEE BANNER 🌟 */}
      <div className="py-2 bg-gradient-to-r from-[#FF0055]/20 via-[#7928CA]/30 to-[#00DFD8]/20 border-y border-white/10 overflow-hidden whitespace-nowrap backdrop-blur-md relative z-20">
        <div className="inline-flex items-center gap-8 text-[10px] font-black uppercase font-syne tracking-widest animate-marquee text-white/90">
          <span className="flex items-center gap-2 text-[#00DFD8]"><Sparkles className="w-3 h-3" /> DANCE • CREATE • INSPIRE • PERFORM</span>
          <span className="flex items-center gap-2 text-pink-400"><Flame className="w-3 h-3 text-[#FF0055]" /> ETHOS DANCE STUDIO HYDERABAD</span>
          <span className="flex items-center gap-2 text-amber-300"><Zap className="w-3 h-3" /> KUKATPALLY MAIN HALL</span>
          <span className="flex items-center gap-2 text-[#00DFD8]"><Sparkles className="w-3 h-3" /> DANCE • CREATE • INSPIRE • PERFORM</span>
        </div>
      </div>

      {/* 🌟 2. TOP FOOTER INFORMATION GRID 🌟 */}
      <div
        style={{
          opacity: oScale > 10 ? Math.max(0, 1 - (oScale - 10) / 15) : 1,
          transition: 'opacity 0.2s ease-out'
        }}
        className="max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-900/80 relative z-20"
      >
        
        {/* Logo & Bio */}
        <div className="space-y-2.5">
          <div className="h-10 w-auto flex items-center">
            <img
              src={ethosPureLogo}
              alt="Ethos Dance Studio Logo"
              className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]"
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
            Hyderabad's Premier Dance Studio & Masterclass Hub. Professional Hip-Hop, Contemporary, Bollywood Fusion, and Royal Sangeet Choreography.
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-2.5 text-[11px] font-medium text-slate-300">
          <div>
            <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Email Studio</span>
            <a href="mailto:ethosdancestudio@gmail.com" className="font-bold text-xs text-white hover:text-[#00DFD8] transition-colors flex items-center gap-1">
              <span>ethosdancestudio@gmail.com</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div>
            <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Call / WhatsApp Hotline</span>
            <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="font-extrabold text-xs text-[#25D366] hover:underline flex items-center gap-1.5 mt-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C7.03 3 3 7.03 3 12c0 1.85.56 3.57 1.52 5L3 21l4.15-1.42A8.94 8.94 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" stroke="#25D366" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.5 8.5c-.3 0-.6.1-.8.3-.3.3-.8 1.1-.8 2.2 0 1.1.8 2.2 1.6 3.2.8.9 2 2.1 3.2 2.6 1.1.5 1.9.4 2.4.1.4-.2.9-.8 1.1-1.2.2-.4.1-.7-.1-.9l-1.3-.9c-.2-.1-.5-.1-.7.1l-.6.7c-.2.2-.4.2-.7 0-.5-.3-1.4-.9-2.1-1.6-.6-.6-1.1-1.3-1.3-1.7-.1-.3 0-.5.2-.7l.5-.6c.2-.2.2-.5.1-.7l-.8-1.5c-.2-.3-.5-.4-.7-.4z" fill="#25D366" />
              </svg>
              <span>+91 83417 01113</span>
              <ArrowUpRight className="w-3 h-3 text-[#25D366]" />
            </a>
          </div>
        </div>

        {/* Location & Timings */}
        <div className="space-y-2.5 text-[11px] text-slate-300 font-medium">
          <div>
            <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Studio Headquarters</span>
            <p className="font-bold text-[11px] text-white mt-0.5 leading-relaxed">
              Second floor, 1/2/49/1, Nizampet Rd, Kukatpally, Hyderabad, Telangana 500085
            </p>
          </div>

          <div className="pt-0.5">
            <a href="schedule.html" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-full text-[#0088FF] font-extrabold text-[10.5px] hover:border-[#0088FF] transition-all">
              <Radio className="w-3 h-3 text-[#0088FF] animate-pulse" />
              <span>Live Class Timetable & Schedule</span>
            </a>
          </div>
        </div>

      </div>

      {/* 🌟 3. COMPACT & ELEGANT "ETHOS." REVEAL SECTION 🌟 */}
      <div className="bg-[#020305] py-6 sm:py-8 px-4 text-center relative overflow-hidden group">
        
        {/* 🌟 LOGO TO THE LEFT OF COMPACT WHITE ETHOS. TYPOGRAPHY 🌟 */}
        <div className="relative z-20 flex items-center justify-center gap-2 sm:gap-3">
          
          {/* Studio Brand Logo to Left of ETHOS */}
          <div
            style={{
              opacity: oScale > 10 ? Math.max(0, 1 - (oScale - 10) / 15) : 1,
              transition: 'opacity 0.2s ease-out'
            }}
            className="flex items-center shrink-0"
          >
            <img
              src={ethosPureLogo}
              alt="Ethos Pure Logo"
              className="h-[7.5vw] sm:h-[5.5vw] min-h-[36px] sm:min-h-[60px] w-auto object-contain mr-2 sm:mr-3.5 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform"
            />
          </div>

          {/* Compact Pure WHITE Characters for E T H O S . */}
          <div className="inline-flex items-center gap-1 sm:gap-1.5">
            {ethosLetters.map((char, idx) => {
              const isO = char === 'O';
              return (
                <span
                  key={idx}
                  style={
                    isO
                      ? {
                          transform: `scale(${oScale})`,
                          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                          zIndex: oScale > 2 ? 40 : 20
                        }
                      : {
                          opacity: oScale > 10 ? Math.max(0, 1 - (oScale - 10) / 15) : 1,
                          transition: 'opacity 0.2s ease-out'
                        }
                  }
                  className="text-[7.5vw] sm:text-[5.5vw] font-black font-syne tracking-tight leading-none uppercase text-white inline-block transition-transform duration-300 hover:scale-110 drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]"
                >
                  {char}
                </span>
              );
            })}

            {/* Pure White Period Dot */}
            <span
              style={{
                opacity: oScale > 10 ? Math.max(0, 1 - (oScale - 10) / 15) : 1,
                transition: 'opacity 0.2s ease-out'
              }}
              className="text-[7.5vw] sm:text-[5.5vw] font-black font-syne leading-none text-[#FF0055] drop-shadow-[0_0_20px_rgba(255,0,85,1)]"
            >
              .
            </span>
          </div>

        </div>

      </div>

      {/* 🌟 4. SIGNATURE BOTTOM BAR WITH SHANMUKA'S PHOTO 🌟 */}
      <div className="bg-[#000000] border-t border-slate-900 px-6 py-4 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
          
          {/* Copyright Left */}
          <div className="tracking-wide text-slate-400 text-[11px]">
            Copyright © 2026 Ethos Dance Studio. All rights reserved.
          </div>

          {/* Crafted with ❤️ by Shanmuka Right */}
          <div className="flex items-center gap-2 text-slate-200 text-[11px]">
            <span>Crafted with</span>
            <span className="text-[#FF0055] animate-pulse text-sm">❤️</span>
            <span>by</span>
            
            {/* Shanmuka Avatar Badge */}
            <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-full shadow-xl hover:border-[#00DFD8] transition-all hover:scale-105 group/shanmuka">
              <div className="relative">
                <img
                  src={shanmukaPhoto}
                  alt="Shanmuka"
                  className="w-6 h-6 rounded-full object-cover border border-[#00DFD8] shadow-md group-hover/shanmuka:rotate-12 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              
              <div className="text-left leading-none">
                <span className="font-extrabold text-white tracking-wide font-syne text-[11px] block group-hover/shanmuka:text-[#00DFD8] transition-colors">
                  Shanmuka
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
