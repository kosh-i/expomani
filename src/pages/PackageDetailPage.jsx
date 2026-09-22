import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  XCircle,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import EcoBadge from '../components/common/EcoBadge';
import VerifiedBadge from '../components/common/VerifiedBadge';
import RatingStars from '../components/common/RatingStars';
import Virtual360Viewer from '../components/common/Virtual360Viewer';
import BookingModal from '../components/booking/BookingModal';

export default function PackageDetailPage() {
  const { id } = useParams();
  const { packages, savedPackageIds, toggleSavedPackage } = useAppStore();

  const pkg = packages.find((p) => p.id === id) || packages[0];
  const isSaved = savedPackageIds.includes(pkg.id);

  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | '360'
  const [openDay, setOpenDay] = useState(1);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [enquireSent, setEnquireSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20 pt-4 text-left">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <Link to="/packages" className="hover:text-emerald-700">Packages</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{pkg.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSavedPackage(pkg.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Package Header Title & Badge */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <VerifiedBadge name={pkg.agency.name} license={pkg.agency.license} />
          <EcoBadge score={pkg.ecoScore} />
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
            {pkg.theme}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
            Difficulty: {pkg.difficulty}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {pkg.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
          <RatingStars rating={pkg.rating} count={pkg.reviewsCount} />
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{pkg.duration}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pickup: {pkg.pickup}</span>
          </div>
        </div>
      </div>

      {/* MEDIA TOGGLE (PHOTOS vs 360° VIRTUAL PREVIEW) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'photos'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            High-Res Photo Gallery
          </button>
          <button
            onClick={() => setActiveTab('360')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === '360'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-700 animate-pulse" />
            <span>360° Virtual Preview</span>
          </button>
        </div>

        {activeTab === 'photos' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[420px] rounded-2xl overflow-hidden shadow-sm">
            <div className="md:col-span-2 h-full">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover rounded-2xl border border-slate-200"
              />
            </div>
            <div className="hidden md:flex flex-col gap-4 h-full">
              <img
                src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80"
                alt="Manipur Heritage"
                className="w-full h-1/2 object-cover rounded-2xl border border-slate-200"
              />
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                alt="Shirui Hills"
                className="w-full h-1/2 object-cover rounded-2xl border border-slate-200"
              />
            </div>
          </div>
        ) : (
          <Virtual360Viewer imageSrc={pkg.panorama360} title={pkg.title} />
        )}
      </div>

      {/* MAIN CONTENT & STICKY BOOKING WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Itinerary, Eco Impact, Inclusions */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. ECO-IMPACT & RESPONSIBLE TRAVEL PANEL */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Eco-Impact & Sustainable Tourism Certificate</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Eco-Score</span>
                <span className="text-xl font-extrabold text-emerald-700">{pkg.ecoScore} / 100</span>
              </div>
              <div className="p-3.5 bg-teal-50 rounded-2xl border border-teal-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Carbon Offset</span>
                <span className="text-xl font-extrabold text-teal-700">~{pkg.carbonOffsetKg} kg CO2e</span>
              </div>
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Community Benefit</span>
                <span className="text-xl font-extrabold text-amber-800">{pkg.communityBenefitPercent}% direct</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
              This tour is certified responsible: {pkg.communityBenefitPercent}% of your booking fee directly supports Manipur local host families, Karang island fishermen, and Tangkhul village homestays.
            </p>
          </div>

          {/* 2. DAY-BY-DAY ITINERARY */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Day-by-Day Detailed Itinerary</span>
            </h3>

            <div className="space-y-3">
              {pkg.itinerary.map((dayItem) => {
                const isOpen = openDay === dayItem.day;
                return (
                  <div
                    key={dayItem.day}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenDay(isOpen ? null : dayItem.day)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                          D{dayItem.day}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{dayItem.title}</h4>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                        <p className="leading-relaxed font-medium">{dayItem.desc}</p>
                        <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-emerald-700 font-bold">
                          <span>Meals: {dayItem.meals}</span>
                          <span>•</span>
                          <span>Overnight: {dayItem.stay}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. INCLUSIONS & EXCLUSIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>What's Excluded</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. AGENCY PROFILE CARD */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <VerifiedBadge name={pkg.agency.name} license={pkg.agency.license} />
              <h4 className="text-base font-bold text-slate-900 pt-1">{pkg.agency.name}</h4>
              <p className="text-xs text-slate-500 font-medium">Verified Tourism License: {pkg.agency.license}</p>
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 font-medium">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-600" />{pkg.agency.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-emerald-600" />{pkg.agency.email}</span>
              </div>
            </div>

            <button
              onClick={() => setEnquireSent(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 border border-slate-200"
            >
              {enquireSent ? 'Enquiry Sent ✓' : 'Enquire Agency'}
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 sticky top-20 space-y-6 shadow-md">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Package Price</span>
                <span className="text-2xl font-extrabold text-amber-700">₹{pkg.price.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-500 ml-1 font-medium">/ person</span>
              </div>
              <EcoBadge score={pkg.ecoScore} size="sm" />
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex items-center justify-between text-slate-600">
                <span>Duration:</span>
                <span className="font-bold text-slate-900">{pkg.duration}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700">Govt Verified Agency</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>ILP Guidance:</span>
                <span className="font-bold text-blue-700">Included</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-transform"
              >
                Proceed to Book Package
              </button>

              <button
                onClick={() => setEnquireSent(true)}
                className="w-full py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{enquireSent ? 'Enquiry Submitted ✓' : 'Send Quick Enquiry'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal packageData={pkg} onClose={() => setBookingModalOpen(false)} />
      )}
    </div>
  );
}
