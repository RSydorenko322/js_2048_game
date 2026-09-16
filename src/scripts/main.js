'use strict';

// IMPORT GAME-CLASS
const Game = require('../modules/Game.class');
const game = new Game();

window.game = game;

// ALL FOUND DOM-ELEMENTS
const startBtn = document.querySelector('.start');

// ALL FUNCTION DECLARATIONS

function handleStart() {
  game.start();
  renderBoard();
}

function renderBoard() {
  // get currentState - 2D array
  // start 2 nested forEach loops with indexes
  // find all DOM-rows
  // find all DOM-cells
  // use indexes from the loops to find appropriate element from state var
  // depending on if stateElement is equal to 0
  // add textContent and class basing on the number of the state var
  const state = game.getState();
  const allRows = document.querySelectorAll('.field-row');

  allRows.forEach((rowEl, rowIndex) => {
    const cells = rowEl.querySelectorAll('.field-cell');

    cells.forEach((cell, cellIndex) => {
      const stateElement = state[rowIndex][cellIndex];

      if (stateElement !== 0) {
        cell.className = `field-cell field-cell--${stateElement}`;
        cell.textContent = stateElement;
      } else {
        cell.className = 'field-cell';
        cell.textContent = '';
      }
    });
  });
}

// ALL EVENT LISTENERS
startBtn.addEventListener('click', handleStart);

document.addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    return;
  }

  // remember the state of currentState
  const stateBefore = JSON.stringify(game.getState());

  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
  }

  const stateAfter = JSON.stringify(game.getState());

  if (stateBefore !== stateAfter) {
    game.createNewCell();
    renderBoard();
  }
});
