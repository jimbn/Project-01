//API key for Dog API
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thedogapi.com/v1/breeds?attach_breed=0",
    "method": "GET",
    "headers": {
      "x-api-key": "2eaa0d45-1ca9-488a-8c95-0b5503c91280"
    }
  }
  //creates dropdown with names of dogs
let breeds;
  $.ajax(settings).done(function (response) {
     breeds = response;
     $("#breed-img").attr("src", breeds[0].image.url);
     for(let i = 0; i < breeds.length; i++){
        $('#breed-select').append($('<option>', { 
            value: breeds[i].id,
            text : breeds[i].name
        }         
        ));        
    }}
        );
//shows image of dog tied to
        $('#breed-select').on('change', function() {
          console.log(breeds)
          let obj = breeds.find(({id}) => id == this.value);
          $("#breed-img").attr("src", obj.image.url);
        });