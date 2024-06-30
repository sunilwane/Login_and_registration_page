const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { connect } = require("./DatabaseConnection");
const { registrationModel } = require("./Model/Registraion");
const bodyParser = require("body-parser");
const app = express();
var jwt = require("jsonwebtoken");
const { auth } = require("./Middleware/Middleware");
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("data has been sendeed");
});

app.post("/registration", async (req, res) => {
  const { name, dateofbirth, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const user = new registrationModel({
        name,
        dateofbirth,
        email,
        password: hash,
      });
      await user.save();
      res.send("registration successfull");
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await registrationModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        var token = jwt.sign(
          { registraionpage: "loginandpage" },
          "registerpage"
        );

        if (user) {
          res.send({ msg: "login successfull", token: token });
        }
      } else {
        res.send("wrong credential !");
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.use(auth);
app.get("/getalluser", async (req, res) => {
  try {
    const getuser = await registrationModel.find();
    res.send(getuser);
  } catch (err) {
    res.send(err);
  }
});
app.listen(8083, async () => {
  console.log("server is listening........");
  try {
    await connect;
    console.log("mongodb is connected");
  } catch (err) {
    console.log(err);
  }
});
