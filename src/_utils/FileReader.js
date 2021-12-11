const fs = require("fs");


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
            flag: this.flagm
        });
    }


}

module.exports = FileReader;

// const _fileReader = new FileReader();
// _fileReader.readInputFileSync("D:/github/TextSearch/src/trie/tests/basic/grader_test3.in");