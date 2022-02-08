
//  if search multiple parameter, must have & between each

const searchedList = document.getElementById(`listItems`);
const fetchButton = document.getElementById(`fetchButton`);

let searchedCity;
let limitNum;
let radius;
let selectedParameter;
const apiKey = "&appid=5bbb7a356faba6df28c3a3229103f17a";



fetchButton.addEventListener(`click`, function() {
    inputSearchedCity();
    parameterChecked();
    selectRadius();
    selectSearchNumb();
    getGeoApify ();
});

function inputSearchedCity() {
    searchedCity = document.getElementById(`searchedCity`).value;
    console.log(searchedCity);
}

function parameterChecked() {
    let para1 = document.getElementById(`para1`).checked;
    let para2 = document.getElementById(`para2`).checked;
    let para3 = document.getElementById(`para3`).checked;
    let para4 = document.getElementById(`para4`).checked;
    const parameter = [];

    if( para1===true ){
        parameter.push(document.getElementById(`para1`).value);
    } 
    if( para2===true ){
        parameter.push(document.getElementById(`para2`).value);
    } 
    if( para3===true ){
        parameter.push(document.getElementById(`para3`).value)
    } 
    if( para4===true ){
        parameter.push(document.getElementById(`para4`).value)
    } 

    selectedParameter = parameter.join("&");
    console.log(selectedParameter);
}

function selectRadius () {
    radius = document.getElementById(`searchDist`).value;
    console.log(radius);
}

function selectSearchNumb () {
    limitNum = document.getElementById(`searchNumb`).value;
    console.log(limitNum);
}


// function to print list
function getGeoApify () {
    let locUrl = "//api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + apiKey;
    
    fetch(locUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            const lat = data[0].lat;
            const lon = data[0].lon;
            const geoApifyUrl = "//api.geoapify.com/v2/places?categories=" + selectedParameter + "&filter=circle:" + lon + "," + lat + "," + radius + "&limit=" + limitNum  + "&apiKey=d44ff70a85d74358b285655b81aa219b";
            console.log(geoApifyUrl);
            fetch(geoApifyUrl)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    

                    for(let i=0; i<data.features.length; i++){

                        let searchItem = document.createElement(`li`);
                        let itemName = document.createElement(`span`);
                        let itemDetails = document.createElement(`ul`);
                        let itemAddress = document.createElement(`li`);
                        
                        searchedList.append(searchItem);
                        searchItem.append(itemName);
                        searchItem.append(itemDetails);
                        itemDetails.append(itemAddress);
                        console.log(searchItem);
                        console.log(itemDetails);

                        itemName.textContent = data.features[i].properties.address_line1;
                        itemAddress.textContent = data.features[i].properties.address_line2;
                    }

                document.getElementById(`itemsContainer`).className = `bg-info shadow card scroll`;   
                })
        })
}

