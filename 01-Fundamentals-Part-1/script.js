/* // let js = 'amazing';
// if (js === 'amazing') alert('Javascript is FUN!');

console.log(typeof true);

// javascript is dynamically typed language.
let javascriptIsFun = true;

console.log(typeof javascriptIsFun);
// changed already defined variable data type
javascriptIsFun = "yes!";
console.log(typeof javascriptIsFun);

// Undefined data types
let year;
console.log(year);
console.log(typeof year); */

// Let is good where variable need to mutate or empty variables
// Const varaible where value is not supposed to change, immutuable variable
// var is same as let for now , learn about differences in future
// assignments operators '=', '++', '+=', '-=', '--'

// 'x++' means x + 1
// let x = 15;
// x++;
// console.log(x);

/*let markMass, markHeight, johnMass, johnHeight;

markMass = 95;
markHeight = 1.88;
johnMass = 88;
johnHeight = 1.76;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;

console.log(markBMI, johnBMI);

let markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
  console.log(`Mark has higher BMI than John, Mark's BMI is ${markBMI}.`);
} else {
  console.log(`Mark's BMI is lower than John's, Mark's BMI ${markBMI}.`);
}*/

/*const firstName = "Shivam";
const birthYear = 1996;
const now = 2021;
const job = "proffesional";

// Template literals
const shivam = `I'm ${firstName} born in ${birthYear} so ${
  now - birthYear
} year old & a ${job}.`;
console.log(shivam);

console.log("String \nmultiple \nlines.");
console.log(`String 
multiple
lines.`); */

// IF ELSE
/*const age = 21;
const isOldEnough = age >= 18;

if (isOldEnough) {
  console.log("You can start driving license🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`You should wait ${yearsLeft} years more.`);
}*/

/*
let year = "2000";
// Type conversion
year1 = Number(year);
console.log(year1 + 1);
// Type coercion
console.log("23" - "10" - 3, "23" / 2);
console.log("10" - "4" - 1 + "2");*/

// FALSY & TRUTHY VALUES
// 5 FALSY values- 0, '', undefined, null, NaN - These values are false when converted to bollean
// Anything other than this when converted to boolean will be True

// let age = 20;
// if (age === 18) console.log("adult");

// === strict comparision operator, == loose comparision operator, !== strict, != loose

// PROMPT
// let favourite = prompt("What's your favourite number?");
// console.log(favourite);

// AND OR NOT
/*const hasDL = true;
const hasGV = false;

console.log(hasDL && hasGV);
console.log(hasDL || hasGV);
console.log(hasDL && !hasGV);*/

/*const dolphinsAvg = (97 + 112 + 101) / 3;
const koalasAvg = (106 + 95 + 109) / 3;

console.log(dolphinsAvg, koalasAvg);

let minScore = 100;

if (dolphinsAvg > koalasAvg && minScore <= dolphinsAvg) {
  console.log("Dolphins wins");
} else if (dolphinsAvg < koalasAvg && minScore <= koalasAvg) {
  console.log("Koalas wins");
} else if (dolphinsAvg === koalasAvg && dolphinsAvg >= 100) {
  console.log("Match drawn");
} else console.log("No one wins");
*/

// THE SWITCH STATEMENT

/*const day = "wednesday";

switch (day) {
  case "monday": //day === 'monday'
    console.log("plan course");
    console.log("study");
    break;
  case "tuesday":
    console.log("tuesday bum");
    break;
  case "wednesday":
  case "thursday":
    console.log("it is wednesday");
    console.log("may be thursday");
    break;
  case "friday":
    console.log("record video");
    break;
  case "saturday":
  case "sunday":
    console.log("enjoy the weekend");
    break;
  default:
    console.log("not a valid day");
}
*/

// THE CONDITIONAL(TERNARY) OPERATOR

/*const age = 15;
age >= 18
  ? console.log("I'd like to drink wine.")
  : console.log("I'll drink water");

const drink = age >= 18 ? "wine" : "water"; //This here is an expression becoz it produces a value. Statement do not produce value.
console.log(drink);*/

const bill = 430;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`Bill = ${bill}, tip = ${tip}, Total bill = ${bill + tip}`);
