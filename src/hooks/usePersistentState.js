import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../utils/calculations';

const initialState = {
  footprint: { transport: 0, energy: 0, food: 0, waste: 0, total: 0 },
  history: [],
  actionsDone: [],
  xp: 0,
  chat: [],
  profile: { name: '', goalKg: 167, avatar: '🌱' },
  onboardingComplete: false,
};

export function usePersistentState() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return [state, updateState];
}
