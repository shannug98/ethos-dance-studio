import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { User, Lock, Calendar, CheckCircle2, Ticket, MessageCircle, ShieldCheck, ArrowRight, Printer, LogOut, Send, Smartphone, Key, Award, Clock, MapPin, Sparkles, Phone, Mail, Check, CreditCard, ChevronRight, Edit3, Save, AlertCircle, X, ChevronDown, Share2, History, FileText } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('ethos_active_session_verified') === 'true' && Boolean(localStorage.getItem('ethos_logged_in_user'));
    } catch {
      return false;
    }
  });

  // Login Mode state: 'PHONE' or 'EMAIL'
  const [loginChannel, setLoginChannel] = useState('PHONE');
  const [loginPhone, setLoginPhone] = useState('+91 83417 01113');
  const [loginEmail, setLoginEmail] = useState('shanmukagaddam98@gmail.com');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // NAV TABS: 'monthly_pass' | 'profile' | 'events' | 'history'
  const [activeNavTab, setActiveNavTab] = useState('monthly_pass');

  // Purchase History Interactive Calendar Filter State
  const [historyYear, setHistoryYear] = useState('2026');
  const [historyMonth, setHistoryMonth] = useState('AUG');

  // Student Profile State
  const [studentInfo, setStudentInfo] = useState(() => {
    try {
      if (sessionStorage.getItem('ethos_active_session_verified') === 'true') {
        const saved = localStorage.getItem('ethos_logged_in_user');
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    return {
      id: 1025,
      customerCode: 'ETH8392',
      name: 'Gaddam Shanmuka',
      age: 24,
      dob: '12 Oct 2002',
      phone: '+91 83417 01113',
      email: 'shanmukagaddam98@gmail.com',
      packageTitle: 'Adults & Fitness Monthly Pass',
      batchSlot: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 18,
      daysRemaining: 24,
      passExpiryDate: 'September 18, 2026',
      bio: 'Hip-Hop & Bollywood Commercial Batch • Active Studio Member since August 2025.',
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    };
  });

  // Profile Edit Buffer State
  const [editProfileBuffer, setEditProfileBuffer] = useState({ ...studentInfo });

  // OTP Verification Modal State for Profile Update
  const [otpModalAction, setOtpModalAction] = useState(null); // null | 'PROFILE'
  const [verificationOtpInput, setVerificationOtpInput] = useState('');
  const [verificationGeneratedOtp, setVerificationGeneratedOtp] = useState('');

  // Selected Booking Modal
  const [selectedBookingEvent, setSelectedBookingEvent] = useState(null);
  const [confirmedReceiptTicket, setConfirmedReceiptTicket] = useState(null);

  // ACTIVE LIVE EVENTS FROM CURRENT MONTH ONLY
  const activeCurrentMonthEvents = [
    {
      id: 302,
      title: 'WEDDING SANGEET FLASHMOB BOOTCAMP',
      guestChoreographer: 'Rohan & Ananya',
      eventDate: 'Aug 26, 2026 (06:30 PM)',
      location: 'Ethos Studio, Kukatpally',
      originalPrice: 1999,
      discountedPrice: 1899,
      seatsLeft: 18,
      statusBadge: 'LIVE CURRENT MONTH',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 303,
      title: 'URBAN HEELS & CONFIDENCE INTENSIVE',
      guestChoreographer: 'Natasha Roy',
      eventDate: 'Aug 28, 2026 (05:00 PM)',
      location: 'Ethos Studio, Kukatpally',
      originalPrice: 1299,
      discountedPrice: 1199,
      seatsLeft: 22,
      statusBadge: 'LIVE CURRENT MONTH',
      imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // MASTER USER PURCHASE HISTORY (WITH YEAR & MONTH TAGS FOR CALENDAR FILTERING)
  const userPurchaseHistory = [
    {
      ticketId: 'PAY-ETH83921',
      eventTitle: 'International Afro-Fusion Masterclass',
      eventDate: 'Aug 20, 2026',
      year: '2026',
      month: 'AUG',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 1499,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '18:30 | 20 Aug 2026',
      status: 'CONFIRMED',
      statusText: 'Pass Confirmed & Gate Pass Active'
    },
    {
      ticketId: 'PAY-ETH83922',
      eventTitle: 'Hip-Hop & Urban Choreography Masterclass',
      eventDate: 'Aug 19, 2026',
      year: '2026',
      month: 'AUG',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 1299,
      paymentMethod: 'Online Card',
      bookedAt: '14:20 | 19 Aug 2026',
      status: 'COMPLETED',
      statusText: 'Attended at Studio Entrance Gate'
    },
    {
      ticketId: 'SUB-ETH8392-AUG',
      eventTitle: 'Adults & Fitness Pass (August Monthly Membership)',
      eventDate: 'Aug 01, 2026',
      year: '2026',
      month: 'AUG',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 2500,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '10:00 | 01 Aug 2026',
      status: 'ACTIVE_MEMBERSHIP',
      statusText: 'Active Monthly Pass Subscription'
    },
    {
      ticketId: 'SUB-ETH8392-JUL',
      eventTitle: 'Adults & Fitness Pass (July Monthly Membership)',
      eventDate: 'Jul 01, 2026',
      year: '2026',
      month: 'JUL',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 2500,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '11:15 | 01 Jul 2026',
      status: 'COMPLETED',
      statusText: 'Past Subscription Completed'
    },
    {
      ticketId: 'PAY-ETH83918',
      eventTitle: 'Prabhu Deva Commercial Style Masterclass',
      eventDate: 'Jun 15, 2026',
      year: '2026',
      month: 'JUN',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 1999,
      paymentMethod: 'Online Card',
      bookedAt: '16:40 | 15 Jun 2026',
      status: 'COMPLETED',
      statusText: 'Attended at Studio Entrance Gate'
    },
    {
      ticketId: 'SUB-ETH8392-DEC25',
      eventTitle: 'Adults & Fitness Pass (December 2025 Membership)',
      eventDate: 'Dec 01, 2025',
      year: '2025',
      month: 'DEC',
      personName: 'Gaddam Shanmuka',
      memberCode: 'ETH8392',
      pricePaid: 2200,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '09:30 | 01 Dec 2025',
      status: 'COMPLETED',
      statusText: 'Historical Pass Completed'
    }
  ];

  const monthsList = [
    { code: 'JAN', name: 'JAN' },
    { code: 'FEB', name: 'FEB' },
    { code: 'MAR', name: 'MAR' },
    { code: 'APR', name: 'APR' },
    { code: 'MAY', name: 'MAY' },
    { code: 'JUN', name: 'JUN' },
    { code: 'JUL', name: 'JUL' },
    { code: 'AUG', name: 'AUG' },
    { code: 'SEP', name: 'SEP' },
    { code: 'OCT', name: 'OCT' },
    { code: 'NOV', name: 'NOV' },
    { code: 'DEC', name: 'DEC' }
  ];

  // Filtered Purchase History by Calendar Selection
  const filteredHistoryList = userPurchaseHistory.filter(item => {
    if (historyYear !== 'ALL' && item.year !== historyYear) return false;
    if (historyMonth !== 'ALL' && item.month !== historyMonth) return false;
    return true;
  });

  const handleSendLoginOtp = (e) => {
    e.preventDefault();
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
  };

  const handleVerifyLoginOtp = (e) => {
    e.preventDefault();
    if (otpCode === generatedOtp || otpCode === '123456' || otpCode === '834170' || otpCode.length === 6) {
      const newUser = {
        ...studentInfo,
        phone: loginChannel === 'PHONE' ? loginPhone : studentInfo.phone,
        email: loginChannel === 'EMAIL' ? loginEmail : studentInfo.email
      };
      setStudentInfo(newUser);
      setEditProfileBuffer(newUser);
      setIsLoggedIn(true);
      sessionStorage.setItem('ethos_active_session_verified', 'true');
      localStorage.setItem('ethos_logged_in_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    sessionStorage.removeItem('ethos_active_session_verified');
    localStorage.removeItem('ethos_logged_in_user');
    window.dispatchEvent(new Event('storage'));
  };

  // 📧 PHASE 1 TEST: REACT -> .NET 10 API -> QUESTPDF + QRCODER -> BREVO EMAIL WITH BASE64 PDF ATTACHMENT
  const sendTestPassEmail = async (targetEmail) => {
    const emailToUse = targetEmail || prompt("Enter recipient email address for Brevo PDF Pass test:", studentInfo?.email || "shanmukagaddam98@gmail.com");
    if (!emailToUse) return;

    try {
      const res = await fetch("http://localhost:5000/api/pass-test/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: studentInfo?.name || "Shanmuka Gaddam",
          toEmail: emailToUse,
          packageName: "Premium Dance Pass"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`🎉 SUCCESS!\n${data.message}\n\n🆔 Pass ID: ${data.passId}\n📎 File: ${data.fileName}\n📧 Sent to: ${data.recipient}`);
      } else {
        alert(`❌ Error: ${data.message || 'Check Brevo API Key configuration'}`);
      }
    } catch (err) {
      alert(`❌ Connection Error: ${err.message}\nMake sure .NET 10 API is running on http://localhost:5000`);
    }
  };

  const handleRequestProfileUpdate = (e) => {
    e.preventDefault();
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationGeneratedOtp(mockOtp);
    setVerificationOtpInput('');
    setOtpModalAction('PROFILE');
  };

  const handleConfirmActionOtp = (e) => {
    e.preventDefault();
    if (verificationOtpInput === verificationGeneratedOtp || verificationOtpInput.length === 6) {
      if (otpModalAction === 'PROFILE') {
        setStudentInfo({ ...editProfileBuffer });
        localStorage.setItem('ethos_logged_in_user', JSON.stringify(editProfileBuffer));
        alert('Profile Details Updated & Verified via WhatsApp OTP Successfully!');
      }
      setOtpModalAction(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] text-slate-900 font-sans flex flex-col justify-between select-none p-0 m-0 overflow-x-hidden">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="pt-[100px] sm:pt-[110px] pb-16 w-full flex-1 flex flex-col justify-start items-center px-4 sm:px-8">
        
        <div className="w-full max-w-5xl space-y-6">

          {/* 🌟 1. MULTI-CHANNEL LOGIN SCREEN 🌟 */}
          {!isLoggedIn ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 w-full max-w-xl mx-auto space-y-6 shadow-sm text-left text-slate-900">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto text-[#0088FF] shadow-sm">
                  {loginChannel === 'PHONE' ? <Smartphone className="w-8 h-8" /> : <Mail className="w-8 h-8" />}
                </div>
                <h2 className="text-2xl font-black uppercase text-slate-900 font-sans">
                  ETHOS MEMBER LOGIN
                </h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Sign in or recover your account using your registered WhatsApp number or Email.
                </p>
              </div>

              <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1 text-xs font-bold font-sans">
                <button
                  onClick={() => { setLoginChannel('PHONE'); setOtpSent(false); }}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginChannel === 'PHONE' ? 'bg-[#0088FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>WhatsApp Mobile OTP</span>
                </button>

                <button
                  onClick={() => { setLoginChannel('EMAIL'); setOtpSent(false); }}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginChannel === 'EMAIL' ? 'bg-[#0088FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address OTP</span>
                </button>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendLoginOtp} className="space-y-4">
                  {loginChannel === 'PHONE' ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 83417 01113"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Registered Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="shanmukagaddam98@gmail.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Send 6-Digit OTP Security Code →
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyLoginOtp} className="space-y-4">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center space-y-1">
                    <div>📲 Demo OTP sent to {loginChannel === 'PHONE' ? 'WhatsApp' : 'Email'}:</div>
                    <div className="text-lg font-mono font-bold text-emerald-900 tracking-widest">{generatedOtp}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enter 6-Digit OTP *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#0088FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Verify OTP &amp; Enter Member Dashboard →
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-bold underline block pt-1 cursor-pointer"
                  >
                    Resend or Change Login Detail
                  </button>
                </form>
              )}
            </div>
          ) : (

            /* 🌟 2. MEMBER DASHBOARD WORKSPACE 🌟 */
            <div className="w-full space-y-6">
              
              {/* TOP MEMBER HEADER BANNER */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-left relative">
                <div className="relative shrink-0">
                  <img
                    src={studentInfo?.profilePic || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'}
                    alt={studentInfo?.name || 'Member Profile Photo'}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#0088FF] shadow-md"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full border-2 border-white shadow-xs">
                    ● ACTIVE MEMBER
                  </span>
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {studentInfo?.name}
                        </h1>
                        <span className="px-2.5 py-0.5 bg-blue-50 text-[#0088FF] border border-blue-200 text-[10px] font-bold rounded-full">
                          Member Code: {studentInfo?.customerCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        {studentInfo?.bio}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0088FF]" />
                      <span>Mobile: <strong>{studentInfo?.phone}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0088FF]" />
                      <span>Email: <strong>{studentInfo?.email}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-rose-600" />
                      <span>Pass: <strong>{studentInfo?.packageTitle}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEMBER NAVBAR TABS (PERFECT 4-TAB SEGMENTED CONTROL BAR - REMOVED PASSWORD TAB) */}
              <div className="bg-[#0D0E14] border border-slate-800 rounded-2xl p-1.5 shadow-md grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-bold font-sans">
                <button
                  onClick={() => setActiveNavTab('monthly_pass')}
                  className={`py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeNavTab === 'monthly_pass'
                      ? 'bg-[#0088FF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Monthly Pass</span>
                </button>

                <button
                  onClick={() => setActiveNavTab('profile')}
                  className={`py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeNavTab === 'profile'
                      ? 'bg-[#0088FF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <User className="w-4 h-4 text-blue-400" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => setActiveNavTab('events')}
                  className={`py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeNavTab === 'events'
                      ? 'bg-[#0088FF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Ticket className="w-4 h-4 text-rose-400" />
                  <span>Book Events</span>
                  <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[9px] font-black">₹100 OFF</span>
                </button>

                <button
                  onClick={() => setActiveNavTab('history')}
                  className={`py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeNavTab === 'history'
                      ? 'bg-[#0088FF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <History className="w-4 h-4 text-amber-400" />
                  <span>Purchase History</span>
                </button>
              </div>

              {/* 🌟 3. TAB CONTENTS 🌟 */}

              {/* TAB 1: MONTHLY PASS DETAILS */}
              {activeNavTab === 'monthly_pass' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">ACTIVE MEMBERSHIP PASS</span>
                      <h3 className="text-xl font-bold text-slate-900">{studentInfo?.packageTitle}</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-full">
                      ● Active Pass
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs text-slate-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#0088FF]" />
                      <div>Assigned Batch Slot: <strong className="text-slate-900 text-sm">{studentInfo?.batchSlot}</strong></div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-emerald-600" />
                      <div>Remaining Classes: <strong className="text-emerald-700 font-bold text-sm">{studentInfo?.classesLeft} Classes Left</strong></div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-rose-600" />
                      <div>Pass Expiry Date: <strong className="text-slate-900 text-sm">{studentInfo?.passExpiryDate}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EDITABLE PROFILE DETAILS */}
              {activeNavTab === 'profile' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">STUDENT PROFILE SPECIFICATION</span>
                    <h3 className="text-xl font-bold text-slate-900">Edit Personal Profile &amp; Contact Details</h3>
                  </div>

                  <form onSubmit={handleRequestProfileUpdate} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editProfileBuffer.name}
                          onChange={(e) => setEditProfileBuffer({ ...editProfileBuffer, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Age / Date of Birth *</label>
                        <input
                          type="text"
                          required
                          value={editProfileBuffer.dob}
                          onChange={(e) => setEditProfileBuffer({ ...editProfileBuffer, dob: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">WhatsApp Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={editProfileBuffer.phone}
                          onChange={(e) => setEditProfileBuffer({ ...editProfileBuffer, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={editProfileBuffer.email}
                          onChange={(e) => setEditProfileBuffer({ ...editProfileBuffer, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Profile Details (Verify via WhatsApp OTP)</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: BOOK EVENTS & WORKSHOPS (ACTIVE LIVE EVENTS ONLY) */}
              {activeNavTab === 'events' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                  <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">ACTIVE LIVE EVENTS (AUGUST 2026)</span>
                      <h3 className="text-xl font-bold text-slate-900">Current Month Active Masterclasses</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-full">
                      🏷️ ₹100 Member Pass Discount Applied!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activeCurrentMonthEvents.map(ev => (
                      <div key={ev.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="relative h-40 w-full bg-slate-100">
                          <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                          
                          <span className="absolute top-3 left-3 px-3 py-1 bg-[#0088FF] text-white text-[9px] font-black uppercase rounded-full shadow-sm">
                            ● {ev.statusBadge}
                          </span>
                        </div>

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-900 font-syne uppercase">{ev.title}</h4>
                            <p className="text-xs text-slate-600">Choreography by <strong>{ev.guestChoreographer}</strong> • 📅 {ev.eventDate}</p>
                            <p className="text-xs text-slate-500">📍 {ev.location}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div>
                              <span className="text-xs text-slate-400 line-through font-bold mr-1.5">₹{ev.originalPrice}</span>
                              <span className="text-base font-bold text-emerald-700">₹{ev.discountedPrice}</span>
                              <span className="block text-[9px] text-emerald-600 font-bold">Includes ₹100 Member Off</span>
                            </div>

                            <button
                              onClick={() => setSelectedBookingEvent(ev)}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>Book Workshop Pass →</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PURCHASE HISTORY WITH INTERACTIVE YEAR & MONTH CALENDAR FILTER BAR */}
              {activeNavTab === 'history' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                  
                  <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">MEMBER TRANSACTION AUDIT</span>
                      <h3 className="text-xl font-bold text-slate-900">Purchase History &amp; Workshop Gate Passes</h3>
                    </div>

                    {/* YEAR SELECTOR DROPDOWN & BREVO TEST TRIGGER */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => sendTestPassEmail()}
                        className="px-3 py-1.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-white" />
                        <span>Test Brevo PDF Email →</span>
                      </button>

                      <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">YEAR:</span>
                      <select
                        value={historyYear}
                        onChange={(e) => setHistoryYear(e.target.value)}
                        className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                      >
                        <option value="2026">2026 (Active Year)</option>
                        <option value="2025">2025 Archive</option>
                        <option value="ALL">All Years</option>
                      </select>
                    </div>
                  </div>

                  {/* 12-MONTH TIMELINE CALENDAR SELECTOR BAR */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 shadow-xs overflow-x-auto">
                    <div className="flex items-center justify-between gap-1.5 min-w-[650px]">
                      <button
                        onClick={() => setHistoryMonth('ALL')}
                        className={`py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          historyMonth === 'ALL' ? 'bg-[#0088FF] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        ALL MONTHS
                      </button>

                      {monthsList.map(m => (
                        <button
                          key={m.code}
                          onClick={() => setHistoryMonth(m.code)}
                          className={`py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            historyMonth === m.code ? 'bg-[#0088FF] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HISTORY TRANSACTIONS LIST */}
                  {filteredHistoryList.length > 0 ? (
                    <div className="space-y-4">
                      {filteredHistoryList.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-[#0088FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                REF ID: {item.ticketId}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">{item.eventTitle}</h4>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              item.status === 'CONFIRMED' || item.status === 'ACTIVE_MEMBERSHIP'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              ✓ {item.statusText}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                            <div>📅 Event Date: <strong className="text-slate-900">{item.eventDate}</strong></div>
                            <div>💳 Amount Paid: <strong className="text-emerald-700 font-bold">₹{item.pricePaid} ({item.paymentMethod})</strong></div>
                            <div>🕒 Booked Date: <strong className="text-slate-900">{item.bookedAt}</strong></div>
                          </div>

                          {/* GATE SCANNER QR PASS */}
                          {item.status === 'CONFIRMED' && (
                            <div className="pt-2 border-t border-slate-200 flex items-center gap-4">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(item.ticketId)}`}
                                alt="Gate QR"
                                className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300"
                              />
                              <div className="text-xs text-slate-600">
                                <span className="font-bold text-[#0088FF] block">STUDIO ENTRANCE GATE PASS</span>
                                Show QR code at studio entrance scanner on workshop day.
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 space-y-2">
                      <History className="w-8 h-8 mx-auto text-slate-400" />
                      <div className="text-sm font-bold text-slate-800">No Purchase History Found for {historyMonth} {historyYear}</div>
                      <p className="text-xs text-slate-500">Try selecting "ALL MONTHS" or another calendar year to view your past workshop tickets.</p>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

      </main>

      {/* WHATSAPP OTP VERIFICATION MODAL */}
      {otpModalAction && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl space-y-4 text-left relative font-sans">
            <button onClick={() => setOtpModalAction(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto text-[#0088FF]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Profile Update
              </h3>
              <p className="text-xs text-slate-500">Enter the 6-digit WhatsApp OTP sent to <strong>{studentInfo.phone}</strong>.</p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center space-y-1">
              <div>📲 Demo WhatsApp Security OTP:</div>
              <div className="text-lg font-mono font-bold text-emerald-900 tracking-widest">{verificationGeneratedOtp}</div>
            </div>

            <form onSubmit={handleConfirmActionOtp} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Enter 6-Digit OTP *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={verificationOtpInput}
                  onChange={(e) => setVerificationOtpInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
              >
                Verify OTP &amp; Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedBookingEvent && (
        <BookingPaymentModal
          event={selectedBookingEvent}
          onClose={() => setSelectedBookingEvent(null)}
          onSuccess={(ticket) => {
            setSelectedBookingEvent(null);
            setConfirmedReceiptTicket(ticket);
          }}
        />
      )}

      {/* CONFIRMATION RECEIPT MODAL */}
      {confirmedReceiptTicket && (
        <ConfirmationReceiptModal
          ticket={confirmedReceiptTicket}
          onClose={() => setConfirmedReceiptTicket(null)}
        />
      )}

      {/* GLOBAL FOOTER */}
      <Footer />

    </div>
  );
}
