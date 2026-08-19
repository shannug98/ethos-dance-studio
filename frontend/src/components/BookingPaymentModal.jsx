import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Shield, QrCode, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingPaymentModal({ item, API_URL, onClose, onSuccessPayment }) {
  const [step, setStep] = useState('DETAILS'); // 'DETAILS' | 'PAYMENT' | 'PROCESSING' | 'DONE'
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
  const [paymentOption, setPaymentOption] = useState('UPI'); // 'UPI' | 'CARDS' | 'NETBANKING' | 'WALLET'

  const itemPrice = item?.price || 199;
  const itemTitle = item?.title || 'Spot the Unexpected';

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    setStep('PAYMENT');
  };

  const handleCompletePayment = async () => {
    setLoading(true);
    setStep('PROCESSING');

    const mockTxId = 'PAY-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const mockCode = 'ETH' + Math.floor(1000 + Math.random() * 9000);

    const bookingPayload = {
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      itemTitle: itemTitle,
      pricePaid: itemPrice,
      paymentMethod: paymentOption,
      transactionId: mockTxId,
      bookingType: 'Pass'
    };

    try {
      await fetch(`${API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
    } catch (err) {
      console.log('Database post backup');
    }

    try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } }); } catch (err) {}

    localStorage.setItem('ethos_logged_in_user', JSON.stringify({
      id: 1025,
      customerCode: mockCode,
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      packageTitle: itemTitle,
      classesLeft: 20,
      daysRemaining: 30,
      passExpiryDate: 'September 18, 2026',
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    }));

    setStep('DONE');

    setTimeout(() => {
      if (onSuccessPayment) {
        onSuccessPayment({
          transactionId: mockTxId,
          itemTitle: itemTitle,
          pricePaid: itemPrice,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerCode: mockCode
        });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* STEP 1: DETAILS & ORDER SUMMARY MODAL */}
      {(step === 'DETAILS' || step === 'DONE') && (
        <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-800 animate-fadeIn">
          
          {/* LEFT SIDE: REGISTRATION FORM (65% width) */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 space-y-5">
            
            {/* Header Step Progress Bar */}
            <div className="flex items-center gap-4 text-[10px] font-extrabold tracking-wider border-b border-slate-200 pb-3">
              <div className="flex items-center gap-1.5 text-[#0088FF]">
                <span className="w-2 h-2 rounded-full bg-[#0088FF]"></span>
                <span>1 · DETAILS</span>
              </div>
              <div className="text-slate-400">2 · PAYMENT</div>
              <div className="text-slate-400">3 · DONE</div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0088FF] block mb-0.5">
                REGISTER · AUGUST PASS & CHALLENGE
              </span>
              <h2 className="text-2xl font-extrabold font-outfit text-slate-900 tracking-tight">
                Who's entering?
              </h2>
            </div>

            <form onSubmit={handleContinueToPayment} className="space-y-3.5">
              
              {/* Field 1: Student Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Student's full name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                  placeholder="Enter full name"
                />
              </div>

              {/* Field 2 & 3: Grade/Class & City (Side by Side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Grade / Class
                  </label>
                  <select
                    value={formData.gradeClass}
                    onChange={(e) => setFormData({ ...formData, gradeClass: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#0088FF] text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                  >
                    <option value="Adult Beginner">Adult Beginner</option>
                    <option value="Kids Batch (4-6 yrs)">Kids Batch (4-6 yrs)</option>
                    <option value="Kids Batch (6-12 yrs)">Kids Batch (6-12 yrs)</option>
                    <option value="Adult Advanced">Adult Advanced</option>
                    <option value="Grade 3">Grade 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                    placeholder="City"
                  />
                </div>
              </div>

              {/* Field 4: Phone Number (RENAMED FROM PARENT'S PHONE) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                  placeholder="+91 Phone number"
                />
              </div>

              {/* Field 5: Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#EEF5FF] border border-transparent focus:border-[#0088FF] focus:bg-white text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                  placeholder="email@example.com"
                />
              </div>

              {/* Field 6: Coupon Code */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Coupon code <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#0088FF] text-xs font-medium rounded-xl outline-none transition-all text-slate-800"
                  placeholder="Have a code? Enter it to register free"
                />
              </div>

              {/* Consent Box */}
              <div className="p-3 bg-[#FFF5F7] border border-[#FF0055]/30 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-700 font-medium leading-relaxed">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 w-3.5 h-3.5 text-[#0088FF] rounded"
                />
                <label htmlFor="consent" className="cursor-pointer">
                  I am the student's parent or guardian and I consent to Ethos collecting and using this information as described in the Privacy Policy.
                </label>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#F2F2F2] hover:bg-[#0088FF] hover:text-white text-slate-900 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Continue to payment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1.5 pt-0.5">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Secure payment via Razorpay · UPI, cards, netbanking & wallets</span>
              </div>

            </form>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY SIDEBAR (5/12 width - Dark Theme) */}
          <div className="w-full md:w-5/12 bg-[#0C0D12] text-white p-6 sm:p-8 flex flex-col justify-between relative border-l border-white/10">
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF0055] block">
                ORDER SUMMARY
              </span>

              {/* Product Info Box */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-[#0088FF]/20 border border-[#0088FF]/40 flex items-center justify-center text-white shrink-0">
                  📷
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{itemTitle}</h4>
                  <p className="text-[10px] text-slate-400">Dance · August Batch · Ethos Kukatpally</p>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs font-semibold text-slate-300 pt-1 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Entry fee</span>
                  <span className="text-white">₹{itemPrice}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee</span>
                  <span className="text-white">₹0.00</span>
                </div>
              </div>

              {/* Total Display */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs font-extrabold text-white uppercase font-outfit">Total</span>
                <span className="text-2xl font-bold text-white font-outfit">₹{itemPrice}</span>
              </div>

              {/* Bullet Features List */}
              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00DFD8] shrink-0" />
                  <span>Full brief & challenge video</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00DFD8] shrink-0" />
                  <span>Mentor review of your entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00DFD8] shrink-0" />
                  <span>Finalist certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00DFD8] shrink-0" />
                  <span>Winners: free NEXT pass</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#00DFD8]" />
              <span>Secure · encrypted checkout</span>
            </div>

          </div>

        </div>
      )}

      {/* STEP 2: RAZORPAY PAYMENT GATEWAY MODAL */}
      {(step === 'PAYMENT' || step === 'PROCESSING') && (
        <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-slate-800 border-4 border-[#FF5533] animate-fadeIn">
          
          {/* LEFT PANEL: RAZORPAY ORANGE BRANDING */}
          <div className="w-full md:w-5/12 bg-gradient-to-b from-[#FF5533] to-[#EE3311] text-white p-6 sm:p-8 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-xl bg-white text-[#FF5533] font-black text-xs flex items-center justify-center shadow-md">
                  ethos
                </div>
                <span className="font-extrabold text-sm tracking-wider uppercase font-syne">Ethos Dance Studio</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-6">
                <span className="text-[10px] font-bold uppercase text-white/80 block">Price Summary</span>
                <span className="text-3xl font-bold font-outfit">₹{itemPrice}</span>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-xs font-semibold mb-3 flex items-center justify-between">
                <span>Using as {formData.phone}</span>
                <span>›</span>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-xs font-semibold flex items-center justify-between">
                <span>🏷️ Offers on UPI, Card and...</span>
                <span>›</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20 text-[10px] font-extrabold uppercase text-white/80 tracking-wider">
              Secured by <span className="font-black text-white">Razorpay</span>
            </div>
          </div>

          {/* RIGHT PANEL: PAYMENT OPTIONS & UPI QR CODE */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-white">
            
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Payment Options</h3>
                <button onClick={() => setStep('DETAILS')} className="text-xs font-extrabold text-slate-400 hover:text-slate-800">
                  ✕
                </button>
              </div>

              {/* Payment Methods selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentOption('UPI')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentOption === 'UPI'
                      ? 'border-[#FF5533] bg-[#FFF5F3] shadow-sm'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-slate-900">UPI</span>
                    <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">3 Offers</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">GPay, PhonePe, Paytm</div>
                </div>

                {/* Cards Option */}
                <div
                  onClick={() => setPaymentOption('UPI')}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-[#FF5533] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-slate-900">Cards</span>
                    <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Up to 1.5% savings</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Visa, Mastercard, RuPay</div>
                </div>

              </div>

              {/* UPI QR CODE DISPLAY BOX */}
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-3.5 text-center space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Scan the QR using any UPI App</span>
                
                <div className="flex justify-center my-1">
                  <div className="p-2.5 bg-white border border-slate-300 rounded-xl shadow-inner relative group">
                    <div className="w-32 h-32 bg-[#111111] p-2 rounded-lg flex flex-col justify-between items-center text-white text-center">
                      <div className="flex justify-between w-full">
                        <div className="w-7 h-7 bg-white border-2 border-black"></div>
                        <div className="w-7 h-7 bg-white border-2 border-black"></div>
                      </div>
                      <div className="text-[8px] font-mono tracking-widest text-[#00DFD8]">8341701113@upi</div>
                      <div className="flex justify-between w-full">
                        <div className="w-7 h-7 bg-white border-2 border-black"></div>
                        <div className="w-7 h-7 bg-white border-2 border-black"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-extrabold text-slate-600">
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">GPay</span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">PhonePe</span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">Paytm</span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">BHIM</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handleCompletePayment}
                disabled={loading}
                className="w-full py-3.5 bg-[#FF5533] hover:bg-[#EE3311] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#FF5533]/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Pay ₹{itemPrice} & Activate Pass</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium">
              By proceeding, I agree to Razorpay's Privacy Notice · Edit Preferences
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
