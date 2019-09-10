class TrieNode {
  constructor(character) {
    this.character = character;
    this.terminator = false;
    this.parent = null;
    this.children = {};
  }

  getWord() {
    const output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.character);
      node = node.parent;
    }
    return output.join("");
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  add(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i == word.length - 1) {
        node.terminator = true;
      }
    }
  }

  contains(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }

    return node.terminator;
  }

  find(prefix) {
    let node = this.root;
    const output = [];

    for (let i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    findAll(node, output);

    return output;
  }
}

const findAll = (node, arr) => {
  if (node.terminator) {
    arr.unshift(node.getWord());
  }

  for (let child in node.children) {
    findAll(node.children[child], arr);
  }
};

module.exports = Trie;
// const trie = new Trie();

// trie.add("hello");
// trie.add("helium");

// console.log(trie.contains("helium"));
// console.log(trie.contains("kickass"));

// console.log(trie.find("hel")); // [ 'helium', 'hello' ]
// console.log(trie.find("hell")); // [ 'hello' ]
