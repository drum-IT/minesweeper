const printBoard = board => {
	console.log(board.map(row => row.join(' | ')).join('\n'));
}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
		//this while loop will place all bombs. Currently, bombs can be overwritten.
		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] == null) {
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

let playerBoard = generatePlayerBoard(10, 10);
let bombBoard = generateBombBoard(10, 10, 30);
console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);
