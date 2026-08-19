import React from 'react';
import { X, CheckCircle2, Printer, Sparkles, MessageCircle } from 'lucide-react';

export default function ConfirmationReceiptModal({ registration, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const getWhatsappCredentialsUrl = () => {
    const cleanPhone = (registration?.customerPhone || '8341701113').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `🎉 *ETHOS DANCE STUDIO — PASS REGISTRATION CONFIRMED*\n\n` +
      `Hi *${registration?.customerName || 'Student'}*,\n` +
      `Your registration for *${registration?.itemTitle || 'Monthly Pass'}* is successfully confirmed!\n\n` +
      `🆔 Student ID Code: *${registration?.customerCode || 'ETH-8492'}*\n` +
      `💳 Reference Tx ID: *${registration?.transactionId || 'PAY-98402'}*\n` +
      `💰 Amount Paid: *₹${registration?.pricePaid || 549}*\n\n` +
      `🔑 Member Portal Login: https://shannug98.github.io/ethos-dance-studio/student.html\n\n` +
      `📍 Studio Address: Nizampet Rd, Kukatpally, Hyderabad\n` +
      `Show QR Barcode at reception desk upon arrival.\n\n` +
      `See you at the studio!\nEthos Dance Studio Team`
    );
    return `https://wa.me/91${cleanPhone}?text=${waText}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#111111] border-2 border-[#333333] shadow-2xl overflow-hidden text-white rounded-3xl">
        
        {/* Top Decorative Strip */}
        <div className="h-2 bg-[#0088FF]" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#333333] flex items-center justify-between bg-[#000000]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0088FF] text-white rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase font-display tracking-wider">ETHOS STUDIO ENTRY PASS</h3>
              <p className="text-[11px] text-[#00DFD8] font-bold">Payment Confirmed & Account Issued</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Ticket Content */}
        <div className="p-6 space-y-5">
          
          <div className="bg-[#000000] border border-[#333333] p-5 space-y-4 relative rounded-2xl">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reference Transaction ID</span>
                <span className="text-sm font-mono font-bold text-[#00DFD8]">{registration?.transactionId || 'PAY-98402A18'}</span>
              </div>
              <span className="px-2.5 py-1 bg-[#0088FF] text-[10px] font-extrabold text-white uppercase rounded-full">
                PAID & ACTIVE
              </span>
            </div>

            <div className="pt-2 border-t border-[#222222]">
              <span className="text-[10px] font-bold text-[#FF0055] uppercase">Booked Pass / Service</span>
              <h4 className="text-xl font-extrabold text-white font-display mt-0.5">{registration?.itemTitle || 'Dance Pass'}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#222222]">
              <div>
                <span className="text-slate-400 block text-[10px]">Customer Name</span>
                <span className="font-bold text-white">{registration?.customerName || 'Guest'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mobile Contact</span>
                <span className="font-bold text-white">{registration?.customerPhone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Customer Student Code</span>
                <span className="font-bold text-[#00DFD8] font-mono">{registration?.customerCode || 'ETH-8492'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Amount Paid</span>
                <span className="font-black text-[#00DFD8] text-base font-display">₹{registration?.pricePaid || 549}</span>
              </div>
            </div>

            {/* Studio Address */}
            <div className="pt-3 border-t border-[#222222] text-[10px] text-slate-300 leading-normal">
              <strong>Studio Address:</strong> Second floor, 1/2/49/1, Nizampet Rd, Kukatpally, Hyderabad, Telangana 500085
            </div>

            {/* QR Barcode Entry Pass */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white p-1 rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${registration?.transactionId || 'PAY-98402A18'}`}
                    alt="Ticket QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[11px] text-slate-300">
                  <div className="font-bold text-white uppercase">Studio Entry Barcode</div>
                  <div>Show at reception desk</div>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-400 font-mono">
                {new Date(registration?.bookedAt || Date.now()).toLocaleDateString()}
              </div>
            </div>

          </div>

          {/* 📲 1-CLICK WHATSAPP CREDENTIALS DISPATCH BUTTON */}
          <a
            href={getWhatsappCredentialsUrl()}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Receive Pass & Credentials on WhatsApp</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="w-1/2 py-3 bg-[#222222] hover:bg-[#333333] text-xs font-bold text-white uppercase border border-[#404040] rounded-xl"
            >
              Print Ticket
            </button>

            <button
              onClick={onClose}
              className="w-1/2 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-xs font-extrabold uppercase text-center text-white rounded-xl"
            >
              Done & Close
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
