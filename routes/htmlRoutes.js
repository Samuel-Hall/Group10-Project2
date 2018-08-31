var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!"
      // examples: dbExamples
    });
    // });
  });

  app.get("/history", function(req, res) {
    res.render("history", {
      msg: "Expense history"
    });
  });
  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Expense.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExpenses
  //   ) {
  //     res.render("example", {
  //       example: dbExpenses
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
