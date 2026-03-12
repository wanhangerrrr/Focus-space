"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, FileText, CheckCircle2, Loader2, Send, Download, Copy, Trash2, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SummaryResult {
  what: string;
  who: string;
  when: string;
  where: string;
  why: string;
  how: string;
}

export default function SummaryTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  const handleProcess = async () => {
    if (!file && !text) return;

    setIsProcessing(true);
    // Simulation of AI Processing
    setTimeout(() => {
      setResult({
        what: "Metode belajar Pomodoro untuk meningkatkan fokus secara maksimal.",
        who: "Pelajar, mahasiswa, dan pekerja profesional yang ingin produktif.",
        when: "Saat membutuhkan fokus mendalam (Deep Work) selama sesi belajar.",
        where: "Dapat diterapkan di mana saja, baik di rumah, kantor, maupun kafe.",
        why: "Untuk mencegah kejenuhan otak dan menjaga ritme kerja yang berkelanjutan.",
        how: "Dengan membagi waktu menjadi 25 menit fokus dan 5 menit istirahat pendek."
      });
      setIsProcessing(false);
    }, 2500);
  };

  const clearAll = () => {
    setFile(null);
    setText('');
    setResult(null);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Smart Summary AI</h2>
        <p className="text-foreground/60">Tingkatkan pemahamanmu dengan ringkasan otomatis 5W+1H.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="glass-morphism p-8 rounded-[2rem] space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileUp className="text-primary" size={24} />
              Unggah Materi
            </h3>
            
            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer group",
                isDragActive ? "border-primary bg-primary/5" : "border-primary/10 hover:border-primary/30 hover:bg-primary/5"
              )}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileUp size={32} className="text-primary" />
              </div>
              <p className="text-center font-medium">
                {file ? file.name : "Seret & letakkan file di sini"}
              </p>
              <p className="text-center text-sm text-foreground/40 mt-1">
                PDF, TXT, atau Gambar (PNG/JPG)
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-foreground/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-foreground/30 font-bold">Atau tempel teks langsung</span>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setFile(null);
              }}
              placeholder="Tempel catatan atau materi belajarmu di sini..."
              className="w-full h-40 bg-background/50 border border-foreground/10 rounded-2xl p-4 outline-none focus:border-primary/50 transition-colors resize-none font-medium placeholder:text-foreground/20"
            />

            <div className="flex gap-4">
              <button
                onClick={handleProcess}
                disabled={(!file && !text) || isProcessing}
                className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Mulai Ringkas
                  </>
                )}
              </button>
              <button
                onClick={clearAll}
                className="p-4 bg-foreground/5 text-foreground/50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Hapus Semua"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-morphism h-full flex flex-col items-center justify-center p-12 text-center text-foreground/30 rounded-[2rem]"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <FileText size={40} />
                </div>
                <h4 className="text-xl font-bold mb-2">Hasil Ringkasan</h4>
                <p className="max-w-xs">Unggah materi belajarmu untuk melihat ringkasan cerdas di sini.</p>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-morphism h-full flex flex-col items-center justify-center p-12 space-y-6 rounded-[2rem]"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary"
                  />
                  <FileText size={32} className="absolute inset-0 m-auto text-primary animate-bounce" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xl font-bold animate-pulse">AI Sedang Membaca...</p>
                  <p className="text-sm text-foreground/40">Menganalisis poin-poin penting materi kamu.</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between px-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={20} />
                    Hasil Ringkasan 5W+1H
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors" title="Copy">
                      <Copy size={18} />
                    </button>
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors" title="Download">
                      <Download size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'What', value: result.what, color: 'border-blue-200 bg-blue-50/30' },
                    { label: 'Who', value: result.who, color: 'border-green-200 bg-green-50/30' },
                    { label: 'When', value: result.when, color: 'border-purple-200 bg-purple-50/30' },
                    { label: 'Where', value: result.where, color: 'border-orange-200 bg-orange-50/30' },
                    { label: 'Why', value: result.why, color: 'border-red-200 bg-red-50/30' },
                    { label: 'How', value: result.how, color: 'border-teal-200 bg-teal-50/30' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "p-6 rounded-3xl border-2 transition-all hover:shadow-lg glass-morphism",
                        item.color
                      )}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-60">
                        {item.label}
                      </h4>
                      <p className="font-bold leading-relaxed tracking-tight text-foreground/90">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
