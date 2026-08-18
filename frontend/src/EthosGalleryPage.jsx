import React, { useState } from 'react';
import { Sparkles, ArrowLeft, MessageCircle, Users, CheckCircle2, Flame, ExternalLink } from 'lucide-react';
import { LOGO_TRANSPARENT_BASE64 } from './assets/logoBase64';

export default function EthosGalleryPage() {
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#131415] font-sans selection:bg-[#FF0044] selection:text-white overflow-x-hidden">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#EAE6DF] h-[76px] px-6 sm:px-12 flex items-center justify-between shadow-sm">
        <a href="/" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#FF0044] transition-colors">
          <ArrowLeft className="w-4 h-4 text-[#FF0044]" />
          <span>Back to Main Studio Website</span>
        </a>

        <div className="flex items-center gap-3">
          <span className="font-display-giant text-2xl sm:text-3xl text-black tracking-tighter uppercase font-black">
            ETHOS<span className="text-[#FF0044]">.</span> COMMUNITIES
          </span>
        </div>

        <a
          href="/#checkout"
          className="px-5 py-2.5 bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-full hover:bg-[#FF0044] transition-all shadow-md"
        >
          Join The Tribe
        </a>
      </header>

      {/* 🌟 3-COLUMN VERTICAL INFINITE MARQUEE SECTION MATCHING COMMUNITIE.IN LAYOUT */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
        
        {/* Left Side Text Content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF0044] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>ETHOS CLUBS & COMMUNITY LINKS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#050505] leading-[0.95] uppercase">
            Click in, vibe out— <br />
            <span className="text-[#FF0044]">your next favourite</span> <br />
            dance club is waiting!
          </h1>

          {/* Joined Counter Badge with Overlapping Avatars */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-[#E0D9CD] rounded-full shadow-md">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="" />
            </div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
              50K+ Joined Already 🔥
            </span>
          </div>

          <p className="text-base text-slate-600 leading-relaxed font-normal max-w-lg">
            Hyderabad just got a lot more fun! Pick your favourite dance club below, join the WhatsApp group with like-minded dancers, and be part of the Ethos tribe.
          </p>

          <div className="pt-2">
            <a
              href="#explore-clubs"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-sm font-extrabold uppercase tracking-wider rounded-full shadow-xl hover:bg-[#FF0044] hover:scale-105 transition-all"
            >
              <span>Explore All Clubs</span>
              <span>🥳</span>
            </a>
          </div>

        </div>

        {/* Right Side: 3 Vertical Moving Photo Columns */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-4 h-[550px] overflow-hidden relative rounded-3xl bg-[#F0EBE1] p-3 border-2 border-[#E2DACD] shadow-inner">
          
          {/* Top & Bottom Soft Fading Gradients */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F0EBE1] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F0EBE1] to-transparent z-10 pointer-events-none" />

          {/* COLUMN 1: MOVES UP CONTINUOUSLY */}
          <div className="flex flex-col gap-4 animate-vertical-up">
            {[...col1Photos, ...col1Photos].map((imgUrl, i) => (
              <div key={i} className="w-full h-44 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* COLUMN 2: MOVES DOWN CONTINUOUSLY */}
          <div className="flex flex-col gap-4 animate-vertical-down">
            {[...col2Photos, ...col2Photos].map((imgUrl, i) => (
              <div key={i} className="w-full h-44 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* COLUMN 3: MOVES UP CONTINUOUSLY */}
          <div className="flex flex-col gap-4 animate-vertical-up-slow">
            {[...col3Photos, ...col3Photos].map((imgUrl, i) => (
              <div key={i} className="w-full h-44 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black shrink-0">
                <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-500" />
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* 🚀 CLUBS & COMMUNITY GROUPS GRID */}
      <section id="explore-clubs" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#EAE6DF]">
        
        <div className="text-center space-y-3 mb-14">
          <span className="px-3.5 py-1 bg-[#1F41FF] text-white text-xs font-extrabold uppercase tracking-widest rounded-full inline-block">
            EXPLORE DANCE CLUBS IN HYDERABAD
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-display text-black uppercase tracking-tight">
            PICK YOUR DANCE TRIBE
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-normal">
            Join active WhatsApp groups, meet fellow dancers, participate in weekend jam sessions, and showcase your passion!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ethosClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white border-2 border-[#EBE7DF] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#FF0044] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={club.image}
                    alt={club.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-xs font-extrabold uppercase rounded-full backdrop-blur-md">
                    {club.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF0044]">
                    <Users className="w-4 h-4" />
                    <span>{club.members}</span>
                  </div>

                  <h3 className="text-xl font-black text-black uppercase font-display">{club.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{club.desc}</p>
                  
                  <div className="text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                    🕒 {club.schedule}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="https://chat.whatsapp.com/EthosDanceStudioKukatpally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Join WhatsApp Club</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-12 text-center text-xs text-slate-400 space-y-3 border-t border-slate-800">
        <div className="font-extrabold text-white uppercase text-base font-display">ETHOS DANCE STUDIO COMMUNITIES</div>
        <p>Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Kukatpally, Hyderabad, Telangana 500085</p>
        <p>© 2026 Ethos Dance Studio. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
