'use client';

import React, { useState, useEffect } from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { Menu, X, Phone, Calendar, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenAIConsultant: () => void;
}

export default function Navigation({ onOpenBooking, onOpenAIConsultant }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Walkthrough', href: '#walkthrough' },
    { name: 'Services', href: '#services' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'The Ritual', href: '#ritual' },
    { name: 'Experts', href: '#experts' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#070606]/85 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-[#070606]/90 via-[#070606]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Monogram */}
          <a
            href="#"
            className="group flex flex-col items-start whitespace-nowrap shrink-0"
            data-cursor="AURA Home"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.35em] text-[#F7F4EF] group-hover:text-[#E5C158] transition-colors duration-300 uppercase font-light whitespace-nowrap">
              A U R A
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium -mt-1 opacity-90 whitespace-nowrap">
              The Salon • Chandrapur
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-[#E5C158] transition-colors duration-300 py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E5C158] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAIConsultant}
              data-cursor="AI Hair Consultation"
              className="px-3.5 py-2 text-xs uppercase tracking-widest text-[#E5C158] border border-[#D4AF37]/30 hover:border-[#E5C158] rounded-full bg-[#181512]/60 hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] animate-pulse" />
              <span>AI Consultation</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => onOpenBooking()}
              data-cursor="Book Now"
              className="px-5 py-2 text-xs uppercase tracking-widest text-black font-semibold bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] hover:brightness-110 rounded-full transition-all duration-300 shadow-lg shadow-[#D4AF37]/15 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Session</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-black font-semibold bg-[#E5C158] rounded-full"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-stone-200 border border-stone-800 hover:border-[#D4AF37]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E5C158]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#070606]/98 backdrop-blur-2xl pt-24 px-6 pb-10 flex flex-col justify-between sm:hidden"
          >
            <div className="space-y-6 flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-mono">
                Aura Experience Menu
              </span>

              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif-luxury text-2xl text-stone-200 hover:text-[#E5C158] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAIConsultant();
                  }}
                  className="w-full py-3 text-xs uppercase tracking-widest text-[#E5C158] border border-[#D4AF37]/40 rounded-full flex items-center justify-center gap-2 bg-[#181512]"
                >
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                  <span>AI Hair Consultation</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 text-xs uppercase tracking-widest text-black font-semibold bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] rounded-full"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>

            <div className="border-t border-stone-800/80 pt-6 text-center space-y-2 text-stone-400 text-xs font-mono">
              <div className="flex items-center justify-center gap-2 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Civil Lines, Chandrapur</span>
              </div>
              <p>Direct Call: {SALON_CONFIG.brand.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
