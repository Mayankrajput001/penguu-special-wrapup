import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Moon } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Phase1Countdown({ onNextPhase }) {
  // Target End Time: Midnight tonight
  const getInitialTargetTime = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    if (end.getTime() <= now.getTime()) {
      end.setHours(end.getHours() + 12);
    }
    return end;
  };

  const [targetTime] = useState(getInitialTargetTime);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(100);

  // Calculate live countdown
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = Math.max(0, target - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });

      // Progress bar (estimating percentage of day elapsed)
      const startOfDay = new Date(targetTime);
      startOfDay.setHours(0, 0, 0, 0);
      const totalDayMs = Math.max(1, targetTime.getTime() - startOfDay.getTime());
      const elapsed = Math.min(totalDayMs, Math.max(0, now - startOfDay.getTime()));
      const percentage = Math.min(100, Math.max(0, (elapsed / totalDayMs) * 100));
      setProgress(percentage);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

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
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] sm:text-xs font-bold mb-4 shadow-sm"
      >
        <Moon size={14} className="text-pink-400 animate-pulse shrink-0" />
        <span>Step 1 of 3: Birthday End Countdown 🕯️</span>
      </motion.div>

      {/* Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 mb-2 leading-tight">
        As The Birthday Comes To An End... 🕯️✨
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-pink-200/90 max-w-2xl mb-6 leading-relaxed">
        The birthday hours are ticking away, but every smile, laugh, and memory from today will stay in our hearts forever! Here is our official countdown to the end of the birthday celebration. 💖
      </p>

      {/* COUNTDOWN CLOCK CARD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full glass-card-pink rounded-3xl p-5 sm:p-8 border border-pink-400/40 shadow-2xl mb-8 relative overflow-hidden glow-pink"
      >
        <div className="flex items-center justify-center gap-2 text-rose-200 font-extrabold text-sm sm:text-base border-b border-pink-500/20 pb-4 mb-6">
          <Clock size={18} className="text-pink-400 animate-pulse" />
          <span>Time Remaining In Birthday ⏳</span>
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
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-950/80 border border-pink-500/30 shadow-inner group hover:border-pink-400/60 transition-colors"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 via-rose-300 to-purple-300 font-mono tracking-wider">
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
          <div className="flex justify-between text-[11px] text-pink-200/80 font-medium">
            <span>Birthday Started 🎈</span>
            <span>{Math.round(progress)}% Completed</span>
            <span>Birthday End 🌙</span>
          </div>
          <div className="w-full bg-slate-900/90 rounded-full h-3 p-0.5 border border-pink-500/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
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
