import React, { useState, useEffect } from 'react';
import { Lock, Menu, X, UserCheck, LogOut, Sparkles } from 'lucide-react';

export default function Navbar({ onQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem('ethos_logged_in_user');
    setLoggedInUser(null);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-[78px] transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left Nav Links - Glass Pill Navigation */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          
          <a
            href="events.html"
            target="_self"
            className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#FF0055] hover:bg-white/10 rounded-full transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#FF0055]" />
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

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-3 ml-auto">
          
          <button
            onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
            className="btn-cyan text-xs py-2.5 px-5 font-extrabold uppercase tracking-wider hidden sm:inline-flex shadow-lg"
          >
            Reserve Spot
          </button>

          {/* IF USER IS LOGGED IN: SHOW STUDENT PROFILE PIC & NAME */}
          {loggedInUser ? (
            <div className="flex items-center gap-3 bg-white/5 border border-[#7928CA]/50 px-3.5 py-1.5 rounded-full shadow-xl backdrop-blur-md">
              <a href="student.html" target="_self" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity">
                <img
                  src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={loggedInUser.name}
                  className="w-8 h-8 rounded-full border-2 border-[#FF0055] object-cover shrink-0"
                />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-extrabold text-white uppercase font-outfit tracking-tight">
                    {loggedInUser.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#00DFD8] uppercase tracking-wider mt-0.5">
                    Active ({loggedInUser.classesLeft || 8} Left)
                  </span>
                </div>
              </a>

              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-[#FF0055] transition-colors ml-1"
                title="Log Out of Member Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* IF NOT LOGGED IN: SHOW MEMBER LOGIN & ADMIN BUTTONS */
            <>
              <a
                href="student.html"
                target="_self"
                className="btn-glow-primary px-4 py-2.5 text-xs font-extrabold uppercase flex items-center gap-1.5 transition-all shadow-lg"
                title="Monthly Package Student & Parent Login Portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Member Login</span>
                <span className="sm:hidden">Portal</span>
              </a>

              <a
                href="admin.html"
                target="_self"
                className="btn-glass px-3.5 py-2.5 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                title="Admin Login Portal"
              >
                <Lock className="w-3.5 h-3.5 text-[#00DFD8]" />
                <span className="hidden sm:inline">Admin</span>
              </a>
            </>
          )}

          {/* Clean Stylized Ethos Dance Studio Text Logo */}
          <a href="index.html" target="_self" className="flex flex-col text-right pl-2 leading-none group">
            <span className="font-display-giant text-2xl sm:text-3xl text-white tracking-tighter group-hover:text-[#FF0055] transition-colors">
              ETHOS<span className="text-[#FF0055]">.</span>
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
        <div className="md:hidden bg-[#090A0F]/95 border-b border-white/10 backdrop-blur-xl px-6 py-6 space-y-4 font-semibold text-base text-white">
          
          <a
            href="events.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FF0055] font-extrabold"
          >
            Events
          </a>

          <a
            href="schedule.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8]"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8]"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8]"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8]"
          >
            Passes
          </a>

          <a
            href="location.html"
            target="_self"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#00DFD8]"
          >
            Location
          </a>

          {loggedInUser ? (
            <div className="pt-4 border-t border-white/10 space-y-3">
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
            <div className="space-y-3 pt-2">
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
      )}
    </nav>
  );
}
