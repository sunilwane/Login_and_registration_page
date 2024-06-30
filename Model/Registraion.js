const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    dateofbirth: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const registrationModel = mongoose.model("Registration", registrationSchema);
module.exports = {
  registrationModel,
};
