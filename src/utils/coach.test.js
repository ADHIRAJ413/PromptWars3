import { describe, it, expect } from 'vitest';
import { getCoachGreeting, CATEGORIES } from './calculations';

describe('Coach Logic (calculations.js)', () => {
  it('returns onboarding greeting when no data exists', () => {
    const footprint = { total: 0, breakdown: {} };
    const greeting = getCoachGreeting(footprint);
    expect(greeting).toContain("Hi! I'm your Eco coach");
  });

  it('provides category-specific advice when data exists', () => {
    const footprint = {
      total: 100,
      breakdown: {
        [CATEGORIES.TRANSPORT]: 80,
        [CATEGORIES.ENERGY]: 20,
        [CATEGORIES.FOOD]: 0,
        [CATEGORIES.WASTE]: 0
      }
    };
    const greeting = getCoachGreeting(footprint);
    expect(greeting).toContain("Your biggest category is Transport");
    expect(greeting).toContain("80 kg");
  });

  it('handles missing breakdown gracefully', () => {
    const footprint = { total: 50 }; // Missing breakdown
    const greeting = getCoachGreeting(footprint);
    expect(greeting).toContain("Your biggest category is Transport");
  });
});
