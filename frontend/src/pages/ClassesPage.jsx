import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ClassesSection from '../components/ClassesSection';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function ClassesPage() {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      {/* Navbar with external new tab links */}
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0044] via-[#1F41FF] to-[#D900FF] p-8 text-center text-white font-display uppercase tracking-widest">
          <h1 className="text-4xl sm:text-6xl font-black font-display-giant">ETHOS DANCE CLASSES</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2">Explore Commercial Hip-Hop, Bollywood Fusion, Heels & Kids Batches</p>
        </div>

        {/* Classes Catalog */}
        <ClassesSection onSelectClass={(item) => setSelectedItemForBooking(item)} />
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
