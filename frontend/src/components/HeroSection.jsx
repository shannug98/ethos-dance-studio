import React from 'react';
import { Sparkles } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function HeroSection({ onBookWorkshop }) {
  const blueStripText = "ETHOS DANCE STUDIO KUKATPALLY • COMMERCIAL HIP-HOP • BOLLYWOOD COMMERCIAL FUSION • ROYAL WEDDING SANGEET • CONTEMPORARY STORYTELLING • HIGH HEELS CHOREO • ";

  return (
    <section className="relative pt-[76px] bg-[#090A0F] text-white flex flex-col justify-between overflow-hidden">

      {/* 🌟 FULL-BLEED STUDIO PHOTO BACKGROUND 🌟 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Real studio event photo */}
        <img
          src="/ethos_hero_bg.jpg"
          alt="Ethos Dance Studio"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/95 via-[#090A0F]/75 to-[#090A0F]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/60" />
      </div>

      {/* HERO CONTENT: MOBILE FLUID COLUMN (LOGO TOP, TEXT DOWN) & DESKTOP 2-COLUMN */}
      <div className="max-w-7xl mx-auto w-full py-8 sm:py-16 px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. HERO LOGO GRAPHIC (PURE TRANSPARENT - NO CARD WRAPPER AT ALL) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center relative py-4">
            
            {/* Ambient Radial Glow Behind Transparent Logo */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-gradient-to-tr from-[#FF0055]/30 via-transparent to-[#00DFD8]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>

            {/* Pure Transparent Logo Image (img 3) */}
            <div className="relative z-10 w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center p-2 filter drop-shadow-[0_0_40px_rgba(255,0,85,0.5)] hover:scale-105 transition-transform duration-500">
              <img
                src={ethosPureLogo}
                alt="Ethos Dance Studio Emblem Logo"
                className="w-full h-auto object-contain bg-transparent"
              />
            </div>

          </div>

          {/* 2. HERO TEXT MATTER (FOR MOBILE: RENDERED DOWN BELOW LOGO) */}
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

          </div>

        </div>
      </div>

      {/* Solid Accent Strip with 100% Infinite Sliding Marquee */}
      <div className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#00DFD8] flex items-center z-10 text-white text-[10px] sm:text-xs font-extrabold tracking-widest uppercase overflow-hidden relative shadow-lg">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          <span className="pr-8">{blueStripText}</span>
          <span className="pr-8">{blueStripText}</span>
        </div>
      </div>

    </section>
  );
}
