import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Moon, Sparkles, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function Phase1Countdown({ onNextPhase }) {
  // Birthday Target (Midnight - Sept 25, 00:00:00)
  const getBirthdayTarget = () => {
    const now = new Date();
    // Midnight (00:00:00) of current date
    const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    return midnightToday;
  };

  const [targetTime] = useState(getBirthdayTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(true);
  const [progress, setProgress] = useState(100);

  // Calculate live countdown
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsCompleted(true);
        setProgress(100);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
        setIsCompleted(false);

        const startOfDay = new Date(targetTime);
        startOfDay.setDate(startOfDay.getDate() - 1);
        const totalMs = targetTime.getTime() - startOfDay.getTime();
        const elapsed = Math.max(0, now - startOfDay.getTime());
        const pct = Math.min(100, (elapsed / totalMs) * 100);
        setProgress(pct);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Trigger confetti burst on completion
  useEffect(() => {
    if (isCompleted) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error("Confetti error", err);
      }
    }
  }, [isCompleted]);

  const highlights = [
    { title: "Sweet Cake Cut 🍰", desc: "Blowing out candles and making a secret wish!" },
    { title: "Big Happy Smiles 🥰", desc: "Your priceless laugh that lit up the entire day." },
    { title: "Heartfelt Wishes 💌", desc: "Love and messages from everyone who cherishes you." },
    { title: "Forever Bond 💖", desc: "Another year older, sweeter, and more adorable!" }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 max-w-4xl mx-auto text-center min-h-[78vh] sm:min-h-[82vh] w-full">
      
      {/* Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] sm:text-xs font-bold mb-4 shadow-sm"
      >
        <PartyPopper size={14} className="text-pink-400 animate-bounce shrink-0" />
        <span>Step 1 of 3: Birthday Celebration Wrapped Up! 🎉</span>
      </motion.div>

      {/* Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 mb-2 leading-tight">
        12:00 AM Passed! Birthday Wrapped Up! 🎂✨
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-pink-200/90 max-w-2xl mb-6 leading-relaxed">
        The clock has struck midnight and the birthday celebration is officially complete! Every smile, laugh, and sweet moment from today has been captured forever. 💖
      </p>

      {/* COUNTDOWN CLOCK CARD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full glass-card-pink rounded-3xl p-5 sm:p-8 border border-pink-400/40 shadow-2xl mb-8 relative overflow-hidden glow-pink"
      >
        <div className="flex items-center justify-center border-b border-pink-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2 text-rose-200 font-extrabold text-sm sm:text-base">
            <Sparkles size={18} className="text-pink-400 animate-pulse" />
            <span>Birthday Countdown Completed (12:00 AM) 🥳</span>
          </div>
        </div>

        {/* TIMER DISPLAY DIGITS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto mb-6">
          {[
            { label: 'Hours', value: timeLeft.hours, icon: '⏰' },
            { label: 'Minutes', value: timeLeft.minutes, icon: '⌛' },
            { label: 'Seconds', value: timeLeft.seconds, icon: '✨' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-950/90 border border-rose-500/40 shadow-inner group hover:border-pink-400/60 transition-colors"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-rose-300 via-pink-300 to-amber-200 font-mono tracking-wider">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold text-pink-300/90 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </div>
          ))}
        </div>

        {/* DAY PROGRESS BAR */}
        <div className="w-full max-w-lg mx-auto space-y-1.5">
          <div className="flex justify-between text-[11px] text-pink-200/90 font-bold">
            <span>Birthday Started 🎈</span>
            <span className="text-rose-300 animate-pulse">100% Wrapped Up! 🎉</span>
            <span>Midnight 12:00 AM 🌙</span>
          </div>
          <div className="w-full bg-slate-900/90 rounded-full h-3 p-0.5 border border-pink-500/40 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* HIGHLIGHT CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mb-8 text-left">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-pink-500/20 hover:border-pink-400/50 transition-colors"
          >
            <div className="text-xs sm:text-sm font-bold text-pink-200 mb-1 flex items-center gap-1.5">
              <span>{h.title}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-pink-300/75 leading-relaxed">
              {h.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* NEXT STEP BUTTON */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          sounds.playSparkle();
          onNextPhase();
        }}
        className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-extrabold text-sm sm:text-base md:text-lg shadow-xl shadow-rose-500/25 glow-pink flex items-center gap-2.5 group border border-pink-300/40"
      >
        <span>Open Birthday Memories Scrapbook</span>
        <span className="text-xl">📸</span>
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>

    </div>
  );
}

