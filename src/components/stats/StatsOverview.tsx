"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

const data = [
  { name: 'Sen', menit: 120 },
  { name: 'Sel', menit: 150 },
  { name: 'Rab', menit: 100 },
  { name: 'Kam', menit: 200 },
  { name: 'Jum', menit: 180 },
  { name: 'Sab', menit: 250 },
  { name: 'Min', menit: 210 },
];

export default function StatsOverview() {
  const { sessionsCompleted, tasks } = useStore();
  
  const tasksDone = tasks.filter(t => t.completed).length;
  const totalFocusTime = sessionsCompleted * 25; // in minutes

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Statistik Belajar</h2>
        <p className="text-foreground/60">Pantau kemajuan dan konsistensi fokus Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Waktu Fokus', value: `${totalFocusTime} Menit`, detail: 'Berdasarkan sesi pomodoro' },
          { label: 'Sesi Selesai', value: sessionsCompleted, detail: 'Sesi fokus 25 menit' },
          { label: 'Tugas Tercapai', value: tasksDone, detail: 'Tugas yang telah selesai' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-morphism p-8 rounded-[2rem] flex flex-col"
          >
            <span className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="text-4xl font-black tracking-tighter text-gradient">{stat.value}</span>
            <span className="text-xs text-foreground/30 mt-4 font-medium">{stat.detail}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 glass-morphism p-8 rounded-[2.5rem] min-h-[400px]"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold tracking-tight">Aktivitas Mingguan</h3>
            <p className="text-sm text-foreground/50">Waktu fokus dalam menit selama 7 hari terakhir</p>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMenit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'currentColor', opacity: 0.4, fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'currentColor', opacity: 0.4, fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ color: 'var(--color-primary)', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="menit" 
                  stroke="var(--color-primary)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorMenit)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Progress */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-morphism p-8 rounded-[2.5rem]"
        >
          <h3 className="text-xl font-bold mb-6 tracking-tight">Distribusi Tugas</h3>
          <div className="space-y-6">
            {tasks.length === 0 ? (
              <p className="text-foreground/30 text-center py-12 italic">Belum ada data tugas</p>
            ) : (
              tasks.slice(0, 5).map((task, i) => (
                <div key={task.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold tracking-tight">
                    <span className="truncate max-w-[150px]">{task.title}</span>
                    <span className="text-primary">{Math.round((task.pomodoros / task.totalPomodoros) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(task.pomodoros / task.totalPomodoros) * 100}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Tip Produktivitas</p>
            <p className="text-sm font-medium leading-relaxed">Konsistensi lebih penting daripada intensitas. Tetapkan target kecil setiap hari.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
