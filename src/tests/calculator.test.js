const { add, subtract, multiply, divide, modulo, pow, sqrt } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5 (addition)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6 (subtraction)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('45 * 2 = 90 (multiplication)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('20 / 5 = 4 (division)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow(/division by zero/i);
  });

  test('supports negative and decimal numbers', () => {
    expect(add(-1, 1)).toBe(0);
    expect(multiply(2.5, 2)).toBeCloseTo(5);
  });

  // New operations
  test('Modulo: 10 % 3 = 1', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('Modulo by zero throws', () => {
    expect(() => modulo(1, 0)).toThrow(/modulo by zero/i);
  });

  test('Exponentiation: 2 ^ 3 = 8', () => {
    expect(pow(2, 3)).toBe(8);
  });

  test('Square root: sqrt(9) = 3', () => {
    expect(sqrt(9)).toBe(3);
  });

  test('Square root of negative throws', () => {
    expect(() => sqrt(-1)).toThrow(/square root of negative/i);
  });
});
