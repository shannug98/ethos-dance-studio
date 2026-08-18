import React, { useState, useEffect, useRef } from 'react';
import { Lock, Menu, X, UserCheck, LogOut, Sparkles, ChevronDown, User } from 'lucide-react';
import ethosSymbol from '../assets/ethos_symbol_transparent.png';

export default function Navbar({ onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const savedUser = localStorage.getItem('ethos_logged_in_user');
        if (savedUser) {
          setLoggedInUser(JSON.parse(savedUser));
        } else {
          setLoggedInUser(null);
        }
      } catch {
        setLoggedInUser(null);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ethos_logged_in_user');
    setLoggedInUser(null);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-[76px] transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* LOGO SECTION: SYMBOL EMBLEM & ETHOS DANCE STUDIO SIDE-BY-SIDE (TRANSPARENT BG MATCHING WEBPAGE) */}
        <div className="flex items-center gap-3">
          <a href="index.html" target="_self" className="flex items-center gap-3 group">
            
            {/* Transparent Pixel-Perfect Ethos Circular Emblem */}
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <img
                src={ethosSymbol}
                alt="Ethos Dance Studio Symbol"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,0,85,0.4)] group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Side-by-Side Text Typography */}
            <div className="flex flex-col text-left leading-none">
              <span className="font-display-giant text-2xl sm:text-3xl text-white tracking-tighter group-hover:text-[#FF0055] transition-colors">
                ETHOS<span className="text-[#FF0055]">.</span>
              </span>
              <span className="text-[8px] font-extrabold uppercase tracking-[3px] text-slate-400">
                DANCE STUDIO
              </span>
            </div>

          </a>
        </div>

        {/* DESKTOP VIEW: CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          
          <a
            href="events.html"
            target="_self"
            className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#FF0055] hover:bg-white/10 rounded-full transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF0055]" />
            <span>Events</span>
          </a>

          <a
            href="schedule.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Passes
          </a>

          <a
            href="location.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Location
          </a>

        </div>

        {/* DESKTOP RIGHT ACTIONS: RESERVE BUTTON + TOPDOWN DROPDOWN MENU */}
        <div className="hidden md:flex items-center gap-3">
          
          <button
            onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
            className="btn-cyan text-xs py-2.5 px-5 font-extrabold uppercase tracking-wider shadow-lg"
          >
            Reserve Spot
          </button>

          {/* TOPDOWN DROPDOWN MENU FOR MEMBER & ADMIN PORTALS */}
          <div className="relative" ref={dropdownRef}>
            {loggedInUser ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-[#7928CA]/50 px-3.5 py-1.5 rounded-full transition-all backdrop-blur-md"
              >
                <img
                  src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={loggedInUser.name}
                  className="w-7 h-7 rounded-full border-2 border-[#FF0055] object-cover shrink-0"
                />
                <span className="text-xs font-extrabold text-white font-outfit uppercase">
                  {loggedInUser.name.split(' ')[0]}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn-glow-primary px-4 py-2.5 text-xs font-extrabold uppercase flex items-center gap-1.5 transition-all shadow-lg"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span>Portal Access</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* TOPDOWN DROPDOWN MENU CONTAINER */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#090A0F]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl p-2 z-50 space-y-1 animate-fadeIn">
                {loggedInUser ? (
                  <>
                    <a
                      href="student.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-bold text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-[#00DFD8]" />
                      <span>Member Dashboard ({loggedInUser.classesLeft || 8} Left)</span>
                    </a>

                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FF0055]/20 text-xs font-bold text-[#FF0055] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="student.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl hover:bg-[#FF0055]/20 text-xs font-extrabold text-white transition-colors border-b border-white/5"
                    >
                      <UserCheck className="w-4 h-4 text-[#FF0055]" />
                      <div>
                        <span className="block font-outfit uppercase">Member Portal</span>
                        <span className="text-[10px] text-slate-400 font-normal">Student & Parent Login</span>
                      </div>
                    </a>

                    <a
                      href="admin.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl hover:bg-[#00DFD8]/20 text-xs font-extrabold text-white transition-colors"
                    >
                      <Lock className="w-4 h-4 text-[#00DFD8]" />
                      <div>
                        <span className="block font-outfit uppercase">Admin Portal</span>
                        <span className="text-[10px] text-slate-400 font-normal">Studio Management</span>
                      </div>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* MOBILE VIEW: RIGHT THREE LINES (HAMBURGER ICON) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-white bg-white/5 border border-white/10 rounded-xl active:scale-95 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF0055]" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER: SLIDES DOWN DISPLAYING ALL CONTENT */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0F]/95 border-b border-white/15 backdrop-blur-2xl px-6 py-6 space-y-4 font-semibold text-base text-white animate-fadeIn">
          
          <a
            href="events.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FF0055] font-extrabold uppercase tracking-wider text-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Events & Masterclasses</span>
          </a>

          <a
            href="schedule.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8] text-sm uppercase font-bold"
          >
            Class Schedule
          </a>

          <a
            href="gallery.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8] text-sm uppercase font-bold"
          >
            Photo Gallery
          </a>

          <a
            href="sangeet.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8] text-sm uppercase font-bold"
          >
            Wedding Sangeet Hub
          </a>

          <a
            href="packages.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8] text-sm uppercase font-bold"
          >
            Passes & Pricing
          </a>

          <a
            href="location.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8] text-sm uppercase font-bold"
          >
            Studio Location
          </a>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onQuickBook) onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' });
              }}
              className="btn-cyan w-full text-xs py-3.5 font-extrabold uppercase tracking-wider text-center block rounded-2xl shadow-lg"
            >
              Reserve Spot Now
            </button>

            {loggedInUser ? (
              <div className="space-y-2">
                <a
                  href="student.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-[#7928CA]/50 rounded-2xl text-white font-bold"
                >
                  <img src={loggedInUser.profilePic} alt="" className="w-8 h-8 rounded-full border border-[#FF0055] object-cover" />
                  <span>{loggedInUser.name} (Member Portal)</span>
                </a>

                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="w-full py-3 bg-[#FF0055] text-xs font-extrabold text-white uppercase text-center block rounded-2xl shadow-lg"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <a
                  href="student.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 btn-glow-primary text-xs font-extrabold text-white uppercase text-center block rounded-2xl shadow-lg"
                >
                  Member Portal Login
                </a>

                <a
                  href="admin.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 btn-glass text-xs font-bold text-white uppercase text-center block rounded-2xl"
                >
                  Admin Portal Login
                </a>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
