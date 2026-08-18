import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroSection({ onBookWorkshop, onScrollToQuiz }) {
  return (
    <section className="relative min-h-screen pt-[76px] bg-[#000000] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Background Graphic: Giant ETHOS Logo Symbol replacing the woman photo */}
      <div className="absolute inset-0 top-[76px] z-0 flex items-center justify-center overflow-hidden opacity-30 pointer-events-none">
        <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[900px] lg:h-[900px] text-white animate-pulse" style={{ animationDuration: '8s' }}>
          <img
            src="/ethos_symbol.svg"
            alt="Ethos Symbol Background"
            className="w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(255,0,68,0.5)]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]" />
      </div>

      {/* Hero Central Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 my-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
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
                onClick={() => onBookWorkshop && onBookWorkshop({ id: 1, title: 'Afro-Fusion Masterclass', price: 1499 })}
                className="btn-cyan text-sm sm:text-base py-4 px-8 uppercase font-bold tracking-tight shadow-2xl"
              >
                Reserve Your Spot
              </button>

              <button
                onClick={onScrollToQuiz}
                className="btn-blue text-sm sm:text-base py-4 px-6 uppercase font-bold tracking-tight"
              >
                Take Rhythm Finder Quiz
              </button>
            </div>

          </div>

          {/* Right Symbol Showcase Card (Official Ethos Symbol) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="p-8 bg-[#111111]/80 border-2 border-[#333333] backdrop-blur-md max-w-sm w-full text-center space-y-4 shadow-2xl relative group hover:border-[#FF0044] transition-all">
              <div className="w-48 h-48 mx-auto text-white">
                <img
                  src="/ethos_symbol.svg"
                  alt="Ethos Symbol Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,0,68,0.6)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-2 border-t border-[#222222]">
                <h3 className="text-2xl font-display-giant uppercase text-white tracking-widest">ETHOS</h3>
                <span className="text-[10px] font-extrabold uppercase tracking-[4px] text-[#FF0044] block">DANCE STUDIO</span>
              </div>
            </div>
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
