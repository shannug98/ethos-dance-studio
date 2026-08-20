import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, Play, Pause, Volume2, VolumeX, Maximize2, Terminal, Film, Award, Flame } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [mutedStates, setMutedStates] = useState({});

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
    'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 3 (Scrolls DOWN ⬇️)
  const col3Photos = [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
  ];

  // 🌟 HEYCLICKY RETRO MACOS ALL-TIME FAMOUS ETHOS VIDEO GALLERY 🌟
  const ethosVideoGallery = [
    {
      id: 'street-jam',
      fileName: 'ethos_street_jam.mov',
      title: 'Urban Hip-Hop Stage Showcase',
      category: '🔥 ALL-TIME FAMOUS',
      kao: '(🔥_🔥)',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-young-people-dancing-hip-hop-41484-large.mp4',
      poster: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      tagline: 'High-speed isolations, bounce, and group stage sync performance.',
      year: '2026 HIGHLIGHT',
      badgeColor: 'bg-[#FF0055] text-white',
    },
    {
      id: 'sangeet-duet',
      fileName: 'royal_sangeet_duet.mov',
      title: 'Grand Royal Sangeet Couple Entry',
      category: '👑 WEDDING HIGHLIGHT',
      kao: '{ ^-^ }',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-couple-dancing-at-a-wedding-reception-42868-large.mp4',
      poster: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      tagline: 'Bespoke bridal entrance choreography and viral family flashmob.',
      year: 'ALL-TIME FAVORITE',
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'stage-showcase',
      fileName: 'annual_gala_finale.mov',
      title: 'Annual Grand Stage Performance',
      category: '✨ STAGE FINALE',
      kao: '¯\\_(ツ)_/¯',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dancers-performing-on-stage-41486-large.mp4',
      poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      tagline: 'End-of-year all-stars performance at Ethos Arena Hyderabad.',
      year: 'HALL OF FAME',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'contemporary-solo',
      fileName: 'contemporary_flow.mov',
      title: 'Lyrical Contemporary & Floorwork',
      category: '🎭 ARTISTIC EXPRESSION',
      kao: '(¬_¬)',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-sensually-in-a-studio-41485-large.mp4',
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      tagline: 'Emotional storytelling, fluid momentum, and balance transitions.',
      year: 'FEATURED MASTERCLASS',
      badgeColor: 'bg-[#0088FF] text-white',
    },
    {
      id: 'heels-commercial',
      fileName: 'commercial_heels_glam.mov',
      title: 'Commercial High Heels Intensive',
      category: '💃 GLAM INTENSIVE',
      kao: '(★_★)',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41483-large.mp4',
      poster: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      tagline: 'Postural lines, confidence posture, and video-style commercial heels.',
      year: 'VIRAL REEL',
      badgeColor: 'bg-pink-500 text-white',
    },
    {
      id: 'street-battle',
      fileName: 'street_freestyle_battle.mov',
      title: 'Ethos Street Dance Jam & Battle',
      category: '⚡ FREESTYLE BATTLE',
      kao: '^ ω ^',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-breakdancers-performing-in-the-street-41482-large.mp4',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      tagline: 'High-octane cypher battle, live DJ beats, and student showcases.',
      year: 'CYPHER CHAMPIONSHIP',
      badgeColor: 'bg-emerald-500 text-slate-950',
    }
  ];

  const toggleMute = (id) => {
    setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans overflow-x-hidden">
      
      {/* Standard Unified Navbar */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] p-8 text-center text-white uppercase tracking-widest shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-black font-syne">ETHOS GALLERY & VIDEO HIGHLIGHTS</h1>
          <p className="text-xs sm:text-sm font-extrabold tracking-widest mt-2 opacity-90">All-Time Famous Performance Video Clips & Masterclass Moments</p>
        </div>

        {/* 🌟 3-COLUMN VERTICAL MARQUEE HERO SECTION */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side Text Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS ALL-TIME VIDEO ARCHIVE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-syne tracking-tight text-slate-900 leading-[1.02] sm:leading-[0.95] uppercase">
              Relive the magic— <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#0088FF]">famous performance clips</span> <br className="hidden sm:block" />
              from Ethos history!
            </h1>

            {/* Joined Counter Badge with Overlapping Avatars */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 shadow-md rounded-full">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="" />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-wide">
                500K+ Reel Views 🔥
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">
              Explore Ethos Dance Studio's legendary masterclasses, stage showcases, and Sangeet duets captured in high-definition video clips below!
            </p>

            <div className="pt-2">
              <a
                href="#video-showcase"
                className="py-4 px-8 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#0088FF]/30 inline-flex items-center justify-center gap-2"
              >
                <span>Watch Video Showcase</span>
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

        {/* 🌟 HEYCLICKY-INSPIRED RETRO macOS VIDEO WINDOW SHOWCASE SECTION 🌟 */}
        <section id="video-showcase" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
          
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-black uppercase tracking-widest rounded-full">
              <Film className="w-3.5 h-3.5" />
              <span>ETHOS MACOS VIDEO WINDOW GALLERY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              ALL-TIME FAMOUS HIGHLIGHTS
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Click into any active Ethos macOS video window to play legendary performance clips and masterclass routines!
            </p>
          </div>

          {/* RETRO MACOS VIDEO WINDOWS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ethosVideoGallery.map((item) => {
              const isMuted = mutedStates[item.id] !== false; // default muted

              return (
                <div
                  key={item.id}
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
                      <span className="opacity-60">{item.kao}</span>
                      <span>{item.fileName}</span>
                    </div>

                    {/* Window Action Icon */}
                    <span className="text-slate-400 text-xs font-mono font-bold">⌘</span>

                  </div>

                  {/* WINDOW MAIN BODY CONTENT */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    
                    <div>
                      {/* High-Res Video Container with Retro Window Border */}
                      <div className="h-56 rounded-xl overflow-hidden mb-4 relative border border-slate-200 shadow-inner bg-slate-950 group/vid">
                        
                        <video
                          src={item.videoUrl}
                          poster={item.poster}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />

                        {/* Top Right Category Badge */}
                        <span className={`absolute top-3 right-3 px-3 py-1 text-[9.5px] font-black uppercase rounded-full shadow-md tracking-wider ${item.badgeColor}`}>
                          {item.category}
                        </span>

                        {/* Bottom Left Live Status Pill */}
                        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          <span>{item.year}</span>
                        </div>

                        {/* Mute / Unmute Floating Audio Control Button */}
                        <button
                          onClick={() => toggleMute(item.id)}
                          className="absolute bottom-3 right-3 p-2 bg-black/80 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-110"
                          title={isMuted ? "Unmute Audio" : "Mute Audio"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-slate-300" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                          )}
                        </button>
                      </div>

                      {/* Video Title */}
                      <h3 className="text-xl font-black font-syne text-slate-900 uppercase mb-2 group-hover:text-[#FF0055] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Description Note Box */}
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 bg-slate-50 border border-slate-200/90 rounded-xl p-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">// ETHOS HIGHLIGHT REEL</span>
                        {item.tagline}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Award className="w-3.5 h-3.5 text-[#FF0055]" />
                        <span>Ethos Original</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">HD 1080P</span>
                    </div>

                  </div>

                </div>
              );
            })}
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
