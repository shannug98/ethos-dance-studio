import React, { useState } from 'react';
import { CheckCircle2, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 8000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-[#FAF8F5] text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* HEADER TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0088FF] bg-[#0088FF]/10 px-3.5 py-1 rounded-full inline-block">
            STUDIO LOCATION &amp; ADDRESS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
            VISIT ETHOS STUDIO
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Drop by for a walk-in studio tour, practice hall rental, or Sangeet choreography consultation!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STUDIO ADDRESS DETAILS & GOOGLE MAP LOCATION EMBED */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* GOOGLE MAP INTERACTIVE EMBED CARD */}
            <div className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0088FF]" />
                  <span className="font-extrabold font-syne uppercase text-xs text-slate-900 tracking-wider">
                    ETHOS DANCE STUDIO — GOOGLE MAPS LOCATION
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Ethos+Dance+Studio+Nizampet+Rd+Kukatpally+Hyderabad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#0088FF] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* MAP IFRAME EMBED DIRECTLY POINTING TO ETHOS DANCE STUDIO */}
              <div className="relative w-full h-80 bg-slate-100">
                <iframe
                  title="Ethos Dance Studio Google Map Location"
                  src="https://maps.google.com/maps?q=Ethos%20Dance%20Studio%20Nizampet%20Rd%20Jai%20Bharat%20Nagar%20Kukatpally%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-105"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ADDRESS & OPERATING DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="p-5 bg-white border border-slate-200 shadow-md rounded-2xl sm:col-span-2">
                <strong className="text-[#0088FF] text-xs block mb-1 uppercase font-syne tracking-wider">
                  ETHOS DANCE STUDIO ADDRESS
                </strong>
                <p className="text-slate-900 text-sm font-semibold leading-relaxed">
                  Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-slate-900 text-xs block mb-1 uppercase font-syne flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>Phone &amp; WhatsApp</span>
                </strong>
                <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="text-slate-900 font-black text-base hover:text-[#0088FF] underline">
                  +91 83417 01113
                </a>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-slate-900 text-xs block mb-1 uppercase font-syne flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>Email Support</span>
                </strong>
                <a href="mailto:ethosdancestudio@gmail.com" className="text-[#0088FF] font-black text-sm hover:underline">
                  ethosdancestudio@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: STUDIO INQUIRY FORM */}
          <div className="lg:col-span-5 bg-white border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-black uppercase font-syne text-slate-900 tracking-tight">
              STUDIO INQUIRY FORM
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Submit your query below. Our Ethos team will reach out directly to your WhatsApp number.
            </p>

            {sent && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl space-y-1 shadow-md animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Form Submitted Successfully!</span>
                </div>
                <p className="text-emerald-700 font-medium leading-relaxed">
                  Thank you! We have received your inquiry. Our Ethos Studio team will reach out directly shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">Your Full Name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">Phone Number (WhatsApp)</label>
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">Email Address</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">Message / Query</label>
                <textarea
                  rows={3} required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ask about batch timings, wedding sangeet packages, or studio rentals..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer"
              >
                Submit Inquiry →
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
