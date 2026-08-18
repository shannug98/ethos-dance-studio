import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappNumber = "919876543210";
  const defaultMessage = encodeURIComponent("Hi Ethos Dance Studio! I would like to book a Free Demo Trial Class at Kukatpally Hyderabad.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-110 border-2 border-white/20 group"
      title="Chat with Ethos Dance Studio on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current animate-bounce" />
      <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
}
