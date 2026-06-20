import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GLASS_TEXTURE_STYLE } from './landingAssets';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthData = [14.2, 13.8, 13.1, 12.9, 12.5, 12.0, 11.8, 11.3, 10.9, 10.5, 10.1, 9.8];
const maxVal = 16;

const breakdown = [
  { label: 'Transport', pct: 35, color: '#89ceff' },
  { label: 'Energy', pct: 28, color: '#10b981' },
  { label: 'Food', pct: 22, color: '#4ade80' },
  { label: 'Air Travel', pct: 10, color: '#818cf8' },
  { label: 'Shopping', pct: 3, color: '#e9c349' },
  { label: 'Waste', pct: 2, color: '#f87171' },
];
function BentoCard({ children, className = "", delay = 0, tilt = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!tilt) return;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY: tilt ? rotateY : 0, rotateX: tilt ? rotateX : 0, transformStyle: "preserve-3d" }}
      className={`relative rounded-3xl p-8 border border-white/5 overflow-hidden group tilt-card ${className}`}
    >
      <div className="absolute inset-0 bg-emerald-950/10 backdrop-blur-2xl group-hover:bg-emerald-950/20 transition-colors"></div>
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 pointer-events-none transition-opacity" style={GLASS_TEXTURE_STYLE} />
      <div className="aura-glow"></div>
      <div className="relative z-20" style={{ transform: tilt ? "translateZ(30px)" : "none" }}>
        {children}
      </div>
    </motion.div>
  );
}

function DonutRing({ score = 78 }) {
  const radius = 80;
  const circ = 2 * Math.PI * radius;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="-rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(16,185,129,0.05)" strokeWidth="20" />
        {breakdown.map((b, i) => {
          const segStart = breakdown.slice(0, i).reduce((a, c) => a + c.pct, 0);
          const segLen = (b.pct / 100) * circ;
          const segOffset = circ - (segStart / 100) * circ;
          return (
            <motion.circle key={b.label}
              initial={{ strokeDasharray: `0 ${circ}` }}
              whileInView={{ strokeDasharray: `${segLen} ${circ - segLen}` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
              cx="100" cy="100" r={radius} fill="none" stroke={b.color}
              strokeWidth="20" strokeDashoffset={segOffset} strokeLinecap="butt" />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-white text-glow">{score}</span>
        <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 font-bold">ECO SCORE</span>
      </div>
    </div>
  );
}

export default function DashboardSection() {
  return (
    <section id="dashboard" className="py-32 px-6 relative overflow-hidden bg-[#030f07] perspective-1000">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-24">
          <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 border border-sky-500/20 bg-sky-500/5 text-sky-400">
            📊 Data Intelligence
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter">
            Your Narrative,{' '}
            <span className="text-gradient-emerald">Defined by Data.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto tracking-wide">
            Complex planetary metrics distilled into a premium, interactive interface.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px] md:h-auto">
          {/* Main Chart */}
          <BentoCard className="md:col-span-8 md:row-span-1" delay={0.1}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-black text-white text-2xl tracking-tight">CO₂ Emissions Trend</h3>
                <p className="text-white/30 text-sm font-light">Monthly progress towards your 2030 goal</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-emerald-400 font-black text-xl leading-none">↓ 31%</span>
                <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1">vs Last Year</span>
              </div>
            </div>
            {/* Custom high-end Area Chart */}
            <div className="relative h-64 mt-4">
              <svg className="w-full h-full" viewBox={`0 0 ${months.length * 80} 200`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  fill="url(#areaGrad)"
                  d={`M 0 200 ${monthData.map((v, i) => `L ${i * 80 + 40} ${200 - (v / maxVal) * 160}`).join(' ')} L ${(months.length - 1) * 80 + 40} 200 Z`}
                />
                <motion.polyline
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  points={monthData.map((v, i) => `${i * 80 + 40},${200 - (v / maxVal) * 160}`).join(' ')}
                  className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
              </svg>
              {/* Labels */}
              <div className="flex justify-between mt-6 px-4">
                {months.map(m => (
                  <span key={m} className="text-[11px] font-bold text-white/20 uppercase tracking-tighter">{m}</span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Eco Score Ring */}
          <BentoCard className="md:col-span-4 md:row-span-1 flex flex-col items-center justify-center text-center" delay={0.2}>
            <DonutRing score={78} />
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest leading-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Green Guardian
              </div>
              <p className="text-white/40 text-xs font-light mt-4 px-6">You're in the top 12% of climate-conscious individuals globally.</p>
            </div>
          </BentoCard>

          {/* Impact Stats */}
          <BentoCard className="md:col-span-4" delay={0.3}>
            <h3 className="font-black text-white text-lg mb-6 tracking-tight uppercase tracking-widest">Community Impact</h3>
            <div className="space-y-4">
              {[
                { emoji: '🌳', text: '23 Trees Saved', color: '#10b981', sub: 'Equivalent growth per year' },
                { emoji: '💧', text: '45.2K Liters', color: '#89ceff', sub: 'Water saved in diet shift' },
                { emoji: '🚲', text: '3.2K KM', color: '#e9c349', sub: 'Offset by green commute' },
              ].map((item, i) => (
                <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
                  <span className="text-3xl filter drop-shadow-lg">{item.emoji}</span>
                  <div>
                    <div className="font-black text-white text-sm" style={{ color: item.color }}>{item.text}</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-wider">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Breakdown Bars */}
          <BentoCard className="md:col-span-8" delay={0.4}>
            <h3 className="font-black text-white text-lg mb-8 tracking-tight uppercase tracking-widest">Personal Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {breakdown.map((b, i) => (
                <div key={b.label} className="w-full">
                  <div className="flex justify-between mb-2 items-baseline">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{b.label}</span>
                    <span className="text-sm font-black" style={{ color: b.color }}>{b.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${b.color}aa, ${b.color})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
