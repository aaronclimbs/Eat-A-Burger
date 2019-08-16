const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
  burger.all(data => {
    const ejsObj = {
      pageTitle: `Burger${req.params.id}`,
      burgers: data
    };
    res.render("burgers", ejsObj);
  });
});

router.get("/burgers/:id", (req, res) => {
  burger.findOne({ id: req.params.id }, data => {
    const ejsObj = {
      pageTitle: `Burger${req.params.id}`,
      burger: data
    };
    res.render("burger", ejsObj);
  });
});

router.get("/burgers/new", (req, res) => {
  res.render("new");
});

router.get("/burgers/:id/edit", (req, res) => {
  burger.findOne({ id: req.params.id }, data => {
    const ejsObj = {
      pageTitle: `Edit Burger[${data.burger_name}]`,
      burger: data
    };
    res.render("edit", ejsObj);
  });
});

router.put("/burgers/:id", (req, res) => {
  burger.update(req.body, `id=${req.params.id}`, result => {
    if (result.changedRows === 0) {
      res.status(404).redirect("/error");
    } else {
      console.log(`id ${req.params.id} was updated.`);
      res.status(200).redirect("/");
    }
  });
});

router.post("/burgers", (req, res) => {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    result => {
      if (!result) throw new Error("Something went wrong.");
      console.log(`id ${JSON.stringify(result)} was created.`);
      res.redirect("/");
    }
  );
});

router.delete("/burgers/:id", (req, res) => {
  burger.delete({ id: req.params.id }, result => {
    if (result.changedRows === 0) {
      res.status(404).redirect("/error");
    } else {
      console.log(`id ${JSON.stringify(result)} was deleted.`);
      res.status(200).redirect("/");
    }
  });
});

module.exports = router;
