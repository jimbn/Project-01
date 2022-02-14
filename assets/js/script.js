const searchedList = document.getElementById(`listItems`);
const fetchButton = document.getElementById(`fetchButton`);
const fetchHist = document.getElementById('fetchHist');
const clearButton = document.getElementById(`clear`);
const searchError = document.getElementById(`searchError`);
const locError = document.getElementById(`locError`);
const closeModalBtn = document.getElementById(`closeModal`);
const closeModalParaBtn = document.getElementById(`closeModalPara`);

let searchedCity;
let lat;
let lon;
let limitNum;
let radius;
let selectedParameter;
let itemName;
let searchItem;

function rmvSearchList() {
    searchedList.innerHTML = '';
}

function parameterChecked() {
    let para1 = document.getElementById(`para1`).checked;
    let para2 = document.getElementById(`para2`).checked;
    let para3 = document.getElementById(`para3`).checked;
    let para4 = document.getElementById(`para4`).checked;

    if( para1===true ){
        selectedParameter = document.getElementById(`para1`).value;
    } 
    else if( para2===true ){
        selectedParameter = document.getElementById(`para2`).value;
    } 
    else if( para3===true ){
        selectedParameter = document.getElementById(`para3`).value;
    } 
    else if( para4===true ){
        selectedParameter = document.getElementById(`para4`).value;
    } 
    else {
        searchError.classList.add(`modal`);
    }
}

// Function to fetch and return API
function getGeoApify () {
    searchedCity = document.getElementById(`searchedCity`).value;
    radius = document.getElementById(`searchDist`).value;
    limitNum = document.getElementById(`searchNumb`).value;
    localStorage.setItem('cities', searchedCity);
    let locUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&appid=5bbb7a356faba6df28c3a3229103f17a";

    // Fetch openweather API for longitude and latitude
    fetch(locUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){          
            if(data.length >= 1 ) {             
                lat = data[0].lat;
                lon = data[0].lon;         
                let geoApifyUrl = "https://api.geoapify.com/v2/places?categories=" + selectedParameter + "&filter=circle:" + lon + "," + lat + "," + radius + "&limit=" + limitNum  + "&apiKey=d44ff70a85d74358b285655b81aa219b";
                // Fetch and return geoapify API for different location
                fetch(geoApifyUrl)
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){
                        console.log(data);
                        for(let i=0; i<data.features.length; i++){

                            let searchItem = document.createElement(`div`);
                            let itemName = document.createElement(`span`);
                            let itemDetails = document.createElement(`ul`);
                            let itemAddress = document.createElement(`div`);
                            
                            searchedList.append(searchItem);
                            searchItem.append(itemName, itemDetails);
                            itemDetails.append(itemAddress);
                            
                            // Print selected data from the API into the page
                            itemName.textContent = data.features[i].properties.address_line1;
                            itemAddress.textContent = data.features[i].properties.address_line2;
                            // Add hover class when user's mouse move over individual item that was printed.
                            searchItem.addEventListener(`mouseover`, function() {
                                searchItem.className="hover";
                            })
                            // Remove hover class when user's mouse move off the item
                            searchItem.addEventListener(`mouseout`, function() {
                                searchItem.className="";
                            })
                        }
                    document.getElementById(`itemsContainer`).className = `bg-info  card shadow scroll`;   
                })
            }
            else {
                locError.classList.add(`modal`);
            }

        })
}

// Fetch and print slected returned API data onto the page
fetchButton.addEventListener(`click`, function() {
    rmvSearchList();
    parameterChecked();
    getGeoApify ();
});

// Remove list of searched locations
clearButton.addEventListener(`click`, rmvSearchList);

// Saved Most Recent Searches
fetchHist.addEventListener(`click`, function(){
    document.getElementById(`searchedCity`).value = localStorage.getItem('cities', searchedCity);
});

// eventlistner to close modal
closeModalBtn.addEventListener(`click`,function() {
    locError.classList.remove(`modal`);
});
closeModalParaBtn.addEventListener(`click`,function() {
    searchError.classList.remove(`modal`);
});