"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle2, Circle, Target, Calendar } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask, activeTaskId, setActiveTask } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSessions, setNewTaskSessions] = useState(1);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, newTaskSessions);
      setNewTaskTitle('');
      setNewTaskSessions(1);
    }
  };

  return (
    <div className="glass-morphism p-8 rounded-[2.5rem] w-full min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Tugas Hari Ini</h3>
          <p className="text-foreground/50 text-sm">Target fokus harian Anda</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-bold">
          <Calendar size={16} />
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
        </div>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-8 p-2 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/10">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Apa yang ingin kamu pelajari?"
          className="flex-1 bg-transparent px-4 py-3 outline-none text-foreground placeholder:text-foreground/30 font-medium"
        />
        <div className="flex items-center gap-2 px-3 border-l border-white/20">
          <Target size={18} className="text-foreground/30" />
          <input
            type="number"
            min="1"
            max="10"
            value={newTaskSessions}
            onChange={(e) => setNewTaskSessions(parseInt(e.target.value))}
            className="w-12 bg-transparent outline-none font-bold"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-foreground/30"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p>Belum ada tugas. Waktunya membuat rencana!</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  "p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border-2",
                  activeTaskId === task.id 
                    ? "bg-primary/10 border-primary/30 shadow-xl shadow-primary/10" 
                    : "bg-background/40 border-transparent hover:border-primary/10"
                )}
                onClick={() => setActiveTask(task.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                    task.completed 
                      ? "bg-primary border-primary text-white" 
                      : "border-primary/30 hover:border-primary"
                  )}
                >
                  {task.completed && <CheckCircle2 size={16} />}
                </button>
                
                <div className="flex-1">
                  <p className={cn(
                    "font-bold tracking-tight transition-all",
                    task.completed ? "text-foreground/40 line-through" : "text-foreground"
                  )}>
                    {task.title}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: task.totalPomodoros }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i < task.pomodoros ? "bg-primary" : "bg-primary/20"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                      if (activeTaskId === task.id) setActiveTask(null);
                    }}
                    className="p-2 text-foreground/30 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {activeTaskId && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <p className="text-sm font-bold text-primary">Tugas Aktif Terpilih</p>
          </div>
          <button 
            onClick={() => setActiveTask(null)}
            className="text-xs font-bold text-primary hover:underline"
          >
            Selesai Fokus
          </button>
        </div>
      )}
    </div>
  );
}
