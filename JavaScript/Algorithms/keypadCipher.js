const keypadDictionary = {
  '0': ['0', '8'],
  '1': ['1', '2', '4'],
  '2': ['2', '1', '3', '5'],
  '3': ['3', '2', '6'],
  '4': ['4', '1', '5', '7'],
  '5': ['5', '2', '4', '6', '8'],
  '6': ['6', '3', '5', '9'],
  '7': ['7', '4', '8'],
  '8': ['8', '5', '7', '9', '0'],
  '9': ['9', '6', '8']
};

const ensureString = (input = '') => String(input ?? '');
const ensureNumericString = (input = '') => {
  const str = ensureString(input);
  return /^\d+$/.test(str) ? str : null;
};

/**
 * Since the keypad layout is fixed and the number of digits (0–9) is small and finite,
 * it's more efficient and maintainable to use a lookup dictionary instead of calculating
 * adjacent keys dynamically. This approach improves readability, avoids boundary checks,
 * and simplifies the logic. It would be possible to calculate dynamically
 * however, the tradeoff does not seem worth it unless we were entertaining
 * multiple of changing keypads.
 */
const getPINs = (observed) => {
  const sanitisedObserved = ensureNumericString(observed);
  
  if (!sanitisedObserved) {
    return;
  }
  
  return sanitisedObserved
   .split('')
   .map(digit => keypadDictionary[digit])
   .reduce((acc, digitOptions) =>
     acc.flatMap(prefix => digitOptions.map(d => prefix + d)),
     ['']
   );
}

// Kata Tests

const { assert, config } = require('chai');
config.truncateThreshold = 0;

describe('example tests', function() {
  const expectations = {
    "8": ["5", "7", "8", "9", "0"],
    "11": ["11", "22", "44", "12", "21", "14", "41", "24", "42"],
    "369": ["339","366","399","658","636","258","268","669","668","266","369","398","256","296","259","368","638","396","238","356","659","639","666","359","336","299","338","696","269","358","656","698","699","298","236","239"]
  };

  for (let pin in expectations) {
    let expected = expectations[pin].sort(),
        mySolution = getPINs(pin).sort();

    it(`Testing PIN='${pin}'`, () => {
      assert.deepEqual(mySolution, expected);
    });
  }
});
