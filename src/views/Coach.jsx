import React, { useState } from 'react';
import { getCoachGreeting, getTopCategory, CATEGORY_LABELS } from '../utils/calculations';

function Coach({ state, updateState }) {
  const [input, setInput] = useState('');
  const fp = state.footprint;

  const getCoachResponse = (q) => {
    const qt = q.toLowerCase();
    const top = getTopCategory(fp);

    if (qt.includes('transport') || qt.includes('car') || qt.includes('drive')) {
      return `Transport accounts for ${fp.transport} kg of your footprint. Try cycling short trips, carpooling, or switching to an electric vehicle to cut emissions significantly.`;
    }
    if (qt.includes('food') || qt.includes('meat') || qt.includes('diet')) {
      return `Food contributes ${fp.food} kg/month. Reducing meat portions and choosing local produce can lower this by 20–40%. Try "Meatless Mondays" as a start.`;
    }
    if (qt.includes('energy') || qt.includes('electric') || qt.includes('heat')) {
      return `Energy use adds ${fp.energy} kg/month. LED bulbs, better insulation, and a green energy provider are high-impact changes.`;
    }
    if (qt.includes('waste') || qt.includes('trash') || qt.includes('recycle')) {
      return `Waste generates ${fp.waste} kg/month. Compost food scraps, reduce packaging, and recycle properly to shrink this category.`;
    }
    if (qt.includes('top') || qt.includes('biggest') || qt.includes('highest')) {
      return `Your biggest emission source is ${CATEGORY_LABELS[top]} at ${fp[top]} kg/month. Focus your efforts there for the biggest reduction.`;
    }
    if (qt.includes('score') || qt.includes('total') || qt.includes('footprint')) {
      return fp.total
        ? `Your total footprint is ${fp.total} kg CO₂/month — Transport ${fp.transport}, Energy ${fp.energy}, Food ${fp.food}, Waste ${fp.waste} kg.`
        : 'Log your activities in the Tracker first, then I can analyze your footprint.';
    }
    return "Ask me about transport, food, energy, waste, or your overall footprint. I'll give tips based on your data.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    const botMsg = { role: 'bot', text: getCoachResponse(input) };

    updateState({ chat: [...state.chat, userMsg, botMsg] });
    setInput('');
  };

  const greeting = getCoachGreeting(fp);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="app-section-title">Eco Coach</h2>
        <p className="app-section-sub">Rule-based sustainability assistant powered by your footprint data</p>
      </div>

      <div className="app-glass-card-dark flex flex-col h-[calc(100vh-280px)] min-h-[400px] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <i className="fa-solid fa-robot text-emerald-400" />
            </div>
            <div>
              <div className="font-bold">EcoAura Coach</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateState({ chat: [] })}
            className="text-xs text-white/40 hover:text-emerald-400 px-3 py-1 rounded-lg border border-white/10"
          >
            Clear chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-emerald-500/10 border border-emerald-500/20 text-sm text-white/80">
            {greeting}
          </div>
          {state.chat.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'ml-auto bg-emerald-500 text-black rounded-tr-sm'
                  : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your emissions..."
            className="app-input flex-1"
          />
          <button type="submit" className="app-btn-primary px-5">
            <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Coach;
