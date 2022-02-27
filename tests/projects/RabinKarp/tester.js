import indexRabinKarp from "../../../src/RabinKarp/index.js";

const RabinKarp = indexRabinKarp.default;

function testRabinKarp(arrInputLines)
{
	const strPattern = arrInputLines[0];
	const strText = arrInputLines[1];

	const instanceRabinKarp = new RabinKarp();

	const arrPositions = instanceRabinKarp.searchPattern(strPattern, strText);

	let response = arrPositions;

	if (arrPositions.length > 1000)
	{
		response = response.slice(0, 1000);
	}

	if (response.length)
	{
		return [[arrPositions.length], response];
	}

	return [[0]];
}


export default {
	test: testRabinKarp,
	project: indexRabinKarp,
};
