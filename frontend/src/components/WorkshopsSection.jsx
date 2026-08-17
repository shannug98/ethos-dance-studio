import React from 'react';

export default function WorkshopsSection({ events = [], onSelectEvent }) {
  const defaultWorkshops = [
    {
      id: 201,
      title: 'International Afro-Fusion Masterclass',
      guestChoreographer: 'Koffi & Team (Paris)',
      date: 'Saturday, Aug 29',
      time: '05:00 PM - 08:00 PM',
      location: 'Main Grand Arena',
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
      location: 'Studio Ballroom A',
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
    <section id="workshops" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D900FF] block mb-2">SPECIAL EVENTS & MASTERCLASSES</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            WORKSHOPS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEvent && onSelectEvent({ id: item.id, title: item.title, price: item.price, type: 'Workshop Ticket' })}
              className="bg-[#111111] border border-[#333333] flex flex-col justify-between group hover:border-[#1F41FF] cursor-pointer transition-all p-6 space-y-4"
            >
              <div className="relative h-64 overflow-hidden bg-[#000000] -mx-6 -mt-6 mb-2">
                <img
                  src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#D900FF] text-[#000000] text-xs font-extrabold uppercase">
                  Only {item.seatsLeft || 5} Seats Left!
                </span>
              </div>

              <span className="text-xs font-bold text-[#D0FBF9] uppercase tracking-wider block">{item.danceStyle}</span>
              <h3 className="text-2xl font-extrabold text-white uppercase font-display">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              
              <div className="text-xs text-slate-400 font-semibold pt-3 border-t border-[#222222] flex justify-between items-center">
                <span>📅 {item.date} • {item.time}</span>
                <span className="text-white font-extrabold text-lg">₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
