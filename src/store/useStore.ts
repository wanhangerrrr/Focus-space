"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  totalPomodoros: number;
}

interface UserState {
  // Timer State
  timeLeft: number;
  isActive: boolean;
  mode: 'focus' | 'short-break' | 'long-break';
  sessionsCompleted: number;
  
  // Timer Settings
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;

  // Task State
  tasks: Task[];
  activeTaskId: string | null;

  // Actions
  setTimeLeft: (time: number) => void;
  setIsActive: (active: boolean) => void;
  setMode: (mode: 'focus' | 'short-break' | 'long-break') => void;
  incrementSessions: () => void;
  updateSettings: (focus: number, short: number, long: number) => void;
  
  addTask: (title: string, sessions: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  incrementTaskPomodoro: (id: string) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      timeLeft: 25 * 60,
      isActive: false,
      mode: 'focus',
      sessionsCompleted: 0,
      
      focusTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,

      tasks: [],
      activeTaskId: null,

      setTimeLeft: (time) => set({ timeLeft: time }),
      setIsActive: (active) => set({ isActive: active }),
      setMode: (mode) => set({ mode }),
      incrementSessions: () => set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
      updateSettings: (focus, short, long) => set({ 
        focusTime: focus, 
        shortBreakTime: short, 
        longBreakTime: long 
      }),

      addTask: (title, sessions) => set((state) => ({
        tasks: [...state.tasks, {
          id: Math.random().toString(36).substr(2, 9),
          title,
          completed: false,
          pomodoros: 0,
          totalPomodoros: sessions
        }]
      })),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      setActiveTask: (id) => set({ activeTaskId: id }),
      
      incrementTaskPomodoro: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, pomodoros: t.pomodoros + 1 } : t)
      })),
    }),
    {
      name: 'focus-space-storage',
      partialize: (state) => ({ 
        tasks: state.tasks, 
        focusTime: state.focusTime, 
        shortBreakTime: state.shortBreakTime, 
        longBreakTime: state.longBreakTime,
        sessionsCompleted: state.sessionsCompleted
      }),
    }
  )
);
