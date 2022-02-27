export function logDetailedModelComparison({
	model: parsedModelContent,
	output: response,
	testFileNames,
})
{
	console.log("\x1b[31m%s\x1b[0m", "___ ___ [Fail]", `Problems detected in: '${testFileNames.input}'.`);

	if (parsedModelContent.length < 32)
	{
		console.log("_________________________________________________");
		console.log(response);
		console.log("model");
		console.log(parsedModelContent);
		console.log("_________________________________________________");
	}
}

export function logGroupFinalStatus(testGroupFailed)
{
	if (testGroupFailed)
	{
		console.log("\x1b[31m%s\x1b[0m", "___ [Fail]", "The test group failed!");
	}
	else
	{
		console.log("\x1b[32m%s\x1b[0m", "___ [Succes]", "No problems detected in the test group.");
	}
}