import fs from "fs";


class FileReader
{
	constructor({
		files: fileNames = null,
		encoding = "utf8",
		flag = "r",
	} = {})
	{
		this.fileNames = fileNames;
		this.encoding = encoding;
		this.flag = flag;
	}


	readInputFileSync(strFilePath)
	{
		return fs.readFileSync(strFilePath, {
			encoding: this.encoding,
			flag: this.flagm,
		});
	}
}

export default FileReader;
