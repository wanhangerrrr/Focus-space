"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Timer, 
  FileText, 
  Headphones, 
  CheckSquare, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Timer Fokus', icon: Timer, href: '/timer' },
  { name: 'Ringkasan AI', icon: FileText, href: '/summary' },
  { name: 'Audio Fokus', icon: Headphones, href: '/audio' },
  { name: 'Daftar Tugas', icon: CheckSquare, href: '/tasks' },
  { name: 'Statistik', icon: BarChart3, href: '/stats' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground transition-colors duration-500",
      isDarkMode && "dark"
    )}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 transition-all duration-500 ease-in-out glass-morphism border-r transition-[width]",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-10 px-2">
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-xl tracking-tight text-gradient"
                >
                  FocusSpace
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={cn(
                    "flex items-center p-3 rounded-xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "hover:bg-primary/10 text-foreground/70 hover:text-primary"
                  )}>
                    <item.icon size={22} className={cn("min-w-[22px]", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isSidebarOpen && (
                      <div className="absolute left-16 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2">
            <button 
              onClick={toggleTheme}
              className="flex items-center w-full p-3 rounded-xl hover:bg-primary/10 transition-all group"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-4 font-medium"
                  >
                    <span>
                      {isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button className="flex items-center w-full p-3 rounded-xl hover:bg-primary/10 transition-all group">
              <Settings size={22} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-4 font-medium"
                  >
                    Pengaturan
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-500 ease-in-out p-8",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="max-w-7xl mx-auto pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
