type Vowel = 'a' | 'e' | 'i' | 'o' | 'u';

const vowels: Vowel[] = ['a', 'e', 'i', 'o', 'u'];

const isVowel = (char: string): char is Vowel => {
  return vowels.includes(char as Vowel);
}

export class Kata {
  static getCount(str: string): number {
    return [...str].filter(isVowel).length;
  }
}


// kata Tests

import solution = require('./solution');
import {assert} from "chai";

describe("getCount", function(){
    it ("should pass a sample test", function(){
        assert.strictEqual(solution.Kata.getCount("abracadabra"), 5)
    });
});
