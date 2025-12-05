// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (current.id === id) {
      return current;
    }
  }
}

// spatial complexity because of constantly creating new arrays
function binarySearch1(id, array) {
  // EDGE CASES
  if (!Array.isArray(array) || array.length < 1) return;
  if (array.length === 1) {
    return array[0];
  }
  // ensure array is sorted by property we're searching
  let arraySortedById = array.sort((a, b) => a.id - b.id);

  let middleIndex = Math.floor(arraySortedById.length / 2); // when the length is 6, middle is 3: [0, 1, 2, *3*, 4, 5]

  while (arraySortedById.length >= 1) {    
    const current = arraySortedById[middleIndex];
    // console.log({arraySortedById, length: arraySortedById.length, middleIndex, current})
    if (id === current.id) {
      return current;
    } else if (id > current.id) {
      arraySortedById.splice(0, middleIndex + 1); // array without the part in the parenths
      middleIndex = Math.floor(arraySortedById.length / 2);
    } else {
      arraySortedById.splice(middleIndex);
      middleIndex = Math.floor(arraySortedById.length / 2);
    }
  }
}

function binarySearch(id, array) {
  // EDGE CASES
  if (!Array.isArray(array) || array.length < 1) return;
  if (array.length === 1) {
    return array[0];
  }

  // ensure array is sorted by property we're searching
  const sortedArray = array.sort((a, b) => a.id - b.id);
  
  let start = 0;
  let end = sortedArray.length - 1; // last element
  let middle; // current middle index
  let current; // current element
  
  while (start <= end) {
    middle = Math.floor((start + end) / 2);
    current = sortedArray[middle];

    if (current.id === id) {
      return current;
    } else if (id > current.id) {
      start = middle + 1;
    } else if (id < current.id) { 
      end = middle - 1;
    }
  }

  // if nothing found
  return null;
}

const lookingFor = { id: 23, name: "Brian" };


// unit tests
// do not modify the below code
test.skip("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" }
    ])
  ).toBe(lookingFor);
});

test.skip("binary search 1", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch1(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" }
    ])
  ).toBe(lookingFor);
});

test.skip("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" }
    ])
  ).toBe(lookingFor);
});
