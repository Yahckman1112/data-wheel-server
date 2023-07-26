const express = require("express");
const router = express.Router();
const { validate, Category } = require("../model/category");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const cats = await Category.find();

  res.send(cats);
});

router.get("/:id", async (req, res) => {
  const cat = await Category.findById(rq.params.id);

  if (!cat) return res.status(400).send("The Category is unavailable");
  res.send(cat);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  await category.save();

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cart = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: _.pick(req.body, ["name"]) },
    { new: true }
  );
});

module.exports = router;
