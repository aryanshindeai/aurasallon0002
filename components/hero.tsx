'use client';

import React, { useEffect, useRef } from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { motion } from 'motion/react';
import { Calendar, Compass, Sparkles, ChevronDown, MapPin, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAIConsultant: () => void;
}

export default function Hero({ onOpenBooking, onOpenAIConsultant }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating golden dust particles
    const particleCount = Math.min(width > 768 ? 60 : 35, 75);
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Radial dark vignetting
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, 'rgba(18, 15, 12, 0.2)');
      gradient.addColorStop(1, 'rgba(7, 6, 6, 0.88)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle animated glowing Gold Oval Halo Mirrors (signature of Aura Salon)
      if (width > 640) {
        const mirrorPositions = [
          { cx: width * 0.28, cy: height * 0.48, rx: 70, ry: 130 },
          { cx: width * 0.72, cy: height * 0.48, rx: 70, ry: 130 },
        ];

        mirrorPositions.forEach((m, idx) => {
          const pulseAlpha = 0.15 + Math.sin(time * 0.02 + idx) * 0.06;
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(m.cx, m.cy, m.rx, m.ry, 0, 0, Math.PI * 2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = `rgba(229, 193, 88, ${pulseAlpha})`;
          ctx.shadowColor = '#E5C158';
          ctx.shadowBlur = 25;
          ctx.stroke();

          // Outer secondary halo
          ctx.beginPath();
          ctx.ellipse(m.cx, m.cy, m.rx + 8, m.ry + 8, 0, 0, Math.PI * 2);
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(212, 175, 55, ${pulseAlpha * 0.5})`;
          ctx.stroke();
          ctx.restore();
        });
      }

      // Render gold particles
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 193, 88, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image / Cinema Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={SALON_CONFIG.hero.videoFallbackImg}
          alt="Aura Luxury Salon"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1] blur-[1px] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-[#070606]/60 to-[#070606]/40" />
      </div>

      {/* Floating Canvas Particle Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center min-h-[85vh]">
        {/* Top Location & Rating Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E]/80 border border-[#D4AF37]/30 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E5C158] font-mono">
            {SALON_CONFIG.hero.badgeText} • Chandrapur
          </span>
          <span className="text-stone-500">•</span>
          <div className="flex items-center text-amber-300 text-xs gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{SALON_CONFIG.brand.rating}</span>
          </div>
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#F7F4EF] leading-[1.05] mb-6"
        >
          Royal Luxury <span className="gold-gradient-text italic font-normal">Lives Here.</span>
        </motion.h1>

        {/* Editorial Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-10 tracking-wide font-sans"
        >
          {SALON_CONFIG.hero.subheadline}
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenBooking}
            data-cursor="Book Appointment"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#D4AF37]/20 hover:scale-105 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          <a
            href="#walkthrough"
            data-cursor="Walkthrough"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#12100E]/90 border border-[#D4AF37]/40 hover:border-[#E5C158] text-[#F7F4EF] hover:text-[#E5C158] text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-[#E5C158]" />
            <span>Explore Experience</span>
          </a>

          <button
            onClick={onOpenAIConsultant}
            data-cursor="AI Hair Consultation"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-gradient-to-r from-purple-950/40 via-[#181512] to-amber-950/40 border border-[#E5C158]/40 text-[#E5C158] hover:text-white text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
            <span>AI Style Preview</span>
          </button>
        </motion.div>

        {/* Stats Grid Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel max-w-4xl"
        >
          {SALON_CONFIG.hero.stats.map((stat, idx) => (
            <div key={idx} className="p-3 text-center border-r border-[#D4AF37]/10 last:border-r-0">
              <div className="font-serif-luxury text-2xl sm:text-3xl text-[#E5C158] font-medium">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#walkthrough"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-stone-400 hover:text-[#E5C158] flex flex-col items-center gap-1 group"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll Experience</span>
          <ChevronDown className="w-4 h-4 text-[#E5C158]" />
        </motion.a>
      </div>
    </section>
  );
}
