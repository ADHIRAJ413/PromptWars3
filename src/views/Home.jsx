import React from 'react';
import {
  getEcoScore,
  getRank,
  getTopCategory,
  sortActionsByPriority,
  ACTIONS,
  CATEGORY_LABELS,
} from '../utils/calculations';

function Home({ state, navigateToView }) {
  const score = getEcoScore(state.footprint.total);
  const rank = getRank(score);
  const topCat = getTopCategory(state.footprint);
  const topAction = sortActionsByPriority(ACTIONS, topCat)[0];
  const displayName = state.profile?.name?.trim() || 'there';
  const hasData = state.history.length > 0;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="app-glass-card-dark p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-emerald-400 text-sm font-semibold mb-2">Welcome back</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Hi, <span className="text-gradient-emerald">{displayName}</span>
          </h2>
          <p className="text-white/50 max-w-xl mb-6">
            {hasData
              ? `Your monthly footprint is ${state.footprint.total} kg CO₂. You're ranked as ${rank}.`
              : 'Start by logging your daily activities to see your carbon footprint.'}
          </p>
          <button
            type="button"
            onClick={() => navigateToView('tracker')}
            className="app-btn-primary"
          >
            {hasData ? 'Update Activities' : 'Start Tracking'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="app-glass-card p-5 text-center">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Eco Score</div>
          <div className="text-3xl font-black text-emerald-400">{hasData ? score : '—'}</div>
        </div>
        <div className="app-glass-card p-5 text-center">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Monthly CO₂</div>
          <div className="text-3xl font-black">{hasData ? state.footprint.total : '—'}<span className="text-sm text-white/40"> kg</span></div>
        </div>
        <div className="app-glass-card p-5 text-center">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Rank</div>
          <div className="text-lg font-bold text-emerald-300">{hasData ? rank : '—'}</div>
        </div>
        <div className="app-glass-card p-5 text-center">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">XP</div>
          <div className="text-3xl font-black">{state.xp}</div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Feature Portal</h3>
            <p className="text-white/40 text-sm">Explore all your sustainability tools</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'tracker', icon: 'fa-leaf', title: 'Tracker', desc: 'Log your daily activities', color: 'from-emerald-500/20' },
            { id: 'dashboard', icon: 'fa-gauge-high', title: 'Dashboard', desc: 'Real-time impact analytics', color: 'from-blue-500/20' },
            { id: 'insights', icon: 'fa-chart-pie', title: 'Insights', desc: 'Deep dive into your data', color: 'from-purple-500/20' },
            { id: 'coach', icon: 'fa-robot', title: 'AI Coach', desc: 'Personalized eco-advice', color: 'from-amber-500/20' },
            { id: 'actions', icon: 'fa-bolt', title: 'Actions', desc: 'Commit to sustainable habbits', color: 'from-cyan-500/20' },
            { id: 'history', icon: 'fa-clock-rotate-left', title: 'History', desc: 'Review your past logs', color: 'from-rose-500/20' },
            { id: 'reports', icon: 'fa-file-lines', title: 'Reports', desc: 'Export monthly summaries', color: 'from-indigo-500/20' },
            { id: 'profile', icon: 'fa-user', title: 'Profile', desc: 'Customize your experience', color: 'from-gray-500/20' },
          ].map((feature) => (
            <button
              key={feature.id}
              onClick={() => navigateToView(feature.id)}
              className="group relative app-glass-card p-6 text-left hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                  <i className={`fa-solid ${feature.icon}`} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{feature.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Feature <i className="fa-solid fa-arrow-right text-[10px]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="app-glass-card p-6">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          {state.history.length === 0 ? (
            <p className="text-white/40 text-sm">No calculations yet. Use the Tracker to log your first footprint.</p>
          ) : (
            <ul className="space-y-3">
              {state.history.slice(0, 3).map((h, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/50 text-sm">{h.date}</span>
                  <span className="font-bold text-emerald-400">{h.total} kg</span>
                </li>
              ))}
            </ul>
          )}
          {state.history.length > 0 && (
            <button
              type="button"
              onClick={() => navigateToView('history')}
              className="mt-4 text-sm text-emerald-400 hover:text-emerald-300"
            >
              View full history →
            </button>
          )}
        </div>

        <div className="app-glass-card p-6 border-emerald-500/30">
          <div className="flex items-start gap-4">
            <span className="text-3xl">{topAction?.icon}</span>
            <div>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                Top recommendation · {CATEGORY_LABELS[topCat]}
              </p>
              <h3 className="font-bold text-lg mb-2">{topAction?.title}</h3>
              <p className="text-white/50 text-sm mb-4">{topAction?.desc}</p>
              <p className="text-emerald-400 font-semibold text-sm">Save ~{topAction?.save}/month</p>
              <button
                type="button"
                onClick={() => navigateToView('actions')}
                className="mt-4 app-btn-secondary text-sm py-2 px-4"
              >
                View all actions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="app-glass-card p-8 border-emerald-500/10 opacity-60">
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Problem Statement Alignment</h4>
        <p className="text-sm text-white/50 leading-relaxed italic">
          "Eco is designed to empower individuals with the data intelligence needed to mitigate climate change. 
          By monitoring daily activities across Transport, Energy, Food, and Waste, we provide the clarity required 
          to reduce your global carbon footprint one step at a time."
        </p>
      </div>
    </div>
  );
}

export default Home;
