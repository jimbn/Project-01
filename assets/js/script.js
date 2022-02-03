// api key for geoapify: d44ff70a85d74358b285655b81aa219b

// geoapify.com url:
// https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:-122.33530492248485,37.86249960537557,-121.84349507751426,37.484645227626935&limit=20&apiKey={{{YOUR_API_KEY}}}}
// filter=rect:-122.33530492248485,37.86249960537557,-121.84349507751426,37.484645227626935 is the geo location based on coordinates
// limit=20 is search limit

const geoApifyUrl = "https://api.geoapify.com/v2/places?categories=pet.dog_park&" + location + "limit=" + limitNum "&apiKey=d44ff70a85d74358b285655b81aa219b";

function getGeoApi () {
    fetch(geoApifyUrl);
}