import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, ShieldCheck, Sparkles, Award, Star, Video, ExternalLink } from 'lucide-react';

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
      features: [
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
      features: [
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
    <section id="packages" className="bg-[#090A0F] text-white py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER SECTION MATCHING IMG 1 */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#00DFD8]/20 border border-[#00DFD8]/40 text-[#00DFD8] text-[10px] font-black uppercase rounded-full">
              • Open Now
            </span>
            <span className="px-3 py-1 bg-[#7928CA]/20 border border-[#7928CA]/40 text-[#7928CA] text-[10px] font-black uppercase rounded-full">
              August Pass
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-white">
            Spot the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DFD8] to-[#FF0055] italic">Unexpected.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            Dance isn't about expensive gear — it's about learning to notice rhythm, mastering choreography, and capturing the moment on stage.
          </p>

          {/* STATS ROW */}
          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-2xl font-black font-syne text-[#00DFD8]">₹2,000</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Monthly Entry</div>
            </div>
            <div className="border-l border-white/10 pl-8">
              <div className="text-2xl font-black font-syne text-white">28 days</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">To Learn & Perform</div>
            </div>
            <div className="border-l border-white/10 pl-8">
              <div className="text-2xl font-black font-syne text-[#FF0055]">Aug 2026</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Current Batch</div>
            </div>
          </div>

          {/* COUNTDOWN TIMER BAR */}
          <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">ENROLLMENT CLOSES IN</span>
              <span className="text-xs font-bold text-white">Submit your registration before Aug 28</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                <div className="text-lg font-black font-syne text-[#00DFD8]">{timeLeft.days}</div>
                <div className="text-[8px] text-slate-400 uppercase font-bold">DAYS</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                <div className="text-lg font-black font-syne text-[#00DFD8]">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-400 uppercase font-bold">HRS</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                <div className="text-lg font-black font-syne text-[#00DFD8]">{String(timeLeft.mins).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-400 uppercase font-bold">MIN</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                <div className="text-lg font-black font-syne text-[#FF0055]">{String(timeLeft.secs).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-400 uppercase font-bold">SEC</div>
              </div>
            </div>
          </div>

        </div>

        {/* CARDS GRID MATCHING IMG 1 */}
        <div className="space-y-16">
          {ethosPackages.map((pkg) => (
            <div key={pkg.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT CARD: REEL / VIDEO PREVIEW CARD */}
              <div className="lg:col-span-5 bg-[#12131A] border border-white/10 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden group min-h-[460px]">
                <img
                  src={pkg.videoThumbnail}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-black/40 rounded-3xl"></div>

                {/* Top User Bar */}
                <div className="relative z-10 flex items-center gap-3 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-fit">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF0055] to-[#7928CA] flex items-center justify-center font-bold text-xs text-white">
                    E
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{pkg.title}</h4>
                    <p className="text-[10px] text-slate-300">@{pkg.handle}</p>
                  </div>
                </div>

                {/* Center Play Button */}
                <div className="relative z-10 flex justify-center items-center my-auto">
                  <button className="w-16 h-16 rounded-full bg-[#FF0055] text-white flex items-center justify-center shadow-2xl shadow-[#FF0055]/50 group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </button>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-slate-200">Ethos Studio Showcase Reel</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* RIGHT CARD: CHECKOUT & BENEFIT CARD MATCHING IMG 1 */}
              <div className="lg:col-span-7 bg-[#12131A] border border-white/15 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                
                <div>
                  {/* Price Banner */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black font-syne text-white">₹{pkg.price}</span>
                    <span className="text-xs text-slate-400 font-bold uppercase">/ {pkg.billingCycle}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium mb-6">
                    {pkg.validity}
                  </p>

                  {/* Buttons */}
                  <div className="space-y-3 mb-8">
                    <button
                      onClick={() => onSelectPackage && onSelectPackage({ id: pkg.id, title: pkg.title, price: pkg.price, type: pkg.type })}
                      className="w-full py-4 bg-[#00DFD8] hover:bg-[#00DFD8]/90 text-black text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#00DFD8]/20 flex items-center justify-center gap-2"
                    >
                      <span>Register & Pay ₹{pkg.price}</span>
                      <span>→</span>
                    </button>

                    <button
                      onClick={() => onSelectPackage && onSelectPackage({ id: 401, title: 'Free Demo Trial Pass', price: 0, type: 'Free Trial' })}
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>Book Free Demo Trial</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Checkmark Feature List */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#00DFD8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Top Prize Box */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
                    <div className="text-[10px] font-extrabold text-[#00DFD8] uppercase tracking-wider mb-1">
                      {pkg.topPrize.split(':')[0]}
                    </div>
                    <div className="text-xs font-bold text-white">
                      {pkg.topPrize.split(':')[1]}
                    </div>
                  </div>
                </div>

                {/* Footer Caption */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00DFD8]" />
                  <span>Secure payment - UPI, Credit/Debit Card & Netbanking</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
