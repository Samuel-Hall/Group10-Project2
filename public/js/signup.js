// THIS IS THE LOGIC FOR THE REGISTRATION PAGE (/SIGNUP)
// Progressing, but getting a 404 error on POST request

var addUserName = $("#inputUserName");
var addPassword = $("#inputPassword");
var confirmPassword = $("#confirmPassword");
var registerBtn = $("#registerBtn");

var API = {
  saveUser: function(newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/users/",
      data: JSON.stringify(newUser)
    });
  },
  checkUsers: function() { // method intended to check if a userName (addUserName) is already taken
    return $.ajax({
      url: "/api/users/",
      type: "GET"
    })
}
};


var handleRegistration = function(event) {
  event.preventDefault();
  console.log("username: " + addUserName.val());
  console.log("password: " + addPassword.val());
  console.log("confirmPassword: " + confirmPassword.val());

  var newUser = {
    userName: addUserName.val().trim(),
    password: addPassword.val().trim(),
  };

  console.log(newUser);

  if (!(addPassword.val().trim() === confirmPassword.val().trim())) {
    alert("Passwords do not match");
    return;
  }

  else if (!(newUser.userName || newUser.password)) {
    alert("All fields are required to register");
    return;
  }

  // PROBLEMS
  API.checkUsers().then(function(newUser) {
    console.log("Checking to validate userName available...");

  })

  //This POST request works
  API.saveUser(newUser).then(function() {
    console.log("new user added to table!");
    alert("Account created successfully! <Login>");

  });

  addUserName.val("");
  addPassword.val("");
  confirmPassword.val("");
};

registerBtn.on("click", handleRegistration);
