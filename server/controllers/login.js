const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // check if email exists in DB
  const dbUser = await User.findOne({ email: email }).exec();

  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Password is incorrect" });
    }
  } else {
    return res.status(400).json({ message: "User does not Exist" });
  }
};
