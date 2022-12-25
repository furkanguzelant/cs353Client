var employeeID = localStorage.getItem("userID");

var licensePlateDropdown = document.getElementById("licensePlate");
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/vehicle/getVehiclesOfLogisticUnit?employeeID=${employeeID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    var data = JSON.parse(result);
    var r = new Array(),
      j = -1;
    for (var i = 0, size = data.length; i < size; i++) {
      r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].licensePlate;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].status;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].currentWeight;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].maxWeight;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      var courierID = data[i].courierID;
      if (courierID != 0) r[++j] = data[i].courierID;
      r[++j] = " </td></tr>";

      if (data[i].status == "Available") {
        option = document.createElement("option");
        option.text = data[i].licensePlate;
        licensePlateDropdown.add(option);
      }
    }

    $("#tableBody").html(r.join(""));
  })

  .catch((error) => console.log("error", error));

var courierDropdown = document.getElementById("courierID");
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/logisticUnit/getCouriersByEmployeeID?employeeID=${employeeID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    var data = JSON.parse(result);
    data.couriers.forEach((element) => {
      option = document.createElement("option");
      option.text = element.userID + " " + element.name;
      courierDropdown.add(option);
    });
  })
  .catch((error) => console.log("error", error));

document.getElementById("createBtn").addEventListener("click", (e) => {
  e.preventDefault();
  createVehicle();
});

function createVehicle() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var licencePlate = document.getElementById("newLicensePlate").value;
  var maxWeight = document.getElementById("weight").value;

  var raw = JSON.stringify({
    licensePlate: licencePlate,
    status: 1,
    maxWeight: maxWeight,
    currentWeight: 0,
    courierID: null,
    addressID: null,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/vehicle/insertVehicle?employeeID=${employeeID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
      window.location.href = "employeeAssignVehicle.html";
    })
    .catch((error) => console.log("error", error));
}

document.getElementById("assignBtn").addEventListener("click", (e) => {
  e.preventDefault();
  assignVehicle();
});

function assignVehicle() {
  var licensePlate =
    licensePlateDropdown.options[licensePlateDropdown.selectedIndex].text;
  var courierDropdown = document.getElementById("courierID");
  var courierID =
    courierDropdown.options[courierDropdown.selectedIndex].text.split(" ")[0];
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/vehicle/assignVehicleToCourier?licensePlate=${licensePlate}&courierID=${courierID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
      window.location.href = "employeeAssignVehicle.html";
    })
    .catch((error) => console.log("error", error));
}
