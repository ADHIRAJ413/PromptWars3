import { motion } from 'framer-motion';
import { GREEN_BG_STYLE } from './landingAssets';
import { enterApp } from '../utils/navigation';

export default function CTASection({ onEnterApp }) {
  const goApp = () => onEnterApp?.('tracker') ?? enterApp('tracker');

  return (
    <section className="py-40 px-6 relative overflow-hidden bg-[#030f07]">
      <div className="absolute inset-0 z-0" style={GREEN_BG_STYLE}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030f07] via-[#030f07]/80 to-transparent" />
        <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-16 rounded-[48px] border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-3xl relative overflow-hidden group shadow-[0_0_100px_rgba(16,185,129,0.1)]"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter">
              Ready to Shape <br />
              <span className="text-gradient-emerald">The Future?</span>
            </h2>
            <p className="text-white/50 text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Track your carbon footprint, get personalized tips, and watch your impact shrink over time.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                type="button"
                onClick={goApp}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(16,185,129,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-12"
              >
                Join EcoAura Free
              </motion.button>
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-black uppercase tracking-widest text-xs hover:text-emerald-400 transition-colors"
              >
                Try demo calculator
              </motion.a>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-40">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><span className="text-emerald-500 text-lg">🛡️</span> Local-first data</div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><span className="text-emerald-500 text-lg">🌍</span> 4-category tracking</div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><span className="text-emerald-500 text-lg">🤖</span> Smart coaching</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
