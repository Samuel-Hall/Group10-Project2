var db = require("../models");

module.exports = function(app) {
  // Create a new expense
  app.post("/api/expenses", function(req, res) {
    console.log("==========================");
    console.log(req.body);
    console.log("===========================");
    db.Expense.create(req.body).then(function(dbExpense) {
      res.json(dbExpense);
    });
  });

  // Read all expenses
  app.get("/api/expenses/", function(req, res) {
    db.Expense.findAll({
      order: [
        // Will escape date and validate DESC against a list of valid direction parameters
        ["date", "DESC"]
      ]
    })
      .then(function(dbExpenses) {
        res.json(dbExpenses);
        // console.log("List of Expenses ", dbExpenses);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // Delete an expense by id
  app.delete("/api/expenses/:id", function(req, res) {
    db.Expense.destroy({ where: { id: req.params.id } }).then(function(
      dbExpense
    ) {
      res.json(dbExpense);
    });
  });
};
