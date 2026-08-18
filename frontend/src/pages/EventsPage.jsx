import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { Camera, Sparkles, Palette, Smartphone, Lightbulb, Dices, Lock, Bell, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:5000';

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
      ribbon: 'OPEN NOW',
      title: 'Hip-Hop & Choreography',
      subtext: '• World Dance Day - Aug 19',
      desc: "See the world differently. This month's challenge is all about observation, storytelling, and capturing moments that others might overlook.",
      daysLeft: '14 days left',
      price: 199,
      status: 'open',
      icon: Camera,
      btnText: 'Register →'
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
      price: 199,
      status: 'upcoming',
      icon: Sparkles,
      btnText: 'Remind me'
    },
    {
      id: 303,
      month: 'OCTOBER',
      pill: '⚪ COMING OCT',
      title: 'Bollywood Fusion & Sangeet',
      subtext: '• International Artist Day - Oct 25',
      desc: 'Create something that\'s unmistakably yours. Experiment with artistic expression, materials, and ideas as you take on this month\'s art challenge.',
      status: 'locked',
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
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5533]/10 border border-[#FF5533]/30 text-[#FF5533] text-[10px] font-black uppercase rounded-full tracking-wider">
            <span>• THE 2026-27 LINE-UP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-slate-900 leading-[1.05]">
            SIX MONTHS. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5533] via-[#7928CA] to-[#0088FF] italic font-serif">
              Six ways to make your mark.
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Each challenge unlocks on the 1st of its month. Peek at what's coming — then jump in the moment it opens.
          </p>

          {/* HORIZONTAL MONTH TIMELINE TRACK MATCHING SCREENSHOT */}
          <div className="pt-8 pb-4 flex items-center justify-center max-w-xl mx-auto">
            <div className="flex items-center justify-between w-full relative">
              {/* Connecting Line */}
              <div className="absolute top-3 left-6 right-6 h-0.5 bg-slate-300 -z-0"></div>

              {monthsTimeline.map((m, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    m.active 
                      ? 'bg-[#FF5533] ring-4 ring-[#FF5533]/30 text-white shadow-md' 
                      : 'bg-white border border-slate-300 text-slate-500'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${m.active ? 'bg-white' : 'bg-slate-400'}`}></div>
                  </div>
                  <span className={`text-xs font-extrabold uppercase ${m.active ? 'text-[#FF5533]' : 'text-slate-500'}`}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-COLUMN EVENT CARDS GRID WITH COHESIVE LIGHT CARD DESIGN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsList.map((evt) => {
              const IconComponent = evt.icon;
              const isOpen = evt.status === 'open';
              const isUpcoming = evt.status === 'upcoming';
              const isLocked = evt.status === 'locked';

              return (
                <div
                  key={evt.id}
                  className={`bg-white text-slate-900 border rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl shadow-slate-200/60 ${
                    isOpen 
                      ? 'border-[#0088FF]/50 ring-2 ring-[#0088FF]/10' 
                      : isUpcoming
                      ? 'border-[#FF5533]/40'
                      : 'border-slate-200 opacity-90'
                  }`}
                >
                  {/* Ribbons / Status Badges */}
                  {evt.ribbon && (
                    <div className="absolute top-6 -right-10 rotate-45 bg-[#0088FF] text-white text-[9px] font-black uppercase px-10 py-1 shadow-md tracking-wider">
                      {evt.ribbon}
                    </div>
                  )}

                  <div>
                    {/* Top Status Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                        isOpen 
                          ? 'bg-[#0088FF]/10 border-[#0088FF]/30 text-[#0088FF]' 
                          : isUpcoming 
                          ? 'bg-[#FF5533]/10 border-[#FF5533]/30 text-[#FF5533]'
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
                    <span className="text-xs font-black uppercase tracking-wider text-[#FF5533] block mb-1">
                      {evt.month}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-2xl font-black font-syne text-slate-900 uppercase mb-1">
                      {evt.title}
                    </h3>

                    {/* Subtext Bullet */}
                    <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide mb-4">
                      {evt.subtext}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Footer / CTA Area */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    
                    {/* Countdown box for upcoming */}
                    {isUpcoming && evt.timer && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-center">
                        <div className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                          <div className="text-sm font-black text-slate-900">{evt.timer.days}</div>
                          <div className="text-[7px] text-slate-500 font-bold uppercase">DAYS</div>
                        </div>
                        <div className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                          <div className="text-sm font-black text-slate-900">{evt.timer.hrs}</div>
                          <div className="text-[7px] text-slate-500 font-bold uppercase">HRS</div>
                        </div>
                        <div className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                          <div className="text-sm font-black text-slate-900">{evt.timer.min}</div>
                          <div className="text-[7px] text-slate-500 font-bold uppercase">MIN</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {isOpen && (
                        <>
                          <span className="text-xs font-extrabold text-slate-500">{evt.daysLeft}</span>
                          <span className="text-base font-black text-slate-900 font-syne">₹{evt.price}</span>
                        </>
                      )}

                      {isUpcoming && (
                        <>
                          <span className="text-xs font-bold text-slate-500">{evt.liveTill}</span>
                          <span className="text-base font-black text-slate-900 font-syne">₹{evt.price}</span>
                        </>
                      )}

                      {isLocked && (
                        <span className="text-xs font-bold text-slate-500">Unlocks soon</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (isOpen || isUpcoming) {
                          setSelectedItemForBooking(evt);
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
                      <span>{evt.btnText}</span>
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
