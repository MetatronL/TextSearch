function logOutputDetails({
	failed: testFailed,
	model: parsedModelContent,
	output: response,
	currentTest,
})
{
	if (testFailed)
	{
		console.log("\x1b[31m%s\x1b[0m", "___ ___ [Fail]", `Problems detected in: '${currentTest.input}'.`);

		if (parsedModelContent.length < 32)
		{
			console.log("_________________________________________________");
			console.log(response);
			console.log("model");
			console.log(parsedModelContent);
			console.log("_________________________________________________");
		}
	}
	else
	{
		console.log("\x1b[32m%s\x1b[0m", "___ ___ [Succes]", `No problems detected in: '${currentTest.input}'. Elapsed time: ${_elapsedTime.toFixed(2)} ms.`);
	}
}

export default {
	logOutputDetails,
};
