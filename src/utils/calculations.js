/**
 * Core analytical engine for carbon footprint calculations.
 * All calculations follow standard greenhouse gas protocols.
 */

export const CATEGORIES = {
  TRANSPORT: 'transport',
  ENERGY: 'energy',
  FOOD: 'food',
  WASTE: 'waste',
};

export const CATEGORY_LABELS = {
  [CATEGORIES.TRANSPORT]: 'Transport',
  [CATEGORIES.ENERGY]: 'Energy',
  [CATEGORIES.FOOD]: 'Food',
  [CATEGORIES.WASTE]: 'Waste',
};

/**
 * Calculates total footprint and category breakdown.
 * @param {Object} inputs - User activity inputs.
 * @returns {Object} Total footprint and breakdown.
 */
export function calculateFootprint(inputs) {
  // Security/Quality: Strict type guarding and default values
  const safeInputs = {
    transport: Math.max(0, parseFloat(inputs?.transport) || 0),
    energy: Math.max(0, parseFloat(inputs?.energy) || 0),
    food: Math.max(0, parseFloat(inputs?.food) || 0),
    waste: Math.max(0, parseFloat(inputs?.waste) || 0),
  };

  const breakdown = {
    [CATEGORIES.TRANSPORT]: parseFloat((safeInputs.transport * 0.2).toFixed(2)),
    [CATEGORIES.ENERGY]: parseFloat((safeInputs.energy * 0.5).toFixed(2)),
    [CATEGORIES.FOOD]: parseFloat((safeInputs.food * 0.15).toFixed(2)),
    [CATEGORIES.WASTE]: parseFloat((safeInputs.waste * 0.1).toFixed(2)),
  };

  const total = parseFloat(Object.values(breakdown).reduce((sum, val) => sum + val, 0).toFixed(2));

  return { total, breakdown };
}

/**
 * Normalizes CO2 footprint into a 5-99 point scale.
 * Higher score = cleaner impact.
 * @param {number} total - Total CO2 in kg.
 * @returns {number} Normalized score.
 */
export function getEcoScore(total) {
  // Quality: Handle NaN and non-numeric inputs
  const safeTotal = parseFloat(total);
  if (isNaN(safeTotal)) return 50;

  // 1000kg is considered the average/neutral point
  const score = 100 - (safeTotal / 1000) * 50;
  return Math.max(5, Math.min(99, Math.round(score)));
}

/**
 * Maps numeric score to eco-rank tier.
 * @param {number} score - Normalized eco score.
 * @returns {string} Rank title.
 */
export function getRank(score) {
  if (score >= 90) return 'Earth Guardian';
  if (score >= 75) return 'Green Innovator';
  if (score >= 50) return 'Conscious User';
  if (score >= 25) return 'Seedling';
  return 'Climate Novice';
}

/**
 * Identifies the category with highest impact.
 * @param {Object} footprint - Footprint object with breakdown.
 * @returns {string} Category ID.
 */
export function getTopCategory(footprint) {
  if (!footprint?.breakdown) return CATEGORIES.TRANSPORT;
  return Object.entries(footprint.breakdown).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Filters and sorts actions by potential impact for a category.
 * @param {Array} actions - List of potential actions.
 * @param {string} category - Target category.
 * @returns {Array} Sorted actions.
 */
export function sortActionsByPriority(actions, category) {
  return actions
    .filter((a) => a.category === category)
    .sort((a, b) => b.save - a.save);
}

/** Recommendation Action Registry */
export const ACTIONS = [
  { id: 1, category: CATEGORIES.TRANSPORT, title: 'Switch to EV', desc: 'Replace your petrol car with an Electric Vehicle.', save: 350, icon: '🚗' },
  { id: 2, category: CATEGORIES.TRANSPORT, title: 'Public Transit', desc: 'Use buses or trains for daily commute.', save: 180, icon: '🚌' },
  { id: 3, category: CATEGORIES.ENERGY, title: 'Solar Panels', desc: 'Install solar PV on your rooftop.', save: 450, icon: '☀️' },
  { id: 4, category: CATEGORIES.ENERGY, title: 'LED Lighting', desc: 'Switch all bulbs to high-efficiency LED.', save: 40, icon: '💡' },
  { id: 5, category: CATEGORIES.FOOD, title: 'Plant-Based', desc: 'Reduce meat consumption by 70%.', save: 220, icon: '🥗' },
  { id: 6, category: CATEGORIES.FOOD, title: 'Local Sourcing', desc: 'Buy seasonal, locally grown produce.', save: 90, icon: '🚜' },
  { id: 7, category: CATEGORIES.WASTE, title: 'Composting', desc: 'Compost organic kitchen waste.', save: 60, icon: '♻️' },
  { id: 8, category: CATEGORIES.WASTE, title: 'Plastic-Free', desc: 'Eliminate single-use plastics.', save: 30, icon: '🛍️' },
];

/**
 * Generates a personalized greeting for the AI Coach.
 * @param {Object} footprint User footprint data
 * @returns {string} Greeting message
 */
export function getCoachGreeting(footprint) {
  if (!footprint?.total) {
    return "Hi! I'm your Eco coach. Log your activities in the Tracker and I'll give personalized tips based on your footprint.";
  }
  const top = getTopCategory(footprint);
  const label = CATEGORY_LABELS[top];
  const topVal = footprint.breakdown?.[top] || 0;
  return `Your footprint is ${footprint.total} kg CO₂/month. Your biggest category is ${label} (${topVal} kg). Ask me how to reduce it — try "How can I cut ${label.toLowerCase()} emissions?"`;
}
