import React from 'react';
import { ArrowLeft, Calendar, Star, Trophy, X, Sparkles } from 'lucide-react';

export default function ChoreographerDetailPage({ instructor, onBack, onBookWorkshop }) {
  if (!instructor) return null;

  const socials = instructor.socials || {
    instagram: 'https://instagram.com/ethosdancestudio',
    youtube: 'https://youtube.com/@ethosdancestudio',
    facebook: 'https://facebook.com/ethosdancestudio',
    twitter: 'https://twitter.com/ethosdancestudio'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      
      {/* 🌟 TOP NAVIGATION BAR: GO BACK TO MAIN MENU / CLOSE PROFILE 🌟 */}
      <div className="sticky top-0 z-[200] bg-slate-900 text-white border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back to Main Menu
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span>Ethos Faculty Profile</span> • <strong className="text-white uppercase font-syne">{instructor.name}</strong>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer transition-all border border-white/15"
        >
          <X className="w-4 h-4" /> Close Profile
        </button>
      </div>

      {/* 🌟 HERO BANNER 🌟 */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-8 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#0088FF]">
            Choreographer Details &amp; Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-syne uppercase tracking-tight text-white">
            {instructor.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
            {instructor.role} • {instructor.specialty}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-8 space-y-12 relative z-20">
        
        {/* 🌟 MAIN PROFILE CARD 🌟 */}
        <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* PORTRAIT PHOTO */}
            <div className="lg:col-span-4 flex flex-col items-center gap-4">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl relative group">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* SOCIAL MEDIA LINKS */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Facebook Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Twitter / X Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#E4405F] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#FF0000] hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* DETAILS & TIMINGS TABLE */}
            <div className="lg:col-span-8 space-y-6 text-slate-900">
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#0088FF]">
                  <Sparkles className="w-4 h-4" /> Official Ethos Faculty
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-syne uppercase text-slate-900">
                  {instructor.name}
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase">{instructor.role}</p>
              </div>

              {/* QUICK STATS & TIMINGS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Experience</span>
                  <span className="font-bold text-slate-900">{instructor.experienceYears || '7+ Years'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Specialty</span>
                  <span className="font-bold text-[#0088FF]">{instructor.specialty}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-bold text-slate-900">Ethos Kukatpally</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    4.9 ⭐ (32 Reviews)
                  </span>
                </div>
              </div>

              {/* BIO */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">About {instructor.name.split(' ')[0]}</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {instructor.bio || 'Leading choreography development, performance direction, contemporary fusion, and masterclass tours across India.'}
                </p>
              </div>

              {/* WEEKLY CLASS SCHEDULE */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Regular Batch Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-slate-800">Monday — Friday (Morning)</span>
                    <span className="text-[#0088FF] font-bold">07:30 AM – 09:00 AM</span>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-slate-800">Monday — Friday (Evening)</span>
                    <span className="text-[#0088FF] font-bold">07:00 PM – 08:30 PM</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4">
                <button
                  onClick={() => onBookWorkshop(instructor)}
                  className="px-8 py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white font-black uppercase text-xs rounded-2xl shadow-xl shadow-[#0088FF]/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Workshop with {instructor.name.split(' ')[0]}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 🌟 AWARDS & RECOGNITION 🌟 */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-lg text-center space-y-6">
          <h3 className="text-xl font-black uppercase font-syne text-slate-900">Awards &amp; Studio Recognition</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { title: 'Best Choreography', year: '2025 Winner' },
              { title: 'National Dance Fest', year: 'Gold Medal' },
              { title: 'Master Instructor', year: 'Certified 2024' },
              { title: 'Ethos Excellence', year: 'Faculty Award' }
            ].map((award, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase font-syne">{award.title}</h4>
                <span className="text-[10px] font-bold text-[#0088FF] uppercase block">{award.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 STUDENT SUCCESS STORIES 🌟 */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#0088FF] uppercase tracking-widest">Student Testimonials</span>
            <h3 className="text-2xl font-black uppercase font-syne text-slate-900">Student Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Dancing Is Creating A Sculpture', student: 'Ananya Sharma', comment: 'Learning under ' + instructor.name.split(' ')[0] + ' completely transformed my footwork and musicality.' },
              { title: 'Dance Is The Hidden Language', student: 'Vikram Reddy', comment: 'The energy in every masterclass is unmatched. Best studio training in Hyderabad!' },
              { title: 'Great Artists Are People', student: 'Priya Nambiar', comment: 'Clear step breakdowns, supportive feedback, and high-energy choreography routines.' }
            ].map((story, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-md space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-amber-500 flex items-center gap-1 text-xs">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <h4 className="text-base font-bold text-slate-900 uppercase font-syne">{story.title}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">"{story.comment}"</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs font-bold text-[#0088FF]">
                  — {story.student}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 BOTTOM NAVIGATION BAR 🌟 */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-black uppercase font-syne text-white">Finished Viewing Profile?</h3>
            <p className="text-xs text-slate-400 font-medium">Return to the main Ethos website to explore workshops, events, and masterclasses.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBack}
              className="px-6 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back to Main Menu
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer transition-all border border-white/20"
            >
              <X className="w-4 h-4" /> Close Profile &amp; Return Home
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
