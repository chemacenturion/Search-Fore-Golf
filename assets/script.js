var cityName = $('#search').val();
var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
var date = new Date();

$('#searchWord').keypress(function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $('#searchBtn').click();
    }
});


$('#searchBtn').on('click', function (e) {
    e.preventDefault();
    cityName = $('#search').val();

    $('#search').val('');
    dailyWeather(cityName);
    console.log(cityName);
});

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

function getGolf() {
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
        "https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search?term=golf&location=philadelphia",
        requestOptions
    )
        .then((response) => response.json())
        .then(function (result) { console.log(result) })
        .catch((error) => console.log("error", error));


}
getGolf();