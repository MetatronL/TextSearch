import basicTestGroup from "./basic/index.js";
import { parseInputFile, parseModelFile } from "./parseFiles.js";

export default {
	testGroups: {
		basic: basicTestGroup,
	},
	parseInput: parseInputFile,
	parseModel: parseModelFile,
	name: "textPatterns",
};
