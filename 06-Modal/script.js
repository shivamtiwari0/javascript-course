"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal"); // To select various element with same class we have to use querySelectorAll method on document.
//Expression above gives a list object.
console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", function () {
    console.log("button clicked");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
//Used closeModal without parenthesis so it'll not call the function

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //It's a global event so we have to EventListner on document object 'it has 3 types keypress, keydown, keyup.
  console.log(e.key); //e event gives an object so e.key give value
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
