'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Compass,
  Star,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Car,
  Footprints,
  Bus,
  ShoppingBag,
  Coffee,
  Building2,
  Landmark,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import dynamic from 'next/dynamic';
import { LANDMARKS } from '@/components/landmarks-data';

const LuxuryInteractiveMap = dynamic(
  () => import('@/components/luxury-interactive-map'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] sm:min-h-[580px] bg-[#0E0C0A] flex flex-col items-center justify-center gap-3 text-stone-400 rounded-3xl border border-[#D4AF37]/20">
        <Compass className="w-8 h-8 animate-spin text-[#E5C158]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Loading Sanctuary Map...</span>
      </div>
    )
  }
);

export default function LocationContact() {
  const brand = SALON_CONFIG.brand;

  // Interactive Map State
  const [mapMode, setMapMode] = useState<'dark' | 'satellite'>('dark');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string | null>('sbi');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Inquiry Form State
  const [inquirySent, setInquirySent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setInquirySent(false);
    }, 4500);
  };

  // Google Maps URLs
  const exactAddressQuery = encodeURIComponent("Aura The Salon Beside SBI Nagpur Road Bapat Nagar Square Civil Lines Chandrapur Maharashtra 442401");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${exactAddressQuery}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${exactAddressQuery}`;
  const whatsappUrl = `https://wa.me/918668806851?text=${encodeURIComponent("Hello Aura Concierge, I would like to inquire about booking a luxury consultation at Civil Lines.")}`;

  const filteredLandmarks = filterCategory === 'all' 
    ? LANDMARKS 
    : LANDMARKS.filter(l => l.category === filterCategory);

  return (
    <section id="contact" className="py-28 relative bg-[#070606] border-t border-[#D4AF37]/15 overflow-hidden select-none">
      {/* Golden Light Sweep Beam across section top */}
      <motion.div 
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: '100%', opacity: [0, 0.7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#E5C158] to-transparent pointer-events-none z-20"
      />

      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CINEMATIC INTRO HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161310] border border-[#D4AF37]/40 text-[#E5C158] text-[11px] uppercase tracking-[0.3em] font-mono shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#E5C158]" />
            <span>Sanctuary Navigation & Arrival</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light tracking-wide">
            Find Your Way to <span className="gold-gradient-text italic font-serif">Aura.</span>
          </h2>

          <p className="text-stone-300 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Luxury begins before you even walk through our doors. Guided concierge arrival at Civil Lines, Chandrapur.
          </p>
        </motion.div>

        {/* WORLD-CLASS INTERACTIVE MAP CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`relative mb-16 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#0E0C0A] shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 hover:border-[#D4AF37]/70 ${
            isFullscreen ? 'fixed inset-4 z-[999] h-[calc(100vh-2rem)] rounded-2xl m-0' : 'h-auto'
          }`}
        >
          {/* Map Header Bar */}
          <div className="px-5 sm:px-6 py-4 bg-[#14110E] border-b border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#1A1612] border border-[#D4AF37]/30 text-[#E5C158]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-serif-luxury text-base sm:text-lg font-light tracking-wide flex items-center gap-2">
                  <span>Aura The Salon Flagship</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C158] uppercase">
                    Civil Lines
                  </span>
                </h3>
                <p className="text-xs font-mono text-stone-400 mt-0.5">Beside SBI, Bapat Nagar Sq, Civil Lines, Chandrapur, MH</p>
              </div>
            </div>

            {/* Map Mode Switchers & Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-1 rounded-xl bg-[#090807] border border-stone-800 flex items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setMapMode('dark')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    mapMode === 'dark' 
                      ? 'bg-gradient-to-r from-[#E5C158] to-[#C5A059] text-black font-semibold shadow-md' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Luxury Dark</span>
                </button>
                <button
                  onClick={() => setMapMode('satellite')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    mapMode === 'satellite' 
                      ? 'bg-gradient-to-r from-[#E5C158] to-[#C5A059] text-black font-semibold shadow-md' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Satellite</span>
                </button>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 hover:shadow-[0_0_20px_rgba(229,193,88,0.4)] transition-all"
              >
                <Navigation className="w-4 h-4 fill-black" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Interactive Map Viewport with Floating Sidebar Overlay */}
          <div className="relative h-[500px] sm:h-[580px] w-full bg-[#050505] overflow-hidden">
            <LuxuryInteractiveMap 
              mapMode={mapMode}
              selectedLandmarkId={selectedLandmarkId}
              onSelectLandmark={(id) => setSelectedLandmarkId(id)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            />

            {/* FLOATING LUXURY LOCATION SIDEBAR CARD */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-sm w-[calc(100%-2rem)] sm:w-80 glass-panel p-5 sm:p-6 rounded-3xl border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl bg-[#080706]/92 space-y-4 z-[400] pointer-events-auto">
              <div className="flex items-start justify-between gap-3 border-b border-stone-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[#E5C158] text-[10px] uppercase font-mono tracking-widest mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Flagship Sanctuary</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl text-white font-medium leading-none">Aura The Salon</h4>
                  <p className="text-stone-300 text-xs font-light mt-1">Civil Lines, Chandrapur, MH</p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-mono font-bold shadow-inner">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.7 ★</span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 mt-1">115+ Reviews</span>
                </div>
              </div>

              {/* ESTIMATED TRAVEL TIMES CARDS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                  Estimated Arrival Times:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-[#14110E] border border-stone-800 text-stone-300 flex flex-col items-center hover:border-[#D4AF37]/50 hover:bg-[#1A1612] transition-all">
                    <Car className="w-3.5 h-3.5 text-[#E5C158] mb-1" />
                    <span className="text-white font-semibold text-xs">5 min</span>
                    <span className="text-[9px] text-stone-400">by car</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#14110E] border border-stone-800 text-stone-300 flex flex-col items-center hover:border-[#D4AF37]/50 hover:bg-[#1A1612] transition-all">
                    <Footprints className="w-3.5 h-3.5 text-[#E5C158] mb-1" />
                    <span className="text-white font-semibold text-xs">12 min</span>
                    <span className="text-[9px] text-stone-400">walking</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#14110E] border border-stone-800 text-stone-300 flex flex-col items-center hover:border-[#D4AF37]/50 hover:bg-[#1A1612] transition-all">
                    <Bus className="w-3.5 h-3.5 text-[#E5C158] mb-1" />
                    <span className="text-white font-semibold text-xs">8 min</span>
                    <span className="text-[9px] text-stone-400">by auto</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2 pt-1">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(229,193,88,0.5)]"
                >
                  <Navigation className="w-3.5 h-3.5 fill-black" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-[#14110E] hover:bg-[#1E1914] border border-stone-800 hover:border-[#D4AF37]/50 text-stone-200 font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MapPin className="w-3 h-3 text-[#E5C158]" />
                    <span>Google Maps</span>
                  </a>

                  <a
                    href={`tel:${brand.phoneClean}`}
                    className="py-2.5 rounded-xl bg-[#14110E] hover:bg-[#1E1914] border border-stone-800 hover:border-[#D4AF37]/50 text-stone-200 font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3 h-3 text-[#E5C158]" />
                    <span>Call Salon</span>
                  </a>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#14110E] hover:bg-emerald-950/60 border border-stone-800 hover:border-emerald-500/50 text-emerald-400 font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* DISCOVER THE NEIGHBORHOOD HUD BAR */}
          <div className="p-5 bg-[#120F0C] border-t border-[#D4AF37]/20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-white font-serif-luxury text-base font-light flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E5C158]" />
                  <span>Discover the Neighborhood</span>
                </h4>
                <p className="text-stone-400 text-xs font-light">Key landmarks & travel times surrounding Aura Civil Lines</p>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
                {['all', 'banking', 'dining', 'shopping', 'hospitality', 'transit'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                      filterCategory === cat
                        ? 'bg-[#E5C158] text-black font-semibold shadow-md'
                        : 'bg-[#1A1612] text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmark Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {filteredLandmarks.map((lm) => {
                const IconComponent = lm.icon;
                const isSelected = selectedLandmarkId === lm.id;
                return (
                  <div
                    key={lm.id}
                    onClick={() => setSelectedLandmarkId(lm.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1D1813] border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                        : 'bg-[#16120F] border-stone-800/80 hover:border-stone-700 hover:bg-[#1A1612]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#E5C158] text-black' : 'bg-[#221C16] text-[#E5C158]'}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#E5C158] bg-[#221C16] px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                        {lm.time}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-white text-xs font-medium line-clamp-1">{lm.name}</h5>
                      <p className="text-stone-400 text-[10px] font-mono mt-0.5">{lm.distance} away</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* DETAILED SANCTUARY ADDRESS & VIP CONCIERGE INQUIRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Location Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 glass-panel p-8 rounded-3xl space-y-8 border-2 border-[#D4AF37]/30 bg-[#120F0C]/80 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Subtle Gold Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-mono block">
                Official Sanctuary Address
              </span>
              <h3 className="font-serif-luxury text-3xl text-white font-light mt-1">
                Aura The Salon Flagship
              </h3>
              <p className="text-stone-300 text-sm font-light mt-3 leading-relaxed">
                Aside SBI, Nagpur Road,<br />
                Bapat Nagar Square, Civil Lines,<br />
                Chandrapur, Maharashtra 442401
              </p>
            </div>

            {/* Contact Specs List */}
            <div className="space-y-4 pt-4 border-t border-stone-800 text-xs font-mono text-stone-300">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#1A1511] border border-[#D4AF37]/30 text-[#E5C158]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">CONCIERGE DIRECT:</span>
                  <a href={`tel:${brand.phoneClean}`} className="text-white hover:text-[#E5C158] font-medium text-sm transition-colors">
                    +91 {brand.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#1A1511] border border-[#D4AF37]/30 text-[#E5C158]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">OPERATING HOURS:</span>
                  <span className="text-white text-sm">{brand.hours}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#1A1511] border border-[#D4AF37]/30 text-[#E5C158]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">EMAIL INQUIRIES:</span>
                  <span className="text-stone-300 text-sm">{brand.email}</span>
                </div>
              </div>
            </div>

            {/* External Maps Action */}
            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_25px_rgba(229,193,88,0.4)] transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </motion.div>

          {/* Direct VIP Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 glass-panel p-8 rounded-3xl space-y-6 border border-[#D4AF37]/25 bg-[#120F0C]/80 backdrop-blur-xl"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5C158] font-mono block">
                VIP Bridal & Custom Consultation
              </span>
              <h3 className="font-serif-luxury text-3xl text-white font-light mt-1">
                Concierge Direct Inquiry
              </h3>
              <p className="text-stone-400 text-xs font-light mt-1">
                Schedule group bookings, private hair consultations, or bridal appointments.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-mono space-y-3 text-center animate-fade-in">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <p className="font-semibold text-base text-white font-serif-luxury">Message Transmitted</p>
                <p className="text-stone-300 font-sans text-xs">Our Concierge Director will reach out to you within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-stone-400 uppercase tracking-widest block mb-1.5 text-[11px]">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Deshmukh"
                    className="w-full bg-[#080706] border border-stone-800 focus:border-[#E5C158] rounded-xl px-4 py-3.5 text-stone-200 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-stone-400 uppercase tracking-widest block mb-1.5 text-[11px]">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 86688 06851"
                    className="w-full bg-[#080706] border border-stone-800 focus:border-[#E5C158] rounded-xl px-4 py-3.5 text-stone-200 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-stone-400 uppercase tracking-widest block mb-1.5 text-[11px]">
                    Inquiry / Service Requirement:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Inquiry regarding 3-day bridal makeover package and group booking"
                    className="w-full bg-[#080706] border border-stone-800 focus:border-[#E5C158] rounded-xl px-4 py-3.5 text-stone-200 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1A1511] hover:bg-[#251F19] border border-[#D4AF37]/50 hover:border-[#E5C158] text-[#E5C158] hover:text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(229,193,88,0.2)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

