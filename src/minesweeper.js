class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}
	playMove(rowIndex, columnIndex) {
		this._board.flipTile(rowIndex, columnIndex);
		if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
			console.log('Bomb! You lose!');
			this._board.print();
		} else if (this._board.hasSafeTiles === false) {
			console.log('No tiles left! You win!');
		} else {
			console.log('Current board:');
			this._board.print();
		}
	}
}

class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}
	get playerBoard() {
		return this._playerBoard;
	}
	flipTile(rowIndex, columnIndex) {
		if (this._playerBoard[rowIndex][columnIndex] != ' ') {
			console.log('This tile has already been flipped!');
			return;
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B'
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}
		this._numberOfTiles--;
	}
	getNumberOfNeighborBombs(rowIndex, columnIndex) {
		const neighborOffsets = [];
		for (let i = 0; i < 8; i++) {
			neighborOffsets.push([]);
		}
		for (let offset = 0; offset < neighborOffsets.length; offset++) {
			if (offset < 3) {
				neighborOffsets[offset][0] = -1;
				for (let i = 0; i < 3; i++) {
					neighborOffsets[i][1] = i - 1;
				}
			} else if (offset < 5) {
				neighborOffsets[offset][0] = 0;
				let column = -1;
				for (let i = 3; i < 5; i++) {
					neighborOffsets[i][1] = column;
					column += 2;
				}
			}else if (offset < 8) {
				neighborOffsets[offset][0] = 1;
				let column = -1;
				for (let i = 5; i < 8; i++) {
					neighborOffsets[i][1] = column;
					column++;
				}
			}
		}
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;
		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});
		return numberOfBombs;
	}
	hasSafeTiles() {
		return this._numberOfTiles === this._numberOfBombs;
	}
	print() {
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	}
	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];
		for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
			let row = [];
			for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}
	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];
		for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
			let row = [];
			for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
				row.push(null);
			}
			board.push(row);
		}
		let numberOfBombsPlaced = 0;
		while (numberOfBombsPlaced < numberOfBombs) {
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if (board[randomRowIndex][randomColumnIndex] != 'B') {
				board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced++;
			}
		}
		for (let row = 0; row < numberOfRows; row++) {
			for (let i = 0; i < numberOfColumns; i++) {
				if (board[row][i] == null) {
					board[row][i] = ' ';
				}
			}
		}
		return board;
	}
}

const g = new Game(3, 3, 3);
g.playMove(0,0);