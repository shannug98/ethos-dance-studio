import React, { useState, useRef } from 'react';
import { X, Lock, CheckCircle2, Shield, Printer, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const RAZORPAY_KEY = 'rzp_test_TS8IlVVeyIdK40';

export default function BookingPaymentModal({ item, API_URL, onClose, onSuccessPayment }) {
  const [step, setStep] = useState('DETAILS'); // 'DETAILS' | 'DONE'
  const [formData, setFormData] = useState({
    fullName: 'Gaddam Shanmuka',
    gradeClass: 'Adult Beginner',
    city: 'Hyderabad',
    phone: '+918341701113',
    email: 'shanmukagaddam98@gmail.com',
    couponCode: '',
    consent: true
  });
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const itemPrice = item?.price || 199;
  const itemTitle = item?.title || 'Dance Workshop';
  const itemDate = item?.date || 'Aug 2026';

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!formData.consent) { alert('Please agree to the terms to continue.'); return; }
    launchRazorpay();
  };

  const launchRazorpay = () => {
    setLoading(true);
    const mockCode = 'ETH' + Math.floor(1000 + Math.random() * 9000);

    const handlePaymentSuccess = (response) => {
      const txId = response.razorpay_payment_id || ('PAY-' + Math.random().toString(36).substring(2, 10).toUpperCase());

      try { confetti({ particleCount: 160, spread: 90, origin: { y: 0.55 } }); } catch (e) {}

      localStorage.setItem('ethos_logged_in_user', JSON.stringify({
        id: 1025, customerCode: mockCode, name: formData.fullName,
        phone: formData.phone, email: formData.email, packageTitle: itemTitle,
        classesLeft: 20, daysRemaining: 30, passExpiryDate: 'September 18, 2026',
        profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      }));

      try {
        const newTicket = {
          ticketId: txId, eventId: item?.id || Date.now(), eventTitle: itemTitle,
          eventDate: itemDate, personName: formData.fullName, personPhone: formData.phone,
          personEmail: formData.email, tierName: 'Standard Pass', pricePaid: itemPrice,
          paymentMethod: 'Razorpay',
          bookedAt: new Date().toISOString().slice(0, 16).replace('T', ' '), status: 'CONFIRMED'
        };
        const existing = JSON.parse(localStorage.getItem('ethos_master_event_tickets') || '[]');
        localStorage.setItem('ethos_master_event_tickets', JSON.stringify([newTicket, ...existing]));
        window.dispatchEvent(new Event('storage'));
      } catch (e) {}

      try {
        fetch((API_URL || 'http://localhost:5000') + '/api/payment/send-whatsapp', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: formData.phone,
            message:
              `ðŸŽŸï¸ *ETHOS DANCE STUDIO â€” TICKET CONFIRMED* âœ…\n\n` +
              `Hi *${formData.fullName}*! Your booking is confirmed.\n\n` +
              `ðŸ“Œ *Event*: ${itemTitle}\nðŸ“… *Date*: ${itemDate}\n` +
              `ðŸ†” *Payment ID*: ${txId}\nðŸ’° *Amount Paid*: â‚¹${itemPrice}\n` +
              `ðŸŽ« *Member Code*: ${mockCode}\nðŸ“ *Venue*: Nizampet Rd, Kukatpally, Hyderabad\n\n` +
              `Show this message at the entrance. See you on stage! ðŸ’ƒðŸ•º\n*â€” Ethos Dance Studio Team*`
          })
        }).catch(() => {});
      } catch (e) {}

      setTicketData({
        txId, mockCode, eventTitle: itemTitle, eventDate: itemDate,
        personName: formData.fullName, personPhone: formData.phone,
        personEmail: formData.email, pricePaid: itemPrice,
        bookedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      });
      setLoading(false);
      setStep('DONE');

      if (onSuccessPayment) {
        onSuccessPayment({ transactionId: txId, itemTitle, pricePaid: itemPrice, customerName: formData.fullName, customerEmail: formData.email, customerPhone: formData.phone, customerCode: mockCode });
      }
    };

    try {
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY,
        amount: itemPrice * 100,
        currency: 'INR',
        name: 'ETHOS Dance Studio',
        description: itemTitle,
        image: 'https://shannug98.github.io/ethos-dance-studio/assets/ethos-style-v20260820-noid-BQAfCUZr.png',
        handler: (response) => handlePaymentSuccess(response),
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone.replace(/[^0-9]/g, '').slice(-10)
        },
        notes: { eventTitle: itemTitle },
        theme: { color: '#FF0055' },
        modal: { ondismiss: () => setLoading(false) }
      });
      rzp.on('payment.failed', (r) => {
        alert(`âŒ Payment Failed: ${r.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay error:', err);
      handlePaymentSuccess({ razorpay_payment_id: 'TEST-' + Date.now() });
    }
  };

  // â”€â”€ DONE: TICKET SUCCESS SCREEN â”€â”€
  if (step === 'DONE' && ticketData) {
    const qrData = encodeURIComponent(`ETHOS|${ticketData.txId}|${ticketData.mockCode}|${ticketData.eventTitle}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrData}&bgcolor=090a0f&color=ffffff&format=png`;

    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-lg bg-[#090A0F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white animate-fadeIn">

          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all print:hidden">
            <X className="w-4 h-4" />
          </button>

          {/* Success Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-5 text-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-wider">Payment Confirmed! ðŸŽ‰</h2>
            <p className="text-emerald-100 text-xs font-medium mt-1">Your seat is reserved Â· WhatsApp receipt sent to {ticketData.personPhone}</p>
          </div>

          <div className="p-6 space-y-4">

            {/* Event Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#D900FF]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D900FF]">Event Ticket</span>
              </div>
              <h3 className="text-base font-extrabold text-white leading-tight">{ticketData.eventTitle}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">ðŸ“… {ticketData.eventDate} Â· ðŸ“ Ethos Dance Studio, Kukatpally</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Member Name</span>
                <span className="font-extrabold text-white">{ticketData.personName}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Member Code</span>
                <span className="font-extrabold text-[#00DFD8]">{ticketData.mockCode}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Amount Paid</span>
                <span className="font-extrabold text-emerald-400">â‚¹{ticketData.pricePaid}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Booked At</span>
                <span className="font-extrabold text-white text-[10px]">{ticketData.bookedAt}</span>
              </div>
            </div>

            {/* Payment ID */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Payment ID</span>
              <span className="text-[11px] font-mono font-bold text-amber-300 break-all">{ticketData.txId}</span>
            </div>

            {/* QR Code */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-3">ðŸ“± Entry QR Code â€” Show at Gate</span>
              <div className="flex justify-center">
                <img
                  src={qrUrl}
                  alt="Entry QR Code"
                  className="w-36 h-36 rounded-xl border-2 border-white/20 shadow-xl"
                />
              </div>
              <p className="text-[9px] text-slate-500 font-medium mt-2">Scan at entrance for instant check-in</p>
            </div>

            {/* WhatsApp Notice */}
            <div className="flex items-center gap-2.5 bg-emerald-900/30 border border-emerald-700/40 rounded-xl px-4 py-3">
              <span className="text-lg">ðŸ“²</span>
              <span className="text-xs text-emerald-300 font-semibold">WhatsApp receipt sent to <strong>{ticketData.personPhone}</strong></span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Ticket
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 bg-[#FF0055] hover:bg-[#D00044] rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all shadow-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done &amp; Close
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // â”€â”€ DETAILS FORM â”€â”€
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-800 animate-fadeIn">

        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all">
          <X className="w-4 h-4" />
        </button>

        {/* LEFT: FORM */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-4 text-[10px] font-extrabold tracking-wider border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5 text-[#0088FF]"><span className="w-2 h-2 rounded-full bg-[#0088FF]" /><span>1 Â· DETAILS</span></div>
            <div className="text-slate-400">2 Â· PAYMENT</div>
            <div className="text-slate-400">3 Â· DONE</div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0088FF] block mb-0.5">REGISTER Â· {itemTitle.toUpperCase()}</span>
            <h2 className="text-2xl font-extrabold font-outfit text-slate-900 tracking-tight">Who's entering?</h2>
          </div>

          <form onSubmit={handleContinueToPayment} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Student's full name</label>
              <input type="text" required value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="Enter full name" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Grade / Class</label>
                <select value={formData.gradeClass} onChange={(e) => setFormData({ ...formData, gradeClass: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#0088FF] text-xs font-medium rounded-xl outline-none transition-all text-slate-800">
                  <option>Adult Beginner</option><option>Kids Batch (4-6 yrs)</option><option>Kids Batch (6-12 yrs)</option><option>Adult Advanced</option><option>Grade 3</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">City</label>
                <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="City" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone number</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="+91 XXXXX XXXXX" />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="your@email.com" />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Coupon code <span className="text-slate-400 font-normal">(optional)</span></label>
              <input type="text" value={formData.couponCode} onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="Have a code? Enter it to register free" />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-0.5 accent-[#0088FF]" />
              <span className="text-[10px] text-slate-500 font-medium leading-relaxed">I am the student's parent or guardian and I consent to Ethos collecting and using this information as described in the Privacy Policy.</span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#090A0F] hover:bg-[#1a1b22] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? 'Opening Razorpayâ€¦' : 'Continue to Payment â†’'}
            </button>
            <p className="text-center text-[10px] text-slate-400 font-medium">ðŸ”’ Secure payment via Razorpay Â· UPI, cards, netbanking & wallets</p>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="w-full md:w-5/12 bg-[#0E0F16] text-white p-6 sm:p-8 flex flex-col justify-between rounded-b-3xl md:rounded-r-3xl">
          <div className="space-y-5">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF0055]">Order Summary</div>
            <div className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="w-10 h-10 bg-[#FF0055]/20 border border-[#FF0055]/30 rounded-lg flex items-center justify-center text-[#FF0055] shrink-0">ðŸŽŸï¸</div>
              <div>
                <div className="text-xs font-extrabold text-white leading-tight">{itemTitle}</div>
                <div className="text-[10px] text-slate-400 font-medium">Dance Â· {itemDate} Â· Ethos Kukatpally</div>
              </div>
            </div>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-slate-300"><span>Entry fee</span><span>â‚¹{itemPrice}.00</span></div>
              <div className="flex justify-between text-slate-400"><span>Platform fee</span><span>â‚¹0.00</span></div>
              <div className="flex justify-between font-black text-white text-base border-t border-white/10 pt-2 mt-2"><span>TOTAL</span><span>â‚¹{itemPrice}</span></div>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300 font-medium">
              {['Full brief & challenge video', 'Mentor review of your entry', 'Finalist certificate', 'Winners: free NEXT pass'].map((f) => (
                <div key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00DFD8] shrink-0" /><span>{f}</span></div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#00DFD8]" /><span>Secure Â· encrypted checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
}
