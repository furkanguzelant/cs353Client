var employeeID = localStorage.getItem("userID");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/package/displayPackagesByEmployeeID?employeeID=${employeeID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    var data = JSON.parse(result);

    var r = new Array(),
      j = -1;
    for (var i = 0, size = data.length; i < size; i++) {
      var packageID = data[i].pack.packageID;
      r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.packageID;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.status;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.tags;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.storageID;
      r[++j] = "</td><td  style='max-width: 400px'>";
      r[++j] =
        data[i].address.country +
        ", " +
        data[i].address.city +
        ", " +
        data[i].address.district +
        ", " +
        data[i].address.addressInfo +
        " " +
        data[i].address.zipcode;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].payment.status;

      var btnName = "Hold Package";
      var disabled = "";
      if (data[i].pack.status == "Hold") {
        btnName = "Remove Hold";
        disabled = "disabled = disabled";
      }

      r[
        ++j
      ] = `</td><td><input ${disabled} name = 'assignCheckbox' id = 'assign${packageID}' type='checkbox' style='width: 20px; height: 20px'/></td>`;
      r[
        ++j
      ] = `<td class='text-center'><button name = 'editBtn' id = 'edit${packageID}' onclick = 'putHold(this.id)' class='btn btn-primary'type='button'style='margin-left: 7px'>${btnName}</button></td></tr>`;
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

logUnitDropdown = document.getElementById("logisticUnit");

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
      logUnitDropdown.add(option);
    });
  })
  .catch((error) => console.log("error", error));

document.getElementById("assignBtn").addEventListener("click", (e) => {
  e.preventDefault();
  assignPackage();
});

function assignPackage() {
  packageIDList = [];
  document
    .querySelectorAll('[name="assignCheckbox"]:checked')
    .forEach((element) => {
      packageIDList.push(parseInt(element.id.substring(6)));
    });

  let courier = courierDropdown.options[courierDropdown.selectedIndex].text;
  let courierID = courier.split(" ")[0];
  console.log(courierID);

  var isLogUnitSelected = document.getElementById("formCheck-1").checked;

  var logisticUnitID = 0;

  if (isLogUnitSelected) {
    var logisticUnit =
      logUnitDropdown.options[logUnitDropdown.selectedIndex].text;
    logisticUnitID = parseInt(logisticUnit.split(" ")[0]);
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(packageIDList);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/package?courierID=${courierID}&logisticUnitID=${logisticUnitID}&employeeID=${employeeID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
      window.location.href = "employeeAssignPackage.html";
    })
    .catch((error) => console.log("error", error));
}

function putHold(id) {
  var status = 2;
  var packageID = id.substring(4);
  var button = document.getElementById("edit" + packageID);
  var disabled = document.getElementById("assign" + packageID).disabled;
  if (!disabled) {
    status = 4;
    document.getElementById("assign" + packageID).disabled = true;
    document.getElementById("edit" + packageID).textContent = "Remove Hold";
  } else {
    status = 2;
    document.getElementById("assign" + packageID).disabled = false;
    document.getElementById("edit" + packageID).textContent = "Hold Package";
  }

  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/package/updatePackageStatus?packageID=${packageID}&packageStatus=${status}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  window.location.href = "employeeAssignPackage.html";
}
