const mongoose = require("mongoose");
const Joi = require("joi");

const newSchema = new mongoose.Schema({
  title: { type: String, required: true },
  new: { type: String, required: true },
  Date: { type: Date, default: Date.now },
});

const New = mongoose.model("New", newSchema);


function validateNews(news) {
  const schema = Joi.object({
    title: Joi.string().required(),
    new: Joi.string().required(),
  });

  return schema.validate(news)
}

exports.New = New;
exports.validate = validateNews;
