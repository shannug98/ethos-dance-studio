import React from 'react';
import { Sparkles } from 'lucide-react';

export default function EventTickerBanner({ onSelectEvent }) {
  const tickerText = "🔥 UPCOMING SPECIAL EVENT: International Afro-Fusion Masterclass (Guest Choreographers Koffi & Team from Paris) • 📅 Saturday, Aug 29 • 🕒 05:00 PM - 08:00 PM • 📍 Ethos Grand Arena, Kukatpally • 🎟️ Only 5 Seats Left! • 💥 Wedding Sangeet Flashmob Bootcamp • 📅 Sunday, Sep 06 • 🕒 02:00 PM - 06:00 PM • 📍 Studio Ballroom A, Kukatpally • 🎟️ 7 Seats Left!";

  return (
    <div
      onClick={() => onSelectEvent && onSelectEvent({ id: 201, title: 'International Afro-Fusion Masterclass', price: 1499, type: 'Workshop Ticket' })}
      className="bg-gradient-to-r from-[#FF0044] via-[#1F41FF] to-[#D900FF] text-white py-2.5 px-4 text-xs font-extrabold tracking-widest uppercase cursor-pointer hover:opacity-95 transition-opacity overflow-hidden flex items-center shadow-md relative z-40 border-b border-[#000000]"
      title="Click to view & reserve event pass"
    >
      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full shrink-0 mr-4 text-[10px] sm:text-xs tracking-wider border border-white/20 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-[#D0FBF9] animate-pulse" />
        <span>NEXT EVENT</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap w-full">
        <div className="inline-block animate-marquee pl-4">
          <span className="mr-12">{tickerText}</span>
          <span className="mr-12">{tickerText}</span>
        </div>
      </div>
    </div>
  );
}
