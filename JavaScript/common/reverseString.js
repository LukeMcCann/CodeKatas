const ensureString = input => String(input);

// By spreading we ensure that the input is Unicode safe after sanitisation.
const solution = strInput => [...ensureString(strInput)].reverse().join('');


// Tests to pass

describe("Basic tests", () => {
  it("Testing for fixed tests", () => {
    assert.strictEqual(solution('world'), 'dlrow');
    assert.strictEqual(solution('hello'), 'olleh');
    assert.strictEqual(solution(''), '');
    assert.strictEqual(solution('h'), 'h');
  });
});  
