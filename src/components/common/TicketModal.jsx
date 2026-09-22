import React from 'react';
import { ShieldCheck, Download, Printer, CheckCircle2, QrCode, Sparkles, MapPin, Calendar, Users, X, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TicketModal({ booking, onClose }) {
  React.useEffect(() => {
    // Launch celebratory confetti when ticket pops up
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/40 hover:bg-slate-950 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs tracking-wider uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Booking Confirmed & Verified Ticket</span>
          </div>
          <h2 className="text-xl font-bold">{booking.packageTitle}</h2>
          <p className="text-xs text-emerald-100/80 mt-1">Booking ID: <span className="font-mono font-bold">{booking.id}</span></p>
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 space-y-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Traveler Name</span>
              <span className="font-semibold text-slate-100">{booking.travelerName || 'Rohan Sharma'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Travel Date</span>
              <div className="flex items-center gap-1 font-semibold text-emerald-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{booking.date}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Group Size</span>
              <div className="flex items-center gap-1 font-semibold text-slate-200">
                <Users className="w-3.5 h-3.5" />
                <span>{booking.travelers} Traveler(s)</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Paid</span>
              <span className="font-bold text-amber-400 text-sm">₹{booking.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* QR Code & Eco Certificate Barcode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-emerald-500/20">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <Leaf className="w-4 h-4" />
                <span>Eco-Certified Tourist Ticket</span>
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs">
                75% of your package cost directly empowers Meitei, Tangkhul & Kuki local village hosts.
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>ILP Verification Assist Included</span>
              </div>
            </div>

            {/* Mock QR Code Graphic */}
            <div className="w-20 h-20 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded flex flex-col items-center justify-center p-1 text-[8px] text-emerald-400 font-mono text-center leading-tight">
                <QrCode className="w-10 h-10 text-white" />
                <span className="mt-0.5 text-[7px] text-slate-300">SCAN ILP</span>
              </div>
            </div>
          </div>

          {/* Buttons: Download / Print */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
            >
              <Download className="w-4 h-4" />
              <span>Download Digital Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
