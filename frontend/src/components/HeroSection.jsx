import React from 'react';
import { Sparkles } from 'lucide-react';
import { LOGO_DARK_BASE64 } from '../assets/logoBase64';

export default function HeroSection({ onBookWorkshop }) {
  return (
    <section className="relative min-h-screen pt-[76px] bg-[#000000] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Background Image: Official Ethos Logo Emblem Centered Behind Content */}
      <div className="absolute inset-0 top-[76px] z-0 flex items-center justify-center overflow-hidden opacity-25 pointer-events-none">
        <div className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] lg:w-[900px] lg:h-[900px]">
          <img
            src={LOGO_DARK_BASE64}
            alt="Ethos Logo Background"
            className="w-full h-full object-contain filter drop-shadow-[0_0_100px_rgba(255,0,68,0.7)]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]" />
      </div>

      {/* Hero Central Content */}
      <div className="w-full relative z-10 my-auto py-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-4xl space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF0044] text-white text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETHOS DANCE STUDIO • KUKATPALLY HYDERABAD</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display-giant text-white uppercase leading-[0.88] tracking-tighter">
            FIND YOUR <br />
            <span className="text-[#FF0044]">FLOW.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 font-normal max-w-2xl leading-relaxed">
            Welcome to <strong>ETHOS DANCE STUDIO</strong>. Located at Kukatpally Hyderabad, we bring world-class training in Commercial Hip-Hop, Bollywood Fusion, and Royal Sangeet Choreography.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onBookWorkshop && onBookWorkshop({ id: 1, title: 'Free Demo Trial Pass', price: 0, type: 'Free Trial' })}
              className="btn-cyan text-sm sm:text-base py-4 px-8 uppercase font-bold tracking-tight shadow-2xl"
            >
              Reserve Free Demo Spot
            </button>
          </div>

        </div>
      </div>

      {/* Solid Cobalt Blue Accent Strip */}
      <div className="w-full h-12 bg-[#1F41FF] flex items-center justify-between px-6 z-10 text-white text-xs font-extrabold tracking-widest uppercase overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          <span>ETHOS DANCE STUDIO KUKATPALLY</span>
          <span>•</span>
          <span>COMMERCIAL HIP-HOP</span>
          <span>•</span>
          <span>BOLLYWOOD COMMERCIAL FUSION</span>
          <span>•</span>
          <span>ROYAL WEDDING SANGEET</span>
          <span>•</span>
          <span>CONTEMPORARY STORYTELLING</span>
          <span>•</span>
          <span>HIGH HEELS CHOREO</span>
          <span>•</span>
        </div>
      </div>

    </section>
  );
}
