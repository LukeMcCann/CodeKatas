const DELIMITERS = ['#', '!', '+', '-', '*', '$', '^', '/', '%', '\\', '~', '@'];

const ensureString = (input) => String(input ?? '');
const ensureArray = (input) => Array.isArray(input) ? input : [input];

const ensureStrictArray = (input = [], allowedChars = []) =>
  ensureArray(input).filter(item => ensureArray(allowedChars).includes(item));

const solution = (text = '', markers = [], allowedMarkers = DELIMITERS) => {
  const inputText = ensureString(text);
  const markersArr = ensureStrictArray(markers, allowedMarkers);

  return markersArr.length === 0
    ? inputText.trimEnd()
    : inputText
        .split('\n')
        .map(line =>
          line
            .slice(
              0,
              markersArr.reduce((earliest, marker) => {
                const index = line.indexOf(marker);
                return index !== -1 && index < earliest ? index : earliest;
              }, line.length)
            )
            .trimEnd()
        )
        .join('\n');
};


// Tests

describe('Sample Tests', function() {
  function runTest(text, markers, expected) {
    let title = `text = ${JSON.stringify(text)}, markers = ${JSON.stringify(markers)}`;
    let actual = solution(text, markers);
    it(title, function() { assert.strictEqual(actual, expected); });
  }

  const tests = [
    ['aa bb cc', [], 'aa bb cc'],
    ['aa bb cc  ', [], 'aa bb cc'],
    ['  aa bb cc', [], '  aa bb cc'],
    ['  aa # bb # cc  ', [], '  aa # bb # cc'],

    ['aa bb cc', ['#'], 'aa bb cc'],
    ['aa bb # cc', ['#'], 'aa bb'],
    ['aa# bb cc', ['#'], 'aa'],
    ['aa #bb cc', ['#'], 'aa'],
    ['aa # bb # cc', ['#'], 'aa'],
    ['#aa bb cc', ['#'], ''],

    ['#aa bb\ncc dd', ['#'], '\ncc dd'],
    ['aa # bb\ncc dd', ['#'], 'aa\ncc dd'],
    ['aa bb\n#cc dd', ['#'], 'aa bb\n'],
    ['aa bb\ncc # dd', ['#'], 'aa bb\ncc'],
    ['aa bb\ncc dd#', ['#'], 'aa bb\ncc dd'],

    ['aa bb\ncc dd', ['#', '!'], 'aa bb\ncc dd'],
    ['aa # bb\ncc dd', ['#', '!'], 'aa\ncc dd'],
    ['aa bb\ncc ! dd', ['#', '!'], 'aa bb\ncc'],
    ['#aa bb\n!cc dd', ['#', '!'], '\n'],
    ['aa ! bb\ncc # dd', ['#', '!'], 'aa\ncc'],
    ['aa bb#\ncc dd!', ['#', '!'], 'aa bb\ncc dd'],

    ['aa + bb\ncc - dd\nee * ff', ['+', '-', '*'], 'aa\ncc\nee'],
    ['aa / bb\ncc ^ dd\nee $ ff', ['/', '^', '$'], 'aa\ncc\nee'],
  ];

  tests.forEach(([text, markers, expected]) => runTest(text, markers, expected));
});
