import React from 'react';
import { getRank, getEcoScore } from '../utils/calculations';
import { leaveApp } from '../utils/navigation';

const NAV_ITEMS = [
  { id: 'home', icon: 'fa-house', label: 'Home' },
  { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
  { id: 'tracker', icon: 'fa-leaf', label: 'Tracker' },
  { id: 'insights', icon: 'fa-chart-pie', label: 'Insights' },
  { id: 'actions', icon: 'fa-bolt', label: 'Actions' },
  { id: 'coach', icon: 'fa-robot', label: 'Coach' },
  { id: 'history', icon: 'fa-clock-rotate-left', label: 'History' },
  { id: 'reports', icon: 'fa-file-lines', label: 'Reports' },
  { id: 'profile', icon: 'fa-user', label: 'Profile' },
];

function Sidebar({ currentView, navigateToView, xp, profile, score }) {
  const rank = getRank(getEcoScore(score));
  const level = Math.floor(xp / 100) + 1;
  const displayName = profile?.name?.trim() || 'Eco Guardian';

  return (
    <>
      <aside className="no-print fixed top-0 left-0 z-40 h-full w-64 border-r border-emerald-500/10 bg-[#030f07]/95 backdrop-blur-xl hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-emerald-500/30">
              🌿
            </div>
            <div>
              <div className="font-black text-lg tracking-tight">
                Eco<span className="text-emerald-400">Aura</span>
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Carbon Tracker</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <button
            type="button"
            onClick={() => navigateToView('profile')}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-xl">
              {profile?.avatar || '🌱'}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-semibold text-sm truncate">{displayName}</div>
              <div className="text-xs text-white/40">Lvl {level} · {rank}</div>
            </div>
          </button>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${xp % 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={leaveApp}
            className="w-full text-xs text-white/40 hover:text-emerald-400 transition-colors py-2"
          >
            ← Back to landing
          </button>
        </div>
      </aside>

      <nav className="no-print fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-emerald-500/10 bg-[#030f07]/95 backdrop-blur-xl">
        <div className="flex overflow-x-auto scrollbar-hide px-2 py-2 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToView(item.id)}
              className={`flex flex-col items-center gap-1 min-w-[4rem] px-2 py-2 rounded-xl text-[10px] font-semibold transition-all ${
                currentView === item.id
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-white/50'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-base`} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
