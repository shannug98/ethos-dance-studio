import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#090A0F] text-white border-y border-white/10 relative overflow-hidden font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        
        {/* Left Card: Image with 'VISION' Overlay */}
        <div className="relative min-h-[400px] md:min-h-[550px] bg-black overflow-hidden flex items-end p-8 sm:p-12 group">
          <img
            src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
            alt="Vision Ethos Studio"
            className="absolute inset-0 w-full h-full object-cover filter contrast-125 brightness-90 opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/40 to-transparent" />
          <h2 className="relative z-10 text-5xl sm:text-7xl font-extrabold font-syne text-white uppercase tracking-tighter drop-shadow-2xl">
            VISION
          </h2>
        </div>

        {/* Right Card: Text Info in Luxury Dark Frame */}
        <div className="p-8 sm:p-16 flex flex-col justify-center space-y-6 bg-[#0D0E15] border-l border-white/10 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Story & Purpose</p>

          <h3 className="text-3xl sm:text-5xl font-black uppercase font-syne tracking-tight text-white leading-tight">
            ABOUT ETHOS
          </h3>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            At <strong className="text-white font-bold">ETHOS DANCE STUDIO</strong>, we’re passionate about creating an empowering and inspiring environment for dancers of all levels. Whether you’re a complete beginner eager to explore movement, a wedding couple preparing for Sangeet night, or a performer refining your technique, you’ll find a home here.
          </p>

          <div className="pt-4">
            <a
              href="events.html"
              className="inline-flex items-center gap-3 bg-white hover:bg-slate-200 text-slate-950 px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 group"
            >
              <span>Explore Our Classes</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
