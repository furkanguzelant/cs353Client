document.getElementById("loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

function login() {
  var raw = "";

  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  console.log(email);
  console.log(password);

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/api/login?email=" + email + "&password=" + password,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var resultJson = JSON.parse(result);
      var tokens = resultJson.token;
      if (tokens === null) {
        alert("bad credentials");
        setErrorMsg("Mail or password is wrong!");
        console.log("Bad Credentials");
        setErrorOnInput(true);
      } else if (tokens === undefined) {
        alert("undefined");
        setErrorMsg("Database Connection Problem!");
        setErrorOnInput(true);
      } else {
        alert("Hello");
        console.log(resultJson);
        window.location.href = "adminHomePage.html";
      }
    })
    .catch((error) => console.log("error", error));
  return false;
}
