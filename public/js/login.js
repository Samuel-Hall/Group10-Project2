var loginUserName = $("#loginUserName");
var loginPassword = $("#loginPassword");
var loginBtn = $(".btn-signin");

var API = {
  userAuthenticate: function() {
    console.log("getting users to compare credentials!");;

    return $.ajax({
      url: "api/users",
      type: "GET"
    });
}};

var handleLogin = function(event) {
  event.preventDefault();

  console.log("username: " + loginUserName.val());
  console.log("password: " + loginPassword.val());

  var loginAttempt = {
    userName: loginUserName.val(),
    passwordl: loginPassword.val()
  };

// will need logic to compare these values ^ against existing user entries in the DB 
// for a match of BOTH

  console.log(loginAttempt);


if (!(loginAttempt.userName || loginAttempt.password)) {
    alert("All fields are required to register");
  }
};

// REFERENCE 'GET' REQUEST FROM HOME VIEW TABLE FOR SYNTAX TO GRAB TABLE DATA

loginBtn.on("click", handleLogin);
