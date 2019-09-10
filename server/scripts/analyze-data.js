const Trie = require("../lib/trie");
const fs = require("fs");

const trie = new Trie();
const folder = "data/";
fs.readdir(folder, (err, files) => {
  if (err) {
    console.error("Unable to find directory", err);
    process.exit(1);
  }

  files.forEach(fileName => {
    fs.readFile(folder + fileName, "utf8", (fileError, data) => {
      if (fileError) {
        console.error("Unable to read file", fileError);
        process.exit(1);
      }

      const fileContent = data.match(/\w[\w']*(?:-\w+)*'?/g);

      fileContent.forEach(word => {
        trie.add(word.toLowerCase());
      });
    });
  });
});

module.exports = trie;
