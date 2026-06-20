import { motion } from 'framer-motion';

const links = {
  Product: ['Calculator', 'Dashboard', 'AI Coach', 'Mobile App'],
  Resources: ['Getting Started', 'Blog', 'API Docs', 'Carbon Data'],
  Community: ['Forum', 'Challenges', 'Leaderboard', 'Events'],
  Company: ['About', 'Mission', 'Careers', 'Press Kit'],
};

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ borderColor: 'rgba(16,185,129,0.1)', background: '#020a05' }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black font-black text-lg">
                🌿
              </div>
              <span className="text-2xl font-black text-white">Eco<span className="text-emerald-400">Aura</span></span>
            </div>
            <p className="text-white/40 font-light text-sm leading-relaxed mb-6">
              Tracking today. Protecting tomorrow. Our mission is to empower every individual to understand and reduce their environmental impact.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input type="email" placeholder="Your email..."
                className="flex-1 bg-white/5 border border-emerald-500/20 text-white text-sm px-4 py-2.5 rounded-full outline-none focus:border-emerald-500/50" />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="md:col-span-1">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-emerald-400 text-sm font-light transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-white/30 text-sm">
            © 2024 EcoAura. Made with 💚 for our planet.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: '𝕏', label: 'Twitter' },
              { icon: '📷', label: 'Instagram' },
              { icon: '💼', label: 'LinkedIn' },
              { icon: '⚙️', label: 'GitHub' },
            ].map(s => (
              <a key={s.label} href="#" title={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm border border-white/10 text-white/40 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-200">
                {s.icon}
              </a>
            ))}
          </div>
          {/* Climate badge */}
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="text-emerald-500">🌿</span>
            <span>Carbon-neutral operations since 2023</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
