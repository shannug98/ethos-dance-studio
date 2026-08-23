import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, ShieldAlert, ChevronRight, Eye, EyeOff, Clock, History, Filter, Users, PlusCircle, MapPin, Sparkles, Phone, HelpCircle, LogOut, Edit3, Trash2, QrCode } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('EVENTS'); // 'EVENTS', 'PACKAGES', 'CONTENT'
  const [eventFilter, setEventFilter] = useState('ALL'); // 'ALL', 'LIVE', 'UPCOMING', 'PAST'
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [rosterFilter, setRosterFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Event Modal & Detailed Student Pass Modal (Point #2 & Point #4)
  const [selectedEventRoster, setSelectedEventRoster] = useState(null);
  const [editingEventModal, setEditingEventModal] = useState(null);
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Master Workshop Events List
  const [eventsList, setEventsList] = useState([
    {
      id: 201,
      title: 'CHIRANJEEVI DANCE TRIBUTE MASTERCLASS',
      guestChoreographer: 'SRIKANTH',
      organiserName: 'Ethos Dance Studio Central',
      date: '21-08-2026',
      time: '5:00 PM',
      location: 'Ethos Studio, Nizampet Rd, Kukatpally, Hyderabad',
      price: 1999,
      earlyBirdPrice: 1499,
      level: 'All Levels Welcome',
      danceStyle: 'Mass Commercial Tollywood',
      seatsLeft: 26,
      totalCapacity: 40,
      soldCount: 14,
      status: 'LIVE',
      year: '2026',
      month: 'AUG',
      imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'High-energy mega tribute choreography to Chiranjeevi iconic commercial dance moves.',
      requirements: 'Carry comfortable dancing sneakers, towel & water bottle. Knee pads recommended.'
    },
    {
      id: 202,
      title: 'WEDDING SANGEET & FLASHMOB BOOTCAMP',
      guestChoreographer: 'MANIKANTA & SRIKANTH',
      organiserName: 'Ethos Dance Studio Central',
      date: '28-08-2026',
      time: '6:30 PM',
      location: 'Ethos Studio, Kukatpally',
      price: 2499,
      earlyBirdPrice: 1999,
      level: 'Beginner to Intermediate',
      danceStyle: 'Sangeet Fusion / Bolly-Hop',
      seatsLeft: 18,
      totalCapacity: 40,
      soldCount: 22,
      status: 'LIVE',
      year: '2026',
      month: 'AUG',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      description: 'Exclusive 3-day wedding choreography bootcamp for group performances and flashmobs.',
      requirements: 'Bring Sangeet song requests. Practice video reels provided after class.'
    },
    {
      id: 203,
      title: 'AFRO-FUSION & BODY ISOLATIONS INTENSIVE',
      guestChoreographer: 'GUEST ARTIST',
      organiserName: 'Ethos Dance Studio Central',
      date: '05-09-2026',
      time: '4:00 PM',
      location: 'Ethos Studio, Kukatpally',
      price: 1499,
      earlyBirdPrice: 1199,
      level: 'Intermediate',
      danceStyle: 'Afro-Fusion',
      seatsLeft: 30,
      totalCapacity: 40,
      soldCount: 10,
      status: 'UPCOMING',
      year: '2026',
      month: 'SEP',
      imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      description: 'Rhythm, footwork, and body isolations masterclass.',
      requirements: 'Flexible dance wear.'
    }
  ]);

  // Comprehensive Attendee Pass Roster (with Age/DOB, Email, QR code - Point #2)
  const [attendeePasses, setAttendeePasses] = useState([
    {
      id: 1407,
      ticketId: 'ETH-1407',
      otpCode: '8444',
      studentName: 'Rajkamal Pappula',
      age: 24,
      dob: '12 Oct 2002',
      phone: '8508767386',
      email: 'rajkamal@example.com',
      eventId: 202,
      eventTitle: 'WEDDING SANGEET & FLASHMOB BOOTCAMP',
      bookedAt: 'Placed at: 19:07 | 23 Aug 2026',
      pricePaid: 2499,
      paymentMethod: 'Razorpay UPI',
      status: 'CONFIRMED',
      statusText: 'Pass Confirmed & Dispatched',
      gateCheckedIn: false
    },
    {
      id: 1405,
      ticketId: 'ETH-1405',
      otpCode: '7598',
      studentName: 'Swaroop Gaddam',
      age: 22,
      dob: '05 Mar 2004',
      phone: '8511741602',
      email: 'swaroop@example.com',
      eventId: 202,
      eventTitle: 'WEDDING SANGEET & FLASHMOB BOOTCAMP',
      bookedAt: 'Placed at: 16:23 | 23 Aug 2026',
      pricePaid: 2499,
      paymentMethod: 'Online Card',
      status: 'CHECKED_IN',
      statusText: 'Checked-In at Studio Gate',
      gateCheckedIn: true
    },
    {
      id: 1402,
      ticketId: 'ETH-1402',
      otpCode: '7611',
      studentName: 'Sekhar V',
      age: 26,
      dob: '18 Jul 2000',
      phone: '8513335662',
      email: 'sekhar@example.com',
      eventId: 201,
      eventTitle: 'CHIRANJEEVI DANCE TRIBUTE MASTERCLASS',
      bookedAt: 'Placed at: 14:56 | 21 Aug 2026',
      pricePaid: 1999,
      paymentMethod: 'Razorpay UPI',
      status: 'CHECKED_IN',
      statusText: 'Checked-In at Studio Gate',
      gateCheckedIn: true
    },
    {
      id: 1397,
      ticketId: 'ETH-1397',
      otpCode: '2199',
      studentName: 'Venkatesh K',
      age: 25,
      dob: '30 Nov 2001',
      phone: '8513676351',
      email: 'venkatesh@example.com',
      eventId: 201,
      eventTitle: 'CHIRANJEEVI DANCE TRIBUTE MASTERCLASS',
      bookedAt: 'Placed at: 13:41 | 21 Aug 2026',
      pricePaid: 1999,
      paymentMethod: 'Online UPI',
      status: 'CONFIRMED',
      statusText: 'Pass Confirmed & Dispatched',
      gateCheckedIn: false
    }
  ]);

  // Read event tickets dynamically from localStorage
  useEffect(() => {
    try {
      const savedTickets = localStorage.getItem('ethos_master_event_tickets');
      if (savedTickets) {
        const parsed = JSON.parse(savedTickets);
        const mapped = parsed.map((t, idx) => ({
          id: 3000 + idx,
          ticketId: `ETH-${t.mockCode || (1600 + idx)}`,
          otpCode: String(t.mockCode || '8821').slice(-4),
          studentName: t.personName || 'Shanmuka Gaddam',
          age: t.age || 24,
          dob: t.dob || '15 Aug 2002',
          phone: t.personPhone || '8341701113',
          email: t.personEmail || 'shanmuka@gmail.com',
          eventId: 201,
          eventTitle: t.eventTitle || 'CHIRANJEEVI DANCE TRIBUTE MASTERCLASS',
          bookedAt: t.bookedAt || '23 Aug 2026',
          pricePaid: t.pricePaid || 1999,
          paymentMethod: t.paymentMethod || 'Razorpay UPI',
          status: 'CONFIRMED',
          statusText: 'Verified & Active Pass',
          gateCheckedIn: false
        }));
        setAttendeePasses(prev => {
          const combined = [...mapped, ...prev];
          const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
          return unique;
        });
      }
    } catch {}
  }, []);

  // Filtered Events
  const filteredEvents = eventsList.filter(ev => {
    if (eventFilter !== 'ALL' && ev.status !== eventFilter) return false;
    if (selectedYear !== 'ALL' && ev.year !== selectedYear) return false;
    if (selectedMonth !== 'ALL' && ev.month !== selectedMonth) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return ev.title.toLowerCase().includes(q) || ev.guestChoreographer.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Roster for Selected Event
  const eventPassRoster = attendeePasses.filter(p => {
    if (selectedEventRoster && p.eventId !== selectedEventRoster.id) return false;
    if (rosterFilter !== 'ALL' && p.status !== rosterFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return p.studentName.toLowerCase().includes(q) || p.phone.includes(q) || p.ticketId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] text-slate-900 font-sans flex flex-col justify-between p-0 m-0 select-none">
      
      {/* 🌟 1. TOP STUDIO HEADER BAR (CLEAN WHITE THEME - POINT #3) 🌟 */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-3">
          <img src={ethosPureLogo} alt="Ethos Logo" className="w-9 h-9 object-contain" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black font-syne uppercase text-slate-900 tracking-wide">
                ETHOS DANCE STUDIO
              </h2>
              <span className="px-2 py-0.5 bg-[#0088FF] text-white text-[9px] font-black uppercase rounded-md">
                ADMIN CONTROL CENTER
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Kukatpally Studio Central • Real-time Passes &amp; Event History</span>
          </div>
        </div>

        {/* TOP SEARCH BAR */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name, code, phone, ticket ID, or event title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0088FF]"
          />
        </div>

        {/* LOGOUT & STUDIO CONTROLS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditingEventModal({
              title: '',
              guestChoreographer: '',
              organiserName: 'Ethos Dance Studio Central',
              date: '',
              time: '6:00 PM',
              location: 'Ethos Studio, Kukatpally',
              price: 1999,
              earlyBirdPrice: 1499,
              danceStyle: 'Bolly-Hop',
              seatsLeft: 40,
              totalCapacity: 40,
              description: '',
              requirements: 'Wear comfortable sneakers & carry water bottle.',
              imageUrl: ''
            })}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Publish New Event</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* 🌟 2. MAIN APP LAYOUT (SIDEBAR TABS + CONTENT AREA - WHITE THEME) 🌟 */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        
        {/* LEFT NAVIGATION SIDEBAR */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-2 shrink-0">
          <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-3 py-2">MANAGE STUDIO</div>
          
          <button
            onClick={() => { setActiveTab('EVENTS'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'EVENTS' ? 'bg-[#0088FF] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events &amp; Masterclasses</span>
            <span className="ml-auto bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">{eventsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('PACKAGES'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'PACKAGES' ? 'bg-[#0088FF] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Monthly Packages</span>
            <span className="ml-auto bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">3</span>
          </button>

          <button
            onClick={() => { setActiveTab('CONTENT'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'CONTENT' ? 'bg-[#0088FF] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website Content Controls</span>
          </button>
        </aside>

        {/* RIGHT CONTENT WORKSPACE */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto text-left">
          
          {/* TAB 1: WORKSHOP EVENTS & PASSES MANAGEMENT */}
          {activeTab === 'EVENTS' && !selectedEventRoster && (
            <div className="space-y-6">
              
              {/* TOP ACTION & YEAR/MONTH FILTER HEADER */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black font-syne uppercase text-slate-900 tracking-tight">
                        WORKSHOP EVENTS &amp; PASSES MANAGEMENT
                      </h3>
                      <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-black uppercase rounded-full">
                        {eventsList.length} Events Listed
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Manage live workshops, edit pricing, filter by year/month, and dispatch ticket receipts to attendees.</p>
                  </div>

                  <button
                    onClick={() => setEditingEventModal({
                      title: '',
                      guestChoreographer: '',
                      organiserName: 'Ethos Dance Studio Central',
                      date: '',
                      time: '6:00 PM',
                      location: 'Ethos Studio, Kukatpally',
                      price: 1999,
                      earlyBirdPrice: 1499,
                      danceStyle: 'Bolly-Hop',
                      seatsLeft: 40,
                      totalCapacity: 40,
                      description: '',
                      requirements: 'Wear comfortable sneakers & carry water bottle.',
                      imageUrl: ''
                    })}
                    className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Publish New Event</span>
                  </button>
                </div>

                {/* YEAR & MONTH FILTERS */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[11px]">YEAR:</span>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#0088FF]"
                    >
                      <option value="2026">🗓️ 2026 EVENTS</option>
                      <option value="2025">2025</option>
                      <option value="ALL">ALL YEARS</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center gap-1">
                    {['ALL', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(m => (
                      <button
                        key={m}
                        onClick={() => setSelectedMonth(m)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                          selectedMonth === m ? 'bg-[#0088FF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STATUS FILTER PILLS */}
                <div className="flex items-center gap-2 pt-1">
                  {['ALL', 'LIVE', 'UPCOMING', 'PAST'].map(st => (
                    <button
                      key={st}
                      onClick={() => setEventFilter(st)}
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                        eventFilter === st ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* EVENT CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map(ev => (
                  <div key={ev.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    
                    <div className="relative h-48 w-full bg-slate-100">
                      <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/40" />
                      
                      <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-md ${
                        ev.status === 'LIVE' ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#0088FF] text-white'
                      }`}>
                        ● {ev.status} NOW
                      </span>

                      <span className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-full border border-white/20">
                        🎟️ {ev.seatsLeft} / {ev.totalCapacity} SEATS LEFT
                      </span>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold uppercase bg-amber-500 text-slate-900 px-2 py-0.5 rounded font-mono">
                          Early Bird: ₹{ev.earlyBirdPrice || ev.price - 500}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="text-lg font-black font-syne uppercase text-slate-900 leading-snug">
                          {ev.title}
                        </h4>
                        
                        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700 border border-slate-200">
                          <div>📅 <strong>{ev.date} • {ev.time}</strong></div>
                          <div>👤 Choreographer: <strong className="text-[#0088FF]">{ev.guestChoreographer}</strong></div>
                          <div>🏛️ Organiser: <strong className="text-slate-900">{ev.organiserName || 'Ethos Dance Studio'}</strong></div>
                          <div>📍 {ev.location}</div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        {/* VIEW ALL ATTENDEE PASSES BUTTON */}
                        <button
                          onClick={() => setSelectedEventRoster(ev)}
                          className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Ticket className="w-4 h-4" />
                          <span>View All Attendee Passes &amp; Send Ticket →</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setEditingEventModal(ev)}
                            className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-xl transition-all border border-slate-300 cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#0088FF]" />
                            <span>Edit Event</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete workshop event "${ev.title}"?`)) {
                                setEventsList(prev => prev.filter(e => e.id !== ev.id));
                              }
                            }}
                            className="py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold uppercase rounded-xl transition-all border border-rose-200 cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 🌟 SELECTED EVENT ATTENDEE ROSTER VIEW (INSIDE SELECTED EVENT — WHITE THEME) 🌟 */}
          {activeTab === 'EVENTS' && selectedEventRoster && (
            <div className="space-y-6">
              
              {/* BACK HEADER */}
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div>
                  <button
                    onClick={() => setSelectedEventRoster(null)}
                    className="text-xs font-extrabold text-[#0088FF] hover:underline flex items-center gap-1 mb-2 cursor-pointer"
                  >
                    ← Back to All Workshop Events
                  </button>
                  <h3 className="text-xl font-black font-syne uppercase text-slate-900">
                    {selectedEventRoster.title} — ATTENDEE PASS ROSTER
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Choreographer: {selectedEventRoster.guestChoreographer} • Date: {selectedEventRoster.date}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600">₹{selectedEventRoster.price}</div>
                  <span className="text-xs text-slate-500 font-bold">Ticket Price</span>
                </div>
              </div>

              {/* ROSTER STATUS FILTER PILLS & SEARCH */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                  <span className="text-[11px] font-bold text-slate-500 uppercase mr-1">Roster Filter:</span>
                  
                  <button
                    onClick={() => setRosterFilter('ALL')}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase cursor-pointer ${
                      rosterFilter === 'ALL' ? 'bg-[#0088FF] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ● All Attendees ({eventPassRoster.length})
                  </button>

                  <button
                    onClick={() => setRosterFilter('CONFIRMED')}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase cursor-pointer ${
                      rosterFilter === 'CONFIRMED' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ● Confirmed &amp; Dispatched
                  </button>

                  <button
                    onClick={() => setRosterFilter('CHECKED_IN')}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase cursor-pointer ${
                      rosterFilter === 'CHECKED_IN' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ● Checked-In at Gate
                  </button>
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search attendee by name, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>
              </div>

              {/* STRUCTURED ATTENDEE CARDS / ROWS LIST */}
              <div className="space-y-4">
                {eventPassRoster.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                    <Ticket className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-sm font-bold text-slate-800">No attendees found for this event</div>
                  </div>
                ) : (
                  eventPassRoster.map(pass => (
                    <div key={pass.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                      
                      {/* ATTENDEE & TICKET INFO */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF] shrink-0 font-bold text-sm">
                          <User className="w-5 h-5" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold text-slate-900">{pass.studentName}</h4>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase rounded-md">
                              {pass.statusText}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                            <span>Phone: <strong className="text-slate-900">+91 {pass.phone}</strong></span>
                            <span>•</span>
                            <span>Ticket ID: <strong className="text-[#0088FF] font-mono">{pass.ticketId}</strong></span>
                            <span>•</span>
                            <span>Gate Code (OTP): <strong className="text-rose-600 font-mono">{pass.otpCode}</strong></span>
                          </div>

                          <div className="text-[11px] text-slate-500">{pass.bookedAt}</div>
                        </div>
                      </div>

                      {/* PRICE & ACTION BUTTONS */}
                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-200 pt-3 md:pt-0">
                        <div className="text-left md:text-right mr-2">
                          <div className="text-base font-black text-slate-900">Total: ₹{pass.pricePaid}</div>
                          <span className="text-[10px] text-slate-500 font-medium">{pass.paymentMethod}</span>
                        </div>

                        {/* FULL VIEW DETAILS BUTTON (POINT #2) */}
                        <button
                          onClick={() => setSelectedStudentModal(pass)}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-xl transition-all border border-slate-300 cursor-pointer flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#0088FF]" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => {
                            const text = encodeURIComponent(`Hi ${pass.studentName}, your Ethos Studio Pass (${pass.ticketId}) for ${pass.eventTitle} is confirmed! Gate Code: ${pass.otpCode}`);
                            window.open(`https://wa.me/91${pass.phone}?text=${text}`, '_blank');
                          }}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Ticket</span>
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MONTHLY PACKAGES (WHITE THEME) */}
          {activeTab === 'PACKAGES' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-sm">
                <h3 className="text-xl font-black font-syne uppercase text-slate-900">MONTHLY PACKAGES &amp; STUDENT SUBSCRIBERS</h3>
                <p className="text-xs text-slate-500 font-medium">View active kids and adult monthly pass subscribers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="text-xs font-black uppercase text-[#0088FF]">FREE DEMO TRIAL PASS</div>
                  <div className="text-2xl font-black text-slate-900">₹0 <span className="text-xs text-slate-500 font-normal">/ 1 Session</span></div>
                  <button onClick={() => alert('Free Demo Trial settings updated!')} className="w-full py-2.5 bg-slate-100 text-slate-800 text-xs font-bold uppercase rounded-xl border border-slate-300">Manage Pass</button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="text-xs font-black uppercase text-[#0088FF]">KIDS MONTHLY MEMBERSHIP</div>
                  <div className="text-2xl font-black text-slate-900">₹2,000 <span className="text-xs text-slate-500 font-normal">/ Month</span></div>
                  <button onClick={() => alert('Kids Monthly Pass settings updated!')} className="w-full py-2.5 bg-slate-100 text-slate-800 text-xs font-bold uppercase rounded-xl border border-slate-300">Manage Pass</button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="text-xs font-black uppercase text-rose-600">ADULTS &amp; FITNESS MONTHLY PASS</div>
                  <div className="text-2xl font-black text-slate-900">₹2,500 <span className="text-xs text-slate-500 font-normal">/ Month</span></div>
                  <button onClick={() => alert('Adults Monthly Pass settings updated!')} className="w-full py-2.5 bg-slate-100 text-slate-800 text-xs font-bold uppercase rounded-xl border border-slate-300">Manage Pass</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WEBSITE CONTENT */}
          {activeTab === 'CONTENT' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-xl font-black font-syne uppercase text-slate-900">WEBSITE CONTENT &amp; ANNOUNCEMENTS</h3>
              <p className="text-xs text-slate-500 font-medium">Update hero notice text, studio phone numbers, and studio address shown across pages.</p>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Studio Announcement Banner</label>
                  <input type="text" defaultValue="🔥 Special 20% Off August Passes & Choreography Challenge" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Studio Contact Phone</label>
                  <input type="text" defaultValue="+91 83417 01113" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900" />
                </div>
                <button onClick={() => alert('Website Content Settings Saved!')} className="py-3 px-6 bg-[#0088FF] text-white font-black uppercase rounded-xl shadow-md">Save Changes</button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* 🌟 EXPANDED PUBLISH / EDIT WORKSHOP EVENT MODAL (POINT #4) 🌟 */}
      {editingEventModal && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-slate-900 shadow-2xl space-y-4 text-left relative">
            <button onClick={() => setEditingEventModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>

            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">EVENT PUBLISHING CONTROL</span>
              <h3 className="text-xl font-black font-syne uppercase text-slate-900">PUBLISH / EDIT WORKSHOP EVENT</h3>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* TITLE & ORGANISER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Name / Title *</label>
                  <input
                    type="text"
                    required
                    defaultValue={editingEventModal.title}
                    placeholder="e.g. CHIRANJEEVI TRIBUTE MASTERCLASS"
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organiser Name *</label>
                  <input
                    type="text"
                    defaultValue={editingEventModal.organiserName || 'Ethos Dance Studio Central'}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, organiserName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>
              </div>

              {/* CHOREOGRAPHER & DANCE STYLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dance Instructor / Master Choreographer *</label>
                  <input
                    type="text"
                    required
                    defaultValue={editingEventModal.guestChoreographer}
                    placeholder="e.g. SRIKANTH & MANIKANTA"
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, guestChoreographer: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dance Style / Category</label>
                  <select
                    defaultValue={editingEventModal.danceStyle || 'Bolly-Hop'}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, danceStyle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  >
                    <option value="Bolly-Hop">Bolly-Hop / Commercial</option>
                    <option value="Sangeet Fusion">Sangeet &amp; Flashmob Fusion</option>
                    <option value="Afro-Fusion">Afro-Fusion &amp; Isolations</option>
                    <option value="Heels Intensive">Urban Heels &amp; Confidence</option>
                    <option value="Hip-Hop">Hip-Hop &amp; Urban Choreography</option>
                  </select>
                </div>
              </div>

              {/* PRICING & TIERS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regular Ticket Price (₹) *</label>
                  <input
                    type="number"
                    required
                    defaultValue={editingEventModal.price}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, price: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Early Bird Tier Price (₹)</label>
                  <input
                    type="number"
                    defaultValue={editingEventModal.earlyBirdPrice || editingEventModal.price - 500}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, earlyBirdPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-amber-700 font-bold focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Open Passes / Capacity *</label>
                  <input
                    type="number"
                    defaultValue={editingEventModal.totalCapacity || 40}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, totalCapacity: Number(e.target.value), seatsLeft: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#0088FF]"
                  />
                </div>
              </div>

              {/* DATE, TIME & LOCATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date &amp; Time *</label>
                  <input
                    type="text"
                    defaultValue={editingEventModal.date || '28-08-2026 6:00 PM'}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Studio Venue Location</label>
                  <input
                    type="text"
                    defaultValue={editingEventModal.location || 'Ethos Studio, Kukatpally'}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>
              </div>

              {/* BANNER IMAGE URL */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Banner Image URL</label>
                <input
                  type="text"
                  defaultValue={editingEventModal.imageUrl}
                  placeholder="https://images.unsplash.com/photo-..."
                  onChange={(e) => setEditingEventModal({ ...editingEventModal, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              {/* DESCRIPTION & REQUIREMENTS */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Description &amp; Choreography Brief</label>
                <textarea
                  rows={2}
                  defaultValue={editingEventModal.description}
                  placeholder="Brief overview of workshop concept and routine..."
                  onChange={(e) => setEditingEventModal({ ...editingEventModal, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Attendee Requirements &amp; Guidelines</label>
                <input
                  type="text"
                  defaultValue={editingEventModal.requirements || 'Carry comfortable sneakers, towel & water bottle.'}
                  onChange={(e) => setEditingEventModal({ ...editingEventModal, requirements: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                />
              </div>

            </div>

            <button
              onClick={() => {
                if (editingEventModal.id) {
                  setEventsList(prev => prev.map(e => e.id === editingEventModal.id ? editingEventModal : e));
                } else {
                  const newEv = {
                    ...editingEventModal,
                    id: Date.now(),
                    status: 'LIVE',
                    seatsLeft: editingEventModal.totalCapacity || 40,
                    year: '2026',
                    month: 'AUG',
                    imageUrl: editingEventModal.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'
                  };
                  setEventsList(prev => [newEv, ...prev]);
                }
                setEditingEventModal(null);
                alert('Event Published Successfully!');
              }}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase rounded-xl shadow-lg cursor-pointer transition-all"
            >
              Save &amp; Publish Workshop Event
            </button>
          </div>
        </div>
      )}

      {/* 🌟 FULL STUDENT PASS SPECIFICATION & GATE QR CODE MODAL (POINT #2) 🌟 */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 text-left relative">
            <button onClick={() => setSelectedStudentModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>

            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-black uppercase text-[#0088FF] tracking-widest">PASS VERIFICATION SPECIFICATION</span>
              <h3 className="text-xl font-black font-syne text-slate-900 uppercase">{selectedStudentModal.studentName}</h3>
            </div>

            {/* FULL STUDENT DETAILS & GATE QR CODE (POINT #2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* DETAILS LIST */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs text-slate-700">
                <div>👤 Full Name: <strong className="text-slate-900">{selectedStudentModal.studentName}</strong></div>
                <div>🎂 Age / DOB: <strong className="text-slate-900">{selectedStudentModal.age || 24} Yrs ({selectedStudentModal.dob || '12 Oct 2002'})</strong></div>
                <div>📞 Mobile: <strong className="text-slate-900">+91 {selectedStudentModal.phone}</strong></div>
                <div>✉️ Email: <strong className="text-slate-900">{selectedStudentModal.email}</strong></div>
                <div>💳 Amount Paid: <strong className="text-emerald-600 font-bold">₹{selectedStudentModal.pricePaid}</strong></div>
                <div>🎟️ Ticket ID: <strong className="text-[#0088FF] font-mono">{selectedStudentModal.ticketId}</strong></div>
                <div>🔐 Gate OTP Code: <strong className="text-rose-600 font-mono font-bold text-sm">{selectedStudentModal.otpCode}</strong></div>
              </div>

              {/* GENERATED STUDIO GATE SCANNER QR CODE */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-2 bg-white rounded-xl shadow-md border border-slate-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(selectedStudentModal.ticketId + '-' + selectedStudentModal.otpCode)}`}
                    alt="Studio Gate QR Code"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <span className="text-[10px] font-black uppercase text-[#0088FF]">STUDIO GATE SCANNER QR</span>
                <span className="text-[10px] text-slate-500">Scan at entrance for instant check-in</span>
              </div>

            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold text-center">
              ✓ Gate OTP Code ({selectedStudentModal.otpCode}) validates student identity at Kukatpally studio entrance.
            </div>

            <button onClick={() => setSelectedStudentModal(null)} className="w-full py-3 bg-slate-900 text-white text-xs font-black uppercase rounded-xl cursor-pointer">
              Done &amp; Close Specification
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
