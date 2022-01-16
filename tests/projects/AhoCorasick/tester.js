const indexAhoCorasick = require("../../../src/AhoCorasick");
const AhoCorasick = indexAhoCorasick.default;

function testAhoCorasick({
    text,
    dictionary,
})
{
    const ahoCorasickTree = new AhoCorasick();

    for (const strWord of dictionary)
    {
        ahoCorasickTree.addWord(strWord);
    }

    ahoCorasickTree.prepareAutomaton();

    return ahoCorasickTree.matchText(text);
}

module.exports = {
    test: testAhoCorasick,
    project: indexAhoCorasick,
};
