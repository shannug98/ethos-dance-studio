import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SchedulesSection from '../components/SchedulesSection';
import Footer from '../components/Footer';
import BookingPaymentModal from '../components/BookingPaymentModal';
import ConfirmationReceiptModal from '../components/ConfirmationReceiptModal';

const API_URL = 'http://localhost:5000';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/schedules`)
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#FF0055] via-[#7928CA] to-[#0088FF] p-8 text-center text-white uppercase tracking-widest shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-black font-syne">OFFICIAL CLASS TIMETABLE</h1>
          <p className="text-xs sm:text-sm font-extrabold font-outfit tracking-widest mt-2 opacity-90">
            Monday - Friday Weekly Batches • Morning & Evening Sessions
          </p>
        </div>

        {/* Timetable Schedule Section */}
        <SchedulesSection schedules={schedules} />
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
