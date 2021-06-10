var city = "Mesa";
var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ff2a715a55507c8128294ebc5723fc0a";
var cities = [];

fetch(urlWeather).then(function (response) {
    console.log(response);
    return response.json();
}).then(function (data) {
    console.log(data.dt);
    var currentDate = data.dt
    displayDate(currentDate);
})

var displayDate = function(unix) {
    var date = new Date(unix * 1000);
    var timeStamp = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    console.log(timeStamp);
}