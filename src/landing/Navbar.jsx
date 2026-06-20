import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { enterApp } from '../utils/navigation';

/**
 * Navigation Bar Component.
 * Features glassmorphic styling and entrance logic for the Tracker.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onEnterApp - Callback to transition into the App mode.
 * @returns {JSX.Element} The responsive navigation bar.
 */
export default function Navbar({ onEnterApp }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goApp = () => onEnterApp?.('tracker') ?? enterApp('tracker');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#030f07]/90 backdrop-blur-xl border-b border-emerald-500/10 shadow-lg shadow-emerald-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <span className="text-2xl font-black tracking-tight text-white">Eco</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Calculator', 'Dashboard', 'Community'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-emerald-400 transition-colors duration-200 tracking-wide"
            >
              {link}
            </a>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={goApp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
        >
          Get Started Free
        </motion.button>
      </div>
    </nav>
  );
}
