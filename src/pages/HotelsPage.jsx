import React, { useState } from 'react';
import { HOTELS, AGENCIES, AFFILIATE_HOTELS } from '../data/mockData';
import { Building2, MapPin, Phone, Mail, Globe, Star, Search, Filter, ExternalLink, Briefcase } from 'lucide-react';
import BookingModal from '../components/booking/BookingModal';

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingHotel, setBookingHotel] = useState(null);

  const categories = ['All', '4-star', '3-star', 'Standard', 'Economy'];

  const filteredHotels = HOTELS.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hotel.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hotel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span>Hotels & Stays</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Book Your Perfect Stay</h1>
        <p className="text-sm text-slate-600 max-w-2xl font-medium">
          Discover comfort and luxury with our top-rated hotel partners in Manipur.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96 shrink-0">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotels or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="w-5 h-5 text-slate-400 shrink-0 hidden md:block mr-2" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === category 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{hotel.category}</span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{hotel.name}</h3>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hotel.address}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-xs text-slate-600 flex-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{hotel.rooms} Rooms Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{hotel.contact}</span>
                </div>
                {hotel.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{hotel.email}</span>
                  </div>
                )}
                {hotel.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>{hotel.website}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setBookingHotel(hotel)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors mt-auto"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredHotels.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No hotels found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Travel Agencies Section */}
      <div className="pt-8 border-t border-slate-200">
        <div className="space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
            <Briefcase className="w-4 h-4 text-blue-700" />
            <span>Travel Agencies & Tour Operators</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Partner Agencies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENCIES.map(agency => (
            <div key={agency.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col space-y-3">
              <h3 className="font-bold text-lg text-slate-900">{agency.name}</h3>
              <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg w-max uppercase tracking-wider">{agency.type}</span>
              <p className="text-sm text-slate-600 flex-1">{agency.description}</p>
              <div className="text-xs font-semibold text-emerald-700 pt-2 flex items-center gap-1">
                <Globe className="w-4 h-4" /> Available via {agency.platform}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Booking.com Section */}
      <div className="pt-8 border-t border-slate-200 mb-8">
        <div className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-200 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-3 flex-1">
            <h2 className="text-2xl font-bold text-amber-950">Looking for more options?</h2>
            <p className="text-amber-800 text-sm font-medium leading-relaxed">
              Check out our affiliate partner Booking.com for an extensive list of accommodations in Imphal. 
              Find popular stays like <span className="font-bold">{AFFILIATE_HOTELS.map(h => h.name).join(', ')}</span> and many more backpacker hostels and guesthouses.
            </p>
          </div>
          <a 
            href="https://www.booking.com/city/in/imphal.html" 
            target="_blank" 
            rel="noreferrer"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#003580] hover:bg-[#00224f] text-white rounded-xl font-bold shadow-md transition-colors"
          >
            <span>View on Booking.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {bookingHotel && (
        <BookingModal 
          pkg={{
            id: bookingHotel.id,
            title: bookingHotel.name,
            duration: '1 Night',
            price: 2500, // Dummy price for demo
            locations: [bookingHotel.address]
          }} 
          onClose={() => setBookingHotel(null)} 
        />
      )}
    </div>
  );
}
