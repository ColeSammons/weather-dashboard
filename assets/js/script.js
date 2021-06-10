var cities = [];

var getData = function (city) {
    var urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ff2a715a55507c8128294ebc5723fc0a";

    fetch(urlCurrentWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                console.log(data.name);//city
                console.log(data.main.temp);//temp
                console.log(data.wind.speed);//wind speed
                console.log(data.main.humidity);//humidity
                console.log(data.coord.lat);//latitude
                console.log(data.coord.lon);//longitude
                displayDate(data.dt);//date
                getUV(data.coord.lat, data.coord.lon)
                // var imgIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                // $("#currentCity").append(imgIcon);
            })
        }
        else {
            alert("City was not found");
        }
    }).catch(function (error) {
        alert("Unable to connect to weather api");
    });
}

var displayDate = function (unix) {
    var date = new Date(unix * 1000);
    var timeStamp = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    console.log(timeStamp);
}

var getUV = function(lat, lon) {
    varCityUV = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=ff2a715a55507c8128294ebc5723fc0a";

    fetch(varCityUV).then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data.current.uvi)
            })
        }
        else {
            alert("Incorrect latitude/longitude");
        }
    }).catch(function (error) {
        alert("Unable to connect to weather api");
    });
}


$(".formInput").on("submit", function () {
    event.preventDefault();
    console.log($("#inputCity").val());
    let city = $("#inputCity").val();
    getData(city);
})

