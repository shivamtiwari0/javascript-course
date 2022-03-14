"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Displaying movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Displaying Total Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

//displaying summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1) //Bank pays interest on each deposits & only if interrest > 1 euro
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//used forEach when we just have to do something and no need to create a value or return something. Map contrary
//Creting User Name
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balances
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//Event Handlers
//Login setup

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //It's an form element so its default behaviour is to refresh page as we click or enter
  // console.log("login");
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //?. = optional chaining

    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Clearing input fields
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur(); //to remove cursor from loginPin field after login

    updateUI(currentAccount);
  }
});

//Transfer setup
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault(); //form element

  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

//Loan request
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= 0.1 * amount)
  ) {
    //add the movement
    currentAccount.movements.push(amount);
    console.log(currentAccount.movements);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

//Close Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

//Sorting button
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ["a", "b", "c", "d", "e"];

//SLICE
console.log(arr.slice(2));
console.log(arr.slice()); //Shallow copy

//SPLICE
console.log(arr.splice(-1)); //Mutates original array
console.log(arr);
console.log(arr.splice(1, 2)); //Diffrence from slice: end parameter is no. of elements to be removed
console.log(arr);

//REVERSE
arr = ["a", "b", "c", "d", "e"];

const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); //Mutates original array
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(" - "));

//AT : also works with strings
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0)); //Same as above
console.log(arr3);

//Getting the last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1));
console.log(arr3.at(-1));

console.log("abcdefghijklmnopqrstuvwxyz".at(2));
console.log("abcdefghijklmnopqrstuvwxyz".at(-1));
*/

/*
////////////////for each method////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.forEach(function (movement) {
  //forEach will call  the callback function for each iteration
  if (movement > 0) {
    console.log(`Deposited ${movement}`);
  } else {
    console.log(`withdrew ${Math.abs(movement)}`);
  }
});

movements.forEach(function (movement, i, array) {
  //produces exact same order element, index , whole array
  if (movement > 0) {
    console.log(`Movement ${i}: Deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: withdrew ${Math.abs(movement)}`);
  }
}); //continue and break doesn't work in forEach loop

//forEach with sets and maps
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) { //value = key for sets
  console.log(`${key}: ${value}`);
});
*/

//////////////////////////////////////**************************************////////////////////////

//challenge 1
/*
const checkDogs = function (arrJulia, arrKate) {
  const arrJulia2 = arrJulia.slice().splice(1, 2);

  console.log(arrJulia2);

  const wholeArr = [...arrJulia2, ...arrKate];
  console.log(wholeArr);
  wholeArr.forEach(function (dogAge, i) {
    dogAge >= 3
      ? console.log(`Dog number ${i + 1} is an adult`)
      : console.log(`Dog number ${i} is a puppy`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

//////////////////////////////////////**************************************////////////////////////

//MAP METHOD
//Map method return a new array
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//these movement in euro , convert it in usd
const eurToUsd = 1.1;

const movementUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementUsd);

//using arrow function
const movementArrow = movements.map((mov) => mov * eurToUsd);
console.log(movementArrow);

//map method has access to element, index, entire array
const movementDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i}: Deposited ${mov}`;
  } else {
    return `Movement ${i}: withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementDescriptions);
*/
////////////////////////////////////******************FILTER********************////////////////////////
//Filter method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov, i, wholeArr) {
  return mov > 0;
});

console.log(deposits);
*/

////////////////////////////////////*****************REDUCE*********************////////////////////////
//Reduce Method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (acc, cur, i, wholeArr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); //0 is initial value of acc(accumulator)

console.log(balance);
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const maxValue = movements.reduce(function (max, cur) {
  max = cur > max ? cur : max;
  return max;
}, movements[0]);

console.log(maxValue);
*/

/*
//challenge 2
const calcAverageHumanAge = function (julsDogs, kateDogs) {
  const allDogs = julsDogs.concat(kateDogs);
  // const allDogs2 = allDogs.slice();

  const humanDogs = allDogs.map(function (dogAge) {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });
  const averageAge =
    humanDogs.reduce(function (acc, cur, i, arr) {
      return acc + cur;
    }, 0) / humanDogs.length;
  console.log(averageAge);

  return humanDogs.filter((dogAge) => dogAge >= 18);
};

console.log(
  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3], [16, 6, 10, 5, 6, 1, 4])
);
*/

////////////////////////////////////************Chaining**************************////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const euroToUsd = 1.1;
//Chaining
const totalDepositstUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositstUSD);
*/
/*
const calcAverageHumanAge = (dogs) =>
  dogs
    .map((ele) => (ele <= 2 ? 2 * ele : 16 + ele * 4))
    .filter((ele) => ele >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

////////////////////////////////////************FIND METHOD**************************////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find((mov) => mov < 0); //return first element that satifies the condition
console.log(firstWithdrawal);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);
*/

