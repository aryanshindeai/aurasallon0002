'use client';

import React, { useState } from 'react';
import { SALON_CONFIG, GalleryItem } from '@/config/salon-config';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

export default function LuxuryGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const gallery = SALON_CONFIG.gallery;
  const categories = ['All', 'Hair', 'Skin', 'Bridal', 'Interior', 'Nails'];

  const filteredGallery = gallery.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-28 relative bg-[#070606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] uppercase tracking-[0.3em] font-mono mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>High Fashion Editorial Gallery</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light">
            Captured in <span className="gold-gradient-text italic">Ultra HD 8K.</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            Natural Indian skin textures, real hair reflection, Hasselblad & Leica beauty photography.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FFF6DF] via-[#E5C158] to-[#C5A059] text-black font-semibold'
                  : 'bg-[#12100E] border border-[#D4AF37]/20 text-stone-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(item)}
              data-cursor="Zoom View"
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#E5C158] cursor-pointer group shadow-xl"
            >
              <img
                src={typeof item.image === 'string' ? item.image : (item.image as any)?.src || ''}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Hover Overlay Information */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-[#070606]/80 text-[#E5C158] text-[9px] font-mono uppercase tracking-widest border border-[#D4AF37]/30 backdrop-blur-md">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-full bg-black/60 text-white group-hover:bg-[#E5C158] group-hover:text-black transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-2xl text-white font-light">
                    {item.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-1">
                    {item.cameraInfo}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 p-4 sm:p-6 space-y-4"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/80 text-white hover:text-[#E5C158] z-20 border border-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative max-h-[70vh] rounded-2xl overflow-hidden flex items-center justify-center bg-black">
                  <img
                    src={typeof selectedImage.image === 'string' ? selectedImage.image : (selectedImage.image as any)?.src || ''}
                    alt={selectedImage.title}
                    className="max-h-[70vh] w-auto object-contain rounded-2xl"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-stone-300">
                  <div>
                    <h3 className="font-serif-luxury text-2xl text-white">
                      {selectedImage.title}
                    </h3>
                    <p className="text-stone-400 text-xs mt-0.5">{selectedImage.modelDetails}</p>
                  </div>
                  <div className="text-right sm:text-right text-[#E5C158] bg-[#12100E] px-4 py-2 rounded-xl border border-[#D4AF37]/30">
                    <span className="block text-[10px] text-stone-500 uppercase">Camera Specifications</span>
                    <span>{selectedImage.cameraInfo}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
