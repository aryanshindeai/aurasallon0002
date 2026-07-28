'use client';

import React, { useState } from 'react';
import { SALON_CONFIG, Product } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Star, ShoppingBag, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export default function ProductShelf() {
  const products = SALON_CONFIG.products;

  return (
    <section id="products" className="py-28 relative bg-[#070606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>The Glass Shelf</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Imported Luxury <span className="gold-gradient-text italic">Formulations.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            We partner exclusively with Dyson, Moroccanoil, Kérastase Paris, Wella Professionals & L&apos;Oréal Metal Detox.
          </p>
        </div>

        {/* Product Shelf Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-3xl border border-[#D4AF37]/20 hover:border-[#E5C158] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-52 rounded-2xl overflow-hidden bg-stone-900 mb-6 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-xl filter contrast-[1.05]"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-[#E5C158] text-[9px] font-mono uppercase tracking-widest border border-[#D4AF37]/30">
                    {product.brand}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-mono block">
                    {product.category}
                  </span>
                  <h3 className="font-serif-luxury text-xl text-white font-light line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-stone-400 text-xs font-light line-clamp-2">
                    {product.desc}
                  </p>
                </div>
              </div>

              {/* Price & Rating Footer */}
              <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[#E5C158] font-mono font-semibold text-sm">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating} / 5.0</span>
                  </div>
                </div>

                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-mono bg-[#12100E] px-2.5 py-1 rounded-full border border-stone-800">
                  In Salon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
