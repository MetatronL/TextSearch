const indexKMP = require("../../../src/KMP");
const KMP = indexKMP.default;

function testKMP(arrInputLines)
{
    const strPattern = arrInputLines[0];
    const strText = arrInputLines[1];

    const arrPositions =  KMP.kmpSearch(strPattern, strText);

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


module.exports = {
    test: testKMP,
    project: indexKMP,
};