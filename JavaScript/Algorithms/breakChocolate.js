const sanitizeIntegers = (inputArr = []) =>
	inputArr.map(assumedInt => Number(assumedInt))
  	.filter(assumedInt => Number.isInteger(assumedInt));
    
const isInteger = (n = 0) => Number.isInteger(n);

const clampToZero = (n = 0) => Math.max(n, 0);

const breakChocolate = (n = 0, m = 0) => {
	const [sanitizedN, sanitizedM] = sanitizeIntegers([n, m]);
  
  if (!isInteger(sanitizedN) || !isInteger(sanitizedM)) return 0;
  
  return clampToZero((sanitizedN * sanitizedM) - 1);
}


// Kata Tests

const Test = require('@codewars/test-compat');

describe("Tests", () => {
  it("test", () => {
Test.assertEquals(breakChocolate(5, 5) , 24)
Test.assertEquals(breakChocolate(1, 1) , 0)
  });
});

