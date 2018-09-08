var loginUserName = $("#loginUserName");
var loginPassword = $("#loginPassword");
var loginBtn = $(".btn-signin");

var API = {
  userAuthenticate: function(userName) {
    return $.ajax({
      url: "api/users/",
      type: "GET"
    });
}};

var handleLogin = function(event) {
  event.preventDefault();

  console.log("username: " + loginUserName.val());
  console.log("password: " + loginPassword.val());

  var loginAttempt = {
    userName: loginUserName.val(),
    password: loginPassword.val()
  };

// will need logic to compare these values ^ against existing user entries in the DB 
// for a match of BOTH

  console.log(loginAttempt);


if (!(loginAttempt.userName || loginAttempt.password)) {
    alert("All fields are required to login!");
  }

// STILL NEED TO BUILD THIS OUT (IF login, THEN switch page)
// IF LOGIN would = the result of a query to validate loginUserName and loginPassword inside the User table
API.userAuthenticate(loginUserName).then(function() {
  console.log("Trying to authenticate...");
})

};

// REFERENCE 'GET' REQUEST FROM HOME VIEW TABLE FOR SYNTAX TO GRAB TABLE DATA

loginBtn.on("click", handleLogin);
