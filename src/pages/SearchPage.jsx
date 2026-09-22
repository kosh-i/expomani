import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Filter,
  SlidersHorizontal,
  MapPin,
  Calendar,
  ShieldCheck,
  Leaf,
  Heart,
  Grid,
  Map as MapIcon,
  CheckCircle2,
  X,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import EcoBadge from '../components/common/EcoBadge';
import VerifiedBadge from '../components/common/VerifiedBadge';
import RatingStars from '../components/common/RatingStars';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { BUFFER_ZONES } from '../data/mockData';
import { AlertTriangle } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function SearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const showSavedOnly = searchParams.get('saved') === 'true';

  const { packages, searchFilters, setSearchFilters, resetSearchFilters, savedPackageIds, toggleSavedPackage } = useAppStore();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  let filteredPackages = packages.filter((pkg) => {
    if (showSavedOnly && !savedPackageIds.includes(pkg.id)) return false;
    if (searchFilters.theme !== 'All' && pkg.theme !== searchFilters.theme) return false;
    if (searchFilters.priceMax && pkg.price > searchFilters.priceMax) return false;
    if (searchFilters.minEcoScore && pkg.ecoScore < searchFilters.minEcoScore) return false;
    if (searchFilters.verifiedOnly && !pkg.agency.verified) return false;
    if (searchFilters.difficulty !== 'All' && pkg.difficulty !== searchFilters.difficulty) return false;
    if (searchFilters.destination && !pkg.title.toLowerCase().includes(searchFilters.destination.toLowerCase())) {
      return false;
    }
    return true;
  });

  filteredPackages = [...filteredPackages].sort((a, b) => {
    if (searchFilters.sort === 'priceAsc') return a.price - b.price;
    if (searchFilters.sort === 'priceDesc') return b.price - a.price;
    if (searchFilters.sort === 'rating') return b.rating - a.rating;
    if (searchFilters.sort === 'eco') return b.ecoScore - a.ecoScore;
    return b.reviewsCount - a.reviewsCount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16 pt-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {showSavedOnly ? 'Your Saved Packages' : 'Explore Tour Packages in Manipur'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {filteredPackages.length} verified eco-tourism & heritage packages found
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* LEFT SIDEBAR FILTERS (DESKTOP) */}
        <div className="hidden md:block space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-20 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetSearchFilters}
              className="text-[11px] text-emerald-700 hover:underline font-bold"
            >
              Reset All
            </button>
          </div>

          {/* Theme Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Trip Theme</label>
            <select
              value={searchFilters.theme}
              onChange={(e) => setSearchFilters({ theme: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none"
            >
              <option value="All">All Themes</option>
              <option value="Eco-Tourism">Eco-Tourism & Wildlife</option>
              <option value="Heritage & Culture">Heritage & Culture</option>
              <option value="Festival & Culture">Festival & Culture</option>
              <option value="Adventure & Eco">Adventure & Treks</option>
              <option value="Nature & Wildlife">Nature & Falcon Sanctuary</option>
            </select>
          </div>

          {/* Max Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-slate-700">Max Budget (₹)</label>
              <span className="font-bold text-amber-700">₹{searchFilters.priceMax.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="35000"
              step="1000"
              value={searchFilters.priceMax}
              onChange={(e) => setSearchFilters({ priceMax: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Eco Score Threshold */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-slate-700">Minimum Eco Score</label>
              <span className="font-bold text-emerald-700">{searchFilters.minEcoScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={searchFilters.minEcoScore}
              onChange={(e) => setSearchFilters({ minEcoScore: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Trek Difficulty</label>
            <div className="flex items-center gap-2">
              {['All', 'Easy', 'Moderate', 'Challenging'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSearchFilters({ difficulty: diff })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    searchFilters.difficulty === diff
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={searchFilters.verifiedOnly}
                onChange={(e) => setSearchFilters({ verifiedOnly: e.target.checked })}
                className="rounded accent-emerald-600 w-4 h-4"
              />
              <span>Verified Agencies Only</span>
            </label>
          </div>
        </div>

        {/* MAIN RESULTS CONTAINER */}
        <div className="md:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-sm">
            <span className="text-slate-600 font-semibold">Sort packages by:</span>
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={searchFilters.sort}
                onChange={(e) => setSearchFilters({ sort: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Highest Traveler Rating</option>
                <option value="eco">Highest Eco Impact Score</option>
              </select>
            </div>
          </div>

          {/* GRID OR MAP DISPLAY */}
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Packages Match Your Criteria</h3>
              <p className="text-xs text-slate-500">Try adjusting your price range or minimum eco score filters.</p>
              <button
                onClick={resetSearchFilters}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => {
                const isSaved = savedPackageIds.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    className="rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-sm hover:shadow-md"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <EcoBadge score={pkg.ecoScore} size="sm" />
                        </div>
                        <button
                          onClick={() => toggleSavedPackage(pkg.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                            isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                        </button>
                      </div>

                      {/* Package Details */}
                      <div className="p-5 space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <VerifiedBadge name={pkg.agency.name} license={pkg.agency.license} />
                          <RatingStars rating={pkg.rating} count={pkg.reviewsCount} />
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>

                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                            {pkg.duration}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-700">{pkg.theme}</span>
                        </div>

                        <ul className="text-xs text-slate-600 space-y-1 pt-1">
                          {pkg.highlights.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer price & CTA */}
                    <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">Price per person</span>
                        <span className="text-lg font-extrabold text-amber-700">₹{pkg.price.toLocaleString('en-IN')}</span>
                      </div>

                      <Link
                        to={`/packages/${pkg.id}`}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* MAP VIEW MODE */
            <div className="h-[550px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <MapContainer center={[24.6637, 93.9000]} zoom={9} className="w-full h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {filteredPackages.map((pkg) => (
                  <Marker key={pkg.id} position={[24.6637 + (Math.random() - 0.5) * 0.4, 93.9000 + (Math.random() - 0.5) * 0.4]}>
                    <Popup>
                      <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-24 object-cover rounded-lg" />
                        <h4 className="font-bold text-xs">{pkg.title}</h4>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-emerald-700">₹{pkg.price.toLocaleString('en-IN')}</span>
                          <span className="text-slate-600">{pkg.duration}</span>
                        </div>
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="block text-center py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                        >
                          View Package
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Buffer Zones (Avoidance Areas) */}
                {BUFFER_ZONES.map((zone) => (
                  <Circle
                    key={zone.id}
                    center={[zone.lat, zone.lng]}
                    radius={zone.radius}
                    pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.2 }}
                  >
                    <Popup>
                      <div className="p-1 text-slate-900 space-y-1">
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <h4 className="font-bold text-xs">Avoid: {zone.name}</h4>
                        </div>
                        <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{zone.desc}</p>
                        <div className="mt-1 text-[9px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block">
                          Restricted Buffer Zone
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
