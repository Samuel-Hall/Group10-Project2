var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/expenses/", function(req, res) {
    db.Expense.findAll({})
      .then(function(dbExpenses) {
        res.json(dbExpenses);
        console.log("List of Expenses ", dbExpenses);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // //**create the entry into the database**

  // Create a new example
  app.post("/api/examples", function(req, res) {
    console.log(req);
    db.Expense.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
