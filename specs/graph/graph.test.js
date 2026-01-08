// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  // titles will be added here as keys with their occurrence as the value
  const titles = {};
  
  // queue for breadth-first traversal
  let queue = [myId];

  // store already processed Ids
  const seenIds = new Set(queue);

  // loop over the number of levels of connection / degrees of separation
  for (let i = 0; i <= degreesOfSeparation; i++) {
    // console.log({queue});
    let tempQueue = [];
    // dequeue what's in the queue one by one
    while (queue.length) {
      const currentId = queue.shift();
      const currentPerson = getUser(currentId);
      // console.log({currentPerson});
      // add person's job title to titles
      if (currentPerson.title in titles) {
        titles[currentPerson.title]++;
      } else {
        titles[currentPerson.title] = 1;
      }
      
      // console.log({seenIds})
      // queue everyone's connections, except those that are already in the seenIds set
      for (let c = 0; c < currentPerson.connections.length; c++) {
        const connection = currentPerson.connections[c];
        if (!seenIds.has(connection)) {
          seenIds.add(connection);
          tempQueue.push(connection);
        }
      }
    }
    queue = queue.concat(tempQueue);
  }
  // console.log({titles})
  const jobTitles = Object.keys(titles);
  let foundJob = jobTitles[0];
  let highestFrequency = titles[jobTitles[0]]
  for (let j = 0; j < jobTitles.length; j++) {
    const currentJob = jobTitles[j];
    if (titles[currentJob] > highestFrequency) {
      highestFrequency = titles[currentJob];
      foundJob = currentJob;
    }
  }
  
  console.log({foundJob, highestFrequency});
  
  return foundJob;

};

// unit tests
// do not modify the below code
describe.skip("findMostCommonTitle", function () {
  // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe.skip("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
