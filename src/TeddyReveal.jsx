import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

function useTypewriter(text, speed = 85, delay = 650) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayText;
}

const HUG_NOTES = [
  'Sending giant bear hugs! 🤗',
  "You're the sweetest princess! 👑",
  'Besties forever & always! 💖',
  '1000x virtual squeezes! 🧸✨',
  'Keep shining bright! 🌸',
];

function CuteTeddySVG({ isHugging }) {
  return (
    <motion.svg
      viewBox="0 0 220 220"
      className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md select-none"
      animate={
        isHugging
          ? { scale: [1, 1.15, 0.95, 1.08, 1], rotate: [0, -6, 6, -4, 0] }
          : { y: [0, -5, 0] }
      }
      transition={
        isHugging
          ? { duration: 0.6 }
          : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      {/* Golden Princess Crown */}
      <motion.g
        animate={{ y: [0, -2, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polygon
          points="82,42 90,20 110,34 130,20 138,42"
          fill="#FBBF24"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="90" cy="18" r="3" fill="#EC4899" />
        <circle cx="110" cy="31" r="3.5" fill="#EC4899" />
        <circle cx="130" cy="18" r="3" fill="#EC4899" />
      </motion.g>

      {/* Ears */}
      <circle cx="66" cy="62" r="22" fill="#C68B59" />
      <circle cx="66" cy="62" r="12" fill="#FBCFE8" />
      <circle cx="154" cy="62" r="22" fill="#C68B59" />
      <circle cx="154" cy="62" r="12" fill="#FBCFE8" />

      {/* Body */}
      <ellipse cx="110" cy="158" rx="46" ry="42" fill="#C68B59" />
      <ellipse cx="110" cy="160" rx="28" ry="26" fill="#FDE8D7" />

      {/* Head */}
      <ellipse cx="110" cy="95" rx="52" ry="44" fill="#D49A6A" />

      {/* Muzzle */}
      <ellipse cx="110" cy="106" rx="22" ry="16" fill="#FDE8D7" />
      <ellipse cx="110" cy="99" rx="7" ry="5" fill="#5C3A21" />
      <path
        d="M 101 110 Q 110 118 119 110"
        fill="none"
        stroke="#5C3A21"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Blinking Eyes */}
      <motion.g
        style={{ transformOrigin: '110px 86px' }}
        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.48, 0.52, 1] }}
      >
        <circle cx="88" cy="86" r="5.5" fill="#3B2314" />
        <circle cx="86.5" cy="84" r="1.8" fill="#FFFFFF" />
        <circle cx="132" cy="86" r="5.5" fill="#3B2314" />
        <circle cx="130.5" cy="84" r="1.8" fill="#FFFFFF" />
      </motion.g>

      {/* Rosy Cheeks */}
      <ellipse cx="75" cy="98" rx="8" ry="5" fill="#F472B6" opacity="0.55" />
      <ellipse cx="145" cy="98" rx="8" ry="5" fill="#F472B6" opacity="0.55" />

      {/* Paws */}
      <motion.ellipse
        cx="64"
        cy="148"
        rx="16"
        ry="22"
        fill="#D49A6A"
        animate={isHugging ? { rotate: -25 } : { rotate: -10 }}
      />
      <motion.ellipse
        cx="156"
        cy="148"
        rx="16"
        ry="22"
        fill="#D49A6A"
        animate={isHugging ? { rotate: 25 } : { rotate: 10 }}
      />

      {/* Heart Held by Teddy */}
      <motion.path
        d="M110 176 C110 176 86 160 86 146 C86 138 93 133 100 133 C105 133 108 136 110 139 C112 136 115 133 120 133 C127 133 134 138 134 146 C134 160 110 176 110 176 Z"
        fill="#EC4899"
        animate={{ scale: isHugging ? [1, 1.25, 1] : [1, 1.07, 1] }}
        style={{ transformOrigin: '110px 155px' }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

export default function TeddyReveal({ choices, onBack, onReset }) {
  const headline = 'Happy Princess Day!';
  const typedText = useTypewriter(headline, 95, 700);
  const isTypingComplete = typedText === headline;

  const [hugCount, setHugCount] = useState(0);
  const [isHugging, setIsHugging] = useState(false);
  const [flyingHearts, setFlyingHearts] = useState([]);

  const petals = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${(i * 10 + 4) % 94}%`,
        fontSize: `${0.9 + (i % 3) * 0.3}rem`,
        drift: i % 2 === 0 ? 18 : -18,
        duration: 6 + (i % 4) * 1.5,
        delay: i * 0.5,
        icon: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '✨' : '💖',
      })),
    []
  );

  const triggerHug = () => {
    setHugCount((c) => c + 1);
    setIsHugging(true);
    setTimeout(() => setIsHugging(false), 600);

    const batchId = Date.now();
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: `${batchId}-${i}`,
      x: (Math.random() - 0.5) * 180,
      emoji: i % 2 === 0 ? '💖' : '👑',
    }));
    setFlyingHearts((prev) => [...prev.slice(-16), ...newHearts]);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-between h-full w-full bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-50 px-5 py-7 text-center overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Isolated Background Layer so Falling Petals Never Trigger Scrollbars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petals.map((petal) => (
          <motion.span
            key={petal.id}
            className="absolute top-[-8%] select-none opacity-60"
            style={{
              left: petal.left,
              fontSize: petal.fontSize,
            }}
            animate={{
              y: ['0vh', '112vh'],
              x: [0, petal.drift, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear',
            }}
          >
            {petal.icon}
          </motion.span>
        ))}
      </div>

      {/* Main Centered Content */}
      <div className="z-10 flex flex-col items-center my-auto w-full">
        {/* Cute Speech Bubble Above Teddy */}
        <div className="h-7 mb-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={hugCount}
              initial={{ opacity: 0, y: 8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              className="px-3.5 py-1 bg-white border border-pink-200 rounded-full shadow-sm text-xs font-quicksand font-bold text-pink-500"
            >
              {hugCount === 0
                ? 'Tap me for a hug! 🧸'
                : HUG_NOTES[(hugCount - 1) % HUG_NOTES.length]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Kawaii Teddy Bear */}
        <motion.div
          className="relative cursor-pointer mb-1"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          onClick={triggerHug}
        >
          <CuteTeddySVG isHugging={isHugging} />

          <AnimatePresence>
            {flyingHearts.map((h) => (
              <motion.span
                key={h.id}
                initial={{ opacity: 1, y: 0, x: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -120, x: h.x, scale: 1.3 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                onAnimationComplete={() =>
                  setFlyingHearts((prev) => prev.filter((item) => item.id !== h.id))
                }
                className="absolute left-1/2 top-1/2 text-2xl pointer-events-none"
              >
                {h.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Typewriter Headline */}
        <div className="h-11 mb-1 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl text-pink-500 font-pacifico tracking-wide">
            {typedText}
            <motion.span
              className="inline-block text-pink-300 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </h1>
        </div>

        {/* Quote, Princess ID Card & Hug Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: isTypingComplete ? 1 : 0,
            y: isTypingComplete ? 0 : 16,
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          <p className="text-xs sm:text-sm text-slate-600 font-quicksand font-semibold leading-relaxed mb-3">
            "You are the most amazing best friend anyone could ask for. Thank you for always being you. Keep shining, Princess!"
          </p>

          {choices?.title && (
            <div className="w-full bg-white/90 border-2 border-dashed border-pink-200 rounded-2xl p-2.5 mb-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-quicksand font-bold text-pink-500 mb-1">
                <span>👑 OFFICIAL PRINCESS ID</span>
                <span>
                  {choices.title.emoji} {choices.title.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 my-1">
                {choices.powers?.map((p) => (
                  <span
                    key={p.id}
                    className="px-2.5 py-0.5 bg-pink-50 border border-pink-200 rounded-full text-xs font-quicksand font-bold text-slate-600"
                  >
                    {p.emoji} {p.label}
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-quicksand font-semibold text-slate-400 mt-1">
                Certified Bestie • Valid Forever 💫
              </p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={triggerHug}
            className="px-6 py-2 bg-pink-100 border border-pink-300 text-pink-600 rounded-full font-quicksand font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
          >
            Send a Bear Hug 🤗 {hugCount > 0 && `(${hugCount})`}
          </motion.button>
        </motion.div>
      </div>

      {/* Unified Bottom Back & Replay Buttons */}
      <div className="z-10 flex items-center justify-between gap-4 w-full max-w-xs pt-2 mb-1">
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
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={onReset}
          className="flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm bg-pink-500 text-white shadow-md hover:bg-pink-600 transition-colors cursor-pointer"
        >
          Replay ↻
        </motion.button>
      </div>
    </motion.div>
  );
}