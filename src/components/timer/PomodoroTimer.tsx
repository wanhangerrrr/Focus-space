"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain, Moon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PomodoroTimerProps {
  variant?: 'full' | 'compact';
}

export default function PomodoroTimer({ variant = 'full' }: PomodoroTimerProps) {
  const { 
    timeLeft, setTimeLeft, 
    isActive, setIsActive, 
    mode, setMode,
    focusTime, shortBreakTime, longBreakTime,
    incrementSessions,
    activeTaskId, incrementTaskPomodoro
  } = useStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalTime = mode === 'focus' ? focusTime * 60 : (mode === 'short-break' ? shortBreakTime * 60 : longBreakTime * 60);
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const handleComplete = useCallback(() => {
    setIsActive(false);
    
    if (mode === 'focus') {
      incrementSessions();
      if (activeTaskId) incrementTaskPomodoro(activeTaskId);
      
      if (typeof window !== 'undefined' && Notification.permission === "granted") {
        new Notification("Sesi Fokus Selesai!", { body: "Waktunya istirahat sejenak" });
      }
      
      setMode('short-break');
      setTimeLeft(shortBreakTime * 60);
    } else {
      setMode('focus');
      setTimeLeft(focusTime * 60);
    }
  }, [mode, focusTime, shortBreakTime, incrementSessions, activeTaskId, incrementTaskPomodoro, setIsActive, setMode, setTimeLeft]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleComplete, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const switchMode = (newMode: 'focus' | 'short-break' | 'long-break') => {
    setIsActive(false);
    setMode(newMode);
    const newTime = newMode === 'focus' ? focusTime * 60 : (newMode === 'short-break' ? shortBreakTime * 60 : longBreakTime * 60);
    setTimeLeft(newTime);
  };

  if (!mounted) return null;

  const isFull = variant === 'full';

  return (
    <div className={cn(
      "flex items-center justify-center glass-morphism relative overflow-hidden transition-all duration-500",
      isFull 
        ? "flex-col lg:flex-row gap-10 p-8 lg:p-12 rounded-[2.5rem] w-full max-w-4xl mx-auto" 
        : "flex-col gap-8 p-6 lg:p-8 rounded-3xl w-full max-w-md mx-auto"
    )}>
      {/* Background Glow based on mode */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000 -z-10",
        mode === 'focus' ? "bg-primary/5" : (mode === 'short-break' ? "bg-secondary/5" : "bg-accent/5")
      )} />

      {/* Timer Display Column */}
      <div className="relative flex items-center justify-center group flex-shrink-0">
        <svg className={cn(
          "transform -rotate-90",
          isFull ? "w-64 h-64 lg:w-80 lg:h-80" : "w-56 h-56 lg:w-64 lg:h-64"
        )}>
          <circle
            cx={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "160" : "128") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "128" : "112")}
            cy={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "160" : "128") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "128" : "112")}
            r={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "150" : "120") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "120" : "104")}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-primary/10"
          />
          <motion.circle
            cx={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "160" : "128") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "128" : "112")}
            cy={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "160" : "128") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "128" : "112")}
            r={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "150" : "120") : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? "120" : "104")}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 942.48 : 753.98) : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 753.98 : 653.45)}
            initial={{ strokeDashoffset: isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 942.48 : 753.98) : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 753.98 : 653.45) }}
            animate={{ strokeDashoffset: (isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 942.48 : 753.98) : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 753.98 : 653.45)) - ((isFull ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 942.48 : 753.98) : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 753.98 : 653.45)) * progress) / 100 }}
            transition={{ type: "tween", ease: "linear" }}
            className={cn(
              "transition-colors duration-500",
              mode === 'focus' ? "text-primary" : (mode === 'short-break' ? "text-secondary" : "text-accent")
            )}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h2 
            key={timeLeft}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "font-bold tracking-tighter tabular-nums",
              isFull ? "text-6xl lg:text-8xl" : "text-5xl lg:text-6xl"
            )}
          >
            {formatTime(timeLeft)}
          </motion.h2>
          <p className={cn(
            "text-foreground/40 font-medium uppercase tracking-[0.2em]",
            isFull ? "mt-3 text-xs lg:text-sm" : "mt-2 text-[10px] lg:text-xs"
          )}>
            {mode === 'focus' ? 'Fokus' : 'Istirahat'}
          </p>
        </div>

        {/* Outer Glow Effect */}
        <div className={cn(
          "absolute inset-0 blur-3xl opacity-20 -z-10 transition-colors duration-1000",
          mode === 'focus' ? "bg-primary" : (mode === 'short-break' ? "bg-secondary" : "bg-accent")
        )} />
      </div>

      {/* Controls Column */}
      <div className={cn(
        "flex flex-col items-center space-y-8",
        isFull ? "lg:items-start lg:space-y-10" : "w-full"
      )}>
        {/* Mode Switcher */}
        <div className={cn(
          "flex gap-2 bg-background/50 p-1.5 rounded-2xl border border-white/10 w-full",
          isFull ? "flex-col sm:flex-row lg:flex-col" : "flex-row"
        )}>
          {[
            { id: 'focus', label: isFull ? 'Sesi Fokus' : 'Fokus', icon: Brain },
            { id: 'short-break', label: isFull ? 'Istirahat Pendek' : 'Pendek', icon: Coffee },
            { id: 'long-break', label: isFull ? 'Istirahat Panjang' : 'Panjang', icon: Moon },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id as any)}
              className={cn(
                "flex items-center justify-center lg:justify-start gap-2 rounded-xl transition-all duration-300 font-medium whitespace-nowrap",
                isFull ? "px-5 py-3.5 text-sm" : "flex-1 px-2 py-2 text-xs",
                mode === m.id 
                  ? "bg-white dark:bg-slate-800 shadow-lg text-foreground" 
                  : "text-foreground/50 hover:text-foreground hover:bg-white/5"
              )}
            >
              <m.icon size={isFull ? 18 : 14} className={cn(mode === m.id ? "text-primary" : "")} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              setIsActive(false);
              const t = mode === 'focus' ? focusTime * 60 : (mode === 'short-break' ? shortBreakTime * 60 : longBreakTime * 60);
              setTimeLeft(t);
            }}
            className="p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/10 transition-all hover:scale-110 active:scale-95 text-foreground/70"
          >
            <RotateCcw size={isFull ? 24 : 20} />
          </button>

          <button 
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "flex items-center justify-center rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-90",
              isFull ? "w-20 h-20" : "w-16 h-16",
              isActive 
                ? "bg-foreground text-background" 
                : (mode === 'focus' ? "bg-primary text-white" : (mode === 'short-break' ? "bg-secondary text-white" : "bg-accent text-white"))
            )}
          >
            {isActive 
              ? <Pause size={isFull ? 32 : 28} fill="currentColor" /> 
              : <Play size={isFull ? 32 : 28} fill="currentColor" className={isFull ? "ml-1.5" : "ml-1"} />
            }
          </button>

          <button 
            onClick={handleComplete}
            className="p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/10 transition-all hover:scale-110 active:scale-95 text-foreground/70"
          >
            <SkipForward size={isFull ? 24 : 20} />
          </button>
        </div>
      </div>
    </div>
  );
}
