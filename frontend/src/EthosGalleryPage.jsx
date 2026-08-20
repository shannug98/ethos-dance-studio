import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, ChevronRight, X } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Lightbox Enlarged Image State (PURE PHOTO ONLY - NO PAYMENT POPUP)
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // Active Selected Category - Defaults to 'studio'
  const [photoFilter, setPhotoFilter] = useState('studio');

  const photoCollageRef = useRef(null);

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
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  ];

  // Photos for Column 3 (Scrolls DOWN ⬇️)
  const col3Photos = [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
  ];

  // 🌟 4 MAIN CATEGORIES
  const categoryCards = [
    {
      id: 'studio',
      title: 'Dance in Studio',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'workshops',
      title: 'Workshops',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'events',
      title: 'Events',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    }
  ];

  // 🌟 TRUE ASYMMETRIC ZIG-ZAG MASONRY COLLAGE DATA (VARYING ASPECT RATIOS MATCHING IMG 2)
  const densePhotoCollage = [
    // 💃 DANCE IN STUDIO PHOTOS (8 VARYING ASPECT RATIOS FOR TRUE ZIG-ZAG)
    { id: 101, category: 'studio', title: 'Studio Rehearsal Vibes', aspectRatio: 'aspect-[16/9]', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80' },
    { id: 102, category: 'studio', title: 'Commercial Choreography Batch', aspectRatio: 'aspect-[3/4]', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80' },
    { id: 103, category: 'studio', title: 'Hip-Hop Groove Practice', aspectRatio: 'aspect-[21/9]', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80' },
    { id: 104, category: 'studio', title: 'Bollywood Fusion Practice', aspectRatio: 'aspect-[4/5]', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { id: 105, category: 'studio', title: 'Contemporary Storytelling', aspectRatio: 'aspect-[9/16]', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { id: 106, category: 'studio', title: 'Mirror Synchronization Training', aspectRatio: 'aspect-[16/10]', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80' },
    { id: 107, category: 'studio', title: 'High Energy Cypher Batch', aspectRatio: 'aspect-[1/1]', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
    { id: 108, category: 'studio', title: 'Kids Dance Studio Batch', aspectRatio: 'aspect-[16/7]', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80' },

    // 🎟️ WORKSHOPS PHOTOS (8 VARYING ASPECT RATIOS FOR TRUE ZIG-ZAG)
    { id: 201, category: 'workshops', title: 'Celebrity Guest Masterclass', aspectRatio: 'aspect-[21/9]', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80' },
    { id: 202, category: 'workshops', title: 'Afro-Beats Speed Workshop', aspectRatio: 'aspect-[9/16]', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { id: 203, category: 'workshops', title: 'Kids Dance Bootcamp', aspectRatio: 'aspect-[4/3]', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
    { id: 204, category: 'workshops', title: 'International Choreographer Session', aspectRatio: 'aspect-[3/4]', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    { id: 205, category: 'workshops', title: 'Weekend Choreography Intensive', aspectRatio: 'aspect-[16/9]', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80' },
    { id: 206, category: 'workshops', title: 'Heels Styling Masterclass', aspectRatio: 'aspect-[4/5]', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { id: 207, category: 'workshops', title: 'Urban Commercial Bootcamp', aspectRatio: 'aspect-[1/1]', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' },
    { id: 208, category: 'workshops', title: 'Monsoon Beats & Drills', aspectRatio: 'aspect-[16/8]', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80' },

    // 🎉 EVENTS PHOTOS (8 VARYING ASPECT RATIOS FOR TRUE ZIG-ZAG)
    { id: 301, category: 'events', title: 'Stage Showcase Light Show', aspectRatio: 'aspect-[3/4]', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { id: 302, category: 'events', title: 'Royal Sangeet Entrance', aspectRatio: 'aspect-[16/9]', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
    { id: 303, category: 'events', title: 'Freestyle Cypher Jam', aspectRatio: 'aspect-[9/16]', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
    { id: 304, category: 'events', title: 'Annual Ethos Arena Gala', aspectRatio: 'aspect-[21/9]', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1400&q=80' },
    { id: 305, category: 'events', title: 'Live Stage Performance', aspectRatio: 'aspect-[4/5]', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { id: 306, category: 'events', title: 'Student Showcase Gala', aspectRatio: 'aspect-[16/10]', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80' },
    { id: 307, category: 'events', title: 'Street Dance Battle 2026', aspectRatio: 'aspect-[1/1]', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
    { id: 308, category: 'events', title: 'Festive Season Grand Showcase', aspectRatio: 'aspect-[16/7]', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80' },

    // 👔 CORPORATE EVENTS PHOTOS (8 VARYING ASPECT RATIOS FOR TRUE ZIG-ZAG)
    { id: 401, category: 'corporate', title: 'Corporate Team Choreography', aspectRatio: 'aspect-[16/9]', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80' },
    { id: 402, category: 'corporate', title: 'Annual Corporate Gala Night', aspectRatio: 'aspect-[3/4]', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' },
    { id: 403, category: 'corporate', title: 'Wedding Flashmob Rehearsal', aspectRatio: 'aspect-[21/9]', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80' },
    { id: 404, category: 'corporate', title: 'Royal Wedding Entry Performance', aspectRatio: 'aspect-[9/16]', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    { id: 405, category: 'corporate', title: 'Team Building Movement Session', aspectRatio: 'aspect-[4/3]', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { id: 406, category: 'corporate', title: 'Corporate Flashmob Surprise', aspectRatio: 'aspect-[4/5]', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80' },
    { id: 407, category: 'corporate', title: 'Executive Dance Workshop', aspectRatio: 'aspect-[1/1]', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80' },
    { id: 408, category: 'corporate', title: 'Grand Sangeet Production', aspectRatio: 'aspect-[16/8]', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80' }
  ];

  const handleCardClick = (catId) => {
    setPhotoFilter(catId);
    if (photoCollageRef.current) {
      photoCollageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only photos matching the selected category are displayed!
  const filteredPhotos = densePhotoCollage.filter(p => p.category === photoFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans overflow-x-hidden">
      
      {/* Standard Unified Navbar */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] p-8 text-center text-white uppercase tracking-widest shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-black font-syne">ETHOS COMMUNITIES & GALLERY</h1>
          <p className="text-xs sm:text-sm font-extrabold tracking-widest mt-2 opacity-90">Hyderabad's Premier Dance Studio, Workshops & Events</p>
        </div>

        {/* 🌟 3-COLUMN VERTICAL MARQUEE HERO SECTION */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side Text Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS GALLERY & COMMUNITY LOOKBOOK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-syne tracking-tight text-slate-900 leading-[1.02] sm:leading-[0.95] uppercase">
              Click in, vibe out— <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#0088FF]">your next favourite</span> <br className="hidden sm:block" />
              dance experience is waiting!
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
              Hyderabad just got a lot more fun! Select a category below to explore authentic photos from our studio, workshops, events, and corporate sessions.
            </p>

            <div className="pt-2">
              <a
                href="#explore-categories"
                className="py-4 px-8 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#0088FF]/30 inline-flex items-center justify-center gap-2"
              >
                <span>Explore Categories</span>
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

        {/* 🌟 1. 4 CATEGORY SHOWCASE GRID ("Looking for something more?") 🌟 */}
        <section id="explore-categories" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200">
          
          <div className="mb-10 text-left">
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 tracking-tight">
              Looking for something more?
            </h2>
          </div>

          {/* 4 ROUNDED CARDS GRID WITH WHITE PILL BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((card) => {
              const isActive = photoFilter === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`relative h-[340px] sm:h-[380px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 group border-4 ${
                    isActive ? 'border-[#0088FF] ring-4 ring-[#0088FF]/30 scale-[1.03]' : 'border-transparent hover:scale-[1.02]'
                  }`}
                >
                  {/* Photo background */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating White Pill Button Badge at Bottom Center */}
                  <div className="absolute bottom-6 inset-x-6 flex justify-center">
                    <button className="w-full py-3.5 px-5 bg-white hover:bg-slate-50 text-slate-900 text-sm font-black tracking-tight rounded-full shadow-2xl flex items-center justify-between transition-transform group-hover:scale-105">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  {/* Cute Sparkle Accent */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black">
                    ✨
                  </div>
                </div>
              );
            })}
          </div>

        </section>


        {/* 🌟 2. TRUE ASYMMETRIC ZIG-ZAG MASONRY COLLAGE (MATCHING SCREENSHOT IMG 2 EXACTLY - ULTRA TIGHT GAP) 🌟 */}
        <section ref={photoCollageRef} id="photo-collage" className="bg-[#FAF8F5] text-slate-900 py-16 px-1 sm:px-4 mt-8 relative overflow-hidden border-t border-slate-200">
          
          {/* Section Studio Pill Badge */}
          <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-xs font-black uppercase tracking-widest rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ETHOS VISUAL GALLERY LOOKBOOK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-slate-900 tracking-tight leading-tight uppercase">
              WHERE PASSION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF]">
                MEETS THE STAGE!
              </span>
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categoryCards.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPhotoFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                    photoFilter === cat.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* TRUE MASONRY COLUMNS LAYOUT WITH ULTRA-TIGHT SPACING & ASYMMETRIC ZIG-ZAG HEIGHTS */}
          <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1.5 p-1 bg-black/5 rounded-sm border border-slate-200">
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImage(item)}
                className="break-inside-avoid overflow-hidden bg-slate-900 group cursor-pointer relative rounded-none border border-black/80 mb-1.5 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full ${item.aspectRatio} object-cover group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            ))}
          </div>

        </section>

      </main>

      <Footer onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {/* 🌟 PURE PHOTO LIGHTBOX MODAL (NO PAYMENT BUTTONS OR POPUPS - PURE PHOTO ONLY) 🌟 */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in select-none"
          onClick={() => setActiveLightboxImage(null)}
        >
          {/* Close Button Top Right */}
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3.5 bg-white/10 hover:bg-white/20 rounded-full transition-all shadow-2xl z-20 cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Pure Enlarged Photo Container */}
          <div
            className="relative max-w-6xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-black flex items-center justify-center border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage.image}
              alt={activeLightboxImage.title}
              className="w-full h-full max-h-[88vh] object-contain"
            />
          </div>
        </div>
      )}

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
