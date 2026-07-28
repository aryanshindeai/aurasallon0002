'use client';

import React from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  const steps = SALON_CONFIG.timeline;

  return (
    <section id="ritual" className="py-28 relative bg-[#0C0B0A] border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 6-Step Ceremony</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            The Aura <span className="gold-gradient-text italic">Ceremony Timeline.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            From pour-over coffee greeting to final shadowless mirror reveal, experience structured perfection.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-[#D4AF37]/20 hover:border-[#E5C158] transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif-luxury text-5xl text-[#E5C158] font-light opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#12100E] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl text-white font-light mb-3">
                  {item.title}
                </h3>

                <p className="text-stone-300 text-xs font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 text-[10px] uppercase tracking-widest text-[#C5A059] font-mono">
                Stage 0{idx + 1} Protocol
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
