const Trie = require("./trie.js");

function tester(arrInputLines)
{
    const _trie = new Trie();
    const arrReponse = [];

    for (const arrLine of arrInputLines)
    {
        // console.log("___ ____", arrLine[0], arrLine[1]);
        let currentResponse = null;
        

        if (arrLine[0] === "0")
        {
            currentResponse = _trie.addWord(arrLine[1]);
        }
        else if (arrLine[0] === "1")
        {
            currentResponse = _trie.deleteWord(arrLine[1]);
        }
        else if (arrLine[0] === "2")
        {
            currentResponse = _trie.countWord(arrLine[1]);
        }
        else if (arrLine[0] === "3")
        {
            currentResponse =  _trie.maxCommonLength(arrLine[1]);
        }

        if (currentResponse !== null)
        {
            arrReponse.push(currentResponse);
        }
    }

    return arrReponse;
}


module.exports = tester;