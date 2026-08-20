import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { Camera, Sparkles, Palette, Calendar, Clock, MapPin, CheckCircle, Flame, ArrowRight, ShieldCheck, Ticket, Users, Lock, ChevronDown, Crown, Tag } from 'lucide-react';

export function getEventPricingTier(ticketsSold = 6, customTiers = null) {
  const t1 = Number(customTiers?.tier1Price || customTiers?.price || 549);
  const t2 = Number(customTiers?.tier2Price || (t1 + 100));
  const t3 = Number(customTiers?.tier3Price || (t2 + 100));
  const t4 = Number(customTiers?.tier4Price || (t3 + 50));

  if (ticketsSold < 10) {
    return {
      currentPrice: t1,
      tierName: 'Tier 1 • Early Bird (First 10)',
      ticketsSoldInTier: ticketsSold,
      tierLimit: 10,
      nextPrice: t2,
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
      activeTierIndex: 1
    };
  } else if (ticketsSold < 20) {
    return {
      currentPrice: t2,
      tierName: 'Tier 2 • Phase 2 (Next 10)',
      ticketsSoldInTier: ticketsSold - 10,
      tierLimit: 10,
      nextPrice: t3,
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
      activeTierIndex: 2
    };
  } else if (ticketsSold < 30) {
    return {
      currentPrice: t3,
      tierName: 'Tier 3 • Phase 3 (Next 10)',
      ticketsSoldInTier: ticketsSold - 20,
      tierLimit: 10,
      nextPrice: t4,
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
      activeTierIndex: 3
    };
  } else {
    return {
      currentPrice: t4,
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

  // Year & Month Selection States (Default to Current Month 'Aug' when opened)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('Aug'); // Default to August 2026 current month

  // Full 12-Month Annual Timeline Code Array
  const monthsTimeline = [
    { name: 'Jan', code: 'Jan', isCurrent: false },
    { name: 'Feb', code: 'Feb', isCurrent: false },
    { name: 'Mar', code: 'Mar', isCurrent: false },
    { name: 'Apr', code: 'Apr', isCurrent: false },
    { name: 'May', code: 'May', isCurrent: false },
    { name: 'Jun', code: 'Jun', isCurrent: false },
    { name: 'Jul', code: 'Jul', isCurrent: false },
    { name: 'Aug', code: 'Aug', isCurrent: selectedYear === 2026 }, // August 2026 is current month
    { name: 'Sep', code: 'Sep', isCurrent: false },
    { name: 'Oct', code: 'Oct', isCurrent: false },
    { name: 'Nov', code: 'Nov', isCurrent: false },
    { name: 'Dec', code: 'Dec', isCurrent: false }
  ];

  // Multi-Year Master Events Database (2024 to Present 2026)
  const masterEventsCatalog = [
    // --- 2024 PAST ARCHIVE EVENTS ---
    {
      id: 202401, year: 2024, month: 'JANUARY', monthCode: 'Jan', eventDate: 'Jan 15, 2024', status: 'PAST',
      title: '2024 New Year Dance Revival', subtext: '• Choreography: Ethos Founders',
      desc: 'Kickoff workshop celebrating 2024 with street hip-hop and choreography routines.',
      attendees: 42, price: 399, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2024 ARCHIVE', isTicketsOpen: false
    },
    {
      id: 202406, year: 2024, month: 'JUNE', monthCode: 'Jun', eventDate: 'Jun 20, 2024', status: 'PAST',
      title: '2024 Summer Battle & Showcase', subtext: '• Choreography: Ethos Master Team',
      desc: 'Annual 2024 battle with live DJ, stage routines, and student showcases.',
      attendees: 55, price: 499, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2024 ARCHIVE', isTicketsOpen: false
    },
    {
      id: 202410, year: 2024, month: 'OCTOBER', monthCode: 'Oct', eventDate: 'Oct 22, 2024', status: 'PAST',
      title: '2024 Festive Sangeet Bootcamp', subtext: '• Choreography: Arjun & Ananya',
      desc: 'Massive festive wedding choreography workshop for couples and families.',
      attendees: 48, price: 599, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2024 ARCHIVE', isTicketsOpen: false
    },

    // --- 2025 PAST ARCHIVE EVENTS ---
    {
      id: 202502, year: 2025, month: 'FEBRUARY', monthCode: 'Feb', eventDate: 'Feb 18, 2025', status: 'PAST',
      title: '2025 Contemporary & Expression', subtext: '• Choreography: Ananya Roy',
      desc: 'Floorwork mechanics, balance transitions, and emotional movement storytelling.',
      attendees: 36, price: 499, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2025 ARCHIVE', isTicketsOpen: false
    },
    {
      id: 202508, year: 2025, month: 'AUGUST', monthCode: 'Aug', eventDate: 'Aug 14, 2025', status: 'PAST',
      title: '2025 Commercial Heels & Glam', subtext: '• Choreography: Master Alisa',
      desc: 'Sensual lines, body posture, and commercial choreography in heels.',
      attendees: 38, price: 649, image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2025 ARCHIVE', isTicketsOpen: false
    },
    {
      id: 202512, year: 2025, month: 'DECEMBER', monthCode: 'Dec', eventDate: 'Dec 28, 2025', status: 'PAST',
      title: '2025 Grand Year-End Gala', subtext: '• Choreography: Ethos All-Stars',
      desc: 'End of year gala performance and awards ceremony at Ethos Arena.',
      attendees: 60, price: 799, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      pill: '⚪ 2025 ARCHIVE', isTicketsOpen: false
    },

    // --- 2026 EVENTS (JAN TO DEC) ---
    // JAN 2026 (PAST)
    {
      id: 101, year: 2026, month: 'JANUARY', monthCode: 'Jan', eventDate: 'Jan 10, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'New Year Street Dance Jam',
      subtext: '• Choreography: Sophia Bennett & Team',
      desc: 'High-energy street dance battle and choreography jam celebrating the new year.',
      attendees: 34, price: 499, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // FEB 2026 (PAST)
    {
      id: 103, year: 2026, month: 'FEBRUARY', monthCode: 'Feb', eventDate: 'Feb 14, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'Valentine Duet Choreography',
      subtext: '• Choreography: Ananya & Arjun',
      desc: 'Partner dance session featuring romantic lyrical contemporary and ballroom fusion.',
      attendees: 28, price: 599, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // MAR 2026 (PAST)
    {
      id: 105, year: 2026, month: 'MARCH', monthCode: 'Mar', eventDate: 'Mar 12, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'Spring Contemporary Flow',
      subtext: '• Choreography: Ananya Roy',
      desc: 'Fluid momentum, floorwork rolls, and emotional movement storytelling.',
      attendees: 32, price: 549, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // APR 2026 (PAST)
    {
      id: 107, year: 2026, month: 'APRIL', monthCode: 'Apr', eventDate: 'Apr 08, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'Urban Commercial Dance Bootcamp',
      subtext: '• Choreography: Sophia Bennett',
      desc: 'Music video style commercial choreography and camera angles execution.',
      attendees: 35, price: 649, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // MAY 2026 (PAST)
    {
      id: 109, year: 2026, month: 'MAY', monthCode: 'May', eventDate: 'May 14, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'Summer Hip-Hop Foundation Camp',
      subtext: '• Choreography: Rohan & Sophia',
      desc: 'Old school to new school hip-hop styles and freestyle battle training.',
      attendees: 38, price: 549, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // JUN 2026 (PAST)
    {
      id: 111, year: 2026, month: 'JUNE', monthCode: 'Jun', eventDate: 'Jun 12, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'High Heels & Commercial Glam',
      subtext: '• Choreography: Master Alisa',
      desc: 'Confidence, posture, and sensual lines in commercial high heels dance.',
      attendees: 28, price: 649, image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },
    // JUL 2026 (PAST)
    {
      id: 113, year: 2026, month: 'JULY', monthCode: 'Jul', eventDate: 'Jul 10, 2026', status: 'PAST',
      pill: '⚪ COMPLETED ARCHIVE', title: 'Monsoon Beats & Footwork',
      subtext: '• Choreography: Ananya & Rohan',
      desc: 'Fast footwork drills and rhythm timing for intermediate dancers.',
      attendees: 30, price: 549, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false
    },

    // AUGUST 2026 (CURRENT MONTH 🔴)
    {
      id: 301, year: 2026, month: 'AUGUST', monthCode: 'Aug', eventDate: 'Aug 19, 2026', status: 'CURRENT',
      pill: '🔴 LIVE CURRENT MONTH', ribbon: 'EARLY BIRD TIER 1', title: 'Hip-Hop & Choreography',
      subtext: '• Choreography: Sophia Bennett',
      desc: 'World Dance Day Masterclass with speed isolations, storytelling, and stage moments.',
      ticketsSold: 7, price: 549, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: true, btnText: 'Register Pass →'
    },
    {
      id: 201, year: 2026, month: 'AUGUST', monthCode: 'Aug', eventDate: 'Aug 29, 2026', status: 'CURRENT',
      pill: '🔴 LIVE CURRENT MONTH', ribbon: 'GUEST PARIS ARTIST', title: 'International Afro-Fusion Masterclass',
      subtext: '• Choreography: Koffi & Team (Paris)',
      desc: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists.',
      ticketsSold: 5, price: 1499, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: true, btnText: 'Register Pass →'
    },

    // SEPTEMBER 2026 (UPCOMING - ADMIN CONTROL: OPEN ON SEP 1)
    {
      id: 302, year: 2026, month: 'SEPTEMBER', monthCode: 'Sep', eventDate: 'Sep 15, 2026', status: 'UPCOMING',
      pill: '🔵 UPCOMING • OPENS SEP 1', title: 'Contemporary & Floorwork',
      subtext: '• Choreography: Rohan Sharma',
      desc: 'Explore the world of movement through imagination, floor rolls, and emotional storytelling.',
      ticketsSold: 0, price: 549, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false, ticketOpenDate: 'Sep 01, 2026', btnText: '🔒 Passes Open Sep 1'
    },
    {
      id: 202, year: 2026, month: 'SEPTEMBER', monthCode: 'Sep', eventDate: 'Sep 28, 2026', status: 'UPCOMING',
      pill: '🔵 UPCOMING • OPENS SEP 1', title: 'Wedding Sangeet Flashmob Bootcamp',
      subtext: '• Choreography: Rohan & Ananya',
      desc: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.',
      ticketsSold: 0, price: 1999, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false, ticketOpenDate: 'Sep 01, 2026', btnText: '🔒 Passes Open Sep 1'
    },

    // OCTOBER 2026 (UPCOMING - ADMIN CONTROL: OPEN ON OCT 1)
    {
      id: 303, year: 2026, month: 'OCTOBER', monthCode: 'Oct', eventDate: 'Oct 10, 2026', status: 'UPCOMING',
      pill: '🔵 UPCOMING • OPENS OCT 1', title: 'Navratri Garba & Fusion',
      subtext: '• Choreography: Arjun Das',
      desc: 'Traditional Garba circles mixed with Bollywood commercial steps for festive celebrations.',
      ticketsSold: 0, price: 549, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false, ticketOpenDate: 'Oct 01, 2026', btnText: '🔒 Passes Open Oct 1'
    },

    // NOVEMBER 2026 (UPCOMING - ADMIN CONTROL: OPEN ON NOV 1)
    {
      id: 305, year: 2026, month: 'NOVEMBER', monthCode: 'Nov', eventDate: 'Nov 15, 2026', status: 'UPCOMING',
      pill: '🔵 UPCOMING • OPENS NOV 1', title: 'Diwali Festive Dance Jam',
      subtext: '• Choreography: Ethos Faculty',
      desc: 'High energy celebratory Bollywood fusion and group dance choreography.',
      ticketsSold: 0, price: 549, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false, ticketOpenDate: 'Nov 01, 2026', btnText: '🔒 Passes Open Nov 1'
    },

    // DECEMBER 2026 (UPCOMING - ADMIN CONTROL: OPEN ON DEC 1)
    {
      id: 306, year: 2026, month: 'DECEMBER', monthCode: 'Dec', eventDate: 'Dec 20, 2026', status: 'UPCOMING',
      pill: '🔵 UPCOMING • OPENS DEC 1', title: 'Grand Annual Dance Gala',
      subtext: '• Choreography: Master Team',
      desc: 'End of year grand stage showcase, awards, and celebrity masterclass performance.',
      ticketsSold: 0, price: 999, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      isTicketsOpen: false, ticketOpenDate: 'Dec 01, 2026', btnText: '🔒 Passes Open Dec 1'
    }
  ];

  // Filter events based on Year & Month selection
  const filteredEvents = masterEventsCatalog.filter(evt => {
    // 1. Year Filter
    if (evt.year !== Number(selectedYear)) return false;

    // 2. Month Filter
    if (selectedMonth !== 'ALL' && evt.monthCode !== selectedMonth) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px] pb-24">
        
        {/* HEADER SECTION */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 pb-6 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-black uppercase rounded-full tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETHOS MASTERCLASS & WORKSHOP ARCHIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-syne uppercase tracking-tight text-slate-900 leading-[1.05]">
            WORKSHOPS & EVENTS <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] italic font-serif">
              Explore 2024 to Present
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Select a year and month to view completed past workshops, current live events, and upcoming masterclasses.
          </p>

          {/* 👑 ACTIVE MEMBER DISCOUNT NOTICE BANNER (WHEN LOGGED IN WITH MONTHLY PACKAGE) 👑 */}
          {isMemberSubscriber && (
            <div className="max-w-xl mx-auto p-3.5 bg-gradient-to-r from-[#FF0055]/15 via-[#7928CA]/15 to-[#00DFD8]/15 border border-[#FF0055]/40 rounded-2xl text-xs font-bold text-slate-900 flex items-center justify-between shadow-md animate-fadeIn">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500 animate-bounce shrink-0" />
                <div className="text-left">
                  <span className="block font-black text-[#FF0055] uppercase">Monthly Member Special Applied!</span>
                  <span className="text-[11px] text-slate-600 font-medium">Enjoy ₹100 OFF on all workshop passes as an active member ({currentUser.name})</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#FF0055] text-white text-[10px] font-black uppercase rounded-full shadow-sm">
                -₹100 OFF
              </span>
            </div>
          )}

          {/* 🌟 YEAR SELECTOR DROPDOWN 🌟 */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <label className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FF0055]" />
              <span>Select Year:</span>
            </label>

            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  setSelectedMonth('ALL');
                }}
                className="appearance-none bg-slate-900 text-white font-extrabold text-sm px-6 py-2.5 pr-10 rounded-2xl shadow-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF0055] cursor-pointer"
              >
                <option value={2026}>2026</option>
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
              </select>
              <ChevronDown className="w-4 h-4 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 🌟 CLEAN 12-MONTH TIMELINE TRACK (JAN TO DEC) 🌟 */}
          <div className="pt-6 pb-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[650px] sm:min-w-[800px] max-w-4xl mx-auto px-4 relative">
              
              {/* Connecting Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-300 -z-0"></div>

              {monthsTimeline.map((m) => {
                const isSelected = selectedMonth === m.code;
                const isCurrent = m.isCurrent;

                return (
                  <button
                    key={m.code}
                    onClick={() => setSelectedMonth(selectedMonth === m.code ? 'ALL' : m.code)}
                    className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    {/* Month Dot Node */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isCurrent
                        ? 'bg-[#FF0055] ring-4 ring-[#FF0055]/30 text-white animate-pulse'
                        : selectedYear < 2026
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : m.code === 'Sep' || m.code === 'Oct' || m.code === 'Nov' || m.code === 'Dec'
                        ? 'bg-white border border-[#0088FF]/60 text-[#0088FF]'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    } ${isSelected ? 'scale-125 ring-4 ring-[#FF0055]' : ''}`}>
                      <span className="text-[11px] font-black">{m.name[0]}</span>
                    </div>

                    {/* Month Text Label Only */}
                    <span className={`text-xs font-black uppercase tracking-wider transition-colors ${
                      isCurrent
                        ? 'text-[#FF0055]'
                        : isSelected
                        ? 'text-[#FF0055]'
                        : 'text-slate-600'
                    }`}>
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 🌟 EVENT CARDS GRID WITH CLEAN SINGLE DATE BADGE & 100% HORIZONTAL ALIGNMENT 🌟 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto my-8 shadow-sm">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-black uppercase font-syne text-slate-800">No Events Listed</h3>
              <p className="text-xs text-slate-500 font-medium">No masterclasses or workshops recorded for this specific month in {selectedYear}.</p>
              <button
                onClick={() => setSelectedMonth('ALL')}
                className="mt-2 text-xs font-bold text-[#FF0055] uppercase underline"
              >
                View All {selectedYear} Events →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => {
                const isCurrent = evt.status === 'CURRENT' && selectedYear === 2026;
                const isPast = evt.status === 'PAST' || selectedYear < 2026;

                const isTicketOpen = evt.isTicketsOpen && !isPast;
                const tierInfo = getEventPricingTier(evt.ticketsSold || 0);

                // Calculate Member Special Price (₹100 OFF)
                const finalPassPrice = isMemberSubscriber ? Math.max(0, evt.price - 100) : evt.price;

                return (
                  <div
                    key={evt.id}
                    className={`bg-white text-slate-900 border rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl group ${
                      isCurrent
                        ? 'border-[#FF0055] ring-4 ring-[#FF0055]/20 shadow-[#FF0055]/15'
                        : isPast
                        ? 'border-slate-300/80 bg-slate-50/70'
                        : 'border-[#0088FF]/40 hover:border-[#0088FF]'
                    }`}
                  >
                    <div className="flex flex-col flex-1">
                      {/* 100% FULL-WIDTH TOP POSTER IMAGE TOUCHING ALL CARD BORDERS */}
                      <div className="relative h-[420px] -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-900 border-b border-slate-200">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className={`w-full h-full object-cover ${isPast ? 'grayscale contrast-125' : 'group-hover:scale-105 transition-transform duration-500'}`}
                        />
                        
                        {/* Overlay Ribbon */}
                        {evt.ribbon && (
                          <div className="absolute top-6 -right-12 rotate-45 bg-[#FF0055] text-white text-[8.5px] font-black uppercase w-44 text-center py-1 shadow-lg tracking-wider z-10">
                            {isMemberSubscriber ? '👑 MEMBER PERK' : evt.ribbon}
                          </div>
                        )}

                        {/* Overlay Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border shadow-md backdrop-blur-md ${
                            isCurrent
                              ? 'bg-[#FF0055] text-white border-[#FF0055] animate-pulse'
                              : isPast
                              ? 'bg-black/80 text-slate-200 border-slate-700'
                              : 'bg-[#0088FF] text-white border-[#0088FF]'
                          }`}>
                            {evt.pill}
                          </span>

                          {isPast && evt.attendees && (
                            <span className="text-[10px] font-bold text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                              <Users className="w-3 h-3 text-slate-300" />
                              <span>{evt.attendees} Dancers</span>
                            </span>
                          )}
                        </div>

                        {/* 📅 OVERLAY SINGLE DATE & MONTH & YEAR BADGE AT BOTTOM-LEFT OF POSTER */}
                        <div className="absolute bottom-3 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black uppercase tracking-wider border border-white/10 shadow-lg flex items-center gap-1.5">
                          <span>📅 {evt.eventDate || `${evt.monthCode} ${evt.year}`}</span>
                        </div>
                      </div>

                      {/* Event Title with Fixed Min-Height for Perfect Horizontal Alignment */}
                      <h3 className="text-2xl font-black font-syne text-slate-900 uppercase mb-1 leading-snug min-h-[64px] flex items-center">
                        {evt.title}
                      </h3>

                      {/* Subtext Bullet (Choreographer Line) */}
                      <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide mb-3 min-h-[18px]">
                        {evt.subtext}
                      </p>

                      {/* Description Paragraph with Fixed Min-Height for Perfect Horizontal Alignment */}
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 min-h-[48px] flex items-start">
                        {evt.desc}
                      </p>

                      {/* 👑 EXCLUSIVE MEMBER SPECIAL DISCOUNT BADGE (LOGGED IN MEMBERS ONLY) 👑 */}
                      {isMemberSubscriber && !isPast && (
                        <div className="mt-auto p-3 bg-gradient-to-r from-[#FF0055]/10 via-[#7928CA]/10 to-[#0088FF]/10 border border-[#FF0055]/30 rounded-2xl flex items-center justify-between text-xs font-bold mb-4 shadow-sm">
                          <div className="flex items-center gap-1.5 text-[#FF0055]">
                            <Crown className="w-4 h-4 text-amber-500 animate-bounce" />
                            <span>👑 Monthly Member Special</span>
                          </div>
                          <div className="text-right">
                            <span className="line-through text-slate-400 text-[11px] mr-2">₹{evt.price}</span>
                            <span className="text-base font-black text-[#FF0055] font-syne">₹{finalPassPrice}</span>
                          </div>
                        </div>
                      )}

                      {/* TIERED PRICING BOX FOR LIVE EVENTS */}
                      {isCurrent && !isMemberSubscriber && (
                        <div className="mt-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 border text-[10px] font-black uppercase rounded-full ${tierInfo.badgeColor}`}>
                              ⚡ Active: {tierInfo.tierName}
                            </span>
                            <div className="text-right">
                              <span className="text-xl font-black font-syne text-slate-900">₹{evt.price}</span>
                              <span className="text-[9px] font-bold text-slate-500 block">Inc. all taxes</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 🌟 BOTTOM ACTION BAR WITH PERFECT HORIZONTAL ALIGNMENT 🌟 */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 block font-bold">Pass Price</span>
                        {isMemberSubscriber && !isPast ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[#FF0055] font-extrabold text-2xl font-syne">₹{finalPassPrice}</span>
                            <span className="line-through text-slate-400 text-xs font-bold">₹{evt.price}</span>
                          </div>
                        ) : (
                          <span className="text-slate-900 font-extrabold text-xl font-syne">₹{evt.price}</span>
                        )}
                      </div>

                      {isPast ? (
                        <button
                          disabled
                          className="py-2.5 px-4 bg-slate-200 text-slate-500 text-xs font-extrabold uppercase rounded-xl border border-slate-300 cursor-not-allowed flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Event Concluded</span>
                        </button>
                      ) : !isTicketOpen ? (
                        /* UPCOMING EVENT - ADMIN HAS NOT OPENED TICKETS YET */
                        <button
                          onClick={() => alert(`Passes for "${evt.title}" will open on ${evt.ticketOpenDate || 'the 1st of the month'}. Check back soon!`)}
                          className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-extrabold uppercase rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Lock className="w-3.5 h-3.5 text-[#0088FF]" />
                          <span>{evt.btnText || '🔒 Passes Open Soon'}</span>
                        </button>
                      ) : (
                        /* LIVE EVENT - TICKETS ARE OPEN FOR BOOKING WITH MEMBER PRICE */
                        <button
                          onClick={() => setSelectedItemForBooking && setSelectedItemForBooking({
                            id: evt.id,
                            title: evt.title,
                            price: finalPassPrice,
                            originalPrice: evt.price,
                            isMemberDiscounted: isMemberSubscriber,
                            type: 'Workshop Ticket'
                          })}
                          className="text-xs py-2.5 px-5 font-extrabold uppercase tracking-wider rounded-xl text-white bg-[#FF0055] hover:bg-[#D00044] shadow-lg shadow-[#FF0055]/30 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>{isMemberSubscriber ? `Claim Member Pass ₹${finalPassPrice} →` : `Register Pass ₹${evt.price} →`}</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </main>

      {/* FOOTER */}
      <Footer onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {/* FLOATING WHATSAPP CHAT BUTTON */}
      <FloatingWhatsApp />

      {/* PAYMENT & RECEIPT MODALS */}
      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          onClose={() => setSelectedItemForBooking(null)}
          onSuccess={(registrationData) => {
            setSelectedItemForBooking(null);
            setConfirmedRegistration(registrationData);
          }}
        />
      )}

      {confirmedRegistration && (
        <ConfirmationReceiptModal
          data={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

    </div>
  );
}
