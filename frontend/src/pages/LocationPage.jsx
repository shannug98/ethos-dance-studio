import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InstructorsSection from '../components/InstructorsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function LocationPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[104px]">
        {/* CLEAN LUXURY DARK MONOCHROME BANNER (NO RAINBOW GRADIENT) */}
        <div className="bg-[#090A0F] py-14 px-6 text-center text-white font-display uppercase tracking-widest border-b border-slate-800">
          <h1 className="text-4xl sm:text-6xl font-black font-syne text-white">STUDIO LOCATION &amp; TEAM</h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest mt-2 text-slate-300">Kukatpally Hyderabad • Meet Our Master Choreographers</p>
        </div>

        <InstructorsSection />
        <ContactSection />
      </main>

      <Footer onQuickBook={(item) => setSelectedItemForBooking(item)} />

      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL={API_URL}
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={(data) => {
            setSelectedItemForBooking(null);
            setConfirmedRegistration(data);
          }}
        />
      )}

      {confirmedRegistration && (
        <ConfirmationReceiptModal
          registration={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

      {/* Floating AI Bot & Social Dock */}
      <FloatingWhatsApp />
    </div>
  );
}
