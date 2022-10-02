function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }
}

getLocation();

function getWeather(position) {
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
  fetch(
    `api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=56e1b69633d0faa92c0b2d5121e0c2b1`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// api.openweathermap.org/data/2.5/forecast?lat=1&lon=2&appid=56e1b69633d0faa92c0b2d5121e0c2b1
// fetch("https://random-data-api.com/api/v2/users")
//   .then((response) => response.json())
//   .then((data) => console.log(data));
