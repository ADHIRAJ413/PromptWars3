import React, { useState } from 'react';
import { calculateFootprint } from '../utils/calculations';

const TABS = [
  { id: 'transport', icon: '🚗', label: 'Transport' },
  { id: 'energy', icon: '⚡', label: 'Energy' },
  { id: 'food', icon: '🥗', label: 'Food' },
  { id: 'waste', icon: '🗑️', label: 'Waste' },
];

const DEFAULT_INPUTS = {
  carType: 'petrol_lg',
  kmDriven: 500,
  flightsShort: 2,
  flightsLong: 1,
  homeSize: 'medium',
  electricityKwh: 300,
  energySource: 'mix',
  householdSize: 2,
  dietType: 'flexitarian',
  foodSource: 'supermarket',
  foodWaste: 'low',
  wasteGenerated: 10,
};

function Tracker({ state, updateState, navigateToView, showOnboarding }) {
  const [activeTab, setActiveTab] = useState('transport');
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [wizardStep, setWizardStep] = useState(0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    const res = calculateFootprint(inputs);
    const newHistory = [{ date: new Date().toLocaleDateString(), ...res }, ...state.history].slice(0, 10);
    updateState({
      footprint: res,
      history: newHistory,
      xp: state.xp + 50,
      onboardingComplete: true,
    });
    navigateToView('dashboard');
  };

  const liveRes = calculateFootprint(inputs);
  const isWizard = showOnboarding;

  const goNextWizard = () => {
    if (wizardStep < TABS.length - 1) {
      setWizardStep(wizardStep + 1);
      setActiveTab(TABS[wizardStep + 1].id);
    } else {
      handleCalculate();
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8" role="banner">
        <h2 className="app-section-title">Activity Tracker</h2>
        <p className="app-section-sub">
          Log transport, energy, food, and waste — results in kg CO₂ per month.
        </p>
        {isWizard && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
            <span>Setup wizard</span>
            <span className="text-white/40">Step {wizardStep + 1} of {TABS.length}</span>
          </div>
        )}
      </div>

      <div className="app-glass-card-dark overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (isWizard) setWizardStep(i);
              }}
              className={`py-4 px-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 border-b-2 border-emerald-500'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10 space-y-6">
          {activeTab === 'transport' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="carType" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Vehicle type</label>
                <select id="carType" value={inputs.carType} onChange={handleInputChange} className="app-select" aria-label="Select your primary vehicle type">
                  <option value="none">Public transport / no car</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="petrol_sm">Small petrol car</option>
                  <option value="petrol_lg">SUV / large petrol</option>
                </select>
              </div>
              <div>
                <label htmlFor="kmDriven" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Distance driven (km/month)</label>
                <input type="number" id="kmDriven" value={inputs.kmDriven} onChange={handleInputChange} className="app-input" min="0" aria-label="Monthly distance driven in kilometers" />
              </div>
              <div>
                <label htmlFor="flightsShort" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Short flights (per year)</label>
                <input type="number" id="flightsShort" value={inputs.flightsShort} onChange={handleInputChange} className="app-input" min="0" aria-label="Number of short flights per year" />
              </div>
              <div>
                <label htmlFor="flightsLong" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Long flights (per year)</label>
                <input type="number" id="flightsLong" value={inputs.flightsLong} onChange={handleInputChange} className="app-input" min="0" aria-label="Number of long-haul flights per year" />
              </div>
            </div>
          )}

          {activeTab === 'energy' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="householdSize" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Household size</label>
                <input type="number" id="householdSize" value={inputs.householdSize} onChange={handleInputChange} className="app-input" min="1" aria-label="Number of people in your household" />
              </div>
              <div>
                <label htmlFor="homeSize" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Home size</label>
                <select id="homeSize" value={inputs.homeSize} onChange={handleInputChange} className="app-select" aria-label="Select your home size">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label htmlFor="electricityKwh" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Electricity (kWh/month)</label>
                <input type="number" id="electricityKwh" value={inputs.electricityKwh} onChange={handleInputChange} className="app-input" min="0" aria-label="Monthly electricity consumption in kilowatt-hours" />
              </div>
              <div>
                <label htmlFor="energySource" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Energy source</label>
                <select id="energySource" value={inputs.energySource} onChange={handleInputChange} className="app-select" aria-label="Select your primary energy source">
                  <option value="coal">Coal-heavy grid</option>
                  <option value="mix">Mixed grid</option>
                  <option value="renewable">Renewable / green</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'food' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dietType" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Diet type</label>
                <select id="dietType" value={inputs.dietType} onChange={handleInputChange} className="app-select" aria-label="Select your primary diet type">
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="flexitarian">Flexitarian</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="heavy_meat">Heavy meat eater</option>
                </select>
              </div>
              <div>
                <label htmlFor="foodSource" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Food source</label>
                <select id="foodSource" value={inputs.foodSource} onChange={handleInputChange} className="app-select" aria-label="Select where most of your food comes from">
                  <option value="local">Mostly local</option>
                  <option value="supermarket">Supermarket</option>
                  <option value="imported">Mostly imported</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="foodWaste" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Food waste level</label>
                <select id="foodWaste" value={inputs.foodWaste} onChange={handleInputChange} className="app-select" aria-label="How much food does your household waste?">
                  <option value="low">Low waste</option>
                  <option value="medium">Medium waste</option>
                  <option value="high">High waste</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'waste' && (
            <div>
              <label htmlFor="wasteGenerated" className="block text-xs text-white/50 uppercase tracking-wider mb-2">Waste generated (kg/month)</label>
              <input type="number" id="wasteGenerated" value={inputs.wasteGenerated} onChange={handleInputChange} className="app-input" min="0" aria-label="Total household waste generated per month in kilograms" />
              <p className="text-xs text-white/30 mt-2">Includes general household waste sent to landfill.</p>
            </div>
          )}

          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6">
            <div className="text-center">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Live estimate</div>
              <div className="text-5xl font-black text-emerald-400" aria-live="polite" aria-atomic="true">
                {liveRes.total} <span className="text-lg text-white/40">kg CO₂/mo</span>
              </div>
            </div>

            {isWizard ? (
              <button type="button" onClick={goNextWizard} className="app-btn-primary">
                {wizardStep < TABS.length - 1 ? `Next: ${TABS[wizardStep + 1].label}` : 'Finish & view dashboard'}
              </button>
            ) : (
              <button type="button" onClick={handleCalculate} className="app-btn-primary">
                Save & view dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
