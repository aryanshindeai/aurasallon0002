'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Harmonic chords for luxury ambient lounge (A Root, E, C#, G#)
      const frequencies = [110.0, 164.81, 220.0, 277.18, 415.3];
      const newOscs: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Warm sine and triangle mix
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low pass filter to make sound warm and plush
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

        // Gentle LFO tremolo
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);

        oscGain.gain.setValueAtTime(0.12 / (idx + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        lfo.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio initialization error:', e);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-cursor={isPlaying ? 'Mute Audio' : 'Play Audio'}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#12100E]/90 border border-[#D4AF37]/30 text-[#E5C158] hover:text-white hover:border-[#E5C158] transition-all duration-300 shadow-2xl backdrop-blur-md group"
      title="Toggle Aura Lounge Soundscape"
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#E5C158] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
          </>
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-[#E5C158] transition-colors" />
        )}
      </div>
      <span className="text-xs uppercase tracking-widest font-mono text-stone-300 group-hover:text-white transition-colors hidden sm:inline">
        {isPlaying ? 'Lounge Audio' : 'Soundscape'}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-0.5 h-3 bg-[#E5C158] animate-[bounce_1s_infinite_100ms]" />
          <span className="w-0.5 h-4 bg-[#E5C158] animate-[bounce_1s_infinite_300ms]" />
          <span className="w-0.5 h-2 bg-[#E5C158] animate-[bounce_1s_infinite_200ms]" />
        </span>
      )}
    </button>
  );
}
