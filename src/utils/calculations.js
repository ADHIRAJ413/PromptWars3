/**
 * Configuration for the emission engine.
 */
export const STORAGE_KEY = "ecobalance_pro_data";
export const GLOBAL_AVG = 392;
export const GOAL_2030 = 167;

/**
 * Standard emission factors for various categories.
 */
export const EMISSION_FACTORS = {
  car: { none: 0, electric: 0.053, hybrid: 0.105, petrol_sm: 0.142, petrol_lg: 0.210 },
  energy: { coal: 0.82, mix: 0.45, renewable: 0.05 },
  house: { small: 80, medium: 150, large: 260 },
  diet: { vegan: 80, vegetarian: 110, flexitarian: 160, omnivore: 220, heavy_meat: 310 },
  food: { local: 0.9, supermarket: 1.0, imported: 1.2 },
  waste: { low: 0.95, medium: 1.1, high: 1.3 }
};

/**
 * List of recommended sustainability actions.
 */
export const ACTIONS = [
  { id: "a1", cat: "transport", icon: "🚲", title: "Cycle short trips", desc: "Cycle for trips under 5km.", impact: "high", save: "40kg" },
  { id: "a2", cat: "food", icon: "🥗", title: "Go Vegan 2 days/wk", desc: "Reduces meat consumption footprint.", impact: "med", save: "20kg" },
  { id: "a3", cat: "energy", icon: "💡", title: "Switch to LEDs", desc: "Use 90% less energy than standard bulbs.", impact: "low", save: "5kg" },
  { id: "a4", cat: "transport", icon: "🚗", title: "Carpool to work", desc: "Share rides to cut commute emissions.", impact: "high", save: "35kg" },
  { id: "a5", cat: "energy", icon: "🚿", title: "Short Cold Showers", desc: "Save on water heating energy.", impact: "low", save: "8kg" }
];

/**
 * Calculates the monthly carbon footprint based on user activity.
 * @param {Object} inputs User activity data
 * @returns {Object} Categorized and total emissions in kg CO2/month
 */
export function calculateFootprint(inputs) {
  const car = EMISSION_FACTORS.car[inputs.carType] * +inputs.kmDriven;
  const flights = (+inputs.flightsShort * 250 + +inputs.flightsLong * 700) / 12;
  const transport = +(car + flights).toFixed(1);

  const energyH = EMISSION_FACTORS.house[inputs.homeSize || 'medium'];
  const energyE = +inputs.electricityKwh * EMISSION_FACTORS.energy[inputs.energySource];
  const energy = +((energyH + energyE) / (+inputs.householdSize || 1)).toFixed(1);

  const diet = EMISSION_FACTORS.diet[inputs.dietType];
  const food = +(diet * EMISSION_FACTORS.food[inputs.foodSource] * EMISSION_FACTORS.waste[inputs.foodWaste]).toFixed(1);

  const waste = +(+inputs.wasteGenerated * 0.52 * 4.3).toFixed(1); // Avg 0.52kg CO2 per kg waste, monthly

  const total = +(transport + energy + food + waste).toFixed(1);
  return { transport, energy, food, waste, total };
}

/**
 * Determines the rank based on the eco-score.
 * @param {number} score 0-100 score
 * @returns {string} Rank label
 */
export function getRank(score) {
  if (score > 85) return "Earth Guardian";
  if (score > 60) return "Eco Warrior";
  return "Seedling";
}

/**
 * Calculates a 0-100 score based on carbon footprint.
 * @param {number} total Total emissions in kg CO2/month
 * @returns {number} Score
 */
export function getEcoScore(total) {
  if (!total) return 0;
  return Math.max(5, Math.min(99, Math.round(100 - (total / 800) * 100)));
}

export const CATEGORIES = ['transport', 'energy', 'food', 'waste'];

export const CATEGORY_LABELS = {
  transport: 'Transport',
  energy: 'Energy',
  food: 'Food',
  waste: 'Waste',
};

/**
 * Identifies the category with the highest emission impact.
 * @param {Object} footprint Categorized footprint data
 * @returns {string} Highest impact category ID
 */
export function getTopCategory(footprint) {
  if (!footprint?.total) return 'transport';
  return CATEGORIES.reduce(
    (max, cat) => (footprint[cat] > footprint[max] ? cat : max),
    'transport'
  );
}

/**
 * Calculates the change in emissions between the last two history entries.
 * @param {Array} history History logs
 * @returns {number|null} Delta or null if insufficient data
 */
export function getReductionDelta(history) {
  if (!history || history.length < 2) return null;
  return +(history[0].total - history[1].total).toFixed(1);
}

/**
 * Prioritizes actions based on the top emission category and impact level.
 * @param {Array} actions List of actions
 * @param {string} topCategory Primary category for improvement
 * @returns {Array} Sorted actions
 */
export function sortActionsByPriority(actions, topCategory) {
  return [...actions].sort((a, b) => {
    const aMatch = a.cat === topCategory ? 0 : 1;
    const bMatch = b.cat === topCategory ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    const impactOrder = { high: 0, med: 1, low: 2 };
    return (impactOrder[a.impact] ?? 2) - (impactOrder[b.impact] ?? 2);
  });
}

/**
 * Generates a personalized greeting for the AI Coach.
 * @param {Object} footprint User footprint data
 * @returns {string} Greeting message
 */
export function getCoachGreeting(footprint) {
  if (!footprint?.total) {
    return "Hi! I'm your EcoAura coach. Log your activities in the Tracker and I'll give personalized tips based on your footprint.";
  }
  const top = getTopCategory(footprint);
  const label = CATEGORY_LABELS[top];
  return `Your footprint is ${footprint.total} kg CO₂/month. Your biggest category is ${label} (${footprint[top]} kg). Ask me how to reduce it — try "How can I cut ${label.toLowerCase()} emissions?"`;
}
