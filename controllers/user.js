const User = require("../models/user");

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  //   await User.save();
  return res.redirect("/login");
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  // console.log("user", user);
  // const passCheck = User.find({})
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  return res.redirect("/");
};

module.exports = {
  handleNewUser,
  handleLoginUser,
};
