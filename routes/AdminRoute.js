const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieParser = require("cookie-parser");

router.get("/", (req, res) => {
    res.send("Register");
});

if(process.env.NODE_ENV === "development") {

    router.post("/register", async (req, res) => {
        let owners = await adminModel.find({});
        if(owners.length > 0) {
            return res.status(400).send("Admin already exists");
        }
        const { fullname, email, password } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                return res.status(500).send("Error in hashing");
            }
            adminModel.create({ fullname, email, password: hash }).then((admin) => {
                const token = generateToken(admin);
                res.cookie("token", token);
                res.status(201).send("Admin registered");
            }).catch((err) => { 
                res.send(err);
            });
        });
    });

    

}


module.exports = router;
