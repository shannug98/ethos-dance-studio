import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkshopsSection from './components/WorkshopsSection';
import Footer from './components/Footer';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [events, setEvents] = useState([]);

  // Modals & State
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => {});
  }, []);

  const handleSelectItemForBooking = (item) => {
    setSelectedItemForBooking(item);
  };

  const handleSuccessPayment = (registrationData) => {
    setSelectedItemForBooking(null);
    setConfirmedRegistration(registrationData);
  };

  const handleAdminLoginSuccess = () => {
    setAdminLoginOpen(false);
    setAdminDashboardOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      {/* Global Navbar with links that open dedicated pages in a NEW TAB */}
      <Navbar
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onQuickBook={handleSelectItemForBooking}
      />

      {/* 🌟 HOME PAGE ONLY CONTAINS:
          1. Hero Section (First image + FIND YOUR FLOW + Logo + Reserve Demo)
          2. About Ethos Section (Vision & Who We Are)
          3. Upcoming Events & Masterclass Workshops Section
          4. Footer
      */}
      <main>
        {/* 1. Hero Section (First Image + FIND YOUR FLOW) */}
        <HeroSection
          onBookWorkshop={handleSelectItemForBooking}
        />

        {/* 2. Vision & Who We Are (About Ethos) */}
        <AboutSection />

        {/* 3. Upcoming Events & Masterclass Workshops */}
        <WorkshopsSection
          events={events}
          onSelectEvent={handleSelectItemForBooking}
        />
      </main>

      {/* 4. Footer */}
      <Footer onQuickBook={handleSelectItemForBooking} />

      {/* MODAL 1: CHECKOUT OVERLAY (when card clicked) */}
      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL={API_URL}
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={handleSuccessPayment}
        />
      )}

      {/* MODAL 2: TICKET RECEIPT VOUCHER */}
      {confirmedRegistration && (
        <ConfirmationReceiptModal
          registration={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

      {/* MODAL 3: SEPARATE ADMIN LOGIN */}
      {adminLoginOpen && (
        <AdminLoginModal
          onClose={() => setAdminLoginOpen(false)}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {/* MODAL 4: PROTECTED ADMIN DASHBOARD */}
      {adminDashboardOpen && (
        <AdminDashboard
          API_URL={API_URL}
          onClose={() => setAdminDashboardOpen(false)}
          onLogout={() => setAdminDashboardOpen(false)}
        />
      )}

    </div>
  );
}
