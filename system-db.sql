CREATE TABLE `user` (
  `id` INTEGER PRIMARY KEY,
  `username` VARCHAR(255),
  `passwdhash` VARCHAR(255),
  `isadmin` BOOLEAN,
  `rewardpoints` INTEGER,
  `favorites` vendingitem,
  `shoppingcart` vendingitem
);

CREATE TABLE `order` (
  `id` INTEGER,
  `userid` INTEGER,
  `orderlist` vendingitem,
  `status` VARCHAR(255)
);

CREATE TABLE `vendingitem` (
  `id` INTEGER,
  `name` VARCHAR(255),
  `pictureurl` VARCHAR(255),
  `price` DOUBLE
);

CREATE TABLE `vendingmachine` (
  `availableitems` vendingitem
);

ALTER TABLE `order` ADD FOREIGN KEY (`userid`) REFERENCES `user` (`id`);