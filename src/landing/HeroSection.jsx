import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { POLLUTED_BG_STYLE, GREEN_BG_STYLE } from './landingAssets';
import { enterApp } from '../utils/navigation';

function useCountUp(target, duration = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return [count, ref];
}

export default function HeroSection({ onEnterApp }) {
  const [co2, co2Ref] = useCountUp(368, 3);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const earthY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 50);
    mouseY.set((e.clientY / innerHeight - 0.5) * 50);
  };

  const goApp = () => onEnterApp?.('tracker') ?? enterApp('tracker');

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 flex">
        <div className="w-1/2 relative overflow-hidden" style={POLLUTED_BG_STYLE}>
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            animate={{ x: [-10, 10, -10], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-tr from-orange-900/40 via-transparent to-transparent pointer-events-none"
          />
        </div>
        <div className="w-1/2 relative overflow-hidden" style={GREEN_BG_STYLE}>
          <div className="absolute inset-0 bg-emerald-950/20" />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], rotate: [20, 25, 20] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
          />
        </div>
      </motion.div>

      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, #10b981, #34d399, #10b981, transparent)',
          boxShadow: '0 0 20px rgba(16,185,129,0.8), 0 0 40px rgba(16,185,129,0.4)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030f07]/80 via-transparent to-[#030f07] z-10" />

      <div className="relative z-20 text-center max-w-7xl mx-auto px-6 py-24">
        <motion.div style={{ y: textY, x: mouseX, rotateY: mouseX, rotateX: mouseY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold mb-8 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl text-emerald-300 uppercase tracking-[0.2em]"
          >
            <span>🌍</span>
            <span>Track Your Carbon Impact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8 tracking-tighter text-glow"
            aria-label="Track Carbon Emissions, Save the Planet"
          >
            Track <span className="text-gradient-emerald">CO₂</span><br />
            <span className="text-white">Heal the World</span>
          </motion.h1>

          <motion.div
            style={{ y: earthY }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-16 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full rounded-full bg-gradient-to-br from-emerald-900 via-emerald-600 to-sky-900 shadow-[0_0_80px_rgba(16,185,129,0.4)] flex items-center justify-center text-8xl md:text-9xl"
            >
              🌍
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 border-2 border-emerald-500/30 rounded-full scale-110"
            />
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.button
              type="button"
              onClick={goApp}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(16,185,129,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg"
            >
              Start Tracking
            </motion.button>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg backdrop-blur-md"
            >
              Learn Actions
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 z-20 flex items-center gap-6 px-10 py-4 glass-card-dark !rounded-full border-emerald-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Live Emissions</span>
        </div>
        <div className="text-2xl font-black text-white flex items-baseline gap-1">
          <span ref={co2Ref} className="text-emerald-400">{(co2 / 10).toFixed(1)}B</span>
          <span className="text-xs text-white/50">Tons</span>
        </div>
      </motion.div>
    </section>
  );
}
