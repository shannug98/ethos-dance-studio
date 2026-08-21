import React, { useState, useEffect } from 'react';
import ShareModal from './ShareModal';
import { Calendar, Clock, MapPin, Sparkles, Flame, Share2, X, ArrowRight, Ticket, CheckCircle2, Play, Video } from 'lucide-react';

export default function WorkshopsSection({ events = [], onSelectEvent }) {
  const [sharingItem, setSharingItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  // Read admin-created events from localStorage
  const readAdminEvents = () => {
    try {
      const saved = localStorage.getItem('ethos_master_events_catalog');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };
  const [adminEvents, setAdminEvents] = useState(readAdminEvents);

  useEffect(() => {
    const handler = () => setAdminEvents(readAdminEvents());
    window.addEventListener('storage', handler);
    window.addEventListener('ethos_events_updated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('ethos_events_updated', handler);
    };
  }, []);

  // Standard Master Workshops (ONLY FUTURE ACTIVE UPCOMING EVENTS)
  const defaultWorkshops = [
    {
      id: 202,
      title: 'Wedding Sangeet Flashmob Bootcamp',
      guestChoreographer: 'Rohan & Ananya',
      date: 'Aug 26, 2026',
      time: '02:00 PM - 06:00 PM',
      location: 'Studio Ballroom A, Kukatpally',
      price: 1999,
      level: 'Family & Couples',
      danceStyle: 'Bolly-Hop & Wedding Remix',
      seatsLeft: 7,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.',
      status: 'UPCOMING'
    },
    {
      id: 203,
      title: 'Urban Heels & Confidence Intensive',
      guestChoreographer: 'Natasha Roy',
      date: 'Aug 28, 2026',
      time: '04:00 PM - 07:00 PM',
      location: 'Studio Mirror Room B',
      price: 1299,
      level: 'Intermediate',
      danceStyle: 'Heels & Commercial Jazz',
      seatsLeft: 4,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      description: 'Master posture, balance, performance presence, and high-energy commercial heels choreography.',
      status: 'UPCOMING'
    },
    {
      id: 201,
      title: 'International Afro-Fusion Masterclass',
      guestChoreographer: 'Koffi & Team (Paris)',
      date: 'Aug 29, 2026',
      time: '05:00 PM - 08:00 PM',
      location: 'Ethos Grand Arena, Kukatpally',
      price: 1499,
      level: 'Open to All',
      danceStyle: 'Afro-Beats & Amapiano',
      seatsLeft: 5,
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists.',
      status: 'UPCOMING'
    },
    {
      id: 302,
      title: 'Contemporary & Floorwork Workshop',
      guestChoreographer: 'Rohan Sharma',
      date: 'Sep 06, 2026',
      time: '05:00 PM - 08:00 PM',
      location: 'Ethos Main Studio',
      price: 1299,
      level: 'All Levels',
      danceStyle: 'Contemporary & Floorwork',
      seatsLeft: 6,
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      description: 'Explosive floorwork mechanics, imagination movement, and emotional storytelling routines.',
      status: 'UPCOMING'
    }
  ];

  // Helper: parse date
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

  const today = new Date('2026-08-21T00:00:00');
  const isFutureUpcoming = (item) => {
    if (item.status === 'PAST' || (item.date && item.date.includes('Past Event'))) return false;
    const parsed = parseEventDate(item.date);
    if (!parsed) return true;
    return parsed >= today;
  };

  // Merge Admin Events
  const mergedMap = new Map();
  defaultWorkshops.forEach(e => mergedMap.set(e.id, e));
  events.forEach(e => mergedMap.set(e.id, e));
  adminEvents.forEach(e => mergedMap.set(e.id, e));
  const allEventsList = Array.from(mergedMap.values());

  const upcomingEvents = allEventsList.filter(isFutureUpcoming);
  const finalEvents = upcomingEvents.length > 0 ? upcomingEvents : defaultWorkshops;

  return (
    <section id="workshops" className="bg-[#FFFFFF] text-slate-900 py-16 sm:py-24 border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* SECTION HEADER */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#0088FF]" />
            <span>ETHOS SPECIAL PASSES &amp; WORKSHOPS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-syne uppercase tracking-tight text-slate-900 leading-tight">
            UPCOMING EVENTS &amp; WORKSHOPS
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            All-in-one choreography passes, guest masterclasses, and wedding bootcamps. Click any card to preview full details, video reel &amp; booking options.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="container mx-auto flex flex-wrap justify-center lg:flex-nowrap gap-5 md:gap-6 mt-8 px-2">
          {finalEvents.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={`events.html?event=${item.id}`}
              className="relative w-[calc(50%-0.625rem)] sm:w-[calc(50%-0.75rem)] lg:w-full lg:flex-grow max-w-[280px] lg:max-w-xs group overflow-hidden cursor-pointer flex flex-col shrink-0 lg:shrink"
            >
              {/* CARD TITLE */}
              <h3 className="text-[11px] sm:text-xs font-black uppercase mb-3 text-center text-slate-900 tracking-wider min-h-[38px] flex items-center justify-center px-1 leading-snug line-clamp-2 group-hover:text-[#0088FF] transition-colors">
                {item.title}
              </h3>

              {/* POSTER CONTAINER */}
              <div className="relative aspect-[0.68] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-200 group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105 brightness-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/90 text-white text-[9px] font-black uppercase rounded-full shadow-md backdrop-blur-md border border-white/20">
                  🔥 {item.seatsLeft || 5} Seats Left
                </div>

                <div className="absolute bottom-3.5 left-0 w-full flex justify-center px-3">
                  <div className="w-full text-center py-2.5 bg-white text-slate-950 font-black text-[10px] sm:text-[11px] uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 ease-out flex items-center justify-center gap-1 group-hover:bg-slate-100">
                    <span>EXPLORE DETAILS • ₹{item.price || 1499}</span>
                    <ArrowRight className="w-3 h-3 text-[#0088FF]" />
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

      </div>

      {/* 🌟 INTERACTIVE EVENT DETAILS PREVIEW MODAL (POPUP BEFORE PAYMENT - REQUIREMENT #4) 🌟 */}
      {expandedItem && (
        <div
          className="fixed inset-0 z-[220] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setExpandedItem(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative my-auto space-y-6 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON AT TOP RIGHT CORNER */}
            <button
              onClick={() => setExpandedItem(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* DANCE STYLE BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[11px] font-black uppercase rounded-full">
              <Ticket className="w-3.5 h-3.5" />
              <span>{expandedItem.danceStyle || 'Masterclass Pass'}</span>
            </div>

            {/* TITLE */}
            <h3 className="text-2xl sm:text-4xl font-black font-syne uppercase tracking-tight text-slate-900 leading-tight">
              {expandedItem.title}
            </h3>

            {/* DEMO VIDEO / POSTER PREVIEW CLIP CONTAINER */}
            <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
              <img
                src={expandedItem.image || expandedItem.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                alt={expandedItem.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>Watch Choreography Preview Reel (0:45 HD)</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
              {expandedItem.description || 'Special intensive masterclass workshop at Ethos Dance Studio.'}
            </p>

            {/* EVENT DETAILS GRID (DATE, TIME, VENUE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0088FF]" />
                <span>Date: {expandedItem.date}</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0088FF]" />
                <span>Time: {expandedItem.time || '05:00 PM - 08:00 PM'}</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-[#0088FF]" />
                <span>Venue: {expandedItem.location || 'Ethos Grand Arena, Kukatpally'}</span>
              </div>
            </div>

            {/* ACTION FOOTER WITH TWO BUTTONS (CONTINUE TO PAYMENT & CANCEL / CLOSE) */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Entry Fee</span>
                <span className="text-3xl font-black font-syne text-slate-900">₹{expandedItem.price || 1499}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setExpandedItem(null)}
                  className="flex-1 sm:flex-initial py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Cancel / Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const itemToBook = expandedItem;
                    setExpandedItem(null);
                    if (onSelectEvent) onSelectEvent(itemToBook);
                  }}
                  className="flex-1 sm:flex-initial py-3.5 px-8 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
