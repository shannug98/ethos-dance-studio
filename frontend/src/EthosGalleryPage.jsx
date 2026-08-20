import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, MessageCircle, Users, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Photos for Column 1 (Scrolls DOWN ⬇️)
  const col1Photos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 2 (Scrolls UP ⬆️)
  const col2Photos = [
    'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 3 (Scrolls DOWN ⬇️)
  const col3Photos = [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
  ];

  // HeyClicky-Inspired macOS Window Dance Clubs Data
  const ethosClubs = [
    {
      id: 'hiphop',
      fileName: 'urban_hiphop_tribe.app',
      title: 'Urban Hip-Hop & Grooves Tribe',
      members: '180+ Active Dancers',
      schedule: 'Mon, Wed, Fri • 8:00 PM',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      tag: '🔥 HIGH ENERGY',
      kao: '(🔥_🔥)',
      badgeColor: 'bg-[#FF0055] text-white',
      accentColor: 'from-[#FF0055]/15 to-[#7928CA]/15',
      desc: 'Bounce, body isolations, speed execution & commercial swag routine.'
    },
    {
      id: 'sangeet',
      fileName: 'sangeet_royal.app',
      title: 'Royal Wedding Sangeet Collective',
      members: '120+ Families',
      schedule: 'Custom Weekend Slots',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      tag: '👑 ROYAL VIBE',
      kao: '{ ^-^ }',
      badgeColor: 'bg-amber-500 text-slate-950',
      accentColor: 'from-amber-500/15 to-rose-500/15',
      desc: 'Grand family flashmobs, entrance choreo, and custom track mixing.'
    },
    {
      id: 'kids',
      fileName: 'kids_stars_club.app',
      title: 'Ethos Little Stars Kids Club',
      members: '95+ Superstars',
      schedule: 'Mon - Fri • 5:00 PM & 7:00 PM',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
      tag: '⭐ AGES 4-12',
      kao: '^ ω ^',
      badgeColor: 'bg-emerald-500 text-slate-950',
      accentColor: 'from-emerald-500/15 to-cyan-500/15',
      desc: 'Fun rhythm games, stage presentation, and beat coordination.'
    },
    {
      id: 'fitness',
      fileName: 'morning_cardio_crew.app',
      title: 'Morning Dance Fitness Crew',
      members: '140+ Sweat Squad',
      schedule: 'Mon - Fri • 7:30 AM',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      tag: '🌅 MORNING CARDIO',
      kao: '(¬_¬)',
      badgeColor: 'bg-[#0088FF] text-white',
      accentColor: 'from-[#0088FF]/15 to-indigo-500/15',
      desc: 'Rhythm fitness, cardio jam & calorie burn workout for any age.'
    },
    {
      id: 'bollyhop',
      fileName: 'bollywood_fusion.app',
      title: 'Bollywood Commercial Fusion',
      members: '210+ Bollywood Lovers',
      schedule: 'Mon - Fri • 6:00 PM',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      tag: '🎶 TRENDING HITS',
      kao: '¯\\_(ツ)_/¯',
      badgeColor: 'bg-purple-600 text-white',
      accentColor: 'from-purple-500/15 to-pink-500/15',
      desc: 'Hit Bollywood chartbusters blended with modern Afro and Hip-Hop swag.'
    },
    {
      id: 'heels',
      fileName: 'heels_glam_squad.app',
      title: 'Heels & Commercial Glam Club',
      members: '75+ Glam Squad',
      schedule: 'Saturday Special Workshops',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      tag: '💃 CONFIDENCE & LINES',
      kao: '(★_★)',
      badgeColor: 'bg-pink-500 text-white',
      accentColor: 'from-pink-500/15 to-rose-500/15',
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

            {/* COLUMN 1: SLIDES DOWN ⬇️ */}
            <div className="flex flex-col gap-3 animate-vertical-down">
              {[...col1Photos, ...col1Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="Ethos Dance Moment" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* COLUMN 2: SLIDES UP ⬆️ */}
            <div className="flex flex-col gap-3 animate-vertical-up">
              {[...col2Photos, ...col2Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="Ethos Dance Moment" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* COLUMN 3: SLIDES DOWN ⬇️ */}
            <div className="hidden sm:flex flex-col gap-3 animate-vertical-down">
              {[...col3Photos, ...col3Photos].map((imgUrl, i) => (
                <div key={i} className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-md">
                  <img src={imgUrl} alt="Ethos Dance Moment" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* 🌟 HEYCLICKY-INSPIRED RETRO macOS APP WINDOWS DANCE CLUBS GRID 🌟 */}
        <section id="explore-clubs" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
          
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-black uppercase tracking-widest rounded-full">
              <Terminal className="w-3.5 h-3.5" />
              <span>ETHOS MACOS DESKTOP APP DIRECTORY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              CHOOSE YOUR DANCE CLUB
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Click into any active Ethos macOS window to join the official WhatsApp tribe and access weekly routines!
            </p>
          </div>

          {/* RETRO MACOS WINDOW CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ethosClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white border border-slate-300 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 relative"
              >
                
                {/* 🌟 HEYCLICKY RETRO MACOS TITLEBAR HEADER 🌟 */}
                <div className="bg-[#E4E4E7] border-b border-slate-300 px-4 py-2.5 flex items-center justify-between select-none shrink-0">
                  
                  {/* macOS Window Control Dots (Red, Yellow, Green) */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-xs inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-xs inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-xs inline-block"></span>
                  </div>

                  {/* Retro Window File Name & Kaomoji */}
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-700">
                    <span className="opacity-60">{club.kao}</span>
                    <span>{club.fileName}</span>
                  </div>

                  {/* Window Action Icon */}
                  <span className="text-slate-400 text-xs font-mono font-bold">⌘</span>

                </div>

                {/* WINDOW MAIN BODY CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* High-Res Photo Container with Retro Window Border */}
                    <div className="h-52 rounded-xl overflow-hidden mb-4 relative border border-slate-200 shadow-inner bg-slate-900 group-hover:border-slate-400 transition-colors">
                      <img
                        src={club.image}
                        alt={club.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Right Floating Badge */}
                      <span className={`absolute top-3 right-3 px-3 py-1 text-[9.5px] font-black uppercase rounded-full shadow-md tracking-wider ${club.badgeColor}`}>
                        {club.tag}
                      </span>

                      {/* Bottom Left Live Status Pill */}
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{club.members}</span>
                      </div>
                    </div>

                    {/* Window Content Title */}
                    <h3 className="text-xl font-black font-syne text-slate-900 uppercase mb-2 group-hover:text-[#FF0055] transition-colors leading-snug">
                      {club.title}
                    </h3>

                    {/* Description Note Box */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 bg-slate-50 border border-slate-200/90 rounded-xl p-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">// ETHOS CLUB NOTE</span>
                      {club.desc}
                    </p>

                    {/* Schedule Line */}
                    <div className="text-[11px] font-bold text-slate-700 flex items-center gap-2 mb-6 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
                      <span>⏰</span>
                      <span>{club.schedule}</span>
                    </div>
                  </div>

                  {/* 🚀 GLOSSY RETRO WHATSAPP CTA BUTTON 🚀 */}
                  <a
                    href={`https://wa.me/918341701113?text=Hi%20Ethos%20Studio!%20I%20want%20to%20join%20the%20${encodeURIComponent(club.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1faa52] text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-between transition-all duration-200 shadow-md hover:shadow-lg group/btn relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Join WhatsApp Club</span>
                    </div>
                    <span className="font-mono text-xs text-white/80 group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>

                </div>

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

      {/* Floating AI Bot & Social Dock */}
      <FloatingWhatsApp />
    </div>
  );
}
