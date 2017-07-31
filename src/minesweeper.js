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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
	console.log(neighborOffsets);
	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;
	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
				console.log('Bombs: ' + numberOfBombs);
			}
		}
		
	});
	return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] != ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B'
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
}

let playerBoard = generatePlayerBoard(10, 10);
let bombBoard = generateBombBoard(10, 10, 30);
console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated player board: ');
printBoard(playerBoard);
