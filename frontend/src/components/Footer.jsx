import React, { useState, useEffect, useRef } from 'react';
import ethosNavbarLogo from '../assets/ethos_navbar_logo_official.png';
import shanmukaPhoto from '../assets/shanmuka_photo.jpg';
import { Sparkles, Flame, Zap, ArrowUpRight } from 'lucide-react';

export default function Footer({ onQuickBook }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDistance = rect.height;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDistance, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0A0A0B] text-white pt-10 border-t border-slate-900 relative overflow-hidden font-sans select-none">
      
      {/* 🌟 1. KINETIC MARQUEE BANNER 🌟 */}
      <div className="py-2.5 bg-white/5 border-y border-white/10 overflow-hidden whitespace-nowrap backdrop-blur-md relative z-20">
        <div className="inline-flex items-center gap-8 text-[10px] font-black uppercase font-syne tracking-widest animate-marquee text-white/80">
          <span className="flex items-center gap-2 text-white/90"><Sparkles className="w-3 h-3 text-white" /> DANCE • CREATE • INSPIRE • PERFORM</span>
          <span className="flex items-center gap-2 text-white/90"><Flame className="w-3 h-3 text-white" /> ETHOS DANCE STUDIO HYDERABAD</span>
          <span className="flex items-center gap-2 text-white/90"><Zap className="w-3 h-3 text-white" /> KUKATPALLY MAIN HALL</span>
          <span className="flex items-center gap-2 text-white/90"><Sparkles className="w-3 h-3 text-white" /> DANCE • CREATE • INSPIRE • PERFORM</span>
        </div>
      </div>

      {/* 🌟 2. FOOTER COLUMNS 🌟 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 border-b border-slate-800/80 relative z-20 text-left">
        
        {/* COLUMN 1: Explore */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white font-syne tracking-tight">Explore</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-400">
            <li><a href="events.html" className="hover:text-white transition-colors">Events &amp; Workshops</a></li>
            <li><a href="schedule.html" className="hover:text-white transition-colors">Class Schedule</a></li>
            <li><a href="gallery.html" className="hover:text-white transition-colors">Gallery &amp; Lookbook</a></li>
            <li><a href="packages.html" className="hover:text-white transition-colors">Passes &amp; Packages</a></li>
            <li><a href="location.html" className="hover:text-white transition-colors">Studio Location</a></li>
            <li><a href="sangeet.html" className="hover:text-white transition-colors">Sangeet &amp; Wedding</a></li>
          </ul>
        </div>

        {/* COLUMN 2: Socials */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white font-syne tracking-tight">Socials</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-400">
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

        {/* COLUMN 3: Legal Links & Contact */}
        <div className="space-y-6">
          <ul className="space-y-3 text-sm font-medium text-slate-400">
            <li><a href="privacy.html" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="terms.html" className="hover:text-white transition-colors">Terms and Conditions</a></li>
            <li><a href="refund.html" className="hover:text-white transition-colors">Refund Policy</a></li>
          </ul>

          <div className="pt-2">
            <a
              href="https://wa.me/918341701113"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-3xl font-black font-syne text-white tracking-tight group-hover:text-slate-300 transition-colors">
                Contact
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* 🌟 3. ETHOS EMBLEM LOGO & ALL-WHITE ETHOS TEXT MATCHING EXACT SIZE 🌟 */}
      <div className="bg-[#050507] py-12 px-4 text-center relative overflow-hidden group border-b border-slate-900 flex items-center justify-center">
        
        <div className="relative z-20 flex items-center justify-center gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* EMBLEM LOGO & ETHOS TEXT MATCHING EXACT SAME SIZE IN ALL WHITE */}
          <img
            src={ethosNavbarLogo}
            alt="ETHOS Official Transparent Emblem"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain shrink-0 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          />

          {/* ALL WHITE ETHOS TEXT MATCHING EMBLEM HEIGHT EXACTLY */}
          <div className="text-4xl sm:text-6xl md:text-7xl font-black font-syne text-white tracking-tight uppercase leading-none">
            ETHOS
          </div>
        </div>

      </div>

      {/* 🌟 4. SIGNATURE BOTTOM BAR WITH SMALLER 1.5-2 PT REDUCED CENTERED TEXT 🌟 */}
      <div className="bg-[#000000] border-t border-slate-900 px-6 py-5 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2.5 text-center">
          
          {/* REDUCED FONT SIZE CRAFTED WITH LOVE TEXT (SLIGHTLY SMALLER - REDUCED BY 1.5-2) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-300 text-[11px] sm:text-xs font-semibold tracking-wide">
            <span>Crafted with</span>
            <span className="text-[#FF0055] animate-pulse text-xs">❤️</span>
            <span>for Ethos Dance Studio by</span>
            
            <div className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-0.5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-full shadow-md hover:border-[#00DFD8] transition-all hover:scale-105 group/shanmuka cursor-pointer">
              <div className="relative">
                <img
                  src={shanmukaPhoto}
                  alt="Shanmuka"
                  className="w-5 h-5 rounded-full object-cover border border-[#00DFD8] shadow-sm group-hover/shanmuka:rotate-12 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full border border-slate-950" />
              </div>
              
              <div className="text-left leading-none">
                <span className="font-extrabold text-white tracking-wide font-syne text-[11px] block group-hover/shanmuka:text-[#00DFD8] transition-colors">
                  Shanmuka
                </span>
              </div>
            </div>
          </div>

          <div className="tracking-wide text-slate-500 text-[10px]">
            Copyright © 2026 Ethos Dance Studio. All rights reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}
