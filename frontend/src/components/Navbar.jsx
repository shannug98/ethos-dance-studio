import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, UserCheck, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import ethosNavbarLogoOfficial from '../assets/ethos_navbar_logo_official.png';

export default function Navbar({ onQuickBook }) {
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
      <header data-header="" className="fixed top-3 md:top-5 left-0 right-0 w-full z-[200] px-4 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-black/90 backdrop-blur-xl border border-white/15 rounded-full p-1.5 sm:p-2 flex items-center justify-between shadow-2xl text-white pointer-events-auto transition-all">
          
          {/* LEFT: "BUY TICKETS" TRANSPARENT TO BLACK GLASS BUTTON */}
          <div className="flex items-center">
            <a
              href="events.html"
              onClick={scrollToWorkshops}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
            >
              BUY TICKETS
            </a>
          </div>

          {/* CENTER: EXACT OFFICIAL EMBLEM LOGO (WHITE CRESCENT + RED E) + "ETHOS DANCE STUDIO" TEXT */}
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

          {/* RIGHT: LOGIN BUTTON + MINIMAL "MENU ☰" BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider text-slate-200">
            
            {/* LOGIN BUTTON DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              {loggedInUser ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full transition-all cursor-pointer text-white"
                >
                  <img
                    src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[11px] font-black">{loggedInUser.name ? loggedInUser.name.split(' ')[0] : 'Member'}</span>
                  <ChevronDown className="w-3 h-3 text-white" />
                </button>
              ) : isAdminLoggedIn ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/50 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              ) : (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-bold cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#090A0F]/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 space-y-2 text-left text-white">
                  {loggedInUser ? (
                    <>
                      <div className="p-2 bg-white/5 rounded-xl flex items-center gap-2">
                        <img src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt="" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-xs font-bold">{loggedInUser.name}</p>
                          <p className="text-[10px] text-slate-400">{loggedInUser.email}</p>
                        </div>
                      </div>
                      <a href="student.html" className="block px-3 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg text-center">
                        Member Dashboard
                      </a>
                      <button onClick={handleLogoutUser} className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-white/5 rounded-lg flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" /> Log Out
                      </button>
                    </>
                  ) : isAdminLoggedIn ? (
                    <>
                      <p className="text-xs font-bold px-2 py-1 text-emerald-400">Authenticated Admin</p>
                      <a href="admin.html" className="block px-3 py-2 text-xs font-bold bg-emerald-500/20 rounded-lg text-center text-emerald-300">
                        Admin Control Center
                      </a>
                      <button onClick={handleLogoutAdmin} className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-white/5 rounded-lg flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" /> Logout Admin
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="student.html" className="block px-3 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg text-center">
                        Member / Student Login
                      </a>
                      <a href="admin.html" className="block px-3 py-2 text-xs font-bold border border-white/20 hover:bg-white/10 rounded-lg text-center">
                        Studio Admin Login
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MINIMAL "MENU ☰" BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white px-3.5 py-2 hover:opacity-80 transition-opacity cursor-pointer shrink-0"
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

      {/* FULL OVERLAY MENU DRAWER (CLEAN MONOCHROME OVERLAY) */}
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
                  Gallery & Lookbook
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
                  Passes & Pricing
                </a>
              </li>
              <li>
                <a
                  href="location.html"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 hover:text-slate-300 transition-colors"
                >
                  Studio Location
                </a>
              </li>
            </ul>

            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="student.html"
                onClick={() => setMenuOpen(false)}
                className="py-4 px-6 bg-white text-slate-950 font-extrabold uppercase rounded-2xl text-xs tracking-wider transition-all shadow-lg block"
              >
                Student / Member Portal
              </a>
              <a
                href="admin.html"
                onClick={() => setMenuOpen(false)}
                className="py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold uppercase rounded-2xl text-xs tracking-wider transition-all block"
              >
                Studio Management (Admin)
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
