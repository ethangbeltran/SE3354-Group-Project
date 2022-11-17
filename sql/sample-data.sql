-- Username: "asdf", Password: "asdf"
INSERT INTO Customers VALUES ("asdf", "$2b$10$bknqYeOqxkynPOZ9HlPlZu31SE7VaJ6Wv8Z83/g441GdJ9UNglM7y", true, 100);
INSERT INTO PaymentMethods VALUES ("asdf", "1234567844445555", "1234", 4, 2020, 123.45);
INSERT INTO SupportTickets VALUES (1, "asdf", "plz halp", "how do i install more ram", NOW(), false);
INSERT INTO Items VALUES (1, "Potato Chips", 2.99, 100, 50, 25, 10, 15);
INSERT INTO Items VALUES (2, "Soda", 1.99, 150, 100, 0, 0, 50);
INSERT INTO VendingMachines VALUES (1, "Richardson, TX");
INSERT INTO VendingMachines VALUES (2, "Plano, TX");
INSERT INTO Stock VALUES (1, 1, 50);
INSERT INTO Stock VALUES (1, 2, 10);
INSERT INTO Stock VALUES (2, 1, 25);
INSERT INTO Stock VALUES (2, 2, 30);
INSERT INTO Orders VALUES (1, "asdf", 1, 1, 3, NOW());
INSERT INTO Orders VALUES (1, "asdf", 2, 1, 2, NOW());
INSERT INTO Favorites VALUES ("asdf", 1);
