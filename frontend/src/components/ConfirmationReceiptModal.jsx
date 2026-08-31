import React from 'react';
import { X, CheckCircle2, Printer, Sparkles, MessageCircle, Download, FileText } from 'lucide-react';

export default function ConfirmationReceiptModal({ ticket, registration, onClose }) {
  const data = ticket || registration || {};

  const handlePrintPdfPass = () => {
    window.print();
  };

  const getWhatsappCredentialsUrl = () => {
    const cleanPhone = (data?.customerPhone || data?.phone || '8341701113').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `🎉 *ETHOS DANCE STUDIO — OFFICIAL EVENT PASS*\n\n` +
      `Hi *${data?.customerName || data?.personName || 'Gaddam Shanmuka'}*,\n` +
      `Your registration for *${data?.itemTitle || data?.eventTitle || 'Workshop Pass'}* is confirmed!\n\n` +
      `🆔 Student ID Code: *${data?.customerCode || data?.memberCode || 'ETH8392'}*\n` +
      `💳 Reference Tx ID: *${data?.transactionId || data?.ticketId || 'PAY-ETH83921'}*\n` +
      `💰 Amount Paid: *₹${data?.pricePaid || 1899}*\n` +
      `📅 Event Date & Time: *${data?.eventDate || 'Aug 26, 2026 (06:30 PM)'}*\n\n` +
      `📍 Studio Address: Nizampet Rd, Kukatpally, Hyderabad\n` +
      `Show QR Barcode at studio entrance scanner.\n\n` +
      `Ethos Dance Studio Team`
    );
    return `https://wa.me/91${cleanPhone}?text=${waText}`;
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static">
      
      <div className="relative w-full max-w-xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden text-slate-900 font-sans print:border-none print:shadow-none print:max-w-none print:w-full">
        
        {/* Top Decorative Blue Accent Bar */}
        <div className="h-3 bg-[#0088FF] print:hidden" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase font-sans tracking-tight text-slate-900">ETHOS OFFICIAL EVENT PASS</h3>
              <p className="text-xs text-emerald-700 font-bold">✓ Booking Confirmed &amp; QR Gate Pass Active</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Letterhead Content */}
        <div className="p-6 sm:p-8 space-y-6 print:p-8">
          
          {/* ETHOS BRAND LETTERHEAD WITH LOGO */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tighter text-slate-900 font-syne">ETHOS</span>
                <span className="text-2xl font-black text-[#0088FF]">DANCE STUDIO</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                Premier Dance &amp; Fitness Academy • Kukatpally, Hyderabad
              </p>
              <p className="text-[10px] text-slate-500">
                Nizampet Rd, Kukatpally, Hyderabad, Telangana 500085 | Contact: +91 83417 01113
              </p>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-full border border-emerald-300">
                OFFICIAL ENTRY PASS
              </span>
              <span className="block text-[10px] font-mono text-slate-500 font-bold mt-1">
                Issued: {new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>

          {/* PASS & STUDENT DETAILS GRID */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">PASS TICKET REFERENCE ID</span>
                <span className="text-base font-mono font-black text-[#0088FF]">
                  {data?.transactionId || data?.ticketId || 'PAY-ETH83921'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">PAYMENT STATUS</span>
                <span className="text-sm font-bold text-emerald-700">₹{data?.pricePaid || 1899} (PAID VIA ONLINE)</span>
              </div>
            </div>

            {/* EVENT SPECIFICATION */}
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">EVENT TITLE &amp; CATEGORY</span>
              <h4 className="text-lg font-black text-slate-900 font-syne uppercase">
                {data?.itemTitle || data?.eventTitle || 'WEDDING SANGEET FLASHMOB BOOTCAMP'}
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Type: <strong>Masterclass Workshop Intensive</strong> • Instructor: <strong>{data?.guestChoreographer || 'Rohan & Ananya'}</strong>
              </p>
            </div>

            {/* STUDENT MEMBER DETAILS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                <span className="font-bold text-slate-900 text-sm">{data?.customerName || data?.personName || 'Gaddam Shanmuka'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Code</span>
                <span className="font-mono font-bold text-[#0088FF] text-sm">{data?.customerCode || data?.memberCode || 'ETH8392'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Event Date &amp; Time</span>
                <span className="font-bold text-slate-900">{data?.eventDate || 'Aug 26, 2026 (06:30 PM)'}</span>
              </div>
            </div>

          </div>

          {/* GATE SCANNER QR PASS SECTION */}
          <div className="border border-slate-300 rounded-2xl p-4 flex items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(data?.transactionId || data?.ticketId || 'PAY-ETH83921')}`}
                alt="Entrance Gate QR Code"
                className="w-20 h-20 bg-white p-1 rounded-xl border border-slate-300 shadow-xs"
              />
              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-black text-slate-900 block text-sm uppercase">STUDIO ENTRANCE GATE QR CODE</span>
                <p className="text-[11px] text-slate-500">
                  Scan this QR code at the reception desk gate scanner upon arrival at the studio.
                </p>
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-[#0088FF] text-[9px] font-bold rounded-full border border-blue-200">
                  Valid for Single Gate Scanner Check-in
                </span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (HIDDEN IN PRINT PDF MODE) */}
          <div className="space-y-3 pt-2 print:hidden">
            <button
              onClick={handlePrintPdfPass}
              className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>📥 Download Official PDF Pass Document</span>
            </button>

            <div className="flex items-center gap-3">
              <a
                href={getWhatsappCredentialsUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-1/2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send to WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-xl cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
