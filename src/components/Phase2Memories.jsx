import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

// Direct native imports so Vite bundles the images 100% reliably in all browsers
import pengu1 from '../assets/pengu1.jpeg';
import pengu2 from '../assets/pengu2.jpeg';
import pengu3 from '../assets/pengu3.jpeg';
import pengu4 from '../assets/pengu4.jpeg';

export default function Phase2Memories({ onNextPhase, onPrevPhase }) {
  const photoMemories = [
    {
      id: 1,
      image: pengu1,
      title: "My Safe Place & Favorite Shoulder 🫂💖",
      subtitle: "Leaning on me with that cute adorable pout!",
      tag: "Cozy Moments 🧸",
      likes: 99,
      text: "Having you lean your head on my shoulder, looking so cute and comfy with that adorable pout, is my absolute favorite feeling in the world. No matter where we are, having you close to me makes everything feel like home. You are my comfort, my safe place, and my favorite person forever.",
      quote: "Wherever you lean, that's where I want to be forever. 💖"
    },
    {
      id: 2,
      image: pengu2,
      title: "World's Most Stylish Penguu 👑✨",
      subtitle: "Effortless outfit goals & aesthetic vibes!",
      tag: "Fashion Queen 💅",
      likes: 88,
      text: "Look at this fit! You always manage to look so effortlessly chic and stylish. From the striped shirt and dark denim jeans to the pink claw clip on your bag—you are literally 1000% aesthetic goals. My girl is out here serving looks every single day!",
      quote: "Style is eternal, but my cute Penguu is unmatched. ✨"
    },
    {
      id: 3,
      image: pengu3,
      title: "Pretty Hair & Pure Grace 🌸",
      subtitle: "Soft, aesthetic mirror portrait that steals my heart.",
      tag: "Angel Vibes 👼",
      likes: 95,
      text: "Your hair, your soft aesthetic style, your grace—everything about this picture is just so pretty, soft, and elegant. Even with your phone covering your face, your sweetness and beauty shine through completely. I could stare at this picture all day long!",
      quote: "You don't even have to try... you're just naturally breathtaking. 🌸"
    },
    {
      id: 4,
      image: pengu4,
      title: "The Ultimate Dream Team 🥂❤️",
      subtitle: "Side by side, smiling together through every birthday!",
      tag: "Best Duo ♾️",
      likes: 120,
      text: "Look at us! The two happiest faces in the world sitting right next to each other. Thank you for making today so unforgettable, for all the laughter we shared, and for being the best partner in crime anyone could ever ask for. You’re stuck with me forever and ever, Penguu!",
      quote: "Side by side, today, tomorrow, and for all our birthdays to come. ♾️❤️"
    }
  ];

  const [memories, setMemories] = useState(photoMemories);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); // null or photo index

  // Handle Like Photo
  const handleLikePhoto = (e, id) => {
    e.stopPropagation();
    sounds.playSparkle();
    confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
    setMemories(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  // Open Photo Modal
  const handleOpenPhoto = (idx) => {
    sounds.playSparkle();
    setSelectedPhotoIndex(idx);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 max-w-5xl mx-auto text-center min-h-[78vh] sm:min-h-[82vh] w-full">
      
      {/* Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] sm:text-xs font-bold mb-4 shadow-sm"
      >
        <Camera size={14} className="text-pink-400 shrink-0 animate-pulse" />
        <span>Step 2 of 3: Birthday Memories Gallery 📸</span>
      </motion.div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 mb-2">
        Our Favorite Birthday Memories & Moments 💖
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-pink-200/90 max-w-2xl mb-8 leading-relaxed">
        Click on any photo to open it and read the special text & story written for that picture! 📸✨
      </p>

      {/* PHOTO CARDS GRID (Mobile-optimized un-cropped photos) */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full mb-8">
        {memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpenPhoto(idx)}
            className="cursor-pointer group select-none"
          >
            <div className="relative w-full rounded-3xl bg-slate-900/90 border-2 border-pink-400/40 p-3 shadow-2xl flex flex-col justify-between group-hover:border-pink-400/80 transition-all">
              
              {/* Photo Image Container: object-contain to prevent any cropping on mobile */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-950/90 border border-white/10 flex items-center justify-center p-1">
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />
                
                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-[10px] font-extrabold text-pink-300 border border-pink-500/40 backdrop-blur-sm shadow">
                  {mem.tag}
                </div>

                {/* Click to read story overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                  <span className="px-3 py-1 rounded-full bg-pink-500/90 text-white text-[11px] font-bold shadow-lg">
                    Click for Story 💌
                  </span>
                </div>
              </div>

              {/* Photo Title & Likes */}
              <div className="pt-3 text-left flex items-center justify-between">
                <div className="pr-2">
                  <h3 className="font-extrabold text-xs sm:text-sm text-pink-100 line-clamp-1">
                    {mem.title}
                  </h3>
                  <p className="text-[10px] text-pink-300/70 font-medium">Click to view note 💌</p>
                </div>

                <button
                  onClick={(e) => handleLikePhoto(e, mem.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors font-bold border border-rose-500/30 text-xs shrink-0"
                >
                  <Heart size={12} className="fill-rose-500 text-rose-500" />
                  <span>{mem.likes}</span>
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* INTERACTIVE PHOTO & STORY MODAL */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative w-full max-w-3xl bg-slate-900 border-2 border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-950/80 text-pink-300 hover:text-white border border-pink-500/40 shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Previous Photo Arrow */}
              <button
                onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + memories.length) % memories.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 text-pink-300 hover:text-white border border-pink-500/40 shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Photo Arrow */}
              <button
                onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % memories.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 text-pink-300 hover:text-white border border-pink-500/40 shadow-lg"
              >
                <ChevronRight size={20} />
              </button>

              {/* Left Column: Full Un-cropped Photo Display */}
              <div className="w-full md:w-1/2 bg-slate-950 flex items-center justify-center p-3 min-h-[300px] sm:min-h-[420px]">
                <img
                  src={memories[selectedPhotoIndex].image}
                  alt={memories[selectedPhotoIndex].title}
                  className="w-full h-full object-contain max-h-[55vh] md:max-h-[75vh] rounded-2xl"
                />
              </div>

              {/* Right Column: Best Text & Memory Story */}
              <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between bg-slate-900/95 border-t md:border-t-0 md:border-l border-pink-500/20 overflow-y-auto">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-extrabold mb-3">
                    {memories[selectedPhotoIndex].tag}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-pink-100 mb-1">
                    {memories[selectedPhotoIndex].title}
                  </h3>
                  <p className="text-xs text-pink-300/70 font-semibold mb-4">
                    {memories[selectedPhotoIndex].subtitle}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-400/30 mb-4 shadow-inner">
                    <p className="text-xs sm:text-sm text-pink-100 leading-relaxed font-sans">
                      "{memories[selectedPhotoIndex].text}"
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 text-amber-200 text-xs italic font-medium">
                    ✨ {memories[selectedPhotoIndex].quote}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-500/20 flex items-center justify-between">
                  <button
                    onClick={(e) => handleLikePhoto(e, memories[selectedPhotoIndex].id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-extrabold border border-rose-500/30 text-xs"
                  >
                    <Heart size={14} className="fill-rose-500 text-rose-500" />
                    <span>{memories[selectedPhotoIndex].likes} Likes</span>
                  </button>

                  <span className="text-xs text-pink-300/70 font-bold">
                    Photo {selectedPhotoIndex + 1} of {memories.length}
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <button
          onClick={() => {
            sounds.playPop();
            onPrevPhase();
          }}
          className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to End Countdown</span>
        </button>

        <button
          onClick={() => {
            sounds.playSparkle();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 hover:scale-105 transition-transform border border-pink-300/40 glow-pink"
        >
          <span>Open Thank You Letter</span>
          <span className="text-base">💌</span>
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}
