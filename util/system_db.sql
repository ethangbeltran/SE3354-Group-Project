CREATE TABLE Customer (
    -- Username is the primary key since all Users must have unique usernames
	Username VARCHAR(30) NOT NULL,
    -- The website shall hash the password and send it to the database to verify if the user inputted the correct password
	PasswordHash VARCHAR(30) NOT NULL,
	IsAdmin BOOLEAN NOT NULL,
	RewardPoints INT NOT NULL,
	Primary Key(Username)
);

/*
    Table to hold credit card info. The expiration date is seperated into month and year to make it easier to determine if a card is expired
*/

CREATE TABLE PaymentMethod (
    Username VARCHAR(30) NOT NULL,
    CardNumber VARCHAR(16) NOT NULL,
	SecurityCode CHAR(4) NOT NULL,
    ExpirationMonth INT NOT NULL,
    ExpirationYear INT NOT NULL,
	AccountBalance DECIMAL(5,2) NOT NULL,
    Primary Key(Username, CardNumber),
    Foreign Key(Username) REFERENCES Customer(Username)
);

/*
    Table to hold support tickets, and 
*/
CREATE TABLE SupportTicket (
    SupportID INT NOT NULL,
    Username VARCHAR(30) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Info VARCHAR(10000) NOT NULL,
    Made DATE NOT NULL,
    Resolved BOOLEAN NOT NULL,
    Primary Key(SupportID),
    Foreign Key(Username) REFERENCES Customer(Username)
);
/*
    Items can have the same name but will be differieniated by their ID
    Calories, Carb, Fat, Protein, and Sugar all refer to the nutritional data of the item
*/
CREATE TABLE Item (
	ItemID INT NOT NULL,
	ItemName VARCHAR(50) NOT NULL,
	Price DECIMAL(3, 2) NOT NULL,
	Calories INT NOT NULL,
	Carb INT NOT NULL,
	Fat INT NOT NULL,
	Protein INT NOT NULL,
	Sugar INT NOT NULL,
	Primary Key(ItemID)
);

/*
    A simple table storing supported vending machines and their locations
*/
CREATE TABLE VendingMachine (
	MachineID INT NOT NULL,
	VendingLocation VARCHAR(255) NOT NULL,
	Primary Key(MachineID)
);

/*
    Stores the stock of each vending machine and how much of the stock is within the vending machine
*/
CREATE TABLE Stock (
	MachineID INT NOT NULL,
	ItemID INT NOT NULL,
	Quantity INT NOT NULL,
	Primary Key(MachineID, ItemID),
	Foreign Key(MachineID) REFERENCES VendingMachine(MachineID),
	Foreign Key(ItemID) REFERENCES Item(ItemID)
);

/*
    A table to store the orders. A user can only order from one vending machine at a time for each order
*/
CREATE TABLE Orders (
	OrderID INT NOT NULL,
	Username VARCHAR(30) NOT NULL,
	MachineID INT NOT NULL,
	ItemID INT NOT NULL,
	Quantity INT NOT NULL,
	OrderDate DATE NOT NULL,
	Primary Key(OrderID, Username, MachineID, ItemID, Quantity, OrderDate),
	Foreign Key(Username) REFERENCES Customer(Username),
	Foreign Key(MachineID) REFERENCES VendingMachine(MachineID),
	Foreign Key(ItemID) REFERENCES Item(ItemID)
);
	
/*
    A table to store the favorite item(s) of a user
*/
CREATE TABLE Favorites (
	Username VARCHAR(30) NOT NULL,
	ItemID INT NOT NULL,
	Primary Key(Username, ItemID),
	Foreign Key(Username) REFERENCES Customer(Username),
	Foreign Key(ItemID) REFERENCES Item(ItemID)
);
