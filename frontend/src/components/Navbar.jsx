import React, { useState } from 'react';
import { Lock, Menu, X, UserCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin, onOpenStudentPortal, onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#333333] h-[76px]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left Nav Links - Clean links opening dedicated pages in new tabs */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold tracking-tight text-white uppercase">
          
          <a
            href="events.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors font-bold text-[#FF0044]"
          >
            Events
          </a>

          <a
            href="schedule.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Passes
          </a>

          <a
            href="location.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Location
          </a>

        </div>

        {/* Right Brand Text & Actions */}
        <div className="flex items-center gap-3 ml-auto">
          
          <button
            onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
            className="btn-cyan text-xs py-2 px-3 sm:py-2.5 sm:px-4 font-bold uppercase tracking-wider hidden sm:inline-flex"
          >
            Reserve Spot
          </button>

          {/* Student & Parent Member Portal Login */}
          <button
            onClick={onOpenStudentPortal}
            className="px-3 py-2 bg-[#1F41FF] hover:bg-[#3b5cff] text-xs font-bold text-white flex items-center gap-1.5 transition-all rounded-sm shadow-md"
            title="Monthly Package Student & Parent Login Portal"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#D0FBF9]" />
            <span className="hidden sm:inline">Member Login</span>
            <span className="sm:hidden">Portal</span>
          </button>

          {/* Admin Login */}
          <button
            onClick={onOpenAdmin}
            className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#262626] text-xs font-semibold text-white border border-[#404040] flex items-center gap-1.5 transition-all"
            title="Admin Login Portal"
          >
            <Lock className="w-3.5 h-3.5 text-[#D900FF]" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Clean Stylized Ethos Dance Studio Text Logo -> Navigates to index.html */}
          <a href="index.html" className="flex flex-col text-right pl-2 leading-none">
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
            href="events.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FF0044] font-bold"
          >
            Events
          </a>

          <a
            href="schedule.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Passes
          </a>

          <a
            href="location.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Location
          </a>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenStudentPortal && onOpenStudentPortal(); }}
            className="w-full py-3 bg-[#1F41FF] text-xs font-bold text-white uppercase text-center block"
          >
            Member Portal Login
          </button>
        </div>
      )}
    </nav>
  );
}
