import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ICONS = ['✨', '💖', '👑', '🌸', '🎀'];

export default function SparkleTrail() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const id = Date.now() + Math.random();
      const particles = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
        const distance = 35 + Math.random() * 45;
        return {
          id: `${id}-${i}`,
          icon: ICONS[Math.floor(Math.random() * ICONS.length)],
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance - 20,
          rotate: (Math.random() - 0.5) * 90,
          scale: 0.7 + Math.random() * 0.5,
        };
      });

      setBursts((prev) => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY, particles }]);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) =>
          burst.particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{
                x: burst.x - 10,
                y: burst.y - 10,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: burst.x - 10 + p.dx,
                y: burst.y - 10 + p.dy,
                scale: p.scale,
                rotate: p.rotate,
                opacity: 0,
              }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setBursts((prev) => prev.filter((b) => b.id !== burst.id));
              }}
              className="absolute text-lg select-none"
            >
              {p.icon}
            </motion.span>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}