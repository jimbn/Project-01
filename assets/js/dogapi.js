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
  $.ajax(settings).done(function(response){
     breeds = response;
     $("#breed-img").attr("src", breeds[0].image.url);
     $("#breed-height").text(breeds[0].height.imperial).append(" inches");
     $("#breed-weight").text(breeds[0].weight.imperial).append(" pounds");
     $("#temperament").text(breeds[0].temperament);
     $("#lifespan").text(breeds[0].life_span);
     for(let i = 0; i < breeds.length; i++){
        $('#breed-select').append($('<option>', { 
            value: breeds[i].id,
            text : breeds[i].name
        }         
        ));        
    }}
        );
//changes image of dog tied to dropdown
        $('#breed-select').on('change', function() {
          console.log(breeds)
          let obj = breeds.find(({id}) => id == this.value);
          $("#breed-img").attr("src", obj.image.url);
        });
// changes text to card for breed height
        $('#breed-select').on('change', function() {
          let obj = breeds.find(({id}) => id == this.value);
          $("#breed-height").text(obj.height.imperial).append(`"`);
        });
// changes text to card for breed weight
        $('#breed-select').on('change', function() {
          let obj = breeds.find(({id}) => id == this.value);
          $("#breed-weight").text(obj.weight.imperial).append(" lbs");
        });
// changes text to card for breed temperament
        $('#breed-select').on('change', function() {
          let obj = breeds.find(({id}) => id == this.value);
          $("#temperament").text(obj.temperament);
        });
// changes text to card for breed life span
        $('#breed-select').on('change', function() {
          let obj = breeds.find(({id}) => id == this.value);
          $("#lifespan").text(obj.life_span);
        });