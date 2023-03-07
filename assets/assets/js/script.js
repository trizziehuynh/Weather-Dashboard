var searchedCityList = [];
var cityList = [];

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

      .then(function (data) {
        console.log(data);
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;

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

function displayTemp(data) {
  // var date = dayjs().format("M/D/YYYY");
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
