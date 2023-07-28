const express = require("express");
const router = express.Router();
const { New, validate } = require("../model/new");
const _ = require("lodash");
const {cloudinary} = require('../utils/cloudinary')

router.get("/", async (req, res) => {
  const news = await New.find();
  res.send(news);
});

router.get("/:id", async (req, res) => {
  const news = await New.findById(req.params.id);
  if (!news) return res.status(400).send("Unavailable Blog");

  res.send(news);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const imagePath= req.body.image
const result = await cloudinary.uploader.upload(imagePath, {upload_preset:'uploads'})


  const news = new New({
    title: req.body.title,
    new: req.body.new,
    image: result.secure_url
  });

  await news.save();
  res.send(news);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const news = await New.findByIdAndUpdate(
    req.params.id,
    { $set: _.pick(req.body, ["title", "new"]) },
    { new: true }
  );

  if (!news) return res.status(400).send("Unavailable news");

  res.send(news);
});

router.delete("/:id", async (req, res) => {
  const news = await New.findByIdAndRemove(req.params.id);
  if (!news) return res.status(400).send("Unavalable news");

  res.send(news);
});

module.exports = router;
