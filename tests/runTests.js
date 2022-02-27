import path from "path";
import { performance } from "perf_hooks";

import deepCompare from "./deepCompare.js";
import FileReader from "./_utils/FileReader.js";
import { configuration, parseCommandLine } from "./logic/index.js";


function runTests({
	verbose = false,
	breakOnError = false,
} = {})
{
	const testConfig = parseCommandLine();

	for (const problemTester of configuration)
	{
		if (testConfig.name && testConfig.name !== problemTester.tester.project.name)
		{
			continue;
		}

		const problemIndex = problemTester.tester.project;

		console.log("");
		console.log(`Running the tests for: ${problemIndex.name || "N/A"}.`);

		const { testCases } = problemTester;

		for (const testCase of testCases)
		{
			const { testGroups } = testCase;

			console.log(`___ Running the test case: ${testCase.name || "N/A"}.`);

			for (const [testGroupName, testGroup] of Object.entries(testGroups))
			{
				console.log(`___ Running the test group: ${testGroupName || "N/A"}.`);

				const {
					prefix,
					indexStart,
					indexEnd,
					inputExtension,
					outputExtension,
				} = testGroup;


				if (typeof indexStart !== "number" || typeof indexEnd !== "number")
				{
					console.log("___ ___ Expected to have number values for indexStart and indexEnd.. The test group can not run.");
					continue;
				}

				if (indexStart > indexEnd)
				{
					console.log("___ ___ Expected to have indexStart <= indexEnd.. The test group can not run.");
					continue;
				}

				const _indexStart = testConfig.test ? Number(testConfig.test) : indexStart;
				const _indexEnd = testConfig.test ? Number(testConfig.test) : indexEnd;

				const arrFileNames = new Array(_indexEnd - _indexStart + 1).fill(prefix).map((fileName, indexArray) => `${fileName}${_indexStart + indexArray}`);

				const arrTestCases = arrFileNames.map((fileName) => ({
					input: `${fileName}.${inputExtension}`,
					model: `${fileName}.${outputExtension}`,
				}));


				const fileReader = new FileReader();

				let testGroupFailed = false;

				const basePath = path.resolve("./tests/cases", testCase.name);

				for (const currentTest of arrTestCases)
				{
					const _pathToInputFile = path.resolve(basePath, testGroupName, currentTest.input);
					const mxInputFileContent = fileReader.readInputFileSync(_pathToInputFile);
					const parsedInputContent = testCase.parseInput(mxInputFileContent);

					const _pathToModelFile = path.resolve(basePath, testGroupName, currentTest.model);
					const mxModelFileContent = fileReader.readInputFileSync(_pathToModelFile);
					const parsedModelContent = testCase.parseModel(mxModelFileContent);

					let response = null;
					let _elapsedTime = 0;

					try
					{
						const t0 = performance.now();

						response = problemTester.tester.test(parsedInputContent, parsedModelContent);

						const t1 = performance.now();
						_elapsedTime = t1 - t0;
					}
					catch (error)
					{
						console.log(`___ ___ [Fail] The test ${currentTest.input} received errors.`);
						console.log("_________________________________________________");
						console.log(error);
						console.log("_________________________________________________");
					}

					let testFailed = false;

					if (response.length !== parsedModelContent.length)
					{
						testFailed = true;
						testGroupFailed = true;
					}

					for (let index = 0; index < response.length; ++index)
					{
						if (!deepCompare(response[index], parsedModelContent[index]))
						{
							testFailed = true;
							testGroupFailed = true;
							break;
						}
					}


					if (verbose)
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

					if (breakOnError && testFailed)
					{
						break;
					}
				}


				if (testGroupFailed)
				{
					console.log("\x1b[31m%s\x1b[0m", "___ [Fail]", "The test group failed!");
				}
				else
				{
					console.log("\x1b[32m%s\x1b[0m", "___ [Succes]", "No problems detected in the test group.");
				}
			}
		}
	}
}


runTests({
	verbose: true,
	breakOnError: true,
});
