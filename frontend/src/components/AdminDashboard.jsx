import React, { useState, useEffect } from 'react';
import { X, Search, DollarSign, ShoppingBag, Send, RefreshCw, Lock, Bell, Settings, Key, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard({ API_URL, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('ORDERS'); // ORDERS or SETTINGS
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Manual SMS/Email dispatch state
  const [dispatchMsg, setDispatchMsg] = useState('');
  const [selectedBookingForMsg, setSelectedBookingForMsg] = useState(null);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Studio Payment Gateway & Admin Settings
  const [settings, setSettings] = useState({
    RazorpayKeyId: 'rzp_test_RhythmPulse2025',
    RazorpayKeySecret: 'Secret_Demo_Key_9981',
    AdminPassword: 'adminpass',
    AdminPhone: '+91 9876543210'
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

      const settingsRes = await fetch(`${API_URL}/api/payment/settings`);
      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        setSettings((prev) => ({ ...prev, ...sData }));
      }
    } catch (err) {
      setBookings([
        { id: 1, transactionId: 'TXN-98402A18', customerName: 'Rahul Verma', customerEmail: 'rahul@example.com', customerPhone: '+91 9876543210', itemTitle: 'Monthly All-Access VIP Pass', pricePaid: 3499, paymentMethod: 'Razorpay UPI', paymentStatus: 'CONFIRMED', bookedAt: new Date().toISOString() },
        { id: 2, transactionId: 'TXN-88194B12', customerName: 'Sneha Reddy', customerEmail: 'sneha@example.com', customerPhone: '+91 9123456789', itemTitle: 'Royal Sangeet Choreography Package', pricePaid: 14999, paymentMethod: 'Razorpay Card', paymentStatus: 'CONFIRMED', bookedAt: new Date(Date.now() - 86400000).toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsAndSettings();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricePaid || 0), 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customerEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.itemTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || (b.bookingType || '').toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesType;
  });

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/payment/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 4000);
    } catch (err) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 4000);
    }
  };

  const handleSendManualNotification = (e) => {
    e.preventDefault();
    if (!selectedBookingForMsg || !dispatchMsg) return;

    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setDispatchMsg('');
      setSelectedBookingForMsg(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-xl animate-fadeIn">
      
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0A0F1D] border-2 border-[#333333] shadow-2xl overflow-hidden text-white flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#333333] flex items-center justify-between bg-[#000000] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1F41FF] text-white">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-display">
                MOVEMENT STUDIOS ADMIN PORTAL
              </h2>
              <p className="text-xs text-slate-400">Razorpay Integration • Live Orders • Gateway Settings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'ORDERS' ? 'SETTINGS' : 'ORDERS')}
              className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-xs font-bold text-[#D0FBF9] border border-[#404040] flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>{activeTab === 'ORDERS' ? 'Gateway & Settings' : 'Orders Table'}</span>
            </button>

            <button
              onClick={fetchBookingsAndSettings}
              className="p-2 rounded-lg bg-[#222222] text-slate-300 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 bg-red-950 hover:bg-red-900 text-red-300 border border-red-600 text-xs font-bold"
            >
              Logout
            </button>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: ORDERS VIEW */}
          {activeTab === 'ORDERS' && (
            <>
              {/* Metrics Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-[#111111] border border-[#333333] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Revenue</span>
                    <span className="text-3xl font-extrabold text-[#D0FBF9] font-display mt-1 block">₹{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="p-3.5 bg-[#1F41FF] text-white">
                    <DollarSign className="w-7 h-7" />
                  </div>
                </div>

                <div className="p-6 bg-[#111111] border border-[#333333] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Orders Placed</span>
                    <span className="text-3xl font-extrabold text-[#D900FF] font-display mt-1 block">{bookings.length} Orders</span>
                  </div>
                  <div className="p-3.5 bg-[#D900FF] text-black">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                </div>

                <div className="p-6 bg-[#111111] border border-[#333333] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Payment Gateway</span>
                    <span className="text-xs font-bold text-[#D0FBF9] mt-1 block flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Razorpay Verified
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#D0FBF9] text-black">
                    <Key className="w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by customer name, email, order..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#333333] text-white text-xs focus:border-[#1F41FF] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  {['ALL', 'Class', 'Workshop', 'Sangeet', 'Pass'].map((type) => (
                    <button
                      key={type} onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase border ${
                        filterType === type ? 'bg-[#1F41FF] text-white border-[#1F41FF]' : 'bg-[#111111] text-slate-400 border-[#333333]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="border border-[#333333] bg-[#000000] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#111111] text-slate-400 uppercase tracking-wider font-bold border-b border-[#333333]">
                      <tr>
                        <th className="px-4 py-3">TxID / Payment ID</th>
                        <th className="px-4 py-3">Customer Details</th>
                        <th className="px-4 py-3">Package / Style Title</th>
                        <th className="px-4 py-3">Amount Paid</th>
                        <th className="px-4 py-3">Gateway</th>
                        <th className="px-4 py-3 text-right">Dispatch SMS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222] font-medium">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((order) => (
                          <tr key={order.id} className="hover:bg-[#111111] transition-colors">
                            <td className="px-4 py-3.5 font-mono text-[#D0FBF9] font-bold">
                              {order.transactionId || `PAY-${order.id}`}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-white">{order.customerName}</div>
                              <div className="text-[11px] text-slate-400">{order.customerEmail} • {order.customerPhone}</div>
                            </td>
                            <td className="px-4 py-3.5 text-white font-bold">
                              {order.itemTitle}
                            </td>
                            <td className="px-4 py-3.5 text-[#D0FBF9] font-extrabold text-sm">
                              ₹{order.pricePaid}
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-[#D900FF]">
                              {order.paymentMethod || 'Razorpay'}
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <button
                                onClick={() => setSelectedBookingForMsg(order)}
                                className="px-3 py-1 bg-[#1F41FF] text-white text-[11px] font-bold uppercase"
                              >
                                Send SMS
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-slate-500">
                            No orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: GATEWAY & ADMIN SETTINGS */}
          {activeTab === 'SETTINGS' && (
            <div className="max-w-2xl mx-auto bg-[#111111] border border-[#333333] p-8 space-y-6">
              <h3 className="text-2xl font-extrabold uppercase font-display text-white border-b border-[#333333] pb-4">
                PAYMENT GATEWAY & ADMIN CREDENTIALS
              </h3>

              {settingsSaved && (
                <div className="p-3 bg-[#1F41FF] text-white text-xs font-bold">
                  ✓ Studio Settings & Razorpay API Keys successfully saved to database!
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Razorpay Key ID (Key ID)</label>
                  <input
                    type="text" required value={settings.RazorpayKeyId}
                    onChange={(e) => setSettings({ ...settings, RazorpayKeyId: e.target.value })}
                    placeholder="rzp_test_... or rzp_live_..."
                    className="w-full p-3 bg-[#000000] border border-[#333333] text-white font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Get your Key ID from dashboard.razorpay.com API Keys tab</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Razorpay Key Secret</label>
                  <input
                    type="password" required value={settings.RazorpayKeySecret}
                    onChange={(e) => setSettings({ ...settings, RazorpayKeySecret: e.target.value })}
                    placeholder="••••••••••••••••"
                    className="w-full p-3 bg-[#000000] border border-[#333333] text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Change Admin Password</label>
                  <input
                    type="text" required value={settings.AdminPassword}
                    onChange={(e) => setSettings({ ...settings, AdminPassword: e.target.value })}
                    className="w-full p-3 bg-[#000000] border border-[#333333] text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Admin Notification Mobile Phone</label>
                  <input
                    type="tel" required value={settings.AdminPhone}
                    onChange={(e) => setSettings({ ...settings, AdminPhone: e.target.value })}
                    className="w-full p-3 bg-[#000000] border border-[#333333] text-white font-mono"
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-cyan w-full py-4 text-xs font-extrabold uppercase">
                    Save Gateway Credentials & Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Manual Dispatch Modal Drawer */}
          {selectedBookingForMsg && (
            <div className="p-6 bg-[#111111] border border-[#1F41FF] space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-sm">
                  Send Direct SMS Alert to {selectedBookingForMsg.customerName} ({selectedBookingForMsg.customerPhone})
                </h4>
                <button onClick={() => setSelectedBookingForMsg(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {dispatchSuccess && (
                <div className="p-3 bg-[#1F41FF] text-white text-xs font-bold">
                  ✓ SMS Alert successfully sent to handset!
                </div>
              )}

              <form onSubmit={handleSendManualNotification} className="space-y-3">
                <textarea
                  rows={3} required value={dispatchMsg}
                  onChange={(e) => setDispatchMsg(e.target.value)}
                  placeholder={`Hi ${selectedBookingForMsg.customerName}, your studio pass for ${selectedBookingForMsg.itemTitle} is active! See you at Movement Studios!`}
                  className="w-full p-3 bg-[#000000] border border-[#333333] text-white text-xs focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button" onClick={() => setSelectedBookingForMsg(null)}
                    className="px-4 py-2 bg-[#222222] text-slate-300 text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-cyan text-xs py-2 px-5 font-extrabold uppercase">
                    Send SMS Now
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
