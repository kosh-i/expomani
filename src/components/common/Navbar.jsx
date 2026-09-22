import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Globe,
  Heart,
  UserCheck,
  Building2,
  ShieldAlert,
  Menu,
  X,
  WifiOff
} from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, activeRole, language, setLanguage, savedPackageIds, isOffline, toggleOfflineMode, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: Compass },
    { path: '/packages', label: t('nav.packages'), icon: MapPin },
    { path: '/destinations', label: t('nav.destinations'), icon: MapPin },
    { path: '/culture', label: t('nav.culture'), icon: Calendar },
    { path: '/hotels', label: 'Hotels', icon: Building2 },
    { path: '/ai-planner', label: t('nav.aiPlanner'), icon: Sparkles, badge: 'AI' },
    { path: '/plan-visit', label: t('nav.planVisit'), icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Offline Mode Banner if active */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 text-xs py-1 px-4 text-center flex items-center justify-center gap-2 font-semibold">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active — Viewing Cached Itineraries & Saved Tickets</span>
          <button onClick={toggleOfflineMode} className="underline font-bold ml-2">
            Go Online
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-600 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 bg-clip-text text-transparent">
              {t('brand')}
            </span>
            <span className="block text-[10px] text-emerald-700 font-semibold tracking-wide uppercase">
              Manipuri Trails & Heritage
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Saved, Role Switcher, i18n */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Saved Wishlist Button */}
          <Link
            to="/packages?saved=true"
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-rose-600 transition-colors"
            title="Saved Packages"
          >
            <Heart className="w-4 h-4" />
            {savedPackageIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {savedPackageIds.length}
              </span>
            )}
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <select
              value={language}
              onChange={handleLangChange}
              className="bg-transparent text-xs text-slate-700 focus:outline-none cursor-pointer font-semibold"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mni">ꯃꯩꯇꯩꯂꯣꯟ (Meiteilon)</option>
            </select>
          </div>

          {/* Auth Controls */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={activeRole === 'admin' ? '/admin' : activeRole === 'agency' ? '/agency' : '/profile'} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="capitalize">{activeRole}</span>
                </Link>
                <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-1.5 rounded-lg text-emerald-700 text-xs font-bold hover:bg-emerald-50">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200"
              >
                <link.icon className="w-4 h-4 text-emerald-600" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link to={activeRole === 'admin' ? '/admin' : activeRole === 'agency' ? '/agency' : '/profile'} onClick={() => setMobileMenuOpen(false)} className="py-2 text-center text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800">
                  My Profile ({activeRole})
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-700">
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center text-xs font-bold rounded-lg border border-emerald-600 text-emerald-700">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center text-xs font-bold rounded-lg bg-emerald-600 text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
