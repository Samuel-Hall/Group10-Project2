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
      url: "api/users",
      data: JSON.stringify(newUser)
    });
  },
  getUsers: function() {
    console.log("getting expenses!");
    return $.ajax({
      url: "api/users/",
      type: "GET"
    });
    // add GET request needed to loop through usernames and make sure name isn't taken?
  }};


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

    // This (line 40 loop) isn't quite right -- think we need to have a GET request, then
    // loop through GET results (userName) and compare new username against the existing ones
    // if it already exists, prompt user to pick a different username

    // select * where username = newUser
    // if that's null, then create newuser
//   for (var i = 0; i < user.length; i++) {
//     if (newUser.userName === users.userName[i]) {
//       return("Username already exists. Please try again.");
//     }
//   }

  if (!(addPassword.val().trim() === confirmPassword.val().trim())) {
    alert("Passwords do not match");
    return;
  }

  else if (!(newUser.userName || newUser.password)) {
    alert("All fields are required to register");
    return;
  }

  API.saveUser(newUser).then(function() {
    console.log("new user added to table!");
    alert("Account created successfully! <Login>");

    // refresh users? might need to define a function to use here
  });

  addUserName.val("");
  addPassword.val("");
  confirmPassword.val("");
};

registerBtn.on("click", handleRegistration);
