"use strict";
/*
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "🎉 Correct number!";

document.querySelector(".guess").value = 10;
document.querySelector(".score").textContent = 21;
*/

const displayMessage = function (message) {
  return (document.querySelector(".message").textContent = message);
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber); //remove this after testing.
let score = 20;
let highscore = 0;

//Math.random() genretes no. b/w 0 to 1 but so we multiplied with 20 and Math.trunc cuts decimal part so we
//added 1 here.

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("‼️ No Number");
  } else if (guess === secretNumber) {
    // document.querySelector(".message").textContent = "Right Hai Boss! 🎉";
    displayMessage("Right Hai Boss! 🎉");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess > secretNumber ? "Too High !" : "Too Low !";
      displayMessage(guess > secretNumber ? "Too High !" : "Too Low !");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("😿 You lost the Game!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // console.log(secretNumber); //remove this after testing.
  document.querySelector(".guess").value = "";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
});
