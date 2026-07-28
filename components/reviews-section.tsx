'use client';

import React from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = SALON_CONFIG.reviews;

  return (
    <section id="reviews" className="py-28 relative bg-[#070606] border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Verified Reviews</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Trusted by <span className="gold-gradient-text italic">The Connoisseurs.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-[#E5C158] text-lg font-serif-luxury">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-white ml-2">4.9 / 5.0</span>
            <span className="text-stone-400 text-xs font-sans">({SALON_CONFIG.brand.totalReviews}+ Verified Reviews)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-[#D4AF37]/20 relative flex flex-col justify-between group hover:border-[#E5C158] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">{rev.date}</span>
                </div>

                <Quote className="w-8 h-8 text-[#D4AF37]/30" />

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-serif-luxury text-base text-white">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-mono block">
                    {rev.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
