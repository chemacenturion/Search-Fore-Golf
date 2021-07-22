// Global variables.
var cityName = $('#search').val();
var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
var date = new Date();
var savedArr = JSON.parse(localStorage.getItem("savedcourses")) || [];

// Function for handling the search click
function handleSearchClick(event) {
    event.preventDefault();
    cityName = $('#search').val();

    // This clears the search bar after the user enters their search.
    $('#search').val('');

    // Calling functions for to get the weather and golf courses.
    dailyWeather(cityName);
    getGolf(cityName);
    console.log(cityName);

}

// This function adds the feature of firing off the search using the enter key.
$('#search').keypress(function (event) {
    console.log('keypress');
    if (event.keyCode === 13) {
        event.preventDefault();
        handleSearchClick(event);
    }
});

// Event listener for the search button.
$('#searchBtn').on('click', handleSearchClick);

// Function to get the current weather conditions.
function currentConditions(response) {
    var temp = (response.main.temp);
    var weatherBackground = (response.weather[0].main);
    temp = Math.floor(temp);
    var time = new Date();
    var utcTime = time.getTime();
    var offset = time.getTimezoneOffset();
    console.log(offset);
    console.log(response.timezone);
    var localTime = new Date(utcTime + (response.timezone + (offset * 60)) * 1000);
    // Empties the search bar
    $('#currentCity').empty();

    // Creates the variables for the card that will contain the weather.
    var card = $('<div>').addClass('card');
    var cardContent = $('<div>').addClass('card-content');
    var city = $('<h4>').addClass('card-head').text(response.name);
    var cityDate = $('<h4>').addClass('card-head').text(date.toDateString('en-US'));
    var cityTime = $('<h4>').addClass('card-head').text(localTime.toLocaleTimeString(('en-US')));
    var conditions = $('<p>').addClass('card-body current-description').text('Current Condition: ' + response.weather[0].description);
    var temperature = $('<p>').addClass('card-body current-temp').text('Temperature: ' + temp + '℉');
    var humidity = $('<p>').addClass('card-body current-humidity').text('Humidity: ' + response.main.humidity + '%');
    var windMph = $('<p>').addClass('card-body current-wind').text('Wind Speed: ' + response.wind.speed + ' MPH');
    var weatherImage = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@4x.png');

    // Appending the data to the page.
    city.append(cityDate, cityTime, weatherImage);
    cardContent.append(city, conditions, temperature, humidity, windMph,);
    card.append(cardContent);
    $('#currentCity').append(card);

    // weatherBackground = 'Haze';
    // Switch statement for the dynamic weather backgrounds.
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
            $('.card').css({ 'color': 'black', 'background-image': "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')" });
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
            $('.card').css('background-image', "url('https://th.bing.com/th/id/R.d3715f254c73a463014eeb6d2ab82003?rik=71HY9gXEaYtYPA&riu=http%3a%2f%2fnetanimations.net%2fchildren-of-men-cinemagraph-art.gif&ehk=gjj7p1osNQxp4wqvFdHG%2b57kuhkNoQ3I39S7vtb3CEA%3d&risl=&pid=ImgRaw')");
            break;
        case "Squall":
            $('.card').css('background-image', "url('https://www.bing.com/th/id/OGC.645b3b99407cc0186bb304a2ce520c79?pid=1.7&rurl=https%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f10%2fhuracanes-gif-1.gif&ehk=IC9MG%2f2Q3VjEu5MJmPJmdBfNDdXovVR1bGzib1VNMM8%3d')");
            break;
        case "Tornado":
            $('.card').css('background-image', "url('https://media0.giphy.com/media/MXvDhlmD0eB5qNvvjZ/giphy.gif?cid=790b76114c9a15098432b7e68e495248824cab011a46459f&rid=giphy.gif&ct=g')");
            break;
        default:
            $('.card').css({ 'color': 'black', 'background-image': "url('https://media0.giphy.com/media/MXvDhlmD0eB5qNvvjZ/giphy.gif?cid=790b76114c9a15098432b7e68e495248824cab011a46459f&rid=giphy.gif&ct=g')" });
            break;
    }
}

// Function to call the Openweathermap API
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

            // Calling the currentConditions function passing response as a parameter.
            currentConditions(response);
        })
}

// Function to call the Yelp APi
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

            // Variables for the boxes that will hold the results
            var cityBox = $("<div>").addClass("city-box m6").attr("style", "border: 1px solid black")
            var cityBody = $("<div>").addClass("city-body")
            var cityTitle = $("<div>").addClass("city-title").text("Golf Courses In: " + cityName)
             
            // Appends the responses for the Yelp API
            $("#results").append(cityBox.append(cityBody.append(cityTitle)))
            console.log(result)

            // A for loop that takes the search results and takes the response and puts them into variables.
            for (let i = 0; i < result.businesses.length; i++) {
                var line = $("<div>").addClass("line m6").attr("style", "border: 1px solid black")
                var lineBody = $("<div>").addClass("line-body")
                var coursePhoto = $("<img>").addClass("course-photo").attr("src", result.businesses[i].image_url)
                var cityCourses = $("<a>").addClass("city-courses").text(result.businesses[i].name).attr("href", result.businesses[i].url).attr("target","_blank")
                var courseAddress = $("<div>").addClass("course-address").text(result.businesses[i].location.display_address)
                var coursePhone = $("<div>").addClass("course-phone").text(result.businesses[i].phone)
                var saveBtn = $("<button>").addClass("save-btn").val(result.businesses[i].id).text("Favorite ♥")
                //make a resultsbtn, each result  variabe that attatches to the '#results' with an .on("click", that goes to the corresponding url in the API)


                saveBtn.on("click", saveStorage);

                // Appending the results to the page and the save button for each course.
                $("#results").append(line.append(lineBody.append(coursePhoto, cityCourses, courseAddress, coursePhone)).append(saveBtn))

            }

        })
        .catch((error) => console.log("error", error));
}

function saveStorage() {
    console.log(this.value)
    if (savedArr.indexOf(this.value) === -1) {
        savedArr.push(this.value)
    }
    console.log(savedArr)
    localStorage.setItem("savedcourses", JSON.stringify(savedArr))
}

$("#favorite_button").on("click", function () {
    for (var i = 0; i < savedArr.length; i++) {
        console.log(savedArr[i])
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
            "https://cors.bridged.cc/https://api.yelp.com/v3/businesses/" + savedArr[i],
            requestOptions
        )
            .then((response) => response.json())
            .then(function (result) {

                var resultCard = $("<div>").addClass("result-card line m6").attr("style", "border: 1px solid black").text(result.name)
                $("#saved-container").append(resultCard)
                console.log(result)
            })
            .catch((error) => console.log("error", error));
    }
});

//closeOnClick	Boolean	true	If true, close dropdown on item click

//closeOnClick("#saved-container");


$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function () {
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('.modal').modal();
  });