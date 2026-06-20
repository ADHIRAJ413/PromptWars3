import React from 'react';
import { ACTIONS, getTopCategory, sortActionsByPriority, CATEGORY_LABELS } from '../utils/calculations';

function Actions({ state, updateState }) {
  const topCat = getTopCategory(state.footprint);
  const sortedActions = sortActionsByPriority(ACTIONS, topCat);

  const toggleAction = (id) => {
    const isDone = state.actionsDone.includes(id);
    let newActionsDone = [...state.actionsDone];
    let newXp = state.xp;

    if (!isDone) {
      newActionsDone.push(id);
      newXp += 20;
    } else {
      newActionsDone = newActionsDone.filter((aid) => aid !== id);
    }

    updateState({ actionsDone: newActionsDone, xp: newXp });
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="app-section-title">Eco Actions</h2>
        <p className="app-section-sub">
          Personalized for your highest category: <span className="text-emerald-400">{CATEGORY_LABELS[topCat]}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedActions.map((a, i) => {
          const isDone = state.actionsDone.includes(a.id);
          const isPriority = a.cat === topCat;

          return (
            <div
              key={a.id}
              className={`app-glass-card p-6 flex flex-col gap-4 transition-all ${
                isPriority ? 'border-emerald-500/40 ring-1 ring-emerald-500/20' : ''
              } ${isDone ? 'opacity-80' : ''}`}
            >
              {isPriority && i === 0 && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Recommended for you
                </span>
              )}
              <div className="flex justify-between items-start">
                <span className="text-3xl">{a.icon}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  a.impact === 'high' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/50'
                }`}>
                  {a.impact} impact
                </span>
              </div>
              <h3 className="font-bold text-lg">{a.title}</h3>
              <p className="text-white/50 text-sm flex-1">{a.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-emerald-400 font-semibold">−{a.save}/mo</span>
                <button
                  type="button"
                  onClick={() => toggleAction(a.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-black'
                      : 'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  {isDone ? 'Committed' : 'Commit'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Actions;
