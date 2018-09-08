// Get references to page elements
var addExpense = $("#addExpense");
var addTotal = $("#addTotal");
var addDate = $("#addDate");
var addCategory = $("#addCategory");
var $submitBtn = $("#submit");
var $expenseList = $("#expense-list");
var categoryArray = [
  "Rent/Housing",
  "Electric",
  "Gas",
  "Groceries",
  "Vehicle Expense"
];
// module.exports = categoryArray;

// The API object contains methods for each kind of request we'll make
var API = {
  saveExpense: function(expense) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/expenses",
      data: JSON.stringify(expense)
    });
  },
  getExpenses: function() {
    console.log("getting expenses!");
    return $.ajax({
      url: "api/expenses/",
      type: "GET"
    });

    // .then(function(results) {
    //   console.log(results);
    // })
  },
  updateExpense: function(expense) {
    console.log("Updating expense");
    $.ajax({
      method: "PUT",
      url: "/api/expenses",
      data: expense
    }).then(function() {
      // window.location.href = "/home";
      refreshExpenses();
    });
  },
  deleteExpense: function(id) {
    return $.ajax({
      url: "api/expenses/" + id,
      type: "DELETE"
    });
  },
  getChartData: function() {
    console.log("getting stuff for charts!");
    return $.ajax({
      url: "api/expenseChart/",
      type: "GET"
    });

    // .then(function(results) {
    //   console.log(results);
    // })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExpenses = function() {
  $expenseList.html(
    "<tr><th scope='col'>Expense</th><th scope='col'>Total</th><th scope='col'>Date</th><th scope='col'>Category</th><th scope='col'>Edit/Delete</th></tr>"
  );
  API.getExpenses().then(function(data) {
    console.log("Refreshing expenses data: ", data);
    for (var i = 0; i < data.length; i++) {
      var updateBtn = $("<button>")
        .attr({
          class: "btn btn-success update",
          id: "update" + data[i].id
        })
        .append(
          $("<i>").attr({
            class: "far fa-edit"
          })
        );
      var deleteBtn = $("<button>")
        .attr({
          class: "btn btn-danger float-right delete",
          id: "delete" + data[i].id
        })
        .append(
          $("<i>").attr({
            class: "far fa-times-circle"
          })
        );
      var $expenseRow = $("<tr>").attr({
        id: data[i].id
      });
      $expenseList.append($expenseRow);
      for (var property in data[i]) {
        if (
          property !== "id" &&
          property !== "createdAt" &&
          property !== "updatedAt"
        ) {
          if (property === "total") {
            var $expenseData = $("<td>").text("$" + data[i][property]);
            $expenseRow.append($expenseData);
          } else {
            var $expenseData = $("<td>").text(data[i][property]);
            $expenseRow.append($expenseData);
          }
        }
      }
      $expenseRow.append($("<td>").append(updateBtn, [deleteBtn]));
    }
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("hello");

  console.log("expense: " + addExpense.val());
  console.log("total: " + addTotal.val());
  console.log("date: " + addDate.val());
  console.log("category: " + addCategory.val());

  var expense = {
    expense: addExpense.val().trim(),
    total: addTotal.val().trim(),
    date: addDate.val().trim(),
    category: addCategory.val().trim()
  };

  console.log(expense);

  if (!(expense.expense || expense.total || expense.date || expense.category)) {
    alert("You must complete the form!");
    return;
  }

  API.saveExpense(expense).then(function() {
    refreshExpenses();
  });

  addExpense.val("");
  addTotal.val("");
  addDate.val("");
  addCategory.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = parseInt(
    $(this)
      .attr("id")
      .slice(6)
  );
  console.log("Deleting item #" + idToDelete + "...");

  API.deleteExpense(idToDelete).then(function() {
    refreshExpenses();
  });
};

var handleUpdateBtnClick = function() {
  // Prevent duplicate event listeners
  $(".saveEdit").off("click");
  // Array to hold current row values
  var valArray = [];
  var updatedExpense = {
    id: 0,
    expense: "",
    total: 0,
    date: "",
    category: ""
  };
  // Get id of the row entry
  var idToUpdate = parseInt(
    $(this)
      .attr("id")
      .slice(6)
  );

  console.log("Updating item #" + idToUpdate + "...");

  var rowToUpdate = $("#" + idToUpdate).contents();
  var rowField;

  console.log(rowToUpdate);
  function displayEditModal() {
    modal.style.display = "block";
    $("#editCategory").html("");
    // Populating the dropdown menu
    for (var l = 0; l < categoryArray.length; l++) {
      var newOption = $("<option>")
        .attr({
          value: categoryArray[l]
        })
        .text(categoryArray[l]);
      $("#editCategory").append(newOption);
    }
    // Inserting the current values into the input fields
    $("#editExpense").val(valArray[0]);
    $("#editTotal").val(valArray[1]);
    $("#editDate").val(valArray[2]);
    $("#editCategory").val(valArray[3]);

    // Date picker for edit date field
    $("#editDate").datepicker({
      dateFormat: "yy-mm-dd"
    });
  }

  function getCurrentValues(data) {
    // Get the text for each td in the tr
    for (var j = 0; j < 4; j++) {
      rowField = data[j].innerText;
      // Remove $ from total
      if (rowField.includes("$")) {
        rowField = rowField.split("$").pop();
      }
      console.log("Row field: " + rowField);
      // Update value array
      valArray.push(rowField);
    }
    // insertEditFields();
    displayEditModal();
  }
  // This function replaced all the td in each row
  // function insertEditFields() {
  //   var newOption;
  //   for (var k = 0; k < 5; k++) {
  //     if (k < 3) {
  //       var newInput = $("<input>")
  //         .attr({
  //           id: "field" + k,
  //           type: "text"
  //         })
  //         .val(valArray[k]);
  //       console.log("Inserting text field...");
  //       console.log(rowToUpdate[k]);
  //       var fieldValue = rowToUpdate[k];
  //       $(fieldValue).html(
  //         $("<form>")
  //           .attr({ id: "newForm" + k })
  //           .append(newInput)
  //       );
  //     } else if (k === 3) {
  //       var newDrop = $("<select>").attr({
  //         id: "fieldDrop" + idToUpdate
  //       });
  //       var fieldValue = rowToUpdate[k];
  //       $(fieldValue).html(
  //         $("<form>")
  //           .attr({ id: "newForm" + k })
  //           .append(newDrop)
  //       );
  //       for (var l = 0; l < categoryArray.length; l++) {
  //         newOption = $("<option>")
  //           .attr({
  //             value: categoryArray[l]
  //           })
  //           .text(categoryArray[l]);
  //         $(newDrop).append(newOption);
  //       }
  //     } else if (k === 4) {
  //       console.log("Creating save button...");
  //       var saveBtn = $("<button>")
  //         .attr({
  //           class: "btn btn-info save",
  //           id: "save" + idToUpdate
  //         })
  //         .append(
  //           $("<i>").attr({
  //             class: "far fa-save"
  //           })
  //         );
  //       var fieldValue = rowToUpdate[k];
  //       $(fieldValue).html(
  //         $("<form>")
  //           .attr({ id: "newForm" + k })
  //           .append(saveBtn)
  //       );
  //     }
  //   }
  // }
  function updateExpense() {
    updatedExpense.id = idToUpdate;
    updatedExpense.expense = $("#editExpense").val();
    updatedExpense.total = $("#editTotal").val();
    updatedExpense.date = $("#editDate").val();
    updatedExpense.category = $("#editCategory").val();
    console.log("Updated expense: ", updatedExpense);
    API.updateExpense(updatedExpense);
    // .then(function() {
    //   refreshExpenses();
    // });
  }
  //Event listener for save button
  $(".saveEdit").on("click", function(event) {
    event.preventDefault();
    updateExpense();
    modal.style.display = "none";
  });
  getCurrentValues(rowToUpdate);

  console.log(valArray);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$expenseList.on("click", ".delete", handleDeleteBtnClick);
$expenseList.on("click", ".update", handleUpdateBtnClick);

refreshExpenses();

// Testing modal with template from previous project
// $(".homePage").hide();
// Get the modal
var modal = document.getElementById("editModal");

// Get the button that opens the modal
// var btn = document.getElementById("scheduleModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
// $(document.body).on("click", "#scheduleModal", function() {
//     modal.style.display = "block";
// })

// When the user clicks on <span> (x), close the modal
$(document.body).on("click", ".close", function() {
  modal.style.display = "none";
  newExpenseModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//NEW EXPENSE BTN / MODAL

var newExpenseBtn = document.getElementById("newExpenseBtn");
var newExpenseModal = document.getElementById("newExpenseModal");
// var closeBtn = document.getElementById("closeBtn");

newExpenseBtn.onclick = function() {
  newExpenseModal.style.display = "block";
  console.log("Clicked it!");
  $("#addCategory").html("");
  // Populating the dropdown menu
  for (var l = 0; l < categoryArray.length; l++) {
    var newOption = $("<option>")
      .attr({
        value: categoryArray[l]
      })
      .text(categoryArray[l]);
    $("#addCategory").append(newOption);
  }
  // Date picker for edit date field
  $("#addDate").datepicker({
    dateFormat: "yy-mm-dd"
  });
};

window.onclick = function(event) {
  if (event.target == newExpenseModal) {
    newExpenseModal.style.display = "none";
  }
};

// closeBtn.onclick = function() {
//   newExpenseModal.style.display = "none";
// };

$submitBtn.onclick = function() {
  console.log("Submit button clicked");
};

// $(document.body).on("click", "#closeBtn", function() {
//   newExpenseModal.style.display = "none";
// }

// Hide login/Create account, show homePage
// $("#login").on("click", function(event) {
//     event.preventDefault();
//     $(".landingPage").hide();
//     $(".homePage").show();
// })
