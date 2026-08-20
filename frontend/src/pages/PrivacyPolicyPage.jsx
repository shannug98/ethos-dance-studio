import React from 'react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      {/* Top Sticky Bar (Matching img 2) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between shadow-2xs">
        <a
          href="index.html"
          className="text-xs font-black uppercase text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </a>

        <a
          href="terms.html"
          className="text-xs font-black uppercase text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <span>Terms and Conditions</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        
        {/* White Document Container (Matching img 2) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-16 shadow-xl space-y-8 text-left">
          
          {/* Logo & Headline Header (Matching img 2) */}
          <div className="text-center space-y-4 border-b border-slate-100 pb-10">
            <img
              src={ethosPureLogo}
              alt="Ethos Dance Studio"
              className="h-16 w-auto mx-auto object-contain filter drop-shadow-md"
            />
            <h1 className="text-4xl sm:text-6xl font-serif italic text-[#1b5e20] font-normal tracking-tight">
              Privacy Policy
            </h1>
          </div>

          {/* Opening Paragraph */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            The ETHOS DANCE STUDIO website and WhatsApp groups ("Platform") are made available to you by ETHOS DANCE STUDIO (hereinafter may be referred to as the "Company", "we", "us", and "our"). We respect your privacy and are committed to protecting it through our compliance with this privacy policy. This policy describes: (i) the type of information that the Company may collect from you when you access or use its websites [ethosdancestudio.com], WhatsApp groups, and other online services (collectively referred to as the "Services"); and (ii) the Company’s practices for collecting, using, maintaining, protecting, and disclosing that information. This Privacy Policy is published in accordance with the (Indian) Information Technology Act, 2000 and the rules/regulations framed thereunder, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900">
              1. Application of Our Privacy Policy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              This policy specifically addresses the Information collected through the Company’s Services, including email, text, and other electronic communications associated with those Services. However, the policy does not extend to the information provided to or collected by third parties that users may use in connection with the Company's Services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900">
              2. Collection of the Information
            </h2>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800">i. Definitions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For the purposes of this privacy policy:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 font-normal">
                <li>
                  <strong className="text-slate-900">"Personal Information"</strong> means any information that relates to a natural person, which, either directly or indirectly, in combination with other information available with the Company, is capable of identifying the person concerned.
                </li>
                <li>
                  <strong className="text-slate-900">"Sensitive Personal Data or Information"</strong> means Personal Information of any individual relating to password; financial information such as bank account or credit card or debit card details; physical or physiological health conditions; emergency contacts; or payment instrument details.
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-slate-800">ii. Information You Provide to Us</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We collect information directly from you when you register for class passes, purchase workshop tickets, join our WhatsApp community groups, or communicate with our support team.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900">
              3. Use of Your Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We use information that we collect about you or that you provide to us to present our Platform and its contents, provide you with dance class passes and workshop schedules, process payment transactions, fulfill orders, and notify you about changes to our Services.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black font-syne text-slate-900">
              4. Data Security & Storage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We have implemented reasonable administrative, technical, and physical security measures to protect your personal information against unauthorized access, loss, or misuse in compliance with IT Act 2000 rules.
            </p>
          </div>

        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
