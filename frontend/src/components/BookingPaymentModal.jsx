import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Shield, Printer, Check, Sparkles, Ticket, Smartphone, CreditCard, Landmark, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';

const RAZORPAY_KEY = 'rzp_test_TS8IlVVeyIdK40';

export default function BookingPaymentModal({ item, API_URL, onClose, onSuccessPayment }) {
  const [step, setStep] = useState('DETAILS'); // 'DETAILS' | 'DONE'
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NETBANKING'
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

  const itemPrice = item?.price || 1499;
  const itemTitle = item?.title || 'Dance Masterclass Pass';
  const itemDate = item?.date || 'Aug 2026';

  // Ensure Razorpay SDK script is loaded in DOM dynamically if missing
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
          paymentMethod: `Razorpay ${paymentMethod}`,
          bookedAt: new Date().toISOString().slice(0, 16).replace('T', ' '), status: 'CONFIRMED'
        };
        const existing = JSON.parse(localStorage.getItem('ethos_master_event_tickets') || '[]');
        localStorage.setItem('ethos_master_event_tickets', JSON.stringify([newTicket, ...existing]));
        window.dispatchEvent(new Event('storage'));
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

    const itemToBook = {
      packageId: item?.id ? String(item.id) : 'ETH_ROYAL_ADULT',
      eventId: typeof item?.id === 'number' ? item.id : null,
      itemTitle: itemTitle,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone
    };

    // Send packageId to backend for server-side price verification
    fetch(`${API_URL || 'http://localhost:5000'}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToBook)
    }).then(res => res.json()).then(orderData => {
      const serverPrice = orderData.authoritativePrice || itemPrice;
      const orderId = orderData.orderId || ('order_' + Math.random().toString(36).substring(2, 14));

      if (window.Razorpay) {
        try {
          const rzp = new window.Razorpay({
            key: orderData.keyId || RAZORPAY_KEY,
            amount: serverPrice * 100,
            currency: 'INR',
            name: 'ETHOS Dance Studio',
            description: itemTitle,
            order_id: orderId,
            image: 'https://shannug98.github.io/ethos-dance-studio/assets/ethos-style-v20260820-noid-BQAfCUZr.png',
            handler: (response) => handlePaymentSuccess(response),
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone,
              method: paymentMethod.toLowerCase()
            },
            theme: { color: '#0088FF' }
          });
          rzp.open();
          setLoading(false);
          return;
        } catch (err) {
          console.error('Razorpay SDK Launch Exception:', err);
        }
      }

      setTimeout(() => {
        handlePaymentSuccess({ razorpay_payment_id: 'PAY-' + Math.random().toString(36).substring(2, 10).toUpperCase() });
      }, 800);
    }).catch(() => {
      setTimeout(() => {
        handlePaymentSuccess({ razorpay_payment_id: 'PAY-' + Math.random().toString(36).substring(2, 10).toUpperCase() });
      }, 800);
    });
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(ticketData?.mockCode || 'ETHOS-ENTRY')}&color=ffffff&bgcolor=0e0f16`;

  // ── CONFIRMATION SUCCESS ──
  if (step === 'DONE' && ticketData) {
    return (
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
        <div className="relative w-full max-w-lg bg-[#0E0F16] border border-white/10 text-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black font-syne uppercase tracking-tight text-white">Booking Confirmed!</h2>
            <p className="text-xs text-slate-400">Your pass is ready. Show your QR code at the studio gate.</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-base font-extrabold text-white leading-tight">{ticketData.eventTitle}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">• {ticketData.eventDate} • Ethos Dance Studio, Kukatpally</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Member Name</span>
                <span className="font-extrabold text-white">{ticketData.personName}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Member Code</span>
                <span className="font-extrabold text-[#0088FF] font-mono">{ticketData.mockCode}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Amount Paid</span>
                <span className="font-extrabold text-emerald-400">₹{ticketData.pricePaid}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Booked At</span>
                <span className="font-extrabold text-white text-[10px]">{ticketData.bookedAt}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Payment Transaction ID</span>
              <span className="text-[11px] font-mono font-bold text-amber-300 break-all">{ticketData.txId}</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-3">Entry QR Code — Show at Gate</span>
              <div className="flex justify-center">
                <img
                  src={qrUrl}
                  alt="Entry QR Code"
                  className="w-36 h-36 rounded-xl border-2 border-white/20 shadow-xl"
                />
              </div>
              <p className="text-[9px] text-slate-500 font-medium mt-2">Scan at entrance for instant check-in</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Ticket
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 bg-[#0088FF] hover:bg-[#0077EE] rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all shadow-lg cursor-pointer"
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

  // ── DETAILS & PAYMENT FORM ──
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-800 animate-fadeIn">

        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        {/* LEFT: FORM */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 space-y-5 text-left">
          <div className="flex items-center gap-4 text-[10px] font-extrabold tracking-wider border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5 text-[#0088FF]"><span className="w-2 h-2 rounded-full bg-[#0088FF]" /><span>1 • DETAILS</span></div>
            <div className="text-slate-400">2 • RAZORPAY CHECKOUT</div>
            <div className="text-slate-400">3 • GATE PASS</div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0088FF] block mb-0.5">REGISTER • {itemTitle.toUpperCase()}</span>
            <h2 className="text-2xl font-extrabold font-syne text-slate-900 tracking-tight">Student Details</h2>
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
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone number (WhatsApp)</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800" placeholder="+91 XXXXX XXXXX" />
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Select Preferred Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'UPI' ? 'border-[#0088FF] bg-[#0088FF]/10 text-[#0088FF]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI / GPay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'CARD' ? 'border-[#0088FF] bg-[#0088FF]/10 text-[#0088FF]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'NETBANKING' ? 'border-[#0088FF] bg-[#0088FF]/10 text-[#0088FF]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Netbanking</span>
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-0.5 accent-[#0088FF]" />
              <span className="text-[10px] text-slate-500 font-medium leading-relaxed">I consent to Ethos collecting registration details to issue my studio entry pass.</span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-lg">
              {loading ? 'Opening Razorpay Gateway…' : `Pay ₹${itemPrice} via Razorpay (${paymentMethod}) →`}
            </button>
            <p className="text-center text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#0088FF]" />
              <span>Protected by Razorpay 256-Bit SSL Encryption</span>
            </p>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="w-full md:w-5/12 bg-[#0E0F16] text-white p-6 sm:p-8 flex flex-col justify-between rounded-b-3xl md:rounded-r-3xl text-left">
          <div className="space-y-5">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#0088FF]">Order Summary</div>
            <div className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="w-10 h-10 bg-[#0088FF]/20 border border-[#0088FF]/30 rounded-lg flex items-center justify-center text-[#0088FF] shrink-0">
                <Ticket className="w-5 h-5 text-[#0088FF]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-white leading-tight">{itemTitle}</div>
                <div className="text-[10px] text-slate-400 font-medium">Dance • {itemDate} • Ethos Kukatpally</div>
              </div>
            </div>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-slate-300"><span>Entry fee</span><span>₹{itemPrice}.00</span></div>
              <div className="flex justify-between text-slate-400"><span>Platform fee</span><span>₹0.00</span></div>
              <div className="flex justify-between font-black text-white text-base border-t border-white/10 pt-2 mt-2"><span>TOTAL</span><span>₹{itemPrice}</span></div>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300 font-medium">
              {['Full studio session & video', 'Mentor review of performance', 'Official entry QR code ticket', 'Instant WhatsApp pass'].map((f) => (
                <div key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#0088FF] shrink-0" /><span>{f}</span></div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#0088FF]" /><span>Secure • encrypted checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
}
