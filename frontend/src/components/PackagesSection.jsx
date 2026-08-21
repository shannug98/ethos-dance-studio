import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, ShieldCheck, Sparkles, Award, Star, Video, ExternalLink, Clock } from 'lucide-react';

export default function PackagesSection({ onSelectPackage }) {
  const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 3, mins: 22, secs: 7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: prev.mins > 0 ? prev.mins - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ethosPackages = [
    {
      id: 403,
      title: 'Adults & Fitness Pass',
      price: 2500,
      billingCycle: 'month',
      type: 'Adults Pass',
      validity: 'Open Aug 1 - closes Aug 28, 2026. Join any time in the window.',
      timings: 'Mon - Fri: 7:30 AM & 8:00 PM | Sat - Sun: 4:00 PM',
      features: [
        'Class Schedule: Mon - Fri (7:30 AM & 8:00 PM | Sat-Sun 4:00 PM)',
        'Full batch schedule & video tutorials',
        'Senior choreographer feedback & review',
        'Stage performance video & certificate',
        'Free demo trial included'
      ],
      topPrize: '★ TOP PERK: Feature on Ethos Official Instagram & Solo Stage Spot',
      isPopular: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      handle: 'ethosdancestudio'
    },
    {
      id: 402,
      title: 'Kids Monthly Pass (4-12 Yrs)',
      price: 2000,
      billingCycle: 'month',
      type: 'Kids Pass',
      validity: 'Open Aug 1 - closes Aug 28, 2026. Join any time in the window.',
      timings: 'Mon - Fri: 5:00 PM & 7:00 PM | Sat - Sun: 5:00 PM',
      features: [
        'Class Schedule: Mon - Fri (5:00 PM & 7:00 PM | Sat-Sun 5:00 PM)',
        'Choice of 4-6 Yrs or 6-12 Yrs batches',
        'Monday - Friday regular sessions',
        'Kids showcase performance',
        'Regular parent feedback'
      ],
      topPrize: '★ TOP PERK: Stage Performance Certificate & Kids Trophy',
      isPopular: false,
      videoThumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      handle: 'ethoskidsdance'
    }
  ];

  return (
    <section id="packages" className="bg-[#FAF8F5] text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER SECTION MATCHING LIGHT CREAM THEME */}
        <div className="max-w-3xl mb-12 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] font-black uppercase rounded-full">
              • Open Now
            </span>
            <span className="px-3 py-1 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-black uppercase rounded-full">
              August Pass
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-slate-900">
            Spot the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] to-[#FF0055] italic font-serif">Unexpected.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Dance isn't about expensive gear — it's about learning to notice rhythm, mastering choreography, and capturing the moment on stage.
          </p>

          {/* STATS ROW */}
          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-2xl font-black font-syne text-[#0088FF]">₹2,000</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Monthly Entry</div>
            </div>
            <div className="border-l border-slate-300 pl-8">
              <div className="text-2xl font-black font-syne text-slate-900">28 days</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">To Learn &amp; Perform</div>
            </div>
            <div className="border-l border-slate-300 pl-8">
              <div className="text-2xl font-black font-syne text-[#FF0055]">Aug 2026</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Current Batch</div>
            </div>
          </div>

          {/* COUNTDOWN TIMER BAR */}
          <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">ENROLLMENT CLOSES IN</span>
              <span className="text-xs font-bold text-slate-900">Submit your registration before Aug 28</span>
            </div>

            <div className="flex items-center gap-3 font-mono font-bold text-xs text-slate-900 shrink-0">
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">{timeLeft.days}d</div>
              <div>:</div>
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">{timeLeft.hours}h</div>
              <div>:</div>
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">{timeLeft.mins}m</div>
              <div>:</div>
              <div className="bg-[#FF0055] text-white px-2.5 py-1.5 rounded-lg border border-[#FF0055] animate-pulse">{timeLeft.secs}s</div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN LARGE FEATURED PASS CARDS */}
        <div className="space-y-12">
          {ethosPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* LEFT CARD: REEL / DEMO VIDEO PREVIEW */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden group min-h-[460px] shadow-xl">
                <img
                  src={pkg.videoThumbnail}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-black/40 rounded-3xl"></div>

                <div className="relative z-10 flex items-center gap-3 p-2 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 max-w-fit">
                  <div className="w-8 h-8 rounded-full bg-[#0088FF] flex items-center justify-center font-bold text-xs text-white">
                    E
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{pkg.title}</h4>
                    <p className="text-[10px] text-slate-300">@{pkg.handle}</p>
                  </div>
                </div>

                <div className="relative z-10 flex justify-center items-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#FF0055] transition-all cursor-pointer shadow-2xl">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="relative z-10 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                    <Video className="w-4 h-4 text-[#00DFD8]" />
                    <span>Watch Batch Demo Reel</span>
                  </div>
                  <span className="text-[10px] text-[#00DFD8] font-bold uppercase tracking-wider">0:45 HD</span>
                </div>
              </div>

              {/* RIGHT CARD: PASS CHECKOUT CARD WITH BATCH TIMINGS */}
              <div className="lg:col-span-7 bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-200/60 rounded-3xl p-8 flex flex-col justify-between relative text-left">
                
                {pkg.isPopular && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3.5 py-1.5 bg-[#FF0055] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                      POPULAR BATCH
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-black text-[#FF0055] uppercase tracking-widest block mb-1">
                      {pkg.type}
                    </span>
                    <h3 className="text-3xl font-black font-syne text-slate-900 uppercase">
                      {pkg.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {pkg.validity}
                    </p>
                  </div>

                  {/* BATCH TIMINGS EMBEDDED DIRECTLY IN THE CARD */}
                  <div className="p-3.5 bg-[#EEF5FF] border border-[#0088FF]/30 rounded-2xl text-xs font-extrabold text-[#0088FF] flex items-center gap-2.5 shadow-sm">
                    <Clock className="w-4 h-4 text-[#0088FF] shrink-0" />
                    <span>TIMINGS: {pkg.timings}</span>
                  </div>

                  <div className="p-4 bg-[#FFF5F7] border border-[#FF0055]/30 rounded-2xl text-xs font-bold text-[#FF0055]">
                    {pkg.topPrize}
                  </div>

                  <div className="space-y-3 pt-1">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">WHAT'S INCLUDED:</h4>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-[#0088FF] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black font-syne text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-500 font-bold">/{pkg.billingCycle}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">✓ Includes taxes &amp; demo trial</span>
                  </div>

                  <button
                    onClick={() => onSelectPackage && onSelectPackage(pkg)}
                    className="py-4 px-8 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#0088FF]/30 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Register &amp; Pay ₹{pkg.price}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
