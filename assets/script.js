//function weather(selectCity) {
    //Weather API
    //var selectCity = 
    var openWeathURL = "https://api.openweathermap.org/data/2.5/weather?q="
    var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
    //console.log(selectCity);
    //Parse all three together in fullURL 
    var fullURL = openWeathURL + "philadelphia" + myAPIKey;
   
$.ajax({
    url: fullURL,
    method: "get"
})
.then(function(response){
    console.log(response);

})


function getGolf (){
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
    .then(function (result) {console.log(result)})
    .catch((error) => console.log("error", error));


}
getGolf();