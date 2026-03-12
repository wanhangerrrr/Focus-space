"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, CloudRain, Coffee, Wind, Trees, Music, VolumeX } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sounds = [
  { id: 'rain', name: 'Hujan Deras', icon: CloudRain, color: 'text-blue-400', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, 
  { id: 'cafe', name: 'Suasana Kafe', icon: Coffee, color: 'text-orange-400', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'wind', name: 'Noise Putih', icon: Wind, color: 'text-slate-300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'nature', name: 'Hutan Tropis', icon: Trees, color: 'text-green-400', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 'lofi', name: 'Lo-Fi Tenang', icon: Music, color: 'text-purple-400', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

export default function AudioStation() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSound(soundId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const currentSound = sounds.find(s => s.id === activeSound);

  return (
    <div className="glass-morphism p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] w-full">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h3 className="text-lg md:text-xl font-bold tracking-tight">Stasiun Audio</h3>
          <p className="text-xs md:text-sm text-foreground/50">Temukan ritme fokusmu</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {isPlaying ? <Volume2 size={18} className="text-primary animate-pulse" /> : <VolumeX size={18} className="text-foreground/30" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-primary h-1 rounded-full appearance-none bg-primary/10 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound.id)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
              activeSound === sound.id 
                ? "bg-primary/10 border border-primary/20 shadow-sm" 
                : "bg-background/50 hover:bg-primary/5 border border-transparent"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
              activeSound === sound.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
            )}>
              <sound.icon size={22} />
            </div>
            <div className="flex-1 text-left">
              <span className={cn(
                "font-semibold block tracking-tight",
                activeSound === sound.id ? "text-primary" : "text-foreground/70"
              )}>
                {sound.name}
              </span>
              <span className="text-xs text-foreground/40 font-medium uppercase tracking-wider">
                Ambien Fokus
              </span>
            </div>
            {activeSound === sound.id && isPlaying && (
              <div className="flex gap-1 items-end h-4 pr-2">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 8, 12, 4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSound && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
              {currentSound && <currentSound.icon size={20} />}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate tracking-tight">{currentSound?.name}</p>
              <p className="text-xs text-foreground/50">Sekarang memutar ambien...</p>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        src={currentSound?.url}
        loop
        autoPlay={isPlaying}
      />
    </div>
  );
}
