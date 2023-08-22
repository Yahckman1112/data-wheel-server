const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email, phone: this.phone },
    "12345"
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: Joi.string().required(),
    address: Joi.string().required().min(3),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;
