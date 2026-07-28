'use client';

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import LuxuryCursor from '@/components/luxury-cursor';
import AmbientSoundscape from '@/components/ambient-soundscape';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import SpatialJourney from '@/components/spatial-journey';
import AboutStory from '@/components/about-story';
import ServicesSection from '@/components/services-section';
import TransformationSlider from '@/components/transformation-slider';
import LuxuryGallery from '@/components/luxury-gallery';
import ExperienceTimeline from '@/components/experience-timeline';
import ProductShelf from '@/components/product-shelf';
import MeetExperts from '@/components/meet-experts';
import ReviewsSection from '@/components/reviews-section';
import LocationContact from '@/components/location-contact';
import Footer from '@/components/footer';

import BookingModal from '@/components/booking-modal';
import AIConsultantModal from '@/components/ai-consultant-modal';
import { ServiceItem } from '@/config/salon-config';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [aiConsultantOpen, setAiConsultantOpen] = useState(false);

  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [bookingStylist, setBookingStylist] = useState<string | undefined>(undefined);

  // Initialize smooth momentum scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (serviceName?: string, stylistName?: string) => {
    if (serviceName) setBookingService(serviceName);
    if (stylistName) setBookingStylist(stylistName);
    setBookingOpen(true);
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setBookingService(service.name);
    setBookingOpen(true);
  };

  return (
    <main className="relative bg-[#070606] text-[#F7F4EF] min-h-screen selection:bg-[#D4AF37] selection:text-black">
      {/* Interactive Custom Cursor */}
      <LuxuryCursor />

      {/* Floating Ambient Soundscape Generator */}
      <AmbientSoundscape />

      {/* Top Glass Navigation Bar */}
      <Navigation
        onOpenBooking={() => handleOpenBooking()}
        onOpenAIConsultant={() => setAiConsultantOpen(true)}
      />

      {/* Fullscreen Hero Experience */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onOpenAIConsultant={() => setAiConsultantOpen(true)}
      />

      {/* Spatial Salon Room Walkthrough */}
      <SpatialJourney />

      {/* Editorial Philosophy Story */}
      <AboutStory />

      {/* Luxury Service Experience Catalog */}
      <ServicesSection onSelectService={handleSelectServiceForBooking} />

      {/* Before / After Transformation Slider */}
      <TransformationSlider />

      {/* 8K Ultra-HD Lightbox Gallery */}
      <LuxuryGallery />

      {/* The 6-Step Ceremony Timeline */}
      <ExperienceTimeline />

      {/* Imported Product Glass Shelf */}
      <ProductShelf />

      {/* International Master Directors */}
      <MeetExperts onOpenBooking={(s, styl) => handleOpenBooking(s, styl)} />

      {/* Google Verified Reviews */}
      <ReviewsSection />

      {/* Location & VIP Inquiries */}
      <LocationContact />

      {/* Footer */}
      <Footer />

      {/* Hotel-Grade Booking System Modal */}
      <BookingModal
        key={`${bookingService || 'default'}-${bookingStylist || 'default'}-${bookingOpen}`}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingService}
        initialStylist={bookingStylist}
      />

      {/* AI Hair & Beauty Style Preview & Diagnostic Suite */}
      <AIConsultantModal
        isOpen={aiConsultantOpen}
        onClose={() => setAiConsultantOpen(false)}
        onBookRecommendedService={(servName) => handleOpenBooking(servName)}
      />
    </main>
  );
}
