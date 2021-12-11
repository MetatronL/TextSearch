const path = require("path");

const FileReader = require("../src/_utils/FileReader.js");
const configurationTrie = require("../src/trie/index.js");


const arrProblemsMetadata = [
    configurationTrie,
];

function runTests()
{
    for (const problem of arrProblemsMetadata)
    {
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

            const arrFileNames = new Array(indexEnd - indexStart + 1).fill(prefix).map((fileName, indexArray) => `${fileName}${indexStart + indexArray}`);

            // const arrInputFileNames = arrFileNames.map((fileName) => `${fileName}.${inputExtension}`);
            const arrTestCases = arrFileNames.map((fileName) => ({
                input: `${fileName}.${inputExtension}`,
                model: `${fileName}.${outputExtension}`
            }));


            const fileReader = new FileReader();

            for (const testCase of arrTestCases)
            {
                const _pathToInputFile = path.resolve(problem.path, "tests", testGroupName, testCase.input);
                const mxInputFileContent = fileReader.readInputFileSync(_pathToInputFile);
                const parsedInputContent = problem.parseInput(mxInputFileContent);

                const _pathToModelFile = path.resolve(problem.path, "tests", testGroupName, testCase.model);
                const mxModelFileContent = fileReader.readInputFileSync(_pathToModelFile);
                const parsedModelContent = problem.parseModel(mxModelFileContent);

                let response = null;

                try
                {
                    response = problem.tester(parsedInputContent);
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
                }

                for (let index = 0; index < response.length; ++index)
                {
                    if (response[index] !== parsedModelContent[index])
                    {
                        testFailed = true;
                        break;
                    }
                }

                if (testFailed)
                {
                    console.log(`___ ___ [Fail] Problems detected in: ${testCase.input}`);
                    
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
                    console.log(`___ ___ [Succes] No problems detected in: ${testCase.input}`);
                }
            }
        }
    }
}


module.exports = null;

runTests();