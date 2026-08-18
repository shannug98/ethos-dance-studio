import React, { useState, useEffect } from 'react';
import { Lock, Menu, X, UserCheck, LogOut } from 'lucide-react';

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

  // If user is logged in: links navigate in SAME TAB (_self). If guest: links open in NEW TAB (_blank)
  const linkTarget = loggedInUser ? '_self' : '_blank';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#333333] h-[76px]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left Nav Links - Dynamic target (_self when logged in, _blank when guest) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold tracking-tight text-white uppercase">
          
          <a
            href="events.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors font-bold text-[#FF0044]"
          >
            Events
          </a>

          <a
            href="schedule.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Passes
          </a>

          <a
            href="location.html"
            target={linkTarget}
            rel="noopener noreferrer"
            className="hover:text-[#D0FBF9] transition-colors"
          >
            Location
          </a>

        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-3 ml-auto">
          
          <button
            onClick={() => onQuickBook && onQuickBook({ id: 99, title: 'Ethos Studio All-Access Pass', price: 699, type: 'Pass' })}
            className="btn-cyan text-xs py-2 px-3 sm:py-2.5 sm:px-4 font-bold uppercase tracking-wider hidden sm:inline-flex"
          >
            Reserve Spot
          </button>

          {/* IF USER IS LOGGED IN: MEMBER & ADMIN BUTTONS GONE! SHOW STUDENT PROFILE PIC & NAME */}
          {loggedInUser ? (
            <div className="flex items-center gap-3 bg-[#111111] border border-[#1F41FF] px-3 py-1.5 rounded-full shadow-lg">
              <a href="student.html" target="_self" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
                <img
                  src={loggedInUser.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={loggedInUser.name}
                  className="w-8 h-8 rounded-full border border-[#FF0044] object-cover shrink-0"
                />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-black text-white uppercase font-display tracking-tight">
                    {loggedInUser.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#D0FBF9] uppercase tracking-wider">
                    Portal Active ({loggedInUser.classesLeft || 8} Left)
                  </span>
                </div>
              </a>

              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-[#FF0044] transition-colors ml-1"
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
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#1F41FF] hover:bg-[#3b5cff] text-xs font-bold text-white flex items-center gap-1.5 transition-all rounded-sm shadow-md"
                title="Monthly Package Student & Parent Login Portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D0FBF9]" />
                <span className="hidden sm:inline">Member Login</span>
                <span className="sm:hidden">Portal</span>
              </a>

              <a
                href="admin.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#262626] text-xs font-semibold text-white border border-[#404040] flex items-center gap-1.5 transition-all"
                title="Admin Login Portal"
              >
                <Lock className="w-3.5 h-3.5 text-[#D900FF]" />
                <span className="hidden sm:inline">Admin</span>
              </a>
            </>
          )}

          {/* Clean Stylized Ethos Dance Studio Text Logo -> Navigates to index.html */}
          <a href="index.html" target={linkTarget} className="flex flex-col text-right pl-2 leading-none">
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
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FF0044] font-bold"
          >
            Events
          </a>

          <a
            href="schedule.html"
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Schedule
          </a>

          <a
            href="gallery.html"
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Gallery
          </a>

          <a
            href="sangeet.html"
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Sangeet Hub
          </a>

          <a
            href="packages.html"
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Passes
          </a>

          <a
            href="location.html"
            target={linkTarget}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#D0FBF9]"
          >
            Location
          </a>

          {loggedInUser ? (
            <div className="pt-4 border-t border-[#333333] space-y-3">
              <a
                href="student.html"
                target="_self"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 bg-[#1F41FF]/20 border border-[#1F41FF] rounded-xl text-white font-bold"
              >
                <img src={loggedInUser.profilePic} alt="" className="w-8 h-8 rounded-full border border-[#FF0044] object-cover" />
                <span>{loggedInUser.name} (Member Portal)</span>
              </a>

              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full py-3 bg-[#FF0044] text-xs font-bold text-white uppercase text-center block rounded-xl"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <a
                href="student.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#1F41FF] text-xs font-bold text-white uppercase text-center block"
              >
                Member Portal Login
              </a>

              <a
                href="admin.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#1A1A1A] text-xs font-bold text-white uppercase text-center block border border-[#404040]"
              >
                Admin Portal Login
              </a>
            </>
          )}

        </div>
      )}
    </nav>
  );
}
