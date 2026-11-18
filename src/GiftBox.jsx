import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PROMPTS = [
  'Tap the gift box 3 times!',
  "Ooh, something's moving! Tap again!",
  'Almost open! One last tap!',
  'Yay!! ✨',
];

const BURST_EMOJIS = ['💖', '✨', '👑', '🌸', '🎀', '💝', '🧸', '⭐'];

export default function GiftBox({ alreadyOpened, onOpened, onNext }) {
  const [tapCount, setTapCount] = useState(alreadyOpened ? 3 : 0);
  const [justBurst, setJustBurst] = useState(false);

  const isUnlocked = tapCount >= 3 || alreadyOpened;

  const handleTap = () => {
    if (justBurst) return;

    if (alreadyOpened && tapCount >= 3) {
      // Allow re-triggering the sparkle burst if she revisits Screen 1
      setJustBurst(true);
      setTimeout(() => {
        setJustBurst(false);
        onNext();
      }, 1100);
      return;
    }

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 3) {
      setJustBurst(true);
      onOpened();
      setTimeout(() => {
        setJustBurst(false);
        onNext();
      }, 1200);
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-between h-full w-full bg-gradient-to-b from-pink-50 via-pink-100/60 to-pink-50 py-8 px-6 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
    >
      {/* Ambient Floating Sparkles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300/60 pointer-events-none"
          style={{
            left: `${10 + ((i * 19) % 80)}%`,
            top: `${12 + ((i * 23) % 75)}%`,
            fontSize: `${0.9 + (i % 3) * 0.4}rem`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          {i % 2 === 0 ? '✨' : '🌸'}
        </motion.span>
      ))}

      {/* Top Tag */}
      <div className="z-10 mt-2">
        <span className="px-4 py-1 bg-white/80 text-pink-500 rounded-full text-xs font-quicksand font-bold uppercase tracking-widest shadow-sm">
          Special Delivery 👑
        </span>
      </div>

      {/* Center Gift Box */}
      <motion.div
        className="z-10 text-center flex flex-col items-center my-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-4xl text-pink-500 font-pacifico mb-8">
          For My Bestie...
        </h1>

        <div className="relative flex items-center justify-center w-44 h-44">
          <motion.div
            className="absolute inset-2 rounded-full bg-pink-200/50 blur-xl"
            animate={{
              scale: justBurst ? 2.2 : [1, 1.15 + Math.min(tapCount, 3) * 0.06, 1],
              opacity: justBurst ? 0 : 0.8,
            }}
            transition={{ duration: 1.5, repeat: justBurst ? 0 : Infinity }}
          />

          <AnimatePresence>
            {justBurst &&
              Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                const dist = 110 + (i % 3) * 35;
                return (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: 1.3,
                      rotate: (i % 2 === 0 ? 1 : -1) * 180,
                      opacity: 0,
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute text-3xl pointer-events-none"
                  >
                    {BURST_EMOJIS[i % BURST_EMOJIS.length]}
                  </motion.span>
                );
              })}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={handleTap}
            whileTap={{ scale: 0.85 }}
            animate={
              justBurst
                ? { scale: [1.2, 1.7, 0], rotate: [0, -15, 20], opacity: 0 }
                : tapCount === 0
                ? { y: [0, -14, 0], rotate: [0, -2, 2, 0] }
                : {
                    scale: 1 + Math.min(tapCount, 3) * 0.06,
                    rotate: [-6, 6, -6, 0],
                    y: [0, -10, 0],
                  }
            }
            transition={
              justBurst
                ? { duration: 0.85, ease: 'easeInOut' }
                : tapCount === 0
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.45, ease: 'easeInOut' }
            }
            className="relative z-10 text-8xl sm:text-9xl cursor-pointer select-none focus:outline-none"
          >
            {justBurst ? '✨' : '🎁'}
          </motion.button>
        </div>

        {/* 3-Heart Unlock Meter */}
        <div className="flex items-center gap-3 mt-6">
          {[1, 2, 3].map((step) => (
            <motion.span
              key={step}
              animate={{ scale: tapCount >= step ? [1, 1.35, 1] : 1 }}
              className={`text-xl transition-all duration-300 ${
                tapCount >= step ? 'opacity-100' : 'opacity-25 grayscale'
              }`}
            >
              💖
            </motion.span>
          ))}
        </div>

        <motion.p
          key={tapCount}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-base text-slate-600 font-quicksand font-bold tracking-wide"
        >
          {alreadyOpened && !justBurst
            ? 'Box unlocked! Tap box or press Next ✨'
            : PROMPTS[Math.min(tapCount, 3)]}
        </motion.p>
      </motion.div>

      {/* Unified Bottom Back & Next Buttons */}
      <div className="z-10 flex items-center justify-between gap-4 w-full max-w-xs mb-2">
        <button
          type="button"
          disabled
          className="flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm border-2 bg-white/40 border-pink-100 text-pink-300 cursor-not-allowed opacity-50"
        >
          ← Back
        </button>

        <motion.button
          type="button"
          whileHover={isUnlocked ? { scale: 1.04 } : {}}
          whileTap={isUnlocked ? { scale: 0.94 } : {}}
          onClick={onNext}
          disabled={!isUnlocked}
          className={`flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm transition-all ${
            isUnlocked
              ? 'bg-pink-500 text-white shadow-md hover:bg-pink-600 cursor-pointer'
              : 'bg-pink-200/70 text-pink-400 cursor-not-allowed'
          }`}
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
}