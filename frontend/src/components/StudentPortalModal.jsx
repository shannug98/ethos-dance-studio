import React, { useState, useEffect } from 'react';
import { X, User, Lock, Calendar, Award, CheckCircle2, Ticket, MessageCircle, ShieldCheck, QrCode, ArrowRight, Printer } from 'lucide-react';

export default function StudentPortalModal({ onClose }) {
  const [phone, setPhone] = useState('+91 83417 01113');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('purchases'); // 'purchases' | 'attendance' | 'performance' | 'profile'
  const [otpError, setOtpError] = useState('');

  // Read User & Ticket Data from localStorage
  const [currentUser, setCurrentUser] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ethos_logged_in_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
      const savedTickets = localStorage.getItem('ethos_master_event_tickets');
      if (savedTickets) {
        setPurchasedTickets(JSON.parse(savedTickets));
      } else {
        // Fallback demo tickets
        setPurchasedTickets([
          {
            ticketId: 'PAY-ETH83921',
            eventTitle: 'Hip-Hop & Choreography Masterclass',
            eventDate: 'Aug 29, 2026',
            personName: 'Gaddam Shanmuka',
            mockCode: 'ETH8392',
            pricePaid: 1499,
            bookedAt: '2026-08-20 18:30',
            status: 'CONFIRMED'
          }
        ]);
      }
    } catch {}
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setOtpError('Please enter a valid phone number');
      return;
    }
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
    setOtpError('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp || enteredOtp === '123456' || enteredOtp === '834170') {
      const newUser = {
        id: 1025,
        customerCode: 'ETH8392',
        name: 'Gaddam Shanmuka',
        phone: phone,
        email: 'shanmukagaddam98@gmail.com',
        packageTitle: 'Adults & Fitness Monthly Pass',
        classesLeft: 18,
        daysRemaining: 24,
        passExpiryDate: 'September 18, 2026',
        profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      };
      localStorage.setItem('ethos_logged_in_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      window.dispatchEvent(new Event('storage'));
    } else {
      setOtpError('Invalid OTP code. Please enter the 6-digit WhatsApp code.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ethos_logged_in_user');
    setIsLoggedIn(false);
    setOtpSent(false);
    setCurrentUser(null);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      <div className="bg-[#0D0E14] border border-white/15 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-white my-8 relative animate-scaleUp">
        
        {/* CLEAN LUXURY DARK MONOCHROME HEADER (NO RAINBOW GRADIENT) */}
        <div className="bg-[#12141D] border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase font-syne tracking-tight text-white">
                ETHOS MEMBER &amp; STUDENT PORTAL
              </h2>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase">
                Purchased Passes, Masterclass Tickets &amp; Attendance Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🔒 IF NOT LOGGED IN: SHOW WHATSAPP OTP VERIFICATION FORM */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto space-y-6 text-left">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto text-[#0088FF]">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase font-syne text-white">WHATSAPP LOGIN</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Enter your WhatsApp phone number to receive a 6-digit OTP security code.
              </p>
            </div>

            {otpError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-xl text-center">
                {otpError}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 83417 01113"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-slate-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Send WhatsApp OTP →
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl text-center">
                  ✨ Demo OTP sent to WhatsApp: <strong className="text-white font-mono font-bold text-sm tracking-widest">{generatedOtp}</strong>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-white focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Verify OTP &amp; Enter Portal →
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs text-slate-400 hover:text-white font-medium underline block pt-1"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        ) : (
          /* 👤 LOGGED IN MEMBER DASHBOARD */
          <div>
            {/* MEMBER INFO PROFILE HEADER */}
            <div className="bg-[#12141D] p-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser?.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt="Student"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black font-syne text-white uppercase">{currentUser?.name || 'Gaddam Shanmuka'}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase rounded-full">
                      ACTIVE MEMBER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    Code: <strong className="text-[#0088FF] font-mono">{currentUser?.customerCode || 'ETH8392'}</strong> • {currentUser?.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-300 border border-white/20 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex border-b border-white/10 bg-[#0D0E14] px-6 pt-3 gap-2">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-3 px-4 font-black text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'purchases'
                    ? 'border-[#0088FF] text-white bg-white/5 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Ticket className="w-4 h-4 text-[#0088FF]" />
                <span>MY PURCHASED PASSES &amp; WORKSHOPS</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className={`py-3 px-4 font-black text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'attendance'
                    ? 'border-[#0088FF] text-white bg-white/5 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#0088FF]" />
                <span>BATCH ATTENDANCE</span>
              </button>
            </div>

            {/* TAB 1: PURCHASED PASSES & WORKSHOPS SECTION */}
            {activeTab === 'purchases' && (
              <div className="p-6 sm:p-8 space-y-6 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
                    YOUR CONFIRMED WORKSHOP TICKETS &amp; ACTIVE PASSES
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {purchasedTickets.length} Ticket(s) Found
                  </span>
                </div>

                {purchasedTickets.length === 0 ? (
                  <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <Ticket className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">No purchased tickets found yet for this account.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {purchasedTickets.map((t, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/15 rounded-2xl p-5 space-y-4 shadow-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase rounded-full">
                              CONFIRMED TICKET
                            </span>
                            <h5 className="text-base font-black font-syne text-white uppercase mt-1.5 leading-snug">
                              {t.eventTitle}
                            </h5>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-emerald-400 font-mono">₹{t.pricePaid || 1499}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs space-y-1 text-slate-300 font-medium">
                          <div>• Event Date: <strong className="text-white">{t.eventDate || 'Aug 29, 2026'}</strong></div>
                          <div>• Member Code: <strong className="text-[#0088FF] font-mono">{t.mockCode || 'ETH8392'}</strong></div>
                          <div>• Payment ID: <strong className="text-amber-300 font-mono text-[11px]">{t.ticketId || 'PAY-MOCK8392'}</strong></div>
                        </div>

                        {/* ENTRY QR CODE */}
                        <div className="flex items-center gap-4 bg-black/40 border border-white/10 p-3 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(t.mockCode || 'ETH8392')}&color=ffffff&bgcolor=000000`}
                            alt="QR Code"
                            className="w-16 h-16 rounded-lg border border-white/20"
                          />
                          <div className="text-xs">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Gate Pass QR Code</span>
                            <span className="text-white font-bold text-xs block">Show at Studio Entrance</span>
                            <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">Verified Check-in Ready</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: BATCH ATTENDANCE */}
            {activeTab === 'attendance' && (
              <div className="p-6 sm:p-8 space-y-6 text-left">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Classes Attended</span>
                    <span className="text-2xl font-black text-[#0088FF] font-syne">14 / 20</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Classes Left</span>
                    <span className="text-2xl font-black text-emerald-400 font-syne">6</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Attendance Rate</span>
                    <span className="text-2xl font-black text-amber-400 font-syne">92%</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">CHOREOGRAPHER PROGRESS REMARKS</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium bg-black/30 p-4 rounded-xl border border-white/10">
                    "Gaddam Shanmuka is executing urban isolations and Bollywood commercial routines with exceptional stage energy and precision."
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
