import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { Camera, Sparkles, Palette, Smartphone, Lightbulb, Dices, Lock, Bell, ArrowRight, ShieldCheck, Ticket, Flame } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export function getEventPricingTier(ticketsSold = 6) {
  if (ticketsSold < 10) {
    return {
      currentPrice: 549,
      tierName: 'Tier 1 • Early Bird (First 10)',
      ticketsSoldInTier: ticketsSold,
      tierLimit: 10,
      nextPrice: 649,
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
      activeTierIndex: 1
    };
  } else if (ticketsSold < 20) {
    return {
      currentPrice: 649,
      tierName: 'Tier 2 • Phase 2 (Next 10)',
      ticketsSoldInTier: ticketsSold - 10,
      tierLimit: 10,
      nextPrice: 749,
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
      activeTierIndex: 2
    };
  } else if (ticketsSold < 30) {
    return {
      currentPrice: 749,
      tierName: 'Tier 3 • Phase 3 (Next 10)',
      ticketsSoldInTier: ticketsSold - 20,
      tierLimit: 10,
      nextPrice: 799,
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
      activeTierIndex: 3
    };
  } else {
    return {
      currentPrice: 799,
      tierName: 'Tier 4 • On-Door Standard',
      ticketsSoldInTier: ticketsSold - 30,
      tierLimit: 50,
      nextPrice: null,
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      activeTierIndex: 4
    };
  }
}

