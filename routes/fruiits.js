const express = require("express");
const router = express.Router();
const { validate, Fruit } = require("../model/fruit");
const { Category } = require("../model/category");
const {cloudinary} = require('../utils/cloudinary')

router.get("/", async (req, res) => {
  const fruits = await Fruit.find();
  res.send(fruits);
});


router.get('/:id', async(req,res)=>{
  const fruits = await Fruit.findById(req.params.id)
  if(!fruits) return res.status(400).send('The fruit is not available')
  res.send(fruits)
})

router.post("/", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const imagePath = req.body.imagePath
  const result = await cloudinary.uploader.upload(imagePath,{upload_preset:'uploads'})

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const fruit = new Fruit({
    category: {
      _id: category._id,
      name: category.name,
    },
    name: req.body.name,
    price: req.body.price,
    imagePath:result.secure_url
  });

  await fruit.save();
  res.send(fruit);
});

module.exports = router;
