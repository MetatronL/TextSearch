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

    generateBigBase(nPower)
    {
        let result = 1;

        for (let index = 1; index < nPower; ++index)
        {
            result = (result * this.base) % this.primeModule;
        }

        return result;
    }
}

class RabinFingerprintCollection
{
    constructor(arrPrimeModules, base)
    {
        this.arrPrimeModules = arrPrimeModules;
        this.base = base;

        this.arrRabinFingerPrints = [];

        for (const primeModule of arrPrimeModules)
        {
            const _rabinFingerprint = new RabinFingerprint(primeModule, base);
            this.arrRabinFingerPrints.push(_rabinFingerprint);
        }
    }

    generateBigBaseCollection(nPower)
    {
        return this.arrRabinFingerPrints.map(
            (_rabinFingerprint) => _rabinFingerprint.generateBigBase(nPower),
        );
    }

    generateHashCollection(strText)
    {
        return this.arrRabinFingerPrints.map(
            (_rabinFingerprint) => _rabinFingerprint.generateHash(strText),
        );
    }

    nextHashCollection(arrCurrentHash, previousSymbol, nextSymbol, arrBigBases)
    {
        return this.arrRabinFingerPrints.map(
            (_rabinFingerprint, index) => _rabinFingerprint.nextHash(arrCurrentHash[index], previousSymbol, nextSymbol, arrBigBases[index]),
        );
    }

    matchHashCollections(arrHashCollection1, arrHashCollection2)
    {
        if (arrHashCollection1.length !== arrHashCollection2.length)
        {
            throw new Error("[Internal] Different collection lengths...");
        }

        const _length = arrHashCollection1.length;

        for (let index = 0; index < _length; ++index)
        {
            if (arrHashCollection1[index] !== arrHashCollection2[index])
            {
                return false;
            }
        }

        return true;
    }
}


class RabinKarp
{
    constructor({
        primeModules = [100007, 100021],
        base = 71,
    } = {})
    {
        this.primeModules = primeModules;
        this.base = base;

        if (!Array.isArray(primeModules))
        {
            this.primeModules = [primeModules];
        }
    }


    searchPattern(strPattern, strText)
    {
        const rabinFingerprintCollection = new RabinFingerprintCollection(this.primeModules, this.base);

        const nPatternLength = strPattern.length;
        const nTextLength = strText.length;

        if (nTextLength < nPatternLength)
        {
            return [];
        }

        const arrPatternHashCollection = rabinFingerprintCollection.generateHashCollection(strPattern);
        const firstSubstring = strText.substr(0, nPatternLength); 
        let arrTextHashCollection = rabinFingerprintCollection.generateHashCollection(firstSubstring);

        const matches = [];

        if (rabinFingerprintCollection.matchHashCollections(arrPatternHashCollection, arrTextHashCollection))
        {
            matches.push(0);
        }

        const bigBaseCollection = rabinFingerprintCollection.generateBigBaseCollection(nPatternLength);

        for (let index = nPatternLength; index < nTextLength; ++index)
        {
            const previousSymbol = strText[index - nPatternLength];
            const nextSymbol = strText[index];

            arrTextHashCollection = rabinFingerprintCollection.nextHashCollection(arrTextHashCollection, previousSymbol, nextSymbol, bigBaseCollection);

            if (rabinFingerprintCollection.matchHashCollections(arrPatternHashCollection, arrTextHashCollection))
            {
                matches.push(index - nPatternLength + 1);
            }
        }

        return matches;
    }
}

RabinKarp.RabinFingerprint = RabinFingerprint;


export default RabinKarp;