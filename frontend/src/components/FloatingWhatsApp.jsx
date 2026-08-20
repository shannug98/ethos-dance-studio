import React, { useState, useRef, useEffect } from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';
import { Phone, MessageSquare, X, ArrowUp } from 'lucide-react';

// Official Authentic WhatsApp SVG Component (Crisp Clean Vector matching User Image 3)
const OfficialWhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Speech Bubble Outline */}
    <path
      d="M12 3C7.03 3 3 7.03 3 12c0 1.85.56 3.57 1.52 5L3 21l4.15-1.42A8.94 8.94 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Telephone Handset Inside */}
    <path
      d="M9.5 8.5c-.3 0-.6.1-.8.3-.3.3-.8 1.1-.8 2.2 0 1.1.8 2.2 1.6 3.2.8.9 2 2.1 3.2 2.6 1.1.5 1.9.4 2.4.1.4-.2.9-.8 1.1-1.2.2-.4.1-.7-.1-.9l-1.3-.9c-.2-.1-.5-.1-.7.1l-.6.7c-.2.2-.4.2-.7 0-.5-.3-1.4-.9-2.1-1.6-.6-.6-1.1-1.3-1.3-1.7-.1-.3 0-.5.2-.7l.5-.6c.2-.2.2-.5.1-.7l-.8-1.5c-.2-.3-.5-.4-.7-.4z"
      fill="white"
    />
  </svg>
);

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showMainMenu, setShowMainMenu] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! 👋\nI'm the Ethos AI Concierge.\nHow can I help you?",
      time: 'Just now',
      showCallBtn: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Comprehensive AI Intelligent Response Engine (Responds reasonably to ALL custom queries)
  const getAiResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Greetings & Casual Talk
    if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('how are you')) {
      return {
        text: `Hi! 👋\nI'm the Ethos AI Concierge.\nHow can I help you today? You can ask me about class timings, monthly passes, upcoming workshops, Sangeet choreography, or trial sessions!`,
        showCallBtn: false
      };
    }

    // 2. Class Schedule & Batch Timings
    if (q.includes('timing') || q.includes('time') || q.includes('batch') || q.includes('schedule') || q.includes('class') || q.includes('routine')) {
      return {
        text: `💃 ETHOS BATCH TIMINGS & SCHEDULE:\n\n` +
          `• Adults & Fitness Batch: Mon–Fri (7:30 AM & 8:00 PM) — ₹2,500/month\n` +
          `• Kids Beginner (4–6 Yrs): Mon–Fri (5:00 PM - 6:00 PM) — ₹2,000/month\n` +
          `• Kids Intermediate (6–12 Yrs): Mon–Fri (7:00 PM - 8:00 PM) — ₹2,000/month\n` +
          `• Bollywood Commercial Fusion: Mon–Fri (6:00 PM - 7:00 PM) — ₹2,500/month`,
        showCallBtn: false
      };
    }

    // 3. Pass Fees & Pricing
    if (q.includes('fee') || q.includes('price') || q.includes('cost') || q.includes('pass') || q.includes('package') || q.includes('rate') || q.includes('pay') || q.includes('tier') || q.includes('money')) {
      return {
        text: `💳 ETHOS PASSES & PRICING:\n\n` +
          `• Monthly Regular Class Pass: ₹2,000 - ₹2,500 / month\n` +
          `• VIP All-Access Quarterly Pass: ₹6,500 / quarter\n` +
          `• Guest Masterclass Workshop Pass: ₹549 - ₹1,499 / pass\n\n` +
          `👑 Active Monthly Members get an EXCLUSIVE ₹100 OFF on all upcoming workshops!`,
        showCallBtn: false
      };
    }

    // 4. Location & Studio Address
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('place') || q.includes('kukatpally') || q.includes('reach') || q.includes('map') || q.includes('dir')) {
      return {
        text: `📍 ETHOS STUDIO LOCATION:\n\n` +
          `Second Floor, 1/2/49/1, Nizampet Rd, opposite Brand Factory road, Hyder Nagar, Kukatpally, Hyderabad, Telangana 500085.\n\n` +
          `📞 Hotline: +91 83417 01113`,
        showCallBtn: true
      };
    }

    // 5. Workshops & Masterclasses
    if (q.includes('workshop') || q.includes('event') || q.includes('masterclass') || q.includes('showcase') || q.includes('competition') || q.includes('battle')) {
      return {
        text: `✨ UPCOMING LIVE WORKSHOPS (AUGUST 2026):\n\n` +
          `1. World Dance Day Hip-Hop Masterclass by Sophia Bennett (Aug 19)\n` +
          `2. International Paris Afro-Fusion Masterclass by Koffi & Team (Aug 29)\n\n` +
          `Go to the Events tab to register your pass!`,
        showCallBtn: false
      };
    }

    // 6. Wedding Sangeet Choreography
    if (q.includes('sangeet') || q.includes('wedding') || q.includes('bride') || q.includes('groom') || q.includes('couple') || q.includes('family') || q.includes('flashmob')) {
      return {
        text: `👑 ETHOS ROYAL WEDDING SANGEET HUB:\n\n` +
          `We offer bespoke custom choreography for Bride & Groom duets, family flashmobs, and concept entries!\n\n` +
          `Visit the Sangeet Hub tab on our navbar for package details!`,
        showCallBtn: true
      };
    }

    // Default Fallback
    return {
      text: `Thanks for asking! 😊 Our studio managers are available right now to assist you directly.\n\n` +
        `You can tap the 📞 Call Us button below or click the WhatsApp icon in the bottom-left corner to chat with us on WhatsApp directly!`,
      showCallBtn: true
    };
  };

  const handleSendMessage = (customText = null) => {
    const text = customText || inputMessage;
    if (!text.trim()) return;

    setShowMainMenu(false);

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showCallBtn: false
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      const responseObj = getAiResponse(text);
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseObj.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCallBtn: responseObj.showCallBtn
      };
      setMessages(prev => [...prev, aiReply]);
    }, 400);
  };

  const handleResetMainMenu = () => {
    setShowMainMenu(true);
    const menuMsg = {
      id: Date.now(),
      sender: 'ai',
      text: "How else can I help you? Choose an option below or type your question in the text box!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showCallBtn: false
    };
    setMessages(prev => [...prev, menuMsg]);
  };

  return (
    <>
      {/* 🌟 1. VERTICAL & TRANSPARENT FLOATING SOCIAL MEDIA DOCK (BOTTOM LEFT CORNER ALWAYS) 🌟 */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 bg-slate-950/40 backdrop-blur-2xl border border-white/15 p-2 sm:p-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-3 transition-all hover:scale-105 group">
        
        {/* Instagram Direct Link */}
        <a
          href="https://instagram.com/ethosdancestudio"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white rounded-full shadow-lg hover:opacity-90 hover:scale-110 transition-all flex items-center justify-center group/ig relative"
          title="Follow Ethos Dance Studio on Instagram"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span className="absolute left-12 bg-slate-900 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg opacity-0 group-hover/ig:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20 shadow-xl">
            Instagram
          </span>
        </a>

        {/* YouTube Direct Link */}
        <a
          href="https://youtube.com/@ethosdancestudio"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all flex items-center justify-center group/yt relative"
          title="Subscribe to Ethos Studio YouTube Channel"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="absolute left-12 bg-slate-900 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg opacity-0 group-hover/yt:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20 shadow-xl">
            YouTube
          </span>
        </a>

        {/* 💬 OFFICIAL AUTHENTIC WHATSAPP DIRECT LINK WITH 100% ACCURATE BRAND VECTOR 💬 */}
        <a
          href="https://wa.me/918341701113?text=Hi%20Ethos%20Dance%20Studio!%20I%20would%20like%20to%20inquire%20about%20classes%20and%20workshops."
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-110 transition-all flex items-center justify-center group/wa relative"
          title="Chat with Ethos Studio on WhatsApp"
        >
          <OfficialWhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          <span className="absolute left-12 bg-slate-900 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg opacity-0 group-hover/wa:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20 shadow-xl">
            WhatsApp
          </span>
        </a>

      </div>

      {/* 🌟 2. SINGLE SLEEK BLACK "CHAT WITH US" FLOATING BUTTON (BOTTOM RIGHT) 🌟 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 bg-[#18181B] hover:bg-[#000000] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 border border-slate-700/50 font-sans select-none"
          title="Chat with Ethos AI"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>Chat with us</span>
        </button>
      )}

      {/* 🌟 3. EXACT MATCH CHAT WINDOW 🌟 */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[540px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn font-sans">
          
          {/* SOLID DARK HEADER BAR */}
          <div className="bg-[#18181B] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={ethosPureLogo}
                  alt="Ethos AI Concierge"
                  className="w-9 h-9 rounded-full bg-black/60 p-1 border border-white/20 object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#18181B]"></span>
              </div>
              <div>
                <h3 className="text-sm font-black font-syne uppercase tracking-wider text-white">ETHOS CONCIERGE</h3>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>● Online</span> · Instant AI Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#18181B] text-white rounded-br-none shadow-md font-medium'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-xs font-normal'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Call Direct Button inside AI reply */}
                  {msg.showCallBtn && (
                    <a
                      href="tel:+918341701113"
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white text-[11px] font-bold rounded-lg transition-colors shadow-xs"
                    >
                      <Phone className="w-3 h-3 text-white" />
                      <span>Call Studio Hotline Now</span>
                    </a>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
              </div>
            ))}

            {/* INITIAL MAIN MENU INTRO & QUICK CATEGORY BUTTONS */}
            {showMainMenu && (
              <div className="pt-2 space-y-2 animate-fadeIn">
                <div className="text-[11px] font-semibold text-slate-500 mb-1">
                  Or select a quick option:
                </div>
                
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleSendMessage('Book Workshop')}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all text-left shadow-sm flex items-center justify-between group"
                  >
                    <span>Book Workshop</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('View Packages')}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all text-left shadow-sm flex items-center justify-between group"
                  >
                    <span>View Packages</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Class Timings')}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all text-left shadow-sm flex items-center justify-between group"
                  >
                    <span>Class Timings</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Location')}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all text-left shadow-sm flex items-center justify-between group"
                  >
                    <span>Location</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Talk to Ethos')}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all text-left shadow-sm flex items-center justify-between group"
                  >
                    <span>Talk to Ethos</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* AFTER OPTION SELECTION: SHOW 2 CLEAN FOLLOW-UP BUTTONS STACKED VERTICALLY */}
            {!showMainMenu && (
              <div className="pt-3 space-y-2 animate-fadeIn border-t border-slate-200/80 max-w-[280px]">
                <div className="text-[11px] font-semibold text-slate-500 mb-1">
                  Were you satisfied with this answer? Choose an option below:
                </div>
                
                <div className="flex flex-col gap-2">
                  {/* 1. Main Menu Button */}
                  <button
                    onClick={handleResetMainMenu}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-between group"
                  >
                    <span>🏠 Main Menu</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {/* 2. Call Us Direct Button */}
                  <a
                    href="tel:+918341701113"
                    className="w-full py-2.5 px-4 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span>📞 Call Us</span>
                    </div>
                    <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-1.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 shadow-xs"
              />
              
              {/* Round Grey Send Button with Up Arrow */}
              <button
                type="submit"
                className="w-9 h-9 bg-[#71717A] hover:bg-[#18181B] text-white rounded-full flex items-center justify-center shadow-md transition-colors shrink-0"
                title="Send message"
              >
                <ArrowUp className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Bottom Tagline */}
            <div className="text-[10px] text-slate-400 text-center font-medium pt-1">
              Powered by <span className="font-bold text-slate-700">Ethos AI</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
