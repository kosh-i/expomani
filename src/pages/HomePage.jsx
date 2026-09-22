import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ShieldCheck,
  Leaf,
  Heart,
  ArrowRight,
  Compass,
  Star,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { DESTINATIONS, TOUR_PACKAGES, MANIPUR_FESTIVALS, HOMESTAYS } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import EcoBadge from '../components/common/EcoBadge';
import VerifiedBadge from '../components/common/VerifiedBadge';
import RatingStars from '../components/common/RatingStars';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchFilters } = useAppStore();

  const [searchDest, setSearchDest] = useState('');
  const [searchTheme, setSearchTheme] = useState('All');
  const [searchTravelers, setSearchTravelers] = useState('2');
  const [searchDate, setSearchDate] = useState('2026-11-21');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFilters({
      destination: searchDest,
      theme: searchTheme
    });
    navigate('/packages');
  };

  return (
    <div className="space-y-16 pb-12 pt-4">
      {/* 1. HERO SECTION WITH SEARCH BAR & BRAND WOW */}
      <section className="relative min-h-[580px] flex items-center justify-center rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white max-w-7xl mx-auto">
        {/* Background Image with Light Soft Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Loktak_Lake.jpg/1280px-Loktak_Lake.jpg"
            alt="Loktak Lake Manipur"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-semibold animate-fade-in shadow">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Smart & Sustainable Manipur Tourism Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Explore the Jewel of India <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              Heritage, Culture & Eco-Tourism
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow">
            {t('hero.subtitle')}
          </p>

          {/* MAKE MY TRIP STYLE HERO SEARCH WIDGET */}
          <div className="max-w-4xl mx-auto mt-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Destination Input */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                <label className="text-[10px] uppercase font-bold text-emerald-700 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>Destination</span>
                </label>
                <select
                  value={searchDest}
                  onChange={(e) => setSearchDest(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">All Manipur (Loktak, Imphal, Ukhrul...)</option>
                  <option value="Loktak Lake">Loktak Lake & Keibul Lamjao</option>
                  <option value="Imphal">Imphal (Kangla & Ima Keithel)</option>
                  <option value="Ukhrul">Ukhrul (Shirui Lily & Longpi)</option>
                  <option value="Tamenglong">Tamenglong (Amur Falcon)</option>
                  <option value="Bishnupur">Bishnupur (Terracotta Temple)</option>
                </select>
              </div>

              {/* Trip Theme */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                <label className="text-[10px] uppercase font-bold text-emerald-700 block mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-emerald-600" />
                  <span>Trip Theme</span>
                </label>
                <select
                  value={searchTheme}
                  onChange={(e) => setSearchTheme(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Themes</option>
                  <option value="Eco-Tourism">Eco-Tourism & Wildlife</option>
                  <option value="Heritage & Culture">Heritage & Forts</option>
                  <option value="Festival & Culture">Festival Special</option>
                  <option value="Adventure & Eco">Adventure & Treks</option>
                </select>
              </div>

              {/* Date & Travelers */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                <label className="text-[10px] uppercase font-bold text-emerald-700 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-600" />
                  <span>Travel Date</span>
                </label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Search Submit Button */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Trips</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick AI Planner Trigger */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-xs text-slate-200 font-medium">Need a custom smart itinerary?</span>
            <Link
              to="/ai-planner"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-bold transition-colors shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Plan with AI Engine</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST & AUTHENTICITY STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Verified Local Agencies</h4>
            <p className="text-[11px] text-slate-500">100% Licensed Manipur Operators</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700 border border-teal-200">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Eco-Score Verified</h4>
            <p className="text-[11px] text-slate-500">Carbon offset & community audit</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">100% Local Guides</h4>
            <p className="text-[11px] text-slate-500">Meitei, Tangkhul & Kuki native hosts</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">ILP Permit Assist</h4>
            <p className="text-[11px] text-slate-500">Inner Line Permit guidance included</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-6 text-left">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Heritage Explorer</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Must-Visit Destinations in Manipur</h2>
          </div>
          <Link to="/destinations" className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1">
            <span>View All Pins on Heritage Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {DESTINATIONS.slice(0, 3).map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations?id=${dest.id}`}
              className="group relative rounded-2xl overflow-hidden glass-card border border-slate-200 hover:border-emerald-500 transition-all duration-300 flex flex-col h-80 shadow-sm"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-0 p-5 space-y-2 text-left">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                  {dest.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{dest.name}</h3>
                <p className="text-xs text-slate-200 line-clamp-2">{dest.tagline}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>Explore Pins & History</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. TRENDING TOUR PACKAGES (MAKEMYTRIP STYLE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6 text-left">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Verified Packages</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Trending Packages across Manipur</h2>
          </div>
          <Link to="/packages" className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1">
            <span>Browse All Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOUR_PACKAGES.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image Header with Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <EcoBadge score={pkg.ecoScore} size="sm" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 font-semibold">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <VerifiedBadge name={pkg.agency.name} license={pkg.agency.license} />
                    <RatingStars rating={pkg.rating} count={pkg.reviewsCount} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2">
                    {pkg.title}
                  </h3>

                  <ul className="text-xs text-slate-600 space-y-1">
                    {pkg.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Booking Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-amber-700">₹{pkg.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-500 font-medium">/ traveler</span>
                  </div>
                </div>

                <Link
                  to={`/packages/${pkg.id}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING FESTIVALS BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-lg">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/40 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Manipur Festival Season</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Sangai Cultural Festival 2026</h2>
            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed font-medium">
              Experience grand classical Ras Leela dances, Sagol Kangjei polo matches, indigenous martial arts, and international ASEAN craft stalls across Imphal and Sendra Island.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold pt-1">
              <span>Nov 21 – Nov 30, 2026</span>
              <span>•</span>
              <span>VIP Badges & Verified Packages Available</span>
            </div>
          </div>

          <Link
            to="/culture"
            className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-md hover:bg-slate-100 transition-transform active:scale-95"
          >
            Explore Festival Calendar
          </Link>
        </div>
      </section>

      {/* 6. ECO-HOMESTAYS & COMMUNITY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 space-y-6 text-left">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Community Eco-Tourism</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Local Village Homestays</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HOMESTAYS.map((hs) => (
            <div key={hs.id} className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 text-left shadow-sm">
              <img src={hs.image} alt={hs.name} className="w-full h-36 object-cover rounded-xl" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">{hs.location}</span>
                <EcoBadge score={hs.ecoScore} size="sm" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{hs.name}</h4>
              <p className="text-xs text-slate-500">Host: {hs.host}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-700 font-bold">₹{hs.pricePerNight} / night</span>
                <span className="text-[11px] text-slate-500">100% Local Retention</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
