const getDigits = (number: Number): number[] => number.toString().split('').map(digit => Number(digit));

export const narcissistic = (number: Number): Boolean => {
    const digits = getDigits(number);

    return digits.reduce((acc, val) => acc + Math.pow(val, digits.length), 0) === number;
}

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
