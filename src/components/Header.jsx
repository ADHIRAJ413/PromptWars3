import React from 'react';

const VIEW_LABELS = {
  home: 'Home',
  dashboard: 'Dashboard',
  tracker: 'Activity Tracker',
  insights: 'Insights',
  actions: 'Eco Actions',
  coach: 'Eco Coach',
  history: 'History',
  reports: 'Reports',
  profile: 'Profile',
};

function Header({ currentView, theme, setTheme }) {
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <header className="no-print sticky top-0 z-30 border-b border-emerald-500/10 bg-[#030f07]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-white">{VIEW_LABELS[currentView] || currentView}</h1>
        <p className="text-xs text-white/40">Track · Reduce · Sustain</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
          title="Toggle theme"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <i className={`fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
        </button>
      </div>
    </header>
  );
}

export default Header;
