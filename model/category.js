const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

function validateCat(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(category);
}

exports.validate = validateCat;
exports.categorySchema = categorySchema;
exports.Category = Category;
