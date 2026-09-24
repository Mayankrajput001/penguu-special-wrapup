import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FarewellNavbar from './components/FarewellNavbar';
import Phase1Countdown from './components/Phase1Countdown';
import Phase2Memories from './components/Phase2Memories';
import Phase3Letter from './components/Phase3Letter';
import BackgroundParticles from './components/BackgroundParticles';

export default function App() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 relative flex flex-col justify-between select-none font-sans">
      {/* Background Animated Floating Particles & Stars */}
      <BackgroundParticles />

      {/* Top Navbar Header */}
      <FarewellNavbar
        currentPhase={currentPhase}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Phase Switcher */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {currentPhase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Phase1Countdown
                onNextPhase={() => setCurrentPhase(2)}
              />
            </motion.div>
          )}

          {currentPhase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Phase2Memories
                onNextPhase={() => setCurrentPhase(3)}
                onPrevPhase={() => setCurrentPhase(1)}
              />
            </motion.div>
          )}

          {currentPhase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Phase3Letter
                onRestart={() => setCurrentPhase(1)}
                onPrevPhase={() => setCurrentPhase(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-pink-200/50 relative z-10 border-t border-white/5">
        <p>Made with all my love for my cute Penguuu 🐧💖 • Birthday Wrap-Up & Memories</p>
      </footer>
    </div>
  );
}
