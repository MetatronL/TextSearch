function deepCompare(leftElement, rightElement)
{
    const isObjectLeft = typeof leftElement === "object" && leftElement !== null;
    const isObjectRight = typeof rightElement === "object" && rightElement !== null;

    const isArrayLeft = Array.isArray(leftElement);
    const isArrayRight = Array.isArray(rightElement);

    if (isArrayLeft && isArrayRight)
    {
        if (leftElement.length !== rightElement.length)
        {
            console.log("[diff] leftElement !== rightElement", leftElement.length, rightElement.length);

            return false;
        }

        const nLength = leftElement.length;

        for (let index = 0; index < nLength; ++index)
        {
            if (!deepCompare(leftElement[index], rightElement[index]))
            {
                console.log("[diff] index:", index, leftElement[index], rightElement[index]);
                return false;
            }
        }

        return true;
    }

    if (isObjectLeft &&  isObjectRight)
    {
        let count = [0,0];
        let countLeft = 0;
        let countRight = 0;

        for (let key in leftElement)
        {
            ++countLeft;
        }

        for (let key in rightElement)
        {
            ++countRight;
        }

        if (countLeft !== countRight)
        {
            console.log("[diff] countLeft !== countRight", countLeft, countRight);
            return false;
        }

        for (var key in leftElement)
        {
            if (!(key in rightElement) || !deepEqual(leftElement[key], rightElement[key]))
            {
                console.log("[diff] key in rightElement");
                return false;
            }
        }

        for (var key in rightElement)
        {
            if (!(key in leftElement) || !deepEqual(rightElement[key],leftElement[key]))
            {
                console.log("[diff] key in leftElement");
                return false;
            }
        }

        return true;
    }
    
    return leftElement === rightElement;
}

module.exports = deepCompare;