const clampRgbValue = (value) => Math.max(0, Math.min(255, Number(value)));

const convertToHexByte = (value) => clampRgbValue(value).toString(16).padStart(2, '0').toUpperCase();

const isValidRgbValue = (value = 0) => {
  const num = Number(value);
  return Number.isInteger(num) && num >= 0 && num <= 255;
};

const rgb = (r = 0, g = 0, b = 0) => [r, g, b].map(convertToHexByte).join('');



// Kata tests to pass
describe("Tests", () => {
  const { strictEqual } = require('chai').assert;

  function doTest(r, g, b, expected) {
      const actual = rgb(r, g, b);
      const message = for r = ${r} g = ${g} b = ${b};
      strictEqual(actual, expected, message);
  }

  it("Sample Tests", () => {
    doTest(  0,   0,   0, '000000');
    doTest(  0,   0, -20, '000000');
    doTest(300, 255, 255, 'FFFFFF');
    doTest(173, 255,  47, 'ADFF2F');
  });
});
