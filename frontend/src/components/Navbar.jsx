import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, UserCheck, LogOut, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';
import ethosNavbarLogoOfficial from '../assets/ethos_navbar_logo_official.png';

export default function Navbar({ onQuickBook, onOpenAdmin, onOpenStudentPortal, onOpenTrainers }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const savedUser = localStorage.getItem('ethos_logged_in_user');
        if (savedUser) setLoggedInUser(JSON.parse(savedUser));
        else setLoggedInUser(null);

        const savedAdmin = localStorage.getItem('ethos_admin_authenticated');
        if (savedAdmin === 'true') setIsAdminLoggedIn(true);
        else setIsAdminLoggedIn(false);
      } catch {
        setLoggedInUser(null);
        setIsAdminLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutUser = () => {
    localStorage.removeItem('ethos_logged_in_user');
    setLoggedInUser(null);
    window.location.reload();
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('ethos_admin_authenticated');
    setIsAdminLoggedIn(false);
    window.location.reload();
  };

  const scrollToWorkshops = (e) => {
    const el = document.getElementById('workshops');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 🌟 TRANSPARENT TO BLACK PLANETARIUM DENMARK FLOATING HEADER BAR 🌟 */}
      <header data-header="" className="fixed top-3 md:top-5 left-0 right-0 w-full z-[200] px-4 pointer-events-none print:hidden">
        <div className="max-w-5xl mx-auto bg-black/90 backdrop-blur-xl border border-white/15 rounded-full p-1.5 sm:p-2 flex items-center justify-between shadow-2xl text-white pointer-events-auto transition-all">
          
          {/* LEFT: "BUY TICKETS" GLASS BUTTON */}
          <div className="flex items-center">
            <a
              href="events.html"
              onClick={scrollToWorkshops}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
            >
              BUY TICKETS
            </a>
          </div>

          {/* CENTER: OFFICIAL EMBLEM LOGO + "ETHOS DANCE STUDIO" */}
          <a
            href="index.html"
            target="_self"
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-90 transition-opacity mx-auto group cursor-pointer"
          >
            <img
              src={ethosNavbarLogoOfficial}
              alt="ETHOS Official Logo Emblem"
              className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-syne font-black text-xs sm:text-base tracking-wider uppercase text-white">
              ETHOS DANCE STUDIO
            </span>
          </a>

          {/* RIGHT: MINIMAL "MENU ☰" BUTTON (CLEAN & UNCLUTTERED) */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider text-slate-200">
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white px-4 py-2 hover:bg-white/10 rounded-full transition-all cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
              {menuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <span className="w-3.5 flex flex-col gap-y-0.5">
                  <span className="w-full h-[1.5px] bg-white block"></span>
                  <span className="w-full h-[1.5px] bg-white block"></span>
                  <span className="w-full h-[1.5px] bg-white block"></span>
                </span>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* FULL OVERLAY MENU DRAWER WITH "WANT TO REGISTER AS TRAINER?" */}
      {menuOpen && (
        <div className="fixed inset-0 z-[190] bg-[#090A0F]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fadeIn">
          <div className="max-w-2xl w-full text-center space-y-6 pt-12">
            
            <ul className="space-y-4 font-black uppercase font-syne text-xl sm:text-2xl tracking-widest text-white">
              <li>
                <a
                  href="events.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors border-b border-white/10"
                >
                  Events &amp; Masterclasses
                </a>
              </li>
              <li>
                <a
                  href="gallery.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors border-b border-white/10"
                >
                  Gallery &amp; Lookbook
                </a>
              </li>
              <li>
                <a
                  href="sangeet.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors border-b border-white/10"
                >
                  Sangeet Hub
                </a>
              </li>
              <li>
                <a
                  href="packages.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors border-b border-white/10"
                >
                  Passes &amp; Pricing
                </a>
              </li>
              <li>
                <a
                  href="location.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors border-b border-white/10"
                >
                  Studio Location
                </a>
              </li>

              {/* 🕺 PROMINENT "WANT TO REGISTER AS TRAINER?" OPTION */}
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenTrainers();
                  }}
                  className="w-full py-3.5 my-2 bg-[#0088FF] hover:bg-[#0077EE] text-white rounded-2xl transition-all font-black text-lg tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#0088FF]/30 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Want to register as Trainer? 🕺</span>
                </button>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href="student.html"
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold tracking-wider uppercase border border-white/10 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-[#0088FF]" /> Member / Student Login
              </a>

              <a
                href="admin.html"
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-bold tracking-wider uppercase border border-white/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Studio Admin Portal
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
