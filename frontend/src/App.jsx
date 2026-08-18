import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventTickerBanner from './components/EventTickerBanner';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ClassesSection from './components/ClassesSection';
import SchedulesSection from './components/SchedulesSection';
import WorkshopsSection from './components/WorkshopsSection';
import SangeethSection from './components/SangeethSection';
import InstructorsSection from './components/InstructorsSection';
import PackagesSection from './components/PackagesSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import UnifiedCheckoutSection from './components/UnifiedCheckoutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [events, setEvents] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [packages, setPackages] = useState([]);

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

    fetch(`${API_URL}/api/schedules`)
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(() => {});

    fetch(`${API_URL}/api/packages`)
      .then(res => res.json())
      .then(data => setPackages(data))
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
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans relative">
      
      {/* 1. Global Navigation Header */}
      <Navbar
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onQuickBook={handleSelectItemForBooking}
      />

      {/* 2. Sliding Upcoming Event Notification Banner */}
      <div className="pt-[76px]">
        <EventTickerBanner onSelectEvent={handleSelectItemForBooking} />
      </div>

      {/* 3. BUSINESS-FOCUSED HIGH CONVERSION HOMEPAGE FLOW */}
      <main>
        {/* HERO SECTION */}
        <HeroSection
          onBookWorkshop={handleSelectItemForBooking}
        />

        {/* ABOUT ETHOS */}
        <AboutSection />

        {/* DANCE CLASSES CATALOG */}
        <ClassesSection
          onSelectClass={handleSelectItemForBooking}
        />

        {/* LIVE MON-FRI TIMETABLE SCHEDULE & INR FEES */}
        <SchedulesSection
          schedules={schedules}
          onSelectScheduleSlot={handleSelectItemForBooking}
        />

        {/* MEMBERSHIPS & PRICING PASSES */}
        <PackagesSection
          packages={packages}
          onSelectPackage={handleSelectItemForBooking}
        />

        {/* SPECIAL UPCOMING EVENTS & WORKSHOPS */}
        <WorkshopsSection
          events={events}
          onSelectEvent={handleSelectItemForBooking}
        />

        {/* ROYAL SANGEET HUB */}
        <SangeethSection
          onSelectSangeetPackage={handleSelectItemForBooking}
        />

        {/* MASTER CHOREOGRAPHERS & INSTRUCTORS */}
        <InstructorsSection />

        {/* COMMUNITIES & ANIMATED PHOTO GALLERY */}
        <GallerySection
          onBookPass={handleSelectItemForBooking}
        />

        {/* STUDENT TESTIMONIALS & REVIEWS */}
        <TestimonialsSection />

        {/* REAL ONLINE CLASS BOOKING & CHECKOUT HUB */}
        <UnifiedCheckoutSection
          API_URL={API_URL}
          onSuccessPayment={handleSuccessPayment}
        />

        {/* LOCATION, MAP & CONTACT FORM */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer onQuickBook={handleSelectItemForBooking} />

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* MODAL 1: CHECKOUT OVERLAY (when class/workshop/pass clicked) */}
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

      {/* MODAL 4: PROTECTED ADMIN DASHBOARD (.NET API persistence) */}
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
