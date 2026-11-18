import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const HIDDEN_GIFTS = [
  {
    id: 1,
    boxEmoji: '🎁',
    rewardEmoji: '👑',
    badge: 'Royal Note #1',
    title: 'Official Princess Status',
    quote: 'Reminder: Today and every day, you deserve nothing less than absolute royal treatment.',
  },
  {
    id: 2,
    boxEmoji: '🎀',
    rewardEmoji: '🌸',
    badge: 'Sweet Note #2',
    title: 'Pure Sunshine',
    quote: 'Your energy, kindness, and laugh make every single hangout 10x better.',
  },
  {
    id: 3,
    boxEmoji: '💝',
    rewardEmoji: '✨',
    badge: 'Secret Note #3',
    title: 'Main Character Energy',
    quote: 'Your smile literally lights up the whole room. Never let anyone dull your sparkle.',
  },
  {
    id: 4,
    boxEmoji: '🧸',
    rewardEmoji: '💖',
    badge: 'Royal Mirror #4',
    title: 'Bestie of the Year',
    quote: 'Who is the prettiest, kindest, and most iconic best friend ever? Spoiler: She is holding this phone.',
  },
];

export default function HiddenGiftsGame({ openedIds, setOpenedIds, onBack, onNext }) {
  const [activeGift, setActiveGift] = useState(null);

  const handleBoxClick = (gift) => {
    setActiveGift(gift);
    if (!openedIds.includes(gift.id)) {
      setOpenedIds((prev) => [...prev, gift.id]);
    }
  };

  const allUnlocked = openedIds.length === HIDDEN_GIFTS.length;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-between h-full w-full bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-50 py-8 px-6 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
    >
      {/* Top Header & Progress Tracker */}
      <div className="z-10 text-center mt-1">
        <h2 className="text-3xl text-pink-500 font-pacifico mb-1.5">
          Secret Notes
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-quicksand font-semibold">
          {allUnlocked
            ? 'All 4 notes unlocked! Press Next ✨'
            : `Tap all 4 boxes to unlock Next (${openedIds.length}/4)`}
        </p>

        {/* Progress Hearts */}
        <div className="flex items-center justify-center gap-2 mt-2.5">
          {HIDDEN_GIFTS.map((g) => {
            const isFound = openedIds.includes(g.id);
            return (
              <motion.span
                key={g.id}
                animate={{ scale: isFound ? [1, 1.35, 1] : 1 }}
                className={`text-lg transition-opacity duration-300 ${
                  isFound ? 'opacity-100' : 'opacity-30 grayscale'
                }`}
              >
                💖
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* 2x2 Responsive Grid of Mystery Boxes */}
      <div className="z-10 grid grid-cols-2 gap-4 w-full max-w-xs my-auto">
        {HIDDEN_GIFTS.map((gift, index) => {
          const isOpened = openedIds.includes(gift.id);
          return (
            <motion.button
              key={gift.id}
              onClick={() => handleBoxClick(gift)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.88 }}
              animate={
                isOpened
                  ? { y: 0 }
                  : {
                      y: [0, -7, 0],
                      rotate: [0, -3, 3, 0],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: isOpened ? 0 : Infinity,
                delay: index * 0.3,
                ease: 'easeInOut',
              }}
              className={`relative flex flex-col items-center justify-center aspect-square rounded-3xl border-2 shadow-md transition-colors cursor-pointer ${
                isOpened
                  ? 'bg-white/95 border-pink-200'
                  : 'bg-pink-100/90 border-pink-200 hover:bg-pink-100'
              }`}
            >
              <span className="absolute top-2.5 right-3 text-xs font-quicksand font-bold text-pink-500">
                {isOpened ? '✓' : '?'}
              </span>

              <motion.span
                animate={isOpened ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-2"
              >
                {isOpened ? gift.rewardEmoji : gift.boxEmoji}
              </motion.span>

              <span className="text-xs font-quicksand font-semibold text-slate-600 px-2 text-center">
                {isOpened ? gift.title : `Note #${gift.id}`}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Unified Bottom Back & Next Buttons */}
      <div className="z-10 flex items-center justify-between gap-4 w-full max-w-xs mb-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={onBack}
          className="flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm border-2 bg-white/90 border-pink-200 text-pink-500 shadow-sm hover:bg-pink-100/70 transition-all cursor-pointer"
        >
          ← Back
        </motion.button>

        <motion.button
          type="button"
          whileHover={allUnlocked ? { scale: 1.04 } : {}}
          whileTap={allUnlocked ? { scale: 0.94 } : {}}
          onClick={onNext}
          disabled={!allUnlocked}
          className={`flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm transition-all ${
            allUnlocked
              ? 'bg-pink-500 text-white shadow-md hover:bg-pink-600 cursor-pointer'
              : 'bg-pink-200/70 text-pink-400 cursor-not-allowed'
          }`}
        >
          Next →
        </motion.button>
      </div>

      {/* Interactive Note Reveal Popup Card */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/35 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGift(null)}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * 145,
                    y: Math.sin(angle) * 165,
                    scale: 1.2,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute text-2xl pointer-events-none"
                >
                  {i % 2 === 0 ? '✨' : '💖'}
                </motion.span>
              );
            })}

            <motion.div
              className="relative bg-white border-2 border-pink-200 rounded-3xl p-7 max-w-sm w-full text-center shadow-2xl"
              initial={{ scale: 0.65, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-xs font-quicksand font-bold uppercase tracking-wider mb-4">
                {activeGift.badge}
              </span>

              <motion.div
                className="text-7xl mb-4"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                {activeGift.rewardEmoji}
              </motion.div>

              <h3 className="text-2xl text-pink-500 font-pacifico mb-3">
                {activeGift.title}
              </h3>

              <p className="text-base text-slate-600 font-quicksand font-semibold leading-relaxed mb-6">
                "{activeGift.quote}"
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGift(null)}
                className="w-full py-3 bg-pink-100 text-pink-500 rounded-full font-quicksand font-bold hover:bg-pink-200 transition-colors cursor-pointer"
              >
                Keep in Pocket 💖
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}