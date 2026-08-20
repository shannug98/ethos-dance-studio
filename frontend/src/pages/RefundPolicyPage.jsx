import React from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      {/* Top Sticky Bar (Matching img 4) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between shadow-2xs">
        <a
          href="index.html"
          className="text-xs font-black uppercase text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </a>

        <a
          href="privacy.html"
          className="text-xs font-black uppercase text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <span>Privacy Policy</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        
        {/* White Document Container (Matching img 4) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-16 shadow-xl space-y-8 text-left">
          
          {/* Logo & Headline Header (Matching img 4) */}
          <div className="text-center space-y-4 border-b border-slate-100 pb-10">
            <img
              src={ethosPureLogo}
              alt="Ethos Dance Studio"
              className="h-16 w-auto mx-auto object-contain filter drop-shadow-md"
            />
            <h1 className="text-4xl sm:text-6xl font-serif italic text-[#B71C1C] font-normal tracking-tight">
              Cancellation and Refund Policy
            </h1>
          </div>

          {/* No Cancellations or Refunds Section (Matching img 4) */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black font-syne text-slate-900">
              No Cancellations or Refunds
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              At ETHOS DANCE STUDIO, we strive to provide the best possible experience for our dancers and community members. As part of our commitment to transparency, we want to clarify that all purchases, workshop registrations, masterclass passes, and monthly subscription passes made on our platform are final. <strong className="text-[#B71C1C]">We do not entertain any cancellation or refund requests.</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We encourage you to review all class schedules, dates, and venue details before making a purchase. If you encounter any unexpected scheduling conflict or emergency, our support team is always here to assist you with batch rescheduling or pass transfer options where applicable.
            </p>
          </div>

          {/* Pass Transferability Policy */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900">
              Pass Rescheduling & Transfer Requests
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              If a dancer is unable to attend a registered workshop due to medical reasons or pre-notified emergencies, pass transfer requests to an upcoming batch or friend may be requested up to <strong className="text-slate-900">24 hours prior to class start time</strong> by contacting our hotline on WhatsApp: <a href="https://wa.me/918341701113" target="_blank" rel="noreferrer" className="text-[#25D366] font-bold underline">+91 83417 01113</a>.
            </p>
          </div>

        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
