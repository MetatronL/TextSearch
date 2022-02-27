// eslint-disable-next-line import/extensions
import { CreateTestGroupMetadata } from "../../../_utils/Metadata.js";

export default new CreateTestGroupMetadata({
	prefix: "grader_test",
	indexStart: 0,
	indexEnd: 20,
	inputExtension: "in",
	outputExtension: "ok",
});
