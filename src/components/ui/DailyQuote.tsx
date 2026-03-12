"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "Fokus adalah rahasia dari segala kesuksesan.", author: "Hafiz" },
  { text: "Jangan berhenti saat lelah, berhentilah saat selesai.", author: "Anonim" },
  { text: "Disiplin adalah jembatan antara cita-cita dan pencapaian.", author: "Jim Rohn" },
  { text: "Hal-hal besar dilakukan oleh serangkaian hal kecil yang dibawa bersama.", author: "Vincent Van Gogh" },
  { text: "Waktumu terbatas, jangan sia-siakan untuk menjalani hidup orang lain.", author: "Steve Jobs" },
];

export default function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="glass-morphism p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
      <Quote className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
      <div className="relative z-10">
        <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight italic text-foreground/80">
          "{quote.text}"
        </p>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-px w-6 md:w-8 bg-primary/30" />
          <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest">{quote.author}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
    </div>
  );
}
