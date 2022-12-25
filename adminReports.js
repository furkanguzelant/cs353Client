var upperWeightLimit = 10000000;
var lowerWeightLimit = 0;

document.getElementById("filterBtn").addEventListener("click", (e) => {
  e.preventDefault();
  upperWeightLimit = document.getElementById("maxWeight").value;
  lowerWeightLimit = document.getElementById("minWeight").value;
  getPackageInfo();
});

getPackageInfo();

function getPackageInfo() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/package/getPackagesFilterByWeight?upperWeightLimit=${upperWeightLimit}&lowerWeightLimit=${lowerWeightLimit}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      var data = JSON.parse(result).List;
      console.log(data);
      var r = new Array();
      j = -1;
      for (var i = 0, size = data.length; i < size; i++) {
        var packageID = data[i].pack.packageID;
        r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].pack.packageID;
        r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].pack.status;
        r[++j] = "</td><td  style='max-width: 400px'>";
        r[++j] = data[i].pack.weight;
        r[++j] = "</td><td  style='max-width: 400px'>";
        r[++j] = data[i].address.city;
        r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].payment.status;
        r[++j] = "</td></tr>";
      }
      $("#tableBody").html(r.join(""));
    })
    .catch((error) => console.log("error", error));
}

document.getElementById("searchBtn").addEventListener("click", (e) => {
  e.preventDefault();
  filterByCity();
});

function filterByCity() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  var inputString = document.getElementById("searchInput").value;

  fetch(
    `http://localhost:8080/api/package/getPackagesFilterByCity?inputString=${inputString}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      var data = JSON.parse(result).List;
      console.log(data);
      var r = new Array();
      j = -1;
      for (var i = 0, size = data.length; i < size; i++) {
        var packageID = data[i].pack.packageID;
        r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].pack.packageID;
        r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].pack.status;
        r[++j] = "</td><td  style='max-width: 400px'>";
        r[++j] = data[i].pack.weight;
        r[++j] = "</td><td  style='max-width: 400px'>";
        r[++j] = data[i].address.city;
        r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
        r[++j] = data[i].payment.status;
        r[++j] = "</td></tr>";
      }
      $("#tableBody").html(r.join(""));
    })
    .catch((error) => console.log("error", error));
}

document.getElementById("viewBtn").addEventListener("click", (e) => {
  e.preventDefault();
  viewStatistics();
});

function viewStatistics() {
  popupWindow = window.open(
    "adminStatisticsPopup.html",
    "popUpWindow",
    "height=500,width=500,left=100,top=100,resizable=no,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
  );

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/api/package/getPackageStatistics",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var data = JSON.parse(result).packageStatisticsInfo;

      var message =
        "City with the highest number of packages: " +
        data.maxPackageCity +
        "<br>" +
        "Logistic Unit : " +
        data.maxLogisticUnit +
        "<br>" +
        "Total packages: " +
        data.totalPackages +
        "<br>" +
        "Packages In Distribution: " +
        data.numberOfPackageInDistribution +
        "<br>" +
        "Packages In Logistic Units: " +
        data.numberOfPackageInBranch;

      popupWindow.document.write(message);
    })
    .catch((error) => console.log("error", error));
}
