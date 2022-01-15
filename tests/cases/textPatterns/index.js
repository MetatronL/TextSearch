const basicTestGroup = require("./basic/index");
const { parseInputFile, parseModelFile } = require("./parseFiles.js");

module.exports = {
    testGroups: {
        basic: basicTestGroup,
    },
    parseInput: parseInputFile,
    parseModel: parseModelFile,
    name: "textPatterns",
    path: __dirname,
};