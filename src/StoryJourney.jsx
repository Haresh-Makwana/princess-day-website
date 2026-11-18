import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const STORY_SLIDES = [
  {
    tag: 'Chapter 01 • Day One',
    emoji: '🌸',
    text: 'From the moment we became friends...',
    secret: 'P.S. Best plot twist ever—still grateful our paths crossed! ✨',
  },
  {
    tag: 'Chapter 02 • Core Memories',
    emoji: '💬',
    text: 'To all our late-night chats and crazy inside jokes...',
    secret: 'P.S. Nobody else understands our random humor like you do 😂',
  },
  {
    tag: 'Chapter 03 • Real Ones',
    emoji: '👑',
    text: "You've always been the absolute best.",
    secret: 'P.S. Certified 10/10 human and undefeated bestie 💖',
  },
  {
    tag: 'Chapter 04 • Pure Vibes',
    emoji: '☀️',
    text: 'You bring so much light into my life.',
    secret: 'P.S. Even a boring day turns into a core memory with you 🌟',
  },
  {
    tag: 'Chapter 05 • Royal Day',
    emoji: '🎀',
    text: 'And today is all about celebrating YOU!',
    secret: 'P.S. Keep smiling—your royal surprise is right up ahead 🧸',
  },
];

const REACTION_EMOJIS = ['💖', '🥺', '😂', '👑'];

export default function StoryJourney({ onBack, onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [reactionCounts, setReactionCounts] = useState({});
  const [burstEmojis, setBurstEmojis] = useState([]);

  const goToSlide = (newIndex) => {
    setShowSecret(false);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < STORY_SLIDES.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const handleReact = (emoji) => {
    const key = `${currentIndex}-${emoji}`;
    setReactionCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    const batchId = Date.now() + Math.random();
    const newParticles = Array.from({ length: 7 }).map((_, i) => ({
      id: `${batchId}-${i}`,
      emoji,
      left: 20 + Math.random() * 60,
      drift: (Math.random() - 0.5) * 90,
      scale: 0.9 + Math.random() * 0.6,
    }));

    setBurstEmojis((prev) => [...prev.slice(-21), ...newParticles]);
  };

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: (i * 8.5 + 3) % 94,
        duration: 4.5 + (i % 4) * 1.2,
        delay: (i % 5) * 0.6,
        scale: 0.55 + (i % 3) * 0.25,
        size: 1.1 + (i % 3) * 0.45,
      })),
    []
  );

  const currentSlide = STORY_SLIDES[currentIndex];

  return (
    <div className="relative flex flex-col items-center justify-between h-full w-full bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-50 py-7 px-5 overflow-hidden select-none">
      {/* Ambient Background Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-[-10%] left-0 text-pink-200 text-opacity-55"
            initial={{ x: `${heart.x}vw`, y: 0, scale: heart.scale }}
            animate={{ y: '-115vh' }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            }}
            style={{ fontSize: `${heart.size}rem` }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Live Reaction Shower Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
        <AnimatePresence>
          {burstEmojis.map((item) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 1, y: '75vh', x: `${item.left}vw`, scale: 0.4 }}
              animate={{
                opacity: 0,
                y: '15vh',
                x: `calc(${item.left}vw + ${item.drift}px)`,
                scale: item.scale,
                rotate: item.drift > 0 ? 25 : -25,
              }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              onAnimationComplete={() =>
                setBurstEmojis((prev) => prev.filter((p) => p.id !== item.id))
              }
              className="absolute text-3xl"
            >
              {item.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Interactive Story Progress Dots */}
      <div className="z-10 flex items-center justify-center gap-2 mt-1">
        {STORY_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to memory ${idx + 1}`}
            onClick={() => goToSlide(idx)}
            className="p-1 cursor-pointer focus:outline-none"
          >
            <motion.span
              animate={{
                width: idx === currentIndex ? 26 : 9,
                backgroundColor: idx <= currentIndex ? '#ec4899' : '#fbcfe8',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full block"
            />
          </button>
        ))}
      </div>

      {/* Center Swipeable Memory Card + Reaction Bar */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-sm my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) handleNext();
              else if (info.offset.x > 60) handleBack();
            }}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="w-full bg-white/85 backdrop-blur-md border-2 border-pink-200 rounded-3xl p-6 shadow-lg text-center cursor-grab active:cursor-grabbing"
          >
            {/* Chapter Tag & Floating Icon */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-[11px] font-quicksand font-bold uppercase tracking-wider">
                {currentSlide.tag}
              </span>
              <motion.span
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-2xl"
              >
                {currentSlide.emoji}
              </motion.span>
            </div>

            {/* Main Cursive Quote */}
            <h2 className="text-2xl sm:text-3xl text-pink-500 font-pacifico leading-relaxed my-3">
              {currentSlide.text}
            </h2>

            {/* Interactive Secret Note Toggle */}
            <div className="mt-4 pt-3 border-t border-pink-100">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSecret((prev) => !prev)}
                className="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-full text-xs font-quicksand font-bold text-pink-500 transition-colors cursor-pointer"
              >
                {showSecret ? 'Hide Secret P.S. 🙈' : 'Tap for Secret P.S. 💌'}
              </motion.button>

              <AnimatePresence>
                {showSecret && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28 }}
                    className="text-xs sm:text-sm text-slate-600 font-quicksand font-semibold overflow-hidden"
                  >
                    {currentSlide.secret}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cute Emoji Reaction Pills */}
        <div className="flex items-center justify-center gap-2.5 mt-4">
          {REACTION_EMOJIS.map((emoji) => {
            const count = reactionCounts[`${currentIndex}-${emoji}`] || 0;
            return (
              <motion.button
                key={emoji}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.82 }}
                onClick={() => handleReact(emoji)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-full border-2 font-quicksand font-bold text-sm shadow-sm transition-colors cursor-pointer ${
                  count > 0
                    ? 'bg-pink-100 border-pink-500 text-pink-600'
                    : 'bg-white/90 border-pink-200 text-slate-600 hover:bg-pink-50'
                }`}
              >
                <span className="text-base">{emoji}</span>
                {count > 0 && <span className="text-xs">{count}</span>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Unified Bottom Back & Next Buttons */}
      <div className="z-10 flex items-center justify-between gap-4 w-full max-w-xs mb-1">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleBack}
          className="flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm border-2 bg-white/90 border-pink-200 text-pink-500 shadow-sm hover:bg-pink-100/70 transition-all cursor-pointer"
        >
          ← Back
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          className="flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm bg-pink-500 text-white shadow-md hover:bg-pink-600 transition-colors cursor-pointer"
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
}