const express = require("express");
const nunjucks = require("nunjucks");
const { db } = require("../util");
const router = express.Router();
module.exports = router;

// This middleware is needed to process input from HTML forms
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  const username = req.session.username;
  res.send(nunjucks.render("templates/index.njk", { username }));
});

router.post("/add-to-cart", (req, res) => {
  if (req.session.cart === undefined)
    req.session.cart = [];

  req.session.cart.push(req.body.itemID);
  res.redirect("/cart");
});

router.get("/cart", (req, res) => {
  const username = req.session.username;
  var results;
  if (req.session.cart === undefined)
    req.session.cart = [];
  else {
    const temp = req.session.cart.toString();
    results = db.prepare("SELECT * FROM Items WHERE ItemID IN (" + temp + ")").all();
    results = results.map(({ ItemName, Price }) => ({
      name: ItemName,
      price: "$" + Price,
    }));
  }

  res.send(nunjucks.render("templates/cart.njk", {
    username,
    cart: results
  }));
});

router.get("/favorites", async (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  let results = db
    .prepare(
      "SELECT Items.ItemID, ItemName, Price FROM Favorites INNER JOIN Items ON Favorites.ItemID = Items.ItemID WHERE Username = ?"
    )
    .all(username);

  results = results.map(({ ItemID, ItemName, Price }) => ({
    id: ItemID,
    icon: "fastsnacks.png",
    name: ItemName,
    price: "$" + Price,
  }));

  res.send(
    nunjucks.render("templates/favorites.njk", {
      username,
      snacks: results,
    })
  );
});

router.post("/favorites-add", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  db.prepare("INSERT INTO Favorites VALUES (?, ?)").run(username, parseInt(req.body.itemID));

  res.redirect("/list-items");
});

router.post("/favorites-remove", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  db.prepare("DELETE FROM Favorites WHERE Username = ? AND ItemID = ?").run(username, parseInt(req.body.itemID));

  res.redirect("/favorites");
});

router.get("/list-items", async (req, res) => {
  const username = req.session.username;

  let snacks = db.prepare("SELECT * FROM Items").all();
  snacks = snacks.map(
    ({ ItemID, ItemName, Price, Calories, Carb, Fat, Protein, Sugar }) => ({
      id: ItemID,
      icon: "fastsnacks.png",
      name: ItemName,
      price: `$${Price}`,
      calories: Calories,
      carb: Carb,
      fat: Fat,
      protein: Protein,
      sugar: Sugar,
    })
  );

  let vending = db.prepare("SELECT * FROM VendingMachines").all();
  vending = vending.map(
    ({ MachineID, VendingLocation }) => `#${MachineID}: ${VendingLocation}`
  );

  res.send(
    nunjucks.render("templates/list-items.njk", {
      username,
      snacks,
      vending,
    })
  );
});

router.get("/payment-methods", (req, res) => {
  const username = req.session.username;

  if (!username) {
      return res.redirect("/login?error=5")
  }

  let methods = db.prepare("SELECT * FROM PaymentMethods WHERE Username = ?").all(username);
  methods = methods.map(
      ({ CardNumber, ExpirationMonth, ExpirationYear }) => ({
        ccnum: "xxxxxxxxxxxx" + CardNumber.substring(CardNumber.length - 4),
        expmonth: ExpirationMonth,
        expyear: ExpirationYear,
      })
  );

  res.send(
    nunjucks.render("templates/payment-methods.njk", {
      username,
      methods,
    })
  );
});

router.get("/profile", (req, res) => {
  const username = req.session.username;

  const { RewardPoints } = db
    .prepare("SELECT RewardPoints FROM Customers WHERE Username = ?")
    .get(username);

  res.send(
    nunjucks.render("templates/profile.njk", {
      username,
      searches: req.session.searches || [],
      rewardPoints: RewardPoints || 0,
    })
  );
});

router.get("/rewards", (req, res) => {
  const username = req.session.username;

  if (!username) {
      return res.redirect("/login?error=5")
  }

  // TODO: Create a paginate function to split an array into 4 sections each
  res.send(nunjucks.render("templates/rewards.njk", { username }));
});

router.get("/search", (req, res) => {
  const username = req.session.username;
  const { query } = req.query;
  const hasQuery = !!query;

  let snacks = [];
  let vending = [];

  if (hasQuery) {
    // Store the user's search, as per functional requirements
    if(req.session.searches === undefined) {
      req.session.searches = [];
    }

    req.session.searches.push(query);

    // Search if string contains
    snacks = db
      .prepare(
        "SELECT ItemName, Price, Calories, Carb, Fat, Protein, Sugar FROM Items WHERE ItemName LIKE ?"
      )
      .all(`%${query}%`);

    snacks = snacks.map(
      ({ ItemName, Price, Calories, Carb, Fat, Protein, Sugar }) => ({
        name: ItemName,
        price: `$${Price}`,
        calories: Calories,
        carb: Carb,
        fat: Fat,
        protein: Protein,
        sugar: Sugar,
      })
    );

    vending = db.prepare(`
SELECT ItemName, Quantity, VendingMachines.MachineID, VendingLocation
FROM VendingMachines
INNER JOIN Stock ON VendingMachines.MachineID = Stock.MachineID
INNER JOIN Items ON Stock.ItemID = Items.ItemID
WHERE ItemName LIKE ?`).all(`%${query}%`);

    vending = vending.map(({ ItemName, Quantity, MachineID, VendingLocation }) => ({
      machine: `#${MachineID}: ${VendingLocation}`,
      snack: ItemName,
      quantity: Quantity
    }));
  }

  res.send(
    nunjucks.render("templates/search.njk", {
      username,
      query,
      hasQuery,
      snacks,
      vending,
    })
  );
});

router.get("/support-submit", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  res.send(
    nunjucks.render("templates/support-submit.njk", {
      username,
      success: !!req.query.success,
    })
  );
});

router.post("/support", async (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  const { title, message } = req.body;

  db.prepare(
    "INSERT INTO SupportTickets (Username, Title, Info, Made, Resolved) VALUES (?, ?, ?, DATE('now'), false)"
  ).run(username, title, message);

  res.redirect("/support-submit?success=1");
});

router.get("/transaction-history", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login?error=5");
  }

  let results = db.prepare(
    "SELECT Username, Quantity, OrderDate, Items.ItemID, Items.ItemName, Items.Price FROM Orders \
    INNER JOIN Items on Orders.ItemID = Items.ItemID \
    WHERE Username = ?"
  ).all(username);

  results = results.map(
      ({OrderDate, Quantity, ItemName, Price}) => ({
        date: OrderDate,
        name: ItemName,
        quantity: Quantity,
        price: Price,
      })
  );
  res.send(
    nunjucks.render("templates/transaction-history.njk", {
      username,
      list: results,
    })
  );
});
