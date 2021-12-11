class TrieNode
{
    constructor(symbol, previous = null, finalCounter = 0)
    {
        this.symbol = symbol;
        this.innerCounter = 1;
        this.finalCounter = finalCounter;
        this.next = [];
        this.previous = previous;
    }

    getSymbol()
    {
        return this.symbol;
    }

    goToPreviousNode()
    {
        return this.previous;
    };

    increaseInnerCounter()
    {
        this.innerCounter = this.innerCounter + 1;
    }

    decreaseInnerCounter()
    {
        this.innerCounter = this.innerCounter - 1;

        if (this.innerCounter < 0)
        {
            this.innerCounter = 0;
        }
    }

    increaseFinalCounter()
    {
        this.finalCounter = this.finalCounter + 1;
    }

    decreaseFinalCounter()
    {
        this.finalCounter = this.finalCounter - 1;

        if (this.finalCounter < 0)
        {
            this.finalCounter = 0;
        }
    }

    removeNextNode(symbol)
    {
        if (this.hasNextSymbol(symbol))
        {
            delete this.next[symbol];
            this.next[symbol] = undefined;
            delete this.next[symbol];
        }
    }

    getInnerCounter()
    {
        return this.innerCounter;
    }

    getFinalCounter()
    {
        return this.finalCounter;
    }

    removeOneEntryOf(symbol)
    {
        if (this.hasNextSymbol(symbol))
        {
            const nextNode = this.goToNextSymbol(symbol);
            nextNode.decreaseInnerCounter(symbol);

            if (nextNode.getInnerCounter() < 1)
            {
                this.removeNextNode(symbol)
            }

            return;
        }

        throw new Error("TrieNode: The requested symbol to be decreased not found.")
    }

    addNextSymbol(symbol)
    {
        if (!(this.next[symbol] instanceof TrieNode))
        {
            this.next[symbol] = new TrieNode(symbol, this);
        }
        else
        {
            this.next[symbol].increaseInnerCounter();
        }

        return this.next[symbol];
    }

    goToNextSymbol(symbol)
    {
        if (this.next[symbol] instanceof TrieNode)
        {
            return this.next[symbol];
        }
        
        return null;
    }

    hasNextSymbol(symbol)
    {
        return this.next[symbol] instanceof TrieNode;
    }
}

class Trie
{
    constructor()
    {
        this.root = new TrieNode(null);
    }

    addWord(strWord)
    {
        let _currentNode = this.root;

        for (const symbol of strWord)
        {
            _currentNode = _currentNode.addNextSymbol(symbol);
        }

        _currentNode.increaseFinalCounter();

        return null;
    }

    _goToLastNode(strWord)
    {
        let pathLength = 0;
        let completeWord = true;

        let _currentNode = this.root;

        for (const symbol of strWord)
        {
            if (_currentNode.hasNextSymbol(symbol))
            {
                ++pathLength;
                _currentNode = _currentNode.goToNextSymbol(symbol);
            }
            else
            {
                completeWord = false;
                break;
            }
        }

        return [_currentNode, pathLength, completeWord];
    }

    deleteWord(strWord)
    {
        const [lastNode, pathLength, completeWord] = this._goToLastNode(strWord);

        if (!completeWord)
        {
            throw new Error("Trie: The word requested to be 'deleted' is not present in the structure.")
        }

        lastNode.decreaseFinalCounter();

        let _currentNode = lastNode.goToPreviousNode();
        let previousSymbol = lastNode.getSymbol();

        while (_currentNode !== null)
        {
            _currentNode.removeOneEntryOf(previousSymbol);
            previousSymbol = _currentNode.getSymbol();
            _currentNode = _currentNode.goToPreviousNode();
        }

        return null;
    }

    countWord(strWord)
    {
        const [lastNode, pathLength, completeWord] = this._goToLastNode(strWord);

        if (!completeWord)
        {
            return 0;
        }

        // console.log(lastNode);

        return lastNode.getFinalCounter();
    }

    maxCommonLength(strWord)
    {
        const [lastNode, pathLength] = this._goToLastNode(strWord);

        return pathLength;
    }
}

module.exports = Trie;