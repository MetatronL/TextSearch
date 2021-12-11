
// const path = require("path");
const tests = require("./tests/index.js");
const { parseInputFile, parseModelFile } = require("./parseFiles.js");
const trie = require("./trie.js");
const tester = require("./tester.js");

module.exports = {
    tests,
    name: "Trie",
    parseInput: parseInputFile,
    parseModel: parseModelFile,
    path: __dirname,
    trie,
    tester,
};