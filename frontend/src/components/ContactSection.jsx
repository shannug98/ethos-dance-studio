import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    // Format WhatsApp message to studio number 8341701113
    const waText = encodeURIComponent(
      `📩 *NEW ETHOS STUDIO WEBSITE INQUIRY*\n\n` +
      `👤 *Name*: ${form.name}\n` +
      `📱 *Phone*: ${form.phone}\n` +
      `✉️ *Email*: ${form.email}\n\n` +
      `💬 *Inquiry Message*:\n"${form.message}"`
    );

    // Open WhatsApp directly to +91 83417 01113
    window.open(`https://wa.me/918341701113?text=${waText}`, '_blank');

    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-[#FAF8F5] text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0088FF] block">STUDIO LOCATION & ADDRESS</span>
            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              VISIT ETHOS STUDIO
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Drop by for a walk-in studio tour, practice hall rental, or Sangeet choreography consultation!
            </p>

            <div className="space-y-4 pt-4 text-xs font-semibold text-slate-700">
              <div className="p-5 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-[#0088FF] text-sm block mb-1 uppercase font-syne">ETHOS STUDIO ADDRESS</strong>
                <p className="text-slate-900 text-sm font-semibold leading-relaxed">
                  Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-slate-900 text-sm block mb-1 uppercase">Phone & WhatsApp</strong>
                <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="text-slate-900 font-black text-base hover:text-[#0088FF] underline">
                  +91 83417 01113
                </a>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-slate-900 text-sm block mb-1 uppercase">Email Support</strong>
                <a href="mailto:ethosdancestudio@gmail.com" className="text-[#0088FF] font-black text-sm hover:underline">
                  ethosdancestudio@gmail.com
                </a>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-md rounded-2xl">
                <strong className="text-slate-900 text-sm block mb-1 uppercase">Operating Hours</strong>
                Monday - Sunday: 07:00 AM - 10:00 PM
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 space-y-4">
            <h3 className="text-2xl font-black uppercase font-syne text-slate-900">SEND INQUIRY TO STUDIO WHATSAPP</h3>
            <p className="text-xs text-slate-500 font-medium">Submitting this form directly dispatches your inquiry to our studio WhatsApp (+91 83417 01113).</p>

            {sent && (
              <div className="p-3 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>✓ Redirecting inquiry directly to Ethos Studio WhatsApp (+91 83417 01113)...</span>
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
                  placeholder="rahul@example.com"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">Message / Query</label>
                <textarea
                  rows="4" required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ask about batch timings, fee structures, or Sangeet packages..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#0088FF]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Inquiry via WhatsApp (+91 83417 01113)</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
