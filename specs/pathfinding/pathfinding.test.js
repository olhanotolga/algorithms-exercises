// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");
const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  // create a structure with each maze cell as an object
  const visited = maze.map((row, y) =>
    row.map((origin, x) => ({
      closed: origin === 1,
      length: 0,
      openedBy: NO_ONE,
      x,
      y
    }))
  );
  // mark A and B points on the 'objectified' maze
  visited[yA][xA].openedBy = BY_A;
  visited[yB][xB].openedBy = BY_B;

  // this is where we will schedule next points for A and B
  let queueA = [visited[yA][xA]];
  let queueB = [visited[yB][xB]];
  let iteration = 0;
  
  // until condition is met (while the queue is not empty), we
  while (queueA.length && queueB.length) {
    // 1. increment iteration
    iteration++;
    console.log('ITERATION ', iteration);

    const tempQueueA = [...queueA];
    const tempQueueB = [...queueB];

    // 2. dequeue points in A
    // console.log('Going into loop A with the queueA: ', queueA);
    for (let a = 0; a < queueA.length; a++) {
      const currentA = tempQueueA.shift();
      const { x, y } = currentA;
      // 3. look at its 'children' - adjacent points, if they:
      const childrenA = [
        visited[y - 1]?.[x],
        visited[y + 1]?.[x],
        visited[y][x - 1],
        visited[y][x + 1],
      ];
      for (let cA = 0; cA < childrenA.length; cA++) {
        const currentChild = childrenA[cA];
        // console.log({ currentChild });
        //    3.1. can be queued (not visited, not closed)
        //    3.2. are not the oposite point
        if (currentChild && currentChild.openedBy === BY_B) {
          console.log('Found culprit! ', currentChild);
          const distance = iteration + currentChild.length;
          console.log({distance});
          return distance;
        }
        if (currentChild && !currentChild.closed && currentChild.openedBy !== BY_A) {
          // 4. each child:
          //    4.1. reassign length of each child to iteration
          currentChild.length = iteration;
          //    4.2. mark as visited
          currentChild.openedBy = BY_A;
          //    4.3. add to queue
          tempQueueA.push(currentChild);
        }
      }
    }
    queueA = tempQueueA;

    // 5. dequeue points in B
    // console.log('Going into loop B with the queueB: ', queueB);
    for (let b = 0; b < queueB.length; b++) {
      const currentB = tempQueueB.shift();
      const { x, y } = currentB;
      
      const childrenB = [
        visited[y - 1]?.[x],
        visited[y + 1]?.[x],
        visited[y][x - 1],
        visited[y][x + 1],
      ];

      for (let cB = 0; cB < childrenB.length; cB++) {
        const currentChild = childrenB[cB];
        // console.log({ currentChild });

        if (currentChild && currentChild.openedBy === BY_A) {
          console.log('Found culprit! ', currentChild);
          const distance = iteration + currentChild.length;
          console.log({distance});
          return distance;
        }

        if (currentChild && !currentChild.closed && currentChild.openedBy !== BY_B) {
          currentChild.length = iteration;
          currentChild.openedBy = BY_B;
          tempQueueB.push(currentChild);
        }
      }
    }
    queueB = tempQueueB;
  }

  return -1;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ];
  it.skip("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];
  it.skip("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2]
  ];
  it.skip("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  it.skip("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ];
  it.skip("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2]
  ];
  it.skip("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
