DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS expensedb;
CREATE DATABASE expensedb;
USE expensedb;


INSERT INTO expenses (expense, total, date, category) VALUES ("Test1", 14.05, '2018-08-28', "TestCategory");
INSERT INTO users (userName, password, mobile) VALUES ("TestUser1", "PassworD", 1234567891);
SELECT * FROM expenses;
SELECT * FROM users;