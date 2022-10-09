function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }
}

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

getLocation();

let weatherData;

async function getWeather(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=56e1b69633d0faa92c0b2d5121e0c2b1&units=metric&mode=json`
  );

  const data = await result.json();
  const countryName = await convertFromCountryShortcut(data.city.country);

  console.log(data.city.name + ", " + countryName);
  console.log(convertFromTimestamp(data.city.sunrise));
  console.log(convertFromTimestamp(data.city.sunset));
  console.log(data.list[0].main.temp + "°C");
  console.log(data.list[0].main.feels_like + "°C");
  console.log(data.list[0].main.pressure + " hPa");
  console.log(data.list[0].main.humidity + "%");
  console.log(data.list[0].weather[0].main);

  document.getElementById("temperature").innerHTML +=
    " " + data.list[0].main.temp + "°C";

  document.getElementById("weather").innerHTML +=
    " " + capitalizeFirstLetter(data.list[0].weather[0].description);

  document.getElementById("pressure").innerHTML +=
    " " + data.list[0].main.pressure + " hPa";

  document.getElementById("humidity").innerHTML +=
    " " + data.list[0].main.humidity + "%";

  // document.getElementById("airstats").innerHTML =
  //   "<span class='infoName'>Wind speed:<span> " +
  //   data.list[0].wind.speed +
  //   " m/s";

  document.getElementById("sunrise").innerHTML +=
    " " + convertFromTimestamp(data.city.sunrise);

  document.getElementById("sunset").innerHTML +=
    " " + convertFromTimestamp(data.city.sunset);

  document.getElementById("city").innerHTML =
    data.city.name + ", " + countryName;
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

setInterval(getDateAndTime, 10);

function displayCalendar() {
  let time = new Date();
  let month = time.getMonth();
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
  console.log(firstDay);

  // document.getElementById("calendar").style.gridTemplateColumns = "grid-template-rows: repeat(1, 1fr);";

  const calendar = document.getElementById("calendar");
  calendar.innerHTML +=
    '<div class="dayName">M</div><div class="dayName">T</div><div class="dayName">W</div><div class="dayName">T</div><div class="dayName">F</div><div class="dayName">S</div><div class="dayName sunday">S</div>';
  for (let i = 0; i < firstDay - 1; i++) {
    calendar.innerHTML += `<div class="day"> </div>`;
  }

  for (let day = 1; day <= numberOfDays; day++) {
    if ((day + firstDay - 1) % 7 == 0)
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
