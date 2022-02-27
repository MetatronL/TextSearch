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

		for (let index = 0; index < nLength; index += 1)
		{
			if (!deepCompare(leftElement[index], rightElement[index]))
			{
				console.log("[diff] index:", index, leftElement[index], rightElement[index]);
				return false;
			}
		}

		return true;
	}

	if (isObjectLeft && isObjectRight)
	{
		let countLeft = 0;
		let countRight = 0;

		for (const _key in leftElement)
		{
			countLeft += 1;
		}

		for (const _key in rightElement)
		{
			countRight += 1;
		}

		if (countLeft !== countRight)
		{
			console.log("[diff] countLeft !== countRight", countLeft, countRight);
			return false;
		}

		for (const key in leftElement)
		{
			if (!(key in rightElement) || !deepCompare(leftElement[key], rightElement[key]))
			{
				console.log("[diff] key in rightElement");
				return false;
			}
		}

		for (const key in rightElement)
		{
			if (!(key in leftElement) || !deepCompare(rightElement[key], leftElement[key]))
			{
				console.log("[diff] key in leftElement");
				return false;
			}
		}

		return true;
	}

	return leftElement === rightElement;
}

export default deepCompare;
