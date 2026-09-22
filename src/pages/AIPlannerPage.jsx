import React, { useState } from 'react';
import { generateAITripPlan } from '../services/aiService';
import { useAppStore } from '../store/useAppStore';
import { Sparkles, Calendar, Users, DollarSign, Compass, Leaf, Download, Save, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import EcoBadge from '../components/common/EcoBadge';

export default function AIPlannerPage() {
  const { saveAIItinerary, savedItineraries } = useAppStore();

  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState('Mid-range');
  const [groupType, setGroupType] = useState('Couple');
  const [season, setSeason] = useState('Winter & Spring');
  const [interests, setInterests] = useState(['Eco-Tourism', 'Heritage']);
  const [apiKey, setApiKey] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableInterests = [
    'Eco-Tourism',
    'Heritage & Forts',
    'Sangai Wildlife',
    'Highland Treks',
    'Black Pottery Crafts',
    'Manipuri Foodie',
    'Festival Special'
  ];

  const handleInterestToggle = (item) => {
    setInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setSavedSuccess(false);

    try {
      const plan = await generateAITripPlan({
        days,
        budget,
        groupType,
        season,
        interests,
        apiKey
      });
      setGeneratedPlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOffline = () => {
    if (generatedPlan) {
      saveAIItinerary(generatedPlan);
      setSavedSuccess(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-20 pt-4 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
          <span>Smart Tourism AI Itinerary Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Plan Your Custom Manipur Trip with AI</h1>
        <p className="text-xs text-slate-600 max-w-2xl font-medium">
          Enter your trip parameters below. Our AI engine generates a day-by-day route, calculates your carbon offset savings, pairs you with verified local homestays, and saves it offline for your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INPUT WIZARD FORM */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5 h-fit shadow-sm">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Trip Parameters</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Days Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Duration (Days)</label>
                <span className="font-bold text-emerald-700">{days} Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Budget Tier */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Budget Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {['Budget', 'Mid-range', 'Luxury'].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                      budget === b
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Traveler Group</label>
              <select
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800"
              >
                <option value="Solo">Solo Traveler</option>
                <option value="Couple">Couple / Pair</option>
                <option value="Family">Family with Children</option>
                <option value="Friends">Friends Group</option>
              </select>
            </div>

            {/* Interests checklist */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Interests</label>
              <div className="flex flex-wrap gap-1.5">
                {availableInterests.map((item) => {
                  const isSelected = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleInterestToggle(item)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Anthropic API Key input */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-[10px] text-slate-500 block mb-1 font-semibold">
                Optional Anthropic API Key (or leave blank for mock engine)
              </label>
              <input
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] text-slate-700 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>{isGenerating ? 'Synthesizing AI Itinerary...' : 'Generate Smart AI Itinerary'}</span>
            </button>
          </form>
        </div>

        {/* OUTPUT ITINERARY DISPLAY */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <Sparkles className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">AI Engine Reasoner in Progress...</h3>
              <p className="text-xs text-slate-500 font-medium">
                Calculating carbon offsets, cross-referencing Loktak Lake floating homestays, and arranging heritage tours...
              </p>
            </div>
          ) : generatedPlan ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-md animate-fade-in">
              {/* Plan Header & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <EcoBadge score={96} size="sm" />
                    <span className="text-xs text-amber-800 font-bold">
                      Estimated Cost: ₹{generatedPlan.estimatedTotalCostINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{generatedPlan.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveOffline}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savedSuccess ? 'Saved Offline ✓' : 'Save Offline (PWA)'}</span>
                  </button>
                </div>
              </div>

              {/* Eco Savings Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Carbon Savings: ~{generatedPlan.estimatedCarbonSavingsKg} kg CO2e</span>
                </div>
                <span>
                  {generatedPlan.communityContributionPercent}% Local Host Retention
                </span>
              </div>

              {/* Day-by-day Cards */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Day-by-Day AI Route</h3>
                {generatedPlan.dayWise.map((dayItem) => (
                  <div key={dayItem.day} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-700">Day {dayItem.day}: {dayItem.location}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                        Coords: {dayItem.coordinates.join(', ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{dayItem.title}</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200 font-medium">
                      <div>
                        <span className="text-[10px] text-amber-800 uppercase font-bold block">Morning</span>
                        <p>{dayItem.morning}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-teal-800 uppercase font-bold block">Afternoon</span>
                        <p>{dayItem.afternoon}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Evening</span>
                        <p>{dayItem.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Package */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Matched Verified Package</span>
                  <span className="text-xs font-bold text-white">{generatedPlan.suggestedPackage.title}</span>
                </div>
                <a
                  href={`/packages/${generatedPlan.suggestedPackage.id}`}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs"
                >
                  Book Package
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Your Custom AI Itinerary Will Appear Here</h3>
              <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                Adjust the trip parameters on the left and click "Generate Smart AI Itinerary" to build your route.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
