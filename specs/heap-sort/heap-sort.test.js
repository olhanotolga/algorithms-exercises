/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  array = createMaxHeap(array);

  for (let i = array.length - 1; i > 0; i--) {
    swapPlace(0, i, array);
    heapify(array, 0, i);
  }

  return array;
};

const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i, array.length);
  }
  return array;
};

const heapify = (array, index, heapSize) => {
  const leftChildIdx = 2 * index + 1;
  const rightChildIdx = 2 * index + 2;

  let largestValIdx = index;
  
  // check if out of bounds AND if needs swapping
  if (leftChildIdx < heapSize && array[largestValIdx] < array[leftChildIdx]) {
    largestValIdx = leftChildIdx;
  }
  if (rightChildIdx < heapSize && array[largestValIdx] < array[rightChildIdx]) {
    largestValIdx = rightChildIdx;
  }

  if (largestValIdx !== index) {
    swapPlace(index, largestValIdx, array);
    heapify(array, largestValIdx, heapSize);
  }
};

const swapPlace = (index1, index2, array) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  return array;
}

// unit tests
// do not modify the below code
test.skip("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
