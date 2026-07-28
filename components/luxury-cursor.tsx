'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const timer = setTimeout(() => {
      setMounted(true);
      setIsTouchDevice(isTouch);
    }, 0);

    if (isTouch) return () => clearTimeout(timer);

    const mql = window.matchMedia('(pointer: coarse)');
    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    mql.addEventListener('change', handleTouchChange);

    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [data-cursor], input, select, textarea');
      if (interactiveEl) {
        setIsHovered(true);
        const textAttr = interactiveEl.getAttribute('data-cursor');
        if (textAttr) {
          setCursorText(textAttr);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', updateMouse);
    return () => {
      clearTimeout(timer);
      mql.removeEventListener('change', handleTouchChange);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#D4AF37]/40 mix-blend-screen flex items-center justify-center transition-opacity duration-300"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 18),
          y: mousePos.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0.02)',
          borderColor: isHovered ? '#E5C158' : 'rgba(212, 175, 55, 0.4)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-widest text-[#E5C158] font-medium font-serif-luxury px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-[#E5C158] mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.2 }}
      />
    </>
  );
}

