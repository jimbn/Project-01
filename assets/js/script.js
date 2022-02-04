// api key for geoapify: d44ff70a85d74358b285655b81aa219b

// geoapify.com url:
// https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-122.33530492248485,37.86249960537557,-121.84349507751426,37.484645227626935&limit=20&apiKey={{{YOUR_API_KEY}}}}
// filter=rect:-122.33530492248485,37.86249960537557,-121.84349507751426,37.484645227626935 is the geo location based on coordinates
// limit=20 is search limit

const limitNum = 20;

// let inputParameter = [pet.shop, pet.veterinary, pet.service, pet.dog_park];
const parameter = "pet.shop";
// radius is a search perameter in meters
let radius = 100000;
const lon = localStorage.getItem("lon");
const lat = localStorage.getItem("lat");

//  if search multiple parameter, must have & between each
const geoApifyUrl = "https://api.geoapify.com/v2/places?categories=" + parameter + "&filter=circle:" + lon + "," + lat + "," + radius + "&limit=" + limitNum  + "&apiKey=d44ff70a85d74358b285655b81aa219b";

function getGeoApi () {
    fetch(geoApifyUrl);
}

navigator.geolocation.getCurrentPosition(getLatLon);

function getLatLon(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
        console.log("Latitude is "+latitude);
        console.log("Longitude is "+longitude);

    localStorage.setItem("lat", latitude);
    localStorage.setItem("lon", longitude);
}


getGeoApi ();