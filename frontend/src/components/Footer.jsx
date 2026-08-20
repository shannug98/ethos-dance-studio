import React, { useState, useEffect, useRef } from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';
import shanmukaPhoto from '../assets/shanmuka_photo.jpg';
import { Sparkles, Flame, Zap, ArrowUpRight } from 'lucide-react';

export default function Footer({ onQuickBook }) {
  const [oScale, setOScale] = useState(35);
  const footerRef = useRef(null);

  const ethosLetters = ['E', 'T', 'H', 'O', 'S'];

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight + 450;
      const totalDistance = rect.height + 450;
      const currentScroll = startOffset - rect.top;

      const progress = Math.min(Math.max(currentScroll / totalDistance, 0), 1);
      const calculatedScale = 35 - progress * 34;
      setOScale(calculatedScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0A0A0B] text-white pt-10 border-t border-slate-900 relative overflow-hidden font-sans select-none">
      
      {/* FULL SCREEN OVERLAY MASK */}
      <div
        className="absolute inset-0 z-35 bg-[#0A0A0B] pointer-events-none transition-opacity duration-200"
        style={{
          opacity: oScale > 8 ? Math.min(1, (oScale - 8) / 12) : 0
        }}
      />

      {/* GIANT O LENS MASK */}
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

      {/* 🌟 1. KINETIC MARQUEE BANNER 🌟 */}
      <div className="py-2 bg-gradient-to-r from-[#FF0055]/20 via-[#7928CA]/30 to-[#00DFD8]/20 border-y border-white/10 overflow-hidden whitespace-nowrap backdrop-blur-md relative z-20">
        <div className="inline-flex items-center gap-8 text-[10px] font-black uppercase font-syne tracking-widest animate-marquee text-white/90">
          <span className="flex items-center gap-2 text-[#00DFD8]"><Sparkles className="w-3 h-3" /> DANCE • CREATE • INSPIRE • PERFORM</span>
          <span className="flex items-center gap-2 text-pink-400"><Flame className="w-3 h-3 text-[#FF0055]" /> ETHOS DANCE STUDIO HYDERABAD</span>
          <span className="flex items-center gap-2 text-amber-300"><Zap className="w-3 h-3" /> KUKATPALLY MAIN HALL</span>
          <span className="flex items-center gap-2 text-[#00DFD8]"><Sparkles className="w-3 h-3" /> DANCE • CREATE • INSPIRE • PERFORM</span>
        </div>
      </div>

      {/* 🌟 2. FOOTER COLUMNS (MATCHING USER SCREENSHOT IMG 1) 🌟 */}
      <div
        style={{
          opacity: oScale > 10 ? Math.max(0, 1 - (oScale - 10) / 15) : 1,
          transition: 'opacity 0.2s ease-out'
        }}
        className="max-w-7xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 border-b border-slate-800/80 relative z-20 text-left"
      >
        
        {/* COLUMN 1: Explore (Actual Website Pages) */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white font-syne tracking-tight">Explore</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            <li><a href="events.html" className="hover:text-white transition-colors">Events & Workshops</a></li>
            <li><a href="schedule.html" className="hover:text-white transition-colors">Class Schedule</a></li>
            <li><a href="gallery.html" className="hover:text-white transition-colors">Gallery & Lookbook</a></li>
            <li><a href="packages.html" className="hover:text-white transition-colors">Passes & Packages</a></li>
            <li><a href="location.html" className="hover:text-white transition-colors">Studio Location</a></li>
            <li><a href="sangeet.html" className="hover:text-white transition-colors">Sangeet & Wedding</a></li>
          </ul>
        </div>

        {/* COLUMN 2: Socials (Instagram & YouTube Only) */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white font-syne tracking-tight">Socials</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>ethos.dance</span>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M23.498 6.186c-.273-.997-1.06-1.783-2.057-2.058-1.818-.487-9.441-.487-9.441-.487s-7.623 0-9.44.487c-.997.275-1.784 1.061-2.058 2.058-.487 1.819-.487 5.682-.487 5.682s0 3.863.487 5.682c.274.997 1.061 1.783 2.058 2.058 1.817.487 9.44.487 9.44.487s7.623 0 9.441-.487c.997-.275 1.784-1.061 2.057-2.058.487-1.819.487-5.682.487-5.682s0-3.863-.487-5.682zm-13.498 9.314v-7l6 3.5-6 3.5z"/>
                </svg>
                <span>Ethos Dance Studio</span>
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: Legal Links & Contact (Matching img 1) */}
        <div className="space-y-6">
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            <li><a href="privacy.html" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="terms.html" className="hover:text-white transition-colors">Terms and Conditions</a></li>
            <li><a href="refund.html" className="hover:text-white transition-colors">Refund Policy</a></li>
          </ul>

          {/* Contact Action Button with Blue Circle Arrow (Matching img 1) */}
          <div className="pt-2">
            <a
              href="https://wa.me/918341701113"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-3xl font-black font-syne text-white tracking-tight group-hover:text-[#0088FF] transition-colors">
                Contact
              </span>
              <div className="w-10 h-10 rounded-full bg-[#0088FF] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* 🌟 3. COMPACT & ELEGANT "ETHOS." REVEAL SECTION 🌟 */}
      <div className="bg-[#050507] py-6 sm:py-8 px-4 text-center relative overflow-hidden group">
        
        <div className="relative z-20 flex items-center justify-center gap-2 sm:gap-3">
          
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
          
          <div className="tracking-wide text-slate-400 text-[11px]">
            Copyright © 2026 Ethos Dance Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-slate-200 text-[11px]">
            <span>Crafted with</span>
            <span className="text-[#FF0055] animate-pulse text-sm">❤️</span>
            <span>by</span>
            
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