////////////////////////////////////************SOME & EVERY METHOD**************************////////////////////////

/*
//some returns boolean
console.log(movements);
console.log(movements.includes(-130)); //Checks for equality

const anyDeposits = movements.some((mov) => mov > 0); //conditional
console.log(anyDeposits);

//Every: checks condition for every element, returns boolean
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

//seperate callback
const deposits = (mov) => mov > 0;
console.log(movements.every(deposits));
console.log(movements.filter(deposits));
console.log(movements.some(deposits));
*/

////////////////////////////////////************FLAT & FLATMAP**************************////////////////////////
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); //2 level of nesting

//flat
const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);

console.log(overallBalance);

//flatmap
const overallBalance2 = accounts
  .flatMap((acc) => acc.movements) //it can work on only 1 level of nesting
  .reduce((acc, cur) => acc + cur, 0);

console.log(overallBalance2);
*/

////////////////////////////////////************SORTING**************************////////////////////////
/*
const owners = ["jonas", "zach", "Adam", "martha"];

console.log(owners.sort()); //Mutates the array
console.log(movements.sort()); //It does sorting according to string.

//return < 0 , a,b (keep order)
//return > 0 , b,a (switch order)
//Ascending order

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b); //just like above if a-b is positive so it reutrns a positive and order is switched
console.log(movements);

movements.sort((a, b) => b - a); //descending, if b >a then b-a is positive and order is switched

console.log(movements);
*/

/////////////////////////////************CREATING AND FILLING ARRAYS**************************////////////////
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//FILL METHOD
const x = new Array(7); //This will not create an array with only one element but an empty array with length of 7
console.log(x);
//Not useful except for one method that's fill method

// x.fill(1); //Mutates array

x.fill(1, 3, 5); //starts to fill at index 3 & fills upto 5
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);
*/
//FROM METHOD
/*
const y = Array.from({ length: 7 }, () => 1); //we are calling from method not on an array but on an array constructor
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const k = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1);
console.log(k);
*/

/*
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")]; //We can not use array methods on querySelectorall because it produces a node list except from method but after converting it into a complete array we can use all other methods.
  console.log(movementsUI2);
});
*/

/////////////////////////////************EXERCISES**************************////////////////

//1.
/*
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);
*/
/*
//2.
// const numDeposits = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;
// console.log(numDeposits);

const numDeposits = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(numDeposits);

// let a = 10;
// console.log(a++);
// console.log(++a); //Prefixed ++ operator. log both to see difference.
*/

/*
//3. : Returning objects with reduce method.
const sum = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? "deposits" : "withdrawal"] += cur;
      return sums; //returning sums because arrow function is not returning the sums implicitly.
    },
    { deposits: 0, withdrawal: 0 }
  );
console.log(sum);
*/

/*
//4.
//this is a nice title -> This Is a Nice Title.

const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
*/

//////////////////////////////CHALLENGE 4////////////////////////////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

const eatLimit = function (dog) {
  if (
    dog.curFood > 0.9 * dog.recommendedFood &&
    dog.curFood < 1.1 * dog.recommendedFood
  ) {
    return "Eating an okay amount";
  } else if (dog.curFood > 1.1 * dog.recommendedFood) {
    return "Eating Too Much";
  } else {
    return "Eating Too Little";
  }
};

const str = function (arr, eat = "eat too much") {
  const support = `${arr.join(" and ")}'s dogs ${eat}`;
  console.log(support);
};

//1.
const calcFood = dogs.forEach(function (dog, i) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);
//2.
const findDog = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(eatLimit(findDog));

//3.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > 1.1 * dog.recommendedFood)
  .flatMap((dog) => dog.owners);
const ownersEatTooLittle = dogs
  .filter(function (dog) {
    if (dog.curFood < 0.9 * dog.recommendedFood) {
      return dog;
    }
  })
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4.
str(ownersEatTooMuch);
str(ownersEatTooLittle, "eat too little");

//5.
console.log(dogs.some((dog) => dog.recommendedFood === dog.curFood));

//6.
console.log(
  dogs.some(
    (dog) =>
      dog.curFood <= 1.1 * dog.recommendedFood &&
      dog.curFood >= 0.9 * dog.recommendedFood
  )
);

//7.
console.log(
  dogs.filter(
    (dog) =>
      dog.curFood <= 1.1 * dog.recommendedFood &&
      dog.curFood >= 0.9 * dog.recommendedFood
  )
);

//8.
const dogsCopy = dogs.slice();

const dogsSorted = dogsCopy.sort(function (a, b) {
  return a.recommendedFood - b.recommendedFood;
});

console.log(dogsSorted);
