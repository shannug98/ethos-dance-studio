import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { User, Lock, Calendar, Award, Image, Settings, CheckCircle2, Key, AlertTriangle, CreditCard, Upload, Send, MessageSquare, Sparkles, Smartphone, ShieldCheck, MessageCircle } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [loginMode, setLoginMode] = useState('OTP'); // 'OTP' or 'ID'
  const [loginPhone, setLoginPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpNotice, setDemoOtpNotice] = useState('');
  const [whatsappOtpUrl, setWhatsappOtpUrl] = useState('');

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('attendance');
  const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(null);
  
  const fileInputRef = useRef(null);

  // Modals for In-Portal Pass Payment Renewal
  const [selectedRenewItem, setSelectedRenewItem] = useState(null);
  const [confirmedRenewal, setConfirmedRenewal] = useState(null);

  // Student Profile & Pass Data
  const defaultMemberData = {
    id: 1025,
    customerCode: 'ETH1025',
    name: 'Shanmuka Gaddam',
    age: '24 Years',
    parentName: 'Suresh Gaddam',
    packageTitle: 'Royal Celebration / Adults Monthly Pass',
    totalClasses: 20,
    classesAttended: 12,
    classesLeft: 8,
    passExpiryDate: 'August 28, 2026 (In 9 Days)',
    daysRemaining: 9,
    attendanceRate: '90%',
    rhythmScore: '94%',
    stageConfidence: '92%',
    teacherNotes: 'Shanmuka is performing exceptionally well in Commercial Hip-Hop isolations and Bollywood fusion sync. Ready for upcoming stage performance!',
    email: 'shanmuka@gmail.com',
    phone: '8341701113',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  };

  const [studentInfo, setStudentInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('ethos_logged_in_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    localStorage.setItem('ethos_logged_in_user', JSON.stringify(defaultMemberData));
    return defaultMemberData;
  });

  useEffect(() => {
    localStorage.setItem('ethos_logged_in_user', JSON.stringify(studentInfo));
    window.dispatchEvent(new Event('storage'));
  }, [studentInfo]);

  // Handle Send OTP (Generate WhatsApp OTP link as well)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!loginPhone) return;

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const cleanPhone = loginPhone.replace(/[^0-9]/g, '');

    const waText = encodeURIComponent(
      `🔐 *Ethos Dance Studio Member Login OTP*\n\n` +
      `Your 6-digit login OTP code is: *${generatedOtp}*\n\n` +
      `Valid for 10 minutes. Do not share this code with anyone.`
    );
    setWhatsappOtpUrl(`https://wa.me/91${cleanPhone}?text=${waText}`);

    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone })
      });
      if (res.ok) {
        const data = await res.json();
        setDemoOtpNotice(data.demoOtp || generatedOtp);
      } else {
        setDemoOtpNotice(generatedOtp);
      }
      setOtpSent(true);
    } catch (err) {
      setOtpSent(true);
      setDemoOtpNotice(generatedOtp);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) return;

    const userProfile = {
      name: loginPhone.includes('83417') ? 'Shanmuka' : 'Ethos Student',
      studentCode: 'ETH' + Math.floor(1000 + Math.random() * 9000),
      parentName: 'Parent / Guardian',
      packageTitle: 'Adults & Fitness Pass',
      totalClasses: 20,
      classesAttended: 12,
      classesLeft: 8,
      passExpiryDate: 'August 28, 2026 (In 9 Days)',
      daysRemaining: 9,
      attendanceRate: '92%',
      rhythmScore: '95%',
      stageConfidence: '94%',
      teacherNotes: 'Excellent performance in Commercial Hip-Hop and Bollywood Fusion! High energy on stage.',
      email: 'student@ethosdancestudio.com',
      phone: loginPhone || '8341701113',
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    };

    setStudentInfo(userProfile);
    setIsLoggedIn(true);
    localStorage.setItem('ethos_logged_in_user', JSON.stringify(userProfile));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginId && password) {
      setIsLoggedIn(true);
      localStorage.setItem('ethos_logged_in_user', JSON.stringify(studentInfo));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ethos_logged_in_user');
  };

  const handleResetPassword = () => {
    setShowPasswordResetSuccess(true);
    setTimeout(() => setShowPasswordResetSuccess(false), 4000);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updated = { ...studentInfo, profilePic: imageUrl };
      setStudentInfo(updated);
      localStorage.setItem('ethos_logged_in_user', JSON.stringify(updated));
    }
  };

  const getParentWhatsappUrl = () => {
    const cleanPhone = (studentInfo.phone || '9876543210').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `⚠️ *Ethos Dance Studio Pass Expiry Reminder*\n\n` +
      `Dear *${studentInfo.parentName}*,\n` +
      `*${studentInfo.name}'s* monthly dance pass at Ethos Kukatpally expires in *${studentInfo.daysRemaining} days* (${studentInfo.passExpiryDate}).\n\n` +
      `Remaining Balance: *${studentInfo.classesLeft} Classes*\n` +
      `Renew online in 1 click: https://shannug98.github.io/ethos-dance-studio/student.html\n\n` +
      `Thank you,\n` +
      `Ethos Dance Studio Team`
    );
    return `https://wa.me/91${cleanPhone}?text=${waText}`;
  };

  const handleSendParentSms = () => {
    const message = `Dear ${studentInfo.parentName}, ${studentInfo.name}'s monthly pass at Ethos Dance Studio Kukatpally expires in ${studentInfo.daysRemaining} days (${studentInfo.passExpiryDate}). Renew online at https://shannug98.github.io/ethos-dance-studio/student.html`;
    setSmsSentNotice(message);
    setTimeout(() => setSmsSentNotice(null), 7000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col justify-between">
      
      {/* Navbar */}
      <Navbar />

      <main className="pt-[104px] max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full flex-1">
        
        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-[#1F41FF] via-[#FF0044] to-[#D900FF] p-8 rounded-3xl mb-8 text-center text-white shadow-2xl uppercase font-display">
          <h1 className="text-3xl sm:text-5xl font-black font-display-giant">STUDENT & PARENT MEMBER PORTAL</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2 text-slate-100">
            Official Portal for Monthly Package Members • Class Attendance & Pass Renewal Hub
          </p>
        </div>

        {/* IF NOT LOGGED IN: SHOW MOBILE OTP / CUSTOMER ID LOGIN PAGE */}
        {!isLoggedIn ? (
          <div className="bg-[#111111] border border-[#262626] rounded-3xl p-8 sm:p-12 max-w-md mx-auto space-y-6 shadow-2xl">
            
            {/* Login Mode Toggle Tabs */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] p-1.5 rounded-2xl border border-[#333333]">
              <button
                type="button"
                onClick={() => setLoginMode('OTP')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  loginMode === 'OTP' ? 'bg-[#FF0044] text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile / WhatsApp OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMode('ID')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  loginMode === 'ID' ? 'bg-[#1F41FF] text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Customer ID</span>
              </button>
            </div>

            {/* TAB 1: MOBILE NUMBER OTP LOGIN */}
            {loginMode === 'OTP' && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-black uppercase font-display text-white">ETHOS OTP LOGIN</h2>
                  <p className="text-xs text-slate-400">
                    No password required! Receive your 6-digit OTP via SMS or free WhatsApp.
                  </p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mobile / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF0044]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#FF0044] hover:bg-[#e0003c] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send 6-Digit OTP</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="p-3 bg-[#25D366]/15 border border-[#25D366] text-[#25D366] text-xs font-bold rounded-xl space-y-1">
                      <div>📲 OTP code generated for +91 {loginPhone || '8341701113'}</div>
                      {demoOtpNotice && <div>OTP Code: <code className="text-white bg-black px-2 py-0.5 rounded">{demoOtpNotice}</code></div>}
                    </div>

                    {whatsappOtpUrl && (
                      <a
                        href={whatsappOtpUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-black" />
                        <span>Send OTP to my WhatsApp (Free)</span>
                      </a>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Enter 6-Digit OTP</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 482910"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3.5 text-center text-lg font-mono font-black text-[#D0FBF9] focus:outline-none focus:border-[#25D366] tracking-widest"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-black text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP & Log In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-xs text-slate-400 hover:text-white font-bold"
                    >
                      Change Mobile Number
                    </button>
                  </form>
                )}

                <div className="p-3 bg-[#1A1A1A] border border-[#262626] rounded-xl text-[11px] text-slate-400 text-center">
                  Quick Mobile OTP Login: <code className="text-[#D0FBF9] font-bold">8341701113</code> (OTP: <code className="text-[#D0FBF9] font-bold">482910</code>)
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOMER ID & PASSWORD LOGIN */}
            {loginMode === 'ID' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Customer Code / ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ETH1025 or ETHOS-MEMBER"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1F41FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1F41FF]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-[#1A1A1A] border-[#333333]" defaultChecked />
                    <span>Remember Me</span>
                  </label>
                  <button type="button" onClick={handleResetPassword} className="text-[#D0FBF9] hover:underline font-bold">
                    Forgot Password?
                  </button>
                </div>

                {showPasswordResetSuccess && (
                  <div className="p-3 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Password setup link sent to registered email!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1F41FF] hover:bg-[#3b5cff] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-xl"
                >
                  Log In with Customer Code
                </button>

                <div className="p-3 bg-[#1A1A1A] border border-[#262626] rounded-xl text-[11px] text-slate-400 text-center">
                  ID: <code className="text-[#D0FBF9]">ETH1025</code> | Password: <code className="text-[#D0FBF9]">ethos123</code>
                </div>
              </form>
            )}

          </div>
        ) : (
          /* LOGGED IN MEMBER DASHBOARD */
          <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            
            {/* ⚠️ PASS EXPIRY ALERT WARNING BANNER */}
            <div className="bg-gradient-to-r from-[#FF0044] to-[#1F41FF] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/20 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black/40 rounded-xl text-[#FF0044]">
                  <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold uppercase text-white font-display">
                    PASS EXPIRING SOON: EXPIRES IN {studentInfo.daysRemaining} DAYS!
                  </h3>
                  <p className="text-xs text-slate-200">
                    Expiry Date: <strong>{studentInfo.passExpiryDate}</strong> • Balance: <strong>{studentInfo.classesLeft} Classes Left</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('renewal')}
                  className="px-4 py-2.5 bg-[#D0FBF9] text-black text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-white transition-all shrink-0"
                >
                  Renew Pass Online Now
                </button>

                <a
                  href={getParentWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 bg-[#25D366] text-black text-xs font-black uppercase rounded-xl hover:bg-[#20bd5a] transition-all shrink-0 flex items-center gap-1.5 shadow-lg"
                  title="Dispatch WhatsApp Expiry Reminder to Parent"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Send WhatsApp</span>
                </a>
              </div>
            </div>

            {/* LIVE SIMULATED SMS TOAST NOTICE */}
            {smsSentNotice && (
              <div className="p-4 bg-[#25D366]/20 border-2 border-[#25D366] text-white rounded-2xl space-y-1 animate-pulse">
                <div className="flex items-center gap-2 text-[#25D366] text-xs font-extrabold uppercase">
                  <MessageSquare className="w-4 h-4" />
                  <span>OFFICIAL ETHOS SMS DISPATCHED TO PARENT ({studentInfo.phone}):</span>
                </div>
                <p className="text-xs font-mono text-slate-200 bg-black/50 p-2.5 rounded-lg border border-[#25D366]/30">
                  "{smsSentNotice}"
                </p>
              </div>
            )}

            {/* Student Welcome Header Banner */}
            <div className="bg-[#1A1A1A] border border-[#262626] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                  <img
                    src={studentInfo.profilePic}
                    alt="Student Avatar"
                    className="w-20 h-20 rounded-full border-2 border-[#FF0044] object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfileImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold uppercase text-white font-display">{studentInfo.name}</h2>
                    <span className="px-2.5 py-0.5 bg-[#1F41FF] text-white text-[10px] font-extrabold uppercase rounded-full">
                      Age: {studentInfo.age}
                    </span>
                  </div>
                  <p className="text-xs text-[#D0FBF9] font-bold uppercase">{studentInfo.packageTitle}</p>
                  <span className="text-xs text-slate-400 block mt-0.5">Parent Account: {studentInfo.parentName} ({studentInfo.phone})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#FF0044]/20 border border-[#FF0044] px-5 py-3 rounded-2xl text-center">
                  <span className="text-3xl font-black text-white font-display block leading-none">{studentInfo.classesLeft}</span>
                  <span className="text-[10px] font-extrabold uppercase text-[#FF0044]">Classes Left</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-3 bg-[#222222] hover:bg-[#333333] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Portal Tab Navigation */}
            <div className="flex flex-wrap items-center gap-3 border-b border-[#262626] pb-4">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'attendance' ? 'bg-[#1F41FF] text-white shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Classes & Attendance ({studentInfo.classesLeft} Left)</span>
              </button>

              <button
                onClick={() => setActiveTab('renewal')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'renewal' ? 'bg-[#FF0044] text-white shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#D0FBF9]" />
                <span>Renew Monthly Pass Online</span>
              </button>

              <button
                onClick={() => setActiveTab('performance')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'performance' ? 'bg-[#D900FF] text-black shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Parent & Student Progress</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'gallery' ? 'bg-[#D0FBF9] text-black shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Private Member Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'profile' ? 'bg-[#1A1A1A] text-white border border-[#404040]' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Profile & Photo Settings</span>
              </button>
            </div>

            {/* TAB CONTENT 1: ATTENDANCE & CLASSES */}
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] text-center">
                    <span className="text-4xl font-black text-white font-display block">{studentInfo.totalClasses}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Total Package Classes</span>
                  </div>

                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] text-center">
                    <span className="text-4xl font-black text-[#25D366] font-display block">{studentInfo.classesAttended}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Classes Attended</span>
                  </div>

                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border-2 border-[#FF0044] text-center">
                    <span className="text-4xl font-black text-[#FF0044] font-display block">{studentInfo.classesLeft}</span>
                    <span className="text-xs font-bold text-white uppercase">Remaining Classes Left</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-4">
                  <h3 className="text-base font-extrabold uppercase text-white font-display">Upcoming Scheduled Batches:</h3>
                  <div className="space-y-3 text-xs font-semibold text-slate-300">
                    <div className="p-4 bg-[#111111] rounded-xl flex items-center justify-between border border-[#222222]">
                      <span>🗓️ Wednesday (Tomorrow) • 06:00 PM - 07:00 PM (Adults Beginner)</span>
                      <span className="text-[#25D366] font-bold">Confirmed Slot</span>
                    </div>
                    <div className="p-4 bg-[#111111] rounded-xl flex items-center justify-between border border-[#222222]">
                      <span>🗓️ Friday • 06:00 PM - 07:00 PM (Adults Beginner)</span>
                      <span className="text-[#25D366] font-bold">Confirmed Slot</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: RENEW MONTHLY PASS ONLINE */}
            {activeTab === 'renewal' && (
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] border-2 border-[#FF0044] p-6 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-3 py-1 bg-[#FF0044] text-white text-[10px] font-extrabold uppercase rounded-full">
                        RECOMMENDED RENEWAL
                      </span>
                      <h3 className="text-2xl font-black uppercase text-white font-display mt-2">
                        MONTHLY DANCE MEMBERSHIP PASS
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Includes 20 classes/month across Commercial Hip-Hop, Bollywood Fusion & Sangeet choreography.
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-3xl font-black text-white font-display">₹2,500</span>
                      <span className="text-xs text-slate-400 block font-bold">Per Month</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>✔️ 1-Month Extension from Expiry Date ({studentInfo.passExpiryDate})</div>
                      <div>✔️ Includes 1 Free Guest Masterclass Pass</div>
                    </div>

                    <button
                      onClick={() => setSelectedRenewItem({ id: 101, title: 'Ethos Monthly Pass Renewal', price: 2500, type: 'Monthly Pass Renewal' })}
                      className="btn-cyan w-full sm:w-auto text-xs py-3.5 px-8 font-extrabold uppercase tracking-wider"
                    >
                      Pay & Renew Pass (₹2,500)
                    </button>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-[#262626] p-6 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white font-display">
                        QUARTERLY VIP DANCE PASS (3 MONTHS)
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Save ₹1,000! Includes 60 classes over 3 months + free stage performance costume.
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-3xl font-black text-[#D900FF] font-display">₹6,500</span>
                      <span className="text-xs text-slate-400 block font-bold">3 Months</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300">
                      <div>✔️ 3-Months Extension • Free Ethos T-shirt included</div>
                    </div>

                    <button
                      onClick={() => setSelectedRenewItem({ id: 102, title: 'Quarterly VIP Pass Renewal', price: 6500, type: 'Quarterly VIP Pass Renewal' })}
                      className="btn-blue w-full sm:w-auto text-xs py-3.5 px-8 font-extrabold uppercase tracking-wider"
                    >
                      Pay & Renew Quarterly (₹6,500)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PERFORMANCE METRICS */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Rhythm & Coordination Score</span>
                    <div className="text-5xl font-black text-[#D0FBF9] font-display">{studentInfo.rhythmScore}</div>
                    <div className="w-full bg-black rounded-full h-3 overflow-hidden">
                      <div className="bg-[#D0FBF9] h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Stage Confidence Rating</span>
                    <div className="text-5xl font-black text-[#D900FF] font-display">{studentInfo.stageConfidence}</div>
                    <div className="w-full bg-black rounded-full h-3 overflow-hidden">
                      <div className="bg-[#D900FF] h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-3">
                  <h3 className="text-xs font-extrabold uppercase text-[#FF0044] tracking-widest">Instructor Evaluation Notes:</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-serif italic border-l-4 border-[#FF0044] pl-4 py-2">
                    "{studentInfo.teacherNotes}"
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: PRIVATE MEMBER GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold uppercase text-white font-display">Private Class Rehearsals & Videos:</h3>
                  <span className="text-xs text-[#D0FBF9] font-bold uppercase">Logged-in Member Exclusive Access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="h-48 rounded-2xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 text-xs font-extrabold bg-black/80 text-white px-3 py-1 rounded-md">HipHop Rehearsal</span>
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 text-xs font-extrabold bg-black/80 text-white px-3 py-1 rounded-md">Bollywood Fusion Practice</span>
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 text-xs font-extrabold bg-black/80 text-white px-3 py-1 rounded-md">Stage Prep Clip</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: ACCOUNT PROFILE, AGE, PHOTO & PASSWORD RESET */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto bg-[#1A1A1A] p-8 rounded-3xl border border-[#262626] space-y-6">
                <h3 className="text-lg font-extrabold uppercase text-white font-display">Update Student Details & Profile Photo</h3>

                <div className="space-y-4 text-xs">
                  
                  {/* Photo Upload Box */}
                  <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-[#333333]">
                    <img src={studentInfo.profilePic} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#FF0044]" />
                    <div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className="px-4 py-2 bg-[#1F41FF] text-white text-xs font-extrabold uppercase rounded-xl flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Profile Pic</span>
                      </button>
                      <span className="text-[10px] text-slate-400 block mt-1">Supports JPG, PNG, WEBP</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Student Name</label>
                      <input
                        type="text"
                        value={studentInfo.name}
                        onChange={(e) => {
                          const updated = { ...studentInfo, name: e.target.value };
                          setStudentInfo(updated);
                          localStorage.setItem('ethos_logged_in_user', JSON.stringify(updated));
                        }}
                        className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Student Age</label>
                      <input
                        type="text"
                        value={studentInfo.age}
                        onChange={(e) => {
                          const updated = { ...studentInfo, age: e.target.value };
                          setStudentInfo(updated);
                          localStorage.setItem('ethos_logged_in_user', JSON.stringify(updated));
                        }}
                        className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Parent Name</label>
                      <input
                        type="text"
                        value={studentInfo.parentName}
                        onChange={(e) => {
                          const updated = { ...studentInfo, parentName: e.target.value };
                          setStudentInfo(updated);
                          localStorage.setItem('ethos_logged_in_user', JSON.stringify(updated));
                        }}
                        className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Parent Contact Number</label>
                      <input
                        type="text"
                        value={studentInfo.phone}
                        onChange={(e) => {
                          const updated = { ...studentInfo, phone: e.target.value };
                          setStudentInfo(updated);
                          localStorage.setItem('ethos_logged_in_user', JSON.stringify(updated));
                        }}
                        className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#262626]">
                    <button
                      onClick={handleResetPassword}
                      className="w-full py-4 bg-[#FF0044] hover:bg-[#e0003c] text-white font-extrabold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Key className="w-4 h-4" />
                      <span>Reset Account Password</span>
                    </button>
                  </div>

                  {showPasswordResetSuccess && (
                    <div className="p-3 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] text-xs font-bold rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Password reset link sent to registered email!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <Footer />

      {/* In-Portal Pass Renewal Payment Modal */}
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

      {/* Pass Renewal Confirmation Receipt */}
      {confirmedRenewal && (
        <ConfirmationReceiptModal
          registration={confirmedRenewal}
          onClose={() => setConfirmedRenewal(null)}
        />
      )}

    </div>
  );
}
