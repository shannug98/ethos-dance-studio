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
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      <Navbar onQuickBook={(item) => setSelectedItemForBooking(item)} />

      <main className="pt-[76px]">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#1F41FF] via-[#FF0044] to-[#111111] p-8 text-center text-white font-display uppercase tracking-widest">
          <h1 className="text-4xl sm:text-6xl font-black font-display-giant">OFFICIAL TIMETABLE & FEES</h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest mt-2">Monday - Friday • 1 Free Demo Trial Included</p>
        </div>

        {/* Timetable Schedule Section */}
        <SchedulesSection schedules={schedules} onSelectScheduleSlot={(item) => setSelectedItemForBooking(item)} />
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
