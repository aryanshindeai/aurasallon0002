'use client';

import React, { useState, useEffect } from 'react';
import { SALON_CONFIG, ServiceItem } from '@/config/salon-config';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Coffee, CheckCircle2, X, Sparkles, Phone, ShieldCheck, Download, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialStylist?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService,
  initialStylist,
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<string>(
    initialService || SALON_CONFIG.services[0].name
  );
  const [selectedStylist, setSelectedStylist] = useState<string>(
    initialStylist || 'Next Available Master Director'
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [minDate, setMinDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [beverage, setBeverage] = useState<string>('Artisanal Pour-Over Espresso');

  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');

  const [bookingPass, setBookingPass] = useState<any | null>(null);

  const timeSlots = [
    '10:30 AM',
    '11:45 AM',
    '01:15 PM',
    '02:45 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const beverages = [
    'Artisanal Pour-Over Espresso',
    'Japanese Uji Organic Matcha',
    'Sparkling Botanical Rose Water',
    'Cold Brew Jasmine Infusion',
    'Chilled Mineral Water',
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const pass = {
      passId: 'AURA-' + Math.floor(100000 + Math.random() * 900000),
      clientName: clientName || 'VIP Guest',
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      beverage: beverage,
      phone: clientPhone,
    };

    setBookingPass(pass);
    setStep(5);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF6DF', '#E5C158', '#FFFFFF'],
      });
    } catch (err) {}
  };

  const getWhatsAppUrl = () => {
    if (!bookingPass) return '#';
    const msg = `Hello Aura The Salon! I have reserved a VIP session:
Pass ID: ${bookingPass.passId}
Guest: ${bookingPass.clientName}
Service: ${bookingPass.service}
Stylist: ${bookingPass.stylist}
Date: ${bookingPass.date} at ${bookingPass.time}
Beverage: ${bookingPass.beverage}
Phone: ${bookingPass.phone}`;
    return `https://wa.me/${SALON_CONFIG.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-2xl w-full bg-[#12100E] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5C158] font-mono block">
              Hotel-Grade Reservation System
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Reserve Your <span className="gold-gradient-text italic">Aura Chair.</span>
            </h2>
          </div>

          {step < 5 && (
            /* Progress Bar */
            <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-4 text-stone-400">
              <span className={step >= 1 ? 'text-[#E5C158]' : ''}>01 Service</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-[#E5C158]' : ''}>02 Director</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-[#E5C158]' : ''}>03 Schedule</span>
              <span>→</span>
              <span className={step >= 4 ? 'text-[#E5C158]' : ''}>04 Guest Info</span>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-[#E5C158] font-mono block">
                Select Your Desired Service:
              </label>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {SALON_CONFIG.services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s.name)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedService === s.name
                        ? 'bg-[#181512] border-[#E5C158] text-white shadow-md'
                        : 'bg-[#070606] border-stone-800 text-stone-400 hover:border-stone-600'
                    }`}
                  >
                    <div>
                      <div className="font-serif-luxury text-lg text-white">{s.name}</div>
                      <div className="text-[10px] font-mono text-stone-500">{s.duration}</div>
                    </div>
                    <span className="text-xs font-mono text-[#E5C158]">{s.price}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest"
              >
                Continue to Director Selection
              </button>
            </div>
          )}

          {/* Step 2: Stylist Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-[#E5C158] font-mono block">
                Choose Preferred Master Director:
              </label>

              <div className="space-y-2">
                {['Next Available Master Director', ...SALON_CONFIG.experts.map((e) => e.name)].map((name) => (
                  <div
                    key={name}
                    onClick={() => setSelectedStylist(name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedStylist === name
                        ? 'bg-[#181512] border-[#E5C158] text-white font-medium'
                        : 'bg-[#070606] border-stone-800 text-stone-400 hover:border-stone-600'
                    }`}
                  >
                    <span className="font-serif-luxury text-lg">{name}</span>
                    {selectedStylist === name && <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-full bg-stone-900 text-stone-400 text-xs font-mono uppercase"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3.5 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest"
                >
                  Select Date & Time
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#E5C158] font-mono block mb-2">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={minDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#070606] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:border-[#E5C158] text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#E5C158] font-mono block mb-2">
                  Available Time Slots:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl border text-xs font-mono transition-all ${
                        selectedTime === slot
                          ? 'bg-[#E5C158] text-black font-semibold border-[#E5C158]'
                          : 'bg-[#070606] border-stone-800 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#C5A059] font-mono block mb-2 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#E5C158]" />
                  Complimentary Artisanal Refreshment:
                </label>
                <select
                  value={beverage}
                  onChange={(e) => setBeverage(e.target.value)}
                  className="w-full bg-[#070606] border border-stone-800 rounded-xl px-3 py-2.5 text-stone-200 text-xs font-mono"
                >
                  {beverages.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 rounded-full bg-stone-900 text-stone-400 text-xs font-mono uppercase"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 py-3.5 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest"
                >
                  Guest Contact Details
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Guest Contact Form */}
          {step === 4 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-stone-400 uppercase tracking-widest block mb-1">
                  Full Name / VIP Guest Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-[#070606] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:border-[#E5C158]"
                />
              </div>

              <div>
                <label className="text-stone-400 uppercase tracking-widest block mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-[#070606] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:border-[#E5C158]"
                />
              </div>

              <div>
                <label className="text-stone-400 uppercase tracking-widest block mb-1">
                  Special Requests / Allergies / Hair History:
                </label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Sensitive scalp, previous henna tint, preferred quiet session"
                  className="w-full bg-[#070606] border border-stone-800 rounded-xl px-4 py-2.5 text-stone-200 focus:border-[#E5C158]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-1/3 py-3 rounded-full bg-stone-900 text-stone-400 text-xs font-mono uppercase"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest shadow-xl"
                >
                  Confirm VIP Reservation Pass
                </button>
              </div>
            </form>
          )}

          {/* Step 5: Confirmation Pass */}
          {step === 5 && bookingPass && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-mono block">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif-luxury text-3xl text-white font-light mt-1">
                  Your VIP Pass is Ready.
                </h3>
              </div>

              {/* Pass Card Component */}
              <div className="glass-panel p-6 rounded-3xl border-2 border-[#D4AF37]/50 text-left space-y-4 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="font-serif-luxury text-2xl tracking-widest text-[#E5C158]">
                      AURA
                    </span>
                    <span className="text-[9px] font-mono text-stone-400 block">
                      The Salon • Civil Lines Chandrapur
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#070606] text-[#E5C158] font-mono text-xs border border-[#D4AF37]/30">
                    {bookingPass.passId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-300">
                  <div>
                    <span className="text-stone-500 block text-[10px]">GUEST:</span>
                    <span className="text-white font-semibold">{bookingPass.clientName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">DIRECTOR:</span>
                    <span className="text-[#E5C158]">{bookingPass.stylist}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">SERVICE:</span>
                    <span className="text-white">{bookingPass.service}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">SCHEDULE:</span>
                    <span className="text-white">{bookingPass.date} @ {bookingPass.time}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800 text-[11px] font-mono text-[#C5A059] flex items-center justify-between">
                  <span>Beverage: {bookingPass.beverage}</span>
                  <span className="text-emerald-400 text-[10px]">Valet Reserved</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Pass to Salon WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase"
                >
                  Close Pass
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
