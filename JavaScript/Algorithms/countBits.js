const countBits = (n = 0) => {
  if (typeof n !== 'number' || Number.isNaN(n)) return;
  
  return Math.abs(n).toString(2).split('1').length - 1;
};

// Kata Test Case

const { assert } = require("chai")

describe("Basic tests", () => {
  it("Testing for fixed tests", () => {
    assert.strictEqual(countBits(0), 0);
    assert.strictEqual(countBits(4), 1);
    assert.strictEqual(countBits(7), 3);
    assert.strictEqual(countBits(9), 2);
    assert.strictEqual(countBits(10), 2);
    })
  })
