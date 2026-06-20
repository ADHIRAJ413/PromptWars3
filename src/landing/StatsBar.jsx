import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function StatItem({ icon, value, label, suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const step = numericValue / 80;
      const interval = setInterval(() => {
        start += step;
        if (start >= numericValue) { setCount(numericValue); clearInterval(interval); }
        else setCount(parseFloat(start.toFixed(1)));
      }, 20);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, numericValue, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay }}
      className="flex flex-col items-center text-center px-6 py-6 border-r border-emerald-500/10 last:border-r-0">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl md:text-4xl font-black text-emerald-400 leading-none">
        {count}{suffix}
      </div>
      <div className="text-xs text-white/50 mt-2 uppercase tracking-widest font-medium">{label}</div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <div className="relative z-30 -mt-1"
      style={{ background: 'rgba(3,15,7,0.95)', borderTop: '1px solid rgba(16,185,129,0.15)', borderBottom: '1px solid rgba(16,185,129,0.15)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
        <StatItem icon="💨" value={36.8} suffix="B" label="Tons CO₂ annually" delay={0} />
        <StatItem icon="👤" value={4.7} suffix="t" label="Avg personal footprint" delay={0.1} />
        <StatItem icon="👥" value={500} suffix="K+" label="Active trackers" delay={0.2} />
        <StatItem icon="🌱" value={127} suffix="M" label="Tons saved by community" delay={0.3} />
      </div>
    </div>
  );
}
