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
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));