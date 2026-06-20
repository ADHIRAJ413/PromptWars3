import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GLASS_TEXTURE_STYLE } from './landingAssets';

const features = [
  { icon: '🚌', color: '#89ceff', bg: 'rgba(137,206,255,0.1)', border: 'rgba(137,206,255,0.25)', title: 'Multi-Modal Transport', desc: 'Swap car miles for trains, bikes, and buses. Every km counts toward a cleaner planet.', save: '2.3 tons/year', tag: 'Transport' },
  { icon: '⚡', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', title: 'Smart Energy Savings', desc: 'AI-optimized tips for your home — from thermostat habits to insulation upgrades.', save: '1.8 tons/year', tag: 'Energy' },
  { icon: '🌱', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)', title: 'Plant-Based Diet Shift', desc: 'Meat in moderation. Discover meals that nourish you and the Earth simultaneously.', save: '1.5 tons/year', tag: 'Food' },
  { icon: '🛍️', color: '#e9c349', bg: 'rgba(233,195,73,0.1)', border: 'rgba(233,195,73,0.25)', title: 'Conscious Consumption', desc: 'Buy less, choose better. Our secondhand and ethical brand recommendations guide you.', save: '0.8 tons/year', tag: 'Shopping' },
  { icon: '☀️', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', title: 'Renewable Energy', desc: 'Switch to solar, wind, or a green energy provider. One switch, lifelong impact.', save: '3.2 tons/year', tag: 'Energy' },
  { icon: '♻️', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.25)', title: 'Zero-Waste Lifestyle', desc: 'Reduce, reuse, recycle — master the circular economy from your home outward.', save: '0.5 tons/year', tag: 'Waste' },
];

function FeatureCard({ f }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    // Update local aura for the hover effect
    e.currentTarget.style.setProperty('--mouse-x', `${mouseX}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${mouseY}px`);
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
      whileHover={{ y: -8 }}
      className="relative rounded-2xl p-8 cursor-pointer transition-all duration-300 group tilt-card h-full"
    >
      {/* Background with texture */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity" style={GLASS_TEXTURE_STYLE} />
      <div className="absolute inset-0 rounded-2xl border pointer-events-none transition-colors"
        style={{ background: f.bg, borderColor: f.border, backdropFilter: 'blur(30px)' }}></div>
      
      {/* Glow aura */}
      <div className="aura-glow"></div>

      {/* Content */}
      <div className="relative z-20" style={{ transform: "translateZ(50px)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-xl"
          style={{ background: f.bg, border: `1px solid ${f.border}` }}>
          {f.icon}
        </div>
        <h3 className="text-xl font-black text-white mb-3 text-glow">{f.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed font-light mb-6 line-clamp-3">{f.desc}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full"
            style={{ color: f.color, background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
            {f.tag}
          </span>
          <span className="text-sm font-black" style={{ color: f.color }}>
            -{f.save}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="text-center mb-24">
          <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
            🌿 Actionable Solutions
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none text-white tracking-tighter">
            Small Changes.{' '}
            <span className="text-gradient-emerald">Massive Impact.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto tracking-wide">
            Precision climate intelligence mapped to your daily life. Transforming intentions into measurable planetary results.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
