const express = require("express");
const nunjucks = require("nunjucks");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.send(
    nunjucks.render("templates/index.njk", { username: req.session.username })
  );
});

router.get("/favorites", (req, res) => {
  res.send(
    nunjucks.render("templates/favorites.njk", {
      username: req.session.username,
      snacks: [
        {
          icon: "fastsnacks.png",
          name: "Example Snack",
          price: "$2.99",
        },
        {
          icon: "fastsnacks.png",
          name: "Potato Chips",
          price: "$3.49",
        },
        {
          icon: "fastsnacks.png",
          name: "Diet Coke",
          price: "$3.99",
        },
      ],
    })
  );
});

router.get("/list-items", (req, res) => {
  res.send(
    nunjucks.render("templates/list-items.njk", {
      username: req.session.username,
      snacks: [
        {
          icon: "fastsnacks.png",
          name: "Example Snack",
          price: "$2.99",
        },
        {
          icon: "fastsnacks.png",
          name: "Potato Chips",
          price: "$3.49",
        },
        {
          icon: "fastsnacks.png",
          name: "Diet Coke",
          price: "$3.99",
        },
      ],
      vending: ["Richardson #7", "Plano #2", "Richardson #9"],
    })
  );
});

router.get("/payment-methods", (req, res) => {
  res.send(
    nunjucks.render("templates/payment-methods.njk", {
      username: req.session.username,
    })
  );
});

router.get("/rewards", (req, res) => {
  // TODO: Create a paginate function to split an array into 4 sections each
  res.send(
    nunjucks.render("templates/rewards.njk", { username: req.session.username })
  );
});

router.get("/search", (req, res) => {
  res.send(
    nunjucks.render("templates/search.njk", {
      username: req.session.username,
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
  res.send(
    nunjucks.render("templates/support-submit.njk", {
      username: req.session.username,
    })
  );
});

router.get("/transaction-history", (req, res) => {
  res.send(
    nunjucks.render("templates/transaction-history.njk", {
      username: req.session.username,
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
