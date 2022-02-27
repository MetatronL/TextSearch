export default class TrieNode
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
	}

	increaseInnerCounter()
	{
		this.innerCounter += 1;
	}

	decreaseInnerCounter()
	{
		this.innerCounter -= 1;

		if (this.innerCounter < 0)
		{
			this.innerCounter = 0;
		}
	}

	increaseFinalCounter()
	{
		this.finalCounter += 1;
	}

	decreaseFinalCounter()
	{
		this.finalCounter -= 1;

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
				this.removeNextNode(symbol);
			}

			return;
		}

		throw new Error("TrieNode: The requested symbol to be decreased not found.");
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
