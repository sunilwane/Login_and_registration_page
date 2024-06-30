const mongoose = require("mongoose");

const loginSchemam = mongoose.Schema(
  {
    email: { type: String, requird: true },
    password: { type: String, requird: true },
  },
  {
    versionKey: false,
  }
);

const loginModel = mongoose.model("loginmodel", loginSchemam);

module.exports = {
  loginModel,
};
