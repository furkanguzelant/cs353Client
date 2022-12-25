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
      r[++j] = data[i].payment.type;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].payment.price;

      var disabled = "";
      if (
        data[i].payment.status == "PAID" ||
        data[i].payment.type == "COUNTER_PAY"
      ) {
        disabled = "disabled = disabled";
      }

      r[
        ++j
      ] = `<td class='text-center'><button ${disabled} name = 'editBtn' onclick='pay(this.id,  ${data[i].payment.price})' id = 'pay${packageID}'
      class='btn btn-primary'type='button'style='margin-left: 7px'> Pay </button></td></tr>`;
    }

    $("#tableBody").html(r.join(""));
  })
  .catch((error) => console.log("error", error));

function pay(id, price) {
  var packageID = id.substring(3);
  console.log(packageID);
  console.log(price);

  popupWindow = window.open(
    "payment.html",
    "popUpWindow",
    "height=500,width=500,left=100,top=100,resizable=no,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
  );

  popupWindow.addEventListener("load", function () {
    console.log(popupWindow.document);
    console.log(popupWindow.document.getElementById("payBtn"));

    popupWindow.document
      .getElementById("payBtn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        makePayment();
      });
  });

  function makePayment() {
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };
    console.log(packageID);

    fetch(
      `http://localhost:8080/api/payment/makePayment?packageID=${packageID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        var data = JSON.parse(result);
        console.log(data);
        popupWindow.alert("Price: " + price + " " + data.statusMessage);
        popupWindow.close();
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }
}
