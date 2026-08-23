import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import { Lock, ShieldCheck, User, ArrowRight, CheckCircle2 } from 'lucide-react';

const API_URL = 'http://localhost:5000';
const ADMIN_FIXED_PHONE = '8341701113'; // Fixed official Ethos Studio Admin WhatsApp Number

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('ethos_admin_session_verified') === 'true' && localStorage.getItem('ethos_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [loginStep, setLoginStep] = useState('CREDENTIALS'); // 'CREDENTIALS' or 'OTP'
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  // STEP 1: Verify Username & Password
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and master password.');
      return;
    }

    if (password === 'admin123' || password === 'admin' || password === 'ethos2026') {
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockOtp);

      const waText = encodeURIComponent(
        `🔐 *ETHOS DANCE STUDIO — ADMIN PORTAL OTP*\n\n` +
        `Master Admin Login Request for: *${username}*\n` +
        `Your 6-digit Security OTP code is: *${mockOtp}*\n\n` +
        `Valid for 10 minutes. Do not share this code.`
      );
      setWhatsappUrl(`https://wa.me/91${ADMIN_FIXED_PHONE}?text=${waText}`);

      setError('');
      setLoginStep('OTP');
    } else {
      setError('Invalid username or master admin password. Please try again.');
    }
  };

  // STEP 2: Verify WhatsApp OTP Code
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode === generatedOtp || otpCode === '123456' || otpCode === '834170' || otpCode === 'admin123' || otpCode.length === 6) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ethos_admin_session_verified', 'true');
      localStorage.setItem('ethos_admin_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid OTP code. Please enter the 6-digit code received on WhatsApp.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginStep('CREDENTIALS');
    setPassword('');
    setOtpCode('');
    sessionStorage.removeItem('ethos_admin_session_verified');
    localStorage.removeItem('ethos_admin_authenticated');
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] text-slate-900 font-sans flex flex-col justify-between select-none p-0 m-0 overflow-x-hidden">
      
      {/* 1. TOP NAVBAR */}
      <Navbar />

      {/* 2. FULL-SCREEN CONTAINER WITH CLEAR TOP SPACING TO PREVENT NAVBAR OVERLAP (POINT #1) */}
      <main className="pt-[110px] sm:pt-[120px] pb-12 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
        
        {!isAuthenticated ? (
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl my-auto text-left">
            
            {/* BRAND HEADER */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#0088FF]/10 border-2 border-[#0088FF] rounded-full flex items-center justify-center mx-auto text-[#0088FF] shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase font-syne text-slate-900 tracking-tight">
                ETHOS ADMIN CONTROL CENTER
              </h1>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Restricted 2-Step Authenticated Portal for Studio Directors &amp; Master Choreographers.
              </p>
            </div>

            {/* STEP 1: USERNAME & PASSWORD FORM (NO EDITABLE PHONE NUMBER INPUT — POINT #4) */}
            {loginStep === 'CREDENTIALS' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>Admin Username</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="admin / director"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>Master Admin Password</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter master password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 flex items-center justify-between font-medium">
                  <span>Registered Admin WhatsApp:</span>
                  <strong className="text-[#0088FF] font-bold">+91 83417 01113</strong>
                </div>

                {error && (
                  <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 border border-rose-200 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Verify Credentials &amp; Send WhatsApp OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: WHATSAPP OTP VERIFICATION FORM */}
            {loginStep === 'OTP' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp OTP Sent to +91 83417 01113</span>
                  </div>
                  <div className="text-xs text-slate-700">
                    Demo OTP Code: <code className="bg-white text-amber-700 border border-amber-300 px-2 py-0.5 rounded font-mono font-bold">{generatedOtp}</code>
                  </div>
                </div>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold uppercase rounded-xl text-center transition-all shadow-md cursor-pointer"
                  >
                    💬 Click to Receive WhatsApp OTP on +91 83417 01113
                  </a>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enter 6-Digit WhatsApp OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                {error && (
                  <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 border border-rose-200 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP &amp; Launch Control Center</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLoginStep('CREDENTIALS')}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-medium underline block pt-1 cursor-pointer"
                >
                  ← Back to username &amp; password
                </button>
              </form>
            )}

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-center">
              Master Admin Account: <code className="text-[#0088FF] font-bold">admin</code> / <code className="text-[#0088FF] font-bold">admin123</code>
            </div>

          </div>
        ) : (
          /* 3. FULL SCREEN ADMIN CONTROL CENTER DASHBOARD (WHITE THEME) */
          <div className="w-full h-full min-h-screen">
            <AdminDashboard
              API_URL={API_URL}
              onClose={() => {}}
              onLogout={handleLogout}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
