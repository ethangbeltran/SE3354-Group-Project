CREATE TABLE IF NOT EXISTS Customers (
    -- Username is the primary key since all Users must have unique usernames
	Username VARCHAR(30) NOT NULL,
    -- The website shall hash the password and send it to the database to verify if the user inputted the correct password
	-- bcrypt hashes are guaranteed to be 60 exactly characters long: https://www.npmjs.com/package/bcrypt#hash-info
	PasswordHash CHAR(60) NOT NULL,
	IsAdmin BOOLEAN NOT NULL,
	RewardPoints INT NOT NULL,
	Primary Key(Username)
);

/*
    Table to hold credit card info. The expiration date is seperated into month and year to make it easier to determine if a card is expired
*/

CREATE TABLE IF NOT EXISTS PaymentMethods (
    Username VARCHAR(30) NOT NULL,
    CardNumber VARCHAR(16) NOT NULL,
	SecurityCode CHAR(4) NOT NULL,
    ExpirationMonth INT NOT NULL,
    ExpirationYear INT NOT NULL,
	AccountBalance DECIMAL(5,2) NOT NULL,
    Primary Key(Username, CardNumber),
    Foreign Key(Username) REFERENCES Customers(Username)
);

/*
    Table to hold support tickets, and
*/
CREATE TABLE IF NOT EXISTS SupportTickets (
    SupportID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(30) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Info VARCHAR(10000) NOT NULL,
    Made DATE NOT NULL,
    Resolved BOOLEAN NOT NULL,
    Foreign Key(Username) REFERENCES Customers(Username)
);
/*
    Items can have the same name but will be differieniated by their ID
    Calories, Carb, Fat, Protein, and Sugar all refer to the nutritional data of the item
*/
CREATE TABLE IF NOT EXISTS Items (
	ItemID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	ItemName VARCHAR(50) NOT NULL,
	Price DECIMAL(3, 2) NOT NULL,
	Calories INT NOT NULL,
	Carb INT NOT NULL,
	Fat INT NOT NULL,
	Protein INT NOT NULL,
	Sugar INT NOT NULL
);

/*
    A simple table storing supported vending machines and their locations
*/
CREATE TABLE IF NOT EXISTS VendingMachines (
	MachineID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	VendingLocation VARCHAR(255) NOT NULL
);

/*
    Stores the stock of each vending machine and how much of the stock is within the vending machine
*/
CREATE TABLE IF NOT EXISTS Stock (
	MachineID INT NOT NULL,
	ItemID INT NOT NULL,
	Quantity INT NOT NULL,
	Primary Key(MachineID, ItemID),
	Foreign Key(MachineID) REFERENCES VendingMachines(MachineID),
	Foreign Key(ItemID) REFERENCES Items(ItemID)
);

/*
    A table to store the orders. A user can only order from one vending machine at a time for each order
*/
CREATE TABLE IF NOT EXISTS Orders (
	OrderID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Username VARCHAR(30) NOT NULL,
	MachineID INT NOT NULL,
	ItemID INT NOT NULL,
	Quantity INT NOT NULL,
	OrderDate DATE NOT NULL,
	Foreign Key(Username) REFERENCES Customers(Username),
	Foreign Key(MachineID) REFERENCES VendingMachines(MachineID),
	Foreign Key(ItemID) REFERENCES Items(ItemID)
);

/*
    A table to store the favorite item(s) of a user
*/
CREATE TABLE IF NOT EXISTS Favorites (
	Username VARCHAR(30) NOT NULL,
	ItemID INT NOT NULL,
	Primary Key(Username, ItemID),
	Foreign Key(Username) REFERENCES Customers(Username),
	Foreign Key(ItemID) REFERENCES Items(ItemID)
);
