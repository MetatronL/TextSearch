import indexAhoCorasick from "../../../src/AhoCorasick/index.js";

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

export default {
	test: testAhoCorasick,
	project: indexAhoCorasick,
};
