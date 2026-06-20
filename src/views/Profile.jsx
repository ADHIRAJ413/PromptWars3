import React, { useState } from 'react';
import { STORAGE_KEY, GOAL_2030 } from '../utils/calculations';

const AVATARS = ['🌱', '🌿', '🌍', '🌳', '♻️', '🦋'];

function Profile({ state, updateState }) {
  const [name, setName] = useState(state.profile?.name || '');
  const [goalKg, setGoalKg] = useState(state.profile?.goalKg ?? GOAL_2030);
  const avatar = state.profile?.avatar || '🌱';

  const saveProfile = () => {
    updateState({
      profile: {
        ...state.profile,
        name: name.trim(),
        goalKg: Math.max(50, Math.min(800, +goalKg || GOAL_2030)),
        avatar,
      },
    });
  };

  const resetData = () => {
    if (!window.confirm('Reset all footprint data? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="app-section-title">Profile</h2>
        <p className="app-section-sub">Manage your profile and sustainability goals</p>
      </div>

      <div className="app-glass-card-dark p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-3">Avatar</label>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => updateState({ profile: { ...state.profile, avatar: a } })}
                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                  avatar === a ? 'bg-emerald-500/20 border-2 border-emerald-500' : 'bg-white/5 border border-white/10 hover:border-emerald-500/30'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Display name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="app-input"
          />
        </div>

        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Monthly goal (kg CO₂)</label>
          <input
            type="number"
            value={goalKg}
            onChange={(e) => setGoalKg(e.target.value)}
            min="50"
            max="800"
            className="app-input"
          />
          <p className="text-xs text-white/30 mt-1">2030 target reference: {GOAL_2030} kg/month</p>
        </div>

        <button type="button" onClick={saveProfile} className="app-btn-primary w-full sm:w-auto">
          Save profile
        </button>
      </div>

      <div className="app-glass-card p-6 border-red-500/20">
        <h3 className="font-bold mb-2">Data management</h3>
        <p className="text-white/50 text-sm mb-4">
          All data is stored locally in your browser. Clearing data removes history, footprint, and progress.
        </p>
        <button
          type="button"
          onClick={resetData}
          className="px-4 py-2 rounded-full border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
        >
          Reset all data
        </button>
      </div>
    </div>
  );
}

export default Profile;
