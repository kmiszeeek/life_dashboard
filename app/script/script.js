// function getLocation() {
//   if (navigator.geolocation) {
//     return navigator.geolocation.getCurrentPosition(getCoords);
//     geolocationPermission = true;
//   }
// }

function capitalizeFirstLetter(string) {
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

// getLocation();



let basicCities = [
  ['Warszawa', 52.2297, 21.0122],
  ['Katowice', 50.2649, 19.0238],
  ['Gdańsk', 54.3520, 18.6466],
  ['Rzeszów', 50.0412, 21.9991],
  ['Szczecin', 53.4285, 14.5528],
  ['Gliwice', 50.2945, 18.6714],
];

let latitude, longitude;

for (let i = 0; i < basicCities.length; i++) {
  if (document.getElementById("citiesSelect").value == basicCities[i][0]) {
    latitude = basicCities[i][1];
    longitude = basicCities[i][2];
  }
}

getWeather(latitude, longitude);

document.getElementById("citiesSelect").addEventListener("change", () => {
  for (let i = 0; i < basicCities.length; i++) {
    if (document.getElementById("citiesSelect").value == basicCities[i][0]) {
      latitude = basicCities[i][1];
      longitude = basicCities[i][2];
    }
  }
  getWeather(latitude, longitude);
})
//document.getElementById("citiesSelect").addEventListener("onchange", getWeather(latitude, longitude));

async function getWeather(latitude, longitude) {
  console.log(latitude);
  console.log(longitude);

  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=56e1b69633d0faa92c0b2d5121e0c2b1&units=metric&mode=json`
  );

  const data = await result.json();

  //const countryName = await convertFromCountryShortcut(data.city.country);

  document.getElementById("temperature").innerHTML =
    "<span class='infoName'>Temperature:</span> " + data.list[0].main.temp + "°C";

  document.getElementById("weather").innerHTML =
    "<span class='infoName'>Weather:</span> " + capitalizeFirstLetter(data.list[0].weather[0].description);

  document.getElementById("pressure").innerHTML =
    "<span class='infoName'>Pressure:</span> " + data.list[0].main.pressure + " hPa";

  document.getElementById("humidity").innerHTML =
    "<span class='infoName'>Humidity:</span> " + data.list[0].main.humidity + "%";

  // document.getElementById("airstats").innerHTML =
  //   "<span class='infoName'>Wind speed:<span> " +
  //   data.list[0].wind.speed +
  //   " m/s";

  document.getElementById("sunrise").innerHTML =
    "<span class='infoName'>Sunrise:</span> " + convertFromTimestamp(data.city.sunrise);

  document.getElementById("sunset").innerHTML =
    "<span class='infoName'>Sunset:</span> " + convertFromTimestamp(data.city.sunset);

  console.log(data.city.name);
}


// async function convertFromCountryShortcut(shortcut) {
//   const result = await fetch("./resources/countries.json");
//   const data = await result.json();

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].Code == shortcut) return data[i].Name;
//   }
// }

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

setInterval(getDateAndTime, 1000);

function displayCalendar() {
  let time = new Date();
  let month = time.getMonth();
  let temp = time.getDate();
  let numberOfDays;

  if (month == 1) {
    numberOfDays = 28;
  } else if (month % 2 == 0) {
    numberOfDays = 30;
  } else {
    numberOfDays = 31;
  }
  month++;
  firstDay = new Date(time.getFullYear() + "-" + month + "-01").getDay();
  // document.getElementById("calendar").style.gridTemplateColumns = "grid-template-rows: repeat(1, 1fr);";

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

displayCalendar();
// const cats = [
//   {id : "1", name : "jon doe"},
//   {id : "2", name : "john deere"},
// ]

// localStorage.setItem("cats", JSON.stringify(cats));
// const cat2 = localStorage.getItem('cats');
// localStorage.removeItem('cat2');
// localStorage.clear();

// console.log(cats);