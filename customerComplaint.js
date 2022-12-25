var customerID = localStorage.getItem("userID");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
var packageIDDropdown = document.getElementById("packageID");

fetch(
  `http://localhost:8080/api/package/getIncomingPackagesOfCustomer?customerID=${customerID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    var data = JSON.parse(result).List;
    data.forEach((element) => {
      option = document.createElement("option");
      option.text = element.pack.packageID;
      packageIDDropdown.add(option);
    });
  })
  .catch((error) => console.log("error", error));

document.getElementById("sendBtn").addEventListener("click", (e) => {
  e.preventDefault();
  makeComplaint();
});
function makeComplaint() {
  var complaintType = document.querySelector(
    '[name="complaintType"]:checked'
  ).value;

  let packageID =
    packageIDDropdown.options[packageIDDropdown.selectedIndex].text;

  var message = document.getElementById("message").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    packageID: packageID,
    registeredCustomerID: customerID,
    typeOfComplaint: complaintType,
    message: message,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/complaint/makeComplaint", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
    })
    .catch((error) => console.log("error", error));
}
