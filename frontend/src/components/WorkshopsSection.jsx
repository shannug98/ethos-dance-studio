import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, UserCheck, Flame } from 'lucide-react';

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

        {/* Workshop Cards Grid (Renders ALL events occurring within 28 days) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEvent && onSelectEvent({ id: item.id, title: item.title, price: item.price || 1499, type: 'Workshop Ticket' })}
              className="bg-[#111111] border border-[#333333] flex flex-col justify-between group hover:border-[#FF0044] cursor-pointer transition-all p-6 space-y-4 rounded-2xl shadow-2xl relative"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-[#000000] -mx-6 -mt-6 mb-4 rounded-t-2xl">
                  <img
                    src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />

                  {/* ACTIVE REGISTRATION BADGE */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#22C55E] text-white text-[10px] font-black uppercase rounded-full shadow-lg border border-emerald-400/30 flex items-center gap-1">
                    <span>⚡ REGISTRATION OPEN</span>
                  </span>

                  <span className="absolute top-3 right-3 px-3 py-1 bg-[#FF0044] text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                    🔥 Only {item.seatsLeft || 5} Seats Left!
                  </span>

                  <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 text-[#D0FBF9] text-[10px] font-black uppercase rounded-full backdrop-blur-md">
                    {item.danceStyle || item.style || 'Masterclass'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-white uppercase font-display leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">{item.desc || item.description}</p>

                  {/* Detailed Event Meta */}
                  <div className="space-y-2 pt-3 text-xs font-semibold text-slate-300 border-t border-[#222222]">
                    <div className="flex items-center gap-2 text-[#D0FBF9]">
                      <UserCheck className="w-3.5 h-3.5 text-[#FF0044]" />
                      <span>Guest Choreographer: <strong>{item.choreographer || item.guestChoreographer || 'Ethos Team'}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0088FF]" />
                      <span>Date: <strong>{item.date}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D900FF]" />
                      <span>Time: <strong>{item.time || '5:00 PM - 8:00 PM'}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF0044]" />
                      <span>Venue: <strong>{item.location || 'Ethos Studio Kukatpally'}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase text-slate-400 block font-bold">Pass Fee</span>
                  <span className="text-white font-extrabold text-xl font-display">₹{item.price || 1499}</span>
                </div>

                <button className="btn-cyan text-xs py-2 px-4 font-extrabold uppercase tracking-wider rounded-xl">
                  Reserve Pass
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
