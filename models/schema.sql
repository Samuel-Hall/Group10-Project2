DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS expensedb;
CREATE DATABASE expensedb;
USE expensedb;


INSERT INTO expenses (expense, total, date, category) VALUES ("Test1", 14.05, '2018-08-28', "Category 1");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test2", 19.05, '2018-08-29', "Category 2");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test3", 19.05, '2018-08-30', "Category 3");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test4", 19.05, '2018-08-31', "Category 1");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test5", 19.05, '2018-07-29', "Category 2");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test2", 19.05, '2016-08-29', "Category 3");
INSERT INTO expenses (expense, total, date, category) VALUES ("Test6", 33.05, '2014-08-29', "Category 1");
INSERT INTO users (userName, password, mobile) VALUES ("TestUser1", "PassworD", 1234567891);
SELECT * FROM expenses;
SELECT * FROM users;