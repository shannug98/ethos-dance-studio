import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SangeethSection from '../components/SangeethSection';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function SangeetPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#D900FF] via-[#FF0044] to-[#1F41FF] p-8 text-center text-white font-display uppercase tracking-widest">
          <h1 className="text-4xl sm:text-6xl font-black font-display-giant">ROYAL SANGEET HUB</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2">Custom Wedding & Event Choreography Packages</p>
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
    </div>
  );
}
