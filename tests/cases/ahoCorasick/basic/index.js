const { createTestGroupMetadata } = require("../../../../_utils/Metadata");

module.exports = new createTestGroupMetadata({
    prefix: "grader_test",
    indexStart: 0,
    indexEnd: 20,
    inputExtension: "in",
    outputExtension: "ok",
});