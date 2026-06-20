import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GLASS_TEXTURE_STYLE } from './landingAssets';

const stats = [
  { label: 'Metric Tons Offset', value: '42.5M', color: '#10b981' },
  { label: 'Our Members', value: '890K', color: '#89ceff' },
  { label: 'Ecosystems Restored', value: '12K', color: '#e9c349' },
  { label: 'Community XP', value: '1.2B', color: '#f59e0b' },
];

const testimonials = [
  { name: 'Marcus Chen', role: 'Nature Photographer', text: 'EcoAura turned my abstract climate anxiety into a concrete roadmap. The visual data is stunning and actually actionable.', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { name: 'Sarah Jenkins', role: 'Architect', text: 'Integrating these metrics into my build designs has been seamless. The tracker is by far the most premium tool in this space.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Elena Rodriguez', role: 'Student Leader', text: 'The challenges are addictive. Our university community has saved over 500 tons this semester alone!', avatar: 'https://i.pravatar.cc/150?u=elena' },
];
function TestimonialCard({ t }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 pointer-events-none transition-opacity" style={GLASS_TEXTURE_STYLE} />
      <div className="aura-glow"></div>
      
      <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
        <p className="text-white/60 font-light italic mb-8 leading-relaxed">"{t.text}"</p>
        <div className="flex items-center gap-4">
          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-emerald-500/30" />
          <div>
            <div className="font-black text-white text-sm">{t.name}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunitySection() {
  return (
    <section id="community" className="py-32 px-6 relative bg-[#030f07] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="text-5xl font-black mb-2 text-glow" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Trusted by Global <span className="text-gradient-gold">Change Agents.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
