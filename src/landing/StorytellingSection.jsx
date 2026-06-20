import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ASSETS } from './landingAssets';

const storyStages = [
  { year: '2024', title: 'The Tipping Point', desc: 'Global emissions reach an all-time high. The urgency for individual action has never been clearer.', color: '#f87171', gradient: 'from-red-500/20 to-orange-500/20' },
  { year: '2026', title: 'Aura Awakens', desc: 'EcoAura launches, empowering millions to visualize their carbon impact through high-fidelity data.', color: '#e9c349', gradient: 'from-yellow-500/20 to-emerald-500/20' },
  { year: '2028', title: 'The Great Shift', desc: 'Systemic changes in energy and transport begin to flatten the curve. Renewable adoption soars.', color: '#10b981', gradient: 'from-emerald-500/20 to-sky-500/20' },
  { year: '2030', title: 'A Net-Zero Horizon', desc: 'Sustainable cities thrive. Your personal aura contribution helped bridge the gap to a greener future.', color: '#0ea5e9', gradient: 'from-sky-500/20 to-blue-500/10' },
];
export default function StorytellingSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section ref={containerRef} className="py-48 px-6 relative overflow-hidden bg-[#030f07]">
      <motion.div
        style={{ 
          y: bgY, 
          backgroundImage: `url(${ASSETS.split})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="absolute inset-0 opacity-20 pointer-events-none scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030f07] via-transparent to-[#030f07] z-[1]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-32">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
            The Journey to <span className="text-gradient-emerald">Hope.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            A chronological roadmap of our collective climate impact and the path we are building together.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-emerald-500 to-sky-500 opacity-20"></div>

          <div className="space-y-40">
            {storyStages.map((stage, i) => (
              <motion.div 
                key={stage.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                {/* Year Bubble */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#030f07] border-2 flex items-center justify-center font-black text-xl z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  style={{ borderColor: stage.color, color: stage.color, boxShadow: `0 0 20px ${stage.color}40` }}>
                  {stage.year}
                </div>

                <div className="flex-1 text-center md:text-right">
                  {i % 2 === 0 && (
                    <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-2xl relative overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{stage.title}</h3>
                      <p className="text-white/40 font-light leading-relaxed">{stage.desc}</p>
                    </div>
                  )}
                </div>

                <div className="w-16 hidden md:block"></div>

                <div className="flex-1 text-center md:text-left">
                  {i % 2 !== 0 && (
                    <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-2xl relative overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{stage.title}</h3>
                      <p className="text-white/40 font-light leading-relaxed">{stage.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
