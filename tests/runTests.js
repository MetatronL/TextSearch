const path = require("path");
const {  performance } = require('perf_hooks');
const deepCompare = require("./deepCompare");


const FileReader = require("../src/_utils/FileReader.js");
const configurationTrie = require("../src/Trie");
const configurationKMP = require("../src/KMP");

const arrProblemsMetadata = [
    configurationTrie,
    configurationKMP,
];

function runTests({
    verbose = false,
    breakOnError = false,
} = {})
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

    for (const problem of arrProblemsMetadata)
    {
        if (testConfig.name && testConfig.name !== problem.name)
        {
            continue;
        }

        console.log("");
        console.log(`Running the tests for: ${problem.name || "N/A"}.`);

        const { tests } = problem;
        const { testGroups } = tests;

        for (const [testGroupName, testGroup] of  Object.entries(testGroups))
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

            // const arrInputFileNames = arrFileNames.map((fileName) => `${fileName}.${inputExtension}`);
            const arrTestCases = arrFileNames.map((fileName) => ({
                input: `${fileName}.${inputExtension}`,
                model: `${fileName}.${outputExtension}`
            }));


            const fileReader = new FileReader();

            let testGroupFailed = false;

            for (const testCase of arrTestCases)
            {
                const _pathToInputFile = path.resolve(problem.path, "tests", testGroupName, testCase.input);
                const mxInputFileContent = fileReader.readInputFileSync(_pathToInputFile);
                const parsedInputContent = problem.parseInput(mxInputFileContent);

                const _pathToModelFile = path.resolve(problem.path, "tests", testGroupName, testCase.model);
                const mxModelFileContent = fileReader.readInputFileSync(_pathToModelFile);
                const parsedModelContent = problem.parseModel(mxModelFileContent);

                let response = null;
                let _elapsedTime = 0;

                try
                {
                    const t0 = performance.now();

                    response = problem.tester(parsedInputContent, parsedModelContent);

                    const t1 = performance.now();
                    _elapsedTime = t1 - t0;
                }
                catch (error)
                {
                    console.log(`___ ___ [Fail] The test ${testCase.input} received errors.`);
                    console.log("_________________________________________________")
                    console.log(error);
                    console.log("_________________________________________________")
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
                        console.log('\x1b[31m%s\x1b[0m', "___ ___ [Fail]", `Problems detected in: '${testCase.input}'.`);
                        
                        if (parsedModelContent.length < 32)
                        {
                            console.log("_________________________________________________")
                            console.log(response);
                            console.log("model");
                            console.log(parsedModelContent);
                            console.log("_________________________________________________")
                        }
                    }
                    else
                    {
                        console.log('\x1b[32m%s\x1b[0m', '___ ___ [Succes]', `No problems detected in: '${testCase.input}'. Elapsed time: ${_elapsedTime.toFixed(2)} ms.`);
                    }
                }

                if (breakOnError && testFailed)
                {
                    break;
                }
            }


            if (testGroupFailed)
            {
                console.log('\x1b[31m%s\x1b[0m', "___ [Fail]", "The test group failed!");
            }
            else
            {
                console.log('\x1b[32m%s\x1b[0m', '___ [Succes]', "No problems detected in the test group.");
            }
        }
    }
}


module.exports = null;

runTests({
    verbose: true,
    breakOnError: true,
});