import React from 'react';
import { Sparkles, Trophy, Video, Star, Zap, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';

export default function TrainerLandingPage({ onApply, onCheckStatus, onOpenLogin, onOpenDashboard }) {
  const steps = [
    { num: '01', title: 'Apply Online', desc: 'Submit your personal details, dance styles, experience, and audition video link.' },
    { num: '02', title: 'Get Verified', desc: 'Ethos admin team reviews your application and dance audition video.' },
    { num: '03', title: 'Choose Your Pass', desc: 'Unlock Silver, Gold, or Diamond Pass for workshop access & studio support.' },
    { num: '04', title: 'Create Workshop', desc: 'Set your workshop topic, date, timing, max seats, and pricing.' },
    { num: '05', title: 'Teach & Collect Feedback', desc: 'Host your workshop at Ethos and collect verified student ratings.' },
    { num: '06', title: 'Tier Progression', desc: 'High performance scores automatically qualify you for Gold & Diamond upgrades.' }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pt-24 pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden font-sans">
      
      {/* Subtle Top Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-96 bg-gradient-to-b from-[#0088FF]/10 to-transparent pointer-events-none" />

      {/* FULL WIDTH CONTAINER (COVERING BLANK DESKTOP SPACE) */}
      <div className="max-w-[1400px] mx-auto space-y-16 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-[#0088FF] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Zap className="w-4 h-4 text-[#0088FF]" />
            Ethos Trainer Marketplace &amp; Performance Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 font-syne leading-tight">
            TEACH. INSPIRE. <br />
            <span className="text-[#0088FF]">
              GROW WITH ETHOS STUDIO.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Host Ethos-branded workshops, build your certified trainer profile, reach thousands of passionate dance students, and advance through Silver, Gold, and Diamond performance tiers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onApply}
              className="px-8 py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white font-black uppercase tracking-wider text-sm rounded-2xl shadow-xl shadow-[#0088FF]/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Apply as Ethos Trainer
            </button>

            <button
              onClick={onOpenLogin}
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4 text-[#0088FF]" /> Trainer Login
            </button>

            <button
              onClick={onCheckStatus}
              className="px-6 py-4 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold uppercase tracking-wider text-xs rounded-2xl transition-all shadow-sm cursor-pointer"
            >
              Check Application Status
            </button>

            <button
              onClick={() => onOpenDashboard(1)}
              className="px-6 py-4 bg-blue-100/70 hover:bg-blue-200/70 border border-blue-300 text-[#0088FF] font-bold uppercase tracking-wider text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" /> View Trainer Dashboard
            </button>
          </div>
        </div>

        {/* BENEFITS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-[#0088FF] transition-all space-y-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF] group-hover:scale-110 transition-transform shadow-xs">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold uppercase text-slate-900 font-syne">Silver / Gold / Diamond Tiers</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Earn higher visibility, homepage feature spots, and unlimited workshop slots as your verified student performance score grows.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-[#0088FF] transition-all space-y-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF] group-hover:scale-110 transition-transform shadow-xs">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold uppercase text-slate-900 font-syne">Video Audition Verification</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Submit your dance reel or video audition for quick Ethos Admin review and get official verification badge as an Ethos Trainer.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-[#0088FF] transition-all space-y-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF] group-hover:scale-110 transition-transform shadow-xs">
              <Star className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold uppercase text-slate-900 font-syne">Verified Student Ratings</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Collect verified ratings, teaching score breakdowns, and constructive feedback from students who attend your workshops.
            </p>
          </div>
        </div>

        {/* 🌟 6-STEP TRUE ZIGZAG TIMELINE ROADMAP (STEP 1 LEFT, STEP 2 RIGHT, STEP 3 LEFT...) 🌟 */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold uppercase text-[#0088FF] tracking-widest">Interactive Roadmap</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-slate-900 font-syne">Your Trainer Journey in 6 Simple Steps</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Vertical Timeline Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#0088FF] via-blue-400 to-indigo-600 rounded-full z-0" />

            {/* Alternating Row-by-Row Zigzag Grid */}
            <div className="space-y-8 md:space-y-12 relative z-10">
              {steps.map((step, idx) => {
                const isLeft = idx % 2 === 0; // Step 1 (idx 0), Step 3 (idx 2), Step 5 (idx 4) -> LEFT
                return (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 items-center relative">
                    
                    {/* Node Dot Badge on Central Axis (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0088FF] text-white font-black text-xs items-center justify-center border-4 border-[#F1F5F9] shadow-lg z-20">
                      {step.num}
                    </div>

                    {/* Left Column (Row isLeft = true) */}
                    {isLeft ? (
                      <div className="md:pr-12">
                        <div className="bg-white border-2 border-slate-200 hover:border-[#0088FF] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-2 text-left md:text-right">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-[#0088FF] border border-blue-200 text-xs font-black uppercase rounded-full">
                            Step {step.num}
                          </span>
                          <h4 className="text-lg font-black font-syne uppercase text-slate-900">{step.title}</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block" /> /* Empty Spacer Column for Right steps */
                    )}

                    {/* Right Column (Row isLeft = false) */}
                    {!isLeft ? (
                      <div className="md:pl-12">
                        <div className="bg-white border-2 border-slate-200 hover:border-[#0088FF] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-2 text-left">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-[#0088FF] border border-blue-200 text-xs font-black uppercase rounded-full">
                            Step {step.num}
                          </span>
                          <h4 className="text-lg font-black font-syne uppercase text-slate-900">{step.title}</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block" /> /* Empty Spacer Column for Left steps */
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CALL TO ACTION CARD */}
        <div className="p-10 rounded-3xl bg-slate-900 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0088FF]/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-black uppercase text-white font-syne">Ready to Become an Ethos Trainer?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-medium">Join Hyderabad's premier dance choreography platform and take your dance career to the next level.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={onApply}
              className="px-8 py-4 bg-[#0088FF] text-white hover:bg-[#0077EE] font-black uppercase tracking-wider text-sm rounded-2xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Start Your Application <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenLogin}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-2xl transition-all cursor-pointer flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Trainer Portal Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
