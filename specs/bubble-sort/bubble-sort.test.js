/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end

  To run the tests, change the `test.skip(…)` below to `test(…)`

  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

function bubbleSort(nums) {
  // sentinel variable
  let hasSwapped = false;
  // tracking number of iterations for optimization,
  // it's guaranteed that the last item after each loop will be the largest one
  // and won't need to be compared
  let iterations = 0;
  do {
    hasSwapped = false;
    // adjust for the length, which will decrease as the largest nums bubble up
    for (let i = 0; i < (nums.length - iterations); i++) {
      if (nums[i] > nums[i + 1]) {
        const current = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = current;
        hasSwapped = true;
      }
    }
    console.log('nums:', nums)
    iterations++;
  } while (hasSwapped === true);
  return nums;
}

// unit tests
// do not modify the below code
test.skip("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
