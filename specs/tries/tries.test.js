// in order to pass the unit tests, you will need to create a function called createTrie that accepts a list of strings
// as a parameter and returns an object with a method on it called "`complete`. complete is a method that when called
// with a string will return an array of up to length three that are autocompleted suggestions of how to finish that string.
// for the sake of this exercise, it does not matter which order these strings are returned in or if there are more than three
// possible suggestions, which three you choose
//
// feel free to see the dataset in cities.js
//
// I suggest working on one unit test at a time, use `test.skip` instead of `test` to not run unit tests
// the edge cases are for fun and for this exercise you don't necessarily need to pass them

const { CITY_NAMES } = require("./cities.js");
const _ = require("lodash"); // needed for unit tests

class Node {
  // we create either the root node or non-root node.
  // if we pass a "", then it's the root node,
  // if it's a longer string, then we create a node with the first char and the rest goes into children
  constructor(string) {
    this.children = [];
    this.terminus = string.length === 1 ? true : false;
    this.value = string[0];
    
    // new node can be created only with a single character as its value
    if (string.length > 1) {
      // creating recursively nodes for each character and adding them as children
      const newNode = new Node(string.slice(1));
      this.children.push(newNode);
    }
  }
  // examples:
  // - Boston: no children, just creates nodes for this word
  // - Dallas: there are children, but the match doesn't happen, so just create nodes for this word
  // - Dagger: there are children, and there is a match at D, so it goes one level deeper to a, and then to g but there is no match, so children of a are created and added to the trie-tree
  add(string) {
    // logic to build the tree by traversing nodes and their children
    // looks where to put which (sub)string
    // OR creates a new subtree for a word
    const value = string[0];
    const rest = string.slice(1);
    for (let c = 0; c < this.children.length; c++) {
      const child = this.children[c];
      // found the necessary child (character) to:
      // - either add the rest of the word to it
      // - or mark the character as the last one in a given word
      if (child.value === value) {
        if (rest) {
          // if the word does not end yet
          child.add(rest);
        } else {
          child.terminus = true;
        }
        return;
      }
    }

    const newNode = new Node(string);
    this.children.push(newNode);
  }

  _complete(search, built, suggestions) {
    // ??? search[0] !== this.value --> the beginning of the substring doesn't match this particular node's value, so this node isn't counted in the suggestions
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions;
    }
    // characters match, word is complete, push it into suggestions
    if (this.terminus) {
      suggestions.push(`${built}${this.value}`);
    }
    // characters match, building full words recursively
    for (let c = 0; c < this.children.length; c++) {
      const child = this.children[c];
      child._complete(search.substr(1), `${built}${this.value}`, suggestions)
    }
    return suggestions;
  }

  complete(string) {
    let completions = [];
    // look inside the children to find the sequence of nodes to return
    for (let c = 0; c < this.children.length; c++) {
      const child = this.children[c];
      // concatenate node values recursively
      completions = completions.concat(child._complete(string, "", []));
    }
    return completions;
  }
}

const createTrie = (words) => {
  // start by creating the root
  const root = new Node("");

  // check words one by one, ignoring case
  for (let w = 0; w < words.length; w++) {
    // let the root create the entire trie-tree
    root.add(words[w].toLowerCase());
  }

  return root;
};

// unit tests
// do not modify the below code
describe.skip("tries", function () {
  test("dataset of 10 – san", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["san antonio", "san diego", "san jose"])
        .length
    ).toBe(3);
  });

  test("dataset of 10 – philadelph", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("philadelph");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["philadelphia"]).length).toBe(1);
  });

  test("dataset of 25 – d", () => {
    const root = createTrie(CITY_NAMES.slice(0, 25));
    const completions = root.complete("d");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["dallas", "detroit", "denver"]).length
    ).toBe(3);
  });

  test("dataset of 200 – new", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("new");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "new york",
        "new orleans",
        "new haven",
        "newark",
        "newport news"
      ]).length
    ).toBe(3);
  });

  test("dataset of 200 – bo", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("bo");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["boston", "boise city"]).length).toBe(
      2
    );
  });

  test("dataset of 500 – sal", () => {
    const root = createTrie(CITY_NAMES.slice(0, 500));
    const completions = root.complete("sal");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["salt lake city", "salem", "salinas"]).length
    ).toBe(3);
  });

  test("dataset of 925 – san", () => {
    const root = createTrie(CITY_NAMES);
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "san antonio",
        "san angelo",
        "san diego",
        "san jose",
        "san jacinto",
        "san francisco",
        "san bernardino",
        "san buenaventura",
        "san bruno",
        "san mateo",
        "san marcos",
        "san leandro",
        "san luis obispo",
        "san ramon",
        "san rafael",
        "san clemente",
        "san gabriel",
        "santa ana",
        "santa clarita",
        "santa clara",
        "santa cruz",
        "santa rosa",
        "santa maria",
        "santa monica",
        "santa barbara",
        "santa fe",
        "santee",
        "sandy",
        "sandy springs",
        "sanford"
      ]).length
    ).toBe(3);
  });
});

describe.skip("edge cases", () => {
  test("handle whole words – seattle", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("seattle");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["seattle"]).length).toBe(1);
  });

  test("handle no match", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("no match");
    expect(completions.length).toBe(0);
  });

  test("handle words that are a subset of another string – salin", () => {
    const root = createTrie(CITY_NAMES.slice(0, 800));
    const completions = root.complete("salin");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["salina", "salinas"]).length).toBe(2);
  });
});
