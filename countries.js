country_dropdown = document.getElementById("countryId");
city_dropdown = document.getElementById("cityId");

const options = {
  method: "GET",
};

function updateCity() {
  var index = country_dropdown.selectedIndex;
  cities = country_city[index].cities;

  var i,
    L = city_dropdown.options.length - 1;
  for (i = L; i >= 0; i--) {
    city_dropdown.remove(i);
  }

  for (let i = 0; i < cities.length; i++) {
    option = document.createElement("option");
    option.text = cities[i];
    city_dropdown.add(option);
  }
}

var country_city;
fetch("https://countriesnow.space/api/v0.1/countries", options)
  .then((response) => response.json())
  .then((response) => {
    data = response.data;
    country_city = data;
    console.log(country_city);
    let option;

    for (let i = 0; i < data.length; i++) {
      option = document.createElement("option");
      option.text = data[i].country;
      country_dropdown.add(option);
    }
  })
  .catch((err) => console.error(err));
