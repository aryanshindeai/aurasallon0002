'use client';

import React, { useState } from 'react';
import { SALON_CONFIG, ServiceItem } from '@/config/salon-config';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, Check, ChevronRight, X, Calendar, Search, Filter } from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesSection({ onSelectService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  const categories = SALON_CONFIG.serviceCategories;
  const services = SALON_CONFIG.services;

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All Services' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-28 relative bg-[#070606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Service Atelier</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Luxury Hair & Beauty <span className="gold-gradient-text italic">Couture.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            Every ritual is individually tailored using imported formulas, Dyson technology, and shadowless daylight precision.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor={cat}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 font-mono ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold shadow-md'
                    : 'bg-[#12100E] border border-[#D4AF37]/20 text-stone-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#E5C158] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12100E] border border-[#D4AF37]/30 rounded-full pl-10 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#E5C158] transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#E5C158] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Service Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={typeof service.image === 'string' ? service.image : (service.image as any)?.src || ''}
                    alt={service.name}
                    className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-90" />

                  {service.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#070606]/80 backdrop-blur-md border border-[#E5C158]/50 text-[#E5C158] text-[9px] uppercase tracking-widest font-mono">
                      Signature Ritual
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#070606]/80 text-[#E5C158] text-xs font-mono font-semibold border border-[#D4AF37]/30">
                    {service.price}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-mono block">
                      {service.category}
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-[#F7F4EF] font-light mt-1">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-stone-300 text-xs leading-relaxed font-light line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>{service.duration}</span>
                  </div>

                  {/* Products Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.productsUsed.map((prod, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#12100E] border border-stone-800 text-[10px] text-stone-400 font-mono"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-stone-800/50 mt-4">
                <button
                  onClick={() => setDetailService(service)}
                  className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#E5C158] transition-colors font-mono py-2"
                >
                  View Details
                </button>

                <button
                  onClick={() => onSelectService(service)}
                  data-cursor="Reserve"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal Overlay */}
        <AnimatePresence>
          {detailService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setDetailService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#12100E] border-2 border-[#D4AF37]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6"
              >
                <button
                  onClick={() => setDetailService(null)}
                  className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src={detailService.image}
                    alt={detailService.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs uppercase tracking-widest text-[#E5C158] font-mono">
                      {detailService.category}
                    </span>
                    <h3 className="font-serif-luxury text-3xl text-white font-light">
                      {detailService.name}
                    </h3>
                  </div>
                </div>

                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  {detailService.fullDesc}
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#070606] border border-stone-800 text-xs font-mono">
                  <div>
                    <span className="text-stone-500 block">Pricing Range:</span>
                    <span className="text-[#E5C158] font-semibold text-sm">
                      {detailService.price}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Session Duration:</span>
                    <span className="text-stone-200">{detailService.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono block">
                    Key Transformation Benefits:
                  </span>
                  <div className="space-y-1.5">
                    {detailService.keyBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-[#E5C158]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => setDetailService(null)}
                    className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest text-stone-400 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const serviceToBook = detailService;
                      setDetailService(null);
                      onSelectService(serviceToBook);
                    }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Session</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
