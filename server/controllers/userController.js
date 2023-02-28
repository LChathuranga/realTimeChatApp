const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { use } = require("../routes/userRoutes");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const userNameCheck = await User.findOne({ userName });
    if (userNameCheck)
      return res.json({ msg: "UserName already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user)
    return res.json({ msg: "Incorrect user name or password", status: false });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.json({ msg: "Incorrect user name or password", status: false });
  delete user.password;
  return res.json({ status: true, user });
};
