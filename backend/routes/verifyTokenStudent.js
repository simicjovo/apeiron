const jwt = require("jsonwebtoken");

const BlacklistStudent = require("../models/blacklistStudent.model");

const auth = async (req, res, next) => {
  const token = req.cookies["JWT-auth-student"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const alreadyExists = await BlacklistStudent.findOne({ JWTcookie: token });
    if (!alreadyExists) {
      const verified = jwt.verify(token, process.env.SECRET_TOKEN_STUDENT);
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
