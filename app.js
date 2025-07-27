const express = require("express");
const app = express();
const connectDB = require("./config/mongodb-configuration");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/AdminRoute");
const productRoute = require("./routes/ProductRoute");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const debug = require("debug")("development:app");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    debug("Server started on port 3000");
});
