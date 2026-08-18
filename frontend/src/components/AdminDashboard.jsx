import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard } from 'lucide-react';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('PACKAGES'); // 'PACKAGES', 'EVENTS', or 'SETTINGS'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Monthly Package Student Subscribers State
  const [students, setStudents] = useState([
    {
      id: 101,
      name: 'Rohan Sharma',
      studentCode: 'ETH8492',
      parentName: 'Suresh Sharma',
      phone: '+91 98765 43210',
      email: 'rohan@example.com',
      packageName: 'Adults & Fitness Pass',
      price: 2500,
      batch: 'Monday - Friday (8:00 PM)',
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
      id: 102,
      name: 'Ananya Verma',
      studentCode: 'ETH7719',
      parentName: 'Vikram Verma',
      phone: '+91 91234 56789',
      email: 'ananya@example.com',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      price: 2000,
      batch: 'Mon - Fri (5:00 PM Kids)',
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
      id: 103,
      name: 'Kavya Reddy',
      studentCode: 'ETH9920',
      parentName: 'Rajesh Reddy',
      phone: '+91 94401 23456',
      email: 'kavya@example.com',
      packageName: 'Adults & Fitness Pass',
      price: 2500,
      batch: 'Mon - Fri (6:00 PM)',
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

  // Master Workshop Events Catalog
  const masterEventsList = [
    { id: 301, title: 'Hip-Hop & Choreography Masterclass', date: 'Aug 19, 2026' },
    { id: 302, title: 'Contemporary & Floorwork Workshop', date: 'Sep 25, 2026' },
    { id: 303, title: 'Bollywood Fusion & Sangeet Workshop', date: 'Oct 25, 2026' }
  ];

  // Settings State
  const [settings, setSettings] = useState({
    RazorpayKeyId: 'rzp_test_EthosDance2026',
    RazorpayKeySecret: 'Secret_Ethos_Key_9981',
    AdminPassword: 'admin',
    AdminPhone: '+91 83417 01113'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fetchBookingsAndSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch {
      // Use initial state fallbacks
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsAndSettings();
  }, []);

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
  const allEventsRevenue = eventTickets.reduce((sum, t) => sum + t.pricePaid, 0);
  const grandTotalRevenue = monthlyPackagesRevenue + allEventsRevenue;

  // Calculate Revenue per Event
  const getRevenueForEvent = (eventId) => {
    return eventTickets
      .filter(t => t.eventId === eventId)
      .reduce((sum, t) => sum + t.pricePaid, 0);
  };

  const getTicketsSoldForEvent = (eventId) => {
    return eventTickets.filter(t => t.eventId === eventId).length;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#090A0F] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col">
        
        {/* TOP DASHBOARD HEADER BAR */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF0055]/20 border border-[#FF0055]/40 flex items-center justify-center text-[#FF0055]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
                ETHOS MASTER ADMIN DASHBOARD
              </h2>
              <p className="text-[11px] font-bold text-slate-400">
                Kukatpally Studio Management • Real-time Passes, Ratings & Event Revenue Breakdown
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 📊 SEPARATE FINANCIAL REVENUE DASHBOARD BAR */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
          
          {/* 1. Monthly Packages Revenue Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">MONTHLY PACKAGES REVENUE</span>
              <span className="text-xl font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 font-bold block">{students.length} Active Subscribers</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0088FF]/10 border border-[#0088FF]/30 flex items-center justify-center text-[#0088FF]">
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* 2. All Events Revenue Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">ALL EVENTS REVENUE</span>
              <span className="text-xl font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 font-bold block">{eventTickets.length} Event Tickets Sold</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FF0055]/10 border border-[#FF0055]/30 flex items-center justify-center text-[#FF0055]">
              <Ticket className="w-5 h-5" />
            </div>
          </div>

          {/* 3. Grand Total Studio Revenue Card */}
          <div className="bg-gradient-to-r from-[#7928CA]/30 via-[#FF0055]/20 to-[#00DFD8]/20 border border-[#7928CA]/50 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-[#00DFD8] block tracking-wider">GRAND TOTAL STUDIO REVENUE</span>
              <span className="text-2xl font-black font-syne text-white">₹{grandTotalRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-slate-300 font-bold block">Combined Monthly + Events</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#7928CA]/40 border border-[#7928CA]/60 flex items-center justify-center text-white shadow-lg">
              <TrendingUp className="w-5 h-5 text-[#00DFD8]" />
            </div>
          </div>

        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('PACKAGES')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 ${
              activeTab === 'PACKAGES'
                ? 'bg-[#0088FF] text-white shadow-lg shadow-[#0088FF]/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Monthly Packages (Revenue: ₹{monthlyPackagesRevenue.toLocaleString()})</span>
          </button>

          <button
            onClick={() => setActiveTab('EVENTS')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 ${
              activeTab === 'EVENTS'
                ? 'bg-[#FF0055] text-white shadow-lg shadow-[#FF0055]/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Events & Masterclasses (Revenue: ₹{allEventsRevenue.toLocaleString()})</span>
          </button>

          <button
            onClick={() => setActiveTab('SETTINGS')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 ${
              activeTab === 'SETTINGS'
                ? 'bg-[#7928CA] text-white shadow-lg shadow-[#7928CA]/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Gateway & Admin Settings</span>
          </button>
        </div>

        {/* DASHBOARD CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* SEARCH BAR */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, code, phone, ticket ID, or event title..."
              className="bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none w-full font-medium"
            />
          </div>

          {/* 1️⃣ MONTHLY PACKAGES & STUDENTS TAB */}
          {activeTab === 'PACKAGES' && (
            <div className="space-y-6">
              
              {/* Monthly Packages Summary Header */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black uppercase font-syne text-white">
                    MONTHLY PACKAGES REVENUE & STUDENT SUBSCRIBERS
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Total Revenue Generated from Monthly Subscriptions: <strong className="text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</strong>
                  </p>
                </div>

                <div className="px-4 py-2 bg-[#0088FF]/20 border border-[#0088FF]/40 rounded-xl text-center">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Monthly Subscriptions</span>
                  <span className="text-base font-black font-syne text-[#0088FF]">₹{monthlyPackagesRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {students
                  .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.phone.includes(searchTerm) || s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((student) => {
                    const isExpired = student.daysRemaining <= 0;
                    const isExpiringSoon = student.daysRemaining > 0 && student.daysRemaining <= 5;

                    return (
                      <div
                        key={student.id}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden"
                      >
                        
                        {/* Student Details & Days Remaining Badge */}
                        <div className="space-y-3 lg:max-w-md">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black font-syne text-white uppercase">{student.name}</span>
                            <span className="px-2.5 py-0.5 bg-[#0088FF]/20 border border-[#0088FF]/40 text-[#0088FF] text-[10px] font-black rounded-full uppercase">
                              {student.studentCode}
                            </span>
                            
                            {/* Days Left Renewal Badge */}
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
                            <div>📦 Pass: <strong className="text-slate-200">{student.packageName}</strong> • Revenue Paid: <strong className="text-[#0088FF]">₹{student.price}</strong></div>
                            <div>🕒 Batch: <strong className="text-slate-200">{student.batch}</strong></div>
                            <div>👨‍👩‍👦 Parent/Phone: <strong className="text-slate-200">{student.parentName} ({student.phone})</strong></div>
                            <div>🎟️ Classes Left: <strong className="text-[#00DFD8]">{student.classesLeft} Classes</strong> • Expiry: {student.passExpiryDate}</div>
                          </div>
                        </div>

                        {/* Interactive 5-Star Rating & Choreography Feedback */}
                        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 flex-1">
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
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-[#0088FF]"
                          />
                        </div>

                        {/* Private Photo Upload & WhatsApp Renewal Action */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 shrink-0">
                          
                          {/* Private Photos Preview & Upload Button */}
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

                          {/* 1-Click WhatsApp Renewal Button */}
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
          )}

          {/* 2️⃣ EVENTS & TICKETS ROSTER TAB */}
          {activeTab === 'EVENTS' && (
            <div className="space-y-6">
              
              {/* Overall Events Revenue Summary Header */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black uppercase font-syne text-white">
                    ALL EVENTS & MASTERCLASSES REVENUE
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Total Revenue Generated Across All Workshops: <strong className="text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</strong> ({eventTickets.length} Tickets Sold)
                  </p>
                </div>

                <div className="px-4 py-2 bg-[#FF0055]/20 border border-[#FF0055]/40 rounded-xl text-center">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">All Events Total</span>
                  <span className="text-base font-black font-syne text-[#FF0055]">₹{allEventsRevenue.toLocaleString()}</span>
                </div>
              </div>

              {/* 📊 INDIVIDUAL PER-EVENT REVENUE BREAKDOWN CARDS */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  INDIVIDUAL PER-EVENT REVENUE BREAKDOWN
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {masterEventsList.map((mEvt) => {
                    const eventRev = getRevenueForEvent(mEvt.id);
                    const eventCount = getTicketsSoldForEvent(mEvt.id);

                    return (
                      <div key={mEvt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#FF0055] block">{mEvt.date}</span>
                          <h5 className="text-xs font-bold text-white uppercase line-clamp-1">{mEvt.title}</h5>
                          <span className="text-[10px] text-slate-400 font-bold block">{eventCount} Tickets Sold</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black font-syne text-[#00DFD8]">₹{eventRev.toLocaleString()}</span>
                          <span className="text-[9px] text-slate-500 font-bold block">Event Revenue</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Roster Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-6">
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
                    COMPLETE TICKET PURCHASERS & ATTENDEE LIST
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400">Showing {eventTickets.length} Attendees</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="p-4">Ticket ID</th>
                        <th className="p-4">Person Name</th>
                        <th className="p-4">Phone & Email</th>
                        <th className="p-4">Event Title</th>
                        <th className="p-4">Tier & Revenue</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                      {eventTickets
                        .filter(t => t.personName.toLowerCase().includes(searchTerm.toLowerCase()) || t.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) || t.personPhone.includes(searchTerm))
                        .map((ticket) => (
                          <tr key={ticket.ticketId} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 font-mono font-bold text-[#00DFD8]">
                              {ticket.ticketId}
                            </td>
                            <td className="p-4 font-bold text-white">
                              {ticket.personName}
                            </td>
                            <td className="p-4 text-slate-300">
                              <div>{ticket.personPhone}</div>
                              <div className="text-[10px] text-slate-500">{ticket.personEmail}</div>
                            </td>
                            <td className="p-4 text-slate-200 font-semibold">
                              <div>{ticket.eventTitle}</div>
                              <div className="text-[10px] text-slate-500">📅 {ticket.eventDate}</div>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055] text-[10px] font-black rounded-full block w-fit mb-1">
                                {ticket.tierName}
                              </span>
                              <span className="font-bold text-white">₹{ticket.pricePaid}</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold rounded-full">
                                ✓ CONFIRMED
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <a
                                href={getEventTicketWhatsappUrl(ticket)}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-black uppercase rounded-xl inline-flex items-center gap-1.5 shadow-md"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                                <span>Send WhatsApp Ticket</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 3️⃣ GATEWAY & ADMIN SETTINGS TAB */}
          {activeTab === 'SETTINGS' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <Key className="w-6 h-6 text-[#7928CA]" />
                  <div>
                    <h3 className="text-lg font-black uppercase font-syne text-white">PAYMENT GATEWAY CONFIGURATION</h3>
                    <p className="text-xs text-slate-400">Razorpay API Credentials for Automatic Payment Collection</p>
                  </div>
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

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
