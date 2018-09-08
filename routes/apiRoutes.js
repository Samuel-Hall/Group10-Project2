var db = require("../models");

module.exports = function(app) {
  // Create a new expense
  app.post("/api/expenses", function(req, res) {
    console.log(req);
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

  // Update an expense by id
  app.put("/api/expenses", function(req, res) {
    db.Expense.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbExpense) {
      res.json(dbExpense);
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

<<<<<<< HEAD


 // Create a new user (WORKS)
 app.post("/api/users/", function(req, res) {
  console.log(req);
  
  db.User.create(req.body).then(function(dbUser) {
    res.json(dbUser);
  });
});

// No longer running....
app.get("/api/users/:newUser", function(req, res) {
  console.log("req ... " + req)
  db.User.count({ where: { userName: "alex2" } }) //addUserName is not defined | also newUser.userName is not defined
  .then(count => {
    if (count != 0) {
      console.log("Username already exists!")
      return false;
    }
    else { console.log("Username is available!");
    return true;
  }
}).then(function(obj){
  res.json(obj);
})
});
}

  // Turning this into sequelize:
  // SELECT category, YEAR(date), MONTHNAME(date), SUM(total)
  // FROM Expenses
  // Group BY category, YEAR(date), MONTHNAME(date)
  // ORDER BY category, date ASC;
  app.get("/api/expenseChart/", function(req, res) {
    db.Expense.findAll({
      attributes: [
        "category",
        [db.sequelize.fn("YEAR", db.sequelize.col("date")), "YEAR"],
        [db.sequelize.fn("MONTHNAME", db.sequelize.col("date")), "MONTH"],
        db.sequelize.fn("SUM", db.sequelize.col("total"))
      ],
      group: ["category", "YEAR", "MONTH"],
      order: [
        // Will escape date and validate DESC against a list of valid direction parameters
        ["category"],
        ["date"]
      ]
    })
      .then(function(dbExpenses) {
        var dbParsed = [];
        for (var i = 0; i < dbExpenses.length; i++) {
          dbParsed.push(dbExpenses[i].dataValues);
        }
        res.json(dbParsed);
        console.log("List of Expenses ", dbParsed);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};

