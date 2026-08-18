import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { Calendar, Clock, MapPin, Sparkles, Users, Award, PlayCircle, Filter } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'live', 'past'
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  const upcomingEvents = [
    {
      id: 301,
      title: 'International Afro-Fusion Masterclass',
      guestChoreographer: 'Koffi & Team (Paris)',
      date: 'Saturday, Aug 29, 2026',
      time: '05:00 PM - 08:00 PM',
      location: 'Ethos Grand Arena, Kukatpally',
      price: 1499,
      seatsLeft: 5,
      type: 'Upcoming',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists.'
    },
    {
      id: 302,
      title: 'Wedding Sangeet Flashmob Bootcamp',
      guestChoreographer: 'Rohan & Ananya',
      date: 'Sunday, Sep 06, 2026',
      time: '02:00 PM - 06:00 PM',
      location: 'Studio Ballroom A, Kukatpally',
      price: 1999,
      seatsLeft: 7,
      type: 'Upcoming',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'A complete 4-hour intensive to master viral wedding entrance dance steps, family group sync, and stage tricks.'
    }
  ];

  const liveEvents = [
    {
      id: 303,
      title: 'Ethos Monsoon Dance Championship 2026',
      status: '🔴 LIVE REHEARSALS IN PROGRESS',
      date: 'Today • Aug 18, 2026',
      time: '06:00 PM Onwards',
      location: 'Ethos Main Stage, Nizampet Rd Kukatpally',
      attendees: '250+ Dancers & Spectators',
      type: 'Live',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      description: 'Live studio rehearsals & solo freestyle battle for the annual Ethos Cup trophy.'
    }
  ];

  const pastEvents = [
    {
      id: 304,
      title: 'Ethos Mega Hyderabad Flashmob 2025',
      date: 'Dec 20, 2025',
      location: 'Nexus Mall Kukatpally',
      views: '500K+ Viral Views',
      highlights: '150 Dancers Synchronized Routine',
      type: 'Past',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      description: 'Over 150 Ethos students gathered at Nexus Mall for a surprise Bollywood fusion flashmob that went viral across Instagram reels.'
    },
    {
      id: 305,
      title: 'Summer Stage Showcase & Graduation 2025',
      date: 'May 15, 2025',
      location: 'Shilpakala Vedika Auditorium',
      views: '1,200 Audience Members',
      highlights: 'Kids & Adult Batch Performances',
      type: 'Past',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      description: 'Annual grand stage production featuring student choreography across Hip-Hop, Heels, Contemporary and Sangeet routines.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0044] via-[#1F41FF] to-[#D900FF] p-8 text-center text-white font-display uppercase tracking-widest">
          <h1 className="text-4xl sm:text-6xl font-black font-display-giant">ETHOS DANCE EVENTS</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2">Upcoming Masterclasses • Live Rehearsals • Past Stage Highlights</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          
          {/* Tab Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#FF0044] text-white shadow-lg scale-105'
                  : 'bg-[#111111] text-slate-400 border border-[#333333] hover:text-white'
              }`}
            >
              🔥 Upcoming Events ({upcomingEvents.length})
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'live'
                  ? 'bg-[#1F41FF] text-white shadow-lg scale-105'
                  : 'bg-[#111111] text-slate-400 border border-[#333333] hover:text-white'
              }`}
            >
              🔴 Live Events ({liveEvents.length})
            </button>

            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'past'
                  ? 'bg-[#D900FF] text-black shadow-lg scale-105'
                  : 'bg-[#111111] text-slate-400 border border-[#333333] hover:text-white'
              }`}
            >
              ✨ Past Highlights ({pastEvents.length})
            </button>
          </div>

          {/* TAB 1: UPCOMING EVENTS */}
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#111111] border border-[#262626] rounded-2xl overflow-hidden shadow-xl hover:border-[#FF0044] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF0044] text-white text-xs font-extrabold uppercase rounded-full">
                        Only {item.seatsLeft} Seats Left!
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-2xl font-extrabold text-white uppercase font-display">{item.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                      
                      <div className="space-y-2 pt-3 text-xs font-semibold text-slate-300 border-t border-[#222222]">
                        <div>📅 Date: <strong>{item.date}</strong></div>
                        <div>🕒 Time: <strong>{item.time}</strong></div>
                        <div>📍 Venue: <strong>{item.location}</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between">
                    <span className="text-2xl font-black text-white font-display">₹{item.price}</span>
                    <button
                      onClick={() => setSelectedItemForBooking({ id: item.id, title: item.title, price: item.price, type: 'Event Ticket' })}
                      className="btn-cyan text-xs py-3 px-6 font-extrabold uppercase tracking-wider"
                    >
                      Reserve Event Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: LIVE EVENTS */}
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 gap-8">
              {liveEvents.map((item) => (
                <div key={item.id} className="bg-[#111111] border-2 border-[#1F41FF] rounded-2xl overflow-hidden p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 h-72 rounded-xl overflow-hidden bg-black">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:col-span-6 space-y-4 text-left">
                    <span className="px-3 py-1 bg-[#1F41FF] text-white text-xs font-extrabold uppercase rounded-full inline-block animate-pulse">
                      {item.status}
                    </span>
                    <h3 className="text-3xl font-black uppercase font-display text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    <div className="space-y-1 text-xs text-slate-400 font-bold border-t border-[#222222] pt-3">
                      <div>📍 {item.location}</div>
                      <div>👥 {item.attendees}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PAST ETHOS EVENTS SHOWCASE */}
          {activeTab === 'past' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((item) => (
                <div key={item.id} className="bg-[#111111] border border-[#262626] rounded-2xl overflow-hidden shadow-lg space-y-4">
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-[#D900FF] text-xs font-extrabold uppercase rounded-full backdrop-blur-md border border-[#D900FF]/30">
                      🏆 {item.highlights}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#D0FBF9]">
                      <span>📅 {item.date}</span>
                      <span>🔥 {item.views}</span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase font-display">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
