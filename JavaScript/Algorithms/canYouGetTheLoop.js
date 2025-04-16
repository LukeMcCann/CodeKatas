// Problem:
// You are given a node that is the beginning of a linked list. 
// This list contains a dangling piece and a loop. Your objective is to determine the length of the loop.
// For example in the following picture the size of the dangling piece is 3 and the loop size is 12

const isLinkedListNode = (node) => {
  return (
    Object.hasOwn(node, "next") &&
    Object.hasOwn(node, "setNext") &&
    Object.hasOwn(node, "getNext")
  );
};

const getStartNode = (node) => {
  const visited = new Set();
  let current = node;

  while (!visited.has(current)) {
    visited.add(current);
    current = current.getNext();
  }

  return current;
};

const getLoopLength = (node) => {
  const start = getStartNode(node);
  let current = start.getNext();
  let count = 1;

  while (current !== start) {
    count++;
    current = current.getNext();
  }

  return count;
};

const loop_size = (node) => {
  if (!isLinkedListNode(node)) return 0;

  return getLoopLength(node);
};


// Tests

describe('sample tests', function () {
	it('should work for some small lists', function () {
		{
			const A = new Node();
			A.setNext(A);
			assert.deepEqual(loop_size(A), 1); 
		}
		{
			const A = new Node(), B = new Node();
			A.setNext(B), B.setNext(A);
			assert.deepEqual(loop_size(A), 2); 
		}
		{
			const A = new Node(), B = new Node();
			A.setNext(B), B.setNext(B);
			assert.deepEqual(loop_size(A), 1); 
		}
		{
			const A = new Node(), B = new Node(), C = new Node();
			A.setNext(B), B.setNext(C), C.setNext(C);
			assert.deepEqual(loop_size(A), 1); 
		}
		{
			const A = new Node(), B = new Node(), C = new Node();
			A.setNext(B), B.setNext(C), C.setNext(B);
			assert.deepEqual(loop_size(A), 2); 
		}
		{
			const A = new Node(), B = new Node(), C = new Node();
			A.setNext(B), B.setNext(C), C.setNext(A);
			assert.deepEqual(loop_size(A), 3); 
		}
	});
});
