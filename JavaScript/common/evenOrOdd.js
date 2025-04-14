const ensureInteger = (input) => {
  const num = Number(input);
  if (Number.isNaN(num)) throw new Error('Invalid number input');
  return Math.floor(num);
};

const evenOrOdd = (input) => ensureInteger(input) % 2 === 0 ? 'Even' : 'Odd';


// Tests

describe("Sample tests",() => {
  
  it("2 is even", () => {
    assert.strictEqual(evenOrOdd(2), "Even");
  });
  it("7 is odd", () => {
    assert.strictEqual(evenOrOdd(7), "Odd");
  });
  it("-42 is even", () => {
    assert.strictEqual(evenOrOdd(-42), "Even");
  });
  it("-7 is odd", () => {
    assert.strictEqual(evenOrOdd(-7), "Odd");
  });
  it("0 is even", () => {
    assert.strictEqual(evenOrOdd(0), "Even");
  });
});
