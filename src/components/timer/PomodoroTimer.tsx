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

export default function PomodoroTimer() {
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
      
      // Notify (basic for now)
      if (Notification.permission === "granted") {
        new Notification("Focus Session Complete!", { body: "Time for a well-deserved break 🌿" });
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

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-morphism rounded-3xl w-full max-w-md mx-auto relative overflow-hidden">
      {/* Background Glow based on mode */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000 -z-10",
        mode === 'focus' ? "bg-primary/5" : (mode === 'short-break' ? "bg-secondary/5" : "bg-accent/5")
      )} />

      {/* Mode Switcher */}
      <div className="flex gap-2 mb-8 bg-background/50 p-1 rounded-2xl border border-white/10">
        {[
          { id: 'focus', label: 'Focus', icon: Brain },
          { id: 'short-break', label: 'Short Break', icon: Coffee },
          { id: 'long-break', label: 'Long Break', icon: Moon },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => switchMode(m.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium",
              mode === m.id 
                ? "bg-white dark:bg-slate-800 shadow-sm text-foreground" 
                : "text-foreground/50 hover:text-foreground"
            )}
          >
            <m.icon size={16} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Progress Ring */}
      <div className="relative flex items-center justify-center mb-10 group">
        <svg className="w-64 h-64 transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-primary/10"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={753.98} // 2 * PI * r
            initial={{ strokeDashoffset: 753.98 }}
            animate={{ strokeDashoffset: 753.98 - (753.98 * progress) / 100 }}
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
            className="text-6xl font-bold tracking-tighter tabular-nums"
          >
            {formatTime(timeLeft)}
          </motion.h2>
          <p className="text-foreground/40 mt-2 font-medium uppercase tracking-[0.2em] text-xs">
            {mode === 'focus' ? 'Staying Focused' : 'Time for Break'}
          </p>
        </div>

        {/* Outer Glow Effect */}
        <div className={cn(
          "absolute inset-0 blur-2xl opacity-20 -z-10 transition-colors duration-1000",
          mode === 'focus' ? "bg-primary" : (mode === 'short-break' ? "bg-secondary" : "bg-accent")
        )} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => {
            setIsActive(false);
            const t = mode === 'focus' ? focusTime * 60 : (mode === 'short-break' ? shortBreakTime * 60 : longBreakTime * 60);
            setTimeLeft(t);
          }}
          className="p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/10 transition-colors"
        >
          <RotateCcw size={24} />
        </button>

        <button 
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "w-20 h-20 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95",
            isActive 
              ? "bg-foreground text-background" 
              : (mode === 'focus' ? "bg-primary text-white" : (mode === 'short-break' ? "bg-secondary text-white" : "bg-accent text-white"))
          )}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
        </button>

        <button 
          onClick={handleComplete}
          className="p-3 rounded-full bg-background/50 border border-white/10 hover:bg-primary/10 transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}
