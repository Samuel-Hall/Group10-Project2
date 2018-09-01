// Get references to page elements
var title = $("#title");
var total = $("#total");
var date = $("#date");
var category = $("#category");
var $submitBtn = $("#submit");
var $expenseList = $("#expense-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(expense) {
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
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExpenses = function() {
  API.getExpenses().then(function(data) {
    console.log("Refresh Examples data: ", data);
    for (var i = 0; i < data.length; i++) {
      var $expenesRow = $("<tr>").attr({
        id: data[i].id
      });
      $expenseList.append($expenesRow);
      for (var property in data[i]) {
        if (
          property !== "id" &&
          property !== "createdAt" &&
          property !== "updatedAt"
        ) {
          var $expenseData = $("<td>").text(data[i][property]);
          $expenesRow.append($expenseData);
        }
      }
    }
    // var $expenses = data.map(function(history) {
    //for each entry in the expense table, create a new row on the page with id of primary key
    // var expenseRow = expenseList.append("<tr>").attr({
    //   "data-id": history.id
    // });
    // var $td = $("<td>").append(
    //   ${history.expense}\nTotal: $${history.total}\nCategory: ${
    //     history.category
    //   }
    // );

    // var $li = $("<li>")
    //   .attr({
    //     class: "list-group-item",
    //     "data-id": history.id
    //   })
    //   .append($div);

    // var $button = $("<button>")
    //   .addClass("btn btn-danger float-right delete")
    //   .text("ｘ");

    // $li.append($button);

    // return $li;
    // console.log("history is " + history);
    // });

    // $expenseList.empty();
    // $expenseList.append($expenses);
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
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$expenseList.on("click", ".delete", handleDeleteBtnClick);

refreshExpenses();
