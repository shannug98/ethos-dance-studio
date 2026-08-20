import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail, Share2 } from 'lucide-react';

export default function ShareModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareTitle = item?.title || 'Ethos Dance Studio Event';
  const shareText = `Check out "${shareTitle}" at Ethos Dance Studio Hyderabad! 💃🔥 Reserve your pass now: ${shareUrl}`;

  // Social Encoded URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(`Join me for ${shareTitle} at Ethos!`)}&body=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(shareText);
    alert(`Link & text copied to clipboard! Paste it directly into your Instagram Story or DM.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#0088FF]/10 text-[#0088FF] text-[10px] font-black uppercase rounded-full">
            <Share2 className="w-3 h-3" />
            <span>Share Event</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900 uppercase leading-snug">
            {shareTitle}
          </h2>
        </div>

        {/* Social Platforms Grid (WhatsApp, Instagram, Facebook, Gmail) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* 1. WHATSAPP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#128C7E] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xs font-black uppercase">WhatsApp</span>
          </a>

          {/* 2. INSTAGRAM */}
          <button
            onClick={handleInstagram}
            className="p-4 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 text-[#E1306C] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span className="text-xs font-black uppercase">Instagram</span>
          </button>

          {/* 3. FACEBOOK */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-xs font-black uppercase">Facebook</span>
          </a>

          {/* 4. GMAIL */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-[#EA4335] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-black uppercase">Gmail</span>
          </a>
        </div>

        {/* Copy Direct Link Bar */}
        <div className="pt-2">
          <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between gap-2 border border-slate-200">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs font-mono text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap outline-none w-full"
            />
            <button
              onClick={handleCopy}
              className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${
                copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
