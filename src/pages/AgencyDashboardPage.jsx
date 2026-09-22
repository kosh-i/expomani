import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import VerifiedBadge from '../components/common/VerifiedBadge';
import EcoBadge from '../components/common/EcoBadge';
import { Building2, Plus, ShieldCheck, DollarSign, Calendar, Users, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export default function AgencyDashboardPage() {
  const { packages, addPackage, bookings } = useAppStore();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'addPackage' | 'bookings'
  const [formSubmitted, setFormSubmitted] = useState(false);

  // New package state
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('4 Days / 3 Nights');
  const [price, setPrice] = useState(14000);
  const [theme, setTheme] = useState('Eco-Tourism');
  const [ecoScore, setEcoScore] = useState(92);
  const [highlights, setHighlights] = useState('Guided Keibul Lamjao Sangai safari, Phumdi homestay');

  const handlePackageCreate = (e) => {
    e.preventDefault();
    const newPkg = {
      id: `pkg-custom-${Date.now()}`,
      title,
      duration,
      daysCount: parseInt(duration) || 4,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 1,
      ecoScore: Number(ecoScore),
      carbonOffsetKg: 40,
      communityBenefitPercent: 80,
      agency: {
        name: "Sangai Eco Trails (Your Agency)",
        verified: true,
        rating: 4.9,
        phone: "+91 98621 44321",
        email: "explore@sangaiecotrails.mn",
        license: "MN-TOUR-2024-089"
      },
      theme,
      difficulty: "Easy",
      season: "Winter & Spring",
      featured: false,
      trending: false,
      image: "/img1.jpg",
      highlights: highlights.split(',').map(s => s.trim()),
      pickup: "Imphal Airport (IMF)",
      inclusions: ["All Homestay Accommodation", "Organic Local Meals", "Guide Fee"],
      exclusions: ["Personal Shopping"],
      itinerary: [
        { day: 1, title: "Arrival & Orientation", desc: "Check in to local homestay", meals: "Dinner", stay: "Local Homestay" }
      ]
    };

    addPackage(newPkg);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveTab('overview');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20 pt-4 text-left">
      {/* Agency Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">Sangai Eco Trails Portal</h1>
                <VerifiedBadge name="Verified Heritage Agency" license="MN-TOUR-2024-089" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Registered Local Tour Operator • Imphal & Loktak Circuit</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('addPackage')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Revenue</span>
          <h3 className="text-xl font-extrabold text-amber-700">₹1,48,500</h3>
          <span className="text-[10px] text-emerald-700 font-bold">+18% this month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Active Bookings</span>
          <h3 className="text-xl font-extrabold text-slate-900">{bookings.length + 8}</h3>
          <span className="text-[10px] text-slate-500 font-medium">All confirmed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Active Packages</span>
          <h3 className="text-xl font-extrabold text-emerald-700">{packages.length}</h3>
          <span className="text-[10px] text-slate-500 font-medium">Eco-certified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Agency Rating</span>
          <h3 className="text-xl font-extrabold text-amber-700">4.9 / 5.0</h3>
          <span className="text-[10px] text-slate-500 font-medium">Based on 128 reviews</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'overview' ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          My Listed Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'bookings' ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Recent Traveler Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('addPackage')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'addPackage' ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Add New Tour Package
        </button>
      </div>

      {/* OVERVIEW: PACKAGES LIST */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
              <img src={pkg.image} alt={pkg.title} className="w-full h-36 object-cover rounded-2xl" />
              <div className="flex items-center justify-between">
                <EcoBadge score={pkg.ecoScore} size="sm" />
                <span className="text-xs text-amber-700 font-extrabold">₹{pkg.price.toLocaleString('en-IN')}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{pkg.title}</h4>
              <p className="text-xs text-slate-500 font-medium">{pkg.duration} • {pkg.theme}</p>
            </div>
          ))}
        </div>
      )}

      {/* BOOKINGS TABLE */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Traveler Name</th>
                <th className="p-4">Package</th>
                <th className="p-4">Travel Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-emerald-700">{b.id}</td>
                  <td className="p-4 text-slate-900 font-bold">{b.travelerName}</td>
                  <td className="p-4 max-w-xs truncate text-slate-700">{b.packageTitle}</td>
                  <td className="p-4">{b.date}</td>
                  <td className="p-4 font-bold text-amber-700">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PACKAGE FORM */}
      {activeTab === 'addPackage' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-left space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Register New Tour Package
          </h3>

          {formSubmitted ? (
            <div className="p-6 text-center space-y-2 text-emerald-700">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Package Submitted & Live!</h4>
              <p className="text-xs text-slate-600 font-medium">Your package has been published to the marketplace.</p>
            </div>
          ) : (
            <form onSubmit={handlePackageCreate} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-slate-700 block mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Loktak Lake Sunrise Kayaking & Phumdi Eco Trail"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="3 Days / 2 Nights"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Price per Traveler (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block mb-1">Trip Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  >
                    <option value="Eco-Tourism">Eco-Tourism & Wildlife</option>
                    <option value="Heritage & Culture">Heritage & Culture</option>
                    <option value="Festival & Culture">Festival & Culture</option>
                    <option value="Adventure & Eco">Adventure & Treks</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Self-Declared Eco-Score (1-100)</label>
                  <input
                    type="number"
                    min="60"
                    max="100"
                    value={ecoScore}
                    onChange={(e) => setEcoScore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Key Highlights (comma separated)</label>
                <textarea
                  rows="3"
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Submit & Publish Package
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
