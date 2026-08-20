import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, ShieldAlert, ChevronRight, Eye, EyeOff, Clock, History, Filter, Users, PlusCircle, MapPin, Sparkles } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('OVERVIEW'); // 'OVERVIEW', 'PACKAGES', 'EVENTS', 'CREATE_EVENT', or 'SETTINGS'
  const [eventFilter, setEventFilter] = useState('ALL'); // 'ALL', 'LIVE', 'UPCOMING', 'PAST'
  const [selectedEventModal, setSelectedEventModal] = useState(null); // Selected Event for Attendee Detail Modal
  const [selectedBatchModal, setSelectedBatchModal] = useState(null); // Selected Batch Card for Batch Roster Modal
  const [searchTerm, setSearchTerm] = useState('');

  // Gateway Settings Security Lock State
  const [isGatewayUnlocked, setIsGatewayUnlocked] = useState(false);
  const [gatewayPinInput, setGatewayPinInput] = useState('');
  const [gatewayPinError, setGatewayPinError] = useState('');

  // + Create New Event Form State
  const [eventCreatedNotice, setEventCreatedNotice] = useState(false);

  // Initial Monthly Package Student Subscribers State
  const [students, setStudents] = useState([
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
      badgeColor: 'bg-[#0088FF]/15 text-[#0088FF] border-[#0088FF]/30',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-KIDS-46',
      category: 'Kids Batch (Ages 4-6 Yrs • Mon-Fri 5:00 PM)',
      title: 'Kids Beginner Batch (Ages 4-6 Yrs)',
      timings: 'Mon - Fri (5:00 PM - 6:00 PM)',
      instructor: 'Priya & Sneha',
      monthlyFee: 2000,
      badgeColor: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-KIDS-612',
      category: 'Kids Batch (Ages 6-12 Yrs • Mon-Fri 7:00 PM)',
      title: 'Kids Intermediate Batch (Ages 6-12 Yrs)',
      timings: 'Mon - Fri (7:00 PM - 8:00 PM)',
      instructor: 'Ananya & Vikram',
      monthlyFee: 2000,
      badgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'BATCH-BOLLYWOOD-6PM',
      category: 'Bollywood Commercial Fusion (Mon-Fri 6:00 PM)',
      title: 'Bollywood Commercial Fusion Batch',
      timings: 'Mon - Fri (6:00 PM - 7:00 PM)',
      instructor: 'Kavya & Shanmuka',
      monthlyFee: 2500,
      badgeColor: 'bg-[#FF0055]/15 text-[#FF0055] border-[#FF0055]/30',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Master Workshop Events Catalog
  const [masterEventsList, setMasterEventsList] = useState(() => {
    const saved = localStorage.getItem('ethos_master_events_catalog');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 301,
        title: 'Hip-Hop & Choreography Masterclass',
        date: 'Aug 19, 2026',
        time: '5:00 PM - 8:00 PM',
        location: 'Ethos Studio Kukatpally',
        status: 'LIVE',
        statusBadge: '🔴 LIVE NOW',
        totalPasses: 40,
        passesSold: 14,
        revenue: 8236,
        choreographer: 'Sophia Bennett',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
        desc: 'World Dance Day Masterclass with speed isolations and stage performance.'
      },
      {
        id: 302,
        title: 'Contemporary & Floorwork Workshop',
        date: 'Sep 25, 2026',
        time: '6:00 PM - 9:00 PM',
        location: 'Ethos Studio Kukatpally',
        status: 'UPCOMING',
        statusBadge: '🟡 OPENS SEP 1',
        totalPasses: 30,
        passesSold: 6,
        revenue: 3294,
        choreographer: 'Rohan Sharma',
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
        desc: 'Fluid floorwork transitions and expressive physical storytelling.'
      },
      {
        id: 303,
        title: 'Bollywood Fusion & Sangeet Workshop',
        date: 'Oct 25, 2026',
        time: '4:00 PM - 7:00 PM',
        location: 'Ethos Main Hall',
        status: 'UPCOMING',
        statusBadge: '⚪ COMING OCT',
        totalPasses: 30,
        passesSold: 0,
        revenue: 0,
        choreographer: 'Ananya Roy',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        desc: 'Commercial sangeet routines with high energy wedding choreography.'
      },
      {
        id: 201,
        title: 'High Heels & Commercial Glam Intensive',
        date: 'July 15, 2026 (Past Event)',
        time: '5:00 PM - 8:00 PM',
        location: 'Ethos Main Hall',
        status: 'PAST',
        statusBadge: '⚪ PAST ARCHIVE',
        totalPasses: 30,
        passesSold: 28,
        revenue: 15372,
        choreographer: 'Alisa Morris',
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
        desc: 'Sensual lines and commercial high heels choreography.'
      },
      {
        id: 200,
        title: 'Summer Dance Showcase & Freestyle Battle',
        date: 'June 20, 2026 (Past Event)',
        time: '6:00 PM - 10:00 PM',
        location: 'Ethos Outdoor Arena',
        status: 'PAST',
        statusBadge: '⚪ PAST ARCHIVE',
        totalPasses: 40,
        passesSold: 35,
        revenue: 19215,
        choreographer: 'Ethos Master Team',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        desc: 'Annual summer battle and stage performance showcase.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ethos_master_events_catalog', JSON.stringify(masterEventsList));
  }, [masterEventsList]);

  // Initial Events & Masterclass Tickets State
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
    }
  ]);

  const [newEventForm, setNewEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Ethos Studio, Nizampet Rd, Kukatpally, Hyderabad',
    choreographer: '',
    price: 549,
    tier1Price: 549,
    tier2Price: 649,
    tier3Price: 749,
    tier4Price: 799,
    totalPasses: 40,
    desc: '',
    posterUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    showOnEventsPage: true,
    showOnGalleryPage: true,
    showOnPassesPage: true
  });

  // Settings State
  const [settings, setSettings] = useState({
    RazorpayKeyId: 'rzp_test_EthosDance2026',
    RazorpayKeySecret: 'Secret_Ethos_Key_9981',
    AdminPassword: 'admin',
    AdminPhone: '+91 83417 01113'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Handle + Create New Event Submit Form
  const handleCreateEventSubmit = (e) => {
    e.preventDefault();

    const createdEvent = {
      id: Date.now(),
      title: newEventForm.title,
      date: newEventForm.date,
      time: newEventForm.time || '5:00 PM - 8:00 PM',
      location: newEventForm.location,
      status: 'LIVE',
      statusBadge: '🔴 LIVE NOW',
      totalPasses: Number(newEventForm.totalPasses) || 40,
      passesSold: 0,
      revenue: 0,
      price: Number(newEventForm.tier1Price) || 549,
      tier1Price: Number(newEventForm.tier1Price) || 549,
      tier2Price: Number(newEventForm.tier2Price) || 649,
      tier3Price: Number(newEventForm.tier3Price) || 749,
      tier4Price: Number(newEventForm.tier4Price) || 799,
      choreographer: newEventForm.choreographer || 'Ethos Master Instructor',
      image: newEventForm.posterUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      desc: newEventForm.desc
    };

    setMasterEventsList(prev => [createdEvent, ...prev]);
    setEventCreatedNotice(true);
    setTimeout(() => setEventCreatedNotice(false), 5000);

    setNewEventForm({
      title: '',
      date: '',
      time: '',
      location: 'Ethos Studio, Nizampet Rd, Kukatpally, Hyderabad',
      choreographer: '',
      price: 549,
      tier1Price: 549,
      tier2Price: 649,
      tier3Price: 749,
      tier4Price: 799,
      totalPasses: 40,
      desc: '',
      posterUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      showOnEventsPage: true,
      showOnGalleryPage: true,
      showOnPassesPage: true
    });

    setActiveTab('EVENTS');
  };

  // Handle Poster Upload in Form
  const handlePosterFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setNewEventForm({ ...newEventForm, posterUrl: photoUrl });
    }
  };

  // Update Student Rating & Notes
  const handleRatingChange = (studentId, newRating) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, rating: newRating } : s));
  };

  const handleFeedbackChange = (studentId, newFeedback) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, feedback: newFeedback } : s));
  };

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

  const handleUnlockGateway = (e) => {
    e.preventDefault();
    if (gatewayPinInput === settings.AdminPassword || gatewayPinInput === 'admin') {
      setIsGatewayUnlocked(true);
      setGatewayPinError('');
    } else {
      setGatewayPinError('Invalid Admin Password / Security PIN. Access denied.');
    }
  };

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

  const monthlyPackagesRevenue = students.reduce((sum, s) => sum + (s.price || 2500), 0);
  const allEventsRevenue = masterEventsList.reduce((sum, e) => sum + e.revenue, 0);
  const grandTotalRevenue = monthlyPackagesRevenue + allEventsRevenue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* 🌟 WARM LIGHT CREAM BACKGROUND CONTAINER (`bg-[#FAF8F5]`) MATCHING EVENTS & GALLERY PAGES 🌟 */}
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#FAF8F5] border border-slate-300 rounded-3xl shadow-2xl overflow-hidden text-slate-900 flex flex-col font-sans">
        
        {/* TOP NAVIGATION HEADER BAR */}
        <div className="relative z-10 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4 shrink-0 text-white">
          
          <div className="flex items-center gap-4">
            <img src={ethosPureLogo} alt="Ethos Studio" className="h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,0,85,0.5)]" />
            
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <h1 className="text-base font-black font-syne uppercase tracking-wide text-white flex items-center gap-2">
                ETHOS MASTER ADMIN DASHBOARD
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold rounded-full">🟢 LIVE</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold">Kukatpally Studio Central • Real-time Passes & Event History</p>
            </div>
          </div>

          {/* Quick Action & Revenue Badges */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('CREATE_EVENT')}
              className="px-4 py-2 bg-[#FF0055] hover:bg-[#e00044] text-white text-xs font-black uppercase rounded-2xl flex items-center gap-1.5 shadow-lg shadow-[#FF0055]/30 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Host New Event</span>
            </button>

            <div className="hidden lg:flex items-center gap-4 bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl">
              <button onClick={() => setActiveTab('PACKAGES')} className="text-left hover:opacity-80 transition-opacity">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Monthly Pass Rev</span>
                <span className="text-xs font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</span>
              </button>
              <button onClick={() => setActiveTab('EVENTS')} className="border-l border-slate-700 pl-3 text-left hover:opacity-80 transition-opacity">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">All Events Rev</span>
                <span className="text-xs font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</span>
              </button>
              <div className="border-l border-slate-700 pl-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Total Studio Rev</span>
                <span className="text-sm font-black font-syne text-[#00DFD8]">₹{grandTotalRevenue.toLocaleString()}</span>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>

        {/* MAIN BODY SPLIT (LEFT SIDEBAR + MAIN PANEL) */}
        <div className="relative z-10 flex-1 flex overflow-hidden">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2 shrink-0 hidden md:block text-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-3 py-2">MANAGE STUDIO</span>

            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'OVERVIEW'
                  ? 'bg-gradient-to-r from-[#FF0055] to-[#7928CA] text-white shadow-lg font-black'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-4 h-4" />
                <span>Events & Masterclasses</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-extrabold rounded-full">{masterEventsList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('CREATE_EVENT')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'CREATE_EVENT'
                  ? 'bg-emerald-600 text-white shadow-lg font-black'
                  : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4" />
                <span>+ Host New Event</span>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </button>

            <button
              onClick={() => setActiveTab('SETTINGS')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'SETTINGS'
                  ? 'bg-[#7928CA] text-white shadow-lg shadow-[#7928CA]/30 font-black'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
            <div className="flex items-center gap-3 bg-white border border-slate-300 p-3 rounded-2xl shadow-sm">
              <Search className="w-5 h-5 text-slate-400 ml-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, code, phone, ticket ID, or event title..."
                className="bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
              />
            </div>

            {/* 0️⃣ OVERVIEW TAB */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black font-syne uppercase text-slate-900">ETHOS STUDIO FINANCIAL SUMMARY</h2>

                {/* CLICKABLE KPI REVENUE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* CLICKABLE MONTHLY PACKAGES REVENUE CARD */}
                  <div
                    onClick={() => setActiveTab('PACKAGES')}
                    className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xl cursor-pointer transition-all hover:border-[#0088FF] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-500 tracking-wider group-hover:text-[#0088FF] transition-colors">
                        MONTHLY PACKAGES REVENUE →
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 font-medium">From {students.length} Active Pass Subscribers (Click to Manage)</div>
                  </div>

                  {/* CLICKABLE ALL EVENTS REVENUE CARD */}
                  <div
                    onClick={() => setActiveTab('EVENTS')}
                    className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xl cursor-pointer transition-all hover:border-[#FF0055] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-500 tracking-wider group-hover:text-[#FF0055] transition-colors">
                        ALL EVENTS REVENUE →
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#FF0055]/10 text-[#FF0055] flex items-center justify-center">
                        <Ticket className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 font-medium">Across Past, Present & Future Workshops (Click to Manage)</div>
                  </div>

                  {/* GRAND TOTAL REVENUE CARD */}
                  <div className="bg-gradient-to-br from-[#7928CA] via-slate-900 to-[#00DFD8] text-white border border-[#7928CA] rounded-3xl p-6 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#00DFD8] tracking-wider">GRAND TOTAL REVENUE</span>
                      <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-[#00DFD8]" />
                      </div>
                    </div>
                    <div className="text-4xl font-black font-syne text-white">₹{grandTotalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-200 font-medium">Combined Pass + Event Financial Total</div>
                  </div>

                </div>

                {/* Quick Action Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div
                    onClick={() => setActiveTab('PACKAGES')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 p-6 rounded-3xl cursor-pointer transition-all flex items-center justify-between group shadow-lg"
                  >
                    <div>
                      <h4 className="text-lg font-black uppercase font-syne text-slate-900 group-hover:text-[#0088FF] transition-colors">
                        Manage Class Batches & Students →
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">Divided into official class schedule batch cards with student rosters.</p>
                    </div>
                    <User className="w-8 h-8 text-[#0088FF] shrink-0" />
                  </div>

                  <div
                    onClick={() => setActiveTab('CREATE_EVENT')}
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-6 rounded-3xl cursor-pointer transition-all flex items-center justify-between group shadow-lg"
                  >
                    <div>
                      <h4 className="text-lg font-black uppercase font-syne text-emerald-900 transition-colors">
                        + Host & Publish New Workshop Event →
                      </h4>
                      <p className="text-xs text-emerald-700 font-medium mt-1">Fill out event title, date, location, amount & poster to publish live.</p>
                    </div>
                    <PlusCircle className="w-8 h-8 text-emerald-600 shrink-0" />
                  </div>
                </div>

              </div>
            )}

            {/* 1️⃣ MONTHLY PACKAGES TAB */}
            {activeTab === 'PACKAGES' && (
              <div className="space-y-6">
                
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-lg font-black uppercase font-syne text-slate-900">
                      MONTHLY CLASS SCHEDULE BATCH CARDS
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Select any batch card below to view registered students, days left trackers, and renewal notices. Total Revenue: <strong className="text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</strong>
                    </p>
                  </div>

                  <div className="px-4 py-2 bg-[#0088FF]/10 border border-[#0088FF]/30 rounded-xl text-center">
                    <span className="text-[10px] text-slate-600 uppercase font-bold block">Total Members</span>
                    <span className="text-base font-black font-syne text-[#0088FF]">{students.length} Subscribers</span>
                  </div>
                </div>

                {/* BATCH CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scheduleBatchesList.map((batch) => {
                    const batchStudents = students.filter(s => s.batchCategory === batch.category);
                    const batchRevenue = batchStudents.reduce((sum, s) => sum + s.price, 0);

                    return (
                      <div
                        key={batch.id}
                        className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${batch.badgeColor}`}>
                              {batch.timings}
                            </span>
                            <span className="text-xs font-mono font-black text-[#0088FF]">₹{batchRevenue.toLocaleString()}</span>
                          </div>

                          <h4 className="text-xl font-black font-syne text-slate-900 uppercase">{batch.title}</h4>

                          <div className="text-xs text-slate-600 font-semibold space-y-1">
                            <div>🕒 Timings: <strong className="text-slate-900">{batch.timings}</strong></div>
                            <div>💃 Instructors: <strong className="text-slate-900">{batch.instructor}</strong></div>
                            <div>💳 Monthly Pass Fee: <strong className="text-[#0088FF]">₹{batch.monthlyFee} / Month</strong></div>
                            <div>👥 Registered Students: <strong className="text-slate-900">{batchStudents.length} Active Subscribers</strong></div>
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

            {/* 2️⃣ EVENTS & MASTERCLASSES TAB */}
            {activeTab === 'EVENTS' && (
              <div className="space-y-6">
                
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-lg font-black uppercase font-syne text-slate-900">
                      WORKSHOP EVENTS & PASSES HISTORY
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Pass sales history across Past, Live, and Future masterclasses. Total Event Revenue: <strong className="text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('CREATE_EVENT')}
                      className="px-3 py-2 bg-emerald-600 text-white text-[11px] font-black uppercase rounded-xl flex items-center gap-1 shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Create Event</span>
                    </button>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-300">
                      {['ALL', 'LIVE', 'UPCOMING', 'PAST'].map((fKey) => (
                        <button
                          key={fKey}
                          onClick={() => setEventFilter(fKey)}
                          className={`px-3 py-1 text-[10px] font-black uppercase rounded-xl transition-all ${
                            eventFilter === fKey
                              ? 'bg-[#FF0055] text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {fKey}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EVENTS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {masterEventsList
                    .filter(e => eventFilter === 'ALL' || e.status === eventFilter)
                    .map((evt) => {
                      return (
                        <div key={evt.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                                evt.status === 'LIVE' 
                                  ? 'bg-[#FF0055]/10 text-[#FF0055] border-[#FF0055]/30' 
                                  : evt.status === 'UPCOMING' 
                                  ? 'bg-[#0088FF]/10 text-[#0088FF] border-[#0088FF]/30'
                                  : 'bg-slate-100 text-slate-600 border-slate-300'
                              }`}>
                                {evt.statusBadge}
                              </span>

                              <span className="text-xs font-mono font-black text-slate-900">₹{evt.revenue.toLocaleString()}</span>
                            </div>

                            <h4 className="text-xl font-black font-syne text-slate-900 uppercase">{evt.title}</h4>
                            
                            <div className="text-xs text-slate-600 font-semibold space-y-1">
                              <div>📅 Date: <strong className="text-slate-900">{evt.date}</strong></div>
                              <div>🕒 Time: <strong className="text-slate-900">{evt.time || '5:00 PM - 8:00 PM'}</strong></div>
                              <div>💃 Master Choreographer: <strong className="text-slate-900">{evt.choreographer}</strong></div>
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

            {/* 3️⃣ + HOST / CREATE NEW EVENT FORM TAB */}
            {activeTab === 'CREATE_EVENT' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase font-syne text-slate-900">HOST & PUBLISH NEW WORKSHOP EVENT</h3>
                      <p className="text-xs text-slate-500">Fill out details below to create an event and publish it live to the website.</p>
                    </div>
                  </div>

                  {eventCreatedNotice && (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Event published live! It now appears on the Events page and Gallery.</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateEventSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Event Title / Name *</label>
                        <input
                          type="text" required
                          placeholder="e.g. Hip-Hop & Urban Choreography Masterclass"
                          value={newEventForm.title}
                          onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Master Choreographer / Instructor *</label>
                        <input
                          type="text" required
                          placeholder="e.g. Sophia Bennett or Shanmuka"
                          value={newEventForm.choreographer}
                          onChange={(e) => setNewEventForm({ ...newEventForm, choreographer: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Date *</label>
                        <input
                          type="text" required
                          placeholder="e.g. Aug 28, 2026"
                          value={newEventForm.date}
                          onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Time *</label>
                        <input
                          type="text" required
                          placeholder="e.g. 5:00 PM - 8:00 PM"
                          value={newEventForm.time}
                          onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                    </div>

                    {/* EARLY BIRD DYNAMIC TIERED PRICING SCHEMES (ADMIN CUSTOM PRICES) */}
                    <div className="bg-slate-100 border border-slate-300 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center justify-between">
                        <span>🏷️ EARLY BIRD TIERED PRICING SCHEMES</span>
                        <span className="text-[10px] text-emerald-700 font-extrabold uppercase">Custom Admin Tier Prices</span>
                      </h4>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
                        <div>
                          <label className="block text-[10px] text-emerald-700 uppercase mb-1">Tier 1 (Passes 1–10) *</label>
                          <input
                            type="number" required
                            placeholder="549"
                            value={newEventForm.tier1Price}
                            onChange={(e) => setNewEventForm({ ...newEventForm, tier1Price: e.target.value })}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-blue-700 uppercase mb-1">Tier 2 (Passes 11–20) *</label>
                          <input
                            type="number" required
                            placeholder="649"
                            value={newEventForm.tier2Price}
                            onChange={(e) => setNewEventForm({ ...newEventForm, tier2Price: e.target.value })}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-purple-700 uppercase mb-1">Tier 3 (Passes 21–30) *</label>
                          <input
                            type="number" required
                            placeholder="749"
                            value={newEventForm.tier3Price}
                            onChange={(e) => setNewEventForm({ ...newEventForm, tier3Price: e.target.value })}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-purple-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-amber-700 uppercase mb-1">Tier 4 (Passes 31+) *</label>
                          <input
                            type="number" required
                            placeholder="799"
                            value={newEventForm.tier4Price}
                            onChange={(e) => setNewEventForm({ ...newEventForm, tier4Price: e.target.value })}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-amber-600 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Total Seat Limit / Available Passes *</label>
                        <input
                          type="number" required
                          placeholder="40"
                          value={newEventForm.totalPasses}
                          onChange={(e) => setNewEventForm({ ...newEventForm, totalPasses: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Studio Hall / Location *</label>
                        <input
                          type="text" required
                          placeholder="Ethos Studio Kukatpally / Main Hall"
                          value={newEventForm.location}
                          onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase mb-1">Event Poster Image (Upload or Image URL) *</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Image URL..."
                          value={newEventForm.posterUrl}
                          onChange={(e) => setNewEventForm({ ...newEventForm, posterUrl: e.target.value })}
                          className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                        <label className="cursor-pointer px-4 py-3 bg-slate-800 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 shrink-0">
                          <ImageIcon className="w-4 h-4 text-emerald-400" />
                          <span>Upload File</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handlePosterFileUpload} />
                        </label>
                      </div>
                    </div>

                    {/* Poster Preview */}
                    {newEventForm.posterUrl && (
                      <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-300">
                        <img src={newEventForm.posterUrl} alt="Poster preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 text-white text-[10px] font-bold rounded-lg uppercase">Poster Preview</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-slate-700 uppercase mb-1">Event Description & Workshop Breakdown *</label>
                      <textarea
                        rows="3" required
                        placeholder="Detail the dance style, video recording perks, and performance highlights..."
                        value={newEventForm.desc}
                        onChange={(e) => setNewEventForm({ ...newEventForm, desc: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Event Live to Website</span>
                    </button>

                  </form>

                </div>

              </div>
            )}

            {/* 4️⃣ GATEWAY & ADMIN SETTINGS TAB */}
            {activeTab === 'SETTINGS' && (
              <div className="max-w-2xl mx-auto space-y-6">
                
                {!isGatewayUnlocked ? (
                  <div className="bg-white border-2 border-amber-500/40 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
                    <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-600 shadow-lg">
                      <Lock className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-syne uppercase text-slate-900">PAYMENT SETTINGS LOCKED</h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                        To prevent unauthorized modifications to your studio's Razorpay API keys and payment credentials, enter your Master Admin Password below.
                      </p>
                    </div>

                    {gatewayPinError && (
                      <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs font-bold rounded-2xl">
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
                          className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-center text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Unlock Gateway Settings</span>
                      </button>
                    </form>

                    <div className="text-[10px] text-slate-500 font-bold">
                      Default Master Password: <code className="text-amber-700 bg-slate-100 px-2 py-1 rounded">admin</code>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key className="w-6 h-6 text-[#7928CA]" />
                        <div>
                          <h3 className="text-lg font-black uppercase font-syne text-slate-900">PAYMENT GATEWAY CONFIGURATION</h3>
                          <p className="text-xs text-slate-500">Razorpay API Credentials for Automatic Payment Collection</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsGatewayUnlocked(false)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-amber-700 text-[10px] font-bold rounded-xl border border-slate-300 flex items-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Settings</span>
                      </button>
                    </div>

                    {settingsSaved && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment Gateway Settings Saved Successfully!</span>
                      </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 4000); }} className="space-y-4 text-xs font-bold text-slate-700">
                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Razorpay Key ID</label>
                        <input
                          type="text"
                          value={settings.RazorpayKeyId}
                          onChange={(e) => setSettings({ ...settings, RazorpayKeyId: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Razorpay Key Secret</label>
                        <input
                          type="password"
                          value={settings.RazorpayKeySecret}
                          onChange={(e) => setSettings({ ...settings, RazorpayKeySecret: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 uppercase mb-1">Master Admin Password</label>
                        <input
                          type="password"
                          value={settings.AdminPassword}
                          onChange={(e) => setSettings({ ...settings, AdminPassword: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#7928CA]"
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

      {/* 👥 BATCH ROSTER MODAL */}
      {selectedBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-slate-900 flex flex-col max-h-[88vh]">
            
            <div className="bg-slate-900 p-6 border-b border-slate-800 flex items-center justify-between text-white">
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
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">REGISTERED STUDENTS IN THIS BATCH</h4>

              <div className="grid grid-cols-1 gap-6">
                {students
                  .filter(s => s.batchCategory === selectedBatchModal.category)
                  .map((student) => {
                    const isExpired = student.daysRemaining <= 0;
                    const isExpiringSoon = student.daysRemaining > 0 && student.daysRemaining <= 5;

                    return (
                      <div
                        key={student.id}
                        className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md relative overflow-hidden"
                      >
                        <div className="space-y-3 lg:max-w-md">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black font-syne text-slate-900 uppercase">{student.name}</span>
                            <span className="px-2.5 py-0.5 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] font-black rounded-full uppercase">
                              {student.studentCode}
                            </span>
                            
                            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                              isExpired 
                                ? 'bg-red-500/10 text-red-700 border-red-500/30'
                                : isExpiringSoon
                                ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                            }`}>
                              {isExpired ? '🔴 EXPIRED TODAY' : isExpiringSoon ? `🟡 ${student.daysRemaining} DAYS LEFT` : `🟢 ${student.daysRemaining} DAYS LEFT`}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 font-medium space-y-1">
                            <div>📦 Pass: <strong className="text-slate-900">{student.packageName}</strong> • Revenue: <strong className="text-[#0088FF]">₹{student.price}</strong></div>
                            <div>👨‍👩‍👦 Parent/Phone: <strong className="text-slate-900">{student.parentName} ({student.phone})</strong></div>
                            <div>🎟️ Classes Left: <strong className="text-[#0088FF]">{student.classesLeft} Classes</strong> • Expiry: {student.passExpiryDate}</div>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">STUDENT RATING & FEEDBACK</span>
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
                                        : 'text-slate-300'
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="text-xs font-black text-amber-600 ml-1">{student.rating}.0</span>
                            </div>
                          </div>

                          <textarea
                            rows="2"
                            value={student.feedback}
                            onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                            placeholder="Add private performance feedback for student..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-[#0088FF]"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {(student.privatePhotos || []).map((photo, pIdx) => (
                                <img key={pIdx} src={photo} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                              ))}
                            </div>

                            <label className="cursor-pointer px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 text-[10px] font-extrabold uppercase rounded-xl flex items-center gap-1.5 transition-colors">
                              <ImageIcon className="w-3.5 h-3.5 text-[#0088FF]" />
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
                            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-slate-900 flex flex-col max-h-[85vh]">
            
            <div className="bg-slate-900 p-6 border-b border-slate-800 flex items-center justify-between text-white">
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
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">PERSONS WHO BOUGHT PASSES</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Person Name</th>
                      <th className="p-3">Phone & Email</th>
                      <th className="p-3">Tier & Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs font-medium">
                    {eventTickets
                      .filter(t => t.eventId === selectedEventModal.id)
                      .map((t) => (
                        <tr key={t.ticketId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-[#0088FF]">{t.ticketId}</td>
                          <td className="p-3 font-bold text-slate-900">{t.personName}</td>
                          <td className="p-3 text-slate-600">
                            <div>{t.personPhone}</div>
                            <div className="text-[10px] text-slate-400">{t.personEmail}</div>
                          </td>
                          <td className="p-3">
                            <span className="text-slate-600 block">{t.tierName}</span>
                            <span className="font-bold text-slate-900">₹{t.pricePaid}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 text-[9px] font-bold rounded-full">
                              ✓ {t.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <a
                              href={getEventTicketWhatsappUrl(t)}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-black uppercase rounded-xl inline-flex items-center gap-1 shadow-sm"
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
