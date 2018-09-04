DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS expensedb;
CREATE DATABASE expensedb;
USE expensedb;


INSERT INTO expenses (title, total, date, category) VALUES ("VisaCard", 14.05, '2018-08-28', "Visa Card");
INSERT INTO expenses (title, total, date, category) VALUES ("MasterCard", 19.05, '2018-08-29', "MasterCard");
INSERT INTO users (userName, password, mobile) VALUES ("TestUser1", "PassworD", 1234567891);
SELECT * FROM expenses;
SELECT * FROM users;

