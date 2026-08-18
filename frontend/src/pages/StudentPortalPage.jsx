import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Lock, Calendar, Award, Image, Settings, CheckCircle2, Key } from 'lucide-react';

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance', 'performance', 'gallery', 'profile'
  const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false);

  // Student Profile Data
  const [studentInfo, setStudentInfo] = useState({
    name: 'Aarav Reddy',
    parentName: 'Suresh Reddy',
    packageTitle: 'Monthly Adult/Kids Beginner Pass',
    totalClasses: 20,
    classesAttended: 12,
    classesLeft: 8,
    attendanceRate: '90%',
    rhythmScore: '94%',
    stageConfidence: '92%',
    teacherNotes: 'Aarav is performing exceptionally well in Hip-Hop isolations and Bollywood fusion sync. Highly recommended for the upcoming stage showcase!',
    email: 'student.aarav@ethosdance.com',
    phone: '+91 98765 12345'
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginId && password) {
      setIsLoggedIn(true);
    }
  };

  const handleResetPassword = () => {
    setShowPasswordResetSuccess(true);
    setTimeout(() => setShowPasswordResetSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans flex flex-col justify-between">
      
      <Navbar />

      <main className="pt-[76px] max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full flex-1">
        
        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-[#1F41FF] via-[#FF0044] to-[#D900FF] p-8 rounded-3xl mb-10 text-center text-white shadow-2xl uppercase font-display">
          <h1 className="text-3xl sm:text-5xl font-black font-display-giant">STUDENT & PARENT MEMBER PORTAL</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2 text-slate-100">
            Exclusive Portal for Monthly Package Members of Ethos Dance Studio
          </p>
        </div>

        {/* IF NOT LOGGED IN: SHOW FULL LOGIN PAGE */}
        {!isLoggedIn ? (
          <div className="bg-[#111111] border border-[#262626] rounded-3xl p-8 sm:p-12 max-w-md mx-auto space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#1F41FF]/20 border-2 border-[#1F41FF] rounded-full flex items-center justify-center mx-auto text-[#D0FBF9]">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black uppercase font-display text-white">MEMBER PORTAL LOGIN</h2>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Credentials are issued upon purchasing monthly packages. Log in to access your class balance, parent progress reports, and member gallery.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Student ID / Email</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ETHOS-MEMBER or email"
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
                  <span>Password reset link sent to your registered email!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#FF0044] hover:bg-[#e0003c] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-xl"
              >
                Log In to Member Dashboard
              </button>
            </form>

            <div className="p-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl text-[11px] text-slate-400 text-center space-y-1">
              <span className="font-bold text-white block uppercase">Demo Credentials:</span>
              <p>ID: <code className="text-[#D0FBF9]">ETHOS-MEMBER</code> | Password: <code className="text-[#D0FBF9]">ethos123</code></p>
            </div>
          </div>
        ) : (
          /* LOGGED IN MEMBER DASHBOARD */
          <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            
            {/* Student Welcome Header Banner */}
            <div className="bg-[#1A1A1A] border border-[#262626] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Student Avatar"
                  className="w-16 h-16 rounded-full border-2 border-[#FF0044] object-cover"
                />
                <div>
                  <h2 className="text-2xl font-extrabold uppercase text-white font-display">{studentInfo.name}</h2>
                  <p className="text-xs text-[#D0FBF9] font-bold uppercase">{studentInfo.packageTitle}</p>
                  <span className="text-xs text-slate-400 block mt-0.5">Parent Account: {studentInfo.parentName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#FF0044]/20 border border-[#FF0044] px-5 py-3 rounded-2xl text-center">
                  <span className="text-3xl font-black text-white font-display block leading-none">{studentInfo.classesLeft}</span>
                  <span className="text-[10px] font-extrabold uppercase text-[#FF0044]">Classes Left</span>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
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
                onClick={() => setActiveTab('performance')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'performance' ? 'bg-[#FF0044] text-white shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Parent & Student Performance</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'gallery' ? 'bg-[#D900FF] text-black shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Private Member Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'profile' ? 'bg-[#D0FBF9] text-black shadow-lg' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account & Reset Password</span>
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

            {/* TAB CONTENT 2: PERFORMANCE METRICS */}
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

            {/* TAB CONTENT 3: PRIVATE MEMBER GALLERY */}
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

            {/* TAB CONTENT 4: ACCOUNT PROFILE & PASSWORD RESET */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto bg-[#1A1A1A] p-8 rounded-3xl border border-[#262626] space-y-6">
                <h3 className="text-lg font-extrabold uppercase text-white font-display">Update Details & Reset Password</h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Student Name</label>
                    <input type="text" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Parent Contact Number</label>
                    <input type="text" value={studentInfo.phone} onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })} className="w-full bg-black border border-[#333333] rounded-xl px-4 py-3 text-white" />
                  </div>

                  <div className="pt-4 border-t border-[#262626]">
                    <button
                      onClick={handleResetPassword}
                      className="w-full py-4 bg-[#1F41FF] hover:bg-[#3353ff] text-white font-extrabold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg"
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

    </div>
  );
}
