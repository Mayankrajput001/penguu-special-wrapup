import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function FarewellNavbar({ currentPhase, isMuted, setIsMuted }) {
  const phases = [
    { id: 1, label: 'End Countdown', icon: '⏳' },
    { id: 2, label: 'Memories', icon: '📸' },
    { id: 3, label: 'Thank You Letter', icon: '💌' },
  ];

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playSparkle();
  };

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-950/85 backdrop-blur-md border-b border-rose-500/20 select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Logo & Tag (Visual Only) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-base sm:text-lg shadow-md">
            🌙
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="font-extrabold text-xs sm:text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-pink-200 to-purple-300 flex items-center gap-1.5">
              <span>Penguu’s Birthday Wrap-Up</span>
              <Sparkles size={12} className="text-pink-400 animate-spin" />
            </h1>
            <p className="text-[9px] sm:text-[10px] text-pink-300/70 font-medium">As Birthday Comes To An End 💖</p>
          </div>
        </div>

        {/* Center: Visual Step Indicator Pills (Non-Clickable) */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/90 p-1 rounded-full border border-pink-500/20 shrink-0">
          {phases.map((p) => {
            const isActive = currentPhase === p.id;

            return (
              <div
                key={p.id}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 pointer-events-none ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 scale-105 border border-pink-300/30'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <span className="text-xs sm:text-sm">{p.icon}</span>
                <span className="hidden md:inline">{p.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Sound FX Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleMuteToggle}
            className={`p-1.5 sm:p-2 rounded-full border transition-all ${
              isMuted
                ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                : 'bg-rose-500/20 border-rose-500/40 text-pink-300 glow-pink'
            }`}
            title={isMuted ? 'Unmute music & sound FX' : 'Mute music & sound FX'}
          >
            {isMuted ? <VolumeX size={16} className="sm:w-4 sm:h-4" /> : <Volume2 size={16} className="sm:w-4 sm:h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
