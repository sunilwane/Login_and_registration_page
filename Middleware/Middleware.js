var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "registerpage");

      if (decoded) {
        next();
      }
    } catch (err) {
      res.send({ err: err });
    }
  }
};

module.exports = {
  auth,
};
