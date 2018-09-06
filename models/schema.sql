DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS expensedb;
CREATE DATABASE expensedb;
USE expensedb;


INSERT INTO expenses (title, total, date, category) VALUES ("TestUser1", 14.05, '2018-08-28', "Test1");
INSERT INTO expenses (title, total, date, category) VALUES ("TestUser2", 19.05, '2018-08-29', "Test1");
INSERT INTO users (userName, password, mobile) VALUES ("TestUser3", "Password", 1234567891);
SELECT * FROM expenses;
SELECT * FROM users;

