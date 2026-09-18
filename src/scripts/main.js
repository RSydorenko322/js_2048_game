'use strict';

// IMPORT GAME-CLASS
const Game = require('../modules/Game.class');
const game = new Game();

window.game = game;

// ALL FOUND DOM-ELEMENTS
const allRows = document.querySelectorAll('.field-row');
const startBtn = document.querySelector('.start');
const scoreTracer = document.querySelector('.game-score');
const messageStart = document.querySelector('.message-start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messagePlaying = document.querySelector('.message-playing');

// ALL FUNCTION DECLARATIONS
function render() {
  const state = game.getState();

  allRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('.field-cell');

    cells.forEach((cell, cellIndex) => {
      const stateElement = state[rowIndex][cellIndex];

      cell.className = 'field-cell';

      if (stateElement !== 0) {
        cell.classList.add(`field-cell--${stateElement}`);
        cell.textContent = stateElement;
      } else {
        cell.textContent = '';
      }
    });
  });

  scoreTracer.textContent = game.getScore();

  if (game.getCountSteps() === 0) {
    startBtn.className = 'button start';
    startBtn.textContent = 'Start Game';
  } else {
    startBtn.className = 'button restart';
    startBtn.textContent = 'Restart Game';
  }

  renderMessage();
}

function renderMessage() {
  messageStart.classList.add('hidden');
  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');
  messagePlaying.classList.add('hidden');

  switch (game.getStatus()) {
    case 'win':
      messageWin.classList.remove('hidden');
      break;
    case 'lose':
      messageLose.classList.remove('hidden');
      break;
    case 'idle':
      messageStart.classList.remove('hidden');
      break;
    case 'playing':
      messagePlaying.classList.remove('hidden');
      break;

    default:
      break;
  }
}

function handleStart() {
  if (game.getStatus() === 'idle') {
    game.start();
  } else {
    game.restart();
  }

  render();
}

// ALL EVENT LISTENERS
startBtn.addEventListener('click', handleStart);

document.addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    return;
  }

  if (game.getStatus() !== 'playing') {
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
    game.stepsIncrement();
    render();
  }
});
