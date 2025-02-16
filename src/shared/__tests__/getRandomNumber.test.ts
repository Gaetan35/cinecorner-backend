import { getRandomNumberInRange } from '~shared/getRandomNumberInRange';

describe('getRandomNumber', () => {
  it('should return a random number within the range', () => {
    const result = getRandomNumberInRange({ min: 4, max: 10 });

    expect(result).toBeGreaterThanOrEqual(4);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('should use 0 as default min value', () => {
    const result = getRandomNumberInRange({ max: 10 });

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('should return 0 when min = max = 0', () => {
    const result = getRandomNumberInRange({ min: 0, max: 0 });

    expect(result).toEqual(0);
  });
});
