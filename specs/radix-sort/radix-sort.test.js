/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
// with args 415, 1, 4, returns 4
// with args 415, 0, 4, returns 0
// place is radix
function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;

  const mod = longestNumber - size;
  return string[place - mod] || 0;
}

function getLongestNumber(array) {
  let greatestLength = 0;

  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length;
    if (currentLength > greatestLength) {
      greatestLength = currentLength;
    }
  }
  return greatestLength;
}

function radixSort(array) {
  // find longestNumber
  const longestNumber = getLongestNumber(array);

  // create buckets - as many as there are places (radices)
  // (array of 10 arrays)
  const buckets = new Array(10).fill().map(() => []);

  // loop over each place/radix
  for (let i = longestNumber - 1; i >= 0; i--) {
    // enqueue numbers into their buckets in a while loop
    while (array.length) {
      const current = array.shift();
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    // dequeue items out of each bucket in a for loop
    for (let j = 0; j < buckets.length; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift());
      }
    }
  }

  return array;
}

// unit tests
// do not modify the below code
describe.skip('radix sort', function () {
  it('should sort correctly', () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it('should sort 99 random numbers correctly', () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
