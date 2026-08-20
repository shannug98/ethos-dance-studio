import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, UserCheck, Flame, Share2 } from 'lucide-react';

export default function WorkshopsSection({ events = [], onSelectEvent }) {
  // Default fallback workshops if no admin events fall within 28 days
  const defaultWorkshops = [
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
      id: 202,
      title: 'Wedding Sangeet Flashmob Bootcamp',
      guestChoreographer: 'Rohan & Ananya',
      date: 'Sep 06, 2026',
      time: '02:00 PM - 06:00 PM',
      location: 'Studio Ballroom A, Kukatpally',
      price: 1999,
      level: 'Family & Couples',
      danceStyle: 'Bolly-Hop & Wedding Remix',
      seatsLeft: 7,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.',
      status: 'UPCOMING'
    }
  ];

  // Helper function to check if an event date falls within 28 days (1 month) from today
  const isWithin28Days = (dateStr, status) => {
    // Past events are explicitly excluded
    if (status === 'PAST' || (dateStr && dateStr.includes('Past Event'))) return false;

    if (!dateStr) return true;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 28);
      maxDate.setHours(23, 59, 59, 999);

      // Clean date string (e.g. "Aug 29, 2026", "Saturday, Aug 29")
      const cleaned = dateStr.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i, '');
      let parsedDate = new Date(cleaned);

      // If missing year (e.g. "Aug 29"), assume current year 2026
      if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date(`${cleaned}, ${today.getFullYear()}`);
      }

      if (!isNaN(parsedDate.getTime())) {
        return parsedDate >= today && parsedDate <= maxDate;
      }
    } catch {
      return true;
    }
    return true;
  };

  // Combine events from props (admin catalog & backend) + defaults
  const allAvailableEvents = events.length > 0 ? events : defaultWorkshops;

  // Filter events to ONLY include those scheduled within the next 28 days
  const eventsWithin28Days = allAvailableEvents.filter(item => isWithin28Days(item.date, item.status));

  // If no admin events fall within 28 days, use defaults so homepage is never empty
  const displayEvents = eventsWithin28Days.length > 0 ? eventsWithin28Days : defaultWorkshops;

  return (
    <section id="workshops" className="bg-[#000000] text-[#FFFFFF] py-16 sm:py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0044] text-white text-xs font-black uppercase tracking-widest rounded-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS SPECIAL HIGHLIGHTS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
              UPCOMING EVENTS & WORKSHOPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal mt-2 max-w-xl">
              Check out our upcoming weekend workshops, celebrity masterclasses, and wedding choreography bootcamps.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 backdrop-blur-md">
            <Flame className="w-4 h-4 text-[#FF0044] animate-pulse" />
            <span>{displayEvents.length} Active Event{displayEvents.length > 1 ? 's' : ''} Open for Registration</span>
          </div>
        </div>

        {/* Workshop Cards Grid (Renders ALL events occurring within 28 days - Matching Screenshot Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white text-slate-900 border border-slate-200/90 rounded-[1.5rem] p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl group"
            >
              <div>
                {/* 1. TOP POSTER IMAGE */}
                <div className="relative h-[220px] -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[1.3rem] bg-slate-900 border-b border-slate-100">
                  <img
                    src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* ★ OG BADGE */}
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-black text-slate-900 shadow-md">
                    ★ OG
                  </span>

                  {/* STATUS BADGE */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#FF0055] text-white text-[9px] font-black uppercase rounded-full shadow-md">
                    🔥 {item.seatsLeft || 5} Seats Left
                  </span>
                </div>

                {/* 2. EVENT TITLE */}
                <h3 className="text-xl font-bold font-sans text-slate-900 leading-snug mb-3 min-h-[56px] flex items-center">
                  {item.title}
                </h3>

                {/* 3. DATE & SLOTS PILL BOX (ROUNDED WHITE INPUT BOX STYLE - MATCHING SCREENSHOT) */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 flex items-start gap-3 mb-2.5 shadow-2xs">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {item.date || 'Aug 29, 2026'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight">
                      {item.time || '2 Slots Available'}
                    </span>
                  </div>
                </div>

                {/* 4. LOCATION PILL BOX (ROUNDED WHITE INPUT BOX STYLE - MATCHING SCREENSHOT) */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 flex items-start gap-3 mb-4 shadow-2xs">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-slate-900 block leading-tight truncate">
                      {item.location || 'Ethos Studio Kukatpally'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight truncate">
                      Exact location shared after registration
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. PRICE & ACTION FOOTER (MATCHING SCREENSHOT) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Starting from</span>
                  <span className="text-xl font-bold font-sans text-slate-900">₹{item.price || 1499}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectEvent && onSelectEvent({ id: item.id, title: item.title, price: item.price || 1499, type: 'Workshop Ticket' })}
                    className="py-2.5 px-5 bg-black hover:bg-slate-800 text-white text-xs font-bold font-sans rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigator.share ? navigator.share({ title: item.title, url: window.location.href }) : alert(`Link for ${item.title} copied!`); }}
                    className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
                    title="Share Event"
                  >
                    <Share2 className="w-4 h-4" />
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