export default function EventsPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  const monthsTimeline = [
    { name: 'Aug', active: true, status: 'Live Now' },
    { name: 'Sep', active: false, status: 'Opens Sep 1' },
    { name: 'Oct', active: false, status: 'Oct 1' },
    { name: 'Nov', active: false, status: 'Nov 1' },
    { name: 'Dec', active: false, status: 'Dec 1' },
    { name: 'Jan', active: false, status: 'Jan 1' }
  ];

  const eventsList = [
    {
      id: 301,
      month: 'AUGUST • LIVE',
      pill: '🟢 OPEN NOW',
      ribbon: 'EARLY BIRD TIER 1',
      title: 'Hip-Hop & Choreography',
      subtext: '• World Dance Day Masterclass - Aug 19',
      desc: "See the world differently. This month's challenge is all about observation, storytelling, speed isolations, and capturing stage moments.",
      daysLeft: '14 days left',
      ticketsSold: 7, // 7 out of first 10 claimed -> Active Tier 1 = ₹549
      status: 'open',
      icon: Camera,
      btnText: 'Register for ₹549 →'
    },
    {
      id: 302,
      month: 'SEPTEMBER',
      pill: '🟡 OPENS SEP 1',
      title: 'Contemporary & Floorwork',
      subtext: '• National Dance Month - Sep 25',
      desc: 'Every great story begins somewhere. Explore the world of movement through imagination, characters, and visual storytelling in this month\'s creative challenge.',
      timer: { days: 13, hrs: 3, min: 21 },
      liveTill: 'Then live till Sep 28',
      ticketsSold: 0,
      status: 'upcoming',
      icon: Sparkles,
      btnText: 'Remind me (Tier 1 ₹549)'
    },
    {
      id: 303,
      month: 'OCTOBER',
      pill: '⚪ COMING OCT',
      title: 'Bollywood Fusion & Sangeet',
      subtext: '• International Artist Day - Oct 25',
      desc: 'Create something that\'s unmistakably yours. Experiment with artistic expression, materials, and ideas as you take on this month\'s art challenge.',
      status: 'locked',
      ticketsSold: 0,
      icon: Palette,
      btnText: '🔒 Unlocks Oct 1'
    },
    {
      id: 304,
      month: 'NOVEMBER',
      pill: '⚪ COMING NOV',
      title: 'Heels & Stage Performance',
      subtext: '• International Students\' Day - Nov 17',
      desc: 'Performance begins with understanding rhythm. Step into the world of stage presence and discover how dance brings music to life.',
      status: 'locked',
      ticketsSold: 0,
      icon: Smartphone,
      btnText: '🔒 Unlocks Nov 1'
    },
    {
      id: 305,
      month: 'DECEMBER',
      pill: '⚪ COMING DEC',
      title: 'Social Impact Flashmob',
      subtext: '• Intl Volunteer Day - Dec 5',
      desc: 'The best routines solve real challenges. Work on a meaningful group dance inspired by real-world issues and discover how creativity can create positive impact.',
      status: 'locked',
      ticketsSold: 0,
      icon: Lightbulb,
      btnText: '🔒 Unlocks Dec 1'
    },
    {
      id: 306,
      month: 'JANUARY',
      pill: '⚪ COMING JAN',
      title: 'Street Style & House Battle',
      subtext: '• World Logic & Groove Day - Jan 14',
      desc: 'Great freestyle battles are designed, not discovered. Explore the art of gameplay, strategy, and creative thinking in this month\'s challenge.',
      status: 'locked',
      ticketsSold: 0,
      icon: Dices,
      btnText: '🔒 Unlocks Jan 1'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px] pb-24">
        
        {/* HEADER SECTION MATCHING ORIGINAL SCREENSHOT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-10 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-black uppercase rounded-full tracking-wider">
            <span>• DYNAMIC TIERED EARLY-BIRD PRICING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-slate-900 leading-[1.05]">
            SIX MONTHS. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] italic font-serif">
              Six ways to make your mark.
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Early birds save big! First 10 tickets for <strong>₹549</strong> (all taxes included). Prices increase as slots fill up.
          </p>

          {/* HORIZONTAL MONTH TIMELINE TRACK */}
          <div className="pt-8 pb-4 flex items-center justify-center max-w-xl mx-auto">
            <div className="flex items-center justify-between w-full relative">
              <div className="absolute top-3 left-6 right-6 h-0.5 bg-slate-300 -z-0"></div>

              {monthsTimeline.map((m, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    m.active 
                      ? 'bg-[#FF0055] ring-4 ring-[#FF0055]/30 text-white shadow-md' 
                      : 'bg-white border border-slate-300 text-slate-500'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${m.active ? 'bg-white' : 'bg-slate-400'}`}></div>
                  </div>
                  <span className={`text-xs font-extrabold uppercase ${m.active ? 'text-[#FF0055]' : 'text-slate-500'}`}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-COLUMN EVENT CARDS GRID WITH DYNAMIC TIERED PRICING BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsList.map((evt) => {
              const IconComponent = evt.icon;
              const isOpen = evt.status === 'open';
              const isUpcoming = evt.status === 'upcoming';
              const isLocked = evt.status === 'locked';

              const tierInfo = getEventPricingTier(evt.ticketsSold || 0);

              return (
                <div
                  key={evt.id}
                  className={`bg-white text-slate-900 border rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl shadow-slate-200/60 ${
                    isOpen 
                      ? 'border-[#0088FF]/50 ring-2 ring-[#0088FF]/10' 
                      : isUpcoming
                      ? 'border-[#FF0055]/40'
                      : 'border-slate-200 opacity-90'
                  }`}
                >
                  {/* Ribbon */}
                  {evt.ribbon && (
                    <div className="absolute top-6 -right-10 rotate-45 bg-[#FF0055] text-white text-[9px] font-black uppercase px-10 py-1 shadow-md tracking-wider z-10">
                      {evt.ribbon}
                    </div>
                  )}

                  <div>
                    {/* Top Status Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                        isOpen 
                          ? 'bg-[#0088FF]/10 border-[#0088FF]/30 text-[#0088FF]' 
                          : isUpcoming 
                          ? 'bg-[#FF0055]/10 border-[#FF0055]/30 text-[#FF0055]'
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        {evt.pill}
                      </span>

                      {/* Icon Box */}
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                        <IconComponent className="w-5 h-5 text-[#0088FF]" />
                      </div>
                    </div>

                    {/* Month Category Header */}
                    <span className="text-xs font-black uppercase tracking-wider text-[#FF0055] block mb-1">
                      {evt.month}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-2xl font-black font-syne text-slate-900 uppercase mb-1">
                      {evt.title}
                    </h3>

                    {/* Subtext Bullet */}
                    <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide mb-3">
                      {evt.subtext}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-5">
                      {evt.desc}
                    </p>

                    {/* 🎟️ DYNAMIC TIERED PRICING BREAKDOWN BOX */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 mb-4">
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 border text-[10px] font-black uppercase rounded-full ${tierInfo.badgeColor}`}>
                          ⚡ Active: {tierInfo.tierName}
                        </span>
                        <div className="text-right">
                          <span className="text-xl font-black font-syne text-slate-900">₹{tierInfo.currentPrice}</span>
                          <span className="text-[9px] font-bold text-slate-500 block">Inc. all taxes</span>
                        </div>
                      </div>

                      {/* Progress Bar for Active Tier */}
                      {isOpen && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>Tickets Claimed in Tier 1:</span>
                            <span className="text-[#FF0055] font-black">{tierInfo.ticketsSoldInTier} / {tierInfo.tierLimit}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#FF0055] to-[#0088FF] rounded-full transition-all duration-500"
                              style={{ width: `${(tierInfo.ticketsSoldInTier / tierInfo.tierLimit) * 100}%` }}
                            />
                          </div>
                          {tierInfo.nextPrice && (
                            <span className="text-[9px] text-slate-500 font-semibold block text-right pt-0.5">
                              Next 10 tickets jump to <strong>₹{tierInfo.nextPrice}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Visual Tier Schedule Grid */}
                      <div className="pt-2 border-t border-slate-200/80 grid grid-cols-4 gap-1.5 text-center text-[9px] font-bold">
                        <div className={`p-1.5 rounded-lg border ${tierInfo.activeTierIndex === 1 ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}>
                          <div>1-10</div>
                          <div className="font-black">₹549</div>
                        </div>
                        <div className={`p-1.5 rounded-lg border ${tierInfo.activeTierIndex === 2 ? 'bg-blue-500 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}>
                          <div>11-20</div>
                          <div className="font-black">₹649</div>
                        </div>
                        <div className={`p-1.5 rounded-lg border ${tierInfo.activeTierIndex === 3 ? 'bg-purple-500 text-white border-purple-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}>
                          <div>21-30</div>
                          <div className="font-black">₹749</div>
                        </div>
                        <div className={`p-1.5 rounded-lg border ${tierInfo.activeTierIndex === 4 ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}>
                          <div>31+</div>
                          <div className="font-black">₹799</div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Footer / CTA Area */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={() => {
                        if (isOpen || isUpcoming) {
                          setSelectedItemForBooking({
                            ...evt,
                            price: tierInfo.currentPrice,
                            type: `Event Pass (${tierInfo.tierName})`
                          });
                        }
                      }}
                      disabled={isLocked}
                      className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isOpen 
                          ? 'bg-[#0088FF] hover:bg-[#0077EE] text-white shadow-lg shadow-[#0088FF]/30' 
                          : isUpcoming 
                          ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      <span>{isOpen ? `Register for ₹${tierInfo.currentPrice} →` : evt.btnText}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>

      <Footer onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL={API_URL}
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={(data) => {
            setSelectedItemForBooking(null);
            setConfirmedRegistration(data);
          }}
        />
      )}

      {confirmedRegistration && (
        <ConfirmationReceiptModal
          registration={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

    </div>
  );
}
