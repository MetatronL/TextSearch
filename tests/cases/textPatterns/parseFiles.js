
function parseInputFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n");
    const arrLinesValid = arrLines.filter((strLine) => strLine.length);

    return arrLinesValid;
}

function parseModelFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n");
    const arrLinesValid = arrLines
        .filter((strLine) => strLine.length)
        .map((strLine) => {
            return strLine
                .split(" ")
                .filter((strNumber) => strNumber.length)
                .map((strNumber) => Number(strNumber));
        });

    return arrLinesValid;
}

module.exports = {
    parseInputFile,
    parseModelFile,
};