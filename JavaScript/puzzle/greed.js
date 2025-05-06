const SCORE = {
  '111': 1000,
  '666': 600,
  '555': 500,
  '444': 400,
  '333': 300,
  '222': 200
};

const ensureArray = (arr = []) => Array.isArray(arr) ? arr : [arr];

const isNumericArray = (arr = []) => {
  const array = ensureArray(arr);
  return array.every(item => typeof item === 'number');
};

const getCounts = arr => {
  return arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
};

/**
 * Calculates the score of a dice roll based on a fixed scoring system.
 * 
 * Design Choice:
 * This function uses a declarative, config-driven approach where scoring rules are
 * defined in the SCORE object (e.g. '111' => 1000 points). It processes the input
 * by counting occurrences, checking for triples, and scoring leftovers based on 
 * their individual value (e.g. 1s and 5s).
 * 
 * Pros:
 * - **Maintainable**: Scoring rules are clearly defined in one place (SCORE), making
 *   it easy to modify or extend (e.g. add new patterns like "straight" or "three pairs").
 * - **Readable**: Separating rule logic from calculation keeps the code clean and easy
 *   to understand for future developers.
 * - **Safe**: Input is validated and sanitised with `ensureArray` and `isNumericArray`
 *   to prevent runtime errors.
 * 
 * Cons:
 * - **Slightly less performant** than a purely procedural approach due to string key
 *   generation (e.g. `'5'.repeat(3)`), object lookups, and overhead from abstractions.
 * - **Scoring flexibility** comes at a cost of a few more lines and operations that are
 *   unnecessary if rules are fixed and unlikely to change.
 * 
 * Why this approach:
 * The code is designed with clarity and adaptability in mind. Performance impact is negligible in the context of 
 * small dice arrays, so maintainability is prioritised. For critical real-time systems 
 * (e.g. large-scale simulations), a more procedural version may be preferable.
 */
const score = (dice) => {
  const sanitisedDice = ensureArray(dice);

  if (!isNumericArray(sanitisedDice)) return 0;
  if (!sanitisedDice.length) return 0;

  const counts = getCounts(sanitisedDice);
  let total = 0;

  for (const [num, count] of Object.entries(counts)) {
    const intNum = parseInt(num, 10);
    const tripleKey = num.repeat(3);

    if (count >= 3 && SCORE[tripleKey]) {
      total += SCORE[tripleKey];
    }

    const leftover = count % 3;

    if (intNum === 1) total += leftover * 100;
    if (intNum === 5) total += leftover * 50;
  }

  return total;
};


// Kata Tests

const {assert} = require("chai");

describe( "Scorer Function", function() {
  it( "should value this as worthless", function() {
    assert.strictEqual( score( [2, 3, 4, 6, 2] ), 0, "Incorrect answer for dice = [2, 3, 4, 6, 2]" );
  });
  
  it( "should value this triplet correctly", function() {
    assert.strictEqual( score( [4, 4, 4, 3, 3] ), 400, "Incorrect answer for dice = [4, 4, 4, 3, 3]" );
  });
  
  it( "should value this mixed set correctly", function() {
    assert.strictEqual( score( [2, 4, 4, 5, 4] ), 450, "Incorrect answer for dice = [2, 4, 4, 5, 4]" );
  });
});
