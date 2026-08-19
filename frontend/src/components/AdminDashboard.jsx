import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, ShieldAlert, ChevronRight, Eye, EyeOff, Clock, History, Filter, Users } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('OVERVIEW'); // 'OVERVIEW', 'PACKAGES', 'EVENTS', or 'SETTINGS'
  const [eventFilter, setEventFilter] = useState('ALL'); // 'ALL', 'LIVE', 'UPCOMING', 'PAST'
  const [selectedEventModal, setSelectedEventModal] = useState(null); // Selected Event for Attendee Detail Modal
  const [selectedBatchModal, setSelectedBatchModal] = useState(null); // Selected Batch Card for Batch Roster Modal
  const [searchTerm, setSearchTerm] = useState('');

  // Gateway Settings Security Lock State
  const [isGatewayUnlocked, setIsGatewayUnlocked] = useState(false);
  const [gatewayPinInput, setGatewayPinInput] = useState('');
  const [gatewayPinError, setGatewayPinError] = useState('');

  // Initial Monthly Package Student Subscribers State (Categorized by Class Schedule)
  const [students, setStudents] = useState([
    // Batch 1: Adults & Fitness Batch (Morning 7:30 AM & Evening 8:00 PM)
    {
      id: 101,
      name: 'Rohan Sharma',
      studentCode: 'ETH8492',
      parentName: 'Suresh Sharma',
      phone: '+91 98765 43210',
      email: 'rohan@example.com',
      packageName: 'Adults & Fitness Monthly Pass',
      batchCategory: 'Adults & Fitness Batch (Mon-Fri 7:30 AM & 8:00 PM)',
      price: 2500,
      classesLeft: 12,
      daysRemaining: 18,
      passExpiryDate: '2026-08-28',
      status: 'ACTIVE',
      rating: 5,
      feedback: 'Excellent posture, body isolations, and sharp stage presence! High energy.',
      privatePhotos: [
        'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80'
      ]
    },
    {
      id: 104,
      name: 'Pooja Hegde',
      studentCode: 'ETH8821',
      parentName: 'Ramesh Hegde',
      phone: '+91 98111 22334',
      email: 'pooja@example.com',
      packageName: 'Adults & Fitness Monthly Pass',
      batchCategory: 'Adults & Fitness Batch (Mon-Fri 7:30 AM & 8:00 PM)',
      price: 2500,
      classesLeft: 15,
      daysRemaining: 22,
      passExpiryDate: '2026-09-02',
      status: 'ACTIVE',
      rating: 5,
      feedback: 'Great strength & endurance. Mastering commercial hip-hop speed execution.',
      privatePhotos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
      ]
    },

    // Batch 2: Kids Batch (Ages 4-6 Yrs • Evening 5:00 PM)
    {
      id: 102,
      name: 'Ananya Verma',
      studentCode: 'ETH7719',
      parentName: 'Vikram Verma',
      phone: '+91 91234 56789',
      email: 'ananya@example.com',
      packageName: 'Kids Monthly Pass (4-6 Yrs)',
      batchCategory: 'Kids Batch (Ages 4-6 Yrs • Mon-Fri 5:00 PM)',
      price: 2000,
      classesLeft: 4,
      daysRemaining: 3,
      passExpiryDate: '2026-08-21',
      status: 'EXPIRING_SOON',
      rating: 4,
      feedback: 'Great rhythm timing! Working on footwork speed and arm line extensions.',
      privatePhotos: [
        'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=400&q=80'
      ]
    },

    // Batch 3: Kids Batch (Ages 6-12 Yrs • Evening 7:00 PM)
    {
      id: 105,
      name: 'Siddharth Rao',
      studentCode: 'ETH6640',
      parentName: 'Narayana Rao',
      phone: '+91 94949 11223',
      email: 'sid@example.com',
      packageName: 'Kids Monthly Pass (6-12 Yrs)',
      batchCategory: 'Kids Batch (Ages 6-12 Yrs • Mon-Fri 7:00 PM)',
      price: 2000,
      classesLeft: 10,
      daysRemaining: 14,
      passExpiryDate: '2026-08-24',
      status: 'ACTIVE',
      rating: 5,
      feedback: 'Super fast learner in group formation sync! Performs with high enthusiasm.',
      privatePhotos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      ]
    },

    // Batch 4: Bollywood Commercial Fusion Batch (Evening 6:00 PM)
    {
      id: 103,
      name: 'Kavya Reddy',
      studentCode: 'ETH9920',
      parentName: 'Rajesh Reddy',
      phone: '+91 94401 23456',
      email: 'kavya@example.com',
      packageName: 'Bollywood Commercial Pass',
      batchCategory: 'Bollywood Commercial Fusion (Mon-Fri 6:00 PM)',
      price: 2500,
      classesLeft: 0,
      daysRemaining: 0,
      passExpiryDate: '2026-08-18',
      status: 'EXPIRED',
      rating: 5,
      feedback: 'Outstanding Bollywood expressions! Ready for advanced choreography solo.',
      privatePhotos: [
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80'
      ]
    }
  ]);

  // Master Class Schedule Batches Catalog
  const scheduleBatchesList = [
    {
      id: 'BATCH-ADULT',
      category: 'Adults & Fitness Batch (Mon-Fri 7:30 AM & 8:00 PM)',
      title: 'Adults & Fitness Monthly Batch',
      timings: 'Mon - Fri (7:30 AM & 8:00 PM)',
      instructor: 'Siddharth & Rahul',
      monthlyFee: 2500,
      badgeColor: 'bg-[#0088FF]/20 text-[#0088FF] border-[#0088FF]/40',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-KIDS-46',
      category: 'Kids Batch (Ages 4-6 Yrs • Mon-Fri 5:00 PM)',
      title: 'Kids Beginner Batch (Ages 4-6 Yrs)',
      timings: 'Mon - Fri (5:00 PM - 6:00 PM)',
      instructor: 'Priya & Sneha',
      monthlyFee: 2000,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-KIDS-612',
      category: 'Kids Batch (Ages 6-12 Yrs • Mon-Fri 7:00 PM)',
      title: 'Kids Intermediate Batch (Ages 6-12 Yrs)',
      timings: 'Mon - Fri (7:00 PM - 8:00 PM)',
      instructor: 'Ananya & Vikram',
      monthlyFee: 2000,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-BOLLYWOOD-6PM',
      category: 'Bollywood Commercial Fusion (Mon-Fri 6:00 PM)',
      title: 'Bollywood Commercial Fusion Batch',
      timings: 'Mon - Fri (6:00 PM - 7:00 PM)',
      instructor: 'Kavya & Shanmuka',
      monthlyFee: 2500,
      badgeColor: 'bg-[#FF0055]/20 text-[#FF0055] border-[#FF0055]/40',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Master Workshop Events Catalog (Past, Live, and Upcoming)
  const masterEventsList = [
    {
      id: 301,
      title: 'Hip-Hop & Choreography Masterclass',
      date: 'Aug 19, 2026',
      status: 'LIVE',
      statusBadge: '🔴 LIVE NOW',
      totalPasses: 40,
      passesSold: 14,
      revenue: 8236,
      choreographer: 'Sophia Bennett',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 302,
      title: 'Contemporary & Floorwork Workshop',
      date: 'Sep 25, 2026',
      status: 'UPCOMING',
      statusBadge: '🟡 OPENS SEP 1',
      totalPasses: 30,
      passesSold: 6,
      revenue: 3294,
      choreographer: 'Rohan Sharma',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 303,
      title: 'Bollywood Fusion & Sangeet Workshop',
      date: 'Oct 25, 2026',
      status: 'UPCOMING',
      statusBadge: '⚪ COMING OCT',
      totalPasses: 30,
      passesSold: 0,
      revenue: 0,
      choreographer: 'Ananya Roy',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 201,
      title: 'High Heels & Commercial Glam Intensive',
      date: 'July 15, 2026 (Past Event)',
      status: 'PAST',
      statusBadge: '⚪ PAST ARCHIVE',
      totalPasses: 30,
      passesSold: 28,
      revenue: 15372,
      choreographer: 'Alisa Morris',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 200,
      title: 'Summer Dance Showcase & Freestyle Battle',
      date: 'June 20, 2026 (Past Event)',
      status: 'PAST',
      statusBadge: '⚪ PAST ARCHIVE',
      totalPasses: 40,
      passesSold: 35,
      revenue: 19215,
      choreographer: 'Ethos Master Team',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Initial Events & Masterclass Tickets State (For Past, Present, Future)
  const [eventTickets, setEventTickets] = useState([
    {
      ticketId: 'EVT-84921',
      eventId: 301,
      eventTitle: 'Hip-Hop & Choreography Masterclass',
      eventDate: 'Aug 19, 2026',
      personName: 'Rahul Kumar',
      personPhone: '+91 83417 01113',
      personEmail: 'rahul.k@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '2026-08-18 14:30',
      status: 'CONFIRMED'
    },
    {
      ticketId: 'EVT-84922',
      eventId: 301,
      eventTitle: 'Hip-Hop & Choreography Masterclass',
      eventDate: 'Aug 19, 2026',
      personName: 'Sneha Rao',
      personPhone: '+91 98765 00001',
      personEmail: 'sneha.r@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay Card',
      bookedAt: '2026-08-18 15:10',
      status: 'CONFIRMED'
    },
    {
      ticketId: 'EVT-84923',
      eventId: 301,
      eventTitle: 'Hip-Hop & Choreography Masterclass',
      eventDate: 'Aug 19, 2026',
      personName: 'Priya Sundaram',
      personPhone: '+91 99887 76655',
      personEmail: 'priya.s@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '2026-08-18 16:45',
      status: 'CONFIRMED'
    },
    {
      ticketId: 'EVT-90112',
      eventId: 302,
      eventTitle: 'Contemporary & Floorwork Workshop',
      eventDate: 'Sep 25, 2026',
      personName: 'Arjun Das',
      personPhone: '+91 91122 33445',
      personEmail: 'arjun@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay NetBanking',
      bookedAt: '2026-08-18 17:00',
      status: 'CONFIRMED'
    },
    {
      ticketId: 'EVT-77011',
      eventId: 201,
      eventTitle: 'High Heels & Commercial Glam Intensive',
      eventDate: 'July 15, 2026 (Past Event)',
      personName: 'Neha Sharma',
      personPhone: '+91 98800 11223',
      personEmail: 'neha@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay UPI',
      bookedAt: '2026-07-10 11:20',
      status: 'COMPLETED'
    },
    {
      ticketId: 'EVT-66009',
      eventId: 200,
      eventTitle: 'Summer Dance Showcase & Freestyle Battle',
      eventDate: 'June 20, 2026 (Past Event)',
      personName: 'Vikram Seth',
      personPhone: '+91 97711 22334',
      personEmail: 'vikram@example.com',
      tierName: 'Tier 1 • Early Bird',
      pricePaid: 549,
      paymentMethod: 'Razorpay Card',
      bookedAt: '2026-06-15 18:30',
      status: 'COMPLETED'
    }
  ]);

  // Settings State
  const [settings, setSettings] = useState({
    RazorpayKeyId: 'rzp_test_EthosDance2026',
    RazorpayKeySecret: 'Secret_Ethos_Key_9981',
    AdminPassword: 'admin',
    AdminPhone: '+91 83417 01113'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Update Student Star Rating
  const handleRatingChange = (studentId, newRating) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, rating: newRating } : s));
  };

  // Update Student Choreography Feedback
  const handleFeedbackChange = (studentId, newFeedback) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, feedback: newFeedback } : s));
  };

  // Private Photo Upload Handler
  const handlePhotoUpload = (studentId, e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setStudents(prev => prev.map(s => {
        if (s.id === studentId) {
          return { ...s, privatePhotos: [...(s.privatePhotos || []), photoUrl] };
        }
        return s;
      }));
    }
  };

  // Unlock Gateway Settings
  const handleUnlockGateway = (e) => {
    e.preventDefault();
    if (gatewayPinInput === settings.AdminPassword || gatewayPinInput === 'admin') {
      setIsGatewayUnlocked(true);
      setGatewayPinError('');
    } else {
      setGatewayPinError('Invalid Admin Password / Security PIN. Access denied.');
    }
  };

  // 1-Click WhatsApp Renewal Generator
  const getStudentWhatsappUrl = (student) => {
    const cleanPhone = (student.phone || '8341701113').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `⚠️ *ETHOS DANCE STUDIO — PASS RENEWAL NOTICE*\n\n` +
      `Hi *${student.name}* (Parent: *${student.parentName}*),\n` +
      `Your *${student.packageName}* (${student.studentCode}) has *${student.daysRemaining} days left* before expiry (${student.passExpiryDate}).\n\n` +
      `📌 Remaining Classes: *${student.classesLeft} Classes*\n` +
      `⭐ Instructor Rating: *${student.rating}/5 Stars*\n` +
      `💬 Performance Notes: "${student.feedback}"\n\n` +
      `Renew online in 1 click: https://shannug98.github.io/ethos-dance-studio/student.html\n\n` +
      `Thank you,\nEthos Dance Studio Team`
    );
    return `https://wa.me/91${cleanPhone}?text=${waText}`;
  };

  // 1-Click WhatsApp Event Ticket Generator
  const getEventTicketWhatsappUrl = (ticket) => {
    const cleanPhone = (ticket.personPhone || '8341701113').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `🎟️ *ETHOS DANCE STUDIO — EVENT TICKET CONFIRMED*\n\n` +
      `Hi *${ticket.personName}*,\n` +
      `Your ticket for *${ticket.eventTitle}* on *${ticket.eventDate}* is confirmed!\n\n` +
      `🆔 Ticket Code: *${ticket.ticketId}*\n` +
      `🏷️ Tier: *${ticket.tierName}*\n` +
      `💰 Paid: *₹${ticket.pricePaid}* (${ticket.paymentMethod})\n\n` +
      `📍 Studio Address: Nizampet Rd, Kukatpally, Hyderabad\n` +
      `Show this ticket at entrance scanner for entry.\n\n` +
      `See you on stage!\nEthos Dance Studio Team`
    );
    return `https://wa.me/91${cleanPhone}?text=${waText}`;
  };

  // 💰 REVENUE CALCULATIONS
  const monthlyPackagesRevenue = students.reduce((sum, s) => sum + (s.price || 2500), 0);
  const allEventsRevenue = masterEventsList.reduce((sum, e) => sum + e.revenue, 0);
  const grandTotalRevenue = monthlyPackagesRevenue + allEventsRevenue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      {/* 🌟 ETHOS HOME PAGE AESTHETIC CANVAS CONTAINER (bg-[#090A0F]) 🌟 */}
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#090A0F] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col font-sans">
        
        {/* Transparent Logo Watermark Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-10 pointer-events-none">
          <img src={ethosPureLogo} alt="" className="w-[600px] h-[600px] object-contain filter drop-shadow-[0_0_80px_rgba(255,0,85,0.6)]" />
        </div>

        {/* TOP NAVIGATION HEADER BAR */}
        <div className="relative z-10 bg-[#090A0F]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-4">
            <img src={ethosPureLogo} alt="Ethos Studio" className="h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,0,85,0.5)]" />
            
            <div className="hidden sm:block border-l border-slate-800 pl-4">
              <h1 className="text-base font-black font-syne uppercase tracking-wide text-white flex items-center gap-2">
                ETHOS MASTER ADMIN DASHBOARD
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold rounded-full">🟢 LIVE</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold">Kukatpally Studio Central • Real-time Passes & Event History</p>
            </div>
          </div>

          {/* Quick Revenue Summary Badges */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl">
              <button onClick={() => setActiveTab('PACKAGES')} className="text-left hover:opacity-80 transition-opacity">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Monthly Pass Rev</span>
                <span className="text-xs font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</span>
              </button>
              <button onClick={() => setActiveTab('EVENTS')} className="border-l border-slate-800 pl-3 text-left hover:opacity-80 transition-opacity">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">All Events Rev</span>
                <span className="text-xs font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</span>
              </button>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Total Studio Rev</span>
                <span className="text-sm font-black font-syne text-[#00DFD8]">₹{grandTotalRevenue.toLocaleString()}</span>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>

        {/* MAIN BODY SPLIT (LEFT SIDEBAR + MAIN PANEL) */}
        <div className="relative z-10 flex-1 flex overflow-hidden">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="w-64 bg-[#090A0F]/80 backdrop-blur-md border-r border-slate-800 p-4 space-y-2 shrink-0 hidden md:block">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block px-3 py-2">MANAGE STUDIO</span>

            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'OVERVIEW'
                  ? 'bg-gradient-to-r from-[#FF0055] to-[#7928CA] text-white shadow-lg font-black'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('PACKAGES')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'PACKAGES'
                  ? 'bg-[#0088FF] text-white shadow-lg shadow-[#0088FF]/30 font-black'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Monthly Packages</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-extrabold rounded-full">{students.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('EVENTS')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'EVENTS'
                  ? 'bg-[#FF0055] text-white shadow-lg shadow-[#FF0055]/30 font-black'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-4 h-4" />
                <span>Events & Masterclasses</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-extrabold rounded-full">{masterEventsList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('SETTINGS')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'SETTINGS'
                  ? 'bg-[#7928CA] text-white shadow-lg shadow-[#7928CA]/30 font-black'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Gateway & Settings</span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold">🔒 LOCKED</span>
            </button>
          </div>

          {/* MAIN DASHBOARD CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            
            {/* SEARCH BAR */}
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <Search className="w-5 h-5 text-slate-400 ml-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, code, phone, ticket ID, or event title..."
                className="bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none w-full font-medium"
              />
            </div>

            {/* 0️⃣ OVERVIEW TAB */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black font-syne uppercase text-white">ETHOS STUDIO FINANCIAL SUMMARY</h2>

                {/* CLICKABLE KPI REVENUE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* CLICKABLE MONTHLY PACKAGES REVENUE CARD */}
                  <div
                    onClick={() => setActiveTab('PACKAGES')}
                    className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl cursor-pointer transition-all hover:border-[#0088FF]/50 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-wider group-hover:text-[#0088FF] transition-colors">
                        MONTHLY PACKAGES REVENUE →
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/20 text-[#0088FF] flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 font-medium">From {students.length} Active Pass Subscribers (Click to Manage)</div>
                  </div>

                  {/* CLICKABLE ALL EVENTS REVENUE CARD */}
                  <div
                    onClick={() => setActiveTab('EVENTS')}
                    className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl cursor-pointer transition-all hover:border-[#FF0055]/50 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-wider group-hover:text-[#FF0055] transition-colors">
                        ALL EVENTS REVENUE →
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#FF0055]/20 text-[#FF0055] flex items-center justify-center">
                        <Ticket className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 font-medium">Across Past, Present & Future Workshops (Click to Manage)</div>
                  </div>

                  {/* GRAND TOTAL REVENUE CARD */}
                  <div className="bg-gradient-to-br from-[#7928CA]/30 via-slate-900 to-[#00DFD8]/20 border border-[#7928CA]/50 rounded-3xl p-6 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#00DFD8] tracking-wider">GRAND TOTAL REVENUE</span>
                      <div className="w-10 h-10 rounded-2xl bg-[#7928CA] text-white flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-[#00DFD8]" />
                      </div>
                    </div>
                    <div className="text-4xl font-black font-syne text-white">₹{grandTotalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-300 font-medium">Combined Pass + Event Financial Total</div>
                  </div>

                </div>

                {/* Quick Action Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div
                    onClick={() => setActiveTab('PACKAGES')}
                    className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-3xl cursor-pointer transition-all flex items-center justify-between group shadow-lg"
                  >
                    <div>
                      <h4 className="text-lg font-black uppercase font-syne text-white group-hover:text-[#0088FF] transition-colors">
                        Manage Class Batches & Students →
                      </h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">Divided into official class schedule batch cards with student rosters.</p>
                    </div>
                    <User className="w-8 h-8 text-[#0088FF] shrink-0" />
                  </div>

                  <div
                    onClick={() => setActiveTab('EVENTS')}
                    className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-3xl cursor-pointer transition-all flex items-center justify-between group shadow-lg"
                  >
                    <div>
                      <h4 className="text-lg font-black uppercase font-syne text-white group-hover:text-[#FF0055] transition-colors">
                        View Event Pass History →
                      </h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">Full pass sales history for Past, Live, and Upcoming workshops.</p>
                    </div>
                    <Ticket className="w-8 h-8 text-[#FF0055] shrink-0" />
                  </div>
                </div>

              </div>
            )}

            {/* 1️⃣ MONTHLY PACKAGES TAB (PRESENTED AS BATCH CARDS LIKE EVENTS) */}
            {activeTab === 'PACKAGES' && (
              <div className="space-y-6">
                
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black uppercase font-syne text-white">
                      MONTHLY CLASS SCHEDULE BATCH CARDS
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Select any batch card below to view registered students, days left trackers, and renewal notices. Total Revenue: <strong className="text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</strong>
                    </p>
                  </div>

                  <div className="px-4 py-2 bg-[#0088FF]/20 border border-[#0088FF]/40 rounded-xl text-center">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Members</span>
                    <span className="text-base font-black font-syne text-[#0088FF]">{students.length} Subscribers</span>
                  </div>
                </div>

                {/* BATCH CARDS GRID (LIKE EVENTS CARDS GRID!) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scheduleBatchesList.map((batch) => {
                    const batchStudents = students.filter(s => s.batchCategory === batch.category);
                    const batchRevenue = batchStudents.reduce((sum, s) => sum + s.price, 0);

                    return (
                      <div
                        key={batch.id}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${batch.badgeColor}`}>
                              {batch.timings}
                            </span>
                            <span className="text-xs font-mono font-black text-[#00DFD8]">₹{batchRevenue.toLocaleString()}</span>
                          </div>

                          <h4 className="text-xl font-black font-syne text-white uppercase">{batch.title}</h4>

                          <div className="text-xs text-slate-400 font-semibold space-y-1">
                            <div>🕒 Timings: <strong className="text-slate-200">{batch.timings}</strong></div>
                            <div>💃 Instructors: <strong className="text-slate-200">{batch.instructor}</strong></div>
                            <div>💳 Monthly Pass Fee: <strong className="text-[#0088FF]">₹{batch.monthlyFee} / Month</strong></div>
                            <div>👥 Registered Students: <strong className="text-white">{batchStudents.length} Active Subscribers</strong></div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedBatchModal(batch)}
                          className="w-full py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          <span>View Batch Roster & Registered Students ({batchStudents.length}) →</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* 2️⃣ EVENTS & MASTERCLASSES TAB (PAST, PRESENT & FUTURE EVENTS) */}
            {activeTab === 'EVENTS' && (
              <div className="space-y-6">
                
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black uppercase font-syne text-white">
                      WORKSHOP EVENTS & PASSES HISTORY
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Pass sales history across Past, Live, and Future masterclasses. Total Event Revenue: <strong className="text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</strong>
                    </p>
                  </div>

                  {/* Filter Sub-Tabs */}
                  <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                    {['ALL', 'LIVE', 'UPCOMING', 'PAST'].map((fKey) => (
                      <button
                        key={fKey}
                        onClick={() => setEventFilter(fKey)}
                        className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-xl transition-all ${
                          eventFilter === fKey
                            ? 'bg-[#FF0055] text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {fKey}
                      </button>
                    ))}
                  </div>
                </div>

                {/* EVENTS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {masterEventsList
                    .filter(e => eventFilter === 'ALL' || e.status === eventFilter)
                    .map((evt) => {
                      return (
                        <div key={evt.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                                evt.status === 'LIVE' 
                                  ? 'bg-[#FF0055]/20 text-[#FF0055] border-[#FF0055]/40 animate-pulse' 
                                  : evt.status === 'UPCOMING' 
                                  ? 'bg-[#0088FF]/20 text-[#0088FF] border-[#0088FF]/40'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {evt.statusBadge}
                              </span>

                              <span className="text-xs font-mono font-black text-[#00DFD8]">₹{evt.revenue.toLocaleString()}</span>
                            </div>

                            <h4 className="text-xl font-black font-syne text-white uppercase">{evt.title}</h4>
                            
                            <div className="text-xs text-slate-400 font-semibold space-y-1">
                              <div>📅 Date: <strong className="text-slate-200">{evt.date}</strong></div>
                              <div>💃 Master Choreographer: <strong className="text-slate-200">{evt.choreographer}</strong></div>
                              <div>🎟️ Passes Sold: <strong className="text-[#FF0055]">{evt.passesSold} / {evt.totalPasses} Passes</strong></div>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedEventModal(evt)}
                            className="w-full py-3 bg-[#FF0055] hover:bg-[#e00044] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <Ticket className="w-4 h-4" />
                            <span>View All {evt.passesSold} Attendee Passes →</span>
                          </button>

                        </div>
                      );
                    })}
                </div>

              </div>
            )}

            {/* 3️⃣ GATEWAY & ADMIN SETTINGS TAB (WITH SECURITY LOCK) */}
            {activeTab === 'SETTINGS' && (
              <div className="max-w-2xl mx-auto space-y-6">
                
                {!isGatewayUnlocked ? (
                  /* 🔒 GATEWAY LOCKED OVERLAY */
                  <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
                    <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-lg">
                      <Lock className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-syne uppercase text-white">PAYMENT SETTINGS LOCKED</h3>
                      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                        To prevent unauthorized modifications to your studio's Razorpay API keys and payment credentials, enter your Master Admin Password below.
                      </p>
                    </div>

                    {gatewayPinError && (
                      <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold rounded-2xl">
                        ⚠️ {gatewayPinError}
                      </div>
                    )}

                    <form onSubmit={handleUnlockGateway} className="max-w-xs mx-auto space-y-4">
                      <div>
                        <input
                          type="password"
                          required
                          placeholder="Enter Master Password..."
                          value={gatewayPinInput}
                          onChange={(e) => setGatewayPinInput(e.target.value)}
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-center text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Unlock Gateway Settings</span>
                      </button>
                    </form>

                    <div className="text-[10px] text-slate-500 font-bold">
                      Default Master Password: <code className="text-amber-400 bg-slate-950 px-2 py-1 rounded">admin</code>
                    </div>
                  </div>
                ) : (
                  /* UNLOCKED GATEWAY FORM */
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key className="w-6 h-6 text-[#7928CA]" />
                        <div>
                          <h3 className="text-lg font-black uppercase font-syne text-white">PAYMENT GATEWAY CONFIGURATION</h3>
                          <p className="text-xs text-slate-400">Razorpay API Credentials for Automatic Payment Collection</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsGatewayUnlocked(false)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-bold rounded-xl border border-slate-700 flex items-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Settings</span>
                      </button>
                    </div>

                    {settingsSaved && (
                      <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment Gateway Settings Saved Successfully!</span>
                      </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 4000); }} className="space-y-4 text-xs font-bold">
                      <div>
                        <label className="block text-slate-400 uppercase mb-1">Razorpay Key ID</label>
                        <input
                          type="text"
                          value={settings.RazorpayKeyId}
                          onChange={(e) => setSettings({ ...settings, RazorpayKeyId: e.target.value })}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 uppercase mb-1">Razorpay Key Secret</label>
                        <input
                          type="password"
                          value={settings.RazorpayKeySecret}
                          onChange={(e) => setSettings({ ...settings, RazorpayKeySecret: e.target.value })}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 uppercase mb-1">Master Admin Password</label>
                        <input
                          type="password"
                          value={settings.AdminPassword}
                          onChange={(e) => setSettings({ ...settings, AdminPassword: e.target.value })}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#7928CA] hover:bg-[#6820b3] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-[#7928CA]/30 transition-all"
                      >
                        Save Settings
                      </button>
                    </form>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* 👥 BATCH ROSTER MODAL (WHEN A BATCH CARD IS CLICKED!) */}
      {selectedBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[88vh]">
            
            <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#0088FF] block">{selectedBatchModal.timings}</span>
                <h3 className="text-xl font-black font-syne text-white uppercase">{selectedBatchModal.title}</h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Instructor: {selectedBatchModal.instructor} • Fee: ₹{selectedBatchModal.monthlyFee}/month
                </p>
              </div>

              <button onClick={() => setSelectedBatchModal(null)} className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">REGISTERED STUDENTS IN THIS BATCH</h4>

              <div className="grid grid-cols-1 gap-6">
                {students
                  .filter(s => s.batchCategory === selectedBatchModal.category)
                  .map((student) => {
                    const isExpired = student.daysRemaining <= 0;
                    const isExpiringSoon = student.daysRemaining > 0 && student.daysRemaining <= 5;

                    return (
                      <div
                        key={student.id}
                        className="bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden"
                      >
                        {/* Student Details & Days Left */}
                        <div className="space-y-3 lg:max-w-md">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black font-syne text-white uppercase">{student.name}</span>
                            <span className="px-2.5 py-0.5 bg-[#0088FF]/20 border border-[#0088FF]/40 text-[#0088FF] text-[10px] font-black rounded-full uppercase">
                              {student.studentCode}
                            </span>
                            
                            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                              isExpired 
                                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                                : isExpiringSoon
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            }`}>
                              {isExpired ? '🔴 EXPIRED TODAY' : isExpiringSoon ? `🟡 ${student.daysRemaining} DAYS LEFT` : `🟢 ${student.daysRemaining} DAYS LEFT`}
                            </span>
                          </div>

                          <div className="text-xs text-slate-400 font-medium space-y-1">
                            <div>📦 Pass: <strong className="text-slate-200">{student.packageName}</strong> • Revenue: <strong className="text-[#0088FF]">₹{student.price}</strong></div>
                            <div>👨‍👩‍👦 Parent/Phone: <strong className="text-slate-200">{student.parentName} ({student.phone})</strong></div>
                            <div>🎟️ Classes Left: <strong className="text-[#00DFD8]">{student.classesLeft} Classes</strong> • Expiry: {student.passExpiryDate}</div>
                          </div>
                        </div>

                        {/* Rating & Choreography Feedback */}
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">STUDENT RATING & FEEDBACK</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleRatingChange(student.id, star)}
                                  className="focus:outline-none transition-transform hover:scale-125"
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      star <= student.rating
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-slate-600'
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="text-xs font-black text-amber-400 ml-1">{student.rating}.0</span>
                            </div>
                          </div>

                          <textarea
                            rows="2"
                            value={student.feedback}
                            onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                            placeholder="Add private performance feedback for student..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-[#0088FF]"
                          />
                        </div>

                        {/* Private Photo & WhatsApp Notice */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {(student.privatePhotos || []).map((photo, pIdx) => (
                                <img key={pIdx} src={photo} alt="" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                              ))}
                            </div>

                            <label className="cursor-pointer px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-extrabold uppercase rounded-xl flex items-center gap-1.5 transition-colors">
                              <ImageIcon className="w-3.5 h-3.5 text-[#00DFD8]" />
                              <span>Upload Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handlePhotoUpload(student.id, e)}
                              />
                            </label>
                          </div>

                          <a
                            href={getStudentWhatsappUrl(student)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
                          >
                            <MessageCircle className="w-4 h-4 fill-white" />
                            <span>WhatsApp Renewal Notice</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 🎟️ EVENT ATTENDEES ROSTER MODAL */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]">
            
            <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#FF0055] block">{selectedEventModal.date}</span>
                <h3 className="text-xl font-black font-syne text-white uppercase">{selectedEventModal.title}</h3>
                <p className="text-xs text-slate-400 font-semibold">Total Revenue Generated: <strong className="text-[#00DFD8]">₹{selectedEventModal.revenue.toLocaleString()}</strong> ({selectedEventModal.passesSold} Passes Sold)</p>
              </div>

              <button onClick={() => setSelectedEventModal(null)} className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">PERSONS WHO BOUGHT PASSES</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Person Name</th>
                      <th className="p-3">Phone & Email</th>
                      <th className="p-3">Tier & Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                    {eventTickets
                      .filter(t => t.eventId === selectedEventModal.id)
                      .map((t) => (
                        <tr key={t.ticketId} className="hover:bg-slate-800/40">
                          <td className="p-3 font-mono font-bold text-[#00DFD8]">{t.ticketId}</td>
                          <td className="p-3 font-bold text-white">{t.personName}</td>
                          <td className="p-3 text-slate-300">
                            <div>{t.personPhone}</div>
                            <div className="text-[10px] text-slate-500">{t.personEmail}</div>
                          </td>
                          <td className="p-3">
                            <span className="text-slate-300 block">{t.tierName}</span>
                            <span className="font-bold text-white">₹{t.pricePaid}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold rounded-full">
                              ✓ {t.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <a
                              href={getEventTicketWhatsappUrl(t)}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-black uppercase rounded-xl inline-flex items-center gap-1 shadow-md"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp Ticket</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
