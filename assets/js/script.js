let cities = [];

var getCurrentWeather = function (city) {
    var urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ff2a715a55507c8128294ebc5723fc0a";
    $("#current").addClass("border border-dark rounded");

    fetch(urlCurrentWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var date = new Date(data.dt * 1000);
                var timeStamp = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                var cityHeader = $("<span>").text(data.name + " " + timeStamp).addClass("align-middle city-name fw-bolder");
                var imgIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                $("#currentCity").append(cityHeader);
                $("#currentCity").append(imgIcon);

                var temp = $("<p>").text("Temperature: " + data.main.temp + "°F");
                $("#temp").append(temp);

                var windSpeed = $("<p>").text("Wind speed: " + data.wind.speed + " MPH");
                $("#wind").append(windSpeed);

                var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %");
                $("#humidity").append(humidity);

                getUV(data.coord.lat, data.coord.lon);
                getFiveDay(city);
            })
        }
        else {
            alert("City was not found");
            return;
        }
    }).catch(function (error) {
        alert("Unable to connect to weather api");
        return;
    });
}

var getUV = function (lat, lon) {
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=ff2a715a55507c8128294ebc5723fc0a";

    fetch(uvURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var UVI = $("<p>").text("UV Index: ")
                var index = $("<span>").text(data.current.uvi);
                if (data.current.uvi <= 2) {
                    index.addClass("badge badge-success");
                }
                else if (3 <= data.current.uvi <= 5) {
                    index.addClass("badge badge-warning");
                }
                else if (6 <= data.current.uvi <= 7) {
                    index.addClass("badge badge-high");
                }
                else if (8 <= data.current.uvi <= 10) {
                    index.addClass("badge badge-danger");
                }
                else if (data.current.uvi >= 11) {
                    index.addClass("badge badge-extreme");
                }
                UVI.append(index);
                $("#uvIndex").append(UVI);
            })
        }
        else {
            alert("Incorrect latitude/longitude");
        }
    }).catch(function (error) {
        alert("Unable to connect to weather api");
    });
}

var getFiveDay = function (city) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ff2a715a55507c8128294ebc5723fc0a";
    var fiveDay = $("<h3>").text("5-Day Forecast:").addClass("m-3");
    $("#five-day").append(fiveDay);

    fetch(fiveDayURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < data.list.length; i++) {
                    var date = new Date(data.list[i].dt * 1000);
                    var todaysDate = new Date().getDate();
                    if (date.getHours() == 14 && date.getDate != todaysDate) {
                        var currentDate = $("<p>").text((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()).addClass("mt-3 mb-0 forecast-date");
                        var imgIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                        var temp = $("<p>").text("Temp: " + data.list[i].main.temp + "°F");
                        var wind = $("<p>").text("Humidity: " + data.list[i].wind.speed + " %");
                        var humidity = $("<p>").text("Wind speed: " + data.list[i].main.humidity + " MPH");

                        var forecastBox = $("<div>").addClass("bg-dark-blue col rounded m-3");
                        forecastBox.append(currentDate);
                        forecastBox.append(imgIcon);
                        forecastBox.append(temp);
                        forecastBox.append(wind);
                        forecastBox.append(humidity);
                        $("#five-day-forcast").append(forecastBox);
                    }
                }
            })
        }
        else {
            alert("City was not found");
        }
    }).catch(function (error) {
        alert("Unable to connect to weather api");
    })
}

var clearPage = function () {
    $("#currentCity").html("");
    $("#temp").html("");
    $("#wind").html("");
    $("#humidity").html("");
    $("#uvIndex").html("");
    $("#five-day").html("");
    $("#five-day-forcast").html("");
}

var saveDisplay = function (city) {
    if (cities === null) {
        var tempCity = [city];
        cities = tempCity;
        localStorage.setItem("city", JSON.stringify(cities));
    }
    else {
        cities.push(city);
        localStorage.setItem("city", JSON.stringify(cities));
        loadDisplay();
    }
}

var loadDisplay = function () {
    $(".cityStorage").html("");
    cities = JSON.parse(localStorage.getItem("city"));
    if (cities != null) {
        for (var i = 0; i < cities.length; i++) {
            const savedCity = document.createElement("input");
            savedCity.setAttribute("class", "btn btn-secondary my-2 pointer");
            savedCity.setAttribute("value", cities[i]);
            savedCity.setAttribute("type", "text");
            savedCity.setAttribute("readonly", true);
            savedCity.addEventListener("click", function() {
                clearPage();
                getCurrentWeather(savedCity.value);
            })

            $(".cityStorage").append(savedCity);
        }
        clearPage();
    }
}


$(".formInput").on("submit", function () {
    event.preventDefault();
    let city = $("#inputCity").val();
    clearPage();
    getCurrentWeather(city);
    saveDisplay(city);
})


loadDisplay();



