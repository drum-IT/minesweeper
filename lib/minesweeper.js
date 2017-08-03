'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Game);

		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Game, [{
		key: 'playMove',
		value: function playMove(rowIndex, columnIndex) {
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
	}]);

	return Game;
}();

var Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] != ' ') {
				console.log('This tile has already been flipped!');
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

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
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;
			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles === this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
				var row = [];
				for (var columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
		}
	}]);

	return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 0);