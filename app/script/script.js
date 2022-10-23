// function getLocation() {
//   if (navigator.geolocation) {
//     return navigator.geolocation.getCurrentPosition(getCoords);
//     geolocationPermission = true;
//   }
// }
// getLocation();

function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function convertFromTimestamp(timestamp) {
  let tmp = new Date(timestamp * 1000);
  let hours = tmp.getHours();
  let minutes = "0" + tmp.getMinutes();
  let seconds = "0" + tmp.getSeconds();
  let result = hours + ":" + minutes.substr(-2);

  return result;
}

let city = document.getElementById("citiesSelect").value;


document.getElementById("citiesSelect").addEventListener("change", () => {

  city = document.getElementById("citiesSelect").value;
  document.getElementById("citiesSelect").value = capitalizeFirstLetter(city);
  getWeather(city);
});

async function getWeather(city) {

  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56e1b69633d0faa92c0b2d5121e0c2b1&units=metric&mode=json`
  );

  const data = await result.json();
  
  document.getElementById("countryName").innerHTML = await convertFromCountryShortcut(data.sys.country);

  document.getElementById("temperature").innerHTML =
    "<span class='infoName'>Temperature:</span> " + data.main.temp + "°C";

  document.getElementById("weather").innerHTML =
    "<span class='infoName'>Weather:</span> " + capitalizeFirstLetter(data.weather[0].description);

  document.getElementById("pressure").innerHTML =
    "<span class='infoName'>Pressure:</span> " + data.main.pressure + " hPa";

  document.getElementById("humidity").innerHTML =
    "<span class='infoName'>Humidity:</span> " + data.main.humidity + "%";

  document.getElementById("sunrise").innerHTML =
    "<span class='infoName'>Sunrise:</span> " + convertFromTimestamp(data.sys.sunrise);

  document.getElementById("sunset").innerHTML =
    "<span class='infoName'>Sunset:</span> " + convertFromTimestamp(data.sys.sunset);
}


async function convertFromCountryShortcut(shortcut) {
  const result = await fetch("./resources/countries.json");
  const data = await result.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].Code == shortcut) return data[i].Name;
  }
}

function getDateAndTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  let day = time.getDate();
  switch (day) {
    case 1:
      day = day + "<sup>st</sup>";
      break;
    case 2:
      day = day + "<sup>nd</sup>";
      break;
    case 3:
      day = day + "<sup>rd</sup>";
      break;
    default:
      day = day + "<sup>th</sup>";
      break;
  }

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[time.getMonth()];

  let year = time.getFullYear();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  document.getElementById("time").innerHTML = hours + ":" + minutes;
  document.getElementById("date").innerHTML = day + " " + month + " " + year;
}

function displayCalendar() {
  let time = new Date();
  let month = time.getMonth();
  let temp = time.getDate();
  let numberOfDays;

  if (month == 1)
    numberOfDays = 28;
  else if (month % 2 == 0)
    numberOfDays = 30;
  else
    numberOfDays = 31;

  month++;
  firstDay = new Date(time.getFullYear() + "-" + month + "-01").getDay();

  const calendar = document.getElementById("calendar");
  calendar.innerHTML +=
    '<div class="dayName">M</div><div class="dayName">T</div><div class="dayName">W</div><div class="dayName">T</div><div class="dayName">F</div><div class="dayName">S</div><div class="dayName sunday">S</div>';
  for (let i = 0; i < firstDay - 1; i++) {
    calendar.innerHTML += `<div class="day"> </div>`;
  }

  for (let day = 1; day <= numberOfDays; day++) {
    if (day == temp)
      calendar.innerHTML += `<div class="day today">${day}</div>`;
    else if ((day + firstDay - 1) % 7 == 0)
      calendar.innerHTML += `<div class="day sunday">${day}</div>`;
    else calendar.innerHTML += `<div class="day">${day}</div>`;
  }
}

getWeather(city);
setInterval(getDateAndTime, 10);
displayCalendar();

document.getElementById("submitTask").addEventListener("click", () => {
  document.getElementById("promptTaskOverlay").style.visibility = "hidden";
  document.getElementById("promptTaskOverlay").style.opacity = 0;

  window.history.pushState("", "", '/app/index.html');
  localStorage.setItem(document.getElementById("taskName").value, document.getElementById("checkboxTask").checked ? "true" : "false");
});


let tasks = JSON.stringify(localStorage);

let tasksList = document.getElementById("tasks");

if (window.localStorage.length == 0) {
  tasksList.innerHTML += `<p class="free">You are free today!</p>`;
} else {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(localStorage.key(i)) == "true") {
      tasksList.innerHTML += `
      <div class="task">
        <p>${localStorage.key(i)}</p>
        <div class="taskOptions">
          <span class="exclamation">!</span>
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            name="checkbox"
          />
          <img src="./resources/trash.png" width="26px" class="trash" name="${localStorage.key(i)}" id="trashTask">
        </div>
      </div>`
    } else {
      tasksList.innerHTML += `
      <div class="task">
        <p>${localStorage.key(i)}</p>
        <div class="taskOptions">
          <span class="exclamationFalse">!</span>
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            name="checkbox"
          />
          <img src="./resources/trash.png" width="26px" class="trash" name="${localStorage.key(i)}" id="trashTask">
        </div>
      </div>`
    }
  }
}

document.getElementById("trashTask").addEventListener("click", () => {
  localStorage.removeItem(document.getElementById("trashTask").name);
  window.location.href = window.location.href;
});


// const cats = [
//   {id : "1", name : "jon doe"},
//   {id : "2", name : "john deere"},
// ]

// localStorage.setItem("cats", JSON.stringify(cats));
// const cat2 = localStorage.getItem('cats');
// localStorage.removeItem('cat2');
// localStorage.clear();

// console.log(cats);