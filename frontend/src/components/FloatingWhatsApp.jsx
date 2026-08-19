import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageCircle, MapPin, Clock, Ticket, UserCheck, ChevronDown } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm the **Ethos AI Studio Concierge**.\n\nHow can I help you today? Ask me about class timings, monthly passes, workshop tickets, or studio location!",
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
        `Would you like to register for a monthly pass or visit for a trial class?`
      );
    } else if (q.includes('fee') || q.includes('price') || q.includes('cost') || q.includes('pass') || q.includes('rate') || q.includes('pay')) {
      return (
        `💳 **ETHOS PASSES & PRICING**:\n\n` +
        `• **Monthly Class Pass**: ₹2,000 - ₹2,500 / month (Full access)\n` +
        `• **Masterclass Workshop Ticket**: ₹549 Tier 1 Early Bird (Includes all taxes)\n` +
        `• **Sangeet Wedding Package**: Custom tailored for couples & family medleys\n\n` +
        `All passes include studio trial access and instructor feedback.`
      );
    } else if (q.includes('event') || q.includes('workshop') || q.includes('masterclass')) {
      return (
        `🎟️ **UPCOMING WORKSHOPS & MASTERCLASSES**:\n\n` +
        `🔴 **Hip-Hop & Choreography Masterclass** (Aug 19)\n` +
        `   • Master Instructor: Sophia Bennett\n` +
        `   • Early Bird Ticket: ₹549 (Tier 1)\n\n` +
        `🟡 **Contemporary & Floorwork Workshop** (Sep 25)\n` +
        `   • Instructor: Rohan Sharma\n` +
        `   • Early Bird Ticket: ₹549 (Tier 1)\n\n` +
        `You can register directly on our Events page!`
      );
    } else if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('kukatpally') || q.includes('map') || q.includes('direction')) {
      return (
        `📍 **ETHOS DANCE STUDIO LOCATION**:\n\n` +
        `Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085.\n\n` +
        `🕒 Studio Hours: Monday to Sunday (07:00 AM - 10:00 PM).\n` +
        `Feel free to drop in for a walk-in studio tour!`
      );
    } else if (q.includes('sangeet') || q.includes('wedding') || q.includes('marriage') || q.includes('couple') || q.includes('bride')) {
      return (
        `💍 **SANGEET & WEDDING CHOREOGRAPHY**:\n\n` +
        `We choreograph custom Bride & Groom solos, Couple duets, and high-energy Family group medleys!\n\n` +
        `• Private studio rehearsals & home choreography options\n` +
        `• High-energy Bollywood, Tollywood, and Punjabi medleys\n` +
        `Submit an inquiry on our Sangeet page to get started!`
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
        `2. 💳 Monthly Passes & Fees\n` +
        `3. 🎟️ Workshop Masterclasses\n` +
        `4. 📍 Studio Address in Kukatpally\n` +
        `5. 🔑 Member Portal & Renewal\n\n` +
        `Feel free to ask me anything!`
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

    // Generate AI response
    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAiResponse(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
    }, 600);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (BOTTOM RIGHT) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] hover:opacity-95 text-white px-4 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border-2 border-white/20 group"
          title="Ask Ethos AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black animate-pulse" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
            Ask Ethos AI
          </span>
          <Sparkles className="w-4 h-4 text-[#00DFD8]" />
        </button>
      )}

      {/* FLOATING AI CHAT WIDGET BOX */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[90vw] sm:w-96 h-[520px] bg-slate-900 border border-slate-700 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn font-sans">
          
          {/* CHAT HEADER BAR */}
          <div className="bg-gradient-to-r from-[#141721] via-slate-900 to-[#141721] border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-[#FF0055] to-[#7928CA] flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black font-syne uppercase tracking-wider text-white flex items-center gap-1.5">
                  ETHOS AI ASSISTANT
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold block">Studio Concierge • Kukatpally</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-[#0088FF] text-white rounded-br-none'
                      : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-none'
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
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[10px]">
            <button
              onClick={() => handleSendMessage('What are the class timings & batches?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl whitespace-nowrap border border-slate-700 transition-colors"
            >
              🕒 Class Timings
            </button>

            <button
              onClick={() => handleSendMessage('What are monthly pass fees?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl whitespace-nowrap border border-slate-700 transition-colors"
            >
              💳 Pass Fees
            </button>

            <button
              onClick={() => handleSendMessage('Tell me about workshop events')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl whitespace-nowrap border border-slate-700 transition-colors"
            >
              🎟️ Workshops
            </button>

            <button
              onClick={() => handleSendMessage('Where is Ethos Studio located?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl whitespace-nowrap border border-slate-700 transition-colors"
            >
              📍 Location
            </button>
          </div>

          {/* INPUT BAR */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 space-y-2">
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
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0088FF]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#0088FF] hover:bg-[#0077EE] text-white rounded-xl shadow-md transition-all shrink-0"
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
