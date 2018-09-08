DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS expensedb;
CREATE DATABASE expensedb;
USE expensedb;


INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-01-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-02-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-03-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-04-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-05-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 900, '2018-06-01', "Rent/Housing");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 30, '2018-01-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 45, '2018-02-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 60, '2018-03-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 75, '2018-04-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 90, '2018-05-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 105, '2018-06-01', "Electric");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 105, '2018-01-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 90, '2018-02-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 75, '2018-03-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 60, '2018-04-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 45, '2018-05-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 30, '2018-06-01', "Gas");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 123, '2018-01-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 150, '2018-02-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 500, '2018-03-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 300, '2018-04-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 120, '2018-05-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 170, '2018-06-01', "Groceries");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 100, '2018-01-01', "Vehicle Expense");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 130, '2018-02-01', "Vehicle Expense");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 1000, '2018-03-01', "Vehicle Expense");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 20, '2018-04-01', "Vehicle Expense");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 58, '2018-05-01', "Vehicle Expense");
INSERT INTO expenses (expense, total, date, category) VALUES ("Rent", 90, '2018-06-01', "Vehicle Expense");


INSERT INTO users (userName, password, mobile) VALUES ("TestUser1", "PassworD", 1234567891);
SELECT * FROM expenses;
SELECT * FROM users;


SELECT category, YEAR(date), MONTHNAME(date), SUM(total)
FROM Expenses
Group BY category, YEAR(date), MONTHNAME(date)
ORDER BY category, date ASC;