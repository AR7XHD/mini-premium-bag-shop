const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const expresssession = require("express-session");
const flash = require("connect-flash");

expresssession({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
});

flash();

const isLoggedIn = async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        req.flash("error", "User not logged in");
        return res.redirect("/login");
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if(err) {
        req.flash("error", "User not logged in");
        return res.redirect("/login");
    }
    await userModel.findOne({ email: user.email }).then((user) => {
        if(!user) {
            req.flash("error", "User not logged in");
            return res.redirect("/login");
        }
        req.user = user;
        res.redirect("/Shop");
    }).catch((err) => {
        req.flash("error", "User not logged in");
        res.redirect("/login");
    });
});
};

module.exports = isLoggedIn;