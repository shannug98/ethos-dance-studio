import React, { useState } from 'react';
import { Lock, Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar({ onOpenAdmin, onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#333333] h-[76px]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left Nav Links - Open Dedicated Pages in New Tab */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold tracking-tight text-white uppercase">
          
          <a
            href="classes.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors flex items-center gap-1"
          >
            <span>Classes</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a href="#about" className="hover:text-[#D0FBF9] transition-colors">About Ethos</a>
          
          <a
            href="schedule.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors flex items-center gap-1"
          >
            <span>Schedule</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="gallery.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors text-[#FF0044] font-bold flex items-center gap-1"
          >
            <span>Gallery</span>
            <ExternalLink className="w-3 h-3 text-[#FF0044]" />
          </a>

          <a
            href="sangeet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors flex items-center gap-1"
          >
            <span>Sangeet Hub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a href="#workshops" className="hover:text-[#D0FBF9] transition-colors">Workshops</a>

          <a
            href="packages.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors flex items-center gap-1"
          >
            <span>Passes</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="location.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors flex items-center gap-1"
          >
            <span>Location</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

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

          {/* Clean Stylized Ethos Dance Studio Text Logo */}
          <a href="#" className="flex flex-col text-right pl-2 leading-none">
            <span className="font-display-giant text-2xl sm:text-3xl text-white tracking-tighter">
              ETHOS<span className="text-[#FF0044]">.</span>
            </span>
            <span className="text-[8px] font-extrabold uppercase tracking-[3px] text-slate-400">
              DANCE STUDIO
            </span>
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
          
          <a
            href="classes.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between hover:text-[#D0FBF9]"
          >
            <span>Classes</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">About Ethos</a>
          
          <a
            href="schedule.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between hover:text-[#D0FBF9]"
          >
            <span>Schedule</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="gallery.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-[#FF0044] font-bold"
          >
            <span>Gallery</span>
            <ExternalLink className="w-4 h-4 text-[#FF0044]" />
          </a>

          <a
            href="sangeet.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between hover:text-[#D0FBF9]"
          >
            <span>Sangeet Hub</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a href="#workshops" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D0FBF9]">Workshops</a>

          <a
            href="packages.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between hover:text-[#D0FBF9]"
          >
            <span>Passes</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="location.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between hover:text-[#D0FBF9]"
          >
            <span>Location</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

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
