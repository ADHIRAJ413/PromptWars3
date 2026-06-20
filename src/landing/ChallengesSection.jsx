import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GLASS_TEXTURE_STYLE } from './landingAssets';

const challenges = [
  { id: 1, title: '30-Day Zero Meat', icon: '🥩', difficulty: 'Hard', points: 1500, participants: '12.4K', color: '#f87171', progress: 65, bg: 'rgba(248,113,113,0.05)', border: 'rgba(248,113,113,0.2)' },
  { id: 2, title: 'Public Transit Hero', icon: '🚌', difficulty: 'Medium', points: 800, participants: '45.2K', color: '#89ceff', progress: 42, bg: 'rgba(137,206,255,0.05)', border: 'rgba(137,206,255,0.2)' },
  { id: 3, title: 'Solar Transition', icon: '☀️', difficulty: 'Expert', points: 5000, participants: '2.1K', color: '#e9c349', progress: 15, bg: 'rgba(233,195,73,0.05)', border: 'rgba(233,195,73,0.2)' },
  { id: 4, title: 'Waste-Free Week', icon: '🗑️', difficulty: 'Medium', points: 600, participants: '89.4K', color: '#4ade80', progress: 88, bg: 'rgba(74,222,128,0.05)', border: 'rgba(74,222,128,0.2)' },
];
function ChallengeCard({ c }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-[32px] p-8 border border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden group tilt-card"
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 pointer-events-none transition-opacity" style={GLASS_TEXTURE_STYLE} />
      <div className="aura-glow"></div>

      <div className="relative z-20" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:border-emerald-500/50 transition-colors">
            {c.icon}
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Badge Award</div>
            <div className="text-xl font-black text-glow" style={{ color: c.color }}>{c.points} XP</div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{c.title}</h3>
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
            {c.difficulty}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
            👤 {c.participants} active
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
            <span>Global Progress</span>
            <span style={{ color: c.color }}>{c.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${c.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${c.color}66, ${c.color})` }}
            />
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-full mt-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white text-xs font-black uppercase tracking-widest transition-all"
        >
          Join Challenge
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ChallengesSection() {
  return (
    <section id="challenges" className="py-32 px-6 relative overflow-hidden bg-[#030f07] perspective-1000">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
          <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
            🏆 Gamified Impact
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter">
            Get Rewarded for <span className="text-gradient-emerald">Good Habits.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto tracking-wide">
            Turn sustainable habits into rewarded achievements. Compete with the community and track your real-world progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map(c => (
            <ChallengeCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
