import React from 'react';
import { ChevronDown } from 'lucide-react';
import heroDesktopWebp from '../assets/ethos_hero_desktop.webp';
import heroDesktopJpg from '../assets/ethos_hero_desktop.jpg';
import heroMobileWebp from '../assets/ethos_hero_mobile.webp';
import heroMobileJpg from '../assets/ethos_hero_mobile.jpg';

export default function HeroSection({ onBookWorkshop }) {
  const scrollToNext = () => {
    const el = document.getElementById('workshops');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-screen w-full bg-black text-white flex flex-col justify-end overflow-hidden pt-20">
      
      {/* 🌟 RESPONSIVE DUAL-CROP HIGH-RES HERO COVER (DESKTOP 2560x1440 & MOBILE 1080x1350 WEBP/JPG) 🌟 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <picture className="w-full h-full block">
          {/* Mobile Portrait Crop (1080x1350 - WebP & JPG) */}
          <source media="(max-width: 768px)" type="image/webp" srcSet={heroMobileWebp} />
          <source media="(max-width: 768px)" type="image/jpeg" srcSet={heroMobileJpg} />
          
          {/* Desktop 2K Ultra-Wide Crop (2560x1440 - WebP & JPG) */}
          <source type="image/webp" srcSet={heroDesktopWebp} />
          <img
            src={heroDesktopJpg}
            alt="ETHOS Studio Official Cover Photo"
            className="w-full h-full object-cover object-center filter contrast-105 brightness-105"
          />
        </picture>

        {/* Subtle Bottom Gradient for Seamless Transition into Workshops Section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* MINIMAL SCROLL DOWN CHEVRON BUTTON (BOTTOM CENTER) */}
      <div className="relative z-10 pb-8 flex justify-center">
        <button
          onClick={scrollToNext}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all backdrop-blur-md group shadow-2xl cursor-pointer"
          aria-label="Scroll to Workshops"
        >
          <ChevronDown className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
