import React, { useState } from 'react';
import { SAFETY_EMERGENCY_CONTACTS } from '../data/mockData';
import { ShieldCheck, ShieldAlert, Phone, CloudSun, Plane, Train, Car, CheckSquare, Square, ExternalLink, Info } from 'lucide-react';

export default function PlanYourVisitPage() {
  const [packingItems, setPackingItems] = useState([
    { id: 1, text: "Valid Govt Photo ID / Passport (mandatory for ILP)", checked: true },
    { id: 2, text: "Inner Line Permit (ILP) soft/hard copy", checked: true },
    { id: 3, text: "Light woolens for hill stations (Ukhrul/Shirui)", checked: false },
    { id: 4, text: "Rain gear / umbrella for monsoon season", checked: false },
    { id: 5, text: "Eco-friendly reusable water bottle", checked: true },
    { id: 6, text: "Trekking shoes with solid grip for Shirui Lily trek", checked: false },
  ]);

  const togglePacking = (id) => {
    setPackingItems(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4 text-left">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Tourist Experience & Official Guidance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Plan Your Visit to Manipur</h1>
        <p className="text-xs text-slate-600 max-w-2xl font-medium">
          Everything you need for a safe, seamless, and responsible trip: Inner Line Permit (ILP) procedures, 24/7 emergency contacts, weather forecasts, and travel route connectivity.
        </p>
      </div>

      {/* 1. INNER LINE PERMIT (ILP) GUIDE & OFFICIAL GOVT NOTE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Inner Line Permit (ILP) Guidelines</h2>
            <p className="text-xs text-blue-800 font-semibold">Mandatory entry requirement for domestic Indian tourists visiting Manipur</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Official Government Portal Disclaimer</span>
          </div>
          <p className="font-medium">
            Please note: Inner Line Permits are officially issued by the Government of Manipur. Verify all rules and submit your online permit application directly at the official government portal:
          </p>
          <a
            href="https://manipurilp.mn.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:underline pt-1"
          >
            <span>manipurilp.mn.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Temporary ILP</h4>
            <p className="text-slate-600 font-medium">Valid for 15 Days</p>
            <p className="text-emerald-700 font-bold">Fee: ₹100 / person</p>
            <p className="text-[11px] text-slate-500 font-medium">Ideal for short holiday vacations & festival trips.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Regular ILP</h4>
            <p className="text-slate-600 font-medium">Valid for 6 Months</p>
            <p className="text-emerald-700 font-bold">Fee: ₹500 / person</p>
            <p className="text-[11px] text-slate-500 font-medium">Requires local Manipur resident reference.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Documents Needed</h4>
            <ul className="text-slate-700 space-y-1 text-[11px] font-medium">
              <li>• Aadhaar Card / Voter ID / Passport</li>
              <li>• 2 Recent Passport Photos</li>
              <li>• Hotel / Homestay Booking Slip</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. SAFETY & EMERGENCY DIRECTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>24/7 Tourist Safety & Emergency Helplines</span>
          </div>

          <div className="space-y-3">
            {SAFETY_EMERGENCY_CONTACTS.map((contact, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{contact.service}</span>
                <a
                  href={`tel:${contact.number}`}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-100 text-rose-800 border border-rose-200 font-bold font-mono hover:bg-rose-200"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-600" />
                  <span>{contact.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SMART PACKING LIST CHECKLIST */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <span>Smart Manipur Travel Packing List</span>
          </div>

          <div className="space-y-2">
            {packingItems.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePacking(item.id)}
                className={`w-full p-3 rounded-2xl border text-xs text-left flex items-center gap-3 transition-colors font-medium ${
                  item.checked
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={item.checked ? 'line-through text-slate-500' : ''}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CONNECTIVITY & ROUTE GUIDE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm text-left">
        <h3 className="text-lg font-bold text-slate-900">Transportation & Travel Connectivity</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Plane className="w-4 h-4" />
              <span>By Air (Imphal Airport - IMF)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Imphal Bir Tikendrajit International Airport (IMF) is 8 km from city center. Direct flight connections to Kolkata, Guwahati, Delhi, and Agartala.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-bold">
              <Train className="w-4 h-4" />
              <span>By Rail (Jiribam Link)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Jiribam railway station connects Manipur to the broad-gauge network. Nearest major rail hub is Dimapur (215 km away) with regular bus/taxi connections.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <Car className="w-4 h-4" />
              <span>By Highway Road</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              NH-37 (via Silchar) and NH-102 (Indo-Myanmar highway) connect Imphal. Registered tourist taxis and EV shuttles available at Imphal terminal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
