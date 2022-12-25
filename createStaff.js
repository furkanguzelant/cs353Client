dropdown = document.getElementById("logisticUnit");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch("http://localhost:8080/api/logisticUnit", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    var data = JSON.parse(result);
    data.logisticUnitList.forEach((element) => {
      option = document.createElement("option");
      option.text = element.logisticUnitID + " " + element.name;
      dropdown.add(option);
    });
  })
  .catch((error) => console.log("error", error));

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  createStaff();
});

function createStaff() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;
  let salary = document.getElementById("salary").value;
  let birthdate = document.getElementById("birthdate").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  let logisticUnitElement = document.getElementById("logisticUnit");
  let logisticUnit =
    logisticUnitElement.options[logisticUnitElement.selectedIndex].text;
  let logisticUnitID = logisticUnit.split(" ")[0];

  var staffTypeID = document.querySelector(
    'input[name="staffType"]:checked'
  ).id;

  var staffType = document.querySelector(
    "label[for=" + staffTypeID + "]"
  ).innerHTML;
  type = staffType.charAt(0);

  var raw = JSON.stringify({
    name: name,
    birthDate: birthdate,
    type: type,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    salary: salary,
    logisticUnitID: logisticUnitID,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/user/createUser/staff", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
    })
    .catch((error) => console.log("error", error));
}
