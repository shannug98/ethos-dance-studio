import React from 'react';
import { X, CheckCircle2, Printer, Sparkles } from 'lucide-react';

export default function ConfirmationReceiptModal({ registration, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#111111] border-2 border-[#333333] shadow-2xl overflow-hidden text-white">
        
        {/* Top Decorative Strip */}
        <div className="h-2 bg-[#1F41FF]" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#333333] flex items-center justify-between bg-[#000000]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#1F41FF] text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase font-display tracking-wider">ETHOS STUDIO ENTRY PASS</h3>
              <p className="text-[11px] text-[#D0FBF9] font-bold">Razorpay Payment Confirmed</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Ticket Content */}
        <div className="p-6 space-y-6">
          
          <div className="bg-[#000000] border border-[#333333] p-5 space-y-4 relative">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reference Transaction ID</span>
                <span className="text-sm font-mono font-bold text-[#D0FBF9]">{registration?.transactionId || 'PAY-98402A18'}</span>
              </div>
              <span className="px-2.5 py-1 bg-[#1F41FF] text-[10px] font-extrabold text-white uppercase">
                PAID & ACTIVE
              </span>
            </div>

            <div className="pt-2 border-t border-[#222222]">
              <span className="text-[10px] font-bold text-[#D900FF] uppercase">Booked Pass / Service</span>
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
                <span className="text-slate-400 block text-[10px]">Email Address</span>
                <span className="font-bold text-white truncate block">{registration?.customerEmail || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Amount Paid</span>
                <span className="font-black text-[#D0FBF9] text-base font-display">₹{registration?.pricePaid || 499}</span>
              </div>
            </div>

            {/* Studio Address */}
            <div className="pt-3 border-t border-[#222222] text-[10px] text-slate-300 leading-normal">
              <strong>Studio Address:</strong> Second floor, 1/2/49/1, Nizampet Rd, Kukatpally, Hyderabad, Telangana 500085
            </div>

            {/* QR Barcode Entry Pass */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white p-1">
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

          <div className="p-3.5 bg-[#1F41FF] text-white text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D0FBF9] shrink-0" />
            <span>Digital voucher & SMS alert dispatched to <strong>{registration?.customerPhone}</strong>.</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-1/2 py-3 bg-[#222222] hover:bg-[#333333] text-xs font-bold text-white uppercase border border-[#404040]"
            >
              Print Ticket
            </button>

            <button
              onClick={onClose}
              className="w-1/2 btn-cyan py-3 text-xs font-extrabold uppercase text-center"
            >
              Done & Close
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
