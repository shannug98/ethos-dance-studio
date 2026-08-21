import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';
import { Calendar, Clock, MapPin, Sparkles, Play, Video, Ticket, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';

export default function EventDetailsPage({ eventId: propEventId }) {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Read event ID or slug from URL query params or props
  const getEventFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id') || params.get('event') || propEventId;

    // Master Catalog of events
    const allEvents = [
      {
        id: 202,
        slug: 'wedding-sangeet-flashmob-bootcamp',
        title: 'Wedding Sangeet Flashmob Bootcamp',
        guestChoreographer: 'Rohan & Ananya',
        date: 'Aug 26, 2026',
        time: '02:00 PM - 06:00 PM',
        location: 'Studio Ballroom A, Ethos Kukatpally',
        price: 1999,
        level: 'Family & Couples',
        danceStyle: 'Bolly-Hop & Wedding Remix',
        seatsLeft: 7,
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        videoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        description: 'A complete 4-hour intensive wedding sangeet bootcamp designed for couples, families, and friends. Master viral entrance dance routines, group synchronization, and high-energy stage tricks curated by Ethos lead choreographers.',
        syllabus: [
          'Viral Couple Entrance Step-by-Step Choreography',
          'Family Group Sync & Formations for Stage',
          'High-Energy Bollywood Remix Footwork Drills',
          'Stage Confidence & Expression Mentorship',
          'HD Video Recording of Full Routine'
        ],
        whatToBring: 'Comfortable dance footwear / sneakers, water bottle, and your energetic festive spirit!'
      },
      {
        id: 203,
        slug: 'urban-heels-confidence-intensive',
        title: 'Urban Heels & Confidence Intensive',
        guestChoreographer: 'Natasha Roy',
        date: 'Aug 28, 2026',
        time: '04:00 PM - 07:00 PM',
        location: 'Studio Mirror Room B, Ethos Kukatpally',
        price: 1299,
        level: 'Intermediate',
        danceStyle: 'Heels & Commercial Jazz',
        seatsLeft: 4,
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        videoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        description: 'Master posture, balance, performance presence, and high-energy commercial heels choreography in an empowering studio environment.',
        syllabus: [
          'Posture & Weight Balance Mechanics in Heels',
          'Commercial Jazz Lines & Arm Extension Drills',
          'Performance Presence & Floorwork Transitions',
          'Music Video Style Camera Routine'
        ],
        whatToBring: 'Comfortable dance heels (block or stiletto), knee pads, and fitting athletic wear.'
      },
      {
        id: 201,
        slug: 'international-afro-fusion-masterclass',
        title: 'International Afro-Fusion Masterclass',
        guestChoreographer: 'Koffi & Team (Paris)',
        date: 'Aug 29, 2026',
        time: '05:00 PM - 08:00 PM',
        location: 'Ethos Grand Arena, Kukatpally',
        price: 1499,
        level: 'Open to All',
        danceStyle: 'Afro-Beats & Amapiano',
        seatsLeft: 5,
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
        videoUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
        description: 'Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists Koffi & Team.',
        syllabus: [
          'Authentic Amapiano Footwork Drills',
          'Polyrhythmic Body Isolations & Musicality',
          'Group Cypher & Freestyle Jam Session',
          'Masterclass Certificate Signed by International Faculty'
        ],
        whatToBring: 'Comfortable sneakers and athletic wear.'
      },
      {
        id: 204,
        slug: 'hip-hop-urban-choreography-masterclass',
        title: 'Hip-Hop & Urban Choreography Masterclass',
        guestChoreographer: 'Vikram Singh',
        date: 'Aug 19, 2026',
        time: '05:00 PM - 08:00 PM',
        location: 'Ethos Main Studio',
        price: 1399,
        level: 'All Levels',
        danceStyle: 'Hip-Hop & Isolations',
        seatsLeft: 6,
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=1200&q=80',
        videoUrl: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=1200&q=80',
        description: 'Explosive urban hip-hop isolations, groove musicality, and fast-paced stage routines.',
        syllabus: [
          'Upper Body Isolations & Popping Foundations',
          'Fast-Paced Speed Choreography Execution',
          'Stage Energy & Expression Techniques'
        ],
        whatToBring: 'Streetwear / sneakers.'
      }
    ];

    // Try reading admin localStorage events too
    try {
      const savedAdmin = localStorage.getItem('ethos_master_events_catalog');
      if (savedAdmin) {
        const adminList = JSON.parse(savedAdmin);
        adminList.forEach(item => {
          allEvents.push({
            id: item.id,
            slug: item.title ? item.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : `event-${item.id}`,
            title: item.title,
            guestChoreographer: item.choreographer || 'Ethos Master Team',
            date: item.date || 'Aug 2026',
            time: item.time || '05:00 PM - 08:00 PM',
            location: item.location || 'Ethos Studio Kukatpally',
            price: item.price || item.entryFee || 1499,
            level: 'Open to All',
            danceStyle: 'Choreography Masterclass',
            seatsLeft: 5,
            image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
            videoUrl: item.image || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
            description: item.desc || 'Special masterclass workshop at Ethos Dance Studio Kukatpally.',
            syllabus: ['Choreography Breakdown', 'Technique Mentorship', 'Stage Performance Recording'],
            whatToBring: 'Comfortable dance footwear and athletic wear.'
          });
        });
      }
    } catch {}

    if (!urlId) return allEvents[0];
    const match = allEvents.find(e => String(e.id) === String(urlId) || e.slug.includes(String(urlId).toLowerCase()));
    return match || allEvents[0];
  };

  const event = getEventFromUrl();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans select-none flex flex-col justify-between">
      
      {/* GLOBAL NAVBAR */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {/* MAIN CONTENT AREA */}
      <main className="pt-[100px] pb-20 max-w-6xl mx-auto px-4 sm:px-8 w-full flex-1 text-left space-y-8">
        
        {/* BREADCRUMB & RETURN BUTTON */}
        <div className="pt-4 flex items-center justify-between">
          <a
            href="events.html"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase rounded-full hover:bg-black transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </a>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[11px] font-black uppercase rounded-full">
            <Ticket className="w-3.5 h-3.5" />
            <span>{event.danceStyle}</span>
          </div>
        </div>

        {/* HERO TITLE & BRIEF */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#0088FF]">
            ETHOS MASTERCLASS DETAIL PAGE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-syne uppercase text-slate-900 tracking-tight leading-tight">
            {event.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Choreographed by <strong className="text-slate-900">{event.guestChoreographer}</strong> • Level: <strong className="text-[#0088FF]">{event.level}</strong>
          </p>
        </div>

        {/* 🖼️ EVENT POSTER & 🎬 SHORT VIDEO CLIP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. OFFICIAL EVENT POSTER CARD */}
          <div className="md:col-span-5 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative aspect-[0.75] flex flex-col justify-end group">
            <img
              src={event.image}
              alt={`${event.title} Official Poster`}
              className="absolute inset-0 w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

            <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-white/20 shadow-lg backdrop-blur-md">
              🖼️ OFFICIAL EVENT POSTER
            </div>

            <div className="relative z-10 p-6 space-y-1">
              <span className="text-amber-300 text-[11px] font-extrabold uppercase tracking-widest block">ETHOS WORKSHOP SERIE</span>
              <h3 className="text-xl font-black font-syne text-white uppercase leading-snug">{event.title}</h3>
            </div>
          </div>

          {/* 2. SHORT CHOREOGRAPHY VIDEO REEL PREVIEW */}
          <div className="md:col-span-7 bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative aspect-[16/10] md:aspect-auto flex flex-col justify-between p-6 group">
            <img
              src={event.image}
              alt="Video Preview Reel Background"
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>CHOREOGRAPHY PREVIEW REEL</span>
              </div>
              <span className="text-[10px] text-slate-300 font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                0:45 HD • STEREO SOUND
              </span>
            </div>

            {/* PLAY BUTTON OVERLAY */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-3 py-12">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-[#0088FF] transition-all cursor-pointer">
                <Play className="w-9 h-9 fill-white translate-x-0.5" />
              </div>
              <span className="text-xs font-black uppercase text-white tracking-widest drop-shadow-md">
                Click to Play Choreography Reel ▶
              </span>
            </div>

            <div className="relative z-10 text-xs text-slate-300 font-medium">
              *Featuring live snippet performance &amp; step-by-step formation preview.
            </div>
          </div>

        </div>

        {/* EVENT METRICS GRID (DATE, TIME, VENUE, SEATS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0088FF] uppercase">
              <Calendar className="w-4 h-4" />
              <span>Event Date</span>
            </div>
            <div className="text-base font-black font-syne text-slate-900">{event.date}</div>
          </div>

          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0088FF] uppercase">
              <Clock className="w-4 h-4" />
              <span>Session Time</span>
            </div>
            <div className="text-base font-black font-syne text-slate-900">{event.time}</div>
          </div>

          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0088FF] uppercase">
              <MapPin className="w-4 h-4" />
              <span>Venue Location</span>
            </div>
            <div className="text-sm font-black font-syne text-slate-900 truncate">{event.location}</div>
          </div>
        </div>

        {/* DETAILED DESCRIPTION & SYLLABUS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-black uppercase font-syne text-slate-900">About This Workshop</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {event.description}
              </p>
            </div>

            {/* SYLLABUS LIST */}
            <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-black uppercase font-syne text-slate-900">What You Will Learn</h3>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-800">
                {event.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0088FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT TO BRING */}
            <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 sm:p-8 space-y-2">
              <h3 className="text-sm font-black uppercase font-syne text-slate-500">What To Bring / Wear</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {event.whatToBring}
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PRICE & REGISTRATION BOX */}
          <div className="lg:col-span-4 bg-slate-900 text-white border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Registration Fee</span>
              <div className="text-4xl font-black font-syne text-white">₹{event.price}</div>
              <span className="text-[11px] text-emerald-400 font-bold block">✓ Includes taxes, certificate &amp; HD video</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-semibold">
              <div className="flex items-center justify-between">
                <span>Available Seats:</span>
                <span className="text-amber-300 font-black">🔥 {event.seatsLeft} Left</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Level:</span>
                <span className="text-white font-bold">{event.level}</span>
              </div>
            </div>

            {/* ACTION BUTTONS (CONTINUE TO PAYMENT OR CLOSE) */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setSelectedItemForBooking({
                  id: event.id,
                  title: event.title,
                  price: event.price,
                  type: 'Masterclass Pass'
                })}
                className="w-full py-4 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="events.html"
                className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold uppercase rounded-2xl transition-all block text-center cursor-pointer"
              >
                Close / Return to Events
              </a>
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />
      <FloatingWhatsApp />

      {/* BOOKING PAYMENT MODAL */}
      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL="http://localhost:5000"
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={(reg) => {
            setSelectedItemForBooking(null);
            setConfirmedRegistration(reg);
          }}
        />
      )}

      {/* CONFIRMATION RECEIPT MODAL */}
      {confirmedRegistration && (
        <ConfirmationReceiptModal
          registration={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

    </div>
  );
}
