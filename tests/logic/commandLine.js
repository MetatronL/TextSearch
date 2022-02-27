export function parseCommandLine()
{
	const arrProccessArgs = process.argv.slice(2);
	const testConfig = {};

	for (const strCommand of arrProccessArgs)
	{
		if (strCommand.indexOf(":") !== -1)
		{
			const arrParts = strCommand.split(":");
			testConfig[arrParts[0]] = arrParts[1];
		}
	}

	return testConfig;
}
