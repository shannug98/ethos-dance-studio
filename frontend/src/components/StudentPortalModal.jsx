import React, { useState } from 'react';
import { X, User, Lock, Calendar, Award, Image, Settings, CheckCircle2, AlertCircle, RefreshCw, Key } from 'lucide-react';

export default function StudentPortalModal({ onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      <div className="bg-[#111111] border-2 border-[#333333] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-white my-8 relative">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#1F41FF] via-[#FF0044] to-[#D900FF] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight text-white">
                ETHOS MEMBER & PARENT PORTAL
              </h2>
              <p className="text-[10px] sm:text-xs font-bold text-slate-200 tracking-wider uppercase">
                Exclusive Dashboard for Monthly Package Members
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-black text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* IF NOT LOGGED IN: SHOW LOGIN FORM */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#1F41FF]/20 border-2 border-[#1F41FF] rounded-full flex items-center justify-center mx-auto text-[#D0FBF9]">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase font-display text-white">STUDENT / PARENT LOGIN</h3>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Credentials are issued upon purchasing monthly packages. Enter your Student ID / Email and password below.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Student ID / Email</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ETHOS-M2026 or email"
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
                Access Member Portal
              </button>
            </form>

            <div className="p-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl text-[11px] text-slate-400 text-center space-y-1">
              <span className="font-bold text-white block uppercase">Demo Member Access:</span>
              <p>ID: <code className="text-[#D0FBF9]">ETHOS-MEMBER</code> | Password: <code className="text-[#D0FBF9]">ethos123</code></p>
            </div>
          </div>
        ) : (
          /* LOGGED IN MEMBER DASHBOARD */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Student Welcome Banner */}
            <div className="bg-[#1A1A1A] border border-[#262626] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Student Avatar"
                  className="w-14 h-14 rounded-full border-2 border-[#FF0044] object-cover"
                />
                <div>
                  <h3 className="text-xl font-extrabold uppercase text-white font-display">{studentInfo.name}</h3>
                  <p className="text-xs text-[#D0FBF9] font-bold uppercase">{studentInfo.packageTitle}</p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Parent Account: {studentInfo.parentName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#FF0044]/20 border border-[#FF0044] px-4 py-2 rounded-xl text-center">
                  <span className="text-2xl font-black text-white font-display block leading-none">{studentInfo.classesLeft}</span>
                  <span className="text-[9px] font-extrabold uppercase text-[#FF0044]">Classes Left</span>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Portal Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#262626] pb-4">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'attendance' ? 'bg-[#1F41FF] text-white' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Attendance & Classes ({studentInfo.classesLeft} Left)</span>
              </button>

              <button
                onClick={() => setActiveTab('performance')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'performance' ? 'bg-[#FF0044] text-white' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Parent & Student Performance</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'gallery' ? 'bg-[#D900FF] text-black' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Private Member Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'profile' ? 'bg-[#D0FBF9] text-black' : 'bg-[#1A1A1A] text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account & Reset Password</span>
              </button>
            </div>

            {/* TAB CONTENT 1: ATTENDANCE & CLASSES */}
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-[#262626] text-center">
                    <span className="text-3xl font-black text-white font-display block">{studentInfo.totalClasses}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Total Package Classes</span>
                  </div>

                  <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-[#262626] text-center">
                    <span className="text-3xl font-black text-[#25D366] font-display block">{studentInfo.classesAttended}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Classes Attended</span>
                  </div>

                  <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-[#FF0044] text-center">
                    <span className="text-3xl font-black text-[#FF0044] font-display block">{studentInfo.classesLeft}</span>
                    <span className="text-xs font-bold text-white uppercase">Remaining Classes</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-3">
                  <h4 className="text-sm font-extrabold uppercase text-white font-display">Upcoming Scheduled Batches:</h4>
                  <div className="space-y-2 text-xs font-semibold text-slate-300">
                    <div className="p-3 bg-[#111111] rounded-xl flex items-center justify-between border border-[#222222]">
                      <span>🗓️ Wednesday (Tomorrow) • 06:00 PM - 07:00 PM</span>
                      <span className="text-[#25D366] font-bold">Confirmed Slot</span>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-xl flex items-center justify-between border border-[#222222]">
                      <span>🗓️ Friday • 06:00 PM - 07:00 PM</span>
                      <span className="text-[#25D366] font-bold">Confirmed Slot</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PERFORMANCE METRICS */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Rhythm & Coordination Score</span>
                    <div className="text-4xl font-black text-[#D0FBF9] font-display">{studentInfo.rhythmScore}</div>
                    <div className="w-full bg-black rounded-full h-2 overflow-hidden">
                      <div className="bg-[#D0FBF9] h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Stage Confidence Rating</span>
                    <div className="text-4xl font-black text-[#D900FF] font-display">{studentInfo.stageConfidence}</div>
                    <div className="w-full bg-black rounded-full h-2 overflow-hidden">
                      <div className="bg-[#D900FF] h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626] space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-[#FF0044] tracking-widest">Instructor Evaluation Notes:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif italic border-l-2 border-[#FF0044] pl-4 py-1">
                    "{studentInfo.teacherNotes}"
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PRIVATE MEMBER GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase text-white font-display">Private Class Rehearsals & Videos:</h4>
                  <span className="text-[10px] text-[#D0FBF9] font-bold uppercase">Member Exclusive Access</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="h-40 rounded-xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-black/80 text-white px-2 py-0.5 rounded">HipHop Rehearsal</span>
                  </div>
                  <div className="h-40 rounded-xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-black/80 text-white px-2 py-0.5 rounded">Bollywood Practice</span>
                  </div>
                  <div className="h-40 rounded-xl overflow-hidden bg-black border border-[#333333] relative group">
                    <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-black/80 text-white px-2 py-0.5 rounded">Stage Prep Clip</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: ACCOUNT PROFILE & PASSWORD RESET */}
            {activeTab === 'profile' && (
              <div className="space-y-4 max-w-lg mx-auto bg-[#1A1A1A] p-6 rounded-2xl border border-[#262626]">
                <h4 className="text-sm font-extrabold uppercase text-white font-display mb-4">Update Profile & Reset Password</h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Student Name</label>
                    <input type="text" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} className="w-full bg-black border border-[#333333] rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Parent Contact Number</label>
                    <input type="text" value={studentInfo.phone} onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })} className="w-full bg-black border border-[#333333] rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div className="pt-3 border-t border-[#262626]">
                    <button
                      onClick={handleResetPassword}
                      className="w-full py-3 bg-[#1F41FF] hover:bg-[#3353ff] text-white font-extrabold uppercase rounded-xl flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Reset Account Password</span>
                    </button>
                  </div>

                  {showPasswordResetSuccess && (
                    <div className="p-3 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] text-xs font-bold rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Password reset link sent to your registered email!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
