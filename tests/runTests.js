import path from "path";
import { performance } from "perf_hooks";

import deepCompare from "./deepCompare.js";
import FileReader from "./_utils/FileReader.js";

import {
	configuration,
	parseCommandLine,
	logGroupFinalStatus,
	logDetailedModelComparison,
} from "./logic/index.js";


function checkInputOutputModel({
	verbose = false,
	testFileNames,
	fileReader,
	solutionTestCase,
	basePathToFiles,
	solutionConfiguration,
} = {})
{
	const _pathToInputFile = path.resolve(basePathToFiles, testFileNames.input);
	const mxInputFileContent = fileReader.readInputFileSync(_pathToInputFile);
	const mxTestInput = solutionTestCase.parseInput(mxInputFileContent);

	const _pathToModelFile = path.resolve(basePathToFiles, testFileNames.model);
	const mxModelFileContent = fileReader.readInputFileSync(_pathToModelFile);
	const mxTestModel = solutionTestCase.parseModel(mxModelFileContent);

	let mxCurrentTestOutput = null;

	let bTestFailed = false;

	const nStartTime = performance.now();
	let _elapsedTime = 0;

	try
	{
		mxCurrentTestOutput = solutionConfiguration.tester.test(mxTestInput, mxTestModel);
		_elapsedTime = performance.now() - nStartTime;
	}
	catch (error)
	{
		console.log(`___ ___ [Fail] The test ${testFileNames.input} received errors.`);
		console.log("_________________________________________________");
		console.log(error);
		console.log("_________________________________________________");
		bTestFailed = true;
	}

	if (!mxCurrentTestOutput || mxCurrentTestOutput.length !== mxTestModel.length)
	{
		bTestFailed = true;
	}
	else
	{
		for (let index = 0; index < mxCurrentTestOutput.length; index += 1)
		{
			if (!deepCompare(mxCurrentTestOutput[index], mxTestModel[index]))
			{
				bTestFailed = true;
				break;
			}
		}
	}


	if (verbose)
	{
		if (bTestFailed)
		{
			logDetailedModelComparison({
				model: mxTestModel,
				output: mxCurrentTestOutput,
				testFileNames,
			});
		}
		else
		{
			console.log("\x1b[32m%s\x1b[0m", "___ ___ [Succes]", `No problems detected in: '${testFileNames.input}'. Elapsed time: ${_elapsedTime.toFixed(2)} ms.`);
		}
	}

	return bTestFailed;
}

function runTests({
	verbose = false,
	breakOnError = false,
} = {})
{
	const testConfig = parseCommandLine();
	const fileReader = new FileReader();

	for (const solutionConfiguration of configuration)
	{
		if (testConfig.name && testConfig.name !== solutionConfiguration.tester.project.name)
		{
			continue;
		}

		const solutionIndex = solutionConfiguration.tester.project;

		console.log("");
		console.log(`Running the tests for: ${solutionIndex.name || "N/A"}.`);

		const { testCases } = solutionConfiguration;

		for (const solutionTestCase of testCases)
		{
			const { testGroups } = solutionTestCase;

			console.log(`___ Running the test case: ${solutionTestCase.name || "N/A"}.`);

			for (const [testConfigurationName, testConfiguration] of Object.entries(testGroups))
			{
				console.log(`___ ____ Running the sub-test group: ${testConfigurationName || "N/A"}.`);

				const {
					prefix,
					indexStart,
					indexEnd,
					inputExtension,
					outputExtension,
				} = testConfiguration;


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

				const arrTestFileNamesList = arrFileNames.map((fileName) => ({
					input: `${fileName}.${inputExtension}`,
					model: `${fileName}.${outputExtension}`,
				}));


				let bTestGroupFailed = false;

				const basePathToFiles = path.resolve("./tests/cases", solutionTestCase.name, testConfigurationName);

				for (const testFileNames of arrTestFileNamesList)
				{
					const bTestFailed = checkInputOutputModel({
						verbose,
						testFileNames,
						fileReader,
						solutionTestCase,
						basePathToFiles,
						solutionConfiguration,
					});

					bTestGroupFailed = bTestGroupFailed || bTestFailed;

					if (breakOnError && bTestFailed) {
						break;
					}
				}

				logGroupFinalStatus(bTestGroupFailed);
			}
		}
	}
}


runTests({
	verbose: true,
	breakOnError: true,
});
