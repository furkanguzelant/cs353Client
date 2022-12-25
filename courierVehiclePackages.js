var courierID = localStorage.getItem("userID");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/package/getPackagesInVehicleOfCourier?courierID=${courierID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    data = JSON.parse(result).packageInfo;

    var r = new Array(),
      j = -1;
    for (var i = 0, size = data.length; i < size; i++) {
      var packageID = data[i].pack.packageID;
      r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.packageID;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.weight;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.volume;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.tags;
      r[++j] = "</td><td  style='max-width: 400px'>";
      r[++j] =
        data[i].addressToDeliver.country +
        ", " +
        data[i].addressToDeliver.city +
        ", " +
        data[i].addressToDeliver.district +
        ", " +
        data[i].addressToDeliver.addressInfo +
        " " +
        data[i].addressToDeliver.zipcode;
      r[
        ++j
      ] = `<td class='text-center'><button name = 'editBtn' id = 'confirm${packageID}' onclick = 'confirm(this.id)' 
      class='btn btn-primary'type='button'style='margin-left: 7px'> Confirm </button></td></tr>`;
    }

    console.log(r);
    $("#tableBody").html(r.join(""));
  })
  .catch((error) => console.log("error", error));

function confirm(id) {
  var packageID = id.substring(7);

  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/package/confirmDelivery?packageID=${packageID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result);
      alert(data.statusMessage);
      window.location.reload();
    })
    .catch((error) => console.log("error", error));
}
