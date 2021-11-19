"use strict";

/*
function logger() {
  console.log("My name is Shivam");
}

logger();
logger();


function fruitProcesser(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

console.log(fruitProcesser(3, 6));
*/

/*
// Function declaration
function calcAge1(birthYear) {
  const age = 2037 - birthYear;
  return age;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (bithyear) {
  return 2037 - bithyear;
};

const age2 = calcAge2(1991);
console.log(age1, age2);
*/

// Function declaration can be called before declaration but expression can't

// Arrow function
/*
const calcAge3 = (birthYear) => 2037 - birthYear;
console.log(calcAge3(1996));

const yearsUntilRetirement = (birthYear) => 60 - (2037 - birthYear);

console.log(yearsUntilRetirement(1996));
*/

// Function calling Function
/*
const cutPieces = function (fruit) {
  return fruit * 4;
};

function fruitProcesser(apples, oranges) {
  const applePieces = cutPieces(apples);
  const orangePieces = cutPieces(oranges);
  
  const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
  return juice;
}

console.log(fruitProcesser(2, 3));
*/

// ARRAY
/*
const friends = ["Micheal", "Steven", "Peter"];
console.log(friends);

let years = new Array(1991, 2002, 1983, 2007);
console.log(years);

console.log(friends.length); // = 3
console.log(years[0]);
friends[1] = "Jay"; //Arrays are mutable
console.log(friends);
*/

/*
const friends = ["Micheal", "Steven", "Peter"];

//adding elements
const newLength = friends.push("Jay"); //like append in python //this whole expression returns length of the mutated array.
console.log(friends);
console.log(newLength);

friends.unshift("John"); //new value at the begining of the array, it also returns length of new array.
console.log(friends);

// Removing elements, pop method returns the removed element
const remEle = friends.pop(); //Last element
console.log(friends);
console.log(remEle);

console.log(friends.shift());
console.log(friends);

//indexOf, includes
console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob"));

console.log(friends.includes("Steven")); //Returns boolean value. includes strict equality
console.log(friends.includes("Bob"));
*/

/*
function calcTip(billValue) {
  if (billValue <= 300 && billValue >= 50) {
    return billValue * 0.15;
  } else {
    return billValue * 0.2;
  }
}

const bills = [125, 555, 44];
const billsCopy = [125, 555, 44];
let tips = new Array();
let total = [];

let tip1 = calcTip(billsCopy.shift());
tips.push(tip1);
total.push(bills[0] + tip1);
let tip2 = calcTip(billsCopy.shift());
tips.push(tip2);
total.push(bills[1] + tip2);

let tip3 = calcTip(billsCopy.shift());
tips.push(tip3);
total.push(bills[2] + tip3);

console.log(tips);
console.log(total);
*/

//OBJECTS
/*
const shivam = {
  firstName: "Shivam",
  lastName: "Tiwari",
  age: 2021 - 1996,
  job: "Professional",
  friends: ["a", "b", "c"],
};
console.log(shivam);

console.log(shivam.lastName); //retrieving elements
console.log(shivam["lastName"]);

shivam["location"] = "Ahmedabad";
shivam.learning = "JavaScript";

console.log(shivam);
const interestedIn = prompt("what are you interested in?");

if (shivam[interestedIn]) {
  console.log(shivam[interestedIn]);
} else {
  console.log("Wrong Value!");
}

console.log(
  `shivam has ${shivam.friends.length} friend, his best friend is called ${shivam["friends"][0]}`
);
*/

/*
const shivam = {
  firstName: "Shivam", //firstName is property of the shivam object.
  lastName: "Tiwari",
  birthYear: 1996,
  job: "Professional",
  friends: ["a", "b", "c"],
  hasDL: true,

  // calcAge: function (birthYear) {
  //   //any function attached to a object is method.
  //   return 2022 - birthYear; //This function should be in expression form not declartion.
  //}

  calcAge: function () {
    // console.log(this);
    this.age = 2022 - this.birthYear;
    return 2022 - this.birthYear; //'this' keyword referenced to object 'shivam'
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()} years old ${
      this.job
    }, he has ${this.hasDL ? "a" : "no"} DL`;
  },
};

console.log(shivam.calcAge());
console.log(shivam);

console.log(shivam.getSummary());
*/

/*
const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bMI = this.mass / this.height ** 2;
    return this.bMI;
  },
};
const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bMI = this.mass / this.height ** 2;
    return this.bMI;
  },
};
john.calcBMI();
mark.calcBMI();
console.log(
  `${john.firstName} BMI ${john.bMI} is ${
    john.bMI > mark.bMI ? "Higher" : "lower"
  }  than ${mark.firstName}`
);
*/

// FOR loop
/*
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

const years = [1991, 2007, 1969, 2020];

const age = [];

for (let i = 0; i < years.length; i++) {
  age.push(2021 - years[i]);
}
console.log(age);
*/

//CONTINUE and BREAK STATEMENT
/*
const shivam = [
  "Shivam",
  "Tiwari",
  2021 - 1996,
  "Professional",
  ["a", "b", "c"],
];

console.log("----only string----");

for (let i = 0; i < shivam.length; i++) {
  if (typeof shivam[i] != "string") {
    continue;
  }
  console.log(shivam[i], typeof shivam[i]);
}

console.log("----break with numbers----");
for (let i = 0; i < shivam.length; i++) {
  if (typeof shivam[i] === "number") {
    break;
  }
  console.log(shivam[i], typeof shivam[i]);
}
*/

// Looping Backwards
/*
const shivam = [
  "Shivam",
  "Tiwari",
  2021 - 1996,
  "Professional",
  ["a", "b", "c"],
];
for (let i = shivam.length - 1; i >= 0; i--) {
  console.log(shivam[i]);
}

// Loop inside of a loop
for (let excercise = 1; excercise <= 3; excercise++) {
  console.log(`--------------Starting excercise ${excercise}--`);
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Excercise ${excercise}- Repetetion ${rep}`);
  }
}
*/

//While loop
/*
let y = 1;
while (y < 10) {
  console.log(`this is ${y}`);
  y++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
while (dice !== 6) {
  console.log(`You rolled a ${dice}`); 
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log("Loop is about to end");
  }
}
*/

/*
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

let tips = [];
let totals = [];
for (let i = 0; i < bills.length; i++) {
  let j = tips.push(calcTip(bills[i]));
  totals.push(bills[i] + calcTip(bills[i]));
}
console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const avg = sum / arr.length;
  return avg;
};

console.log(calcAverage(totals));
*/

//DEBUGGER
/*
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    //Fix the bug
    value: Number(prompt("Degree celsius")),
  };

  //Find the bug
  console.table(measurement); //prompt always return string whatever the input is.
  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);
  debugger
  const kelvin = measurement.value + 273;
  return kelvin;
};

//Identify the bug
console.log(measureKelvin());
*/

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`${arr[i]} C in ${i + 1} days`);
  }
};

// printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
