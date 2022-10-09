function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  }
}

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
  //console.log(fullName);
  // .then((response) => response.json())
  // .then((data) => {
  //   convertFromCountryShortcut(data.city.country, (country) => {
  //     console.log(country);
  //   })
  // });
}

async function convertFromCountryShortcut(shortcut) {
  const result = await fetch("./resources/countries.json");
  const data = await result.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].Code == shortcut) return data[i].Name;
  }

  // .then((response) => response.json())
  // .then((data) => {
  //   if (shortcut == data[176].Code) {
  //     cb(data[176].Name)
  //   }
  // });
}

// const cats = [
//   {id : "1", name : "jon doe"},
//   {id : "2", name : "john deere"},
// ]

// localStorage.setItem("cats", JSON.stringify(cats));
// const cat2 = localStorage.getItem('cats');
// localStorage.removeItem('cat2');
// localStorage.clear();

// console.log(cats);

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(getWeather);
//   }
// }

// async function loadNames() {
//   const response = await fetch("./resources/countries.json");
//   const names = await response.json();
//   console.log(names[176].Name);
//   return names;
// }
// // loadNames();

// // function convertFromCountryShortcut(shortcut) {
// //   // let countriesData = JSON.parse(countries);
// //   let countries = loadNames();
// //   console.log(shortcut + countriesData[176].name);
// // }

// function convertFromTimestamp(timestamp) {
//   let tmp = new Date(timestamp * 1000);
//   let hours = tmp.getHours();
//   let minutes = "0" + tmp.getMinutes();
//   let seconds = "0" + tmp.getSeconds();
//   let result = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

//   return result;
// }

// getLocation();

// let weatherData;

// function getWeather(position) {
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=56e1b69633d0faa92c0b2d5121e0c2b1&units=metric&mode=json`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.city.name + ", " + data.city.country);
//       // console.log(convertFromCountryShortcut(data.city.country));
//       console.log(data.city.country);
//       console.log(convertFromTimestamp(data.city.sunrise));
//       console.log(convertFromTimestamp(data.city.sunset));
//       console.log(data.list[0].main.temp + "°C");
//     });
// }
