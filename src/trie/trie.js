import TrieNode from "./TrieNode.js";

export default class Trie
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
				pathLength += 1;
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
			throw new Error("Trie: The word requested to be 'deleted' is not present in the structure.");
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

		return lastNode.getFinalCounter();
	}

	maxCommonLength(strWord)
	{
		const [lastNode, pathLength] = this._goToLastNode(strWord);

		return pathLength;
	}
}

