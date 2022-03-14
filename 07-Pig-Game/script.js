"use strict";

//SELECTING ELEMENTS
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
//another way of selecting elements by id.
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;

// At the start of the game.

const init = function () {
  score = [0, 0]; //start score of both player
  currentScore = 0; //It's a global varialble so kept it outside of handler function
  activePlayer = 0; //Since we start with player0
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active"); //Toggle: remove if present
  player1El.classList.toggle("player--active"); // Toggle: add if not
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //Manipulating source of img

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//HOLD BTN FUNCTIONALITY
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.toggle("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

// btnNew.addEventListener("click", function () {
// playing = true;
// console.log(activePlayer);
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.remove("player--winner");
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.add("player--active");
// if (activePlayer === 0) {
//   switchPlayer();
//   switchPlayer();
// } else {
//   switchPlayer();
// }
// score[0] = 0;
// score0El.textContent = score[0];
// score[1] = 0;
// score1El.textContent = score[1];

// });
