function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }
}

async function loadNames() {
  const response = await fetch("./resources/countries.json");
  const names = await response.json();
  console.log(names[176].Name);
  return names;
}
// loadNames();

// function convertFromCountryShortcut(shortcut) {
//   // let countriesData = JSON.parse(countries);
//   let countries = loadNames();
//   console.log(shortcut + countriesData[176].name);
// }

function convertFromTimestamp(timestamp) {
  let tmp = new Date(timestamp * 1000);
  let hours = tmp.getHours();
  let minutes = "0" + tmp.getMinutes();
  let seconds = "0" + tmp.getSeconds();
  let result = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return result;
}

getLocation();

let weatherData;

function getWeather(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=56e1b69633d0faa92c0b2d5121e0c2b1&units=metric&mode=json`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.city.name + ", " + data.city.country);
      // console.log(convertFromCountryShortcut(data.city.country));
      console.log(data.city.country);
      console.log(convertFromTimestamp(data.city.sunrise));
      console.log(convertFromTimestamp(data.city.sunset));
      console.log(data.list[0].main.temp + "°C");
    });
}
