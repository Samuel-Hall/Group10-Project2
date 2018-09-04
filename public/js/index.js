// Get references to page elements
var title = $("#title");
var total = $("#total");
var date = $("#date");
var category = $("#category");
var $submitBtn = $("#submit");
var $expenseList = $("#expense-list");

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

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(expense).then(function() {
    refreshExpenses();
  });

  $exampleText.val("");
  $exampleDescription.val("");
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

  function getValues(data, callback) {
    for (var j = 0; j < 4; j++) {
      rowField = data[j].innerText;
      if (rowField.includes("$")) {
        rowField = rowField.split("$").pop();
      }
      console.log("Row field: " + rowField);
      valArray.push(rowField);
      callback(j);
    }
  }
  function insertTextField(index) {
    console.log("Inserting text field...");
    console.log("Current field value: " + rowToUpdate[index]);
    // rowToUpdate[index].innerHTML = "";
    rowToUpdate[index].innerHTML = $("<input>")
      .attr({
        id: "field",
        type: "text"
      })
      .val(rowField);
  }
  getValues(rowToUpdate, insertTextField);

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
