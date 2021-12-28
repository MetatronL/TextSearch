
function computeLongestProperPrefixSuffixArray(strPattern)
{
    const nPatternLength = strPattern.length;
    const arrLPS = new Array(nPatternLength).fill(0);

    // arrLPS[0] = 0;
    // The first element can not be a prefix. So it's value is zero

    let nIndex = 1;
    // We start from the second symbol
    let nCurrentLength = 0;
    // and compare it with the first symbol

    while (nIndex < nPatternLength)
    {
        while (nCurrentLength > 0 && strPattern[nIndex] !== strPattern[nCurrentLength]) 
        {
            nCurrentLength = arrLPS[nCurrentLength - 1];
        }

        if (strPattern[nIndex] === strPattern[nCurrentLength])
        {
            ++nCurrentLength;
        }

        arrLPS[nIndex] = nCurrentLength;
        nIndex += 1;
    }

    return arrLPS;
}


function kmpSearch(strPattern, strText)
{
    const arrLPS = computeLongestProperPrefixSuffixArray(strPattern);


    let nIndexText = 0;
    let nCurrentLength = 0;

    const arrPositions = [];
    
    const nPatternLength = strPattern.length;
    const nTextLength = strText.length;
    const nLastPatternIndex = nPatternLength;

    while (nIndexText < nTextLength)
    {
        while (nCurrentLength > 0 && strText[nIndexText] !== strPattern[nCurrentLength]) 
        {
            nCurrentLength = arrLPS[nCurrentLength - 1];
        }

        if (strPattern[nCurrentLength] === strText[nIndexText])
        {
            ++nCurrentLength;
        }

        if(nCurrentLength >= nLastPatternIndex)
        {
            nCurrentLength = arrLPS[nCurrentLength - 1];
            arrPositions.push(nIndexText - nLastPatternIndex + 1); 
        }

        nIndexText += 1;
    }

    return arrPositions;
}

module.exports = {
    kmpSearch,
    computeLongestProperPrefixSuffixArray,
};