import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, ShieldAlert, ChevronRight, Eye, EyeOff, Clock, History, Filter, Users, PlusCircle, MapPin, Sparkles, Phone, HelpCircle, LogOut } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [mainTab, setMainTab] = useState('CURRENT_ORDERS'); // 'CURRENT_ORDERS', 'ONLINE_ORDERS', 'ADVANCE_ORDERS', 'PACKAGES', 'EVENTS', 'ROSTER'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'PENDING', 'READY', 'DISPATCHED', 'DELIVERED', 'CANCELLED'
  const [searchTerm, setSearchTerm] = useState('');
  const [billSearchTerm, setBillSearchTerm] = useState('');

  // Selected Order Detail Modal State
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Master Orders & Bookings Data (Structured like PetPooja POS / Order Management)
  const [ordersList, setOrdersList] = useState([
    {
      id: 1407,
      billNo: 'ETH-1407',
      otpCode: '8444',
      customerName: 'Rajkamal Pappula',
      phone: '8508767386',
      email: 'rajkamal@example.com',
      channel: 'Zomato | Website',
      itemTitle: 'Wedding Sangeet Flashmob Bootcamp',
      placedAt: '19:07 | 23 Aug',
      totalPrice: 1999,
      paymentMethod: 'Online UPI',
      status: 'DISPATCHED',
      statusText: 'Pass Dispatched',
      instructions: 'Please call customer upon arrival at Kukatpally studio.'
    },
    {
      id: 1405,
      billNo: 'ETH-1405',
      otpCode: '7598',
      customerName: 'Swaroop Gaddam',
      phone: '8511741602',
      email: 'swaroop@example.com',
      channel: 'Swiggy | App',
      itemTitle: 'Urban Heels & Confidence Intensive',
      placedAt: '16:23 | 23 Aug',
      totalPrice: 1299,
      paymentMethod: 'Online Card',
      status: 'READY',
      statusText: 'Pass Ready at Counter',
      instructions: 'Prefers front row mirror spot.'
    },
    {
      id: 1402,
      billNo: 'ETH-1402',
      otpCode: '7611',
      customerName: 'Sekhar V',
      phone: '8513335662',
      email: 'sekhar@example.com',
      channel: 'Ethos Direct',
      itemTitle: 'International Afro-Fusion Masterclass',
      placedAt: '14:56 | 23 Aug',
      totalPrice: 1499,
      paymentMethod: 'Razorpay UPI',
      status: 'DELIVERED',
      statusText: 'Pass Verified & Checked-In',
      instructions: 'Regular monthly subscriber.'
    },
    {
      id: 1397,
      billNo: 'ETH-1397',
      otpCode: '2199',
      customerName: 'Venkatesh K',
      phone: '8513676351',
      email: 'venkatesh@example.com',
      channel: 'Website Pass',
      itemTitle: 'Contemporary & Floorwork Workshop',
      placedAt: '13:41 | 23 Aug',
      totalPrice: 1299,
      paymentMethod: 'Online UPI',
      status: 'PENDING',
      statusText: 'Pending Gate Entry',
      instructions: 'WhatsApp ticket sent.'
    },
    {
      id: 1395,
      billNo: 'ETH-1395',
      otpCode: '5734',
      customerName: 'Azhar Mohammed',
      phone: '8488408794',
      email: 'azhar@example.com',
      channel: 'Zomato | Website',
      itemTitle: 'Hip-Hop & Urban Choreography Masterclass',
      placedAt: '13:38 | 23 Aug',
      totalPrice: 1399,
      paymentMethod: 'Online UPI',
      status: 'DELIVERED',
      statusText: 'Pass Verified & Checked-In',
      instructions: 'Demands HD video recording link.'
    }
  ]);

  // Read admin events & student bookings from localStorage dynamically
  useEffect(() => {
    try {
      const savedTickets = localStorage.getItem('ethos_master_event_tickets');
      if (savedTickets) {
        const parsed = JSON.parse(savedTickets);
        const mapped = parsed.map((t, idx) => ({
          id: 2000 + idx,
          billNo: `ETH-${t.mockCode || (1500 + idx)}`,
          otpCode: String(t.mockCode || '8821').slice(-4),
          customerName: t.personName || 'Shanmuka Gaddam',
          phone: t.personPhone || '8341701113',
          email: t.personEmail || 'shanmuka@gmail.com',
          channel: 'Ethos Direct',
          itemTitle: t.eventTitle || 'Masterclass Ticket Pass',
          placedAt: t.bookedAt || '23 Aug 2026',
          totalPrice: t.pricePaid || 1499,
          paymentMethod: t.paymentMethod || 'Razorpay UPI',
          status: 'DELIVERED',
          statusText: 'Verified & Confirmed Pass',
          instructions: 'Show QR code at gate.'
        }));
        setOrdersList(prev => {
          const combined = [...mapped, ...prev];
          const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
          return unique;
        });
      }
    } catch {}
  }, []);

  // Filter Orders based on main tab, status pills, and search inputs
  const filteredOrders = ordersList.filter(ord => {
    // Search Filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = ord.customerName.toLowerCase().includes(q);
      const matchPhone = ord.phone.includes(q);
      const matchItem = ord.itemTitle.toLowerCase().includes(q);
      const matchBill = ord.billNo.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchItem && !matchBill) return false;
    }

    if (billSearchTerm && !ord.billNo.toLowerCase().includes(billSearchTerm.toLowerCase())) {
      return false;
    }

    // Status Filter
    if (statusFilter !== 'ALL') {
      if (ord.status !== statusFilter) return false;
    }

    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-slate-900 font-sans select-none flex flex-col justify-between p-0 m-0 border-t border-white/10">
      
      {/* 🌟 1. E-COMMERCE / POS TOP HEADER BAR (MATCHING REFERENCE PHOTO 3, 4, 5) 🌟 */}
      <div className="bg-[#FFFFFF] border-b border-slate-200 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm sticky top-0 z-[100]">
        
        {/* BRAND & TITLE */}
        <div className="flex items-center gap-3">
          <img src={ethosPureLogo} alt="Ethos Logo" className="w-9 h-9 object-contain" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black font-syne uppercase text-slate-900 leading-none">
                ETHOS DANCE STUDIO
              </h2>
              <span className="px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-md tracking-wider">
                POS &amp; MANAGEMENT PLATFORM
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Kukatpally Studio Central • Real-Time Order Roster</span>
          </div>
        </div>

        {/* TOP QUICK SEARCH INPUTS */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Q Bill No..."
              value={billSearchTerm}
              onChange={(e) => setBillSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0088FF]"
            />
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Q Search student, phone, ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0088FF]"
            />
          </div>

          <button
            onClick={() => alert('New Order / Event Creator modal opened!')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-lg shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Order</span>
          </button>
        </div>

        {/* TOP ACTIONS & HELP DESK */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-extrabold text-[11px]">STUDIO LIVE</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-slate-600">
            <HelpCircle className="w-3.5 h-3.5 text-[#0088FF]" />
            <span className="text-[11px]">Help: <strong>07969 223344</strong></span>
          </div>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>

      {/* 🌟 2. MAIN CATEGORY NAVIGATION TABS (MATCHING REFERENCE PHOTO 3 & 4) 🌟 */}
      <div className="bg-[#FAF8F5] border-b border-slate-200 px-4 sm:px-8 pt-3 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setMainTab('CURRENT_ORDERS')}
          className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            mainTab === 'CURRENT_ORDERS'
              ? 'border-rose-600 text-rose-600 bg-white rounded-t-xl shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Current Orders ({ordersList.length})</span>
        </button>

        <button
          onClick={() => setMainTab('ONLINE_ORDERS')}
          className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            mainTab === 'ONLINE_ORDERS'
              ? 'border-rose-600 text-rose-600 bg-white rounded-t-xl shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Online Website Orders</span>
        </button>

        <button
          onClick={() => setMainTab('ADVANCE_ORDERS')}
          className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            mainTab === 'ADVANCE_ORDERS'
              ? 'border-rose-600 text-rose-600 bg-white rounded-t-xl shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#0088FF]" />
          <span>Advance Event Passes</span>
        </button>
      </div>

      {/* 🌟 3. STATUS FILTER PILLS BAR (MATCHING REFERENCE PHOTOS 3, 4, 5) 🌟 */}
      <div className="bg-[#FFFFFF] border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto text-xs">
        
        {/* STATUS PILLS */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">Filter Status:</span>
          
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] uppercase transition-all cursor-pointer ${
              statusFilter === 'ALL' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ● All ({ordersList.length})
          </button>

          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] uppercase transition-all cursor-pointer ${
              statusFilter === 'PENDING' ? 'bg-[#0088FF] text-white shadow-md' : 'bg-blue-50 text-[#0088FF] hover:bg-blue-100'
            }`}
          >
            ● Pending / New (1)
          </button>

          <button
            onClick={() => setStatusFilter('READY')}
            className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] uppercase transition-all cursor-pointer ${
              statusFilter === 'READY' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            ● Pass / Food Ready (1)
          </button>

          <button
            onClick={() => setStatusFilter('DELIVERED')}
            className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] uppercase transition-all cursor-pointer ${
              statusFilter === 'DELIVERED' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            ● Verified &amp; Active (2)
          </button>

          <button
            onClick={() => setStatusFilter('CANCELLED')}
            className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] uppercase transition-all cursor-pointer ${
              statusFilter === 'CANCELLED' ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            ● Cancelled (0)
          </button>
        </div>

        {/* SORT ORDER SELECTOR */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-500 font-bold uppercase">Sort By:</span>
          <select className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold py-1 px-3 rounded-lg focus:outline-none focus:border-[#0088FF] cursor-pointer">
            <option>Latest Date &amp; Time</option>
            <option>Highest Amount</option>
            <option>Customer Code</option>
          </select>
        </div>

      </div>

      {/* 🌟 4. ORDER ROWS LIST / CARDS GRID (MATCHING REFERENCE PHOTOS 3, 4, 5 EXACTLY) 🌟 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-1 space-y-4 text-left">
        
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-2">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 uppercase">No matching orders found</h3>
            <p className="text-xs text-slate-500 font-medium">Try adjusting your search criteria or status filter.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isPending = ord.status === 'PENDING';
            const isReady = ord.status === 'READY';
            const isDelivered = ord.status === 'DELIVERED';

            return (
              <div
                key={ord.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden ${
                  isDelivered
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isReady
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-blue-200 bg-blue-50/20'
                }`}
              >
                {/* STATUS BAR INDICATION STRIP */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  isDelivered ? 'bg-emerald-500' : isReady ? 'bg-amber-500' : 'bg-[#0088FF]'
                }`} />

                {/* LEFT SECTION: CUSTOMER & ORDER INFO (MATCHING PHOTO 3 & 5) */}
                <div className="flex items-start gap-4 pl-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <User className="w-5 h-5 text-[#0088FF]" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black uppercase rounded-md">
                        {ord.channel}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {ord.customerName}
                      </h4>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-900">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <strong>+91 {ord.phone}</strong>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span>Bill No: <strong className="text-[#0088FF] font-mono">{ord.billNo}</strong></span>
                      <span className="text-slate-400">•</span>
                      <span>OTP: <strong className="text-rose-600 font-mono">{ord.otpCode}</strong></span>
                      <span className="text-slate-400">•</span>
                      <span className="text-[11px] text-slate-500">Placed at: {ord.placedAt}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block mt-1">
                      📦 {ord.itemTitle}
                    </p>
                  </div>
                </div>

                {/* MIDDLE SECTION: STATUS & PRICE SUMMARY */}
                <div className="space-y-1 text-left md:text-center shrink-0 pl-2 md:pl-0">
                  <span className={`inline-block px-3 py-1 text-[10px] font-extrabold uppercase rounded-full shadow-sm ${
                    isDelivered
                      ? 'bg-emerald-600 text-white'
                      : isReady
                      ? 'bg-amber-500 text-white'
                      : 'bg-[#0088FF] text-white'
                  }`}>
                    {ord.statusText}
                  </span>

                  <div className="text-base font-black font-syne text-slate-900">
                    Total(₹): ₹{ord.totalPrice}.00
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Method: {ord.paymentMethod}
                  </span>
                </div>

                {/* RIGHT SECTION: ACTION BUTTONS GRID (MATCHING REFERENCE PHOTO 4 & 5 EXACTLY) */}
                <div className="grid grid-cols-2 gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <button
                    onClick={() => setSelectedOrderModal(ord)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-extrabold uppercase text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => {
                      const text = encodeURIComponent(`Hi ${ord.customerName}, regarding your Ethos Dance Studio booking (${ord.itemTitle})...`);
                      window.open(`https://wa.me/91${ord.phone}?text=${text}`, '_blank');
                    }}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-extrabold uppercase text-emerald-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chat Support</span>
                  </button>

                  <button
                    onClick={() => alert(`Pass Status for ${ord.customerName}: ${ord.statusText}`)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-extrabold uppercase text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5 text-rose-600" />
                    <span>Pass Status</span>
                  </button>

                  <button
                    onClick={() => {
                      setOrdersList(prev => prev.map(o => o.id === ord.id ? { ...o, status: 'DELIVERED', statusText: 'Verified & Active Pass' } : o));
                    }}
                    className="px-3.5 py-2 bg-[#0088FF] hover:bg-[#0077EE] text-white rounded-xl text-xs font-black uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Update Status</span>
                  </button>
                </div>

              </div>
            );
          })
        )}

      </main>

      {/* VIEW DETAILS MODAL */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-[220] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 text-left relative">
            <button onClick={() => setSelectedOrderModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0088FF]">ORDER SPECIFICATION</span>
              <h3 className="text-xl font-black font-syne text-slate-900 uppercase">{selectedOrderModal.billNo} • {selectedOrderModal.customerName}</h3>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div>• Purchased Item: <strong className="text-slate-900">{selectedOrderModal.itemTitle}</strong></div>
              <div>• Amount Paid: <strong className="text-emerald-600">₹{selectedOrderModal.totalPrice}</strong></div>
              <div>• Phone Contact: <strong className="text-slate-900">+91 {selectedOrderModal.phone}</strong></div>
              <div>• Email: <strong className="text-slate-900">{selectedOrderModal.email}</strong></div>
              <div>• OTP Gate Code: <strong className="text-rose-600 font-mono">{selectedOrderModal.otpCode}</strong></div>
              <div>• Special Instructions: <strong className="text-slate-700">{selectedOrderModal.instructions}</strong></div>
            </div>

            <button onClick={() => setSelectedOrderModal(null)} className="w-full py-3 bg-slate-900 text-white text-xs font-black uppercase rounded-xl cursor-pointer">
              Done &amp; Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
