import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GLASS_TEXTURE_STYLE } from './landingAssets';
import { enterApp } from '../utils/navigation';

const categories = [
  { id: 'transport', icon: '🚗', label: 'Transport', key: 'transport', max: 1000, unit: 'km/week', factor: 0.21, color: '#89ceff' },
  { id: 'electricity', icon: '⚡', label: 'Electricity', key: 'electricity', max: 2000, unit: 'kWh/mo', factor: 0.23 / 10, color: '#10b981' },
  { id: 'flights', icon: '✈️', label: 'Air Travel', key: 'flights', max: 50, unit: 'flights/yr', factor: 0.9, color: '#818cf8' },
  { id: 'shopping', icon: '🛍️', label: 'Shopping', key: 'shopping', max: 1000, unit: '$/month', factor: 0.005, color: '#e9c349' },
  { id: 'waste', icon: '🗑️', label: 'Waste', key: 'waste', max: 20, unit: 'kg/week', factor: 0.5, color: '#f87171' },
];

const dietOptions = [
  { label: 'Vegan', factor: 1.5, color: '#4ade80' },
  { label: 'Vegetarian', factor: 2.0, color: '#34d399' },
  { label: 'Flexitarian', factor: 2.5, color: '#10b981' },
  { label: 'Omnivore', factor: 3.2, color: '#f59e0b' },
  { label: 'Meat-Heavy', factor: 4.5, color: '#ef4444' },
];

function InteractiveRing({ value, max = 20, size = 300, color }) {
  const pct = Math.min(value / max, 1);
  const r = (size - 40) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
      
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
        <motion.circle 
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="16"
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="filter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-7xl font-black text-white text-glow">
          {value.toFixed(1)}
        </motion.span>
        <span className="text-xs text-white/40 uppercase tracking-[0.3em] font-black mt-2">Tons CO₂ / YR</span>
      </div>
    </div>
  );
}

function CalculatorInput({ cat, value, onChange }) {
  return (
    <div className="relative group p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl overflow-hidden transition-all hover:border-emerald-500/30">
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity" style={GLASS_TEXTURE_STYLE} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl border border-white/10 group-hover:border-emerald-500/50 transition-colors">
              {cat.icon}
            </div>
            <span className="font-black text-white tracking-tight">{cat.label}</span>
          </div>
          <span className="font-black text-lg" style={{ color: cat.color }}>{value} <span className="text-[10px] text-white/30 uppercase">{cat.unit}</span></span>
        </div>
        <input 
          type="range" min="0" max={cat.max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ '--thumb-color': cat.color }}
        />
      </div>
    </div>
  );
}

export default function CalculatorSection({ onEnterApp }) {
  const [values, setValues] = useState({ transport: 250, electricity: 300, flights: 5, shopping: 400, waste: 8 });
  const [diet, setDiet] = useState('Omnivore');

  const transportTotal = (values.transport * 0.21 * 52) / 1000;
  const electricityTotal = (values.electricity * 0.23 * 12) / 1000;
  const flightsTotal = (values.flights * 0.9 * 0.9);
  const foodTotal = dietOptions.find(d => d.label === diet)?.factor || 3.2;
  const shoppingTotal = (values.shopping * 0.005 * 12) / 1000;
  const wasteTotal = (values.waste * 0.5 * 52) / 1000;
  const total = transportTotal + electricityTotal + flightsTotal + foodTotal + shoppingTotal + wasteTotal;

  const scoreColor = total < 4.5 ? '#10b981' : total < 7.5 ? '#f59e0b' : '#ef4444';
  const scoreLabel = total < 4.5 ? 'Climate Hero' : total < 7.5 ? 'Sustainable' : 'High Impact';

  return (
    <section id="calculator" className="py-32 px-6 relative overflow-hidden bg-[#030f07]">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale"
        style={{ backgroundImage: `url(${ASSETS.rain})`, backgroundSize: 'cover' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
          <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
            🌳 Personal Impact Analysis
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter">
            Measure Your <span className="text-gradient-gold">Environmental Aura.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto tracking-wide">
            Quick demo — estimates in <strong className="text-white/60">tons CO₂ per year</strong>. The full app tracks in kg/month with more detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Inputs */}
          <div className="lg:col-span-7 space-y-4">
            {categories.map(cat => (
              <CalculatorInput 
                key={cat.id} cat={cat} value={values[cat.key]} 
                onChange={v => setValues(prev => ({ ...prev, [cat.key]: v }))} 
              />
            ))}
            
            {/* Diet Selection */}
            <div className="relative group p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl overflow-hidden transition-all hover:border-emerald-500/30">
              <h3 className="font-black text-white tracking-tight mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg border border-emerald-500/20">🥗</span>
                Dietary Footprint
              </h3>
              <div className="flex flex-wrap gap-3">
                {dietOptions.map(d => (
                  <button 
                    key={d.label} onClick={() => setDiet(d.label)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                      diet === d.label 
                      ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/30' 
                      : 'border-white/10 hover:border-emerald-500/40 text-white/50 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results Sticky */}
          <div className="lg:col-span-5 sticky top-24">
            <motion.div 
              className="p-10 rounded-[40px] border border-white/10 bg-[#05150a] backdrop-blur-3xl relative overflow-hidden"
              whileHover={{ boxShadow: '0 0 100px rgba(16,185,129,0.1)' }}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={GLASS_TEXTURE_STYLE} />

              <div className="relative z-10 flex flex-col items-center">
                <InteractiveRing value={total} color={scoreColor} />
                
                <div className={`mt-10 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] border ${
                  total < 4.5 ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                  total < 7.5 ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                  'border-red-500/50 text-red-500 bg-red-500/10'
                }`}>
                  Status: {scoreLabel}
                </div>

                <div className="w-full h-px bg-white/5 my-10"></div>

                <div className="w-full space-y-6">
                  <div className="flex justify-between items-center text-sm font-black text-white/40 uppercase tracking-widest">
                    <span>Performance</span>
                    <span className="text-white">Live Data</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">vs Global Avg</div>
                      <div className={`text-xl font-black ${total < 4.7 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {total < 4.7 ? '↓' : '↑'} {Math.abs(((total - 4.7) / 4.7) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">Daily Offset</div>
                      <div className="text-xl font-black text-sky-400">
                        {((total * 1000) / 365).toFixed(1)}kg
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => onEnterApp?.('reports') ?? enterApp('reports')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-shadow hover:shadow-2xl hover:shadow-white/20 mt-4"
                  >
                    Unlock Full Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
