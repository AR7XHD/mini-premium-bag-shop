const express = require("express");
const router = express.Router();
const { logout } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Register");
});

router.post("/logout", logout);


module.exports = router;
