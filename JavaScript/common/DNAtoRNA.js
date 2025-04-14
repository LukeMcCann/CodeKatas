// With errors how I think it should return

const ensureNormalisedString = input => String(input).toUpperCase();

const isValidDNA = dna => /^[GCAT]+$/.test(dna);

const DNAtoRNA = (dna) => {
  const normalisedDNA = ensureNormalisedString(dna);

  if (!isValidDNA(normalisedDNA)) {
    throw new Error('Invalid DNA Sequence, unable to convert.');
  }

  return normalisedDNA.replaceAll('T', 'U');
};


// To Pass the Kata

const ensureNormalisedString = input => String(input).toUpperCase();

const isValidDNA = dna => /^[GCAT]+$/.test(dna);

const DNAtoRNA = (dna) => {
  const normalisedDNA = ensureNormalisedString(dna);

  if (!isValidDNA(normalisedDNA)) {
    return "";
  }

  return normalisedDNA.replaceAll('T', 'U');
};


// Tests

describe("Basic tests", () => {
  it("Testing for fixed tests", () => {
    assert.strictEqual(DNAtoRNA("TTTT"), "UUUU")
    assert.strictEqual(DNAtoRNA("GCAT"), "GCAU")
    assert.strictEqual(DNAtoRNA("GACCGCCGCC"), "GACCGCCGCC")
    });
  })
