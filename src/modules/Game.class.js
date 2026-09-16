'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */

  static initState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  constructor(initialState = Game.initState) {
    // eslint-disable-next-line no-console
    this.initialState = structuredClone(initialState);
  }

  moveLeft() {
    this.initialState = this.initialState.map((row) => {
      // Remove all zeros from the row
      // Use merge method with row arguement without zeros
      const rowFiltered = row.filter((cell) => cell !== 0);
      const mergedCells = this.mergeCells(rowFiltered);

      // Adding zeros back to an array untill we have the original length
      do {
        mergedCells.push(0);
      } while (mergedCells.length < 4);

      return mergedCells;
    });
  }

  moveRight() {
    // Copy, reverse and save every row from the original array of arrays
    // Remove all zeros from the row
    // Use merge method with row arguement without zeros
    // Use reverse again
    this.initialState = this.initialState.map((row) => {
      const rowReversed = [...row].reverse();
      const rowFiltered = rowReversed.filter((cell) => cell !== 0);
      const mergedCells = this.mergeCells(rowFiltered);

      while (mergedCells.length < 4) {
        mergedCells.push(0);
      }

      return mergedCells.reverse();
    });
  }

  moveUp() {
    // Create 4 arrays as 4 columns, save them in the columns var
    // Use forEach method for initialState arrays, itarating every cell
    // Push every cell from a certain row to columns var to have 4 full columns
    const columns = [[], [], [], []];

    this.initialState.forEach((row) => {
      row.forEach((cell, indexCell) => {
        columns[indexCell].push(cell);
      });
    });

    // For columns we itarate every cell and remove all zeros
    // Merge same 2 cells
    // Save the result in the variable processedColumns
    const processedColumns = columns.map((row) => {
      const rowFiltered = row.filter((cell) => cell !== 0);
      const mergedCells = this.mergeCells(rowFiltered);

      // add zeros untill having the original array`s length
      do {
        mergedCells.push(0);
      } while (mergedCells.length < 4);

      return mergedCells;
    });

    // shift columns back into rows to change the original initialState
    const newRows = [[], [], [], []];

    processedColumns.forEach((column) => {
      column.forEach((cell, index) => {
        newRows[index].push(cell);
      });
    });

    //  change the original initialState
    this.initialState = newRows;
  }

  moveDown() {
    // same proceduse as in moveUp() method, but with reverse()
    const columns = [[], [], [], []];

    this.initialState.forEach((row) => {
      row.forEach((cell, indexCell) => {
        columns[indexCell].push(cell);
      });
    });

    const processedColumns = columns.map((row) => {
      const rowReversed = [...row].reverse();
      const rowFiltered = rowReversed.filter((cell) => cell !== 0);
      const mergedCells = this.mergeCells(rowFiltered);

      while (mergedCells.length < 4) {
        mergedCells.push(0);
      }

      return mergedCells.reverse();
    });

    const newRows = [[], [], [], []];

    processedColumns.forEach((column) => {
      column.forEach((cell, index) => {
        newRows[index].push(cell);
      });
    });

    this.initialState = newRows;
  }

  /**
   * @returns {number}
   */
  getScore() {}

  /**
   * @returns {number[][]}
   */
  getState() {
    // making copy of initialState and return it as currentStte
    const currentState = this.initialState.map((row) => [...row]);

    return currentState;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    // refresh initialState
    this.initialState = structuredClone(Game.initState);

    const [rowIndex1, cellIndex1] = this.getIndex();

    let rowIndex2;
    let cellIndex2;

    // getting second random index
    // get the second index untill its different from the first one
    do {
      [rowIndex2, cellIndex2] = this.getIndex();
    } while (rowIndex1 === rowIndex2 && cellIndex1 === cellIndex2);

    // set 2 by default
    this.initialState[rowIndex1][cellIndex1] = 2;
    this.initialState[rowIndex2][cellIndex2] = 2;

    // return row-index, cell-index and value 2 to start start cells with
    return [
      [rowIndex1, cellIndex1, 2],
      [rowIndex2, cellIndex2, 2],
    ];
  }

  /**
   * Resets the game.
   */
  restart() {}

  getIndex() {
    // Getting 2 random indexes of row and cell to be appeared
    const randomRowIndex = Math.floor(Math.random() * this.initialState.length);
    const randomCellIndex = Math.floor(
      Math.random() * this.initialState[randomRowIndex].length,
    );

    return [randomRowIndex, randomCellIndex];
  }

  mergeCells(row) {
    // Merging 2 same cells while moving them to each other
    const result = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] === row[i + 1]) {
        result.push(row[i] * 2);
        i++;
      } else {
        result.push(row[i]);
      }
    }

    return result;
  }

  getRandomValue() {
    // random 2 or 4 cell
    const value = Math.random() > 0.9 ? 4 : 2;

    return value;
  }

  createNewCell() {
    // 1. get random (2 or 4) number 90%-10%
    // 2. check all the empty cells
    // 3. push indexes of all empty cells in the new array;
    const allEmptyCells = [];
    const randomValue = this.getRandomValue();

    this.initialState.forEach((currentRow, indexRow) => {
      currentRow.forEach((currentCell, indexCell) => {
        if (currentCell === 0) {
          allEmptyCells.push([indexRow, indexCell]);
        }
      });
    });

    // 1. check if there are some free cells
    if (allEmptyCells.length === 0) {
      return null;
    }

    // 1. find random element from the array of indexes
    const randomIndex = Math.floor(Math.random() * allEmptyCells.length);
    const randomCellIndexes = allEmptyCells[randomIndex];

    // destructurizing
    const [row, cell] = randomCellIndexes;

    // 1. find appropriate element from initialState
    // 2. change it with 2/4 (depends on random)
    // 3. add 2/4 as the third arguement to row/cell indexes to return
    this.initialState[row][cell] = randomValue;

    return [row, cell, randomValue];
  }
}

module.exports = Game;
