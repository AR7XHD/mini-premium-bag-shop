const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const userModel = require("../models/user");
const flash = require("connect-flash");
const expresssession = require("express-session");

expresssession({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
});

flash();

const register = async (req, res) => {
    const { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if(user) {
        req.flash("error", "User already exists");
        return res.redirect("/");
    }
    bcrypt.hash(password, 10, async (err, hash) => {
    if(err) {   
        req.flash("error", "Error in hashing");
        return res.redirect("/");
    }
    await userModel.create({ fullname, email, password: hash }).then((user) => {
        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
    }).catch((err) => {
        req.flash("error", "Error in creating user");
        res.redirect("/");
    });
});
};


const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if(!user) {
        req.flash("error", "User not found");
        return res.redirect("/");
    }
    bcrypt.compare(password, user.password, async (err, result) => {
    if(err) {   
        req.flash("error", "Error in comparing password");
        return res.redirect("/");
    }
    if(result) {
        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
    } else {
        req.flash("error", "Invalid password");
        res.redirect("/");
    }
});
};

const logout = (req, res) => {
    res.cookie("token", "");
    req.flash("error", "User logged out");
    res.redirect("/");  
};



module.exports = {
    register,
    login,
    logout,
};
