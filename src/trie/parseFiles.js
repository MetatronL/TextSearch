
function parseInputFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n");
    const arrLinesValid =arrLines.filter((strLine) => strLine.length);

    return arrLinesValid.map((strLine) => strLine.split(" "));
}

function parseModelFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n");
    const arrLinesValid = arrLines
        .filter((strLine) => strLine.length)
        .map((strNumber) => Number(strNumber));

    return arrLinesValid;
}

module.exports = {
    parseInputFile,
    parseModelFile,
};