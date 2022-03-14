"use strict";

////////////////////////////**************************************************//////////////////////////////
// const bookings = [];

// const createBooking = function (
//   flighNum,
//   numPassengers = 1,
//   price = numPassengers * 199
// ) {
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//   const booking = {
//     flighNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH230");

// //Skipping the middle parameter
// createBooking("SG972", undefined, 1000);

////////////////////////////**************************************************//////////////////////////////

// const flight = "LH234";
// const shivam = {
//   name: "Shivam Tiwari",
//   passport: 248249489802,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH111";

//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === 248249489802) {
//     alert("Checked In!");
//   } else {
//     alert("Wrong passport!");
//   }
// };

// checkIn(flight, shivam);
// console.log(flight); //'Flight' remians the same('flightNum' is changed) as it's primitive type of datatype. Assigning new value to 'flightNum' points to a new diffrent address for flightNum in stack.
// console.log(shivam); //But name is changed as it's in a object and both shivam and passengere points to same address in heap.

////////////////////////////********************************//////////////////////////////

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000000);
// };

// newPassport(shivam);
// checkIn(flight, shivam);

////////////////////////////********************************//////////////////////////////

//HIGHER ORDER FUNCTIONS = Function that receives funcitons as parameter or return a function or BOTH
/*
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//Higher order
const tranformer = function (str, fn) {
  //Tranformer :higher order, fn: callback function
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name} function`);
};

tranformer("JavaScript is the best!", upperFirstWord); //Only passing the value of upperfirstword function not calling the function
tranformer("JavaScript is the best!", oneWord);

const high5 = function () {
  console.log("🖐");
};
document.body.addEventListener("click", high5); //addEventListener: Higher order function, high5: callback function

["shivam", "Tiwari", "Motera"].forEach(high5);

//Functions returning functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = (greeting) => (name) => console.log(`${greeting} ${name}`); //Using arrow function sparrow 

const greetHey = greet("Hey! Good Morning");
greetHey("Shivam");
greetHey("Ahmedabad");
greet("hello")("shivam");
*/

////////////////////////////********************************//////////////////////////////
//call, apply, bind Method for this keyword

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flighNum, name) {
    //New way of writing function inside an object
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flighNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flighNum}`, name });
  },
};

lufthansa.book(239, "Shivam");
lufthansa.book(635, "John Smith");
console.log(lufthansa.bookings);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

// book(555, "Sarah Williams"); //Directly calling this function with this keyword in object will give error as this is undefined for function

//Call Method

book.call(eurowings, 23, "Sarah Williams"); //First arguement is used as this keyword.
console.log(eurowings);
book.call(lufthansa, 45, "HG Wells");

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 78, "Allen Cooper");

//Apply Method
const flightData = [583, "George Bush"];
book.apply(swiss, flightData); //Extinct method instead use follwing call method using spread operator
book.call(swiss, ...flightData);

//Bind Method
const bookEW = book.bind(eurowings); // this keyword now set to eurowings for bookEW function
const bookSW = book.bind(swiss);

bookEW(90, "Nixon");
bookSW(1111, "Atal");

const bookEW23 = book.bind(eurowings, 23); //parameter for this.flightNum set to 23
bookEW23("Robert");

//With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function (planes) {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa)); // without bind In Event Listener functions this keyword points directly to element like in this example button element

//Partial applications: presetting the parameters

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(300));

//Example
// const addTax = function (rate) {
//   return function (value) {
//     console.log(value + value * rate);
//   };
// };

// const valueTax = addTax(0.23);
// valueTax(300);

////////////////////////////********************************//////////////////////////////
//Challenge

/*
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
};

poll.displayResults = function (type = "array") {
  if (type === "string") {
    console.log("String hai");
    console.log(`Poll results are ${this.answers.join(" ,")}`);
  } else if (type === "array") {
    console.log(this.answers);
  }
};

poll.registeNewAnswer = function () {
  const optionInput = Number(
    prompt(`What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++`)
  );
  //Short circuiting
  typeof optionInput === "number" &&
    optionInput < this.answers.length &&
    this.answers[optionInput]++;
  this.displayResults("string");
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registeNewAnswer.bind(poll));

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: data1 }); //this.answers will be answers of object provided here
poll.displayResults.call({ answers: data2 }, "string");
*/

////////////////////////////********************************//////////////////////////////

//Immediately Invoked Function Expression(IIFE)
/*
(function () {
  console.log("This will never run again.");
  const isPrivate = 23;
})(); //Wrapped function in parenthesis and immediately called it afrer the expression.

(() => console.log("This will also never run again."))();
// console.log(isPrivate); //Not accessible in outer scope

{
  const isPrivate1 = 3;
  var notPrivate = 4;
}
console.log(notPrivate); //variables defined with var in block is not private.
*/

////////////////////////////********************************//////////////////////////////
/*
//Closure
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking(); //secureBooking function finsihed execution and is removed from execution context

booker(); //but how did booker function has access to passengerCount varible
booker(); //Because where this function was created it has access to all variable of it's parent execution context always, it's closure.
booker(); //closure has priority over scope chain

console.dir(booker);

///////
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

//Reassigning the f function
h();
f();

///////
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000); //1000 ms
  console.log(`Will start boarding in ${wait} sec`);
};

const perGroup = 1000; //closure has priority over scope chain so this value is not used in above setTimeout function
boardPassengers(180, 3);

////////
//challenge
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
*/
