import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Leaf, Heart, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Manipur Trails</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-600">
            A digital marketplace uniting verified travel agencies across Manipur. Promoting sustainable heritage, cultural preservation, and community-run eco-homestays.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Government ILP Compliant & Verified Operators</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Explore Manipur</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link to="/packages" className="hover:text-emerald-700 transition-colors">Tour Packages</Link></li>
            <li><Link to="/destinations" className="hover:text-emerald-700 transition-colors">Heritage Map & Pins</Link></li>
            <li><Link to="/culture" className="hover:text-emerald-700 transition-colors">Festival Calendar & Arts</Link></li>
            <li><Link to="/ai-planner" className="hover:text-emerald-700 transition-colors">AI Smart Trip Builder</Link></li>
            <li><Link to="/plan-visit" className="hover:text-emerald-700 transition-colors">Permit & Safety Guide</Link></li>
          </ul>
        </div>

        {/* Sustainable Tourism */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Sustainable Tourism</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Eco-Score certified packages</span>
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Direct local community benefit</span>
            </li>
            <li><span>Floating Phumdi Conservation</span></li>
            <li><span>Shirui Lily Protected Habitat Code</span></li>
          </ul>
        </div>

        {/* Tourist Helpline & Official Links */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Official & Emergency</h4>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>24/7 Helpline: 1800-345-3999</span>
            </div>
            <p className="text-[11px] text-slate-500">Inner Line Permit (ILP) required for non-resident domestic tourists.</p>
            <a
              href="https://manipurilp.mn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:underline font-bold"
            >
              <span>Verify Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 Manipur Trails. Built for Tourism Hackathon.</p>
        <p className="mt-2 sm:mt-0 flex items-center gap-1 font-medium">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Manipur Eco-Tourism
        </p>
      </div>
    </footer>
  );
}
