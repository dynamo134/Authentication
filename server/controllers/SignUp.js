const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const User = require("../models/User");
const validator = require('email-validator');
const passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().symbols(1)
.has().not().spaces()                           // Should not have spaces

const saltRounds = 10;

const validateSignupData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please fill all the fields' });
  }


  if (!validator.validate(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }
 
  // check if email exists in DB
  const existingUser = await User.findOne({ email: email }).exec();
  if (existingUser) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }
  //for the password
  if (!schema.validate(password)) {
    console.log("Weak password");
    res.status(400).json({ message: 'Weak password' });
    return false;
  }
  return true;
};

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Validate Inputs
  const isValid = await validateSignupData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ name, email, password: hashedPassword });

      return res.json({
        message: "Account Created Successfully",
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  }
};
