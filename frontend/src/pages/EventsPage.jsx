import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import ShareModal from '../components/ShareModal';
import { Sparkles, Calendar, MapPin, CheckCircle, Flame, ArrowRight, Ticket, Lock, ChevronDown, Share2 } from 'lucide-react';

export default function EventsPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);
  const [sharingItem, setSharingItem] = useState(null);

  // Active Logged In Member Session State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ethos_logged_in_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('ethos_logged_in_user');
        setCurrentUser(saved ? JSON.parse(saved) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isMemberSubscriber = currentUser && (currentUser.packageTitle || currentUser.customerCode || currentUser.classesLeft > 0);

  // Load Admin Events from localStorage
  const loadAdminEvents = () => {
    try {
      const saved = localStorage.getItem('ethos_master_events_catalog');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };
  const [adminEvents, setAdminEvents] = useState(loadAdminEvents);

  useEffect(() => {
    const handleStorage = () => setAdminEvents(loadAdminEvents());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('ethos_events_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('ethos_events_updated', handleStorage);
    };
  }, []);

  // Dropdown for Year Selection (2026, 2025, 2024)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('Aug'); // Default to August 2026 current month

  // Full 12-Month Timeline Array
  const monthsTimeline = [
    { name: 'JAN', code: 'Jan' },
    { name: 'FEB', code: 'Feb' },
    { name: 'MAR', code: 'Mar' },
    { name: 'APR', code: 'Apr' },
    { name: 'MAY', code: 'May' },
    { name: 'JUN', code: 'Jun' },
    { name: 'JUL', code: 'Jul' },
    { name: 'AUG', code: 'Aug' },
    { name: 'SEP', code: 'Sep' },
    { name: 'OCT', code: 'Oct' },
    { name: 'NOV', code: 'Nov' },
    { name: 'DEC', code: 'Dec' }
  ];

  // Helper: parse date to JS Date object
  const parseEventDate = (dateStr) => {
    if (!dateStr) return null;
    const ddmmyyyy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`);
    const yyyymmdd = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
    if (yyyymmdd) return new Date(dateStr);
    const cleaned = dateStr.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i, '');
    let d = new Date(cleaned);
    if (isNaN(d.getTime())) d = new Date(`${cleaned}, ${new Date().getFullYear()}`);
    return isNaN(d.getTime()) ? null : d;
  };

  // Helper: check if event date is past relative to today (Aug 21, 2026)
  const today = new Date('2026-08-21T00:00:00');
  
  const isEventExpired = (dateStr, status) => {
    if (status === 'PAST') return true;
    const parsed = parseEventDate(dateStr);
    if (!parsed) return false;
    return parsed < today;
  };

  // Master Events Catalog
  const baseMasterEvents = [
    // 2024 ARCHIVE
    {
      id: 202401, year: 2024, monthCode: 'Jan', eventDate: 'Jan 15, 2024', status: 'PAST',
      title: '2024 New Year Dance Revival', subtext: 'Choreography: Ethos Founders',
      desc: 'Kickoff workshop celebrating 2024 with street hip-hop and choreography routines.',
      price: 399, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 202406, year: 2024, monthCode: 'Jun', eventDate: 'Jun 20, 2024', status: 'PAST',
      title: '2024 Summer Battle & Showcase', subtext: 'Choreography: Ethos Master Team',
      desc: 'Annual 2024 battle with live DJ, stage routines, and student showcases.',
      price: 499, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    },

    // 2025 ARCHIVE
    {
      id: 202508, year: 2025, monthCode: 'Aug', eventDate: 'Aug 14, 2025', status: 'PAST',
      title: '2025 Commercial Heels & Glam', subtext: 'Choreography: Master Alisa',
      desc: 'Sensual lines, body posture, and commercial choreography in heels.',
      price: 649, image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80'
    },

    // 2026 EVENTS
    // AUGUST 2026
    {
      id: 204, year: 2026, monthCode: 'Aug', eventDate: 'Aug 19, 2026', status: 'PAST',
      ribbon: 'COMPLETED', title: 'Hip-Hop & Urban Choreography Masterclass',
      subtext: 'Choreography: Vikram Singh',
      desc: 'Explosive urban hip-hop isolations, groove musicality, and fast-paced stage routines.',
      price: 1399, image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 202, year: 2026, monthCode: 'Aug', eventDate: 'Aug 26, 2026', status: 'LIVE',
      ribbon: 'POPULAR BOOTCAMP', title: 'Wedding Sangeet Flashmob Bootcamp',
      subtext: 'Choreography: Rohan & Ananya',
      desc: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.',
      price: 1999, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 203, year: 2026, monthCode: 'Aug', eventDate: 'Aug 28, 2026', status: 'LIVE',
      ribbon: 'HEELS INTENSIVE', title: 'Urban Heels & Confidence Intensive',
      subtext: 'Choreography: Natasha Roy',
      desc: 'Master posture, balance, performance presence, and high-energy commercial heels choreography.',
      price: 1299, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 201, year: 2026, monthCode: 'Aug', eventDate: 'Aug 29, 2026', status: 'LIVE',
      ribbon: 'GUEST PARIS ARTIST', title: 'International Afro-Fusion Masterclass',
      subtext: 'Choreography: Koffi & Team (Paris)',
      desc: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists.',
      price: 1499, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'
    },

    // SEPTEMBER 2026
    {
      id: 302, year: 2026, monthCode: 'Sep', eventDate: 'Sep 06, 2026', status: 'UPCOMING',
      ribbon: 'UPCOMING', title: 'Contemporary & Floorwork Workshop',
      subtext: 'Choreography: Rohan Sharma',
      desc: 'Explore movement storytelling, floor rolls, and fluid momentum transitions.',
      price: 1299, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 303, year: 2026, monthCode: 'Sep', eventDate: 'Sep 18, 2026', status: 'UPCOMING',
      ribbon: 'UPCOMING', title: 'Bolly-Hop Remix Masterclass',
      subtext: 'Choreography: Ananya Roy',
      desc: 'High-power Bollywood commercial fusion and fast footwork routines.',
      price: 1399, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Merge Admin Events dynamically
  const mergedMap = new Map();
  baseMasterEvents.forEach(item => mergedMap.set(item.id, item));
  adminEvents.forEach(item => {
    let mCode = 'Aug';
    if (item.date) {
      if (item.date.includes('Sep')) mCode = 'Sep';
      else if (item.date.includes('Oct')) mCode = 'Oct';
      else if (item.date.includes('Nov')) mCode = 'Nov';
      else if (item.date.includes('Dec')) mCode = 'Dec';
      else if (item.date.includes('Jul')) mCode = 'Jul';
    }
    mergedMap.set(item.id, {
      id: item.id,
      year: 2026,
      monthCode: mCode,
      eventDate: item.date || 'Aug 2026',
      status: item.status === 'LIVE' ? 'LIVE' : 'UPCOMING',
      ribbon: item.status === 'LIVE' ? 'LIVE NOW' : 'UPCOMING',
      title: item.title,
      subtext: `Choreography: ${item.choreographer || 'Ethos Master Team'}`,
      desc: item.desc || 'Special masterclass workshop at Ethos Dance Studio Kukatpally.',
      price: item.price || item.entryFee || 1499,
      image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'
    });
  });

  const allEvents = Array.from(mergedMap.values());

  // Strict Month & Year Filtering
  const filteredEvents = allEvents.filter(evt => {
    if (evt.year !== selectedYear) return false;
    if (selectedMonth === 'ALL') return true;
    return evt.monthCode === selectedMonth;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans select-none pb-20">
      
      {/* 🌟 1. GLOBAL NAVBAR 🌟 */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {/* 🌟 2. HERO HEADER BANNER 🌟 */}
      <div className="pt-28 pb-12 px-4 sm:px-8 bg-[#090A0F] text-white text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest rounded-full">
            <Sparkles className="w-4 h-4 text-[#0088FF]" />
            <span>ETHOS ANNUAL MASTERCLASS &amp; WORKSHOP CALENDAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-white">
            EXPLORE WORKSHOPS &amp; EVENTS
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl mx-auto leading-relaxed">
            All-in-one choreography passes, guest masterclasses, and wedding bootcamps. Select any year or month to view schedule and register.
          </p>
        </div>
      </div>

      {/* 🌟 3. YEAR DROPDOWN SELECTOR & CONNECTING STRING MONTH TIMELINE 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4">
        
        {/* DROPDOWN FOR SELECTING YEARS (REQUIREMENT #1) */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1 text-center">SELECT YEAR</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-900 text-white font-black font-syne text-sm uppercase px-6 py-3 rounded-full border border-slate-700 shadow-xl focus:outline-none focus:border-[#0088FF] cursor-pointer appearance-none pr-10"
            >
              <option value={2026}>2026 (ACTIVE CALENDAR)</option>
              <option value={2025}>2025 (ARCHIVE)</option>
              <option value={2024}>2024 (ARCHIVE)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-white absolute right-4 bottom-3.5 pointer-events-none" />
          </div>
        </div>

        {/* 12-MONTH CONNECTING STRING TIMELINE BAR (REQUIREMENT #2) */}
        <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 overflow-x-auto relative">
          
          {/* CONNECTING STRING HORIZONTAL LINE */}
          <div className="absolute top-[38px] left-8 right-8 h-0.5 bg-slate-200 z-0" />

          <div className="flex items-center justify-between min-w-[700px] gap-2 relative z-10">
            {monthsTimeline.map((m) => {
              const isSelected = selectedMonth === m.code;
              const isCurrent = m.code === 'Aug' && selectedYear === 2026;

              return (
                <button
                  key={m.code}
                  onClick={() => setSelectedMonth(selectedMonth === m.code ? 'ALL' : m.code)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
                    isCurrent
                      ? 'bg-[#0088FF] ring-4 ring-[#0088FF]/30 text-white animate-pulse'
                      : isSelected
                      ? 'bg-[#0088FF] text-white ring-4 ring-[#0088FF]/30 scale-110'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-[#0088FF]'
                  }`}>
                    <span className="text-[10px] font-black">{m.name[0]}</span>
                  </div>

                  <span className={`text-xs font-black uppercase tracking-wider transition-colors ${
                    isSelected || isCurrent ? 'text-[#0088FF]' : 'text-slate-600'
                  }`}>
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 🌟 4. EVENT CARDS GRID 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        
        {filteredEvents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto my-8 shadow-sm">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black uppercase font-syne text-slate-800">No Events Listed</h3>
            <button
              onClick={() => setSelectedMonth('ALL')}
              className="mt-2 text-xs font-bold text-[#0088FF] uppercase underline cursor-pointer"
            >
              View All {selectedYear} Events →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredEvents.map((evt) => {
              const expired = isEventExpired(evt.eventDate, evt.status);
              const rawPrice = evt.price || 1499;
              const finalPassPrice = isMemberSubscriber ? Math.max(0, rawPrice - 100) : rawPrice;

              return (
                <div
                  key={evt.id}
                  className={`bg-white text-slate-900 border rounded-[1.5rem] p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl group ${
                    expired
                      ? 'border-slate-300 bg-slate-50/80 opacity-75'
                      : 'border-slate-200/90 hover:border-[#0088FF] ring-1 ring-transparent hover:ring-[#0088FF]/30'
                  }`}
                >
                  <div>
                    {/* POSTER IMAGE */}
                    <div className="relative h-[220px] -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[1.3rem] bg-slate-900 border-b border-slate-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className={`w-full h-full object-cover ${expired ? 'grayscale contrast-125' : 'group-hover:scale-105 transition-transform duration-500'}`}
                      />

                      {/* Status Badge */}
                      <span className={`absolute top-3 left-3 px-3 py-1 text-[9px] font-black uppercase rounded-full shadow-md backdrop-blur-md ${
                        expired ? 'bg-slate-900/90 text-slate-300 border border-slate-700' : 'bg-[#0088FF] text-white'
                      }`}>
                        {expired ? '⚪ EVENT COMPLETED' : '🔴 LIVE CURRENT MONTH'}
                      </span>
                    </div>

                    {/* EVENT TITLE */}
                    <h3 className="text-xl font-bold font-syne text-slate-900 leading-snug mb-3 min-h-[56px] flex items-center uppercase">
                      {evt.title}
                    </h3>

                    {/* DATE PILL BOX */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3 mb-2.5">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          {evt.eventDate} {expired ? '(Past Event)' : ''}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 block leading-tight">
                          {evt.subtext || 'Choreography Special'}
                        </span>
                      </div>
                    </div>

                    {/* LOCATION PILL BOX */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3 mb-4">
                      <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-slate-900 block leading-tight truncate">
                          Ethos Studio Kukatpally
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 block leading-tight truncate">
                          Exact location shared after registration
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE & ACTION FOOTER */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        {expired ? 'Final Price' : 'Starting from'}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-xl font-bold font-syne ${expired ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                          ₹{finalPassPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`events.html?event=${evt.id}`}
                        className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-xl border border-slate-300 transition-all cursor-pointer uppercase"
                      >
                        Details →
                      </a>

                      {expired ? (
                        <button disabled className="py-2.5 px-4 bg-slate-200 text-slate-500 text-xs font-bold rounded-xl border border-slate-300 cursor-not-allowed uppercase">
                          Expired
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedItemForBooking && setSelectedItemForBooking({
                            id: evt.id,
                            title: evt.title,
                            price: finalPassPrice,
                            type: 'Workshop Ticket'
                          })}
                          className="py-2.5 px-5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer uppercase"
                        >
                          Book Now
                        </button>
                      )}

                      <button
                        onClick={() => setSharingItem(evt)}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                        title="Share Event"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* FOOTER */}
      <Footer />
      <FloatingWhatsApp />

      {/* BOOKING PAYMENT MODAL */}
      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL="http://localhost:5000"
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={(reg) => {
            setSelectedItemForBooking(null);
            setConfirmedRegistration(reg);
          }}
        />
      )}

      {/* CONFIRMATION RECEIPT MODAL */}
      {confirmedRegistration && (
        <ConfirmationReceiptModal
          registration={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

      {/* SHARE MODAL */}
      {sharingItem && (
        <ShareModal
          item={sharingItem}
          onClose={() => setSharingItem(null)}
        />
      )}

    </div>
  );
}
