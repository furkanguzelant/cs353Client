var customerID = localStorage.getItem("userID");
console.log(customerID);
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/package/getSentPackagesOfCustomer?customerID=${customerID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    var data = JSON.parse(result).List;
    var r = new Array();
    j = -1;
    for (var i = 0, size = data.length; i < size; i++) {
      var packageID = data[i].pack.packageID;
      r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.packageID;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].pack.status;
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
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].payment.price;

      var disabled = "";
      if (data[i].payment.status == "PAID") {
        disabled = "disabled = disabled";
      }

      r[
        ++j
      ] = `<td class='text-center'><button ${disabled} name = 'editBtn' id = 'edit${packageID}'
      class='btn btn-primary'type='button'style='margin-left: 7px'> Pay </button></td></tr>`;
    }
    console.log(r);
    $("#tableBody").html(r.join(""));
  })
  .catch((error) => console.log("error", error));
