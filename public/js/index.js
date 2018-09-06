// Get references to page elements
var title = $("#title");
var total = $("#total");
var date = $("#date");
var category = $("#category");
var $submitBtn = $("#submit");
var $expenseList = $("#expense-list");
var categoryArray = ["Category 1", "Category 2", "Category 3"];

// The API object contains methods for each kind of request we'll make
//**post request to send the data that i have in the text field**
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
      url: "/api/expenses/",
      data: expense
    });
    // .then(function() {
    //   window.location.href = "/";
    // });
  },
  deleteExpense: function(id) {
    return $.ajax({
      url: "api/expenses/" + id,
      type: "DELETE"
    });
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

  console.log("title: " + title.val());
  console.log("total: " + total.val());
  console.log("date: " + date.val());
  console.log("category: " + category.val());

  var expense = {
    title: title.val().trim(),
    total: total.val().trim(),
    date: date.val().trim(),
    category: category.val().trim()
  };

  console.log(expense);

  if (!(expense.title && expense.total && expense.date && expense.category)) {
    alert("You must enter each field!");
    return;
  }

  API.saveExpense(expense).then(function() {
    refreshExpenses();
  });

  title.val("");
  total.val("");
  date.val("");
  category.val("");
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
  var valArray = [];
  var idToUpdate = parseInt(
    $(this)
      .attr("id")
      .slice(6)
  );

  console.log("Updating item #" + idToUpdate + "...");

  var rowToUpdate = $("#" + idToUpdate).contents();
  var rowField;

  console.log(rowToUpdate);

  function getValues(data) {
    for (var j = 0; j < 4; j++) {
      rowField = data[j].innerText;
      if (rowField.includes("$")) {
        rowField = rowField.split("$").pop();
      }
      console.log("Row field: " + rowField);
      valArray.push(rowField);
    }
    insertEditFields();
  }
  function insertEditFields() {
    var newOption;
    for (var k = 0; k < 5; k++) {
      if (k < 3) {
        var newInput = $("<input>")
          .attr({
            id: "field" + k,
            type: "text"
          })
          .val(valArray[k]);
        console.log("Inserting text field...");
        console.log(rowToUpdate[k]);
        var fieldValue = rowToUpdate[k];
        $(fieldValue).html(
          $("<form>")
            .attr({ id: "newForm" + k })
            .append(newInput)
        );
      } else if (k === 3) {
        var newDrop = $("<select>").attr({
          id: "fieldDrop" + idToUpdate
        });
        var fieldValue = rowToUpdate[k];
        $(fieldValue).html(
          $("<form>")
            .attr({ id: "newForm" + k })
            .append(newDrop)
        );
        for (var l = 0; l < categoryArray.length; l++) {
          newOption = $("<option>")
            .attr({
              value: categoryArray[l]
            })
            .text(categoryArray[l]);
          $(newDrop).append(newOption);
        }
      } else if (k === 4) {
        console.log("Creating save button...");
        var saveBtn = $("<button>")
          .attr({
            class: "btn btn-info save",
            id: "save" + idToUpdate
          })
          .append(
            $("<i>").attr({
              class: "far fa-save"
            })
          );
        var fieldValue = rowToUpdate[k];
        $(fieldValue).html(
          $("<form>")
            .attr({ id: "newForm" + k })
            .append(saveBtn)
        );
      }
    }
  }
  getValues(rowToUpdate);

  console.log(valArray);

  // API.updateExpense(idToUpdate).then(function() {
  //   refreshExpenses();
  // });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$expenseList.on("click", ".delete", handleDeleteBtnClick);
$expenseList.on("click", ".update", handleUpdateBtnClick);

refreshExpenses();
