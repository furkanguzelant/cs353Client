document.getElementById("receiveBtn").addEventListener("click", (e) => {
    e.preventDefault();
    employeeReceivePackage();
});

const storageIDdropdown = document.getElementById("storageID");
let employeeID = localStorage.getItem("userID");
console.log("Emplooye ID: " + employeeID);
fillStorageIDs();


async function employeeReceivePackage() {
    let packageId = document.getElementById("name-2").value;
    console.log("Package ID: " + packageId);

    var selectedStorageID = parseInt(storageIDdropdown.options[storageIDdropdown.selectedIndex].text.split(" ")[1]);
    console.log("Selected StorageID = " + selectedStorageID);

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    await fetch(`http://localhost:8080/api/storage/insertPackageToStorage?packageID=${packageId}&storageID=${selectedStorageID}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    fillStorageIDs();
    window.location.reload();
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
            var storages = resultJson.Storages;

            storages.forEach(storage => {
                option = document.createElement("option");
                option.text = `ID: ${storage.storageID} Volume: ${storage.currentVolume}/${storage.maxVolume}`;
                storageIDdropdown.add(option);
            });
        })
        .catch(error => console.log('error', error));
}

