'use client';

import React, { useState } from 'react';
import { SALON_CONFIG, RoomWalkthrough } from '@/config/salon-config';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

export default function SpatialJourney() {
  const rooms = SALON_CONFIG.walkthroughRooms;
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0].id);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  return (
    <section id="walkthrough" className="py-24 relative bg-[#070606] overflow-hidden border-t border-[#D4AF37]/10">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Virtual Spatial Walkthrough</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Walk Through <span className="gold-gradient-text italic">Aura Sanctuary.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            Step through our rooms designed with Italian marble, Japanese reclining hair basins, and shadowless daylight mirrors.
          </p>
        </div>

        {/* Spatial Room Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {rooms.map((room) => {
            const isActive = room.id === activeRoomId;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                data-cursor={room.name}
                className={`px-5 py-3 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 font-mono flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'bg-[#12100E] border border-[#D4AF37]/20 text-stone-400 hover:text-white hover:border-[#E5C158]'
                }`}
              >
                <span>{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* Room Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/20">
          {/* Room Photography */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[450px] rounded-2xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeRoom.id}
                src={typeof activeRoom.image === 'string' ? activeRoom.image : (activeRoom.image as { src: string }).src}
                alt={activeRoom.name}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#E5C158] bg-[#070606]/80 p-3 rounded-xl border border-[#D4AF37]/30 backdrop-blur-md">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {activeRoom.ambience}
              </span>
              <span className="text-stone-400 text-[10px] uppercase">8K Hasselblad View</span>
            </div>
          </div>

          {/* Room Description & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-mono block mb-1">
                Room Perspective 0{rooms.findIndex((r) => r.id === activeRoom.id) + 1}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F4EF] font-light">
                {activeRoom.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#E5C158] font-mono mt-1">
                {activeRoom.tagline}
              </p>
            </div>

            <p className="text-stone-300 text-sm font-light leading-relaxed">
              {activeRoom.desc}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
                Architectural Features:
              </span>
              {activeRoom.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Medical Grade Sterilized
              </span>
              <a
                href="#services"
                className="text-[#E5C158] hover:underline flex items-center gap-1 group"
              >
                <span>View Room Services</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
