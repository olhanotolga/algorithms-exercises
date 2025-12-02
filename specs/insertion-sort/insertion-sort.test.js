/*
  Insertion sort!
  
  Be sure to call your function insertionSort!
  
  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the sorted part of the list and inserts it into the correct position in the array.
  
  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!
  
  And you put xdescribe instead of describe if you want to suspend running the unit tests.  
*/

function insertionSort(nums) {
  if (nums.length === 1) {
    return nums;
  }

  let sorted = [nums[0]];
  
  for (let i = 1; i < nums.length; i++) {
    // need to compare current item to the ones in the already-sorted array starting from the end
    for (let s = sorted.length - 1; s >= 0; s--) {
      if (nums[i] > sorted[s]) {
        // insert after
        sorted.splice(s + 1, 0, nums[i]);
        break;
        // if it's smaller, go to the previous item in the sorted array.
        // unless there is no previous item — in that case, place at the index 0
      } else if (s === 0) {
        sorted.splice(0, 0, nums[i])
        break;
      }
      console.log('internal sorted:', sorted)
    }
    console.log('external sorted:', sorted)
  }
  return sorted;
}

// unit tests
// do not modify the below code
test.skip("insertion sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]; 
  const sorted = insertionSort(nums);
  expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
