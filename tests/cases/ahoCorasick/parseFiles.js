
export function parseInputFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n");
    const arrLinesValid = arrLines.filter((strLine) => strLine.length);

    const [firstLine, secondLine, ...restOfLines] = arrLinesValid;

    return {
        text: firstLine,
        dictionary: restOfLines,
    };
}

export function parseModelFile(mxFileContent)
{
    const arrLines = mxFileContent.split("\n"); 
    const arrFinalArray = arrLines
        .filter((strLine) => strLine.length)
        .map((strNumber) => Number(strNumber));

    return arrFinalArray;
}
