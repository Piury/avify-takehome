import { average } from './Utilities';

describe('average function', () => {
  it('should calculate the average correctly', () => {
    const result = average({ fuelTotals: 100, totalIntervals: 2 });
    expect(result).toBe(50);
  });

  it('should handle zero division', () => {
    const result = average({ fuelTotals: 10, totalIntervals: 0 });
    expect(isNaN(result)).toBe(true);
  });

  it('should round the result to two decimal places', () => {
    const result = average({ fuelTotals: 100, totalIntervals: 3 });
    expect(result).toBeCloseTo(33.33);
  });
});