-- Username: "asdf", Password: "asdf"
INSERT INTO Customers VALUES ("asdf", "$2b$10$bknqYeOqxkynPOZ9HlPlZu31SE7VaJ6Wv8Z83/g441GdJ9UNglM7y", true, 100);
INSERT INTO PaymentMethods VALUES ("asdf", "1234567844445555", "1234", 4, 2020, 123.45);
INSERT INTO SupportTickets (Username, Title, Info, Made, Resolved) VALUES ("asdf", "plz halp", "how do i install more ram", DATE("now"), false);
INSERT INTO Items (ItemName, Price, Calories, Carb, Fat, Protein, Sugar) VALUES ("Potato Chips", 2.99, 100, 50, 25, 10, 15);
INSERT INTO Items (ItemName, Price, Calories, Carb, Fat, Protein, Sugar) VALUES ("Soda", 1.99, 150, 100, 0, 0, 50);
INSERT INTO VendingMachines (VendingLocation) VALUES ("Richardson, TX");
INSERT INTO VendingMachines (VendingLocation) VALUES ("Plano, TX");
INSERT INTO Stock VALUES (1, 1, 50);
INSERT INTO Stock VALUES (1, 2, 10);
INSERT INTO Stock VALUES (2, 1, 25);
INSERT INTO Stock VALUES (2, 2, 30);
INSERT INTO Orders (Username, MachineID, ItemID, Quantity, OrderDate) VALUES ("asdf", 1, 1, 3, DATE("now"));
INSERT INTO Orders (Username, MachineID, ItemID, Quantity, OrderDate) VALUES ("asdf", 2, 1, 2, DATE("now"));
INSERT INTO Favorites VALUES ("asdf", 1);
