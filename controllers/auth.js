const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require("../models/user");

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
        return res.status(403).json({
            error: "Email already taken"
        });
    }
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "Signup success, please login", user: user});
}

exports.signin = (req, res) => {
    // find the user based on the email.
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(401).json({
                error: "Email not registered, Please SignUp."
            });
        }
        if (!user.authenticate(password)) {
          return res.status(401).json({
            error: "Incorrect email or password.",
          });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, {expire: new Date() + 9999});

        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name } })
    });
    // ..if error or no user

    // ..if user authenticate

    // ..generate a token with user_id and secret

    // ..persist the token as 't' in cookie with expiry date

    // ..return response with user and token frontend client
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Signout success"});
}

exports.requireSignIn = expressJwt({
    // if the token is valid, express-jwt appends the verified users id in an auth key to the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth"
});