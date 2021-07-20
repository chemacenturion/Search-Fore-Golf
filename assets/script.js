var cityName = $('#search').val();
var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
var date = new Date();

function handleSearchClick(event) {
    event.preventDefault();
    cityName = $('#search').val();

    $('#search').val('');
    dailyWeather(cityName);
    getGolf(cityName);
    console.log(cityName);

}
$('#search').keypress(function (event) {
    console.log('keypress');
    if (event.keyCode === 13) {
        event.preventDefault();
        handleSearchClick(event);
    }
});


$('#searchBtn').on('click', handleSearchClick);

function currentConditions(response) {
    var temp = (response.main.temp);
    temp = Math.floor(temp);

    // Empties the search bar
    $('#currentCity').empty();


    var card = $('<div>').addClass('card');
    var cardContent = $('<div>').addClass('card-content');
    var city = $('<h4>').addClass('card-head').text(response.name);
    var cityDate = $('<h4>').addClass('card-head').text(date.toLocaleString('en-US'));
    var temperature = $('<p>').addClass('card-body current-temp').text('Temperature: ' + temp + '℉');
    var humidity = $('<p>').addClass('card-body current-humidity').text('Humidity: ' + response.main.humidity + '%');
    var windMph = $('<p>').addClass('card-body current-wind').text('Wind Speed: ' + response.wind.speed + ' MPH');
    var weatherImage = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png');

    // Appending the data to the page.
    city.append(cityDate, weatherImage);
    cardContent.append(city, temperature, humidity, windMph,);
    card.append(cardContent);
    $('#currentCity').append(card);
}

function dailyWeather(cityName) {
    var callApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + myAPIKey;

    $.ajax({
        url: callApi,
        method: 'GET'
    })
        .then(function (response) {

            console.log(response);
            console.log(response.name);
            console.log(response.weather[0].icon);
            console.log(response.main.humidity);
            console.log(response.wind.speed);
            // let lat = response.coord.lat;
            // let lon = response.coord.lon
            currentConditions(response);
        })
}

function getGolf(cityName) {
    //console.log(cityName)
    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        "Bearer MvOlms7t9vwYoodOjpjZqUY_8EGGlNXYii09N2dp2qiJ3y1ozqzZpinFpsWkHEvi9kWN34hOW-C0scwxVmBcJx9DZZQ94j5DbpLXKtCs32mGHyss3DAmlPkiw8_pYHYx"
    );
    myHeaders.append("origin", "https://app.cors.bridged.cc");
    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    fetch(
        "https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search?term=golf&location=" + cityName,
        requestOptions
    )
        .then((response) => response.json())
        .then(function (result) {

            var cityBox = $("<div>").addClass("city-box m6").attr("style", "border: 1px solid black")
            var cityBody = $("<div>").addClass("city-body")
            var cityTitle = $("<div>").addClass("city-title").text("Golf Courses In: " + cityName)
            $("#results").append(cityBox.append(cityBody.append(cityTitle)))
            console.log(result)
            for (let i = 0; i < result.businesses.length; i++) {
                var line = $("<div>").addClass("line m6").attr("style", "border: 1px solid black")
                var lineBody = $("<div>").addClass("line-body")
                var cityCourses = $("<div>").addClass("city-courses").text(result.businesses[i].name)
                var courseAddress = $("<div>").addClass("course-address").text("Address: " + result.businesses[i].location.display_address)
                var saveBtn = $("<button>").addClass("save-btn").text("Save? ♡")
                $("#results").append(line.append(lineBody.append(cityCourses, courseAddress)).append(saveBtn))
                
            }
            //eventlistener for saved courses from user selection 
        })
        .catch((error) => console.log("error", error));
}

function userSavedClick (event){
    

}

function saveStorage(saveCourse){
    var savedArr=[];
    if(!localStorage.getItem(saveCourse)){
        console.log("none");
        savedArr.push(saveCourse);
        localStorage.setItem(saveCourse, JSON.stringify(savedArr))

    }

}

$(document).ready(function () {
    $('.sidenav').sidenav();
});