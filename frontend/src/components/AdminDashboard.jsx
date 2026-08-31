import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2, Calendar, User, Star, Upload, MessageCircle, AlertTriangle, Image as ImageIcon, Ticket, Award, TrendingUp, CreditCard, LayoutDashboard, Layers, ShieldAlert, ChevronRight, Eye, EyeOff, Clock, History, Filter, Users, PlusCircle, MapPin, Sparkles, Phone, HelpCircle, LogOut, Edit3, Trash2, QrCode, FileText, Download, ArrowUpRight, ArrowLeft, Building2 } from 'lucide-react';
import ethosPureLogo from '../assets/ethos_pure_logo.png';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [eventFilter, setEventFilter] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [rosterFilter, setRosterFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

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

  // 18 TOTAL ENROLLED MONTHLY SUBSCRIBERS (EXACTLY MATCHES DASHBOARD STATS - 9 KIDS + 9 ADULTS)
  const [monthlySubscribers, setMonthlySubscribers] = useState([
    // KIDS 5:00 PM BATCH (4 STUDENTS)
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
      id: 511,
      studentName: 'Vivaan Mehta',
      studentCode: '8498',
      parentName: 'Rajesh Mehta',
      phone: '9876543220',
      email: 'vivaan@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_5PM',
      batchTiming: '05:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 3,
      passExpiryDate: '2026-09-12',
      paymentDate: '14:00 | 12 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 512,
      studentName: 'Diya Rao',
      studentCode: '8499',
      parentName: 'Praveen Rao',
      phone: '9876543221',
      email: 'diya@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_5PM',
      batchTiming: '05:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 14,
      passExpiryDate: '2026-09-22',
      paymentDate: '16:45 | 22 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },

    // KIDS 6:00 PM BATCH (5 STUDENTS)
    {
      id: 502,
      studentName: 'Ananya Reddy',
      studentCode: '8493',
      parentName: 'Ramesh Reddy',
      phone: '9876543211',
      email: 'ananya@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_6PM',
      batchTiming: '06:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 1,
      passExpiryDate: '2026-09-20',
      paymentDate: '17:10 | 20 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 506,
      studentName: 'Reyansh Kumar',
      studentCode: '8496',
      parentName: 'Vikram Kumar',
      phone: '9876543214',
      email: 'reyansh@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_6PM',
      batchTiming: '06:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 15,
      passExpiryDate: '2026-09-22',
      paymentDate: '18:00 | 22 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 507,
      studentName: 'Myra Joshi',
      studentCode: '8497',
      parentName: 'Sanjay Joshi',
      phone: '9876543215',
      email: 'myra@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_6PM',
      batchTiming: '06:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 20,
      passExpiryDate: '2026-09-25',
      paymentDate: '10:15 | 25 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 513,
      studentName: 'Kabir Varma',
      studentCode: '8500',
      parentName: 'Sunil Varma',
      phone: '9876543222',
      email: 'kabir@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_6PM',
      batchTiming: '06:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 4,
      passExpiryDate: '2026-09-14',
      paymentDate: '12:30 | 14 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 514,
      studentName: 'Ira Kulkarni',
      studentCode: '8501',
      parentName: 'Mahesh Kulkarni',
      phone: '9876543223',
      email: 'ira@example.com',
      packageType: 'KIDS',
      packageName: 'Kids Monthly Pass (4-12 Yrs)',
      batchSlotKey: 'KIDS_6PM',
      batchTiming: '06:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 16,
      passExpiryDate: '2026-09-24',
      paymentDate: '15:10 | 24 Aug 2026',
      pricePaid: 2000,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
    },

    // ADULTS 07:30 AM MORNING BATCH (4 STUDENTS)
    {
      id: 503,
      studentName: 'Rohan Verma',
      studentCode: '8821',
      parentName: 'Self',
      phone: '9811122334',
      email: 'rohan@example.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_730AM',
      batchTiming: '07:30 AM Morning Batch (Mon-Fri)',
      classesLeft: 3,
      passExpiryDate: '2026-09-25',
      paymentDate: '09:20 | 25 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 508,
      studentName: 'Priya Nair',
      studentCode: '8822',
      parentName: 'Self',
      phone: '9811122335',
      email: 'priya@example.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_730AM',
      batchTiming: '07:30 AM Morning Batch (Mon-Fri)',
      classesLeft: 14,
      passExpiryDate: '2026-09-26',
      paymentDate: '08:15 | 26 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 515,
      studentName: 'Aditya Roy',
      studentCode: '8823',
      parentName: 'Self',
      phone: '9811122336',
      email: 'aditya@example.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_730AM',
      batchTiming: '07:30 AM Morning Batch (Mon-Fri)',
      classesLeft: 2,
      passExpiryDate: '2026-09-10',
      paymentDate: '07:45 | 10 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 516,
      studentName: 'Sneha Chawla',
      studentCode: '8824',
      parentName: 'Self',
      phone: '9811122337',
      email: 'sneha@example.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_730AM',
      batchTiming: '07:30 AM Morning Batch (Mon-Fri)',
      classesLeft: 17,
      passExpiryDate: '2026-09-27',
      paymentDate: '07:30 | 27 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    },

    // ADULTS 07:00 PM EVENING BATCH (5 STUDENTS)
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
    },
    {
      id: 509,
      studentName: 'Vikram Malhotra',
      studentCode: '1026',
      parentName: 'Self',
      phone: '8341701114',
      email: 'vikram@gmail.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_7PM',
      batchTiming: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 2,
      passExpiryDate: '2026-09-28',
      paymentDate: '18:40 | 28 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 510,
      studentName: 'Neha Kapoor',
      studentCode: '1027',
      parentName: 'Self',
      phone: '8341701115',
      email: 'neha@gmail.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_7PM',
      batchTiming: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 19,
      passExpiryDate: '2026-09-29',
      paymentDate: '19:15 | 29 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 517,
      studentName: 'Arjun Nambiar',
      studentCode: '1028',
      parentName: 'Self',
      phone: '8341701116',
      email: 'arjun@gmail.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_7PM',
      batchTiming: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 1,
      passExpiryDate: '2026-09-11',
      paymentDate: '19:30 | 11 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Razorpay UPI',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 518,
      studentName: 'Meera Deshmukh',
      studentCode: '1029',
      parentName: 'Self',
      phone: '8341701117',
      email: 'meera@gmail.com',
      packageType: 'ADULTS',
      packageName: 'Adults & Fitness Pass',
      batchSlotKey: 'ADULTS_7PM',
      batchTiming: '07:00 PM Evening Batch (Mon-Fri)',
      classesLeft: 15,
      passExpiryDate: '2026-09-21',
      paymentDate: '19:45 | 21 Aug 2026',
      pricePaid: 2500,
      paymentMode: 'Online Card',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    }
  ]);

  // Master Workshop Enrolled Attendee Roster
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
      eventTitle: 'Wedding Sangeet & Corporate Bootcamp',
      bookedAt: '19:07 | 23 Aug 2026',
      pricePaid: 2499,
      paymentMethod: 'Razorpay UPI',
      status: 'CONFIRMED',
      statusText: 'Pass Confirmed & Dispatched'
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
      eventTitle: 'Wedding Sangeet & Corporate Bootcamp',
      bookedAt: '16:23 | 23 Aug 2026',
      pricePaid: 2499,
      paymentMethod: 'Online Card',
      status: 'CHECKED_IN',
      statusText: 'Checked-In at Studio Gate'
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
      eventTitle: 'Chiranjeevi Tribute Masterclass',
      bookedAt: '14:56 | 21 Aug 2026',
      pricePaid: 1999,
      paymentMethod: 'Razorpay UPI',
      status: 'CHECKED_IN',
      statusText: 'Checked-In at Studio Gate'
    }
  ]);

  // Send WhatsApp Renewal Reminder Message
  const handleSendWhatsappRenewalReminder = (student) => {
    const recipient = student.parentName !== 'Self' ? student.parentName : student.studentName;
    const text = encodeURIComponent(
      `🔔 *ETHOS DANCE STUDIO — PASS RENEWAL REMINDER*\n\n` +
      `Hi ${recipient},\n` +
      `This is a gentle reminder that *${student.studentName}*'s ${student.packageName} is due for renewal soon!\n\n` +
      `📌 *Remaining Classes:* ${student.classesLeft} Classes Left\n` +
      `📌 *Batch Time Slot:* ${student.batchTiming}\n` +
      `📌 *Pass Expiry Date:* ${student.passExpiryDate}\n\n` +
      `Please renew your monthly pass to reserve your batch seat. Contact Ethos Studio at +91 83417 01113.`
    );
    window.open(`https://wa.me/91${student.phone}?text=${text}`, '_blank');
  };

  // DYNAMIC FILTERING FOR STATEMENT LEDGER
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
    } else if (reportCategory === 'SANGEET') {
      return attendeePasses.filter(p => p.eventTitle.includes('Sangeet') || p.eventTitle.includes('Corporate')).map(p => ({
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

  // Device File Upload
  const handleDeviceFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingEventModal(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Filtered Roster
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
      
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 10mm;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>

      {/* 🌟 1. TOP STUDIO HEADER BAR 🌟 */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-[100] shadow-sm font-sans print:hidden">
        <div className="flex items-center gap-3">
          <img src={ethosPureLogo} alt="Ethos Logo" className="w-8 h-8 object-contain" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans">
                Ethos Dance Studio
              </h2>
              <span className="px-2 py-0.5 bg-[#0088FF] text-white text-[9px] font-bold rounded-md font-sans">
                Admin Control Center
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Kukatpally Studio Central • Real-time Financials &amp; Roster</span>
          </div>
        </div>

        {/* SEARCH & ACTION BUTTONS */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search student, phone, ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0088FF] font-sans"
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
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1 shrink-0 font-sans"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Publish Event</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-slate-300 shrink-0 font-sans"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* 📱 2. MOBILE NAVIGATION DROPDOWN 📱 */}
      <div className="block md:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-xs font-sans print:hidden">
        <label className="text-[10px] font-bold text-slate-400 block mb-1">Studio Navigation Menu</label>
        <select
          value={activeTab}
          onChange={(e) => { setActiveTab(e.target.value); setSelectedEventRoster(null); }}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0088FF]"
        >
          <option value="OVERVIEW">📊 Dashboard Overview</option>
          <option value="TRAINERS">🕺 Trainer Applications & Tiers ({trainerApps.length})</option>
          <option value="EVENTS">📅 Events &amp; Workshops ({eventsList.length})</option>
          <option value="MASTER_WORKSHOP_ROSTER">🎫 Workshop Attendees Roster ({attendeePasses.length})</option>
          <option value="PACKAGES">💳 Monthly Packages ({monthlySubscribers.length})</option>
          <option value="CONTENT">⚙️ Website Controls</option>
        </select>
      </div>

      {/* 🌟 3. MAIN APP LAYOUT 🌟 */}
      <div className="flex-1 flex flex-col md:flex-row w-full font-sans print:hidden">
        
        {/* DESKTOP LEFT NAVIGATION SIDEBAR */}
        <aside className="hidden md:block w-60 bg-white border-r border-slate-200 p-4 space-y-1.5 shrink-0 font-sans print:hidden">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Studio Navigation</div>
          
          <button
            onClick={() => { setActiveTab('OVERVIEW'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'OVERVIEW' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => { setActiveTab('TRAINERS'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'TRAINERS' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Trainer Applications</span>
            <span className="ml-auto bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-[10px]">{trainerApps.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('EVENTS'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'EVENTS' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events &amp; Masterclasses</span>
            <span className="ml-auto bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">{eventsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('MASTER_WORKSHOP_ROSTER'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'MASTER_WORKSHOP_ROSTER' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Workshop Enrolled Roster</span>
            <span className="ml-auto bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">{attendeePasses.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('PACKAGES'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'PACKAGES' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Monthly Packages</span>
            <span className="ml-auto bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">{monthlySubscribers.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('CONTENT'); setSelectedEventRoster(null); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'CONTENT' ? 'bg-[#0088FF] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website Controls</span>
          </button>
        </aside>

        {/* RIGHT CONTENT WORKSPACE */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto text-left font-sans print:hidden">
          
          {/* TAB 0: DASHBOARD OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setIsPdfModalOpen(true)}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 hover:border-[#0088FF]"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Current Month Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">₹48,497.00</div>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% vs last month (Aug 2026)
                  </span>
                </div>

                <div
                  onClick={() => { setActiveTab('MASTER_WORKSHOP_ROSTER'); setSelectedEventRoster(null); }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 hover:border-rose-500"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Workshop Passes Sold</span>
                    <Ticket className="w-4 h-4 text-[#0088FF]" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">46 Passes</div>
                  <span className="text-[11px] text-rose-600 font-bold flex items-center gap-1">
                    👉 Click to view enrolled attendees roster →
                  </span>
                </div>

                {/* EXACTLY 18 ACTIVE MONTHLY MEMBERS MATCHES MONTHLY SUBSCRIBERS COUNT */}
                <div
                  onClick={() => { setActiveTab('PACKAGES'); setSelectedEventRoster(null); }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 hover:border-blue-500"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Active Monthly Members</span>
                    <Users className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{monthlySubscribers.length} Students</div>
                  <span className="text-[11px] text-[#0088FF] font-bold flex items-center gap-1">
                    👉 Click to view all 18 subscriber batch cards →
                  </span>
                </div>

                <div
                  onClick={() => { setActiveTab('EVENTS'); setSelectedEventRoster(eventsList[1]); }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 hover:border-amber-500"
                >
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                    <span>Corporate &amp; Family Events</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">5 Bookings</div>
                  <span className="text-[11px] text-amber-700 font-bold flex items-center gap-1">
                    👉 Click to view corporate bootcamp roster →
                  </span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#0088FF]" />
                      <span>Official Ethos Bank Statement &amp; PDF Exporter</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Generate official Union Bank / Passbook style financial audit statements for your studio.</p>
                  </div>

                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="px-5 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Bank Statement</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: WORKSHOP EVENTS CATALOG */}
          {activeTab === 'EVENTS' && !selectedEventRoster && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Events &amp; Masterclasses Catalog ({filteredEvents.length} Events Listed)
                    </h3>
                    <p className="text-xs text-slate-500">Filter past, live, and upcoming events from 2024 to 2026 by year &amp; month dropdowns.</p>
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
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Publish Event</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEvents.map(ev => (
                  <div key={ev.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="relative h-32 w-full bg-slate-100">
                      <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/30" />
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded-full shadow-sm ${
                        ev.status === 'LIVE' ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#0088FF] text-white'
                      }`}>
                        ● {ev.status} ({ev.year})
                      </span>
                    </div>

                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight line-clamp-2">
                          {ev.title}
                        </h4>
                        <div className="text-[11px] space-y-0.5 text-slate-600">
                          <div>📅 <strong>{ev.eventDate || '28 Aug'} • {ev.startTime || '6 PM'}</strong></div>
                          <div>👤 By: <strong className="text-[#0088FF]">{ev.guestChoreographer}</strong></div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedEventRoster(ev)}
                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View Attendee Passes →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MASTER WORKSHOP ATTENDEE ROSTER */}
          {(activeTab === 'MASTER_WORKSHOP_ROSTER' || (activeTab === 'EVENTS' && selectedEventRoster)) && (
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div>
                  <button
                    onClick={() => { setSelectedEventRoster(null); setActiveTab('OVERVIEW'); }}
                    className="text-xs font-bold text-[#0088FF] hover:underline flex items-center gap-1.5 mb-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Admin Dashboard</span>
                  </button>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedEventRoster ? selectedEventRoster.title : 'Master Workshop Enrolled Attendees Roster'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Viewing {eventPassRoster.length} enrolled attendee passes across workshop masterclasses.</p>
                </div>
              </div>

              <div className="space-y-3">
                {eventPassRoster.map(pass => (
                  <div key={pass.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF] shrink-0 font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{pass.studentName}</h4>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold rounded-md">
                            {pass.statusText}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                          <span>Phone: <strong>+91 {pass.phone}</strong></span>
                          <span>•</span>
                          <span>Ticket ID: <strong className="text-[#0088FF] font-mono">{pass.ticketId}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStudentModal(pass)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0088FF]" />
                      <span>View Details</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🌟 TAB 3: MONTHLY PACKAGES & ALL 18 ENROLLED SUBSCRIBERS WITH WHATSAPP REMINDER BUTTON ON EVERY CARD 🌟 */}
          {activeTab === 'PACKAGES' && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Monthly Packages &amp; Enrolled Batch Roster ({monthlySubscribers.length} Active Members)</h3>
                <p className="text-xs text-slate-500">Click on Kids or Adults pass below to view enrolled students with instant WhatsApp pass renewal reminder buttons.</p>
              </div>

              {/* MONTHLY PASS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedPackageRoster('KIDS')}
                  className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 ${
                    selectedPackageRoster === 'KIDS' ? 'border-[#0088FF] ring-2 ring-[#0088FF]/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0088FF]">KIDS MONTHLY MEMBERSHIP (4-12 YRS)</span>
                    <span className="text-xs font-bold bg-blue-50 text-[#0088FF] px-2.5 py-0.5 rounded-full">
                      {monthlySubscribers.filter(s => s.packageType === 'KIDS').length} Students Enrolled
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-slate-900">₹2,000 <span className="text-xs text-slate-500 font-normal">/ Month</span></div>
                  <p className="text-xs text-slate-600">Mon-Fri Kids Batches (Choice of 05:00 PM or 06:00 PM Slot).</p>
                  
                  <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300">
                    View 9 Enrolled Kids Batch Rosters →
                  </button>
                </div>

                <div
                  onClick={() => setSelectedPackageRoster('ADULTS')}
                  className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 ${
                    selectedPackageRoster === 'ADULTS' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600">ADULTS &amp; FITNESS MONTHLY PASS</span>
                    <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full">
                      {monthlySubscribers.filter(s => s.packageType === 'ADULTS').length} Students Enrolled
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-slate-900">₹2,500 <span className="text-xs text-slate-500 font-normal">/ Month</span></div>
                  <p className="text-xs text-slate-600">Mon-Fri Adults Batches (Morning 07:30 AM &amp; Evening 07:00 PM Slots).</p>
                  
                  <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300">
                    View 9 Enrolled Adults Batch Rosters →
                  </button>
                </div>
              </div>

              {/* 📦 ENROLLED BATCH SLOT CARDS WITH WHATSAPP RENEWAL REMINDER BUTTON ON EVERY STUDENT CARD 📦 */}
              {selectedPackageRoster && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 pt-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Enrolled Student Batch Lists — {selectedPackageRoster === 'KIDS' ? 'Kids Monthly Membership' : 'Adults Monthly Pass'} ({monthlySubscribers.filter(s => s.packageType === selectedPackageRoster).length} Students)
                      </h4>
                      <p className="text-xs text-slate-500">Showing all enrolled students with direct WhatsApp pass renewal reminder buttons.</p>
                    </div>

                    <button onClick={() => setSelectedPackageRoster(null)} className="text-xs text-slate-500 hover:text-slate-900 font-bold">
                      Close Roster ✕
                    </button>
                  </div>

                  {/* KIDS BATCH SLOTS (05:00 PM BATCH & 06:00 PM BATCH) */}
                  {selectedPackageRoster === 'KIDS' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* BATCH SLOT CARD 1: 05:00 PM EVENING BATCH */}
                      <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                          <span className="font-bold text-xs text-[#0088FF] uppercase flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#0088FF]" />
                            <span>⏰ 05:00 PM Evening Batch (Mon-Fri)</span>
                          </span>
                          <span className="bg-[#0088FF] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {monthlySubscribers.filter(s => s.batchSlotKey === 'KIDS_5PM').length} Students Enrolled
                          </span>
                        </div>

                        <div className="space-y-3">
                          {monthlySubscribers.filter(s => s.batchSlotKey === 'KIDS_5PM').map(student => (
                            <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-xs hover:border-[#0088FF] transition-all">
                              <div className="flex items-start gap-3">
                                <img src={student.avatarUrl} alt={student.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-[#0088FF] shrink-0" />
                                <div className="space-y-0.5 text-xs flex-1">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-slate-900 font-bold text-sm">{student.studentName}</strong>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${student.classesLeft <= 3 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-50 text-emerald-700'}`}>
                                      {student.classesLeft} classes left
                                    </span>
                                  </div>
                                  <div className="text-slate-600">Parent: <strong>{student.parentName}</strong> • Phone: <strong>+91 {student.phone}</strong></div>
                                  <div className="text-slate-500 text-[11px]">Pass Valid till: <strong>{student.passExpiryDate}</strong></div>
                                </div>
                              </div>

                              {/* WHATSAPP RENEWAL REMINDER BUTTON ON EVERY CARD */}
                              <button
                                onClick={() => handleSendWhatsappRenewalReminder(student)}
                                className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>💬 Remind Pass Renewal on WhatsApp</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BATCH SLOT CARD 2: 06:00 PM EVENING BATCH */}
                      <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                          <span className="font-bold text-xs text-amber-900 uppercase flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>⏰ 06:00 PM Evening Batch (Mon-Fri)</span>
                          </span>
                          <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {monthlySubscribers.filter(s => s.batchSlotKey === 'KIDS_6PM').length} Students Enrolled
                          </span>
                        </div>

                        <div className="space-y-3">
                          {monthlySubscribers.filter(s => s.batchSlotKey === 'KIDS_6PM').map(student => (
                            <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-xs hover:border-amber-500 transition-all">
                              <div className="flex items-start gap-3">
                                <img src={student.avatarUrl} alt={student.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shrink-0" />
                                <div className="space-y-0.5 text-xs flex-1">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-slate-900 font-bold text-sm">{student.studentName}</strong>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${student.classesLeft <= 3 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-50 text-emerald-700'}`}>
                                      {student.classesLeft} classes left
                                    </span>
                                  </div>
                                  <div className="text-slate-600">Parent: <strong>{student.parentName}</strong> • Phone: <strong>+91 {student.phone}</strong></div>
                                  <div className="text-slate-500 text-[11px]">Pass Valid till: <strong>{student.passExpiryDate}</strong></div>
                                </div>
                              </div>

                              {/* WHATSAPP RENEWAL REMINDER BUTTON ON EVERY CARD */}
                              <button
                                onClick={() => handleSendWhatsappRenewalReminder(student)}
                                className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>💬 Remind Pass Renewal on WhatsApp</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ADULTS BATCH SLOTS (07:30 AM MORNING & 07:00 PM EVENING) */}
                  {selectedPackageRoster === 'ADULTS' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* BATCH SLOT CARD 1: 07:30 AM MORNING BATCH */}
                      <div className="bg-rose-50/40 border border-rose-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                          <span className="font-bold text-xs text-rose-800 uppercase flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-rose-600" />
                            <span>⏰ 07:30 AM Morning Batch (Mon-Fri)</span>
                          </span>
                          <span className="bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {monthlySubscribers.filter(s => s.batchSlotKey === 'ADULTS_730AM').length} Students Enrolled
                          </span>
                        </div>

                        <div className="space-y-3">
                          {monthlySubscribers.filter(s => s.batchSlotKey === 'ADULTS_730AM').map(student => (
                            <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-xs hover:border-rose-500 transition-all">
                              <div className="flex items-start gap-3">
                                <img src={student.avatarUrl} alt={student.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shrink-0" />
                                <div className="space-y-0.5 text-xs flex-1">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-slate-900 font-bold text-sm">{student.studentName}</strong>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${student.classesLeft <= 3 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-50 text-emerald-700'}`}>
                                      {student.classesLeft} classes left
                                    </span>
                                  </div>
                                  <div className="text-slate-600">Phone: <strong>+91 {student.phone}</strong> • Email: <strong>{student.email}</strong></div>
                                  <div className="text-slate-500 text-[11px]">Pass Valid till: <strong>{student.passExpiryDate}</strong></div>
                                </div>
                              </div>

                              {/* WHATSAPP RENEWAL REMINDER BUTTON ON EVERY CARD */}
                              <button
                                onClick={() => handleSendWhatsappRenewalReminder(student)}
                                className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>💬 Remind Pass Renewal on WhatsApp</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BATCH SLOT CARD 2: 07:00 PM EVENING BATCH */}
                      <div className="bg-purple-50/40 border border-purple-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                          <span className="font-bold text-xs text-purple-900 uppercase flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span>⏰ 07:00 PM Evening Batch (Mon-Fri)</span>
                          </span>
                          <span className="bg-purple-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {monthlySubscribers.filter(s => s.batchSlotKey === 'ADULTS_7PM').length} Students Enrolled
                          </span>
                        </div>

                        <div className="space-y-3">
                          {monthlySubscribers.filter(s => s.batchSlotKey === 'ADULTS_7PM').map(student => (
                            <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-xs hover:border-purple-500 transition-all">
                              <div className="flex items-start gap-3">
                                <img src={student.avatarUrl} alt={student.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shrink-0" />
                                <div className="space-y-0.5 text-xs flex-1">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-slate-900 font-bold text-sm">{student.studentName}</strong>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${student.classesLeft <= 3 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-50 text-emerald-700'}`}>
                                      {student.classesLeft} classes left
                                    </span>
                                  </div>
                                  <div className="text-slate-600">Phone: <strong>+91 {student.phone}</strong> • Email: <strong>{student.email}</strong></div>
                                  <div className="text-slate-500 text-[11px]">Pass Valid till: <strong>{student.passExpiryDate}</strong></div>
                                </div>
                              </div>

                              {/* WHATSAPP RENEWAL REMINDER BUTTON ON EVERY CARD */}
                              <button
                                onClick={() => handleSendWhatsappRenewalReminder(student)}
                                className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>💬 Remind Pass Renewal on WhatsApp</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

            {activeTab === 'CONTENT' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Website Content &amp; Announcements</h3>
              </div>
            )}

            {/* TAB: TRAINER APPLICATIONS & TIERS */}
            {activeTab === 'TRAINERS' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Ethos Trainer Applications &amp; Audition Verification</h3>
                    <p className="text-xs text-slate-500">Review dancer credentials, watch audition video reels, assign Silver/Gold/Diamond tiers, and approve trainers.</p>
                  </div>
                  <button
                    onClick={loadTrainerApps}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                  </button>
                </div>

                {trainerApps.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-xs bg-white border border-slate-200 rounded-2xl">
                    No trainer applications found in database. New registrations submitted from the website will appear here.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {trainerApps.map(item => {
                      const p = item.profile;
                      return (
                        <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <img src={p.profilePhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                              <div>
                                <h4 className="font-bold text-slate-900 text-base">{p.fullName}</h4>
                                <p className="text-xs text-slate-500">{p.primaryDanceStyle} • {p.experienceYears} Years Exp • {p.city}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase">
                                {p.trainerCode}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                p.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                                p.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {p.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <p className="text-slate-500 font-medium">Contact:</p>
                              <p className="text-slate-900 font-bold">{p.email} • {p.phone}</p>
                              {p.bio && <p className="text-slate-600 mt-2 italic">"{p.bio}"</p>}
                            </div>

                            <div className="space-y-1">
                              <p className="text-slate-500 font-medium">Audition Video:</p>
                              {item.videoUrl ? (
                                <a
                                  href={item.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#0088FF] hover:underline font-bold break-all flex items-center gap-1"
                                >
                                  ▶ Watch Audition Video Reel
                                </a>
                              ) : (
                                <span className="text-slate-400">No video URL submitted</span>
                              )}
                            </div>
                          </div>

                          {p.status === 'Submitted' && (
                            <div className="pt-3 border-t border-slate-100 space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-700">Assign Tier:</span>
                                  <select
                                    value={selectedTierForApproval}
                                    onChange={e => setSelectedTierForApproval(e.target.value)}
                                    className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                                  >
                                    <option value="Silver">Silver Tier</option>
                                    <option value="Gold">Gold Tier</option>
                                    <option value="Diamond">Diamond Tier</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-700">Set Login Password:</span>
                                  <input
                                    type="text"
                                    defaultValue="Ethos#2026"
                                    id={`pass_input_${p.id}`}
                                    className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none w-32"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  onClick={async () => {
                                    await fetch(`http://localhost:5152/api/admin/trainers/applications/${p.id}/reject`, {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ reason: 'Does not meet studio requirements at this time.' })
                                    });
                                    loadTrainerApps();
                                  }}
                                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                                >
                                  Reject Application
                                </button>

                                <button
                                  onClick={async () => {
                                    const passwordInput = document.getElementById(`pass_input_${p.id}`)?.value || 'Ethos#2026';
                                    const res = await fetch(`http://localhost:5152/api/admin/trainers/applications/${p.id}/approve`, {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ tier: selectedTierForApproval, password: passwordInput, notes: 'Approved by Ethos Admin.' })
                                    });
                                    const resJson = await res.json();
                                    alert(`🎉 Trainer Approved!\n\nCredentials Dispatched via WhatsApp to +${p.phone}:\n📱 Trainer Code: ${p.trainerCode}\n🔒 Password: ${passwordInput}\n🏆 Tier: ${selectedTierForApproval}`);
                                    loadTrainerApps();
                                  }}
                                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                                >
                                  <span>💬 Approve &amp; Send Credentials via WhatsApp</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

        </main>
      </div>

      {/* EDIT / PUBLISH EVENT MODAL */}
      {editingEventModal && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-slate-900 shadow-2xl space-y-4 text-left relative font-sans">
            <button onClick={() => setEditingEventModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>

            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">Event Publishing Control</span>
              <h3 className="text-lg font-bold text-slate-900">Publish / Edit Workshop Event</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Name / Title *</label>
                  <input
                    type="text"
                    required
                    defaultValue={editingEventModal.title}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organiser Name *</label>
                  <input
                    type="text"
                    defaultValue={editingEventModal.organiserName || 'Ethos Dance Studio Central'}
                    onChange={(e) => setEditingEventModal({ ...editingEventModal, organiserName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#0088FF]"
                  />
                </div>
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
                    seatsLeft: 40,
                    year: '2026',
                    month: 'AUG',
                    imageUrl: editingEventModal.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80'
                  };
                  setEventsList(prev => [newEv, ...prev]);
                }
                setEditingEventModal(null);
                alert('Event Published Successfully!');
              }}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all text-xs"
            >
              Save &amp; Publish Workshop Event
            </button>
          </div>
        </div>
      )}

      {/* PDF REPORT EXPORTER MODAL */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl space-y-4 text-left relative font-sans">
            <button onClick={() => setIsPdfModalOpen(false)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>

            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-[#0088FF] uppercase tracking-wider">Audit Exporter</span>
              <h3 className="text-lg font-bold text-slate-900 font-sans">Configure PDF Financial Bank Statement</h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Step 1: Select Date Period *</label>
                <select
                  value={reportTimeframe}
                  onChange={(e) => setReportTimeframe(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#0088FF]"
                >
                  <option value="CURRENT_MONTH">🗓️ Current Month (August 2026)</option>
                  <option value="LAST_90_DAYS">🗓️ Last 90 Days</option>
                  <option value="CUSTOM">🗓️ Custom Date Range</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Step 2: Select Report Revenue Stream *</label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#0088FF]"
                >
                  <option value="PACKAGES">💳 Monthly Packages Revenue Only</option>
                  <option value="WORKSHOPS">🎟️ Workshop Events Revenue Only</option>
                  <option value="SANGEET">💃 Corporate &amp; Family Events Only</option>
                  <option value="ALL">🌐 All Revenue Streams Combined</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setIsPdfModalOpen(false);
                setTimeout(() => window.print(), 200);
              }}
              className="w-full py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold rounded-xl shadow-md cursor-pointer transition-all text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate &amp; Print PDF Statement</span>
            </button>
          </div>
        </div>
      )}

      {/* STUDENT PASS DETAILS & QR MODAL */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl space-y-4 text-left relative font-sans">
            <button onClick={() => setSelectedStudentModal(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
              <X className="w-4 h-4 text-slate-700" />
            </button>
            <div className="space-y-1 border-b border-slate-200 pb-2">
              <h3 className="text-lg font-bold text-slate-900">{selectedStudentModal.studentName}</h3>
            </div>
            <button onClick={() => setSelectedStudentModal(null)} className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer">
              Close Specification
            </button>
          </div>
        </div>
      )}

      {/* 🌟 4. PERFECT 1-PAGE DYNAMIC BANK PASSBOOK PDF STATEMENT 🌟 */}
      <div id="ethos-official-statement-document" className="hidden print:block font-sans text-slate-900 p-4 bg-white text-left max-w-4xl mx-auto border-0">
        <div className="text-center space-y-1 border-b-2 border-slate-900 pb-3 mb-3">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <img src={ethosPureLogo} alt="Ethos Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">
              ETHOS DANCE STUDIO PRIVATE LIMITED
            </h1>
          </div>
          <h2 className="text-xs font-black uppercase text-[#0088FF] tracking-widest">
            DETAILS OF STATEMENT — {reportCategory} FINANCIAL REVENUE LEDGER
          </h2>
        </div>

        <table className="w-full border-collapse border border-slate-900 text-xs text-left mb-3">
          <tbody>
            <tr>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100 w-1/4">Name &amp; Address :</td>
              <td className="p-1.5 border border-slate-900 font-bold text-slate-900 uppercase w-1/4">
                ETHOS DANCE STUDIO CENTRAL<br />
                NIZAMPET RD KUKATPALLY<br />
                HYDERABAD TELANGANA 500072
              </td>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100 w-1/6">Studio Ref ID :</td>
              <td className="p-1.5 border border-slate-900 font-mono font-bold w-1/4">ETHOS-HYD-01</td>
            </tr>
            <tr>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Account Phone :</td>
              <td className="p-1.5 border border-slate-900 font-mono">+91 83417 01113</td>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Account Type :</td>
              <td className="p-1.5 border border-slate-900 font-bold">{reportCategory} REVENUE LEDGER</td>
            </tr>
            <tr>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Contact Email :</td>
              <td className="p-1.5 border border-slate-900 font-mono">contact@ethosdancestudio.com</td>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Statement Date :</td>
              <td className="p-1.5 border border-slate-900 font-mono font-bold">24-08-2026</td>
            </tr>
            <tr>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Statement Stream :</td>
              <td className="p-1.5 border border-slate-900 font-bold text-[#0088FF] uppercase">{reportCategory} REVENUE</td>
              <td className="p-1.5 border border-slate-900 font-bold bg-slate-100">Period Range :</td>
              <td className="p-1.5 border border-slate-900 font-mono font-bold">01-08-2026 TO 31-08-2026</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-3">
          STATEMENT OF ACCOUNT FOR THE PERIOD FROM 01-08-2026 TO 31-08-2026
        </div>

        <table className="w-full border-collapse border border-slate-900 text-xs text-left mb-3">
          <thead>
            <tr className="bg-[#B8D9F7] text-slate-900 font-bold uppercase border-b-2 border-slate-900">
              <th className="p-1.5 border border-slate-900 text-center w-8">Sl</th>
              <th className="p-1.5 border border-slate-900 w-28">Txn Date &amp; Time</th>
              <th className="p-1.5 border border-slate-900">Customer Person Name &amp; Code</th>
              <th className="p-1.5 border border-slate-900 w-44">Category / Item Stream</th>
              <th className="p-1.5 border border-slate-900 w-24">Payment Mode</th>
              <th className="p-1.5 border border-slate-900 text-right w-24">Deposit (₹)</th>
            </tr>
          </thead>
          <tbody>
            {statementRows.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-400">
                <td className="p-1.5 border border-slate-900 text-center font-bold">{idx + 1}</td>
                <td className="p-1.5 border border-slate-900 font-mono text-[11px]">{row.date}</td>
                <td className="p-1.5 border border-slate-900 font-bold">
                  {row.name.toUpperCase()} <span className="font-mono text-slate-600 text-[10px]">[{row.refId}]</span>
                </td>
                <td className="p-1.5 border border-slate-900">{row.category}</td>
                <td className="p-1.5 border border-slate-900">{row.mode}</td>
                <td className="p-1.5 border border-slate-900 text-right font-bold text-emerald-800">₹{row.amount}.00</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#E6F0FA] font-black text-slate-900 text-xs">
              <td colSpan={5} className="p-2 text-right uppercase border border-slate-900 font-bold">
                Total Net Credit Revenue Deposited :
              </td>
              <td className="p-2 text-right border border-slate-900 font-black text-emerald-800">
                ₹{statementTotalRevenue.toLocaleString('en-IN')}.00
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="border border-slate-900 p-2.5 bg-slate-50 flex items-center justify-between text-xs font-bold mb-4">
          <div>Opening Balance: <span className="font-mono">₹0.00</span></div>
          <div>Total Debits: <span className="font-mono">₹0.00</span></div>
          <div>Total Credits: <span className="font-mono text-emerald-700">₹{statementTotalRevenue.toLocaleString('en-IN')}.00</span></div>
          <div>Closing Balance: <span className="font-mono text-emerald-700 font-extrabold">₹{statementTotalRevenue.toLocaleString('en-IN')}.00 Cr</span></div>
        </div>

        <div className="pt-4 flex justify-between items-end text-[11px]">
          <div className="text-slate-600 italic">
            * Official computer-generated studio revenue ledger statement.
          </div>
          <div className="text-center space-y-0.5">
            <div className="w-36 border-b border-slate-900 mb-1 mx-auto" />
            <p className="font-bold text-slate-900 uppercase">ETHOS DANCE STUDIO</p>
            <p className="text-[9px] text-slate-500">Authorized Signatory &amp; Director</p>
          </div>
        </div>

      </div>

    </div>
  );
}
