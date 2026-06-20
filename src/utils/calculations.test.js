import { describe, it, expect } from 'vitest';
import { calculateFootprint, getEcoScore, getRank } from './calculations';

describe('Emission Engine (calculations.js)', () => {
  describe('calculateFootprint', () => {
    it('calculates transport emissions correctly', () => {
      const inputs = {
        carType: 'petrol_lg',
        kmDriven: '100',
        flightsShort: '1',
        flightsLong: '0',
        homeSize: 'medium',
        energySource: 'mix',
        electricityKwh: '100',
        householdSize: '1',
        dietType: 'omnivore',
        foodSource: 'supermarket',
        foodWaste: 'medium',
        wasteGenerated: '10'
      };
      
      const result = calculateFootprint(inputs);
      
      // Car: 0.21 * 100 = 21
      // Flights: (1 * 250 + 0) / 12 = 20.833...
      // Transport: 21 + 20.8 = 41.8
      expect(result.transport).toBe(41.8);
      expect(result.total).toBeGreaterThan(0);
    });

    it('handles zero inputs gracefully', () => {
      const inputs = {
        carType: 'none',
        kmDriven: '0',
        flightsShort: '0',
        flightsLong: '0',
        homeSize: 'small',
        energySource: 'renewable',
        electricityKwh: '0',
        householdSize: '4',
        dietType: 'vegan',
        foodSource: 'local',
        foodWaste: 'low',
        wasteGenerated: '0'
      };
      
      const result = calculateFootprint(inputs);
      expect(result.transport).toBe(0);
      expect(result.energy).toBeGreaterThan(0); // House baseline still exists
      expect(result.total).toBeGreaterThan(0);
    });
  });

  describe('getEcoScore', () => {
    it('returns higher score for lower emissions', () => {
      const lowImpact = getEcoScore(100);
      const highImpact = getEcoScore(600);
      expect(lowImpact).toBeGreaterThan(highImpact);
    });

    it('caps score between 5 and 99', () => {
      expect(getEcoScore(10000)).toBe(5);
      expect(getEcoScore(1)).toBe(99);
    });
  });

  describe('getRank', () => {
    it('returns Earth Guardian for high score', () => {
      expect(getRank(90)).toBe('Earth Guardian');
    });
    it('returns Seedling for low score', () => {
      expect(getRank(20)).toBe('Seedling');
    });
  });
});
