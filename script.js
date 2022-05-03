'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //score elements
const score1El = document.getElementById('score--1'); //this method allows for just the id name
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
//starting positions
let activePlayer = 0,
  scores = [0, 0],
  playing = true,
  currentScore = 0;
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const init = function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};
diceEl.classList.add('hidden');
//rolling dice functionality
init();
rollDiceBtn.addEventListener('click', function () {
  //removing starting hidden
  if (playing) {
    diceEl.classList.remove('hidden');
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    //Player 0's rolls

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }

    //need to generate and display random dice, and check for 1
    //if (1) switch to new player
    else {
      currentScore = 0;
      switchPlayer();
    }
  }
});
holdBtn.addEventListener('click', function () {
  //get the score and set it in the array
  if (playing) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 50) {
      //need to end game here.
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    }
    //display the new score and switch players.
    else {
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
