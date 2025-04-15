const ensureString = (input) => String(input);

const ensureStringArray = (input) => {
	if (!input || input.length === 0) {
  	return [];
  }
  
	const inputArr = Array.isArray(input) ? input : [input];
	
	return inputArr.map(item => ensureString(item));
};

const getLikesResponse = (arr) => {
	let response = 'no one likes';
  
  switch (true) {
  	case arr.length === 1:
    	response = `${arr[0]} likes`;
      break;
    case arr.length === 2:
    	response = `${arr[0]} and ${arr[1]} like`;
      break;
    case arr.length === 3:
    	response = `${arr[0]}, ${arr[1]} and ${arr[2]} like`;
      break;
    case arr.length > 3: 
    	const n = arr.length - 2;
			response = `${arr[0]}, ${arr[1]} and ${n} others like`;
      break;
  	case arr.length === 0:
    default:
       break;
  }

  return response;
};

const likes = (names) => {
	const namesArr = ensureStringArray(names);

	return getLikesResponse(namesArr) + ` this`;
};

// Kata Tests

describe('example tests', function() {
  it('should return correct text', function() {
    assert.strictEqual(likes([]), 'no one likes this');
    assert.strictEqual(likes(['Peter']), 'Peter likes this');
    assert.strictEqual(likes(['Jacob', 'Alex']), 'Jacob and Alex like this');
    assert.strictEqual(likes(['Max', 'John', 'Mark']), 'Max, John and Mark like this');
    assert.strictEqual(likes(['Alex', 'Jacob', 'Mark', 'Max']), 'Alex, Jacob and 2 others like this');
  });
});
