"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); //href = '#' so page refreshed as we clicked open account
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)  //Replaced by above code
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
//Button Scrolling

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect(); //section1 coordiantes

  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //btnScrollTo.getBoundingClinetRect()
  console.log("Current scroll X/Y:", window.pageXOffset, window.pageYOffset);
  console.log(
    "Viewport Height/width:",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" }); //Only works in very modern browsers.
});

/////////////////////////////////////
//Page Navigation

//common practice : using forEach for each element
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href"); //#section--1
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//Using EVENT DELEGATION
//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target); //where that event happened.
  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href"); //#section--1
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////
//Tabbed component

//Using event delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); //try clicking number on tab button without using closest.

  //Guard clause
  if (!clicked) return;

  //Remove active tabs & content area
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));

  //Activate tabs & content area
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////////////////////////
//Menu Fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5)); //Passing arguement into handler

nav.addEventListener("mouseout", handleHover.bind(1));

//Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();

// console.log(initialCoords);
// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   if (window.sc9rollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

//Sticky Navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };

// const obsOptions = {
//   root: null, //intersecting with root , it can be any other element or null for viewport
//   threshold: [0, 0.2], //callback triggers when target element completely disappear or at 20% of it on viewport
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal Section
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//Lazy loading images///////
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src attribute
  entry.target.src = entry.target.dataset.src; //this happens behind the scenes, becoz of that we need load event
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img"); //remove lazy img once the loading is completed
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

///////Slider////////
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const slider = document.querySelector(".slider");
  // slider.style.overflow = "visible";

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset; //object destructuring
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

/*
//Selecting elements////

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1"); //live HTML collection of element
const allBtuttons = document.getElementsByTagName("button"); //live HTML collection of all button element
console.log(allBtuttons);

console.log(document.getElementsByClassName("btn")); //Live HTML collections

//Creating and Inserting elements////
//.insertAdjacentElement //to insert

const message = document.createElement("div"); //created an dom element but not yet in DOM
message.classList.add("cookie-message");
// message.textContent = "We use cookie to improve functionality and analytics.";
message.innerHTML =
  "We use cookie to improve functionality and analytics. <button class = 'btn btn--close-cookie'>Got it!</button>";

// header.prepend(message);
header.append(message); //can't copy same element multiple times
// header.append(message.cloneNode(true)); //so we have to clone it
// header.before(message);
// header.after(message);

//Delete elements////
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(); //remove is a new method
    // message.parentElement.removeChild(message) //before remove, It's DOM traversing
  });

//Styles////
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.backgroundColor);
console.log(message.style.height); //No output as we didn't set it manually
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

//Attrubutes////
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute("src")); //to get the path of the src file
console.log(logo.className); //not class , className
console.log(logo.id);
logo.alt = "Beautiful Minimalist logo";
//Non-standard
console.log(logo.getAttribute("designer")); //If not standard attribute
logo.setAttribute("company", "Bankist"); //setting non-standards attributes

const link = document.querySelector(".btn--show-modal");
console.log(link.href);
console.log(link.getAttribute("href"));

//Data attributes
console.log(logo.dataset.versionNumber); //data-version-number="3.0" This is attribute in html

//Classes
logo.classList.add("a");
logo.classList.remove("a");
logo.classList.toggle("a");
console.log(logo.classList.contains("a"));
*/

/*
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListner: Great! You are reading the heading:D");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

//Another way of attaching an event to an element
// h1.onmouseenter = function (e) {
//   alert("addEventListner: Great! You are reading the heading:D");
// };
*/

/*
///Event Propgation
//rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget); //If we click only on the features link(individual), color changes for all the parent elements where we have attached a click event, It's because of Bubbling up, until we stop this propogation.
  // e.stopPropagation(); //Stopped propogation.
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget); //e.target is still the link we clicked but current target is element attached with event handler.
});
document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  },
  false //This events on parent element happened during bubbling up, but if we set caputuring to True this will happen while capturing phase and before target event, Read on console log
);
*/

/*
////////////DOM Traversing
const h1 = document.querySelector("h1");

//1.Going downwards : child
console.log(h1.querySelectorAll(".highlight")); //[span.highlight, span.highlight]
console.log(h1.childNodes); //[text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); //[span.highlight, br, span.highlight]
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

//2.Going Upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

//If there are multiple element with class header but we have to select closest to h1 element.
h1.closest(".header").style.background = "var(--gradient-secondary)";
h1.closest("h1").style.background = "var(--gradient-primary)";

//3.Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = "scale(0.5)";
//   }
// });
*/

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
