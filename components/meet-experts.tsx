'use client';

import React from 'react';
import { SALON_CONFIG, Stylist } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Award, Star, Calendar, Sparkles } from 'lucide-react';

interface ExpertsProps {
  onOpenBooking: (serviceName?: string, stylistName?: string) => void;
}

export default function MeetExperts({ onOpenBooking }: ExpertsProps) {
  const experts = SALON_CONFIG.experts;

  return (
    <section id="experts" className="py-28 relative bg-[#0C0B0A] border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>International Directorate</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Meet Our Master <span className="gold-gradient-text italic">Directors.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            Decades of fashion-week, Paris, and Mumbai runway mastery brought directly to your chair.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#E5C158] transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover object-top filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-90" />

                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 text-[#E5C158] text-[10px] font-mono uppercase tracking-widest border border-[#D4AF37]/30">
                    {expert.experience}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-luxury text-3xl text-white font-light">
                      {expert.name}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#E5C158] font-mono mt-1">
                      {expert.role}
                    </p>
                  </div>

                  <p className="text-stone-300 text-xs font-light leading-relaxed">
                    {expert.bio}
                  </p>

                  <div className="p-3 rounded-xl bg-[#070606] border border-stone-800 text-[11px] font-mono text-[#C5A059] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>{expert.awards}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {expert.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#12100E] border border-stone-800 text-[10px] text-stone-300 font-mono"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 border-t border-stone-800/50 mt-4">
                <button
                  onClick={() => onOpenBooking(undefined, expert.name)}
                  data-cursor={`Book ${expert.name}`}
                  className="w-full py-3 rounded-full bg-[#12100E] hover:bg-gradient-to-r hover:from-[#FFF6DF] hover:via-[#E5C158] hover:to-[#C5A059] text-stone-200 hover:text-black font-semibold text-xs uppercase tracking-widest border border-[#D4AF37]/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Chair with {expert.name.split(' ')[0]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
