function computeZetaFunction(input, zeta = null)
{
    const length = input.length;
    let left = 0;
    let right = 0;

    let index = 1;

    let _zeta = zeta;

    if (!Array.isArray(zeta))
    {
        _zeta = new Array(length);
    }

    const manualCheck = () => {
        while (right < length && input[right - left] === input[right])
        {
            right = right + 1;
        }

        _zeta[index] = right - left;
        right = right - 1;
    };

    while (index < length)
    {
        if (index > right)
        {
            left = index;
            right = index;

            manualCheck();
        }
        else
        {
            const symmetricIndex = index - left;

            if (_zeta[symmetricIndex] < (right - index + 1))
            {
                _zeta[index] = _zeta[symmetricIndex];
            }
            else
            {
                left = index;
                manualCheck();
            }

        }

        index = index + 1;
    }

    return zeta;
}


function search(pattern, text)
{
    if (!pattern || !pattern.length || typeof pattern !== "string")
    {
        throw new Error("Pattern missing or invalid!");
    }

    if (!text || !text.length || typeof text !== "string")
    {
        throw new Error("Text missing or invalid!");
    }

    const input = `${pattern}@${text}`
    const length = input.length;

    const zeta = new Array(length);

    computeZetaFunction(input, zeta);
    return zeta;
}