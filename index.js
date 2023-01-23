import './style.css';

let allBoxs = document.querySelectorAll('.box');
let clear = document.querySelector('#clear');
let winStatus = document.querySelector('#winStatus');
const x = '❌';
const o = '⭕';
let continueGame = true;
//all winning conditions
const winningProbability = [
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [0, 1, 2],
];
let players = 'Player1';
let currentPlayer = x;
let arrays = ['', '', '', '', '', '', '', '', ''];
init();

function init() {
  allBoxs.forEach((box) => box.addEventListener('click', boxClick));
  clear.addEventListener('click', restartGame);
  continueGame = true;
}

function boxClick() {
  const index = this.dataset.column;
  if (arrays[index] != '' || !continueGame) {
    debugger;
    return;
  }
  updateGame(this, index);
  winner();
}

function updateGame(selectedBox, index) {
  arrays[index] = players;
  selectedBox.innerHTML = currentPlayer;
}

function changePlayer() {
  players = players == 'Player1' ? 'Player2' : 'Player1';
  currentPlayer = currentPlayer == x ? o : x;
}

function winner() {
  for (let i = 0; i < winningProbability.length; i++) {
    const condition = winningProbability[i];
    const data1 = arrays[condition[0]];
    const data2 = arrays[condition[1]];
    const data3 = arrays[condition[2]];
    if (data1 == '' || data2 == '' || data3 == '') {
      continue;
    }
    if (data1 == data2 && data2 == data3) {
      let winnerPlayer = (winStatus.textContent = `Won ==> ${players}`);
      continueGame = false;
      alert(winnerPlayer);
    } else if (!arrays.includes('')) {
      winStatus.textContent = `Game Draw`;
      continueGame = false;
    }
  }
  changePlayer();
}

function restartGame() {
  debugger;
  arrays = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = x;
  players = 'Player1';
  continueGame = true;
  winStatus.textContent = `Start Now`;
  allBoxs.forEach((box) => {
    box.innerHTML = '?';
  });
}
