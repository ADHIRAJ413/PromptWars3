import React from 'react';
import {
  getEcoScore,
  getRank,
  getReductionDelta,
  GLOBAL_AVG,
  GOAL_2030,
  CATEGORY_LABELS,
} from '../utils/calculations';

const CATEGORY_ICONS = { transport: '🚗', energy: '⚡', food: '🥗', waste: '🗑️' };

function Dashboard({ state }) {
  const goalKg = state.profile?.goalKg ?? GOAL_2030;
  const score = getEcoScore(state.footprint.total);
  const rank = getRank(score);
  const delta = getReductionDelta(state.history);
  const displayName = state.profile?.name?.trim() || 'Guardian';
  const hasData = state.footprint.total > 0;

  const deltaMessage = delta === null
    ? 'Log another calculation to see your progress trend.'
    : delta < 0
      ? `You've reduced ${Math.abs(delta)} kg CO₂ since your last entry. Great progress!`
      : delta > 0
        ? `Your footprint increased by ${delta} kg since your last entry. Check Actions for tips.`
        : 'Your footprint is unchanged since your last entry.';

  const goalPercent = hasData ? Math.min(100, Math.round((state.footprint.total / goalKg) * 100)) : 0;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="app-glass-card-dark p-6 md:p-8">
        <h2 className="app-section-title">
          Welcome, <span className="text-gradient-emerald">{displayName}</span>
        </h2>
        <p className="app-section-sub">{deltaMessage}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="app-glass-card p-6 text-center">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Eco Score</div>
          <div className="text-5xl font-black text-emerald-400 mb-2">{hasData ? score : '—'}</div>
          <div className="text-sm text-white/60">{hasData ? rank : 'No data yet'}</div>
        </div>

        <div className="app-glass-card p-6 md:col-span-2">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Total Monthly Footprint</div>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-5xl font-black">{hasData ? state.footprint.total : '—'}</span>
            <span className="text-white/40">kg CO₂</span>
            {hasData && (
              <span className={`text-sm font-semibold ${state.footprint.total < GLOBAL_AVG ? 'text-emerald-400' : 'text-red-400'}`}>
                {state.footprint.total < GLOBAL_AVG ? '↓ Below global avg' : '↑ Above global avg'}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/50">
              <span>Progress to your goal ({goalKg} kg)</span>
              <span>{goalPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            <p className="text-xs text-white/30">Global average: {GLOBAL_AVG} kg/month · 2030 target: {GOAL_2030} kg/month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} className="app-glass-card p-5 text-center">
            <div className="text-2xl mb-2">{CATEGORY_ICONS[key]}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-2xl font-bold">{hasData ? state.footprint[key] : '—'}<span className="text-sm text-white/40"> kg</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
