import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Clock, 
  RotateCcw, 
  KeyRound, 
  LogOut, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useRegion } from '../../context/RegionContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { products } from '../../data/products.js';

export default function AccountDashboard() {
  const navigate = useNavigate();
  const { user, logout, addresses, orders, updateProfile, addAddress, deleteAddress } = useAuth();
  const { formatAmount } = useRegion();
  const { wishlistProducts } = useWishlist();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(orders[0] || null);

  // Address modal/form state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: 'Work / Residence',
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    country: 'Pakistan',
    postalCode: '',
    isDefault: false
  });

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  // Password change state
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Returns request form state
  const [returnForm, setReturnForm] = useState({
    orderId: orders[0]?.id || '',
    reason: 'Incorrect shade selection',
    notes: ''
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city) {
      addToast('Please complete address details.', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      title: 'Residence',
      fullName: user?.name || '',
      phone: user?.phone || '',
      street: '',
      city: '',
      country: 'Pakistan',
      postalCode: '',
      isDefault: false
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!pwdForm.currentPassword) {
      addToast('Please enter your existing password.', 'error');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      addToast('New password must contain at least 6 characters.', 'error');
      return;
    }
    if (pwdForm.newPassword !== pwdForm.confirmNewPassword) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    addToast('Your password has been changed securely.');
    setPwdForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    addToast(`Return request initiated for Order #${returnForm.orderId}. Courier pickup scheduled within 48h.`);
    setReturnForm({ orderId: orders[0]?.id || '', reason: 'Incorrect shade selection', notes: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get recently viewed from localStorage
  const recentlyViewedIds = (() => {
    try {
      return JSON.parse(localStorage.getItem('mujer_recently_viewed') || '[]');
    } catch {
      return [];
    }
  })();
  const recentlyViewedProducts = products.filter(p => recentlyViewedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Client Privilège Dashboard' }]} />

      {/* Account Hero Bar */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-2xl font-normal text-[#221430]">
              Welcome back, {user?.name || 'Valued Client'}
            </span>
            <span className="bg-[#F3ECF8] text-[#5D3891] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[#EAE0F2]">
              {user?.tier || 'Privilège VIP'}
            </span>
          </div>
          <p className="text-xs text-[#6E5D7E] mt-1 font-sans">
            Registered Email: {user?.email} · Member since {user?.joinedDate || '2025'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-[#6E5D7E] hover:text-[#5D3891] flex items-center gap-1.5 self-start sm:self-center transition-colors font-sans"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Account Sidebar Navigation (Col 3) */}
        <nav 
          aria-label="Account Settings"
          className="lg:col-span-3 bg-white rounded-3xl border border-[#E5D9EE] p-3.5 space-y-1.5 text-xs font-medium text-[#6E5D7E] shadow-luxury-card"
        >
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: User },
            { id: 'profile', label: 'Personal Profile', icon: User },
            { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
            { id: 'tracking', label: 'Live Order Tracking', icon: Truck },
            { id: 'addresses', label: 'Delivery Address Book', icon: MapPin, badge: addresses.length },
            { id: 'wishlist', label: 'My Saved Wishlist', icon: Heart, badge: wishlistProducts.length },
            { id: 'recently', label: 'Recently Viewed', icon: Clock },
            { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
            { id: 'password', label: 'Security & Password', icon: KeyRound }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#5D3891] text-white font-bold shadow-xs'
                    : 'hover:bg-[#FAF7FC] text-[#221430]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F3ECF8] text-[#5D3891]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab Content Area (Col 9) */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-9 rounded-3xl border border-[#E5D9EE] shadow-luxury-card min-h-[550px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Account Overview
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Summary of your ongoing beauty allocations, courier states, and saved preferences.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-md border border-neutral-200 bg-[#FAF7FC]">
                  <p className="text-xs text-neutral-500 font-medium">Total Orders Placed</p>
                  <p className="font-mono text-2xl font-bold text-[#5D3891] mt-1">{orders.length}</p>
                  <button onClick={() => setActiveTab('orders')} className="text-[11px] text-[#5D3891] hover:underline font-semibold mt-2 block">
                    View Orders →
                  </button>
                </div>

                <div className="p-4 rounded-md border border-neutral-200 bg-[#FAF7FC]">
                  <p className="text-xs text-neutral-500 font-medium">Active Wishlist Items</p>
                  <p className="font-mono text-2xl font-bold text-[#5D3891] mt-1">{wishlistProducts.length}</p>
                  <Link to="/wishlist" className="text-[11px] text-[#5D3891] hover:underline font-semibold mt-2 block">
                    Browse Wishlist →
                  </Link>
                </div>

                <div className="p-4 rounded-md border border-neutral-200 bg-[#FAF7FC]">
                  <p className="text-xs text-neutral-500 font-medium">Saved Addresses</p>
                  <p className="font-mono text-2xl font-bold text-[#5D3891] mt-1">{addresses.length}</p>
                  <button onClick={() => setActiveTab('addresses')} className="text-[11px] text-[#5D3891] hover:underline font-semibold mt-2 block">
                    Manage Addresses →
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-serif text-base font-semibold text-neutral-900">
                    Latest Dispatched Formulation
                  </h4>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#5D3891] hover:underline font-semibold">
                    All Orders ({orders.length}) →
                  </button>
                </div>

                {orders.length > 0 ? (
                  <div className="p-4 rounded border border-neutral-200 bg-[#FAF7FC] space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                      <div>
                        <span className="font-semibold text-neutral-900 font-mono">{orders[0].id}</span>
                        <span className="text-neutral-500 ml-2">Placed on {orders[0].formattedDate || 'Recent'}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        {orders[0].status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs">
                      <div>
                        <p className="text-neutral-700 font-medium">{orders[0].items.length} formulations</p>
                        <p className="font-mono font-bold text-[#5D3891] mt-0.5">{formatAmount(orders[0].total)}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOrderForTracking(orders[0]);
                          setActiveTab('tracking');
                        }}
                        className="px-3.5 py-1.5 bg-[#5D3891] text-white text-xs font-semibold rounded hover:bg-[#4A2578] transition-colors"
                      >
                        Track Courier
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">No recent orders on file.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Client Profile Details
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update your personal contact details for delivery coordination.
                </p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full border border-neutral-200 rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full border border-neutral-200 rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Mobile Phone (with country code)</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full border border-neutral-200 rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5D3891] text-white font-semibold uppercase tracking-wider rounded hover:bg-[#4A2578] transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Order History & Invoices
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Review past orders, payment receipts, and delivery details.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-neutral-200 rounded-md p-5 bg-white space-y-4">
                    <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 pb-3 gap-2">
                      <div>
                        <span className="font-mono font-bold text-sm text-neutral-900">{ord.id}</span>
                        <span className="text-xs text-neutral-500 ml-3">
                          {ord.formattedDate || new Date(ord.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                          {ord.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrderForTracking(ord);
                            setActiveTab('tracking');
                          }}
                          className="text-xs font-semibold text-[#5D3891] hover:underline flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded bg-neutral-100" />
                            <div>
                              <p className="font-semibold text-neutral-900">{item.name}</p>
                              <p className="text-[11px] text-neutral-500">{item.variant} × {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-neutral-800">
                            {formatAmount(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Payment: {ord.paymentMethod}</span>
                      <div className="text-sm font-semibold text-neutral-900">
                        Total: <span className="font-mono text-base font-bold text-[#5D3891]">{formatAmount(ord.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ORDER TRACKING TIMELINE */}
          {activeTab === 'tracking' && selectedOrderForTracking && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Live Courier Tracking
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Shipment {selectedOrderForTracking.id} · Dispatched via {selectedOrderForTracking.carrier}
                </p>
              </div>

              {/* Status Banner */}
              <div className="bg-[#FAF7FC] p-5 rounded-md border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-neutral-500">Tracking Reference</p>
                  <p className="font-mono text-base font-bold text-neutral-900">
                    {selectedOrderForTracking.trackingNumber || 'TRK-98302149'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Estimated Delivery</p>
                  <p className="font-serif text-sm font-bold text-[#5D3891]">
                    {selectedOrderForTracking.estimatedDelivery || '2–3 Business Days'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Current Phase</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#5D3891] text-white">
                    {selectedOrderForTracking.trackingStatus || 'Processing'}
                  </span>
                </div>
              </div>

              {/* Visual Timeline Stepper */}
              <div className="py-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-6">
                  Shipment Journey
                </h4>
                <div className="relative border-l-2 border-neutral-200 ml-4 space-y-8">
                  {(selectedOrderForTracking.timeline || [
                    { step: 'Order Placed', time: 'Completed', completed: true },
                    { step: 'Confirmed & Quality Inspected', time: 'Completed', completed: true },
                    { step: 'Climate Packaging Processed', time: 'Completed', completed: true },
                    { step: 'Dispatched to Express Hub', time: 'In Progress', completed: true },
                    { step: 'Out for Doorstep Delivery', time: 'Estimated 24h', completed: false },
                    { step: 'Delivered & Signed', time: 'Pending arrival', completed: false }
                  ]).map((t, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                        t.completed ? 'border-[#5D3891] bg-[#5D3891]' : 'border-neutral-300'
                      }`} />
                      <p className={`text-xs font-semibold ${t.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {t.step}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{t.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">
                    Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Pre-saved destinations for frictionless checkout across Pakistan and Gulf.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-4 py-2 bg-[#5D3891] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#4A2578] transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add Address Modal / Form */}
              {showAddressModal && (
                <form onSubmit={handleAddressSubmit} className="bg-[#FAF7FC] p-5 rounded-md border border-neutral-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif text-base font-semibold text-neutral-900">Add New Shipping Address</h4>
                    <button type="button" onClick={() => setShowAddressModal(false)} className="text-neutral-400 hover:text-black text-xs font-bold">Close</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Address Label</label>
                      <input
                        type="text"
                        value={newAddr.title}
                        onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })}
                        placeholder="e.g. Lahore Home"
                        className="w-full border rounded p-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full border rounded p-2 bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-neutral-700 block mb-1">Street Address</label>
                      <input
                        type="text"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        placeholder="House / Street / Area"
                        className="w-full border rounded p-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        placeholder="e.g. Karachi or Dubai"
                        className="w-full border rounded p-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Country</label>
                      <input
                        type="text"
                        value={newAddr.country}
                        onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                        className="w-full border rounded p-2 bg-white"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2 bg-[#5D3891] text-white text-xs font-semibold rounded">
                    Save Address
                  </button>
                </form>
              )}

              {/* Saved Addresses Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded border border-neutral-200 bg-white space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-neutral-900">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#F3ECF8] text-[#5D3891] font-semibold px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      <strong>{addr.fullName}</strong><br />
                      {addr.street}<br />
                      {addr.city}, {addr.country} {addr.postalCode}<br />
                      Phone: {addr.phone}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">
                    Saved Wishlist Formulations
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Your personal vault of desired cosmetics and perfumes.
                  </p>
                </div>
                <Link to="/wishlist" className="text-xs font-semibold text-[#5D3891] hover:underline">
                  Open Dedicated Wishlist Page →
                </Link>
              </div>

              {wishlistProducts.length === 0 ? (
                <p className="text-xs text-neutral-500">No items currently in wishlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="p-3 rounded border border-neutral-200 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded bg-neutral-100" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-xs font-semibold text-neutral-900 truncate">{p.name}</p>
                        <p className="font-mono text-xs font-bold text-[#5D3891] mt-0.5">{formatAmount(p.prices.PKR)}</p>
                        <Link to={`/product/${p.id}`} className="text-[11px] text-[#5D3891] hover:underline font-medium block mt-1">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: RECENTLY VIEWED */}
          {activeTab === 'recently' && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold text-neutral-900">
                Recently Viewed Formulations
              </h3>
              {recentlyViewedProducts.length === 0 ? (
                <p className="text-xs text-neutral-500">No recently viewed items recorded.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentlyViewedProducts.map((prod) => (
                    <div key={prod.id} className="p-3 rounded border border-neutral-200 flex items-center gap-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-14 h-14 object-cover rounded bg-neutral-100" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-xs font-semibold text-neutral-900 truncate">{prod.name}</p>
                        <Link to={`/product/${prod.id}`} className="text-[11px] text-[#5D3891] hover:underline font-medium block mt-1">
                          Inspect Formula →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: RETURNS & REFUNDS */}
          {activeTab === 'returns' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Returns & Exchange Concierge
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Complimentary 14-day return privilege on unopened, factory-sealed cosmetics.
                </p>
              </div>

              <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Select Order ID *</label>
                  <select
                    value={returnForm.orderId}
                    onChange={(e) => setReturnForm({ ...returnForm, orderId: e.target.value })}
                    className="w-full border rounded p-2.5 bg-white"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>{o.id} ({o.formattedDate || 'Recent'})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Reason for Return *</label>
                  <select
                    value={returnForm.reason}
                    onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                    className="w-full border rounded p-2.5 bg-white"
                  >
                    <option>Incorrect shade selection</option>
                    <option>Duplicate gift purchase</option>
                    <option>Allergic sensitivity</option>
                    <option>Other / Formulation inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Additional Notes</label>
                  <textarea
                    rows={3}
                    value={returnForm.notes}
                    onChange={(e) => setReturnForm({ ...returnForm, notes: e.target.value })}
                    placeholder="Provide details for our concierge..."
                    className="w-full border rounded p-2.5 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5D3891] text-white font-semibold uppercase tracking-wider rounded hover:bg-[#4A2578] transition-colors"
                >
                  Schedule Doorstep Return Pickup
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: PASSWORD & SECURITY */}
          {activeTab === 'password' && (
            <div className="space-y-6 max-w-md">
              <div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  Update Account Password
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Ensure your account is defended with modern multi-factor credentials.
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Current Password *</label>
                  <input
                    type="password"
                    value={pwdForm.currentPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                    className="w-full border rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">New Password *</label>
                  <input
                    type="password"
                    value={pwdForm.newPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                    placeholder="At least 6 characters"
                    className="w-full border rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Confirm New Password *</label>
                  <input
                    type="password"
                    value={pwdForm.confirmNewPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirmNewPassword: e.target.value })}
                    className="w-full border rounded p-2.5 focus:outline-none focus:border-[#5D3891]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5D3891] text-white font-semibold uppercase tracking-wider rounded hover:bg-[#4A2578] transition-colors"
                >
                  Confirm Password Change
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
