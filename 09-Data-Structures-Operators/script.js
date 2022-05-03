"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order(starterIndex, mainIndex) {
    //ES6 enhancement of writing functions inside objects literals
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours, //Short for openingHours : openingHours

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order delievered at ${address}, at ${time}, starter ${restaurant.starterMenu[starterIndex]}, main ${restaurant.mainMenu[mainIndex]}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
};

//////////////////////////////*****************************////////////////////////////////

//Optional chaining

// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open); //quite messy when complex nesting

console.log(restaurant?.openingHours?.mon?.open);
// ? check for each properties where is placed and doesn't produce an error if these properties are not present.

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? "closed";
//   //console.log(`On ${day}, we open at ${open}`);
// }

//checking if method exists before we call it.
// console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist"); //check if order method exist

//checking empty array
const users = [{ name: "shivam", email: "anything@email.com" }];
// console.log(users[0]?.name ?? "User array empty");

//////////////////////////////*****************************////////////////////////////////
//Loooping over an object
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

console.log(Object.values(openingHours));

const entries = Object.entries(openingHours);
console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`We on ${key} open at ${open} and close at ${close}`);
// }

//////////////////////////////*****************************////////////////////////////////

restaurant.orderDelivery({
  time: "22:30",
  address: "Motera",
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({ address: "Chandkheda" });

const ingredients = [
  // prompt("Let's choose ingredient 1?"),
  // prompt("Ingredient 2"),
  // prompt("Ingredient 3"),
];

restaurant.orderPasta(...ingredients);

//////////////////////////////*****************************////////////////////////////////

//for-of loop
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// for (const item of menu) //console.log(item);
//   for (const item of menu.entries()) {
//     // console.log(item); //array of index along with each individual item
//   }

//////////////////////////////*****************************////////////////////////////////

//Spread operator : It can be used for any iterables, but it's output can only be used to build an array or to pass in function.
/*
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr); //output individual elements as 1, 2, 7, 8, 9

const str = "shivam";
console.log([...str, " ", "Tiwari"]);

//copy array
const mainMenuCopy = [...restaurant.mainMenu]; //shallow copy
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
*/

//SPREAD, because on right side of assignment operator, '='

// const arr = [1, 2, ...[3, 4]];
// //REST, on left side of assignment operator
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//rest with objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

//rest with function
const add = function (...numbers) {
  console.log(numbers);
};

add(2, 4, 5);
add(1, 8, 9, 4, 3, 62);

//////////////////////////////*****************************////////////////////////////////

//Short circuiting: Use any data type and return any data type

//OR operator short circuiting: short circuit when finds a truthy value
console.log(3 || "Shivam"); //3 appeared first truthy value so returned value is 3
console.log("" || "Shivam");
console.log(undefined || "Shivam"); //Return truthy values
console.log(undefined || null); // no truthy value so later data type will be returned
console.log(null || undefined);
console.log(true || 0);

restaurant.numGuest = 23;
// const guest1 = restaurant.numGuest ? restaurant.numGuest : "nope"; // using ternary operator
// console.log(guest1);

const guest2 = restaurant.numGuest || "nope"; // using short circuiting
console.log(guest2);

//Nullish : null and undefined( not 0 or '' )
restaurant.nullGuest = 0;
const guestCorrect = restaurant.nullGuest ?? 10;
console.log(guestCorrect);

//AND operator short circuiting: short circuiting when a falsy value
console.log(0 && "shivam");
console.log(23 && "shivam");

restaurant.orderPasta && restaurant.orderPasta("garlic", "cheese", "bread"); //replaced if statement

//////////////////////////////*****************************////////////////////////////////

/*
const rest1 = {
  name: "Capri",
  numGuests: 20,
};

const rest2 = {
  name: "La Piazza",
  owner: "Shivam T.",
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
rest1.owner &&= "Anonymous";
rest2.owner &&= "Anonymous";

console.log(rest1);
console.log(rest2);
*/
//////////////////////////////*****************************////////////////////////////////

//DESTRUCTURING OBJECTS

const { name, openingHours1, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  //same as above but variables name differ from property name
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
//Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);
//Nested objects
const {
  fri: { open, close },
} = restaurant.openingHours;
console.log(open, close);

//////////////////////////////*****************************////////////////////////////////

/*
//DESTRUCTURING ARRAYS
// const arr = [2, 3, 4];
// const [x, y, z] = arr;
// console.log(x, y, z);

let [main, , secondary] = restaurant.categories; //Only takes first and third element as per order, blank space skips the elements at that position.
console.log(main, secondary);

//Mutating variables
// const temp = first; //Swapping the values of variables.
// first = third;
// third = temp;
// console.log(first, third);

[main, secondary] = [secondary, main]; //swapping values using destrucuting
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r);
*/

//////////////////////////////*****************************////////////////////////////////
//Challenge

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...arbPlayers) {
    console.log(...arbPlayers, arbPlayers.length);
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldplayers] = players1;

const allPlayers = [...players1, ...players2];

const players1Final = [...players1, "Thiago", "countinho", "Perisic"];

const { team1, x: draw, team2 } = game.odds;
/*
game.printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
game.printGoals(...game.scored);

team1 < team2 && console.log("Team 1");
team1 > team2 && console.log("Team 2");
*/

//////////////////////////////*****************************////////////////////////////////
//Challenge
/*
for (const [i, pName] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${pName}`);
}

let sum = 0;
const odds = Object.values(game.odds);
for (const item of odds) {
  sum += item;
}
console.log(sum / odds.length);

for (const [team, odd] of Object.entries(game.odds)) {
  game[team] && console.log(`Odd of victory of ${game[team]}: ${odd}`);
  !game[team] && console.log(`Odd of draw: ${odd}`);
}

let scorers = {};
for (const goalie of game.scored) {
  scorers[goalie] ? scorers[goalie]++ : (scorers[goalie] = 1);
}
console.log(scorers);
*/

//////////////////////////////*****************************////////////////////////////////

//SET: unique values, unordered
const orderSet = new Set(["Pasta", "Pizza", "Pizza", "Risotto", "Pasta"]);

// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has("Pizza"));
// console.log(orderSet.has("Bread"));
// console.log(new Set("Shivam"));
// orderSet.add("Garlic Bread");
// orderSet.delete("Risotto");
// console.log(orderSet);

// orderSet.clear();
// console.log(orderSet);

const staff = ["waiter", "waiter", "chef", "manager", "chef", "waiter"];

const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

//////////////////////////////*****************************////////////////////////////////

//MAPS
//Example 1
const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze Italy");
rest.set(2, "Lisbon, Portugal");

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We open")
  .set(false, "We close");

// console.log(rest);
// console.log(rest.get("name"));
// console.log(rest.get(true));

const time = 21;
const status = rest.get(time > rest.get("open") && time < rest.get("close"));
// console.log(status);

// console.log(rest.has("categories"));
rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// rest.clear();

const arr = [2, 3]; // we can't directly use this array as key below, arrays are stored in heap and each has a different address
rest.set(arr, "Test");
// console.log(rest);
// console.log(rest.get(arr));

//Example 2
const question = new Map([
  ["question", "Which is the best language?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "correct"],
  [false, "Try Again!"],
]);
console.log(question);

//Converting object to Map
const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

for (const [key, value] of question) {
  console.log(key, value);
}

//////////////////////////////*****************************////////////////////////////////

//Challenge

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);
// console.log([...gameEvents.values()]);
// console.log([...new Set(gameEvents.values())]);
gameEvents.delete(64);
// console.log(gameEvents);
const time1 = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened , on average, every ${time1 / gameEvents.size} minutes.`
// );
// for (const [time, event] of gameEvents) {
//   if (time <= 45) {
//     console.log(`[FIRST HALF] ${time}: ${event}`);
//   }
//   if (time >= 45) {
//     console.log(`[SECOND HALF] ${time}: ${event}`);
//   }
// }

//////////////////////////////*****************************////////////////////////////////

//String Methods

const airline = "Tap Air Portugal";
const plane = "A320";

// console.log(airline.indexOf("r"));
// console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("portugal"));
// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(new String("Shivam")); // This conversion takes place when we call a method on string.
console.log(typeof new String("Shivam"));
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// const passenger = "sHiVam";
// const passLower = passenger.toLowerCase();
// console.log(passLower[0].toUpperCase() + passLower.slice(1));

const email = "  Hello@Email.com  \n";
const trimmedEmail = email.toLowerCase().trim();

console.log(trimmedEmail);

//Replacing part of string
const priceGB = "288,97&";
const priceUS = priceGB.replace("&", "$").replace(",", ".");
// console.log(priceUS);

const announcement =
  "All passenger come to boarding door 23. Boarding door 23!";
// console.log(announcement.replaceAll("door", "gate"));
//Regular expression
// console.log(announcement.replace(/door/g, "gate"));

//Boolean
const plane1 = "Airbus A320neo";
// console.log(plane1.includes("0ne"));
// console.log(plane1.startsWith("Airb"));
// console.log(plane1.endsWith("neo"));

//Split & Join
console.log("A+very+nice string".split("+"));
const [firstName, lastName] = "Shivam Tiwari".split(" ");

const newName = ["Mr.", firstName, lastName.toLowerCase()].join("--");
console.log(newName);

//Padding
const message = "Go to gate 23!";
console.log(message.padStart(25, "+")); //this will make entire string length to 25
console.log(message.padEnd(25, "+"));

const masked = function (number) {
  const str = number + ""; //way to convert a number to string
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

// console.log(masked(2344343434));
// console.log(masked(83589635933443955));
// console.log(masked("28358963593344343487887834"));

//Repeat
const mes1 = "Bad weather...dealyed";
// console.log(mes1.repeat(5));

//Challenge 4
// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));

// // const underScoreIndex = textArea.indexOf("_");
// // const splitedText = textArea.split("_");
// // console.log();
// const textAreaEl = document.querySelector("textarea");
// const btnEl = document.querySelector("button");

// btnEl.addEventListener("click", function () {
//   const text = textAreaEl.value;
//   const splitedInput = text.split("\n");

//   for (const item of splitedInput) {
//     const splitedItem = item.toLowerCase().split("_");
//     const modifiedText = `${splitedItem[0]}${splitedItem[1].replace(
//       splitedItem[1][0],
//       splitedItem[1][0].toUpperCase()
//     )}`;
//     console.log(
//       modifiedText.trim().padEnd(20, " ") +
//         "✅".repeat(splitedInput.indexOf(item) + 1)
//     );
//   }
// });

// const flights =
("_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30");

for (const flight of flights.split("+")) {
  // console.log(flight.split(";"));

  //   ['_Delayed_Departure', 'fao93766109', 'txl2133758440', '11:25']
  // script.js:590 (4) ['_Arrival', 'bru0943384722', 'fao93766109', '11:45']
  // script.js:590 (4) ['_Delayed_Arrival', 'hel7439299980', 'fao93766109', '12:05']
  // script.js:590 (4) ['_Departure', 'fao93766109', 'lis2323639855', '12:30']
  const flD = flight.split(";");
  const detail2 = `${flD[0].includes("Delayed") ? "🔴" : ""}${flD[0].replaceAll(
    "_",
    " "
  )} from ${flD[1].slice(0, 3).toUpperCase()} to ${flD[2]
    .slice(0, 3)
    .toUpperCase()} (${flD[3].replace(":", "h")})`;
  console.log(detail2.trim().padStart(47, " "));
}
