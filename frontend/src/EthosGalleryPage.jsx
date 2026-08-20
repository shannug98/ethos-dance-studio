import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, Calendar, User, ChevronRight, MessageCircle, ArrowRight, Camera, Filter } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Active Selected Category (studio | workshops | events | corporate)
  const [activeCategory, setActiveCategory] = useState('studio');

  // Filter for Below Dense Photo Masonry Collage (all | studio | workshops | events | corporate)
  const [photoFilter, setPhotoFilter] = useState('all');

  const detailSectionRef = useRef(null);

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

  // 🌟 4 MAIN CATEGORIES (DANCE IN STUDIO, WORKSHOPS, EVENTS, CORPORATE EVENTS) - IMG 1 MATCHING
  const categoryCards = [
    {
      id: 'studio',
      title: 'Dance in Studio',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      headline: 'Dance in Studio',
      subhead: 'in Hyderabad,',
      description: 'Discover energetic dance in studio batches in Hyderabad with Ethos Studio. Whatever your interest—Commercial Hip-Hop, Bollywood Fusion, Contemporary, or Heels—Ethos helps you connect with dancers, master rhythm, and refine your technique.',
      doodleColor: 'text-amber-500',
      badge: '👤 Studio Batch',
      ctaText: 'Explore Studio Batches',
      whatsappText: 'Hi%20Ethos%20Studio!%20I%20want%20to%20know%20about%20Dance%20in%20Studio%20batches.'
    },
    {
      id: 'workshops',
      title: 'Workshops',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      headline: 'Special Workshops',
      subhead: 'in Hyderabad,',
      description: 'Experience intensive weekend masterclasses with celebrity choreographers and international artists in Hyderabad. Level up your speed execution, performance presence, and commercial swag routines.',
      doodleColor: 'text-[#0088FF]',
      badge: '✨ Masterclass Series',
      ctaText: 'View Upcoming Workshops',
      whatsappText: 'Hi%20Ethos%20Studio!%20I%20want%20to%20register%20for%20Special%20Workshops.'
    },
    {
      id: 'events',
      title: 'Events',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      headline: 'Ethos Events & Showcases',
      subhead: 'in Hyderabad,',
      description: 'Witness grand stage showcases, annual galas, and live cypher jam events in Hyderabad. Experience high-voltage student performances, stage lighting, and viral choreography battles.',
      doodleColor: 'text-[#FF0055]',
      badge: '🎉 Live Showcase',
      ctaText: 'Explore Ethos Events',
      whatsappText: 'Hi%20Ethos%20Studio!%20I%20want%20to%20know%20about%20Ethos%20Events%20and%20Showcases.'
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      headline: 'Corporate & Wedding Events',
      subhead: 'in Hyderabad,',
      description: 'Transform corporate galas, team building workshops, and royal wedding Sangeet nights in Hyderabad. Custom flashmob choreography, bespoke music tracks, and professional stage entertainment.',
      doodleColor: 'text-purple-500',
      badge: '👔 Corporate & Sangeet',
      ctaText: 'Book Corporate / Sangeet',
      whatsappText: 'Hi%20Ethos%20Studio!%20I%20want%20to%20book%20Corporate%20or%20Wedding%20Sangeet%20Choreography.'
    }
  ];

  // 🌟 DENSE MASONRY PHOTO COLLAGE DATA (MATCHING IMG 3 - COMMUNITIE STYLE)
  const densePhotoCollage = [
    { id: 1, category: 'studio', title: 'Studio Rehearsal Vibes', size: 'col-span-1 row-span-1 h-56', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80' },
    { id: 2, category: 'workshops', title: 'Celebrity Guest Masterclass', size: 'col-span-1 sm:col-span-2 row-span-2 h-96', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80' },
    { id: 3, category: 'events', title: 'Stage Showcase Light Show', size: 'col-span-1 row-span-1 h-56', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { id: 4, category: 'corporate', title: 'Corporate Team Choreography', size: 'col-span-1 row-span-2 h-96', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { id: 5, category: 'studio', title: 'Commercial Heels Execution', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80' },
    { id: 6, category: 'workshops', title: 'Afro-Beats Speed Workshop', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { id: 7, category: 'events', title: 'Royal Sangeet Entrance', size: 'col-span-1 sm:col-span-2 row-span-2 h-96', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
    { id: 8, category: 'corporate', title: 'Annual Corporate Gala Night', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' },
    { id: 9, category: 'studio', title: 'Hip-Hop Cypher Rehearsal', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
    { id: 10, category: 'workshops', title: 'Kids Dance Bootcamp', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80' },
    { id: 11, category: 'events', title: 'Freestyle Cypher Jam', size: 'col-span-1 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
    { id: 12, category: 'corporate', title: 'Wedding Flashmob Rehearsal', size: 'col-span-1 sm:col-span-2 row-span-1 h-64', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80' }
  ];

  const currentCategoryData = categoryCards.find(c => c.id === activeCategory) || categoryCards[0];

  const handleCardClick = (catId) => {
    setActiveCategory(catId);
    setPhotoFilter(catId);
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPhotos = photoFilter === 'all'
    ? densePhotoCollage
    : densePhotoCollage.filter(p => p.category === photoFilter);

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
              Hyderabad just got a lot more fun! Explore studio batches, special workshops, stage events, and corporate sessions below.
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

        {/* 🌟 1. 4 CATEGORY SHOWCASE GRID ("Looking for something more?") - MATCHING IMG 1 🌟 */}
        <section id="explore-categories" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200">
          
          <div className="mb-10 text-left">
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 tracking-tight">
              Looking for something more?
            </h2>
          </div>

          {/* 4 ROUNDED CARDS GRID WITH WHITE PILL BADGES & CUTE DOODLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((card) => {
              const isActive = activeCategory === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`relative h-[340px] sm:h-[380px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 group border-4 ${
                    isActive ? 'border-[#0088FF] scale-[1.02]' : 'border-transparent hover:scale-[1.02]'
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

                  {/* Floating White Pill Button Badge at Bottom Center (Matching IMG 1) */}
                  <div className="absolute bottom-6 inset-x-6 flex justify-center">
                    <button className="w-full py-3.5 px-5 bg-white hover:bg-slate-50 text-slate-900 text-sm font-black tracking-tight rounded-full shadow-2xl flex items-center justify-between transition-transform group-hover:scale-105">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  {/* Cute Doodle Accents */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black">
                    ✨
                  </div>
                </div>
              );
            })}
          </div>

        </section>


        {/* 🌟 2. CATEGORY DETAIL HERO BLOCK - MATCHING IMG 2 🌟 */}
        <section ref={detailSectionRef} id="category-detail" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Background Radial Tint */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0088FF]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Info Matter */}
            <div className="lg:col-span-6 space-y-6 text-left relative z-10">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SELECTED CATEGORY DETAILS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 tracking-tight leading-[0.98]">
                {currentCategoryData.headline} <br />
                <span className="text-[#6366F1] italic font-serif font-normal">
                  {currentCategoryData.subhead}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">
                {currentCategoryData.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href={`https://wa.me/918341701113?text=${currentCategoryData.whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-8 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#25D366]/30 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{currentCategoryData.ctaText}</span>
                </a>

                <button
                  onClick={() => setSelectedItemForBooking({
                    id: currentCategoryData.id,
                    title: `${currentCategoryData.title} Pass`,
                    price: 449,
                    imageUrl: currentCategoryData.image
                  })}
                  className="py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <span>Book Pass • ₹449</span>
                </button>
              </div>

            </div>

            {/* Right Card with Floating Doodle Icons (Matching IMG 2) */}
            <div className="lg:col-span-6 relative flex justify-center items-center py-4">
              
              {/* Outer Shadowed Card */}
              <div className="relative w-full max-w-md h-[340px] sm:h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                <img
                  src={currentCategoryData.image}
                  alt={currentCategoryData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Avatar Badge Top Left (Matching IMG 2) */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-slate-900 text-xs font-black shadow-lg flex items-center gap-2 border border-slate-200">
                  <User className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>{currentCategoryData.badge}</span>
                </div>

                {/* Floating Calendar Badge Bottom Right (Matching IMG 2) */}
                <div className="absolute bottom-4 right-4 bg-[#FF0055] text-white px-4 py-2 rounded-2xl text-xs font-black shadow-xl flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Active</span>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* 🌟 3. DENSE PHOTO MASONRY COLLAGE BELOW - MATCHING IMG 4 (FAIRY LIGHTS + "One Gallery, A Thousand Stories!") 🌟 */}
        <section id="photo-collage" className="bg-[#000000] text-white py-16 px-2 sm:px-6 mt-16 relative overflow-hidden">
          
          {/* Fairy String Lights SVG Header Banner (Matching IMG 4) */}
          <div className="w-full max-w-7xl mx-auto overflow-hidden opacity-90 mb-4 select-none pointer-events-none">
            <svg className="w-full h-8 sm:h-12" viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 Q150,32 300,5 Q450,35 600,5 Q750,32 900,5 Q1050,35 1200,5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
              <circle cx="50" cy="18" r="3" fill="#FFD700" className="animate-pulse"/>
              <circle cx="150" cy="24" r="3.5" fill="#FFFFFF"/>
              <circle cx="250" cy="14" r="3" fill="#FF5722"/>
              <circle cx="350" cy="24" r="3" fill="#FFD700" className="animate-pulse"/>
              <circle cx="450" cy="25" r="3.5" fill="#00DFD8"/>
              <circle cx="550" cy="18" r="3" fill="#FF0055" className="animate-pulse"/>
              <circle cx="650" cy="24" r="3" fill="#FFD700"/>
              <circle cx="750" cy="22" r="3.5" fill="#FFFFFF"/>
              <circle cx="850" cy="15" r="3" fill="#FF9800"/>
              <circle cx="950" cy="24" r="3" fill="#FFD700" className="animate-pulse"/>
              <circle cx="1050" cy="25" r="3.5" fill="#00DFD8"/>
              <circle cx="1150" cy="14" r="3" fill="#FF0055"/>
            </svg>
          </div>

          {/* Centered Headline: One Gallery, A Thousand Stories! (Matching IMG 4) */}
          <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-white tracking-tight leading-tight uppercase">
              One Gallery, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-amber-300 to-[#00DFD8]">
                A Thousand Stories!
              </span>
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <button
                onClick={() => setPhotoFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  photoFilter === 'all' ? 'bg-white text-slate-950 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Stories
              </button>

              {categoryCards.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPhotoFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                    photoFilter === cat.id ? 'bg-[#0088FF] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* SEAMLESS ZERO-GAP MOSAIC PHOTO WALL (MATCHING IMG 4) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                className={`relative overflow-hidden shadow-2xl bg-slate-900 group cursor-pointer border border-white/10 ${item.size}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Dark Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono font-black uppercase text-[#00DFD8] bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-md inline-block mb-1 border border-white/10">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black font-syne text-white uppercase leading-snug">
                    {item.title}
                  </h3>
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
