
// const path = require("path");
const tests = require("./tests");
const { parseInputFile, parseModelFile } = require("./tests/parseFiles.js");
const KMP = require("./KMP.js");
const tester = require("./tests/tester.js");

module.exports = {
    tests,
    name: "KMP",
    parseInput: parseInputFile,
    parseModel: parseModelFile,
    path: __dirname,
    tester,
    KMP,
    default: KMP,
};