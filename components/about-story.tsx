'use client';

import React from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';

export default function AboutStory() {
  const story = SALON_CONFIG.story;

  return (
    <section id="about" className="py-28 relative bg-[#0C0B0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Portrait Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 group">
              <img
                src={typeof SALON_CONFIG.hero.videoFallbackImg === 'string' ? SALON_CONFIG.hero.videoFallbackImg : (SALON_CONFIG.hero.videoFallbackImg as { src: string }).src}
                alt="Aura Sanctuary Salon Interior"
                className="w-full h-[520px] object-cover object-center filter brightness-[0.9] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-80" />

              {/* Floating Monogram Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl">
                <p className="font-serif-luxury text-xl text-[#FFF6DF] italic font-light">
                  &ldquo;{story.signatureQuote}&rdquo;
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5C158] font-mono mt-3">
                  — {story.founderName}
                </p>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-3xl pointer-events-none hidden sm:block" />
          </div>

          {/* Editorial Story Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-mono block mb-2">
                {story.subtitle}
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light leading-tight">
                {story.title}
              </h2>
            </div>

            <div className="space-y-6 text-stone-300 font-light text-base sm:text-lg leading-relaxed">
              {story.paragraphs.map((p, idx) => (
                <p key={idx} className="relative pl-6 border-l border-[#D4AF37]/30 hover:border-[#E5C158] transition-colors duration-300">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-stone-800">
              <div>
                <div className="font-serif-luxury text-3xl text-[#E5C158]">
                  ₹1 Cr+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-1">
                  Sanctuary Value
                </div>
              </div>
              <div>
                <div className="font-serif-luxury text-3xl text-[#E5C158]">
                  100%
                </div>
                <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-1">
                  Authentic Import
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-serif-luxury text-3xl text-[#E5C158]">
                  Zero
                </div>
                <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-1">
                  Harmful Chemicals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
