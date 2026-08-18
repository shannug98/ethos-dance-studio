import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, MessageCircle, Users } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Photos for Column 1 (Scrolls UP)
  const col1Photos = [
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 2 (Scrolls DOWN)
  const col2Photos = [
    'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 3 (Scrolls UP)
  const col3Photos = [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80',
  ];

  // Ethos Clubs & Communities
  const ethosClubs = [
    {
      id: 'hiphop',
      title: 'Urban Hip-Hop & Grooves Tribe',
      members: '180+ Active Dancers',
      schedule: 'Mon, Wed, Fri • 8:00 PM',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      tag: '🔥 High Energy',
      desc: 'Bounce, body isolations, speed execution & commercial swag routine.'
    },
    {
      id: 'sangeet',
      title: 'Royal Wedding Sangeet Collective',
      members: '120+ Families',
      schedule: 'Custom Weekend Slots',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      tag: '✨ Royal Vibe',
      desc: 'Grand family flashmobs, entrance choreo, and custom track mixing.'
    },
    {
      id: 'kids',
      title: 'Ethos Little Stars Kids Club',
      members: '95+ Superstars',
      schedule: 'Mon - Fri • 5:00 PM & 7:00 PM',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
      tag: '⭐ Kids Ages 4-12',
      desc: 'Fun rhythm games, stage presentation, and beat coordination.'
    },
    {
      id: 'fitness',
      title: 'Morning Dance Fitness Crew',
      members: '140+ Sweat Squad',
      schedule: 'Mon - Fri • 7:30 AM',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      tag: '🌅 Morning Cardio',
      desc: 'Rhythm fitness, cardio jam & calorie burn workout for any age.'
    },
    {
      id: 'bollyhop',
      title: 'Bollywood Commercial Fusion',
      members: '210+ Bollywood Lovers',
      schedule: 'Mon - Fri • 6:00 PM',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      tag: '🎶 Trending Hits',
      desc: 'Hit Bollywood chartbusters blended with modern Afro and Hip-Hop swag.'
    },
    {
      id: 'heels',
      title: 'Heels & Commercial Glam Club',
      members: '75+ Glam Squad',
      schedule: 'Saturday Special Workshops',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      tag: '💃 Confidence & Lines',
      desc: 'Postural elegance, fluid lines, balance, and high-heels choreography.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans overflow-x-hidden">
      
      {/* Standard Unified Navbar */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] p-8 text-center text-white uppercase tracking-widest shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-black font-syne">ETHOS COMMUNITIES & GALLERY</h1>
          <p className="text-xs sm:text-sm font-extrabold tracking-widest mt-2 opacity-90">Hyderabad's Premier Dance Tribe & WhatsApp Clubs</p>
        </div>

        {/* 🌟 3-COLUMN VERTICAL MARQUEE HERO SECTION */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side Text Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS CLUBS & COMMUNITY LINKS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-syne tracking-tight text-slate-900 leading-[1.02] sm:leading-[0.95] uppercase">
              Click in, vibe out— <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#0088FF]">your next favourite</span> <br className="hidden sm:block" />
              dance club is waiting!
            </h1>

            {/* Joined Counter Badge with Overlapping Avatars */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 shadow-md rounded-full">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-wide">
                50K+ Joined Already 🔥
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">
              Hyderabad just got a lot more fun! Pick your favourite dance club below, join the WhatsApp group with like-minded dancers, and be part of the Ethos tribe.
            </p>

            <div className="pt-2">
              <a
                href="#explore-clubs"
                className="py-4 px-8 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#0088FF]/30 inline-flex items-center justify-center gap-2"
              >
                <span>Explore Dancers Community</span>
              </a>
            </div>

          </div>

          {/* Right Side: 3 Infinite Sliding Columns */}
          <div className="lg:col-span-6 h-[460px] sm:h-[540px] overflow-hidden relative rounded-3xl border border-slate-200 shadow-2xl bg-white p-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* Top & Bottom Fade Overlays */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none rounded-t-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none rounded-b-3xl" />

            {/* COLUMN 1: SLIDES UP */}
            <div className="flex flex-col gap-3 animate-infinite-scroll-up">
              {[...col1Photos, ...col1Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* COLUMN 2: SLIDES DOWN */}
            <div className="flex flex-col gap-3 animate-infinite-scroll-down">
              {[...col2Photos, ...col2Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* COLUMN 3: SLIDES UP */}
            <div className="hidden sm:flex flex-col gap-3 animate-infinite-scroll-up">
              {[...col3Photos, ...col3Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* 🌟 CLUBS GRID SECTION */}
        <section id="explore-clubs" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF0055] block mb-1">
              CHOOSE YOUR TRIBE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 uppercase">
              ETHOS DANCE CLUBS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ethosClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white border border-slate-200 shadow-xl rounded-3xl p-5 flex flex-col justify-between group hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                    <img src={club.image} alt={club.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-full">
                      {club.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black font-syne text-slate-900 uppercase mb-2">{club.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">{club.desc}</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-500 font-semibold mb-6">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Users className="w-4 h-4 text-[#0088FF]" />
                      <span>{club.members}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <span>⏰ {club.schedule}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918341701113?text=Hi%20Ethos%20Studio!%20I%20want%20to%20join%20the%20${encodeURIComponent(club.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Join WhatsApp Club</span>
                </a>
              </div>
            ))}
          </div>
        </section>

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
