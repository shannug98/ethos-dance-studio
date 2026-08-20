import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageCircle, MapPin, Clock, Ticket, UserCheck, Flame } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm the **Ethos AI Studio Concierge** ✨\n\nAsk me anything about class batch timings, monthly passes, upcoming workshop passes, or studio directions in Kukatpally!",
      time: 'Just now'
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

  // AI Knowledge Base Engine
  const getAiResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('timing') || q.includes('time') || q.includes('batch') || q.includes('schedule') || q.includes('class')) {
      return (
        `💃 **ETHOS CLASS SCHEDULE & BATCH TIMINGS**:\n\n` +
        `• **Adults & Fitness Batch**: Mon–Fri (7:30 AM & 8:00 PM) — ₹2,500/month\n` +
        `• **Kids Beginner (4–6 Yrs)**: Mon–Fri (5:00 PM - 6:00 PM) — ₹2,000/month\n` +
        `• **Kids Intermediate (6–12 Yrs)**: Mon–Fri (7:00 PM - 8:00 PM) — ₹2,000/month\n` +
        `• **Bollywood Commercial Fusion**: Mon–Fri (6:00 PM - 7:00 PM) — ₹2,500/month\n\n` +
        `Would you like to book a pass or trial session?`
      );
    } else if (q.includes('fee') || q.includes('price') || q.includes('cost') || q.includes('pass') || q.includes('rate') || q.includes('pay') || q.includes('tier')) {
      return (
        `💳 **ETHOS PASSES & TIERED PRICING**:\n\n` +
        `• **Monthly Class Pass**: ₹2,000 - ₹2,500 / month\n` +
        `• **Workshop Masterclasses**: Tiered Early Bird (Tier 1: ₹549 | Tier 2: ₹649 | Tier 3: ₹749 | Tier 4: ₹799)\n` +
        `• **Sangeet Wedding Package**: Custom tailored solos & family medleys\n\n` +
        `All passes include studio trial access and instructor feedback.`
      );
    } else if (q.includes('event') || q.includes('workshop') || q.includes('masterclass')) {
      return (
        `🎟️ **UPCOMING WORKSHOPS & MASTERCLASSES**:\n\n` +
        `🔴 **Hip-Hop & Choreography Masterclass** (Aug 19)\n` +
        `   • Master Instructor: Sophia Bennett\n` +
        `   • Early Bird Pass: ₹549 (Tier 1)\n\n` +
        `🟡 **Contemporary & Floorwork Workshop** (Sep 25)\n` +
        `   • Instructor: Rohan Sharma\n` +
        `   • Early Bird Pass: ₹549 (Tier 1)\n\n` +
        `Register directly on our Events page!`
      );
    } else if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('kukatpally') || q.includes('map') || q.includes('direction')) {
      return (
        `📍 **ETHOS DANCE STUDIO LOCATION**:\n\n` +
        `Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085.\n\n` +
        `🕒 Hours: Monday to Sunday (07:00 AM - 10:00 PM).\n` +
        `Feel free to walk in for a studio tour!`
      );
    } else if (q.includes('sangeet') || q.includes('wedding') || q.includes('marriage') || q.includes('couple') || q.includes('bride')) {
      return (
        `💍 **SANGEET & WEDDING CHOREOGRAPHY**:\n\n` +
        `We choreograph custom Bride & Groom solos, Couple duets, and high-energy Family group medleys!\n\n` +
        `• Private studio rehearsals & home choreography options\n` +
        `• High-energy Bollywood, Tollywood, and Punjabi medleys\n` +
        `Submit an inquiry on our Sangeet page!`
      );
    } else if (q.includes('portal') || q.includes('login') || q.includes('member') || q.includes('account') || q.includes('renew')) {
      return (
        `🔑 **MEMBER PORTAL ACCESS**:\n\n` +
        `Log into your Member Portal at student.html by entering your registered mobile number (+91 8341701113).\n\n` +
        `Track remaining classes, Days Left renewal countdown, and instructor ratings!`
      );
    } else {
      return (
        `✨ I'm the **Ethos AI Studio Concierge**!\n\n` +
        `I can answer questions about:\n` +
        `1. 💃 Class Batches & Timings\n` +
        `2. 💳 Monthly Passes & Tiered Pricing\n` +
        `3. 🎟️ Workshop Masterclasses\n` +
        `4. 📍 Studio Address in Kukatpally\n` +
        `5. 🔑 Member Portal & Renewal\n\n` +
        `Ask me anything!`
      );
    }
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAiResponse(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
    }, 500);
  };

  return (
    <>
      {/* 🌟 PERSISTENT FLOATING SOCIAL MEDIA DOCK (BOTTOM LEFT ON ALL PAGES & SCROLLS) 🌟 */}
      <div className="fixed bottom-6 left-6 z-40 bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 p-2 sm:p-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 border-white/10 group">
        
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
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md opacity-0 group-hover/ig:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-md">
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
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md opacity-0 group-hover/yt:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-md">
            YouTube
          </span>
        </a>

        {/* WhatsApp Direct Link */}
        <a
          href="https://wa.me/918341701113?text=Hi%20Ethos%20Dance%20Studio!%20I%20would%20like%20to%20inquire%20about%20classes%20and%20workshops."
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-110 transition-all flex items-center justify-center group/wa relative"
          title="Chat with Ethos Studio on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md opacity-0 group-hover/wa:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-md">
            WhatsApp
          </span>
        </a>

      </div>

      {/* 🤖 CREATIVE AI BOT TRIGGER BUTTON (BOTTOM RIGHT) 🤖 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 p-1 rounded-full bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] shadow-2xl hover:scale-110 transition-all duration-300 group"
          title="Open Ethos AI Studio Concierge"
        >
          <div className="bg-slate-950 hover:bg-slate-900 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full flex items-center gap-2.5 border border-white/20">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF0055] to-[#0088FF] flex items-center justify-center shadow-lg animate-pulse">
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
            </div>

            <div className="text-left">
              <div className="text-[10px] sm:text-xs font-black font-syne uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#00DFD8] to-[#0088FF] flex items-center gap-1">
                <span>ETHOS AI</span>
                <Sparkles className="w-3 h-3 text-[#00DFD8]" />
              </div>
              <div className="text-[8.5px] sm:text-[9px] font-extrabold text-slate-300 uppercase tracking-widest">Ask Concierge</div>
            </div>
          </div>
        </button>
      )}

      {/* 💬 CREATIVE GLASSMORPHIC AI CHAT WIDGET BOX 💬 */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] bg-slate-950/90 backdrop-blur-2xl border border-slate-800/80 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn font-sans border-white/10">
          
          {/* CREATIVE CHAT HEADER BAR */}
          <div className="relative bg-gradient-to-r from-[#141721] via-slate-900 to-[#141721] border-b border-slate-800/80 p-4 flex items-center justify-between shrink-0 overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0055]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0088FF]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF0055] via-[#7928CA] to-[#0088FF] p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#00DFD8]" />
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-black font-syne uppercase tracking-wider text-white flex items-center gap-1.5">
                  ETHOS AI CONCIERGE
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[8px] font-bold rounded-full uppercase">ONLINE</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold block">Kukatpally Studio • Real-time Assistant</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="relative z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium relative z-10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#0088FF] to-[#0077EE] text-white rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTED SMART PROMPT CHIPS */}
          <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[10px] relative z-10">
            <button
              onClick={() => handleSendMessage('What are class timings & batches?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl whitespace-nowrap border border-slate-800 transition-colors flex items-center gap-1"
            >
              <Clock className="w-3 h-3 text-[#0088FF]" />
              <span>Timings</span>
            </button>

            <button
              onClick={() => handleSendMessage('What are monthly pass fees?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl whitespace-nowrap border border-slate-800 transition-colors flex items-center gap-1"
            >
              <Ticket className="w-3 h-3 text-[#FF0055]" />
              <span>Pass Fees</span>
            </button>

            <button
              onClick={() => handleSendMessage('Tell me about workshop events')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl whitespace-nowrap border border-slate-800 transition-colors flex items-center gap-1"
            >
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Workshops</span>
            </button>

            <button
              onClick={() => handleSendMessage('Where is Ethos Studio located?')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl whitespace-nowrap border border-slate-800 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Location</span>
            </button>
          </div>

          {/* INPUT BAR */}
          <div className="p-3 bg-slate-950 border-t border-slate-800/80 shrink-0 space-y-2 relative z-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Ethos AI anything..."
                className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0088FF]"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-[#FF0055] to-[#0088FF] text-white rounded-xl shadow-md transition-all shrink-0 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[9.5px] text-slate-500 text-center flex items-center justify-center gap-1">
              <span>Need human instructor help?</span>
              <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="text-[#00DFD8] font-bold hover:underline">
                WhatsApp Studio (+91 83417 01113)
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
