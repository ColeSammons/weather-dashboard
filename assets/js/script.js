var city = "Mesa";
var cities = [];

var getData = function (city) {
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ff2a715a55507c8128294ebc5723fc0a";

    fetch(urlWeather).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log(data);
        console.log(data.name);//city
        console.log(data.main.temp);//temp
        console.log(data.wind.speed);//wind speed
        console.log(data.main.humidity);
        console.log();
        console.log();
        console.log();
        displayDate(data.dt);//date
    })
}

var displayDate = function (unix) {
    var date = new Date(unix * 1000);
    var timeStamp = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    console.log(timeStamp);
}

getData(city);