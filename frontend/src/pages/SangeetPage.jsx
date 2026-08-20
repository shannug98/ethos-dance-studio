import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SangeethSection from '../components/SangeethSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function SangeetPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[104px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] p-8 text-center text-white uppercase tracking-widest shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-black font-syne">ROYAL SANGEET HUB</h1>
          <p className="text-xs sm:text-sm font-extrabold tracking-widest mt-2 opacity-90">Custom Wedding & Event Choreography Packages</p>
        </div>

        <SangeethSection onSelectSangeetPackage={(item) => setSelectedItemForBooking(item)} />
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
