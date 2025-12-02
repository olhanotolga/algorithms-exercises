/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/


const mergeSort = (nums) => {
  const length = nums.length;
  // base case: return array of length 1 or 0
  if (length < 2) {
    return nums;
  }

  // break into 2 smaller arrays
  const splitPoint = Math.ceil(length/2);
  const left = nums.slice(0, splitPoint);
  const right = nums.slice(splitPoint);
  console.log({
    left, right
  })
  // call mergeSort of left and right
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  // return the merge of left and right
  return merge(sortedLeft, sortedRight);
};

const merge = (sortedLeft, sortedRight) => {
  const newSortedArray = [];
  
  while (sortedLeft.length && sortedRight.length) {
    if (sortedLeft[0] < sortedRight[0]) {
      newSortedArray.push(sortedLeft.shift());
    } else {
      newSortedArray.push(sortedRight.shift());
    }
  }

  return newSortedArray.concat(sortedLeft, sortedRight);
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
