const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/RegistrationPage");
module.exports = {
  connect,
};
