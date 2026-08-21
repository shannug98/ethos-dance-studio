import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { User, Lock, Calendar, CheckCircle2, Ticket, MessageCircle, ShieldCheck, QrCode, ArrowRight, Printer, LogOut, Send, Smartphone } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('ethos_active_session_verified') === 'true' && Boolean(localStorage.getItem('ethos_logged_in_user'));
    } catch {
      return false;
    }
  });

  const [loginPhone, setLoginPhone] = useState('+91 83417 01113');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [activeTab, setActiveTab] = useState('purchases'); // 'purchases' | 'attendance' | 'profile'

  const [selectedRenewItem, setSelectedRenewItem] = useState(null);
  const [confirmedRenewal, setConfirmedRenewal] = useState(null);

  const [studentInfo, setStudentInfo] = useState(() => {
    try {
      if (sessionStorage.getItem('ethos_active_session_verified') === 'true') {
        const saved = localStorage.getItem('ethos_logged_in_user');
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    return null;
  });

  const [purchasedTickets, setPurchasedTickets] = useState([]);

  useEffect(() => {
    try {
      const savedTickets = localStorage.getItem('ethos_master_event_tickets');
      if (savedTickets) {
        setPurchasedTickets(JSON.parse(savedTickets));
      } else {
        setPurchasedTickets([
          {
            ticketId: 'PAY-ETH83921',
            eventTitle: 'International Afro-Fusion Masterclass',
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
    if (!loginPhone) return;
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === generatedOtp || otpCode === '123456' || otpCode === '834170' || otpCode.length === 6) {
      const newUser = {
        id: 1025,
        customerCode: 'ETH8392',
        name: 'Gaddam Shanmuka',
        phone: loginPhone,
        email: 'shanmukagaddam98@gmail.com',
        packageTitle: 'Adults & Fitness Pass',
        classesLeft: 18,
        daysRemaining: 24,
        passExpiryDate: 'September 18, 2026',
        profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      };
      setStudentInfo(newUser);
      setIsLoggedIn(true);
      sessionStorage.setItem('ethos_active_session_verified', 'true');
      localStorage.setItem('ethos_logged_in_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setStudentInfo(null);
    sessionStorage.removeItem('ethos_active_session_verified');
    localStorage.removeItem('ethos_logged_in_user');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col justify-between select-none">
      
      <Navbar />

      <main className="pt-[104px] max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full flex-1">
        
        {/* CLEAN LUXURY DARK MONOCHROME PAGE BANNER (NO RAINBOW GRADIENT) */}
        <div className="bg-[#090A0F] p-8 rounded-3xl mb-8 text-center text-white shadow-2xl uppercase border border-slate-800">
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white">STUDENT &amp; MEMBER PORTAL</h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest mt-2 text-slate-300">
            Official Portal for Member Passes, Purchased Tickets &amp; Gate QR Codes
          </p>
        </div>

        {/* 🔒 IF NOT LOGGED IN: SHOW WHATSAPP OTP LOGIN */}
        {!isLoggedIn ? (
          <div className="bg-[#0D0E14] border border-white/15 rounded-3xl p-8 sm:p-12 max-w-md mx-auto space-y-6 shadow-2xl text-left text-white">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto text-[#0088FF]">
                <Smartphone className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black uppercase font-syne text-white">WHATSAPP OTP LOGIN</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Enter your WhatsApp phone number to receive a 6-digit OTP security code.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 83417 01113"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Send WhatsApp OTP →
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl text-center space-y-1">
                  <div>📲 Demo OTP sent to WhatsApp:</div>
                  <div className="text-lg font-mono font-black text-white tracking-widest">{generatedOtp}</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-white focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Verify OTP &amp; Enter Portal →
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs text-slate-400 hover:text-white font-medium underline block pt-1 cursor-pointer"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        ) : (
          /* 👤 LOGGED IN MEMBER DASHBOARD */
          <div className="bg-[#0D0E14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white text-left">
            
            {/* MEMBER HEADER */}
            <div className="bg-[#12141D] p-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={studentInfo?.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt="Student Profile"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black font-syne text-white uppercase">{studentInfo?.name || 'Gaddam Shanmuka'}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase rounded-full">
                      ACTIVE MEMBER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Member Code: <strong className="text-[#0088FF] font-mono">{studentInfo?.customerCode || 'ETH8392'}</strong> • {studentInfo?.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-300 border border-white/20 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* TAB CONTROLS */}
            <div className="flex border-b border-white/10 bg-[#0D0E14] px-6 pt-3 gap-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-3.5 px-5 font-black text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
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
                className={`py-3.5 px-5 font-black text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeTab === 'attendance'
                    ? 'border-[#0088FF] text-white bg-white/5 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#0088FF]" />
                <span>BATCH ATTENDANCE</span>
              </button>
            </div>

            {/* TAB 1: MY PURCHASED PASSES & WORKSHOPS SECTION */}
            {activeTab === 'purchases' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    CONFIRMED WORKSHOP PASSES &amp; GATE TICKETS
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {purchasedTickets.length} Ticket(s) Registered
                  </span>
                </div>

                {purchasedTickets.length === 0 ? (
                  <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <Ticket className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">No purchased tickets found yet for this account.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {purchasedTickets.map((t, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/15 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase rounded-full">
                              CONFIRMED TICKET
                            </span>
                            <h5 className="text-lg font-black font-syne text-white uppercase mt-2 leading-snug">
                              {t.eventTitle}
                            </h5>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black text-emerald-400 font-syne">₹{t.pricePaid || 1499}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs space-y-1.5 text-slate-300 font-medium">
                          <div>• Event Date: <strong className="text-white">{t.eventDate || 'Aug 29, 2026'}</strong></div>
                          <div>• Member Code: <strong className="text-[#0088FF] font-mono">{t.mockCode || 'ETH8392'}</strong></div>
                          <div>• Payment ID: <strong className="text-amber-300 font-mono text-[11px]">{t.ticketId || 'PAY-MOCK8392'}</strong></div>
                        </div>

                        {/* GATE QR CODE SCANNER BOX */}
                        <div className="flex items-center gap-4 bg-black/50 border border-white/10 p-3.5 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(t.mockCode || 'ETH8392')}&color=ffffff&bgcolor=000000`}
                            alt="Entry QR Code"
                            className="w-16 h-16 rounded-lg border border-white/20 shrink-0"
                          />
                          <div className="text-xs space-y-0.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Gate Scanner Pass</span>
                            <span className="text-white font-extrabold text-xs block">Show at Studio Entrance</span>
                            <span className="text-[10px] text-emerald-400 font-semibold block">✓ Verified &amp; Confirmed</span>
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
              <div className="p-6 sm:p-8 space-y-6">
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
                  <p className="text-xs text-slate-300 leading-relaxed font-medium bg-black/40 p-4 rounded-xl border border-white/10">
                    "Gaddam Shanmuka is executing urban isolations and Bollywood commercial routines with exceptional stage energy and precision."
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <Footer />

      {selectedRenewItem && (
        <BookingPaymentModal
          item={selectedRenewItem}
          API_URL={API_URL}
          onClose={() => setSelectedRenewItem(null)}
          onSuccessPayment={(data) => {
            setSelectedRenewItem(null);
            setConfirmedRenewal(data);
          }}
        />
      )}

      {confirmedRenewal && (
        <ConfirmationReceiptModal
          registration={confirmedRenewal}
          onClose={() => setConfirmedRenewal(null)}
        />
      )}
    </div>
  );
}
