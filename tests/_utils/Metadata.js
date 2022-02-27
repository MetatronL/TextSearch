export function CreateTestGroupMetadata({
	prefix = "test",
	indexStart = null,
	indexEnd = null,
	inputExtension = "in",
	outputExtension = "out",
} = {})
{
	this.prefix = prefix;
	this.indexStart = indexStart;
	this.indexEnd = indexEnd;
	this.inputExtension = inputExtension;
	this.outputExtension = outputExtension;
	this.prefix = prefix;
}
