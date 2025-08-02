const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isloggedin");
const expresssession = require("express-session");
const flash = require("connect-flash");

router.use(expresssession({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
}));

router.use(flash());

router.get("/", (req, res) => {
    res.render("index", { error:{ message: req.flash("error") } });
});


router.post("/register", register);
router.post("/login", login);

router.get("/shop", isLoggedIn,(req, res) => {
    res.render("shop", { error:{ message: req.flash("error") } });
});

module.exports = router;    
