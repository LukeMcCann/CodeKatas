const getDigits = (number: number): number[] =>
  number.toString().split('').map(d => Number(d));

export const narcissistic = (number: number): boolean => {
  if (number < 0 || !Number.isInteger(number)) return false;

  const digits = getDigits(number);
  const sum = digits.reduce((acc, val) => acc + Math.pow(val, digits.length), 0);
  
  return sum === number;
};

// Kata Tests

import { expect } from 'chai';

import { narcissistic } from './solution';

describe('Basic tests', () => {
  it('Basic test should work', () => {
    expect(narcissistic(7)).to.equal(true, '7 is narcissistic');
    expect(narcissistic(153)).to.equal(true, '153 is narcissistic');
    expect(narcissistic(1634)).to.equal(true, '1634 is narcissistic');
  });
});
