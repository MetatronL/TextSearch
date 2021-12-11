const { createTestGroupMetadata } = require("../../../_utils/Metadata");

module.exports = new createTestGroupMetadata({
    prefix: "grader_test",
    indexStart: 1,
    indexEnd: 20,
    inputExtension: "in",
    outputExtension: "ok",
});