import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import { Sparkles, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, ArrowRight, Film, Award, Layers } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function EthosGalleryPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  // Active Interactive Rotonde Carousel Index (Lucas Aufrère Style)
  const [activeRotondeIndex, setActiveRotondeIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState({});

  // 🌟 ETHOS ALL-TIME FAMOUS PROJECTS & HIGHLIGHTS (LUCAS AUFRÈRE STYLE)
  const ethosProjects = [
    {
      id: '01',
      title: 'Urban Hip-Hop Showcase',
      role: 'Stage Choreography & Execution',
      category: 'Stage Production',
      year: '2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-young-people-dancing-hip-hop-41484-large.mp4',
      poster: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
      description: 'Massive group stage sync performance featuring high-speed body isolations, hard bounce grooves, and commercial lighting at Ethos Arena.',
      stack: ['Hip-Hop', 'Commercial Sync', 'Stage Lights', 'Lighthouse 98+'],
      tagline: '500K+ Reel Views • All-Time Famous'
    },
    {
      id: '02',
      title: 'Royal Wedding Sangeet',
      role: 'Bespoke Duet & Family Flashmob',
      category: 'Wedding Hub',
      year: '2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-couple-dancing-at-a-wedding-reception-42868-large.mp4',
      poster: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      description: 'Grand royal wedding couple entrance choreography. Custom audio tracks mixed with traditional dhol beats and cinematic family entry transitions.',
      stack: ['Royal Sangeet', 'Couple Entry', 'Custom Track Mix', '120+ Families'],
      tagline: 'Featured Bridal Showcase'
    },
    {
      id: '03',
      title: 'Annual Arena Gala Finale',
      role: 'Full Studio All-Stars Finale',
      category: 'Grand Gala',
      year: '2025',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dancers-performing-on-stage-41486-large.mp4',
      poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Annual All-Stars Hall of Fame',
      description: 'The flagship annual showcase featuring over 200 Ethos dancers across Bollywood Fusion, Contemporary storytelling, and Hip-Hop cyphers.',
      stack: ['Gala Finale', '200+ Dancers', 'Live Stage', 'Full Production']
    },
    {
      id: '04',
      title: 'Contemporary Expression',
      role: 'Lyrical Storytelling & Floorwork',
      category: 'Artistic Masterclass',
      year: '2025',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-sensually-in-a-studio-41485-large.mp4',
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80',
      description: 'Deep emotional storytelling through fluid momentum, floorwork transitions, and expressive body extension masterclasses.',
      stack: ['Contemporary', 'Lyrical Flow', 'Floorwork', 'Masterclass'],
      tagline: 'Curated Masterclass'
    },
    {
      id: '05',
      title: 'Commercial Heels Glam',
      role: 'Confidence, Posture & Lines',
      category: 'Glam Intensive',
      year: '2025',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41483-large.mp4',
      poster: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=1200&q=80',
      description: 'High-heels choreography focusing on postural alignment, sleek camera-ready lines, and high-confidence performance attitude.',
      stack: ['Commercial Heels', 'Posture & Lines', 'Camera Ready', 'Glam Squad'],
      tagline: 'Viral Reels Favorite'
    },
    {
      id: '06',
      title: 'Street Jam & Freestyle Cypher',
      role: 'Live Battle & Rhythm Grooves',
      category: 'Cypher Battle',
      year: '2025',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-breakdancers-performing-in-the-street-41482-large.mp4',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      description: 'Raw street freestyle cypher battle powered by live DJ beats, student improvs, and explosive breakdance power moves.',
      stack: ['Freestyle Battle', 'Live DJ', 'Cypher', 'Breakdance'],
      tagline: 'Ethos Street Championship'
    }
  ];

  const currentProject = ethosProjects[activeRotondeIndex];

  const toggleMute = (id) => {
    setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-white font-sans overflow-x-hidden selection:bg-[#FF0055] selection:text-white">
      
      {/* Standard Unified Navbar */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        
        {/* 🌟 1. HERO ROTONDE SHOWCASE (LUCAS AUFRÈRE 3D ROTONDE SLIDER STYLE) 🌟 */}
        <section className="relative min-h-[85vh] flex flex-col justify-between py-12 px-4 sm:px-8 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#090A0F] via-[#11131F] to-[#090A0F]">
          
          {/* Ambient Glow Watermarks */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#FF0055]/20 via-[#7928CA]/20 to-[#0088FF]/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Rotonde Header Bar */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/15 text-white/90 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF0055]" />
              <span>ETHOS CREATIVE GALLERY • SELECTED PRODUCTIONS</span>
            </div>

            <div className="font-mono text-xs font-bold text-white/60 tracking-widest">
              <span>{currentProject.id}</span> / <span>06</span>
            </div>
          </div>

          {/* Rotonde Main Active Featured Stage Card */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 z-10">
            
            {/* Left Column: Massive Editorial Typography & Project Details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#00DFD8] uppercase tracking-widest block">
                  {currentProject.category} • {currentProject.year}
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne tracking-tight text-white uppercase leading-[0.95]">
                  {currentProject.title}
                </h1>
                <p className="text-xs sm:text-sm font-mono font-bold text-white/70 tracking-wider pt-1 border-b border-white/10 pb-3">
                  {currentProject.role}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                {currentProject.description}
              </p>

              {/* Technical Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.stack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/15 text-slate-300 text-[11px] font-mono rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Rotonde Controls & Indicators */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setActiveRotondeIndex((prev) => (prev === 0 ? ethosProjects.length - 1 : prev - 1))}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-mono text-xs font-bold transition-all hover:scale-105"
                >
                  ← PREV
                </button>
                <button
                  onClick={() => setActiveRotondeIndex((prev) => (prev === ethosProjects.length - 1 ? 0 : prev + 1))}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF0055] to-[#7928CA] text-white font-mono text-xs font-extrabold rounded-full transition-all hover:scale-105 shadow-lg shadow-[#FF0055]/30 flex items-center gap-2"
                >
                  <span>NEXT PROJECT</span>
                  <span>→</span>
                </button>
              </div>

            </div>

            {/* Right Column: High-Impact Full-Height Cinema Video Player Card */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.8)] bg-slate-950 group">
              <video
                key={currentProject.id}
                src={currentProject.videoUrl}
                poster={currentProject.poster}
                autoPlay
                loop
                muted={mutedStates[currentProject.id] !== false}
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-80" />

              {/* Top Right Floating Badge */}
              <span className="absolute top-4 right-4 px-3.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-extrabold uppercase rounded-full shadow-lg">
                {currentProject.tagline}
              </span>

              {/* Bottom Floating Control Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold text-[#00DFD8] block">ETHOS SHOWCASE #{currentProject.id}</span>
                  <h3 className="text-lg font-black font-syne text-white uppercase">{currentProject.title}</h3>
                </div>

                <button
                  onClick={() => toggleMute(currentProject.id)}
                  className="p-3 bg-black/80 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-110"
                >
                  {mutedStates[currentProject.id] === false ? (
                    <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-300" />
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Rotonde Segment Progress Bar */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-6 gap-2 pt-6 z-10">
            {ethosProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveRotondeIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeRotondeIndex ? 'bg-gradient-to-r from-[#FF0055] to-[#00DFD8]' : 'bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

        </section>


        {/* 🌟 2. LUCAS AUFRÈRE DETAILED LINEAR GRID VIEW (VUE DÉTAILLÉE) 🌟 */}
        <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          
          {/* Section Header */}
          <div className="mb-16 text-left max-w-3xl space-y-3">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#FF0055] block">
              VUE DÉTAILLÉE • ALL PRODUCTIONS
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-syne text-white uppercase tracking-tight">
              TOUS LES PROJETS
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Une lecture linéaire des productions et masterclasses présentées dans la rotonde — chorégraphies sur-mesure, animations de scène et expériences visuelles portées par Ethos Studio.
            </p>
          </div>

          {/* Linear Project Cards Grid */}
          <div className="space-y-16">
            {ethosProjects.map((proj, index) => {
              const isMuted = mutedStates[`grid-${proj.id}`] !== false;

              return (
                <article
                  key={proj.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#12131C]/60 border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-white/20 transition-all duration-300"
                >
                  
                  {/* Media Column (Alternates Left/Right layout) */}
                  <div className={`lg:col-span-7 relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/15 bg-slate-950 group ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <video
                      src={proj.videoUrl}
                      poster={proj.poster}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Audio Toggle Button */}
                    <button
                      onClick={() => toggleMute(`grid-${proj.id}`)}
                      className="absolute bottom-4 right-4 p-2.5 bg-black/80 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-110"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
                    </button>

                    {/* Top Index Badge */}
                    <span className="absolute top-4 left-4 font-mono font-black text-xs text-[#00DFD8] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {proj.id}
                    </span>
                  </div>

                  {/* Body Info Column */}
                  <div className={`lg:col-span-5 space-y-5 text-left ${
                    index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    
                    {/* Meta line */}
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                      <span className="text-[#FF0055]">{proj.id}</span>
                      <span>·</span>
                      <span>{proj.category}</span>
                      <span>·</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black font-syne text-white uppercase leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-xs font-mono font-bold text-[#00DFD8] uppercase tracking-wider">
                      {proj.role}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {proj.description}
                    </p>

                    {/* Stack List */}
                    <ul className="flex flex-wrap gap-2 pt-2" aria-label="Technical stack">
                      {proj.stack.map((item, i) => (
                        <li key={i} className="px-3 py-1 bg-white/5 border border-white/15 text-slate-300 text-[11px] font-mono rounded-lg">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Direct Booking Link */}
                    <div className="pt-3">
                      <button
                        onClick={() => setSelectedItemForBooking({
                          id: proj.id,
                          title: proj.title,
                          price: 449,
                          imageUrl: proj.poster
                        })}
                        className="py-3 px-6 bg-white/10 hover:bg-[#FF0055] text-white text-xs font-extrabold font-mono uppercase tracking-wider rounded-xl transition-all border border-white/20 hover:border-[#FF0055] inline-flex items-center gap-2 group"
                      >
                        <span>BOOK STAGE PASS</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>

                </article>
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
