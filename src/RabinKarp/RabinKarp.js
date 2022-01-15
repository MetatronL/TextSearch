class RabinFingerprint
{
    constructor(primeModule = 100007, base = 71)
    {
        this.primeModule = primeModule;
        this.base = base;
    }

    generateHash(strText)
    {
        let hash = 0;

        for (const strSymbol of strText)
        {
            hash = (hash * this.base + strSymbol.charCodeAt(0)) % this.primeModule;
        }

        return hash;
    }

    nextHash(nCurrentHash, previousSymbol, nextSymbol, bigBase)
    {
        const previousSymbolHash = (previousSymbol.charCodeAt(0) * bigBase) % this.primeModule;
        const nextSymbolHash = nextSymbol.charCodeAt(0);

        return ((nCurrentHash + this.primeModule - previousSymbolHash) * this.base + nextSymbolHash)  % this.primeModule;
    }

    basePower(nPower)
    {
        let result = 1;

        for (let index = 1; index < nPower; ++index)
        {
            result = (result * this.base) % this.primeModule;
        }

        return result;
    }
}


class RabinKarp
{
    constructor({
        primeModule1 = 100007,
        primeModule2 = 100021,
        base = 71,
    } = {})
    {
        this.primeModule1 = primeModule1;
        this.primeModule2 = primeModule2;
        this.base = base;
    }


    searchPattern(strPattern, strText)
    {
        const fingerprint1 = new RabinFingerprint(this.primeModule1, this.base);
        const fingerprint2 = new RabinFingerprint(this.primeModule2, this.base);

        const patternHash1 = fingerprint1.generateHash(strPattern);
        const patternHash2 = fingerprint2.generateHash(strPattern);

        const nPatternLength = strPattern.length;
        const nTextLength = strText.length;


        if (nTextLength < nPatternLength)
        {
            return [];
        }

        const firstSubstring = strText.substr(0, nPatternLength); 

        let textHash1 = fingerprint1.generateHash(firstSubstring);
        let textHash2 = fingerprint2.generateHash(firstSubstring);

        const matches = [];

        if (textHash1 === patternHash1 && textHash2 === patternHash2)
        {
            matches.push(0);
        }

        const bigBase1 = fingerprint1.basePower(nPatternLength);
        const bigBase2 = fingerprint2.basePower(nPatternLength);

        for (let index = nPatternLength; index < nTextLength; ++index)
        {
            const previousSymbol = strText[index - nPatternLength];
            const nextSymbol = strText[index];

            textHash1 = fingerprint1.nextHash(textHash1, previousSymbol, nextSymbol, bigBase1);
            textHash2 = fingerprint2.nextHash(textHash2, previousSymbol, nextSymbol, bigBase2);

            if (textHash1 === patternHash1 && textHash2 === patternHash2)
            {
                matches.push(index - nPatternLength + 1);
            }
        }

        return matches;
    }
}

RabinKarp.RabinFingerprint = RabinFingerprint;


module.exports = RabinKarp;