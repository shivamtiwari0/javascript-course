"use strict";

let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = (this.distance * 60) / this.duration;
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);

console.log(run1, cycling1);

///////////////////////////////////////////////////////////////////
//APPLICATION ARCHITECTURE

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        //two callback function 1st one for right, 2nd for error
        function () {
          alert("Could not get your position.");
        }
      );
  }

  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus(); //to move cursor instantly to distance input when we click on map
  }

  _hideForm() {
    //Empty inputs
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //If workout running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      //Check if data is valid
      if (
        !validInputs(
          distance,
          duration,
          cadence || !allPositive(distance, duration, cadence)
        )
      )
        return alert("Input must be a number!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If workout cycling, create cycling object.
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      //Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Inputs must be a number!");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);
    console.log(this.#workouts);

    //Add new object to workout array

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //Render workout on list
    this._renderWorkout(workout);

    //Hide form + clear input fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent("workout")
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
                <li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                  <span class="workout__icon">${
                    workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
                  } </span>
                  <span class="workout__value">${workout.distance}</span>
                  <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">⏱</span>
                  <span class="workout__value">${workout.duration}</span>
                  <span class="workout__unit">min</span>
                </div>`;

    if (workout.type === "running")
      html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
              </li>`;

    if (workout.type === "cycling")
      html += `
              <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
            </li>`;

    form.insertAdjacentHTML("afterend", html);
  }

  //Display marker
}

const app = new App();