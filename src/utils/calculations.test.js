import { describe, it, expect } from 'vitest';
import { 
  calculateFootprint, 
  getEcoScore, 
  getRank, 
  CATEGORIES 
} from './calculations';

describe('Emission Engine (calculations.js)', () => {
  describe('calculateFootprint', () => {
    it('calculates transport emissions correctly', () => {
      const inputs = { transport: 100, energy: 0, food: 0, waste: 0 };
      const { total, breakdown } = calculateFootprint(inputs);
      expect(total).toBe(20);
      expect(breakdown[CATEGORIES.TRANSPORT]).toBe(20);
    });

    it('handles zero inputs gracefully', () => {
      const inputs = { transport: 0, energy: 0, food: 0, waste: 0 };
      const { total } = calculateFootprint(inputs);
      expect(total).toBe(0);
    });

    it('sanitizes negative inputs to zero', () => {
      const inputs = { transport: -100, energy: -50, food: 0, waste: 0 };
      const { total } = calculateFootprint(inputs);
      expect(total).toBe(0);
    });

    it('handles non-numeric strings safely', () => {
      const inputs = { transport: 'invalid', energy: '100', food: 0, waste: 0 };
      const { total, breakdown } = calculateFootprint(inputs);
      expect(breakdown[CATEGORIES.TRANSPORT]).toBe(0);
      expect(breakdown[CATEGORIES.ENERGY]).toBe(50);
      expect(total).toBe(50);
    });
  });

  describe('getEcoScore', () => {
    it('returns higher score for lower emissions', () => {
      expect(getEcoScore(500)).toBe(75); // 100 - (500/1000)*50 = 75
      expect(getEcoScore(1000)).toBe(50); // 100 - (1000/1000)*50 = 50
    });

    it('caps score between 5 and 99', () => {
      expect(getEcoScore(0)).toBe(99); 
      expect(getEcoScore(5000)).toBe(5);
    });

    it('handles NaN inputs gracefully', () => {
      expect(getEcoScore(NaN)).toBe(50);
      expect(getEcoScore('invalid')).toBe(50);
    });
  });

  describe('getRank', () => {
    it('returns Earth Guardian for high score', () => {
      expect(getRank(95)).toBe('Earth Guardian');
    });

    it('returns Seedling for low score', () => {
      expect(getRank(30)).toBe('Seedling');
    });

    it('returns Climate Novice for critical scores', () => {
      expect(getRank(10)).toBe('Climate Novice');
    });
  });
});
