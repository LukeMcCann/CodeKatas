const ensureString = (input) => String(input ?? '');

const rotateChar = (char) => {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + 13) % 26) + 65);
  }
  
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + 13) % 26) + 97);
  }

  return char;
};

const rot13 = (str = '') => {
  const sanitisedStr = ensureString(str);
  return [...sanitisedStr].map(rotateChar).join('');
};

// ALternate

const rot13 = (str = '') => String(str ?? '').replace(/[a-zA-Z]/g, (c) =>
  String.fromCharCode(
    c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
  )
);

// Tests

describe("Sample tests", () => {
  it("should work for 'EBG13 rknzcyr.'", () => 
    assert.strictEqual(rot13("EBG13 rknzcyr."), "ROT13 example.")
  );
  it("should work for 'This is my first ROT13 excercise!'", () => 
    assert.strictEqual(rot13("This is my first ROT13 excercise!"), "Guvf vf zl svefg EBG13 rkprepvfr!")
  );
});
