import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroSection({ onBookWorkshop, onScrollToQuiz }) {
  return (
    <section className="relative min-h-screen pt-[76px] bg-[#000000] flex flex-col justify-between overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 top-[76px] z-0">
        <img
          src="/hero_banner.jpg"
          alt="Ethos Dance Studio"
          className="w-full h-full object-cover grayscale contrast-125 opacity-70"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]/60" />
      </div>

      {/* Hero Central Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 my-auto py-20">
        <div className="max-w-4xl space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1F41FF] text-white text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETHOS DANCE STUDIO • KUKATPALLY HYDERABAD</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display-giant text-white uppercase leading-[0.88] tracking-tighter">
            FIND YOUR <br />
            <span className="text-[#D0FBF9]">FLOW.</span>
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
