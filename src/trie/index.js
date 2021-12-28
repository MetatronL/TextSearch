
// const path = require("path");
const tests = require("./tests");
const { parseInputFile, parseModelFile } = require("./tests/parseFiles.js");
const trie = require("./Trie.js");
const tester = require("./tests/tester.js");

module.exports = {
    tests,
    name: "Trie",
    parseInput: parseInputFile,
    parseModel: parseModelFile,
    path: __dirname,
    trie,
    tester,
};