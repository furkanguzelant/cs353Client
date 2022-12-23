document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  createPackage();
});
var storageIDdropdown = document.getElementById("storageID");
var employeeID = localStorage.getItem("userID");
let option;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  `http://localhost:8080/api/storage/getStoragesByEmployeeID?employeeID=${employeeID}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    var resultJson = JSON.parse(result);
    var storages = resultJson.Storages;

    storages.forEach((storage) => {
      option = document.createElement("option");
      option.text = `ID: ${storage.storageID} Volume: ${storage.currentVolume}/${storage.maxVolume}`;
      storageIDdropdown.add(option);
    });
  })
  .catch((error) => console.log("error", error));

var receiverAddressID;
var receiverID;

function createCustomer() {
  var form = document.getElementById("form");
  var name = document.getElementById("name").value;
  var birthDate = document.getElementById("birthdate").value;
  console.log(birthDate);

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
    customer: {
      name: name,
      birthDate: birthDate,
      type: "C",
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

  var id = fetch(
    "http://localhost:8080/api/user/createUser/customer",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return (resultJson = JSON.parse(result));
    })
    .then((resultJson) => {
      receiverID = resultJson.customerID;
      receiverAddressID = resultJson.addressID;
      return receiverID;
    })
    .catch((error) => console.log("error", error));

  return id;
}

async function createPackage() {
  var isRegistered = document.getElementById("formCheck-2").checked;
  if (!isRegistered) await createCustomer();
  else receiverID = document.getElementById("receiverID").value;

  var form = document.getElementById("form1");
  console.log(new FormData(form).values());

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var weight = document.getElementById("weight").value;
  var volume = document.getElementById("volume").value;
  var senderID = document.getElementById("senderID").value;

  var tags = [];
  var tagIDList = [];

  document.querySelectorAll('[name="tags"]:checked').forEach((element) => {
    tagIDList.push(element.id);
  });

  for (let i = 0; i < tagIDList.length; i++) {
    var tag = document.querySelector(
      "label[for=" + tagIDList[i] + "]"
    ).innerHTML;
    tags.push(tag);
  }

  // if registered get receiver id
  // if registered get receiver address id

  var paymentTypeID = document.querySelector(
    'input[name="paymentType"]:checked'
  ).id;
  var paymentType = document.querySelector(
    "label[for=" + paymentTypeID + "]"
  ).innerHTML;

  var type;
  if (paymentType == "Sender pays") type = 0;
  else type = 1;

  var storageID = parseInt(
    storageIDdropdown.options[storageIDdropdown.selectedIndex].text.split(
      " "
    )[1]
  );
  console.log(storageID);

  var price = document.getElementById("price").value;
  var paid = document.getElementById("paid").checked;

  var status;
  if (paid) status = 1;
  else status = 0;
  console.log(status);

  // create step
  var raw = JSON.stringify({
    pack: {
      weight: weight,
      volume: volume,
      status: 2,
      tags: tags,
      senderAddressID: null,
      receiverAddressID: receiverAddressID,
      licencePlate: null,
      senderID: senderID,
      receiverID: receiverID,
      storageID: storageID,
    },
    payment: {
      price: parseInt(price),
      type: type,
      status: status,
    },
    employeeID: employeeID,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/package/insertPackage", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var resultJson = JSON.parse(result);
      alert(resultJson.statusMessage);
    })
    .catch((error) => console.log("error", error));
}

function updateCustomerInfoInput() {
  var registerRadio = document.getElementById("formCheck-2");
  console.log(registerRadio.checked);
  if (registerRadio.checked) {
    document.getElementById("name").style.display = "none";
    document.getElementById("newCustomerInfo").style.display = "none";
    document.getElementById("receiverID").style.display = "flex";
  } else {
    document.getElementById("receiverID").style.display = "none";
    document.getElementById("name").style.display = "flex";
    document.getElementById("newCustomerInfo").style.display = "flex";
  }
}
