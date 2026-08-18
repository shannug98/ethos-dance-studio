import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function HeroSection({ onBookWorkshop }) {
  const blueStripText = "ETHOS DANCE STUDIO KUKATPALLY • COMMERCIAL HIP-HOP • BOLLYWOOD COMMERCIAL FUSION • ROYAL WEDDING SANGEET • CONTEMPORARY STORYTELLING • HIGH HEELS CHOREO • ";

  return (
    <section className="relative pt-[76px] bg-[#090A0F] text-white flex flex-col justify-between overflow-hidden">
      
      {/* HERO CONTENT: MOBILE FLUID COLUMN (IMAGE TOP, TEXT DOWN) & DESKTOP 2-COLUMN */}
      <div className="max-w-7xl mx-auto w-full py-8 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. HERO LOGO EMBLEM CARD (REPLACED DANCER IMAGE WITH ETHOS LOGO - IMG 3) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-card p-6 group border border-white/15 shadow-2xl bg-gradient-to-b from-[#161722] to-[#0C0D12]">
              <div className="relative h-[280px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex flex-col items-center justify-center p-8 text-center group-hover:border-[#FF0055]/50 transition-colors duration-500">
                
                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0055]/20 via-transparent to-[#00DFD8]/20 blur-xl"></div>
                
                {/* Official Ethos Emblem Logo (img 3) */}
                <div className="relative z-10 w-48 sm:w-64 lg:w-72 max-h-[260px] flex items-center justify-center filter drop-shadow-[0_0_30px_rgba(255,0,85,0.4)] group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={ethosPureLogo}
                    alt="Ethos Dance Studio Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Bottom Live Sessions Bar */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between z-20">
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold text-[#00DFD8] uppercase tracking-wider block">WEEKLY BATCHES LIVE</span>
                    <strong className="text-xs font-bold text-white">Mon-Fri Morning & Evening Sessions</strong>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00DFD8] animate-ping"></span>
                </div>

              </div>
            </div>
          </div>

          {/* 2. HERO TEXT MATTER (FOR MOBILE: RENDERED DOWN BELOW IMAGE) */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>ETHOS DANCE STUDIO • KUKATPALLY HYDERABAD</span>
            </div>

            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black font-syne text-white uppercase leading-[0.95] tracking-tight">
              FIND YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#00DFD8] italic">
                FLOW.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
              Welcome to <strong className="text-white font-bold">ETHOS DANCE STUDIO</strong>. Located at Kukatpally Hyderabad, we bring world-class training in Commercial Hip-Hop, Bollywood Fusion, and Royal Sangeet Choreography.
            </p>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={() => onBookWorkshop && onBookWorkshop({ id: 1, title: 'Free Demo Trial Pass', price: 0, type: 'Free Trial' })}
                className="w-full sm:w-auto btn-cyan text-xs sm:text-sm py-4 px-8 font-black uppercase tracking-wider shadow-xl shadow-[#00DFD8]/20 flex items-center justify-center gap-2"
              >
                <span>Reserve Free Demo Spot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Solid Cobalt Blue Accent Strip with 100% Infinite Sliding Marquee */}
      <div className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#00DFD8] flex items-center z-10 text-white text-[10px] sm:text-xs font-extrabold tracking-widest uppercase overflow-hidden relative shadow-lg">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          <span className="pr-8">{blueStripText}</span>
          <span className="pr-8">{blueStripText}</span>
        </div>
      </div>

    </section>
  );
}
