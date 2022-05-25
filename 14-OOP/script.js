"use strict";
/*
//////////////////////////////////////////////////////////////////////
//constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do the following: as imagine having thousands of instances and then it'll affect our performance. Instead use prototypes.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

//new operator
const jonas = new Person("Jonas", 1991);
console.log(jonas); //Person {firstName: 'Jonas', birthYear: 1991}

//1. New {} is created.
//2. function is called, this = {}.
//3. {} linked to prototype
//4. funciton automatically returns {}

const matilda = new Person("Matilda", 1979);
console.log(matilda);

console.log(matilda instanceof Person); //True

//Static methods
//Array.from(), Number.parseFloat()- Static Methods are linked to the constructor not to the prototypes of constructor so these methods can't be inherited to instances  .
Person.hey = function () {
  console.log("Hey there");
  console.log(this);
};
Person.hey();

//Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();

console.log(Person.prototype);
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
//Person.prototype is not the prototype of Person, it's prototype for object created with constructor function.

Person.prototype.species = "Homo Sapiens";
console.log(jonas, matilda.species); //Person {firstName: 'Jonas', birthYear: 1991} 'Homo Sapiens'
//not showing species property directly as it's not its own property but inherited from its prtotype.

console.log(jonas.hasOwnProperty("firstName")); //true
console.log(jonas.hasOwnProperty("species")); //false

console.log(jonas.__proto__); //it's an object
console.log(jonas.__proto__.__proto__); //Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor);

///
const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(Person);
console.dir((x) => x + 1);

///////////Coding Challenge1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

const bmw = new Car("BMW", 120);
bmw.accelerate();
bmw.brake();
const mercedes = new Car("Mercedes", 95);
mercedes.brake();

///////////////////////////////////////////////////////////////////////
*/

/*
// class expression
// const PersonCl = class {}

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  } //this method will not be added to object but to the prototype of the object.

  //follow this pattern when you set a property that already exist.
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    //if we're trying to set a property that is already present then it's convention to use an underscore.
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  //static method
  static hey() {
    console.log("Hey there");
    console.log(this);
  }
}

const jessica = new PersonCl("Jessica Davis", 1996);
console.log(jessica);
jessica.calcAge();

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};

jessica.greet();
PersonCl.hey();

const walter = new PersonCl("Walter", 1996);
console.log(walter);

// jessica.fullName = "Jessica Davis";

//1. Classes are not hoisted.
//2. Class are first-class citizen.
//3. Classes are executed in strict mode.

////////////////////////////////////////////////
//getter & setter
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);
*/

/*
/////////////////////////////////////////////////////////////

//Object.create() Method
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);

sarah.calcAge();

///Coding-Challenge
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl("Ford", 120);

console.log(ford);
console.log(ford.speedUs);
ford.speedUs = 120;
console.log(ford);
*/

/*
///////////////////////////////////////////////
//Inheritence between 'classes': constructor functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}, study ${this.course}.`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true
console.dir(Student.prototype.constructor); //it's showing person normally becoz it's created with object.create()
Student.prototype.constructor = Student;

*/

////Challenge
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed}.`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed}.`);
// };

// const EV = function (make, speed, charge) {
//   this.charge = charge;
//   Car.call(this, make, speed);
// };
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`${this.make} ${chargeTo}% `);
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(`${this.make} is going at ${this.speed}, charge ${this.charge}%`);
// };

// const tesla = new EV("Tesla", 120, 23);
// tesla.accelerate();
// tesla.chargeBattery(90);

/////////////////////////////////////////////////////
/*
//inheeritence between classes: ES6 classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    //if we're trying to set a property that is already present then it's convention to use an underscore.
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  //static method
  static hey() {
    console.log("Hey there");
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName}, study ${this.course}.`);
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");

martha.introduce();
martha.calcAge();
*/
/*
////////////////////////////////////////////////////////////
//Inheritence between classes: object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Name ${this.firstName} Course ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");

jay.introduce();

jay.calcAge();
*/

///////////////////////////////////////////////
//******Encapsulation *////////

//Public fields
//Private fields
//Public methods
//Private methods
//(there is also a static version)

/*
class Account {
  //Public fields(instances, not in prototypes)
  locale = navigator.language;

  //Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening a account ${this.owner}`);
  }

  //Public interface
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this; //return this to enabale chaining , as acc1.deposit() will not return anything and it'll be undefined.deposti() further in chain.
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  _approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }
  static helper() {
    console.log("Helper!");
  }
  //Private methods
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account("Jonas", "EUR", 1111);
// acc1.movements.push(200);
// acc1.movements.push(-100); //Instead of directly interacting with a property like create a method.
acc1.deposit(200);
acc1.withdraw(100);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000); //This should be a private method that only request method should use.
console.log(acc1);
console.log(acc1.pin);
console.log(acc1.getMovements());
// console.log(acc1.#movements); //error
console.log(acc1);

acc1.deposit(100).deposit(300).deposit(35).requestLoan(225).withdraw(50);
console.log(acc1.getMovements());

*/

//Coding Challenge
/*

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
    return this;
  }
  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed}, charge ${this.#charge}%`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);

rivian.accelerate();
console.log(
  rivian
    .accelerate()
    .brake()
    .brake()
    .chargeBattery(25)
    .accelerate()
    .chargeBattery(60)
    .accelerate()
);
console.log(rivian.speedUs);
*/
