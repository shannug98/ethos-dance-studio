import React from 'react';

export default function Footer({ onQuickBook }) {
  return (
    <footer className="bg-[#D0FBF9] text-[#000000] pt-16">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 text-black shrink-0">
              <img src="/ethos_symbol.svg" alt="Ethos Logo Emblem" className="w-full h-full object-contain filter invert" />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-display-giant uppercase tracking-tighter text-[#000000] leading-none">
                ETHOS
              </h2>
              <span className="text-[10px] font-extrabold uppercase tracking-[4px] text-slate-800 block">DANCE STUDIO</span>
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Ethos Dance Studio© 2026 All Rights Reserved
          </p>
        </div>

        {/* Contact Links Column */}
        <div className="space-y-4 text-xs font-semibold">
          <div>
            <span className="block opacity-60 uppercase">Email:</span>
            <a href="mailto:hello@ethosdancestudio.com" className="font-bold text-sm underline text-[#000000]">
              hello@ethosdancestudio.com
            </a>
          </div>

          <div>
            <span className="block opacity-60 uppercase">Instagram:</span>
            <a href="#" className="font-bold text-sm underline text-[#000000]">
              @ethosdancestudio
            </a>
          </div>

          <div>
            <span className="block opacity-60 uppercase">Call / WhatsApp:</span>
            <span className="font-bold text-sm text-[#000000] block mt-0.5">
              +91 98765 43210
            </span>
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
            <a href="#classes" className="underline font-bold text-xs">View Class Schedules & Timetable</a>
          </div>
        </div>

      </div>

      {/* 3 BIG ACTION COLOR BLOCKS at Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#000000]">
        
        {/* Block 1: Cobalt Blue */}
        <a href="#contact" className="bg-[#1F41FF] text-white p-10 flex items-center justify-center hover:bg-[#3353ff] transition-all">
          <span className="font-display-giant text-3xl sm:text-4xl uppercase tracking-tight">
            Our Socials
          </span>
        </a>

        {/* Block 2: Black */}
        <a href="#contact" className="bg-[#000000] text-white p-10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all border-y md:border-y-0 md:border-x border-[#333333]">
          <span className="font-display-giant text-3xl sm:text-4xl uppercase tracking-tight text-[#D0FBF9]">
            Email Us
          </span>
        </a>

        {/* Block 3: Magenta */}
        <button
          onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
          className="bg-[#D900FF] text-[#000000] p-10 flex items-center justify-center hover:bg-[#e433ff] transition-all text-left"
        >
          <span className="font-display-giant text-3xl sm:text-4xl uppercase tracking-tight">
            Book With Us
          </span>
        </button>

      </div>

    </footer>
  );
}
