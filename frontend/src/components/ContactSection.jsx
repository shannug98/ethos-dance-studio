import React, { useState } from 'react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block">STUDIO LOCATION & ADDRESS</span>
            <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
              VISIT ETHOS STUDIO
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Drop by for a walk-in studio tour, practice hall rental, or Sangeet choreography consultation!
            </p>

            <div className="space-y-4 pt-4 text-xs font-semibold text-slate-300">
              <div className="p-5 bg-[#111111] border border-[#333333]">
                <strong className="text-[#D0FBF9] text-sm block mb-1 uppercase font-display">ETHOS STUDIO ADDRESS</strong>
                <p className="text-white text-sm font-semibold leading-relaxed">
                  Second floor, 1/2/49/1, Nizampet Rd, Jai Bharat Nagar, Nagarjuna Homes, Kukatpally, Hyderabad, Telangana 500085
                </p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#333333]">
                <strong className="text-white text-sm block mb-1 uppercase">Phone & Contact</strong>
                +91 98765 43210 / +91 91234 56789
              </div>

              <div className="p-4 bg-[#111111] border border-[#333333]">
                <strong className="text-white text-sm block mb-1 uppercase">Operating Hours</strong>
                Monday - Sunday: 07:00 AM - 10:00 PM
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#333333] p-8 space-y-4">
            <h3 className="text-2xl font-extrabold uppercase font-display text-white">SEND A MESSAGE TO ETHOS</h3>
            
            {sent && (
              <div className="p-3 bg-[#1F41FF] text-white text-xs font-bold">
                ✓ Thank you! Your message has been sent to Ethos Studio. Our team will respond shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Your Full Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahul Sharma"
                  className="w-full p-3 bg-[#000000] border border-[#333333] text-white focus:border-[#D0FBF9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Phone Number</label>
                <input
                  type="tel" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full p-3 bg-[#000000] border border-[#333333] text-white focus:border-[#D0FBF9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Email Address</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full p-3 bg-[#000000] border border-[#333333] text-white focus:border-[#D0FBF9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Message</label>
                <textarea
                  rows={3} required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Inquiry details..."
                  className="w-full p-3 bg-[#000000] border border-[#333333] text-white focus:border-[#D0FBF9] focus:outline-none resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-cyan text-xs py-3.5 uppercase font-extrabold">
                Send Inquiry to Ethos
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
