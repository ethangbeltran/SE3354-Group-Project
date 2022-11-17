const express = require("express");
const nunjucks = require("nunjucks");
const connection = require("../util/database");
const router = express.Router();
module.exports = router;

// This middleware is needed to process input from HTML forms
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  const username = req.session.username;

  res.send(nunjucks.render("templates/index.njk", { username }));
});

router.get("/favorites", async (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login");
  }

  const db = await connection;
  let [results] = await db.execute(
    "SELECT ItemName, Price FROM Favorites INNER JOIN Items ON Favorites.ItemID = Items.ItemID WHERE Username = ?",
    [username]
  );
  results = results.map(({ ItemName, Price }) => ({
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

router.get("/list-items", async (req, res) => {
  const username = req.session.username;
  const db = await connection;

  let [snacks] = await db.query("SELECT * FROM Items");
  snacks = snacks.map(({ ItemName, Price }) => ({
    icon: "fastsnacks.png",
    name: ItemName,
    price: "$" + Price,
  }));

  let [vending] = await db.query("SELECT * FROM VendingMachines");
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

  res.send(
    nunjucks.render("templates/payment-methods.njk", {
      username,
    })
  );
});

router.get("/rewards", (req, res) => {
  const username = req.session.username;

  // TODO: Create a paginate function to split an array into 4 sections each
  res.send(nunjucks.render("templates/rewards.njk", { username }));
});

router.get("/search", (req, res) => {
  const username = req.session.username;

  res.send(
    nunjucks.render("templates/search.njk", {
      username,
      snacks: [
        {
          name: "Example Snack",
          price: "$2.99",
          quantity: 5,
        },
        {
          name: "Potato Chips",
          price: "$3.49",
          quantity: 6,
        },
        {
          name: "Diet Coke",
          price: "$3.99",
          quantity: 8,
        },
      ],
      vending: [
        {
          name: "Richardson #7",
          favoriteInStock: true,
        },
        {
          name: "Plano #2",
          favoriteInStock: false,
        },
        {
          name: "Richardson #9",
          favoriteInStock: false,
        },
      ],
    })
  );
});

router.get("/support-submit", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login");
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
    return res.redirect("/login");
  }

  const db = await connection;
  const { title, message } = req.body;

  await db.execute(
    "INSERT INTO SupportTickets (Username, Title, Info, Made, Resolved) VALUES (?, ?, ?, NOW(), false)",
    [username, title, message]
  );

  res.redirect("/support-submit?success=1");
});

router.get("/transaction-history", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the login page if they aren't already logged in.
  if (!username) {
    return res.redirect("/login");
  }

  res.send(
    nunjucks.render("templates/transaction-history.njk", {
      username,
      list: [
        {
          date: "10/30/2022",
          name: "Lay's Chips",
          price: "$0.99",
        },
        {
          date: "11/02/2022",
          name: "Diet Coca-Cola",
          price: "$3.50",
        },
      ],
    })
  );
});
