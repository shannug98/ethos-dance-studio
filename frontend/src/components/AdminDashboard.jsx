import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, 
  ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, 
  Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, 
  ShieldAlert, ChevronRight, ChevronDown, Eye, EyeOff, Clock, History, Filter, Users, 
  PlusCircle, MapPin, Sparkles, Phone, HelpCircle, LogOut, Edit3, Trash2, QrCode, FileText, 
  Download, ArrowUpRight, ArrowLeft, Building2, Check
} from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [eventFilter, setEventFilter] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [rosterFilter, setRosterFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Timeframe Selector State (Matching Image 2 Dropdown)
  const [timeframeDropdownOpen, setTimeframeDropdownOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30_DAYS');
  const timeframeRef = useRef(null);

  const timeframeOptions = [
    { id: '7_DAYS', label: 'Last 7 days', revenue: '₹38,500.00', passes: 12, growth: '+12.5%' },
    { id: '14_DAYS', label: 'Last 14 days', revenue: '₹72,900.00', passes: 24, growth: '+15.2%' },
    { id: '30_DAYS', label: 'Last 30 days', revenue: '₹148,497.00', passes: 46, growth: '+18.4%' },
    { id: '3_MONTHS', label: 'Last 3 months', revenue: '₹425,000.00', passes: 128, growth: '+22.1%' }
  ];

  const activeTimeframeObj = timeframeOptions.find(t => t.id === selectedTimeframe) || timeframeOptions[2];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (timeframeRef.current && !timeframeRef.current.contains(e.target)) {
        setTimeframeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Selected Package Roster Modal State
  const [selectedPackageRoster, setSelectedPackageRoster] = useState(null); // 'KIDS' or 'ADULTS'

  // Trainer Applications State
  const [trainerApps, setTrainerApps] = useState([]);
  const [selectedTierForApproval, setSelectedTierForApproval] = useState('Silver');

  const loadTrainerApps = async () => {
    try {
      const res = await fetch(`http://localhost:5152/api/admin/trainers/applications`);
      if (res.ok) {
        const data = await res.json();
        setTrainerApps(data);
      }
    } catch {}
  };

  useEffect(() => {
    loadTrainerApps();
  }, []);

  // PDF Financial Report Export Modal & Statement State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [reportTimeframe, setReportTimeframe] = useState('CURRENT_MONTH');
  const [reportCategory, setReportCategory] = useState('ALL');
  const [customStartDate, setCustomStartDate] = useState('2026-08-01');
  const [customEndDate, setCustomEndDate] = useState('2026-08-31');

  // Selected Event & Attendee Pass Roster Modals
  const [selectedEventRoster, setSelectedEventRoster] = useState(null);
  const [editingEventModal, setEditingEventModal] = useState(null);
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Master Workshop Events List
  const [eventsList, setEventsList] = useState([
    {
      id: 201,
      title: 'Chiranjeevi Tribute Masterclass',
      guestChoreographer: 'Srikanth',
      organiserName: 'Ethos Dance Studio',
      eventDate: '2026-08-28',
      startTime: '05:00 PM',
      endTime: '06:30 PM',
      location: 'Ethos Studio, Kukatpally',
      tier1Price: 999,
      tier2Price: 1299,
      tier3Price: 1499,
      tier4Price: 1999,
      price: 1999,
      seatsLeft: 26,
      totalCapacity: 40,
      status: 'LIVE',
      year: '2026',
      month: 'AUG',
      imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
      description: 'High-energy mega tribute choreography to Chiranjeevi iconic commercial dance moves.'
    },
    {
      id: 202,
      title: 'Wedding Sangeet & Corporate Bootcamp',
      guestChoreographer: 'Manikanta & Srikanth',
      organiserName: 'Ethos Dance Studio',
      eventDate: '2026-08-29',
      startTime: '06:30 PM',
      endTime: '08:30 PM',
      location: 'Ethos Studio, Kukatpally',
      tier1Price: 1499,
      tier2Price: 1799,
      tier3Price: 1999,
      tier4Price: 2499,
      price: 2499,
      seatsLeft: 18,
      totalCapacity: 40,
      status: 'LIVE',
      year: '2026',
      month: 'AUG',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      description: 'Exclusive corporate team choreography & family event performance bootcamp.'
    },
    {
      id: 203,
      title: 'Afro-Fusion & Body Isolations',
      guestChoreographer: 'Guest Artist',
      organiserName: 'Ethos Dance Studio',
      eventDate: '2026-09-05',
      startTime: '04:00 PM',
      endTime: '05:30 PM',
      location: 'Ethos Studio, Kukatpally',
      tier1Price: 899,
      tier2Price: 1099,
      tier3Price: 1299,
      tier4Price: 1499,
      price: 1499,
      seatsLeft: 30,
      totalCapacity: 40,
      status: 'UPCOMING',
      year: '2026',
      month: 'SEP',
      imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=600&q=80',
      description: 'Rhythm, footwork, and body isolations masterclass.'
    }
  ]);

  // 18 TOTAL ENROLLED MONTHLY SUBSCRIBERS
  const [monthlySubscribers, setMonthlySubscribers] = useState([
    {
      id: 501,
      studentName: 'Aarav Sharma',
      studentCode: '8492',
      parentName: 'Suresh Sharma',
      phone: '9876543210',
      email: 'aarav@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_5PM',
      batchTiming: '05:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 2,
      passExpiryDate: '2026-09-15',
      paymentDate: '15:30 | 15 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 505,
      studentName: 'Kavya Patel',
      studentCode: '8495',
      parentName: 'Amit Patel',
      phone: '9876543212',
      email: 'kavya@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_5PM',
      batchTiming: '05:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 18,
      passExpiryDate: '2026-09-18',
      paymentDate: '11:20 | 18 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 504,
      studentName: 'Shanmuka Gaddam',
      studentCode: '1025',
      parentName: 'Self',
      phone: '8341701113',
      email: 'shanmuka@gmail.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_7PM',
      batchTiming: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 20,
      passExpiryDate: '2026-09-30',
      paymentDate: '19:00 | 23 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ]);

  // ATTENDEE PASSES
  const [attendeePasses, setAttendeePasses] = useState([
    {
      id: 101,
      ticketId: 'ETH-TKT-9921',
      studentName: 'Gaddam Shanmuka',
      phone: '8341701113',
      email: 'shanmukagaddam98@gmail.com',
      eventId: 201,
      eventTitle: 'Chiranjeevi Tribute Masterclass',
      ticketTier: 'VIP Front Row Pass',
      pricePaid: 1999,
      status: 'CONFIRMED',
      bookedAt: '14:22 | 23 Aug 2026',
      paymentMethod: 'Razorpay UPI'
    },
    {
      id: 102,
      ticketId: 'ETH-TKT-9922',
      studentName: 'Ananya Sharma',
      phone: '9876543210',
      email: 'ananya@example.com',
      eventId: 201,
      eventTitle: 'Chiranjeevi Tribute Masterclass',
      ticketTier: 'Standard Pass',
      pricePaid: 999,
      status: 'CONFIRMED',
      bookedAt: '16:05 | 24 Aug 2026',
      paymentMethod: 'Credit Card'
    },
    {
      id: 103,
      ticketId: 'ETH-TKT-9923',
      studentName: 'Vikram Reddy',
      phone: '9876543211',
      email: 'vikram@example.com',
      eventId: 202,
      eventTitle: 'Wedding Sangeet & Corporate Bootcamp',
      ticketTier: 'Full Duo Pass',
      pricePaid: 2499,
      status: 'CONFIRMED',
      bookedAt: '18:40 | 25 Aug 2026',
      paymentMethod: 'Razorpay UPI'
    }
  ]);

  const getStatementTransactions = () => {
    if (reportCategory === 'PACKAGES') {
      return monthlySubscribers.map(sub => ({
        date: sub.paymentDate,
        refId: `SUB-${sub.studentCode}`,
        name: sub.studentName,
        category: sub.packageName,
        mode: sub.paymentMode,
        amount: sub.pricePaid
      }));
    } else if (reportCategory === 'WORKSHOPS') {
      return attendeePasses.map(p => ({
        date: p.bookedAt,
        refId: p.ticketId,
        name: p.studentName,
        category: p.eventTitle,
        mode: p.paymentMethod,
        amount: p.pricePaid
      }));
    } else {
      const pkgRows = monthlySubscribers.map(sub => ({
        date: sub.paymentDate,
        refId: `SUB-${sub.studentCode}`,
        name: sub.studentName,
        category: sub.packageName,
        mode: sub.paymentMode,
        amount: sub.pricePaid
      }));
      const wrkRows = attendeePasses.map(p => ({
        date: p.bookedAt,
        refId: p.ticketId,
        name: p.studentName,
        category: p.eventTitle,
        mode: p.paymentMethod,
        amount: p.pricePaid
      }));
      return [...pkgRows, ...wrkRows];
    }
  };

  const statementRows = getStatementTransactions();
  const statementTotalRevenue = statementRows.reduce((sum, row) => sum + row.amount, 0);

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
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between p-0 m-0 select-none">
      
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 6mm 10mm; }
          html, body { background: #ffffff !important; color: #000000 !important; margin: 0 !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
        }
      `}</style>

      {/* 🌟 1. TOP SLEEK MONOCHROME HEADER BAR 🌟 */}
      <header className="bg-slate-950 text-white px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-[100] shadow-md font-sans print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold">
            <img src={ethosPureLogo} alt="Ethos Logo" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black uppercase text-white tracking-wider font-syne">
                Ethos Dance Studio
              </h2>
              <span className="px-2 py-0.5 bg-[#0088FF] text-white text-[9px] font-bold rounded-md uppercase">
                Admin Control Center
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Kukatpally Studio Central • Real-time Studio Management</span>
          </div>
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search student, phone, ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#0088FF] font-sans"
            />
          </div>

          <button
            onClick={() => setEditingEventModal({
              title: '',
              guestChoreographer: '',
              organiserName: 'Ethos Dance Studio Central',
              eventDate: '2026-08-28',
              startTime: '06:00 PM',
              endTime: '07:30 PM',
              location: 'Ethos Studio, Kukatpally',
              tier1Price: 999,
              tier2Price: 1299,
              tier3Price: 1499,
              tier4Price: 1999,
              price: 1999,
              danceStyle: 'Bolly-Hop',
              seatsLeft: 40,
              totalCapacity: 40,
              description: '',
              requirements: 'Wear comfortable sneakers & carry water bottle.',
              imageUrl: ''
            })}
            className="px-4 py-2 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0 font-sans"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Publish Event</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-white/15 shrink-0 font-sans"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* 🌟 2. MOBILE NAVIGATION SELECTOR 🌟 */}
      <div className="block md:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-xs font-sans print:hidden">
        <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Studio Navigation Menu</label>
        <select
          value={activeTab}
          onChange={(e) => { setActiveTab(e.target.value); setSelectedEventRoster(null); }}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
        >
          <option value="OVERVIEW">Dashboard Overview</option>
          <option value="TRAINERS">Trainer Applications ({trainerApps.length})</option>
          <option value="EVENTS">Events &amp; Masterclasses ({eventsList.length})</option>
          <option value="MASTER_WORKSHOP_ROSTER">Workshop Enrolled Roster ({attendeePasses.length})</option>
          <option value="PACKAGES">Monthly Packages ({monthlySubscribers.length})</option>
          <option value="CONTENT">Website Controls</option>
        </select>
      </div>

      {/* 🌟 3. MAIN WORKSPACE WITH DESKTOP SIDEBAR 🌟 */}
      <div className="flex-1 flex flex-col md:flex-row w-full font-sans print:hidden">
        
        {/* DESKTOP LEFT SIDEBAR (EXACT MATCH FOR IMAGE 1 & IMAGE 3 SIDEBAR) */}
        <aside className="hidden md:block w-64 bg-white border-r border-slate-200 p-4 space-y-2 shrink-0 font-sans print:hidden">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5 font-sans">
            STUDIO NAVIGATION
          </div>
          
          <button
            onClick={() => { setActiveTab('OVERVIEW'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'OVERVIEW'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('TRAINERS'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'TRAINERS'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4" />
              <span>Trainer Applications</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              activeTab === 'TRAINERS' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
            }`}>
              {trainerApps.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('EVENTS'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'EVENTS'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span>Events &amp; Masterclasses</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              activeTab === 'EVENTS' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
            }`}>
              {eventsList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('MASTER_WORKSHOP_ROSTER'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'MASTER_WORKSHOP_ROSTER'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-4 h-4" />
              <span>Workshop Enrolled Roster</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              activeTab === 'MASTER_WORKSHOP_ROSTER' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {attendeePasses.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('PACKAGES'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'PACKAGES'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4" />
              <span>Monthly Packages</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              activeTab === 'PACKAGES' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
            }`}>
              {monthlySubscribers.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('CONTENT'); setSelectedEventRoster(null); }}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer font-sans ${
              activeTab === 'CONTENT'
                ? 'bg-[#0088FF] text-white shadow-md font-black'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Website Controls</span>
            </div>
          </button>
        </aside>

        {/* RIGHT MAIN VIEW WORKSPACE */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto text-left font-sans print:hidden">
          
          {/* 🌟 OVERVIEW TAB 🌟 */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8">
              
              {/* TOP HEADER WITH TIMEFRAME DROPDOWN (MATCHING IMAGE 2 EXACTLY) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black font-syne text-slate-900 tracking-tight">Overview</h1>
                  <p className="text-xs text-slate-500 font-medium">Real-time studio analytics, revenue metrics, and enrollment data.</p>
                </div>

                {/* TIMEFRAME SELECTOR DROPDOWN */}
                <div className="relative" ref={timeframeRef}>
                  <button
                    onClick={() => setTimeframeDropdownOpen(!timeframeDropdownOpen)}
                    className="px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{activeTimeframeObj.label}</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </button>

                  {timeframeDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 space-y-1 text-xs font-medium text-slate-800 animate-fadeIn">
                      {timeframeOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelectedTimeframe(option.id);
                            setTimeframeDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 rounded-xl text-left flex items-center justify-between cursor-pointer transition-colors ${
                            selectedTimeframe === option.id
                              ? 'bg-slate-100 font-bold text-[#0088FF]'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <span>{option.label}</span>
                          {selectedTimeframe === option.id && <Check className="w-4 h-4 text-[#0088FF]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* STATS METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div
                  onClick={() => setIsPdfModalOpen(true)}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#0088FF] transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Period Revenue</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-syne">{activeTimeframeObj.revenue}</div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {activeTimeframeObj.growth} growth ({activeTimeframeObj.label})
                  </span>
                </div>

                <div
                  onClick={() => { setActiveTab('MASTER_WORKSHOP_ROSTER'); setSelectedEventRoster(null); }}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#0088FF] transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Workshop Passes Sold</span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0088FF] flex items-center justify-center">
                      <Ticket className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-syne">{activeTimeframeObj.passes} Passes</div>
                  <span className="text-xs text-[#0088FF] font-bold">Click to view enrolled attendees roster →</span>
                </div>

                <div
                  onClick={() => { setActiveTab('PACKAGES'); setSelectedEventRoster(null); }}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#0088FF] transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Active Monthly Members</span>
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-syne">{monthlySubscribers.length} Students</div>
                  <span className="text-xs text-purple-600 font-bold">Click to view subscriber batch cards →</span>
                </div>

                <div
                  onClick={() => { setActiveTab('EVENTS'); setSelectedEventRoster(eventsList[1]); }}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Corporate &amp; Family Events</span>
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-syne">5 Bookings</div>
                  <span className="text-xs text-amber-600 font-bold">Click to view corporate bootcamp roster →</span>
                </div>

              </div>

              {/* STATEMENT EXPORTER CARD */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black font-syne uppercase text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#0088FF]" />
                      <span>Official Ethos Bank Statement &amp; PDF Exporter</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Generate official Union Bank / Passbook style financial audit statements for your studio.</p>
                  </div>

                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="px-6 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Bank Statement</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* 🌟 TRAINER APPLICATIONS TAB 🌟 */}
          {activeTab === 'TRAINERS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h1 className="text-2xl font-black font-syne uppercase text-slate-900">Trainer Applications &amp; Tier Approval</h1>
                  <p className="text-xs text-slate-500 font-medium">Review dance audition videos, assign Silver/Gold/Diamond tiers, and set up WhatsApp credentials.</p>
                </div>
                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                  {trainerApps.length} Pending Applications
                </span>
              </div>

              {trainerApps.length === 0 ? (
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center text-slate-500 text-xs font-medium space-y-2">
                  <Award className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="font-bold text-slate-700">No pending trainer applications.</p>
                  <p>When choreographers register via the Trainer Portal, their applications will appear here for Admin review.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {trainerApps.map(p => (
                    <div key={p.id} className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#0088FF]">Trainer Code: {p.trainerCode}</span>
                          <h3 className="text-lg font-black font-syne text-slate-900">{p.fullName}</h3>
                          <p className="text-xs text-slate-500 font-medium">{p.email} • {p.phone} • {p.city}</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">
                          Status: {p.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Style</span>
                          <span className="font-bold text-slate-900">{p.primaryDanceStyle}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Teaching Experience</span>
                          <span className="font-bold text-slate-900">{p.experienceYears} Years</span>
                        </div>
                      </div>

                      {/* APPROVAL FORM */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <h4 className="text-xs font-bold uppercase text-slate-700">Approve &amp; Assign Trainer Tier &amp; Password</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Assign Tier</label>
                            <select
                              value={selectedTierForApproval}
                              onChange={(e) => setSelectedTierForApproval(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                            >
                              <option value="Silver">Silver Tier (₹1,999/mo - 2 Workshops)</option>
                              <option value="Gold">Gold Tier (₹3,999/mo - 5 Workshops)</option>
                              <option value="Diamond">Diamond Tier (₹6,999/mo - Unlimited)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Set Password for Trainer</label>
                            <input
                              type="text"
                              id={`pass_input_${p.id}`}
                              defaultValue="Ethos#2026"
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={async () => {
                              const passwordInput = document.getElementById(`pass_input_${p.id}`)?.value || 'Ethos#2026';
                              const res = await fetch(`http://localhost:5152/api/admin/trainers/applications/${p.id}/approve`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ tier: selectedTierForApproval, password: passwordInput, notes: 'Approved by Ethos Admin.' })
                              });
                              alert(`🎉 Trainer Approved!\n\nCredentials Dispatched via WhatsApp to +${p.phone}:\n📱 Trainer Code: ${p.trainerCode}\n🔒 Password: ${passwordInput}\n🏆 Tier: ${selectedTierForApproval}`);
                              loadTrainerApps();
                            }}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-4 h-4" /> Approve &amp; Send Credentials via WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 🌟 EVENTS TAB 🌟 */}
          {activeTab === 'EVENTS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h1 className="text-2xl font-black font-syne uppercase text-slate-900">Events &amp; Masterclasses Catalog</h1>
                  <p className="text-xs text-slate-500 font-medium">Manage studio workshops, pricing tiers, and capacity.</p>
                </div>
                <button
                  onClick={() => setEditingEventModal({
                    title: '',
                    guestChoreographer: '',
                    organiserName: 'Ethos Dance Studio Central',
                    eventDate: '2026-08-28',
                    startTime: '06:00 PM',
                    endTime: '07:30 PM',
                    location: 'Ethos Studio, Kukatpally',
                    tier1Price: 999,
                    tier2Price: 1299,
                    tier3Price: 1499,
                    tier4Price: 1999,
                    price: 1999,
                    danceStyle: 'Bolly-Hop',
                    seatsLeft: 40,
                    totalCapacity: 40,
                    description: '',
                    requirements: 'Wear comfortable sneakers & carry water bottle.',
                    imageUrl: ''
                  })}
                  className="px-4 py-2 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  + New Masterclass
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {eventsList.map(ev => (
                  <div key={ev.id} className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all space-y-3">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-40 object-cover" />
                    <div className="p-5 space-y-2">
                      <span className="px-3 py-1 bg-blue-50 text-[#0088FF] text-[10px] font-bold rounded-full uppercase">
                        {ev.status}
                      </span>
                      <h4 className="text-base font-black font-syne text-slate-900">{ev.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{ev.guestChoreographer} • {ev.eventDate} ({ev.startTime})</p>
                      <div className="pt-2 flex items-center justify-between text-xs font-bold border-t border-slate-100">
                        <span className="text-[#0088FF]">₹{ev.price}</span>
                        <span className="text-slate-600">{ev.seatsLeft} Seats Left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🌟 ROSTER TAB 🌟 */}
          {activeTab === 'MASTER_WORKSHOP_ROSTER' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-black font-syne uppercase text-slate-900">Workshop Enrolled Roster</h1>
                <p className="text-xs text-slate-500 font-medium">View all confirmed student workshop passes and ticket IDs.</p>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs font-medium text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Phone / Email</th>
                      <th className="p-4">Event Title</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attendeePasses.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-[#0088FF]">{p.ticketId}</td>
                        <td className="p-4 font-bold text-slate-900">{p.studentName}</td>
                        <td className="p-4">{p.phone} • {p.email}</td>
                        <td className="p-4 font-bold">{p.eventTitle}</td>
                        <td className="p-4 font-bold text-emerald-600">₹{p.pricePaid}</td>
                        <td className="p-4"><span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 🌟 PACKAGES TAB 🌟 */}
          {activeTab === 'PACKAGES' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-black font-syne uppercase text-slate-900">Monthly Dance Packages &amp; Subscribers</h1>
                <p className="text-xs text-slate-500 font-medium">Manage regular kids and adults batch passes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {monthlySubscribers.map(sub => (
                  <div key={sub.id} className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-3">
                      <img src={sub.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm font-syne">{sub.studentName}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{sub.phone} • Code: {sub.studentCode}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-xs font-medium flex justify-between">
                      <span className="text-slate-500">{sub.packageName}</span>
                      <span className="font-bold text-[#0088FF]">₹{sub.pricePaid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* PDF BANK STATEMENT EXPORT MODAL */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 space-y-6 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black font-syne uppercase">Generate Financial Statement PDF</h3>
              <button onClick={() => setIsPdfModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Timeframe</label>
                <select
                  value={reportTimeframe}
                  onChange={(e) => setReportTimeframe(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  <option value="CURRENT_MONTH">Current Month (August 2026)</option>
                  <option value="LAST_MONTH">Previous Month (July 2026)</option>
                  <option value="ALL_TIME">All Time History</option>
                </select>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Statement Revenue Summary</span>
                <p className="text-xl font-black font-syne">₹{statementTotalRevenue.toLocaleString('en-IN')}.00</p>
                <p className="text-[10px]">Total {statementRows.length} transactions included in report.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsPdfModalOpen(false);
                }}
                className="px-6 py-2.5 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download / Print Statement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
