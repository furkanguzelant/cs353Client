var requestOptions = {
  method: "GET",
  redirect: "follow",
};

var messageList = new Map();
fetch("http://localhost:8080/api/complaint/getComplaints", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);

    data = JSON.parse(result).complaints;

    var r = new Array(),
      j = -1;
    for (var i = 0, size = data.length; i < size; i++) {
      var complaintID = data[i].complaintID;
      messageList.set(complaintID, data[i].message);
      r[++j] = "<tr><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].complaintID;
      r[++j] = "<td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].registeredCustomerID;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].packageID;
      r[++j] = "</td><td class='text-truncate' style='max-width: 200px'>";
      r[++j] = data[i].typeOfComplaint;
      r[
        ++j
      ] = `<td class='text-center' ><button name = 'readBtn' id = 'read${complaintID}' onclick = 'read(this.id)' 
      class='btn btn-primary'type='button'> Read </button>`;
      r[
        ++j
      ] = `<button style='margin-left:7px' disabled= 'disabled' name = 'deleteBtn' id = 'delete${complaintID}' onclick = 'deleteComplaint(this.id)' 
      class='btn btn-danger'type='button'> Delete </button></tr>`;
    }

    $("#tableBody").html(r.join(""));
    console.log(messageList);
  })

  .catch((error) => console.log("error", error));

function read(id) {
  var complaintID = id.substring(4);
  var message = messageList.get(parseInt(complaintID));

  document.getElementById("delete" + complaintID).disabled = false;

  popupWindow = window.open(
    "adminStatisticsPopup.html",
    "popUpWindow",
    "height=500,width=500,left=100,top=100,resizable=no,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
  );

  popupWindow.document.write(message);
}

function deleteComplaint(id) {
  var complaintID = id.substring(6);

  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch(
    `http://localhost:8080/api/complaint?complaintID=${complaintID}`,
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
