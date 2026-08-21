import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PackagesSection from '../components/PackagesSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/packages`)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[80px]">
        {/* CLEAN LUXURY DARK MONOCHROME BANNER (NO RAINBOW GRADIENT) */}
        <div className="bg-[#090A0F] py-14 px-6 text-center text-white uppercase tracking-widest border-b border-slate-800">
          <h1 className="text-4xl sm:text-6xl font-black font-syne text-white">STUDIO MEMBERSHIPS &amp; PASSES</h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest mt-2 text-slate-300">
            Transparent Monthly Passes &amp; All-Access Masterclass Subscriptions
          </p>
        </div>

        <PackagesSection packages={packages} onSelectPackage={(item) => setSelectedItemForBooking(item)} />
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

      <FloatingWhatsApp />
    </div>
  );
}
