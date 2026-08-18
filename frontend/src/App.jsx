import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ClassesSection from './components/ClassesSection';
import SchedulesSection from './components/SchedulesSection';
import WorkshopsSection from './components/WorkshopsSection';
import SangeethSection from './components/SangeethSection';
import InstructorsSection from './components/InstructorsSection';
import PackagesSection from './components/PackagesSection';
import UnifiedCheckoutSection from './components/UnifiedCheckoutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingPaymentModal from './components/BookingPaymentModal';
import ConfirmationReceiptModal from './components/ConfirmationReceiptModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import EthosGalleryPage from './EthosGalleryPage';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [events, setEvents] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [packages, setPackages] = useState([]);

  // View Routing: 'home' vs 'gallery'
  const [view, setView] = useState(() => {
    return window.location.hash.includes('gallery') || window.location.pathname.includes('gallery')
      ? 'gallery'
      : 'home';
  });

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

  if (view === 'gallery') {
    return (
      <div>
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
          <button
            onClick={() => { setView('home'); window.location.hash = ''; }}
            className="font-bold text-[#FF0044] hover:underline flex items-center gap-1"
          >
            ← Back to Main Studio Home
          </button>
          <span>Ethos Communities & Clubs Gallery</span>
        </div>
        <EthosGalleryPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D900FF] selection:text-black font-sans">
      
      {/* Global Navbar */}
      <Navbar
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onQuickBook={handleSelectItemForBooking}
        onNavigateGallery={() => { setView('gallery'); window.location.hash = 'gallery'; }}
      />

      {/* Main Sections */}
      <main>
        <HeroSection
          onBookWorkshop={handleSelectItemForBooking}
        />

        {/* 1. Vision & Who We Are Split Grid */}
        <AboutSection />

        {/* 2. Dance Classes Catalog */}
        <ClassesSection
          onSelectClass={handleSelectItemForBooking}
        />

        {/* 3. Live Weekly Timetable Schedule (Mon-Fri 1 Demo Free) */}
        <SchedulesSection
          schedules={schedules}
          onSelectScheduleSlot={handleSelectItemForBooking}
        />

        {/* 4. Communitie.in Style Community Gallery & Impact Counters */}
        <GallerySection
          onBookPass={handleSelectItemForBooking}
        />

        {/* 5. Masterclass Workshops */}
        <WorkshopsSection
          events={events}
          onSelectEvent={handleSelectItemForBooking}
        />

        {/* 6. Royal Sangeet Hub */}
        <SangeethSection
          onSelectSangeetPackage={handleSelectItemForBooking}
        />

        {/* 7. Founders & Master Choreographers */}
        <InstructorsSection />

        {/* 8. Pricing Passes Overview */}
        <PackagesSection
          packages={packages}
          onSelectPackage={handleSelectItemForBooking}
        />

        {/* 9. SINGLE MAIN UNIFIED ONLINE CHECKOUT HUB */}
        <UnifiedCheckoutSection
          API_URL={API_URL}
          onSuccessPayment={handleSuccessPayment}
        />

        {/* 10. Location & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer with 3 Big Action Color Blocks */}
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
