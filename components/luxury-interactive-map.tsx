'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { LANDMARKS } from './landmarks-data';

export default function LuxuryInteractiveMap({
  mapMode,
  selectedLandmarkId,
  onSelectLandmark,
  isFullscreen,
  onToggleFullscreen
}: {
  mapMode: 'dark' | 'satellite';
  selectedLandmarkId: string | null;
  onSelectLandmark: (id: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const landmarkMarkersRef = useRef<Record<string, any>>({});

  const [mapLoadError, setMapLoadError] = useState(false);

  const auraLat = 19.9613;
  const auraLng = 79.2961;

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [auraLat, auraLng],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Tile layer init
      const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      const satTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

      tileLayerRef.current = L.tileLayer(mapMode === 'satellite' ? satTiles : darkTiles, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Custom Aura Pin
      const auraGoldIcon = L.divIcon({
        className: 'custom-gold-pin',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 48px; height: 48px; border-radius: 50%; background: rgba(229, 193, 88, 0.3); animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; display: flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 9999px; background: #0E0C0A; border: 2px solid #E5C158; box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 20px rgba(229,193,88,0.5);">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #E5C158; box-shadow: 0 0 12px #FFF6DF;"></div>
              <span style="color: #FFFFFF; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; font-size: 15px; white-space: nowrap; letter-spacing: 0.04em;">Aura The Salon</span>
            </div>
          </div>
        `,
        iconSize: [160, 48],
        iconAnchor: [30, 24],
      });

      L.marker([auraLat, auraLng], { icon: auraGoldIcon }).addTo(map);

      // Add landmark markers
      landmarkMarkersRef.current = {};
      LANDMARKS.forEach((lm) => {
        const isSelected = selectedLandmarkId === lm.id;
        const landmarkIcon = L.divIcon({
          className: 'custom-landmark-pin',
          html: `
            <div style="cursor: pointer; transition: all 0.3s ease; transform: scale(${isSelected ? 1.2 : 1});">
              <div style="display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 12px; background: ${isSelected ? '#E5C158' : 'rgba(20, 17, 14, 0.95)'}; color: ${isSelected ? '#000000' : '#E5C158'}; border: 1px solid ${isSelected ? '#FFF6DF' : 'rgba(212, 175, 55, 0.4)'}; box-shadow: 0 4px 15px rgba(0,0,0,0.7);">
                <span style="font-family: monospace; font-size: 10px; font-weight: 700;">${lm.distance}</span>
                <span style="font-size: 11px; font-weight: 600; color: ${isSelected ? '#000' : '#FFF'}; white-space: nowrap;">${lm.name}</span>
              </div>
            </div>
          `,
          iconSize: [120, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([lm.lat, lm.lng], { icon: landmarkIcon }).addTo(map);
        marker.on('click', () => onSelectLandmark(lm.id));
        landmarkMarkersRef.current[lm.id] = marker;
      });
    }).catch((err) => {
      console.warn("Leaflet map load failed, showing fallback map view:", err);
      setMapLoadError(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Map Mode Tile Change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      const satTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      
      tileLayerRef.current = L.tileLayer(mapMode === 'satellite' ? satTiles : darkTiles, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(mapInstanceRef.current);
    }).catch(() => {});
  }, [mapMode]);

  // Handle Selected Landmark FlyTo
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLandmarkId) return;
    const lm = LANDMARKS.find((l) => l.id === selectedLandmarkId);
    if (lm) {
      mapInstanceRef.current.flyTo([lm.lat, lm.lng], 17, { duration: 1.2 });
    }
  }, [selectedLandmarkId]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetZoom = () => {
    mapInstanceRef.current?.flyTo([auraLat, auraLng], 16, { duration: 1 });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] sm:min-h-[580px]">
      {mapLoadError ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.148500259881!2d79.293911!3d19.9613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTkuOTYxMyBOIDc5LjI5NjEgRQ!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full min-h-[500px] sm:min-h-[580px] border-0 rounded-3xl filter invert-[0.9] hue-rotate-180 brightness-90 contrast-125"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Aura The Salon Location Map"
        />
      ) : (
        <div ref={mapRef} className="w-full h-full min-h-[500px] sm:min-h-[580px]" />
      )}

      {/* Floating Custom Map HUD Controls */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
        <div className="p-1 rounded-xl bg-[#090807]/90 border border-[#D4AF37]/30 backdrop-blur-md flex items-center gap-1">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-stone-800/80 rounded-lg text-stone-300 hover:text-white transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-stone-800/80 rounded-lg text-stone-300 hover:text-white transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-stone-800/80 rounded-lg text-stone-300 hover:text-white transition-all"
            title="Recenter Aura Salon"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onToggleFullscreen}
          className="p-2.5 rounded-xl bg-[#090807]/90 border border-[#D4AF37]/30 text-stone-300 hover:text-[#E5C158] backdrop-blur-md transition-all shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
