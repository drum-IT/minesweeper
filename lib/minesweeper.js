'use strict';

var printBoard = function printBoard(board) {
	console.log(board.map(function (row) {
		return row.join(' | ');
	}).join('\n'));
};

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
	var board = [];
	for (var rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
		var row = [];
		for (var columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
	var board = [];
	for (var rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
		var row = [];
		for (var columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
			row.push(null);
		}
		board.push(row);
	}
	var numberOfBombsPlaced = 0;
	while (numberOfBombsPlaced < numberOfBombs) {
		//this while loop will place all bombs. Currently, bombs can be overwritten.
		var randomRowIndex = Math.floor(Math.random() * numberOfRows);
		var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] != 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}
	for (var _row = 0; _row < numberOfRows; _row++) {
		for (var i = 0; i < numberOfColumns; i++) {
			if (board[_row][i] == null) {
				board[_row][i] = ' ';
			}
		}
	}
	return board;
};

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
	var neighborOffsets = [];
	for (var i = 0; i < 8; i++) {
		neighborOffsets.push([]);
	}
	for (var offset = 0; offset < neighborOffsets.length; offset++) {
		if (offset < 3) {
			neighborOffsets[offset][0] = -1;
			for (var _i = 0; _i < 3; _i++) {
				neighborOffsets[_i][1] = _i - 1;
			}
		} else if (offset < 5) {
			neighborOffsets[offset][0] = 0;
			var column = -1;
			for (var _i2 = 3; _i2 < 5; _i2++) {
				neighborOffsets[_i2][1] = column;
				column += 2;
			}
		} else if (offset < 8) {
			neighborOffsets[offset][0] = 1;
			var _column = -1;
			for (var _i3 = 5; _i3 < 8; _i3++) {
				neighborOffsets[_i3][1] = _column;
				_column++;
			}
		}
	}
	console.log(neighborOffsets);
	var numberOfRows = bombBoard.length;
	var numberOfColumns = bombBoard[0].length;
	var numberOfBombs = 0;
	neighborOffsets.forEach(function (offset) {
		var neighborRowIndex = rowIndex + offset[0];
		var neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
				console.log('Bombs: ' + numberOfBombs);
			}
		}
	});
	return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
	if (playerBoard[rowIndex][columnIndex] != ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

var playerBoard = generatePlayerBoard(10, 10);
var bombBoard = generateBombBoard(10, 10, 30);
console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated player board: ');
printBoard(playerBoard);