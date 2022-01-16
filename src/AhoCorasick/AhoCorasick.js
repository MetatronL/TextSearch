class AhoCorasickNode
{
    constructor(symbol = null, parentNode = null)
    {
        this.next = [];
        this.symbol = symbol;
        this.parentNode = parentNode;
        this.fail = null;
        this.count = 0;
        this.word = null;
    }

    markAsRoot()
    {
        this.fail = this;
    }

    markNodeAsLeaf(strWord)
    {
        this.word = strWord;
    }

    addNextSymbol(symbol)
    {
        if (!(this.next[symbol] instanceof AhoCorasickNode))
        {
            this.next[symbol] = new AhoCorasickNode(symbol, this);
        }

        return this.next[symbol];
    }

    computeSuffixLink(rootNode)
    {
        if (this === rootNode)
        {
            throw new Error("[Internal] Can't compute the sufix link of the root node!");   
        }

        let ancestorNode = this.parentNode;


        let failNode = ancestorNode.fail;

        while (!failNode.next[this.symbol] && failNode !== rootNode)
        {
            failNode = failNode.fail;
        }

        if (failNode !== ancestorNode && failNode.next[this.symbol])
        {
            failNode = failNode.next[this.symbol];
        }
        
        this.fail = failNode;
    }
}

class AhoCorasick
{
    constructor()
    {
        this.root = new AhoCorasickNode(null, null);
        this.root.markAsRoot();
        this.treeLeafs = [];
        this.queue = [];
    }

    addWord(strWord)
    {
        let _currentNode = this.root;

        for (const symbol of strWord)
        {
            _currentNode = _currentNode.addNextSymbol(symbol);
        }

        _currentNode.markNodeAsLeaf(strWord);
        this.treeLeafs.push(_currentNode);

        return null;
    }

    prepareAutomaton()
    {
        let _start = 0;

        const addToQueue = (ahoCorasickNode) => {
            this.queue.push(ahoCorasickNode);
        };

        addToQueue(this.root);

        while (_start !== this.queue.length)
        {
            const currentNode = this.queue[_start];
            _start += 1;

            if (currentNode !== this.root)
            {
                currentNode.computeSuffixLink(this.root);
            }

            for (const nextNode of Object.values(currentNode.next))
            {
                addToQueue(nextNode);
            }
        }
    }

    matchText(strText)
    {
        let currentNode = this.root;

        for (const symbol of strText)
        {
            while (!currentNode.next[symbol] && currentNode !== this.root)
            {
                currentNode = currentNode.fail;
            }

            if (currentNode.next[symbol])
            {
                currentNode = currentNode.next[symbol];
            }

            currentNode.count += 1;
        }


        for (let index = this.queue.length - 1; index >= 0; --index)
        {
            const currentNode = this.queue[index];

            if (currentNode.fail && currentNode.fail !== this.root)
            {
                currentNode.fail.count += currentNode.count;
            }
        }

        return this.treeLeafs.map((ahoCorasickNode) => ahoCorasickNode.count);
    }
}

module.exports = AhoCorasick;