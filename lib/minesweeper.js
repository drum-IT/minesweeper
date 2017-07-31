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
		if (board[randomRowIndex][randomColumnIndex] == null) {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}
	return board;
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player board:');
printBoard(playerBoard);
console.log('Bomb board:');
printBoard(bombBoard);