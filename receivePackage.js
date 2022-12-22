document.getElementById("receiveBtn").addEventListener("click", (e) => {
    e.preventDefault();
    receivePackage();
});

const storageIDdropdown = document.getElementById("storageID");
let employeeID = localStorage.getItem("userID");
console.log("Emplooye ID: " + employeeID);
fillStorageIDs();


function receivePackage() {
    alert("Button Pressed");

    let packageId = document.getElementById("name-2").value;
    console.log("Package ID: " + packageId);


    let putAHold = document.getElementById("putAhold").value;
    console.log("Put a hold " + putAHold);


    // TODO insert package into the related storage Id;
}

function fillStorageIDs() {

    let option;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/storage/getStoragesByEmployeeID?employeeID=${employeeID}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            var resultJson = JSON.parse(result);
            option = document.createElement("option");
            resultJson.storageIDs


        })
        .catch(error => console.log('error', error));


}

