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
    <div className="min-h-screen bg-[#090A0F] text-white font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px] pb-24">
        
        {/* HEADER SECTION MATCHING IMG 2 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 pb-12 text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-white">
            SIX MONTHS. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#00DFD8] italic">
              Six ways to make your mark.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Each challenge unlocks on the 1st of its month. Peek at what's coming — then jump in the moment it opens.
          </p>

          {/* HORIZONTAL MONTH TIMELINE TRACK MATCHING IMG 2 */}
          <div className="pt-8 pb-4 flex items-center justify-center max-w-xl mx-auto">
            <div className="flex items-center justify-between w-full relative">
              {/* Connecting Line */}
              <div className="absolute top-3 left-6 right-6 h-0.5 bg-white/15 -z-0"></div>

              {monthsTimeline.map((m, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    m.active 
                      ? 'bg-[#FF0055] ring-4 ring-[#FF0055]/30' 
                      : 'bg-[#12131A] border border-white/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${m.active ? 'bg-white' : 'bg-slate-400'}`}></div>
                  </div>
                  <span className={`text-xs font-extrabold uppercase ${m.active ? 'text-[#FF0055]' : 'text-slate-400'}`}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-COLUMN EVENT CARDS GRID MATCHING IMG 2 */}
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
                  className={`bg-[#12131A] border rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#00DFD8]/50 shadow-2xl shadow-[#00DFD8]/10 hover:border-[#00DFD8]' 
                      : isUpcoming
                      ? 'border-[#FF0055]/40 hover:border-[#FF0055]'
                      : 'border-white/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Ribbons / Status Badges */}
                  {evt.ribbon && (
                    <div className="absolute top-6 -right-10 rotate-45 bg-[#00DFD8] text-black text-[9px] font-black uppercase px-10 py-1 shadow-md tracking-wider">
                      {evt.ribbon}
                    </div>
                  )}

                  <div>
                    {/* Top Status Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                        isOpen 
                          ? 'bg-[#00DFD8]/20 border-[#00DFD8]/40 text-[#00DFD8]' 
                          : isUpcoming 
                          ? 'bg-[#FF0055]/20 border-[#FF0055]/40 text-[#FF0055]'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}>
                        {evt.pill}
                      </span>

                      {/* Icon Box */}
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <IconComponent className="w-5 h-5 text-[#00DFD8]" />
                      </div>
                    </div>

                    {/* Month Category Header */}
                    <span className="text-xs font-black uppercase tracking-wider text-[#FF0055] block mb-1">
                      {evt.month}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-2xl font-black font-syne text-white uppercase mb-1">
                      {evt.title}
                    </h3>

                    {/* Subtext Bullet */}
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wide mb-4">
                      {evt.subtext}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Card Bottom Actions / Stats */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    
                    {/* Timer Box for Upcoming */}
                    {evt.timer && (
                      <div className="flex items-center justify-center gap-2 bg-black/40 border border-white/10 rounded-2xl p-2.5 mb-2">
                        <div className="bg-white/10 px-2.5 py-1 rounded-xl text-center">
                          <span className="text-xs font-black text-white">{evt.timer.days}</span>
                          <span className="text-[8px] text-slate-400 block font-bold">DAYS</span>
                        </div>
                        <div className="bg-white/10 px-2.5 py-1 rounded-xl text-center">
                          <span className="text-xs font-black text-white">{evt.timer.hrs}</span>
                          <span className="text-[8px] text-slate-400 block font-bold">HRS</span>
                        </div>
                        <div className="bg-white/10 px-2.5 py-1 rounded-xl text-center">
                          <span className="text-xs font-black text-white">{evt.timer.min}</span>
                          <span className="text-[8px] text-slate-400 block font-bold">MIN</span>
                        </div>
                      </div>
                    )}

                    {/* Footer Info Row */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span>{evt.daysLeft || evt.liveTill || 'Unlocks soon'}</span>
                      {evt.price && <span className="text-[#00DFD8] font-extrabold">₹{evt.price}</span>}
                    </div>

                    {/* Action Button */}
                    {isOpen && (
                      <button
                        onClick={() => setSelectedItemForBooking({ id: evt.id, title: evt.title, price: evt.price, type: 'Event Pass' })}
                        className="w-full py-3.5 bg-[#00DFD8] hover:bg-[#00DFD8]/90 text-black text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {isUpcoming && (
                      <button
                        onClick={() => alert(`We will notify you when ${evt.title} opens on Sep 1!`)}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2"
                      >
                        <Bell className="w-4 h-4 text-[#FF0055]" />
                        <span>Remind me</span>
                      </button>
                    )}

                    {isLocked && (
                      <button
                        disabled
                        className="w-full py-3 bg-white/5 text-slate-500 border border-white/5 text-xs font-bold uppercase tracking-wider rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{evt.btnText}</span>
                      </button>
                    )}

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
