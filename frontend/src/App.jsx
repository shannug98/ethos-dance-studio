import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventTickerBanner from './components/EventTickerBanner';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkshopsSection from './components/WorkshopsSection';
import InstructorsSection from './components/InstructorsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import StudentPortalModal from './components/StudentPortalModal';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [events, setEvents] = useState([]);

  // Modals & State
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [studentPortalOpen, setStudentPortalOpen] = useState(false);

  useEffect(() => {
    const loadEvents = () => {
      // 1. Check LocalStorage Admin Catalog first
      const savedAdminEvents = localStorage.getItem('ethos_master_events_catalog');
      let adminCatalog = [];
      if (savedAdminEvents) {
        try { adminCatalog = JSON.parse(savedAdminEvents); } catch {}
      }

      // 2. Fetch API events
      fetch(`${API_URL}/api/events`)
        .then(res => res.json())
        .then(data => {
          const combined = [...data, ...adminCatalog];
          // Remove duplicates by ID
          const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
          setEvents(unique);
        })
        .catch(() => {
          if (adminCatalog.length > 0) {
            setEvents(adminCatalog);
          }
        });
    };

    loadEvents();
    window.addEventListener('storage', loadEvents);
    return () => window.removeEventListener('storage', loadEvents);
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
    <div className="min-h-screen bg-[#090A0F] text-white font-sans relative">
      
      {/* 1. Global Navigation Header */}
      <Navbar
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onQuickBook={handleSelectItemForBooking}
      />

      {/* 2. Sliding Upcoming Event Notification Banner */}
      <div className="pt-[104px]">
        <EventTickerBanner onSelectEvent={handleSelectItemForBooking} />
      </div>

      {/* 3. CLEAN MAIN HOME PAGE FLOW */}
      <main>
        {/* HERO SECTION */}
        <HeroSection
          onBookWorkshop={handleSelectItemForBooking}
        />

        {/* ABOUT ETHOS */}
        <AboutSection />

        {/* SPECIAL UPCOMING EVENTS & WORKSHOPS (FILTERED WITHIN 28 DAYS) */}
        <WorkshopsSection
          events={events}
          onSelectEvent={handleSelectItemForBooking}
        />

        {/* MASTER CHOREOGRAPHERS & INSTRUCTORS */}
        <InstructorsSection />

        {/* STUDENT TESTIMONIALS & REVIEWS */}
        <TestimonialsSection />

        {/* LOCATION, MAP & CONTACT FORM */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onQuickBook={handleSelectItemForBooking}
      />

      {/* FLOATING WHATSAPP CHAT BUTTON */}
      <FloatingWhatsApp />

      {/* MODALS */}
      {selectedItemForBooking && (
        <BookingPaymentModal
          item={selectedItemForBooking}
          API_URL={API_URL}
          onClose={() => setSelectedItemForBooking(null)}
          onSuccessPayment={handleSuccessPayment}
        />
      )}

      {confirmedRegistration && (
        <ConfirmationReceiptModal
          data={confirmedRegistration}
          onClose={() => setConfirmedRegistration(null)}
        />
      )}

      {adminLoginOpen && (
        <AdminLoginModal
          onClose={() => setAdminLoginOpen(false)}
          onSuccess={handleAdminLoginSuccess}
        />
      )}

      {adminDashboardOpen && (
        <AdminDashboard
          API_URL={API_URL}
          onClose={() => setAdminDashboardOpen(false)}
          onLogout={() => setAdminDashboardOpen(false)}
        />
      )}

      {studentPortalOpen && (
        <StudentPortalModal
          onClose={() => setStudentPortalOpen(false)}
        />
      )}

    </div>
  );
}
