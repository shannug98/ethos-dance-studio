import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, UserCheck } from 'lucide-react';

export default function WorkshopsSection({ events = [], onSelectEvent }) {
  const defaultWorkshops = [
    {
      id: 201,
      title: 'International Afro-Fusion Masterclass',
      guestChoreographer: 'Koffi & Team (Paris)',
      date: 'Saturday, Aug 29',
      time: '05:00 PM - 08:00 PM',
      location: 'Ethos Grand Arena, Kukatpally',
      price: 1499,
      level: 'Open to All',
      danceStyle: 'Afro-Beats & Amapiano',
      seatsLeft: 5,
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists.'
    },
    {
      id: 202,
      title: 'Wedding Sangeet Flashmob Bootcamp',
      guestChoreographer: 'Rohan & Ananya',
      date: 'Sunday, Sep 06',
      time: '02:00 PM - 06:00 PM',
      location: 'Studio Ballroom A, Kukatpally',
      price: 1999,
      level: 'Family & Couples',
      danceStyle: 'Bolly-Hop & Wedding Remix',
      seatsLeft: 7,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.'
    }
  ];

  const workshopList = events.length > 0 ? events : defaultWorkshops;

  return (
    <section id="workshops" className="bg-[#000000] text-[#FFFFFF] py-16 sm:py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0044] text-white text-xs font-black uppercase tracking-widest rounded-sm mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETHOS SPECIAL HIGHLIGHTS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            UPCOMING EVENTS & WORKSHOPS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-2 max-w-xl">
            Check out our upcoming weekend workshops, celebrity masterclasses, and wedding choreography bootcamps below.
          </p>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEvent && onSelectEvent({ id: item.id, title: item.title, price: item.price, type: 'Workshop Ticket' })}
              className="bg-[#111111] border border-[#333333] flex flex-col justify-between group hover:border-[#FF0044] cursor-pointer transition-all p-6 space-y-4 rounded-xl"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#000000] -mx-6 -mt-6 mb-4 rounded-t-xl">
                  <img
                    src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF0044] text-white text-xs font-extrabold uppercase rounded-full shadow-lg">
                    🔥 Only {item.seatsLeft || 5} Seats Left!
                  </span>
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 text-[#D0FBF9] text-xs font-extrabold uppercase rounded-full backdrop-blur-md">
                    {item.danceStyle}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-white uppercase font-display">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.description}</p>

                  {/* Detailed Upcoming Event Meta */}
                  <div className="space-y-2 pt-3 text-xs font-semibold text-slate-300 border-t border-[#222222]">
                    <div className="flex items-center gap-2 text-[#D0FBF9]">
                      <UserCheck className="w-4 h-4 text-[#FF0044]" />
                      <span>Guest Choreographer: <strong>{item.guestChoreographer}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1F41FF]" />
                      <span>Date: <strong>{item.date}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D900FF]" />
                      <span>Time: <strong>{item.time}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF0044]" />
                      <span>Venue: <strong>{item.location}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Pass Fee</span>
                  <span className="text-white font-extrabold text-2xl font-display">₹{item.price}</span>
                </div>

                <button className="btn-cyan text-xs py-2.5 px-5 font-extrabold uppercase tracking-wider">
                  Reserve Event Ticket
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
