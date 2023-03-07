//Once the submit button is click, the city's temp will be rendered.
document
  .getElementById("searchBtn")
  .addEventListener("click", function (event) {
    var cityName = document.getElementById("cityName").value;
    // get data from the API Weather
    var APIKey = "a68815855e046aa6fc830d61874f7c39";
    var APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    fetch(APIUrl)
      .then(function (res) {
        return res.json();
      })

      .then(function (weatherData) {
        console.log(weatherData);
        var lat = weatherData.city.coord.lat;
        var lon = weatherData.city.coord.lon;

        fiveDaysTemp(weatherData);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
        )
          .then(function (resp) {
            return resp.json();
          })
          .then(function (data) {
            console.log(data);
            console.log(data.name);

            // searchedHistory(cityName);
            displayTemp(data);
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  });

// function seachedHistory(cityName){
//   var seached=document.createElement('p')
// }

// Render the current temperature.
function displayTemp(data) {
  var date = new Date();
  var temp = document.createElement("div");
  temp.className = "row gy-2";
  temp.innerHTML = `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 id="city" class="card-title">${data.name}</h5>
            <h6 id="date"class="card-subtitle mb-2 text-muted">${date}</h6>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            </p>
            <p id="temperature" class="card-text">The temperature : ${data.main.temp}
            </p>
            <p id="humidity" class="card-text">The humidity : ${data.main.humidity}
            </p>
            <p id="windSpeed" class="card-text">The wind speed : ${data.wind.speed}
            </p>
  `;
  document.getElementById("displayCard").append(temp);
}

// Render the forecast for the next 5 days
function fiveDaysTemp(weatherData) {
  var fiveDays = [];
  var day1 = {
    city: weatherData.city.name,
    date: weatherData.list[8].dt_txt,
    img: weatherData.list[8].weather[0].icon,
    temp: weatherData.list[8].main.temp,
    humidity: weatherData.list[8].main.humidity,
    windSpeed: weatherData.list[8].wind.speed,
  };
  var day2 = {
    city: weatherData.city.name,
    date: weatherData.list[16].dt_txt,
    img: weatherData.list[16].weather[0].icon,
    temp: weatherData.list[16].main.temp,
    humidity: weatherData.list[16].main.humidity,
    windSpeed: weatherData.list[16].wind.speed,
  };
  var day3 = {
    city: weatherData.city.name,
    date: weatherData.list[24].dt_txt,
    img: weatherData.list[24].weather[0].icon,
    temp: weatherData.list[24].main.temp,
    humidity: weatherData.list[24].main.humidity,
    windSpeed: weatherData.list[24].wind.speed,
  };
  var day4 = {
    city: weatherData.city.name,
    date: weatherData.list[32].dt_txt,
    img: weatherData.list[32].weather[0].icon,
    temp: weatherData.list[32].main.temp,
    humidity: weatherData.list[32].main.humidity,
    windSpeed: weatherData.list[32].wind.speed,
  };
  var day5 = {
    city: weatherData.city.name,
    date: weatherData.list[32].dt_txt,
    img: weatherData.list[32].weather[0].icon,
    temp: weatherData.list[32].main.temp,
    humidity: weatherData.list[32].main.humidity,
    windSpeed: weatherData.list[32].wind.speed,
  };

  fiveDays.push(day1, day2, day3, day4, day5);
  console.log(fiveDays);

  fiveDays.forEach(function (day) {
    var tempFiveDays = document.createElement("div");
    tempFiveDays.className = "row gy-2";
    tempFiveDays.innerHTML = `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 id="city" class="card-title">${day.city}</h5>
            <h6 id="date"class="card-subtitle mb-2 text-muted">${day.date}</h6>
            <img src="https://openweathermap.org/img/w/${day.img}.png">
            </p>
            <p id="temperature" class="card-text">The temperature : ${day.temp}
            </p>
            <p id="humidity" class="card-text">The humidity : ${day.humidity}
            </p>
            <p id="windSpeed" class="card-text">The wind speed : ${day.windSpeed}
            </p>
  `;
    document.getElementById("fiveDays").append(tempFiveDays);
  });
}
