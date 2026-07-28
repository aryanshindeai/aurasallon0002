'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SALON_CONFIG } from '@/config/salon-config';
import { Sparkles, MoveHorizontal, Clock, Award, CheckCircle2, Quote, Star, Sliders, ChevronLeft, ChevronRight, Edit3, Image as ImageIcon, Upload, Link as LinkIcon, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TransformationSlider() {
  const cases = SALON_CONFIG.beforeAfter;
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(1000);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beforeFileInputRef = useRef<HTMLInputElement | null>(null);
  const afterFileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragOverFrame, setIsDragOverFrame] = useState(false);
  const [dragSide, setDragSide] = useState<'before' | 'after'>('after');

  // Custom Images state map per case ID, persisted in localStorage
  const [customImages, setCustomImages] = useState<Record<string, { beforeImg: string; afterImg: string }>>({});
  const [showEditor, setShowEditor] = useState(false);
  const [inputBefore, setInputBefore] = useState('');
  const [inputAfter, setInputAfter] = useState('');
  const [appliedNotice, setAppliedNotice] = useState(false);

  const activeCase = cases[activeCaseIdx] || cases[0];
  const customBefore = customImages[activeCase?.id]?.beforeImg;
  const customAfter = customImages[activeCase?.id]?.afterImg;
  const currentBeforeImg = inputBefore || customBefore || activeCase?.beforeImg || '/images/regenerated_image_1785009577668.jpg';
  const currentAfterImg = inputAfter || customAfter || activeCase?.afterImg || '/images/regenerated_image_1785002880851.jpg';

  // Swap Before & After images
  const handleSwapImages = () => {
    const newBefore = currentAfterImg;
    const newAfter = currentBeforeImg;
    setInputBefore(newBefore);
    setInputAfter(newAfter);
    handleSaveCustomImages(newBefore, newAfter);
  };

  const handleFrameDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverFrame(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width * (sliderPos / 100)) {
        setDragSide('before');
      } else {
        setDragSide('after');
      }
    }
  };

  const handleFrameDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverFrame(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    let side = dragSide;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      side = x < rect.width * (sliderPos / 100) ? 'before' : 'after';
    }

    const reader = new FileReader();
    reader.onload = (uploadEv) => {
      const result = uploadEv.target?.result as string;
      if (result) {
        if (side === 'before') {
          setInputBefore(result);
          handleSaveCustomImages(result, inputAfter || currentAfterImg);
        } else {
          setInputAfter(result);
          handleSaveCustomImages(inputBefore || currentBeforeImg, result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Sync image inputs when active case changes
  useEffect(() => {
    if (activeCase) {
      const timer = setTimeout(() => {
        setInputBefore(activeCase.beforeImg);
        setInputAfter(activeCase.afterImg);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeCase]);

  const handleSelectCase = (idx: number) => {
    setActiveCaseIdx(idx);
    setSliderPos(50);
    const nextCase = cases[idx] || cases[0];
    const b = customImages[nextCase.id]?.beforeImg;
    const a = customImages[nextCase.id]?.afterImg;
    setInputBefore(b || nextCase.beforeImg);
    setInputAfter(a || nextCase.afterImg);
  };

  const handleSaveCustomImages = (before: string, after: string) => {
    const updated = {
      ...customImages,
      [activeCase.id]: {
        beforeImg: before || activeCase.beforeImg,
        afterImg: after || activeCase.afterImg
      }
    };
    setCustomImages(updated);
    try {
      localStorage.setItem('aura_transformation_custom_images', JSON.stringify(updated));
    } catch {
      // fallback
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  const handleResetCurrent = () => {
    const updated = { ...customImages };
    delete updated[activeCase.id];
    setCustomImages(updated);
    try {
      localStorage.setItem('aura_transformation_custom_images', JSON.stringify(updated));
    } catch {
      // fallback
    }
    setInputBefore(activeCase.beforeImg);
    setInputAfter(activeCase.afterImg);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (type === 'before') {
          setInputBefore(result);
          handleSaveCustomImages(result, inputAfter || currentAfterImg);
        } else {
          setInputAfter(result);
          handleSaveCustomImages(inputBefore || currentBeforeImg, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPos(percentage);
  }, []);

  // Global mouse & touch listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  const isRevealed = sliderPos > 70;
  const isFullyRevealed = sliderPos > 92;

  return (
    <section id="transformations" className="py-28 relative bg-[#090807] border-t border-b border-[#D4AF37]/15 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Cinematic Before & After Showcase</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Real Clients. <span className="gold-gradient-text italic">Flawless Results.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            Interactive high-definition hair & bridal transformations executed by Master Stylists. Drag horizontally to experience the transformation.
          </p>
        </div>

        {/* Case Selector Tabs */}
        {cases.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {cases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-mono transition-all duration-300 flex items-center gap-2 shrink-0 ${
                    activeCaseIdx === idx
                      ? 'bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold shadow-xl scale-105'
                      : 'bg-[#141210] border border-[#D4AF37]/20 text-stone-400 hover:text-white hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{c.category} • Case 0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EXPANDABLE CUSTOM IMAGE EDITOR DRAWER */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/50 bg-[#0E0C0A]/95 shadow-2xl space-y-6">
                <div className="flex items-start justify-between border-b border-stone-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#E5C158] text-xs font-mono uppercase tracking-widest mb-1">
                      <ImageIcon className="w-4 h-4" />
                      <span>Transformation Image Customizer (Case 0{activeCaseIdx + 1})</span>
                    </div>
                    <p className="text-stone-300 text-xs font-light">
                      Customize Before & After images for <strong className="text-white">{activeCase.title}</strong> using image URLs or uploading files directly.
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-[#E5C158] text-[10px] font-mono">
                    ✦ Saved locally in browser
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* BEFORE Image Control */}
                  <div className="space-y-3 p-4 rounded-2xl bg-[#14110E] border border-stone-800">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-stone-500" />
                        Before Image
                      </span>
                      <label className="cursor-pointer text-[#E5C158] hover:underline flex items-center gap-1 text-[11px]">
                        <Upload className="w-3 h-3" /> Upload File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'before')}
                        />
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Paste Before Image URL (https://...)"
                        value={inputBefore}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInputBefore(val);
                          handleSaveCustomImages(val, inputAfter || currentAfterImg);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080706] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <LinkIcon className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-3" />
                    </div>

                    <div className="h-28 rounded-xl overflow-hidden border border-stone-800 relative bg-black">
                      <img
                        src={inputBefore || currentBeforeImg}
                        alt="Before Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-stone-400 font-mono">
                        Before Preview
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-stone-500 uppercase">Presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const url = activeCase.beforeImg;
                          setInputBefore(url);
                          handleSaveCustomImages(url, inputAfter || currentAfterImg);
                        }}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-stone-300 hover:text-white hover:border-[#D4AF37]"
                      >
                        Original Before
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=85&w=800";
                          setInputBefore(url);
                          handleSaveCustomImages(url, inputAfter || currentAfterImg);
                        }}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-stone-300 hover:text-white hover:border-[#D4AF37]"
                      >
                        Salon Prep
                      </button>
                    </div>
                  </div>

                  {/* AFTER Image Control */}
                  <div className="space-y-3 p-4 rounded-2xl bg-[#14110E] border border-stone-800">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#E5C158] font-semibold uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        After Image
                      </span>
                      <label className="cursor-pointer text-[#E5C158] hover:underline flex items-center gap-1 text-[11px]">
                        <Upload className="w-3 h-3" /> Upload File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'after')}
                        />
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Paste After Image URL (https://...)"
                        value={inputAfter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInputAfter(val);
                          handleSaveCustomImages(inputBefore || currentBeforeImg, val);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080706] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <LinkIcon className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-3" />
                    </div>

                    <div className="h-28 rounded-xl overflow-hidden border border-stone-800 relative bg-black">
                      <img
                        src={inputAfter || currentAfterImg}
                        alt="After Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#E5C158] font-mono">
                        After Preview
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-stone-500 uppercase">Presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const url = activeCase.afterImg;
                          setInputAfter(url);
                          handleSaveCustomImages(inputBefore || currentBeforeImg, url);
                        }}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-amber-400 hover:text-white hover:border-[#D4AF37]"
                      >
                        Original Honey Balayage
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=85&w=800";
                          setInputAfter(url);
                          handleSaveCustomImages(inputBefore || currentBeforeImg, url);
                        }}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-amber-400 hover:text-white hover:border-[#D4AF37]"
                      >
                        Silk Movement
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetCurrent}
                      className="px-4 py-2 rounded-xl bg-[#181512] hover:bg-stone-900 border border-stone-800 text-stone-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>

                    <button
                      onClick={handleSwapImages}
                      className="px-4 py-2 rounded-xl bg-[#181512] hover:bg-stone-900 border border-[#D4AF37]/30 text-[#E5C158] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <MoveHorizontal className="w-3.5 h-3.5" />
                      <span>Swap Before & After</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {appliedNotice && (
                      <span className="text-emerald-400 text-xs font-mono flex items-center gap-1 animate-pulse">
                        <Check className="w-3.5 h-3.5" /> Image Saved & Placed!
                      </span>
                    )}

                    <button
                      onClick={() => handleSaveCustomImages(inputBefore, inputAfter)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-mono text-xs uppercase font-bold tracking-wider hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save & Place Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Drag Slider Frame */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Hidden File Inputs for Direct Badge Click */}
            <input
              type="file"
              ref={beforeFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'before')}
            />
            <input
              type="file"
              ref={afterFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'after')}
            />

            <div
              ref={containerRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseDown={(e) => {
                // If user clicks on clickable badges or buttons inside, skip dragging
                if ((e.target as HTMLElement).closest('button')) return;
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                setIsDragging(true);
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
              onDragOver={handleFrameDragOver}
              onDragLeave={() => setIsDragOverFrame(false)}
              onDrop={handleFrameDrop}
              className="relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/80 hover:border-[#FFF6DF] select-none cursor-ew-resize shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-[#060505] focus:outline-none focus:ring-2 focus:ring-[#E5C158] transition-all duration-300 group"
            >
              {/* Drag & Drop Overlay Feedback */}
              <AnimatePresence>
                {isDragOverFrame && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 border-4 border-dashed border-[#E5C158] text-center"
                  >
                    <Upload className="w-12 h-12 text-[#E5C158] animate-bounce mb-3" />
                    <h4 className="text-lg font-serif-luxury text-white">Drop Image File Here</h4>
                    <p className="text-xs font-mono text-[#E5C158] uppercase tracking-widest mt-1">
                      Updating <strong className="underline font-bold">{dragSide.toUpperCase()}</strong> Image for Case 0{activeCaseIdx + 1}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkle burst effect on full reveal */}
              <AnimatePresence>
                {isFullyRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center bg-amber-500/10 backdrop-blur-[2px]"
                  >
                    <div className="p-4 rounded-full bg-black/80 border border-[#E5C158] text-[#E5C158] flex items-center gap-2 shadow-2xl animate-bounce">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span className="text-xs font-mono uppercase tracking-widest">100% Transformation Revealed</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AFTER Image (Background) */}
              <img
                src={currentAfterImg}
                alt={`${activeCase.title} - After Transformation`}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-700"
              />

              {/* BEFORE Image (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none z-10 border-r-2 border-[#E5C158] shadow-[0_0_25px_rgba(229,193,88,0.5)]"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={currentBeforeImg}
                  alt={`${activeCase.title} - Before`}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{ width: `${containerWidth}px` }}
                />
              </div>

              {/* Slider Handle Divider Button */}
              <div
                className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className={`w-12 h-12 -ml-6 rounded-full bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black shadow-[0_0_30px_rgba(229,193,88,0.8)] flex items-center justify-center border-2 border-white transition-transform ${isDragging ? 'scale-125' : 'scale-100 hover:scale-110'}`}>
                  <MoveHorizontal className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>


            </div>

            {/* Quick Case Controls */}
            {cases.length > 1 ? (
              <div className="flex items-center justify-between mt-4 text-xs font-mono text-stone-400 px-1">
                <button
                  onClick={() => handleSelectCase(activeCaseIdx > 0 ? activeCaseIdx - 1 : cases.length - 1)}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-[#E5C158] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Case</span>
                </button>

                <span className="text-stone-500">
                  Case <strong className="text-[#E5C158]">{activeCaseIdx + 1}</strong> of {cases.length}
                </span>

                <button
                  onClick={() => handleSelectCase(activeCaseIdx < cases.length - 1 ? activeCaseIdx + 1 : 0)}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-[#E5C158] transition-colors"
                >
                  <span>Next Case</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-4 text-xs font-mono text-stone-400 px-1">
                <span className="text-[#E5C158] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Transformation Showcase</span>
                </span>
                <span className="text-stone-500">100% Real HD Results</span>
              </div>
            )}
          </div>

          {/* Details Breakdown & Testimonial Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-8 rounded-3xl space-y-6 border border-[#D4AF37]/30 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5C158] font-mono block">
                  {activeCase.category} Transformation
                </span>
                <h3 className="font-serif-luxury text-3xl text-white font-light">
                  {activeCase.title}
                </h3>
              </div>

              <p className="text-stone-300 text-sm font-light leading-relaxed">
                {activeCase.description}
              </p>

              {/* Treatment Specs */}
              <div className="space-y-3.5 pt-4 border-t border-stone-800/80 text-xs font-mono text-stone-300">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E5C158]" /> Session Time:
                  </span>
                  <span className="text-white font-medium">{activeCase.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#E5C158]" /> Lead Artist:
                  </span>
                  <span className="text-[#E5C158] font-semibold">{activeCase.stylist}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Retouching:
                  </span>
                  <span className="text-emerald-400 font-medium">0% Retouched (100% Real)</span>
                </div>
              </div>

              {/* Reveal Client Testimonial */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 rounded-2xl bg-[#181512] border border-[#D4AF37]/40 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between text-[#E5C158]">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#E5C158] text-[#E5C158]" />
                        ))}
                      </div>
                      <Quote className="w-4 h-4 text-[#E5C158]/50" />
                    </div>
                    <p className="text-stone-200 text-xs font-serif-luxury italic leading-relaxed">
                      &ldquo;The glass shine and fiber softness last for weeks. Best salon experience in Maharashtra!&rdquo;
                    </p>
                    <span className="text-[10px] font-mono text-stone-400 block text-right">
                      — Verified Client Experience
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guarantee Callout */}
            <div className="p-5 rounded-2xl bg-[#12100E] border border-stone-800 text-xs font-mono text-stone-400 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E5C158] shrink-0" />
              <span>Every transformation includes a post-service fiber care diagnostic and complimentary touch-up guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

