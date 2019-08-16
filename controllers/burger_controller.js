const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
  burger.all(data => {
    const ejsObj = {
      pageTitle: "Burgers",
      burgers: data
    };
    res.render("burgers", ejsObj);
  });
});

router.get("/burgers/new", (req, res) => {
  const ejsObj = {
    pageTitle: "New Burger"
  };
  res.render("new", ejsObj);
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

router.get("/burgers/:id/edit", (req, res) => {
  burger.findOne({ id: req.params.id }, data => {
    const ejsObj = {
      pageTitle: `Edit Burger[${data[0].burger_name}]`,
      burger: data[0]
    };
    res.render("edit", ejsObj);
  });
});

router.put("/burgers/:id", (req, res) => {
  burger.update(
    {
      burger_name: req.body.name,
      devoured: ["true", "yes", "yum", 1].includes(
        req.body.devoured.toLowerCase()
      )
        ? 1
        : 0
    },
    `id=${req.params.id}`,
    result => {
      //   if (!result) {
      //     res.status(404).render("error", {
      //   pageTitle: "err.name",
      //   err: err
      // });
      // } else {
      console.log(`id ${req.params.id} was updated.`);
      res.status(200).redirect("/");
      // }
    }
  );
});

router.put("/burgers/:id/eat", (req, res) => {
  burger.update(
    {
      devoured: req.body.devoured
    },
    `id=${req.params.id}`,
    result => {
      console.log(`id ${req.params.id} was updated.`);
      res.status(200).redirect("/");
    }
  );
});

router.post("/burgers", (req, res) => {
  console.log(JSON.stringify(req.body));
  burger.create(["burger_name", "devoured"], [[req.body.name, 0]], result => {
    if (!result) throw new Error("Something went wrong.");
    console.log(`id ${JSON.stringify(result)} was created.`);
    res.redirect("/");
  });
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

router.get("*", (req, res) => {
  res.render("error", {
    pageTitle: "404 Not Found",
    err: ""
  });
});

module.exports = router;
