
//  if search multiple parameter, must have & between each

const searchedList = document.getElementById(`listItems`);
const fetchButton = document.getElementById(`fetchButton`);
const clearButton = document.getElementById(`clear`);
const closeModalBtn = document.getElementById(`closeModal`);
let itemName;
let searchItem;
const fetchHist = document.getElementById('fetchHist');

const closeModalParaBtn = document.getElementById(`closeModalPara`);
const searchError = document.getElementById(`searchError`);
const locError = document.getElementById(`locError`);


let searchedCity;
let limitNum;
let radius;
let selectedParameter;
let lat;
let lon;

clearButton.addEventListener(`click`, rmvSearchList)

fetchButton.addEventListener(`click`, function() {
    rmvSearchList();
    // inputSearchedCity();
    parameterChecked();
    // selectRadius();
    // selectSearchNumb();
    getGeoApify ();
});
// Saved Most Recent Searches
fetchHist.addEventListener(`click`, function(){
cities = localStorage.getItem('cities', searchedCity);
document.getElementById(`searchedCity`).value = cities;
});

function rmvSearchList() {
    document.getElementById(`itemsContainer`).className = '';
    searchedList.innerHTML = '';
}

// function inputSearchedCity() {
//     searchedCity = document.getElementById(`searchedCity`).value;
//     console.log(searchedCity);
// }
function inputSearchedCity() {
    searchedCity = document.getElementById(`searchedCity`).value;
    console.log(searchedCity);
    localStorage.setItem('cities', searchedCity);
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

// function selectRadius () {
//     radius = document.getElementById(`searchDist`).value;
// }

// function selectSearchNumb () {
//     limitNum = document.getElementById(`searchNumb`).value;
// }



// function to print list
function getGeoApify () {
    searchedCity = document.getElementById(`searchedCity`).value;
    radius = document.getElementById(`searchDist`).value;
    limitNum = document.getElementById(`searchNumb`).value;
    let locUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&appid=5bbb7a356faba6df28c3a3229103f17a";

    fetch(locUrl)
        .then(function(response){
            return response.json();

        })
        .then(function(data){          
            if(data.length >= 1 ) {             
                lat = data[0].lat;
                lon = data[0].lon;         
                let geoApifyUrl = "https://api.geoapify.com/v2/places?categories=" + selectedParameter + "&filter=circle:" + lon + "," + lat + "," + radius + "&limit=" + limitNum  + "&apiKey=d44ff70a85d74358b285655b81aa219b";
                console.log(geoApifyUrl);
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
                            searchItem.append(itemName);
                            searchItem.append(itemDetails);
                            itemDetails.append(itemAddress);
                            console.log(searchItem);
                            console.log(itemDetails);

                            itemName.textContent = data.features[i].properties.address_line1;
                            // searchItem.className = "hover"
                            itemAddress.textContent = data.features[i].properties.address_line2;

                            searchItem.addEventListener(`mouseover`, function() {
                                searchItem.className="hover";
                            })
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



// eventlistner to close modal
closeModalBtn.addEventListener(`click`,function() {
    locError.classList.remove(`modal`);
})
closeModalParaBtn.addEventListener(`click`,function() {
    searchError.classList.remove(`modal`);
})

