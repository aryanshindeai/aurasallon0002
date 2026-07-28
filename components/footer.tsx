'use client';

import React from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { ArrowUp, Instagram, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const brand = SALON_CONFIG.brand;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050404] text-stone-400 py-20 border-t border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 pb-16 border-b border-stone-800">
          <div className="space-y-4 max-w-md">
            <span className="font-serif-luxury text-4xl sm:text-5xl tracking-[0.3em] text-[#F7F4EF] block font-light whitespace-nowrap">
              A U R A
            </span>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-mono whitespace-nowrap">
              {brand.tagline}
            </p>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              The Billion-Dollar Luxury Salon Experience. Combining Paris fashion week precision, imported Dyson technology, and Indian hospitality.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-mono text-stone-300">
            <a href="#walkthrough" className="hover:text-[#E5C158] transition-colors">
              Walkthrough
            </a>
            <a href="#services" className="hover:text-[#E5C158] transition-colors">
              Services
            </a>
            <a href="#transformations" className="hover:text-[#E5C158] transition-colors">
              Transformations
            </a>
            <a href="#gallery" className="hover:text-[#E5C158] transition-colors">
              Gallery
            </a>
            <a href="#experts" className="hover:text-[#E5C158] transition-colors">
              Directors
            </a>
            <a href="#contact" className="hover:text-[#E5C158] transition-colors">
              Contact
            </a>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="Top"
            className="p-4 rounded-full bg-[#12100E] border border-[#D4AF37]/30 text-[#E5C158] hover:text-white hover:border-[#E5C158] transition-all self-end lg:self-auto"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Aura The Salon. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5C158] flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span>•</span>
            <a href={`tel:${brand.phoneClean}`} className="hover:text-[#E5C158] flex items-center gap-1.5 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 {brand.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
