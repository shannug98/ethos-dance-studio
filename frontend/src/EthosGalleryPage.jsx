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

  // Photos for Column 3 (Scrolls UP - Hidden on small mobile for clean 2-col look, visible on md+)
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#131415] font-sans selection:bg-[#FF0044] selection:text-white overflow-x-hidden">
      
      {/* Standard Unified Navbar */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* 🌟 3-COLUMN VERTICAL MARQUEE HERO SECTION */}
        <section className="py-8 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side Text Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF0044] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS CLUBS & COMMUNITY LINKS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-display tracking-tight text-[#050505] leading-[1.02] sm:leading-[0.95] uppercase">
              Click in, vibe out— <br className="hidden sm:block" />
              <span className="text-[#FF0044]">your next favourite</span> <br className="hidden sm:block" />
              dance club is waiting!
            </h1>

            {/* Joined Counter Badge with Overlapping Avatars */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E0D9CD] rounded-full shadow-sm">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-wide">
                50K+ Joined Already 🔥
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-lg">
              Hyderabad just got a lot more fun! Pick your favourite dance club below, join the WhatsApp group with like-minded dancers, and be part of the Ethos tribe.
            </p>

            <div className="pt-2">
              <a
                href="#explore-clubs"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-[#111111] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full shadow-xl hover:bg-[#FF0044] transition-all"
              >
                <span>Explore All Clubs</span>
                <span>🥳</span>
              </a>
            </div>

          </div>

          {/* Right Side: Animated Image Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 h-[420px] sm:h-[550px] overflow-hidden relative rounded-2xl sm:rounded-3xl bg-[#F0EBE1] p-2.5 sm:p-3 border-2 border-[#E2DACD] shadow-inner">
            
            {/* Top & Bottom Soft Fading Gradients */}
            <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b from-[#F0EBE1] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-[#F0EBE1] to-transparent z-10 pointer-events-none" />

            {/* COLUMN 1: MOVES UP CONTINUOUSLY */}
            <div className="flex flex-col gap-2.5 sm:gap-4 animate-vertical-up">
              {[...col1Photos, ...col1Photos].map((imgUrl, i) => (
                <div key={i} className="w-full h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* COLUMN 2: MOVES DOWN CONTINUOUSLY */}
            <div className="flex flex-col gap-2.5 sm:gap-4 animate-vertical-down">
              {[...col2Photos, ...col2Photos].map((imgUrl, i) => (
                <div key={i} className="w-full h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* COLUMN 3: MOVES UP CONTINUOUSLY (Visible on Tablet/Desktop md+) */}
            <div className="hidden md:flex flex-col gap-2.5 sm:gap-4 animate-vertical-up-slow">
              {[...col3Photos, ...col3Photos].map((imgUrl, i) => (
                <div key={i} className="w-full h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* 🚀 CLUBS & COMMUNITY GROUPS GRID */}
        <section id="explore-clubs" className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#EAE6DF]">
          
          <div className="text-center space-y-3 mb-10 sm:mb-14">
            <span className="px-3 py-1 bg-[#1F41FF] text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest rounded-full inline-block">
              EXPLORE DANCE CLUBS IN HYDERABAD
            </span>
            <h2 className="text-3xl sm:text-6xl font-black font-display text-black uppercase tracking-tight leading-tight">
              PICK YOUR DANCE TRIBE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-normal px-2">
              Join active WhatsApp groups, meet fellow dancers, participate in weekend jam sessions, and showcase your passion!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ethosClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white border-2 border-[#EBE7DF] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#FF0044] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 sm:h-64 overflow-hidden bg-black">
                    <img
                      src={club.image}
                      alt={club.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 bg-black/80 text-white text-[10px] sm:text-xs font-extrabold uppercase rounded-full backdrop-blur-md">
                      {club.tag}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FF0044]">
                      <Users className="w-4 h-4" />
                      <span>{club.members}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-black uppercase font-display leading-snug">{club.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{club.desc}</p>
                    
                    <div className="text-[11px] sm:text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                      🕒 {club.schedule}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <a
                    href="https://chat.whatsapp.com/EthosDanceStudioKukatpally"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 sm:py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Join WhatsApp Club</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </section>
      </main>

      {/* Standard Footer */}
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
