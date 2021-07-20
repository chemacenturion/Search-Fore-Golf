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
    var weatherBackground = (response.weather[0].main);
    temp = Math.floor(temp);

    // Empties the search bar
    $('#currentCity').empty();


    var card = $('<div>').addClass('card');
    var cardContent = $('<div>').addClass('card-content');
    var city = $('<h4>').addClass('card-head').text(response.name);
    var cityDate = $('<h4>').addClass('card-head').text(date.toLocaleString('en-US'));
    var conditions = $('<p>').addClass('card-body current-description').text('Current Condition: ' + response.weather[0].description);
    var temperature = $('<p>').addClass('card-body current-temp').text('Temperature: ' + temp + '℉');
    var humidity = $('<p>').addClass('card-body current-humidity').text('Humidity: ' + response.main.humidity + '%');
    var windMph = $('<p>').addClass('card-body current-wind').text('Wind Speed: ' + response.wind.speed + ' MPH');
    var weatherImage = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png');
    
    // Appending the data to the page.
    city.append(cityDate, weatherImage);
    cardContent.append(city, conditions, temperature, humidity, windMph,);
    card.append(cardContent);
    $('#currentCity').append(card);
    
    // weatherBackground = 'Fog';
    
    switch (weatherBackground) {
        case "Snow":
            $('.card').css('background-image', "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
            break;
        case "Clouds":
            $('.card').css('background-image', "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
            break;
        case "Fog":
            $('.card').css('background-image', "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
            break;
        case "Rain":
            $('.card').css('background-image', "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
            break;
        case "Clear":
            $('.card').css({'color':'black','background-image':"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"});
            break;
        case "Thunderstorm":
            $('.card').css('background-image', "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')");
            break;
        case "Drizzle":
            $('.card').css('background-image', "url('https://bestanimations.com/media/rain/697448260rain-water-animated-gif.gif')");
            break;
        case "Mist":
            $('.card').css('background-image', "url('https://64.media.tumblr.com/e84280580f35285af46b3942b287b891/tumblr_op6v3jG8mU1unfdido1_500.gifv')");
            break;
        case "Smoke":
            $('.card').css('background-image', "url('https://media1.giphy.com/media/3oz8xujaR1rpMXRd8k/giphy.gif?cid=790b761142618ad0a1a60859c8f627bbbfebdb8c73d10057&rid=giphy.gif&ct=g')");
            break;
        case "Haze":
            $('.card').css('background-image', "url('https://media2.giphy.com/media/dgeIH5RPynA6Q/giphy.gif?cid=ecf05e4743r72icxao4vsbik1kd5klkjdqjy3yayd2eh7cni&rid=giphy.gif&ct=g')");
            break;
        case "Squall":
            $('.card').css('background-image', "url('https://www.bing.com/th/id/OGC.645b3b99407cc0186bb304a2ce520c79?pid=1.7&rurl=https%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f10%2fhuracanes-gif-1.gif&ehk=IC9MG%2f2Q3VjEu5MJmPJmdBfNDdXovVR1bGzib1VNMM8%3d')");
            break;
        case "Tornado":
            $('.card').css('background-image', "url('https://media0.giphy.com/media/MXvDhlmD0eB5qNvvjZ/giphy.gif?cid=790b76114c9a15098432b7e68e495248824cab011a46459f&rid=giphy.gif&ct=g')");
            break;
        default:
            $('.card').css({'color':'black','background-image':"url('https://media0.giphy.com/media/MXvDhlmD0eB5qNvvjZ/giphy.gif?cid=790b76114c9a15098432b7e68e495248824cab011a46459f&rid=giphy.gif&ct=g')"});
            break;
    }
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

        currentConditions(response);
    })
}

function getGolf(cityName) {
    //console.log(cityName)
    $('#results').empty();
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
                    var favBtn = $("<button>").addClass("fav-btn").text("Favorite? ♡")
                    $("#results").append(line.append(lineBody.append(cityCourses, courseAddress))).append(favBtn)
                }
                
            })
            .catch((error) => console.log("error", error));
        }
        
        $(document).ready(function () {
            $('.sidenav').sidenav();
        });