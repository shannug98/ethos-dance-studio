import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InstructorsSection from '../components/InstructorsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function LocationPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0044] via-[#111111] to-[#1F41FF] p-8 text-center text-white font-display uppercase tracking-widest">
          <h1 className="text-4xl sm:text-6xl font-black font-display-giant">STUDIO LOCATION & TEAM</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2">Kukatpally Hyderabad • Meet Our Master Choreographers</p>
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
    </div>
  );
}
