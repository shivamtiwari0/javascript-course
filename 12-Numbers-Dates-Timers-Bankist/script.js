"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-12-30T17:01:17.194Z",
    "2022-01-11T23:36:17.929Z",
    "2022-01-15T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2021-12-30T18:49:59.371Z",
    "2022-01-15T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class = 'movements__date'>${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency); //`${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    //In each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // Decrease 1 second

    //When 0 seconds, stoop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  //set time to 5 minutes
  let time = 100;

  //call the timer every second
  tick(); //We called it first as setInterval calls for the first time after 1 second
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// //FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting with API

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `As of ${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long",
    };

    // const locale = navigator.language; //en-GB

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add the transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      //reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
//Conversion
console.log(Number("23"));
console.log(+"23"); //+ operator converts 23 into a number

//Parsing
console.log(Number.parseInt("30px"), 10); //String needs to start with a number. 10 is for base 10.
console.log(Number.parseFloat("2.5rem"));

//isNaN, isFinite
console.log(Number.isNaN("20")); //false
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN("a")); //false
console.log(Number.isNaN(+"20x")); //true
console.log(Number.isNaN(20 / 0)); //false

//isFinite = checking if value is a number.
console.log(Number.isFinite(20 / 0)); //false
console.log(Number.isFinite(+"20x")); //false
console.log(Number.isFinite("20")); //false
console.log(Number.isFinite(20)); //True
*/

/*
//isInteger = checking if value is Integer.
console.log(Number.isInteger("23")); //false
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(+"23")); //true

console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));
console.log(Math.max(2, 3, 7));
console.log(Math.min(2, 3, 7));
console.log(Math.PI * Number.parseFloat("10px") ** 2); //value of pi
console.log(Math.trunc(Math.random() * 6) + 1); //random number b/w 1 to 6.

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min; //Random number b/w min and max

console.log(randInt(3, 8));

//Rounding Integers
console.log(Math.trunc(23.3)); //23  removes decimal part
console.log(Math.round(23.3)); //23  removes decimal part
console.log(Math.round(-23.7)); //-24
console.log(Math.ceil(23.3)); //24 // round up
console.log(Math.floor(23.3)); //23 //round down
console.log(Math.floor("23.3")); //23
console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.3)); //-24

//Rounding decimals
console.log((2.7).toFixed(0)); // '3', But return is a string
console.log(+(2.247).toFixed(2)); //2.25
console.log((2.247).toFixed(1)); //2.2
*/
/*
//Remainder operator
console.log(5 % 2); //1

const isEven = (n) => n % 2 === 0;
console.log(isEven(3));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
  }); //this needs to be in event Handler as we open this will be the case but as we login this will not apply for new user.
});
*/

/*
const diameter = 287_460_000_000;

console.log(diameter);

console.log(Number("230_000")); //NaN
console.log(parseInt("230_000")); //230
*/

/*
//BigInt

console.log(2 ** 53 - 1); //9007199254740991 This is the number JavaScript can represent safely.
console.log(Number.MAX_SAFE_INTEGER); //Same Number as above.

console.log(2 ** 53 + 1); //9007199254740991 not correct
console.log(843874973494795793593759582454n);
console.log(100000n + 100000n);
console.log(8762858586358625862583858874n * 10000000000n);

const huge = 2490729074092409204720n;
const num = 23;
// console.log(huge * num) // cannot mix BigInt with Regular numbers

console.log(20n > 15); //However comparision operator works
console.log(20n == 20); //true
console.log(20n === 20); //false, this doesn't work
*/

//crate a date
/*
const now = new Date();
console.log(now);

console.log(new Date("Jan 16 2022 17:02:38"));
console.log(new Date("03 May 1996"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); //Should be ocotober but it's november as month is zero based.

//unix time 1 Jan 1970
console.log(new Date(0)); //0 miliseconds after unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days after unix time
*/

/*
//working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); //10, Month is zero based use 10 for november
console.log(future.getDate()); //19
console.log(future.getDay()); //4 , day of week as sunday is 0 so thursday is 4
console.log(future.getHours()); //
console.log(future.getMinutes()); //
console.log(future.getSeconds()); //
console.log(future.toISOString()); //2037-11-19T09:53:00.000Z
console.log(future.getTime()); //2142237180000, Timestamps, miliseconds passed since unix time.

console.log(new Date(2142237180000));

console.log(Date.now()); //timestamps for current time

future.setFullYear(2040);
console.log(future);
*/

/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); //return timestamps, can be write as Number(future)

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
*/

/*
const num = 3884756.23;

const options = {
  style: "unit", //can be used for currency, percent, unit
  unit: "mile-per-hour",
  // useGrouping: false,
};

console.log("US:  ", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany:  ", new Intl.NumberFormat("de-DE", options).format(num));
console.log("IND:  ", new Intl.NumberFormat("hi-IN", options).format(num));
console.log(
  "Browser:  ",
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/
/*
//set timeout It's once called after the mentioned time
const ingredients = ["olives", "spinachs"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} & ${ing2}🍕`),
  3000,
  ...ingredients
);
console.log("waiting");

if (ingredients.includes("spinach")) {
  clearTimeout(pizzaTimer);
  console.log('it"s spinach');
}

//set interval , regularly called aftere the mentioned time.
setInterval(function () {
  const now = new Date();
  // const date = now.getDate();
  // const month = now.getMonth();
  // const year = now.getFullYear();
  // const hr = now.getHours();
  // const min = now.getMinutes();
  // const sec = now.getSeconds();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const realTime = new Intl.DateTimeFormat("en-IN", options).format(now);
  // console.log(realTime);
}, 1000);
*/
