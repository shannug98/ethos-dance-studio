import React from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function Footer({ onQuickBook }) {
  return (
    <footer className="bg-[#D0FBF9] text-[#000000] pt-16">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo Column */}
        <div className="space-y-4">
          <div className="h-16 w-auto flex items-center">
            <img
              src={ethosPureLogo}
              alt="Ethos Dance Studio Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Ethos Dance Studio© 2026 All Rights Reserved
          </p>
        </div>

        {/* Contact Links Column */}
        <div className="space-y-4 text-xs font-semibold">
          <div>
            <span className="block opacity-60 uppercase">Email:</span>
            <a href="mailto:ethosdancestudio@gmail.com" className="font-bold text-sm underline text-[#000000] hover:text-[#1F41FF]">
              ethosdancestudio@gmail.com
            </a>
          </div>

          <div>
            <span className="block opacity-60 uppercase">Instagram:</span>
            <a href="https://instagram.com/ethosdancestudio" target="_blank" rel="noreferrer" className="font-bold text-sm underline text-[#000000] hover:text-[#1F41FF]">
              @ethosdancestudio
            </a>
          </div>

          <div>
            <span className="block opacity-60 uppercase">Call / WhatsApp:</span>
            <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="font-black text-base text-slate-900 hover:text-[#1F41FF] underline block mt-0.5">
              +91 83417 01113
            </a>
          </div>
        </div>

        {/* Address Column */}
        <div className="space-y-4 text-xs font-semibold">
          <div>
            <span className="block opacity-60 uppercase">Address:</span>
            <p className="font-bold text-xs text-[#000000] mt-1 leading-relaxed">
              Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085
            </p>
          </div>

          <div className="pt-2">
            <a href="schedule.html" target="_self" className="underline font-bold text-xs hover:text-[#1F41FF]">View Class Schedules & Timetable</a>
          </div>
        </div>

      </div>

      {/* 3 BIG ACTION COLOR BLOCKS at Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#000000]">
        
        {/* Block 1: Cobalt Blue */}
        <a href="https://instagram.com/ethosdancestudio" target="_blank" rel="noreferrer" className="bg-[#1F41FF] text-white p-10 flex items-center justify-center hover:bg-[#3353ff] transition-all">
          <span className="font-syne text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Our Socials
          </span>
        </a>

        {/* Block 2: Black */}
        <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="bg-[#000000] text-white p-10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all border-y md:border-y-0 md:border-x border-[#333333]">
          <span className="font-syne text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#D0FBF9]">
            WhatsApp Us
          </span>
        </a>

        {/* Block 3: Magenta */}
        <a
          href="packages.html"
          target="_self"
          className="bg-[#D900FF] text-[#000000] p-10 flex items-center justify-center hover:bg-[#e433ff] transition-all text-left"
        >
          <span className="font-syne text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Passes & Pricing
          </span>
        </a>

      </div>

    </footer>
  );
}
