const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

module.exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "Data succesfully stored" });
  } catch (err) {
    next(err);
  }
};
