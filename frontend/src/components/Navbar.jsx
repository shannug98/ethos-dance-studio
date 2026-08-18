import React, { useState } from 'react';
import { Lock, Menu, X } from 'lucide-react';
import { LOGO_DARK_BASE64 } from '../assets/logoBase64';

export default function Navbar({ onOpenAdmin, onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#333333] h-[76px]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight text-white uppercase">
          <a href="#classes" className="hover:text-[#D0FBF9] transition-colors">Classes</a>
          <a href="#about" className="hover:text-[#D0FBF9] transition-colors">About Ethos</a>
          <a href="#schedule" className="hover:text-[#D0FBF9] transition-colors">Schedule</a>
          <a href="#sangeet" className="hover:text-[#D0FBF9] transition-colors">Sangeet Hub</a>
          <a href="#workshops" className="hover:text-[#D0FBF9] transition-colors">Workshops</a>
          <a href="#contact" className="hover:text-[#D0FBF9] transition-colors">Location</a>
        </div>

        {/* Right Brand Text & Actions */}
        <div className="flex items-center gap-4 ml-auto">
          
          <button
            onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
            className="btn-cyan text-xs py-2.5 px-4 font-bold uppercase tracking-wider hidden sm:inline-flex"
          >
            Reserve Spot
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#262626] text-xs font-semibold text-white border border-[#404040] flex items-center gap-1.5 transition-all"
            title="Admin Login Portal"
          >
            <Lock className="w-3.5 h-3.5 text-[#D900FF]" />
            <span>Admin</span>
          </button>

          {/* Official Ethos Brand Logo Image */}
          <a href="#" className="flex items-center pl-2">
            <div className="h-12 w-auto shrink-0">
              <img
                src={LOGO_DARK_BASE64}
                alt="Ethos Dance Studio Logo"
                className="h-full w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,0,68,0.7)]"
              />
            </div>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#000000] border-b border-[#333333] px-6 py-6 space-y-4 font-semibold text-base text-white">
          <a href="#classes" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Classes</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">About Ethos</a>
          <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Schedule</a>
          <a href="#sangeet" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Sangeet Hub</a>
          <a href="#workshops" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Workshops</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Location</a>
          <button
            onClick={() => { setMobileMenuOpen(false); onQuickBook && onQuickBook({ id: 99, title: 'Ethos Pass', price: 699 }); }}
            className="w-full btn-cyan text-xs py-3 text-center uppercase tracking-wider block"
          >
            Reserve Spot
          </button>
        </div>
      )}
    </nav>
  );
}
