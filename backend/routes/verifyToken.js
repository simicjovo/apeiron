const jwt = require("jsonwebtoken");

const Blacklist = require("../models/blacklist.model");

const auth = async (req, res, next) => {
  const token = req.cookies["JWT-auth"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const alreadyExists = await Blacklist.findOne({ JWTcookie: token });
    if (!alreadyExists) {
      const verified = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = verified;
      next();
    } else {
      res.status(401).send("Blacklisted token");
    }
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = auth;
