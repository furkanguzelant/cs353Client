document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  register();
});

function register() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var verifyPassword = document.getElementById("verifyPassword").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var birthdate = document.getElementById("birthdate").value;

  var countryElement = document.getElementById("countryId");
  var country = countryElement.options[countryElement.selectedIndex].text;

  var cityElement = document.getElementById("cityId");
  var city = cityElement.options[cityElement.selectedIndex].text;

  var district = document.getElementById("district").value;
  var zipcode = document.getElementById("zipcode").value;
  var addressInfo = document.getElementById("addressInfo").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    registeredCustomer: {
      name: name,
      birthDate: birthdate,
      type: "RC",
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    },
    address: {
      country: country,
      city: city,
      district: district,
      zipcode: zipcode,
      addressInfo: addressInfo,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/registerCustomer", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);

      window.location.href = "index.html";
    })
    .catch((error) => console.log("error", error));
}
