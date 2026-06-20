import React from 'react';

const CATEGORY_ICONS = { transport: '🚗', energy: '⚡', food: '🥗', waste: '🗑️' };

function History({ state, navigateToView }) {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="app-section-title">Calculation History</h2>
        <p className="app-section-sub">Your last 10 footprint calculations</p>
      </div>

      {state.history.length === 0 ? (
        <div className="app-glass-card-dark p-12 text-center">
          <div className="text-5xl mb-4 opacity-30">📋</div>
          <p className="text-white/50 mb-6">No calculations recorded yet.</p>
          <button type="button" onClick={() => navigateToView('tracker')} className="app-btn-primary">
            Log your first footprint
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {state.history.map((h, i) => (
            <div key={i} className="app-glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-white/40 mb-1">{h.date}</div>
                <div className="text-2xl font-black text-emerald-400">
                  {h.total} <span className="text-sm text-white/40 font-normal">kg CO₂</span>
                </div>
              </div>
              <div className="flex gap-6">
                {['transport', 'energy', 'food', 'waste'].map((cat) => (
                  <div key={cat} className="text-center">
                    <div className="text-lg mb-1">{CATEGORY_ICONS[cat]}</div>
                    <div className="text-xs text-white/50">{h[cat]} kg</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
