import React, { useState, useEffect, useRef } from 'react';
import { Lock, Menu, X, UserCheck, LogOut, Sparkles, ChevronDown, User, ShieldCheck } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function Navbar({ onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
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

        const savedAdmin = localStorage.getItem('ethos_admin_authenticated');
        if (savedAdmin === 'true') {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      } catch {
        setLoggedInUser(null);
        setIsAdminLoggedIn(false);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-[76px] transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <a href="index.html" target="_self" className="flex items-center group">
            <img
              src={ethosPureLogo}
              alt="Ethos Studio Logo"
              className="h-11 sm:h-14 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,0,85,0.4)] group-hover:scale-105 transition-transform"
            />
          </a>
        </div>

        {/* DESKTOP VIEW: CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          
          <a
            href="events.html"
            target="_self"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Events
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

        {/* DESKTOP RIGHT ACTIONS: PERSISTENT LOGIN DROPDOWN */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Direct Member Dashboard Button when Logged In */}
          {loggedInUser && (
            <a
              href="student.html"
              target="_self"
              className="px-4 py-2 bg-[#FF0055] hover:bg-[#D00044] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5 text-white" />
              <span>Member Dashboard</span>
            </a>
          )}

          {/* TOPDOWN DROPDOWN MENU FOR MEMBER & ADMIN LOGINS */}
          <div className="relative" ref={dropdownRef}>
            {loggedInUser ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full transition-all backdrop-blur-md shadow-lg group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={loggedInUser.name}
                    className="w-7 h-7 rounded-full border-2 border-[#FF0055] object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090A0F]" />
                </div>

                <div className="text-left leading-none">
                  <span className="text-[11px] font-black text-white font-syne uppercase tracking-wider block">
                    {loggedInUser.name ? loggedInUser.name.split(' ')[0] : 'Shanmuka'}
                  </span>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : isAdminLoggedIn ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#00DFD8]/10 border border-[#00DFD8]/50 px-3.5 py-1.5 rounded-full transition-all backdrop-blur-md"
              >
                <ShieldCheck className="w-4 h-4 text-[#00DFD8]" />
                <span className="text-xs font-extrabold text-white font-outfit uppercase">
                  Studio Admin
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-[#FF0055] hover:bg-[#D00044] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
              >
                <UserCheck className="w-4 h-4 text-white" />
                <span>Login</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* TOPDOWN DROPDOWN MENU CONTAINER */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#090A0F]/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 space-y-2 animate-fadeIn text-left">
                {loggedInUser ? (
                  <>
                    {/* User Card Header in Dropdown */}
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                      <img
                        src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt=""
                        className="w-10 h-10 rounded-full border-2 border-[#FF0055] object-cover"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-black text-white uppercase font-syne truncate">
                          {loggedInUser.name || 'Shanmuka Gaddam'}
                        </h4>
                        <span className="text-[10px] text-[#00DFD8] font-bold block">
                          {loggedInUser.classesLeft || 8} Classes Remaining
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <a
                        href="student.html"
                        target="_self"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-bold text-white transition-colors"
                      >
                        <User className="w-4 h-4 text-[#00DFD8]" />
                        <span>Member Dashboard</span>
                      </a>

                      <a
                        href="student.html#attendance"
                        target="_self"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-bold text-white transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <span>Classes & Attendance ({loggedInUser.classesLeft || 8} Left)</span>
                      </a>

                      <button
                        onClick={() => { setDropdownOpen(false); handleLogoutUser(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FF0055]/20 text-xs font-bold text-[#FF0055] transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out Member</span>
                      </button>
                    </div>
                  </>
                ) : null}

                {isAdminLoggedIn ? (
                  <>
                    <a
                      href="admin.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-bold text-[#00DFD8] transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#00DFD8]" />
                      <span>Admin Management Console</span>
                    </a>

                    <button
                      onClick={() => { setDropdownOpen(false); handleLogoutAdmin(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FF0055]/20 text-xs font-bold text-[#FF0055] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out Admin</span>
                    </button>
                  </>
                ) : null}

                {!loggedInUser && !isAdminLoggedIn ? (
                  <>
                    <a
                      href="student.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-[#FF0055]/20 text-xs font-extrabold text-white transition-colors border-b border-white/5 group"
                    >
                      <UserCheck className="w-4.5 h-4.5 text-[#FF0055] group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block font-outfit uppercase">Student & Member Login</span>
                        <span className="text-[10px] text-slate-400 font-normal">Attendance, Passes & Schedule</span>
                      </div>
                    </a>

                    <a
                      href="admin.html"
                      target="_self"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-[#00DFD8]/20 text-xs font-extrabold text-white transition-colors group"
                    >
                      <ShieldCheck className="w-4.5 h-4.5 text-[#00DFD8] group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block font-outfit uppercase">Studio Management</span>
                        <span className="text-[10px] text-slate-400 font-normal">Admin & Staff Console</span>
                      </div>
                    </a>
                  </>
                ) : null}
              </div>
            )}
          </div>

        </div>

        {/* MOBILE VIEW: HAMBURGER ICON */}
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

      {/* MOBILE DRAWER */}
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
            {loggedInUser ? (
              <div className="space-y-2">
                <a
                  href="student.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-[#7928CA]/50 rounded-2xl text-white font-bold"
                >
                  <img src={loggedInUser.profilePic} alt="" className="w-8 h-8 rounded-full border border-[#FF0055] object-cover" />
                  <span>{loggedInUser.name} (Member Dashboard)</span>
                </a>

                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogoutUser(); }}
                  className="w-full py-3 bg-[#FF0055] text-xs font-extrabold text-white uppercase text-center block rounded-2xl shadow-lg"
                >
                  Log Out Member
                </button>
              </div>
            ) : isAdminLoggedIn ? (
              <div className="space-y-2">
                <a
                  href="admin.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-[#00DFD8]/50 rounded-2xl text-white font-bold"
                >
                  <ShieldCheck className="w-6 h-6 text-[#00DFD8]" />
                  <span>Studio Management (Admin)</span>
                </a>

                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogoutAdmin(); }}
                  className="w-full py-3 bg-[#FF0055] text-xs font-extrabold text-white uppercase text-center block rounded-2xl shadow-lg"
                >
                  Log Out Admin
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
                  Student & Member Login
                </a>

                <a
                  href="admin.html"
                  target="_self"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 btn-glass text-xs font-bold text-white uppercase text-center block rounded-2xl"
                >
                  Studio Management (Admin)
                </a>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
