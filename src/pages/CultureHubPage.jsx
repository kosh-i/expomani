import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MANIPUR_FESTIVALS, ART_FORMS, FOOD_GUIDE } from '../data/mockData';
import { Calendar, Sparkles, Utensils, Flame, ChevronRight, Music, Heart } from 'lucide-react';

export default function CultureHubPage() {
  const [activeTab, setActiveTab] = useState('festivals'); // 'festivals' | 'arts' | 'food'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Heritage & Living Culture Hub</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Festivals, Classical Arts & Manipuri Cuisine</h1>
        <p className="text-xs text-slate-600 max-w-2xl font-medium">
          Immerse yourself in Manipur's rich 2000-year living heritage — from classical Ras Leela dances to indigenous martial arts, Longpi black pottery, and organic culinary feasts.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('festivals')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'festivals'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Festival Calendar (6 Major Events)</span>
        </button>

        <button
          onClick={() => setActiveTab('arts')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'arts'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Art Forms & Black Pottery</span>
        </button>

        <button
          onClick={() => setActiveTab('food')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'food'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Local Culinary Guide</span>
        </button>
      </div>

      {/* 1. FESTIVAL CALENDAR VIEW */}
      {activeTab === 'festivals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANIPUR_FESTIVALS.map((fest) => (
            <div key={fest.id} className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <img src={fest.image} alt={fest.name} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-amber-700 font-bold">
                    <span>{fest.dates}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{fest.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{fest.description}</p>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Festival Highlights:</span>
                    <ul className="text-xs text-slate-700 space-y-1 font-medium">
                      {fest.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/packages/${fest.matchingPkgId}`}
                  className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>View Festival Tour Packages</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. ART & CRAFT HERITAGE STORIES */}
      {activeTab === 'arts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ART_FORMS.map((art) => (
            <div key={art.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-start gap-6 text-left shadow-sm">
              <img src={art.image} alt={art.title} className="w-full sm:w-44 h-44 object-cover rounded-2xl shrink-0" />
              <div className="space-y-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  {art.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{art.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{art.description}</p>
                <p className="text-xs text-slate-500 italic">History: {art.historicalContext}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. MANIPURI CULINARY GUIDE */}
      {activeTab === 'food' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOOD_GUIDE.map((food) => (
            <div key={food.id} className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 text-left shadow-sm">
              <img src={food.image} alt={food.name} className="w-full h-40 object-cover rounded-2xl" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700">{food.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${food.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {food.isVeg ? 'Pure Veg' : 'Non-Veg Traditional'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{food.name}</h3>
              <p className="text-xs text-slate-600 font-medium">{food.desc}</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-medium">
                <span className="font-bold text-slate-900 block">Ingredients:</span>
                <span>{food.ingredients}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
