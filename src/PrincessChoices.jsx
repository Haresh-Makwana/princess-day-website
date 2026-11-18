import { motion, AnimatePresence } from 'framer-motion';

const PRINCESS_TITLES = [
  { id: 'bestie', emoji: '👑', label: 'Certified Bestie' },
  { id: 'sunshine', emoji: '☀️', label: 'Human Sunshine' },
  { id: 'main', emoji: '✨', label: 'Main Character' },
  { id: 'cutie', emoji: '🦋', label: 'Chaotic Cutie' },
];

const BESTIE_POWERS = [
  { id: 'laughs', emoji: '😂', label: 'Elite Humor' },
  { id: 'talks', emoji: '💬', label: '24/7 Tea & Talks' },
  { id: 'comfort', emoji: '🫂', label: 'Comfort Person' },
  { id: 'loyal', emoji: '💛', label: 'Always Has My Back' },
  { id: 'advice', emoji: '🧠', label: 'Iconic Advice' },
  { id: 'vibe', emoji: '🌟', label: 'Unmatched Vibe' },
];

export default function PrincessChoices({ choices, setChoices, onBack, onNext }) {
  const selectedTitle = choices.title;
  const selectedPowers = choices.powers || [];

  const handleSelectTitle = (titleItem) => {
    setChoices((prev) => ({ ...prev, title: titleItem }));
  };

  const togglePower = (power) => {
    setChoices((prev) => {
      const current = prev.powers || [];
      const exists = current.some((item) => item.id === power.id);
      let updated;
      if (exists) {
        updated = current.filter((item) => item.id !== power.id);
      } else if (current.length >= 3) {
        updated = [...current.slice(1), power];
      } else {
        updated = [...current, power];
      }
      return { ...prev, powers: updated };
    });
  };

  const isReady = selectedTitle !== null && selectedPowers.length > 0;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-between h-full w-full bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-50 py-7 px-5 overflow-y-auto select-none"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.45 }}
    >
      {/* Header */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-white/80 text-pink-500 rounded-full text-xs font-quicksand font-bold uppercase tracking-wider shadow-sm mb-2">
          Royal Coronation 👑
        </span>
        <h2 className="text-3xl text-pink-500 font-pacifico">
          Build Your Crown
        </h2>
      </div>

      {/* Section 1: Pick Her Official Title */}
      <div className="w-full max-w-sm my-2">
        <p className="text-xs font-quicksand font-bold uppercase tracking-wider text-slate-500 mb-2 text-center">
          1. Claim your official Princess title
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {PRINCESS_TITLES.map((item) => {
            const isSelected = selectedTitle?.id === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={() => handleSelectTitle(item)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl border-2 font-quicksand font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md scale-[1.02]'
                    : 'bg-white/90 text-slate-600 border-pink-200 hover:bg-pink-100/70'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Pick Her Bestie Superpowers */}
      <div className="w-full max-w-sm my-2">
        <div className="flex items-center justify-between px-1 mb-2">
          <p className="text-xs font-quicksand font-bold uppercase tracking-wider text-slate-500">
            2. Pick up to 3 bestie powers
          </p>
          <span className="text-xs font-quicksand font-bold text-pink-500">
            {selectedPowers.length}/3 picked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {BESTIE_POWERS.map((power) => {
            const isPicked = selectedPowers.some((p) => p.id === power.id);
            return (
              <motion.button
                key={power.id}
                type="button"
                whileTap={{ scale: 0.92 }}
                animate={isPicked ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                onClick={() => togglePower(power)}
                className={`relative flex items-center gap-2.5 p-3 rounded-2xl border-2 font-quicksand font-bold text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                  isPicked
                    ? 'bg-pink-100 border-pink-500 text-pink-600 shadow-sm'
                    : 'bg-white/85 border-pink-200 text-slate-600 hover:bg-pink-50'
                }`}
              >
                <span className="text-xl">{power.emoji}</span>
                <span className="leading-tight pr-4">{power.label}</span>

                <AnimatePresence>
                  {isPicked && (
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs"
                    >
                      💖
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Unified Bottom Back & Next Buttons */}
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
          whileHover={isReady ? { scale: 1.04 } : {}}
          whileTap={isReady ? { scale: 0.94 } : {}}
          onClick={onNext}
          disabled={!isReady}
          className={`flex-1 py-3 px-5 rounded-full font-quicksand font-bold text-sm transition-all ${
            isReady
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