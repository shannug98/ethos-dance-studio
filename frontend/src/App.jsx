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

// Dedicated Page Windows
import TrainerLandingPage from './pages/trainer/TrainerLandingPage';
import TrainerApplicationPage from './pages/trainer/TrainerApplicationPage';
import ApplicationStatusPage from './pages/trainer/ApplicationStatusPage';
import TrainerDashboardPage from './pages/trainer/TrainerDashboardPage';
import TrainerLoginPage from './pages/trainer/TrainerLoginPage';
import ChoreographerDetailPage from './pages/ChoreographerDetailPage';

import { Trophy, LogOut } from 'lucide-react';

const API_URL = 'http://localhost:5152';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('HOME'); // HOME, TRAINER_LANDING, TRAINER_LOGIN, TRAINER_REGISTER, TRAINER_STATUS, TRAINER_DASHBOARD, CHOREOGRAPHER_DETAIL

  // Modals & State
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [studentPortalOpen, setStudentPortalOpen] = useState(false);

  // Choreographer Detail View State
  const [selectedChoreographer, setSelectedChoreographer] = useState(null);

  // Trainer Persistent Login State
  const [loggedInTrainer, setLoggedInTrainer] = useState(() => {
    const saved = localStorage.getItem('ethos_logged_in_trainer');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return null;
  });

  const [activeTrainerId, setActiveTrainerId] = useState(1);

  useEffect(() => {
    const loadEvents = () => {
      const savedAdminEvents = localStorage.getItem('ethos_master_events_catalog');
      let adminCatalog = [];
      if (savedAdminEvents) {
        try { adminCatalog = JSON.parse(savedAdminEvents); } catch {}
      }

      fetch(`${API_URL}/api/events`)
        .then(res => res.json())
        .then(data => {
          const combined = [...data, ...adminCatalog];
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
    window.addEventListener('ethos_events_updated', loadEvents);
    return () => {
      window.removeEventListener('storage', loadEvents);
      window.removeEventListener('ethos_events_updated', loadEvents);
    };
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

  const handleTrainerLoginSuccess = (trainerId, profile) => {
    const trainerObj = profile || { id: trainerId, fullName: 'Shanmuka Gaddam', currentTier: 'Gold', trainerCode: 'ETH-TR-100001' };
    setActiveTrainerId(trainerId || 1);
    setLoggedInTrainer(trainerObj);
    localStorage.setItem('ethos_logged_in_trainer', JSON.stringify(trainerObj));
    setCurrentView('TRAINER_DASHBOARD');
  };

  const handleTrainerLogout = () => {
    setLoggedInTrainer(null);
    localStorage.removeItem('ethos_logged_in_trainer');
    setCurrentView('HOME');
  };

  const handleSelectChoreographer = (teacher) => {
    setSelectedChoreographer(teacher);
    setCurrentView('CHOREOGRAPHER_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans relative overflow-x-hidden">
      
      {/* PERSISTENT LOGGED-IN TRAINER BANNER */}
      {loggedInTrainer && (
        <div className="bg-slate-900 text-white px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-md sticky top-0 z-[250] font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Logged in as Trainer:</span>
            <span className="font-extrabold text-white uppercase">{loggedInTrainer.fullName}</span>
            <span className="px-2 py-0.5 bg-[#0088FF] text-white rounded-full text-[10px] uppercase font-black">
              {loggedInTrainer.currentTier || 'Gold'} Tier
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('TRAINER_DASHBOARD')}
              className="px-3 py-1 bg-[#0088FF] hover:bg-[#0077EE] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" /> Open Trainer Dashboard
            </button>
            <button
              onClick={handleTrainerLogout}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* 1. Global Navigation Header */}
      <Navbar
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onQuickBook={handleSelectItemForBooking}
        onOpenTrainers={() => setCurrentView(currentView === 'TRAINER_LANDING' ? 'HOME' : 'TRAINER_LANDING')}
      />

      {/* 2. DEDICATED PAGE WINDOW VIEWS */}
      {currentView === 'TRAINER_LANDING' && (
        <TrainerLandingPage
          onApply={() => setCurrentView('TRAINER_REGISTER')}
          onCheckStatus={() => setCurrentView('TRAINER_STATUS')}
          onOpenLogin={() => setCurrentView('TRAINER_LOGIN')}
          onOpenDashboard={(id) => {
            setActiveTrainerId(id || 1);
            setCurrentView('TRAINER_DASHBOARD');
          }}
        />
      )}

      {currentView === 'TRAINER_LOGIN' && (
        <TrainerLoginPage
          API_URL={API_URL}
          onBack={() => setCurrentView('TRAINER_LANDING')}
          onSuccessLogin={handleTrainerLoginSuccess}
        />
      )}

      {currentView === 'TRAINER_REGISTER' && (
        <TrainerApplicationPage
          API_URL={API_URL}
          onClose={() => setCurrentView('TRAINER_LANDING')}
          onSuccess={(res) => {
            alert(`🎉 Application Submitted Successfully!\n\nYour Trainer Application Code is: ${res.trainerCode}\n\n📱 A confirmation message with your application details has been dispatched to your WhatsApp number (${res.phone}).`);
            setCurrentView('TRAINER_STATUS');
          }}
        />
      )}

      {currentView === 'TRAINER_STATUS' && (
        <ApplicationStatusPage
          onClose={() => setCurrentView('TRAINER_LANDING')}
          onOpenDashboard={(id) => {
            setActiveTrainerId(id || 1);
            setCurrentView('TRAINER_DASHBOARD');
          }}
        />
      )}

      {currentView === 'TRAINER_DASHBOARD' && (
        <TrainerDashboardPage
          trainerId={activeTrainerId}
          onBrowseWebsite={() => setCurrentView('HOME')}
          onLogout={handleTrainerLogout}
        />
      )}

      {/* CHOREOGRAPHER DETAILS PAGE (FULL PAGE WINDOW) */}
      {currentView === 'CHOREOGRAPHER_DETAIL' && (
        <ChoreographerDetailPage
          instructor={selectedChoreographer}
          onBack={() => setCurrentView('HOME')}
          onBookWorkshop={(instructor) => {
            handleSelectItemForBooking({
              id: 'wrk_inst_' + instructor.id,
              title: instructor.name + ' Masterclass',
              instructor: instructor.name,
              price: 1499
            });
          }}
        />
      )}

      {/* DEFAULT HOME WEBSITE VIEW */}
      {currentView === 'HOME' && (
        <main>
          <HeroSection
            onBookWorkshop={handleSelectItemForBooking}
          />

          <WorkshopsSection
            events={events}
            onSelectEvent={handleSelectItemForBooking}
          />

          <AboutSection />
          
          <InstructorsSection
            onSelectChoreographer={handleSelectChoreographer}
          />
          
          <TestimonialsSection />
          <ContactSection />
        </main>
      )}

      {/* FOOTER */}
      <Footer
        onOpenAdmin={() => setAdminLoginOpen(true)}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onQuickBook={handleSelectItemForBooking}
      />

      {/* FLOATING WHATSAPP CHAT BUTTON */}
      <FloatingWhatsApp />

      {/* ADMIN & BOOKING MODALS */}
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
