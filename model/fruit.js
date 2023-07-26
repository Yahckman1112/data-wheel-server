const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema, Category } = require("./category");
Joi.objectId = require("joi-objectid")(Joi);

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: categorySchema, required: true },
  imagePath:{type:String, contentType:String}

});

const Fruit = mongoose.model("Fruit", fruitSchema);

function validateFruit(fruit) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.objectId().required(),
    imagePath: Joi.string()
  });

  return schema.validate(fruit);
}



exports.Fruit = Fruit
exports.validate= validateFruit