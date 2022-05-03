"use strict";
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);
  return age;
}

const firstName = "Shivam";
console.log(calcAge(1994));
console.log(age); //Gives undefined output as declred with var, otherwise with let and const gives an error.
var age = 23;
// console.log(alert === window.alert);

console.log(this); //global window object ll be this keyword

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); //undefined
// };

// calcAge(1991);

// const calcAgeArrow = (birthYear) => {
//   console.log(2037 - birthYear);
//   console.log(this); // arrow function doesn't have it's own this keyword. window object
// };

// calcAgeArrow(1991);

const shivam = {
  year: 1991,

  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

shivam.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = shivam.calcAge; //method borrowing
matilda.calcAge(); //this keyword in calcage function now points to matilda object


*/
/*

// var firstName = "Shivam";

const shivam = {
  firstName: "Shivam",
  year: 1991,

  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    //SOLUTION 1
    
    // const self = this;  //here we are preserving this keyword for isMillenial function

    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    // };
    

    //SOLUTION 2
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996); //Arrow function doesn't get its own this keyword so it uses it's parent calcAge scope this keyword that is shivam object
    };
    isMillenial();
  },
  greet: () => {
    console.log(`Hey ${this.firstName}`);
  },
};

shivam.greet(); //arrow function doesn't get there own this keyword so output is 'hey undefined'
//becoz this keyword get window object
shivam.calcAge();

const addExpr = function (a, b) {
  console.log(arguments);
};

addExpr(2, 3, 4);
//Arrow function doesn't get argument keyword.

*/

const ramesh = {
  firstName: "Ramesh",
  lastName: "Yadav",
  age: 27,
};

const marriedRamesh = ramesh;
ramesh.lastName = "Sundaram";
console.log(ramesh.lastName, marriedRamesh.lastName); //Assigning lastName to old object changes property in both objects as objects are located in Heap and are just their address in heap are refernced as value in call stack and so changing and both objects has same address in heap so changing property of one changes the both.

const jayesh = {
  firstName: "Jayesh",
  lastName: "Yadav",
  age: 27,
  family: ["Alice", "Bob"],
};

const jayeshCopy = Object.assign({}, jayesh); //Create a shallow copy not a deep clone, when an object is inside an object it'll not work.
jayesh.lastName = "Madhvan";
console.log(jayesh.lastName, jayeshCopy.lastName);
jayeshCopy.family.push("Mary");
jayeshCopy.family.push("John");

console.log(jayeshCopy.family);
console.log(jayesh.family); //Create a shallow copy not a deep clone, when an object is inside an object it'll not work.
