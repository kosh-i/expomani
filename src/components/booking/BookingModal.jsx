import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, QrCode, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import TicketModal from '../common/TicketModal';

export default function BookingModal({ packageData, onClose }) {
  const { addBooking } = useAppStore();

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState('2026-11-22');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card'
  const [upiId, setUpiId] = useState('rohan@upi');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = packageData.price * travelers;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking = {
        id: `MT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        packageId: packageData.id,
        packageTitle: packageData.title,
        date,
        travelers,
        totalAmount: totalPrice,
        status: 'Confirmed',
        travelerName: name || 'Rohan Sharma',
        travelerEmail: email || 'rohan.sharma@example.com',
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId})` : 'Credit Card ending 4242',
        createdAt: new Date().toISOString().split('T')[0]
      };

      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  if (step === 3 && confirmedBooking) {
    return <TicketModal booking={confirmedBooking} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-left">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Step {step} of 2</span>
            <h3 className="text-lg font-bold text-white">Book: {packageData.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Traveler Details */}
        {step === 1 && (
          <form onSubmit={() => setStep(2)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Travel Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Number of Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>{num} Traveler(s)</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Rohan Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rohan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Booking Amount ({travelers} travelers):</span>
              <span className="text-lg font-bold text-amber-400">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Gateway */}
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
                  paymentMethod === 'upi'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR Scan</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit Card</span>
              </button>
            </div>

            {paymentMethod === 'upi' ? (
              <div className="space-y-3 text-center">
                <p className="text-xs text-slate-300">Scan QR Code or enter VPA address to complete payment</p>
                <div className="w-36 h-36 bg-white mx-auto p-3 rounded-2xl shadow-xl flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-950" />
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-center text-emerald-400 font-mono"
                />
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
                <input
                  type="text"
                  placeholder="4532 •••• •••• 4242"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-center font-mono"
                  />
                  <input
                    type="password"
                    maxLength="3"
                    placeholder="CVV"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-center font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950"
            >
              {isProcessing ? (
                <span>Processing Encrypted Payment...</span>
              ) : (
                <span>Pay ₹{totalPrice.toLocaleString('en-IN')} & Generate Ticket</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
