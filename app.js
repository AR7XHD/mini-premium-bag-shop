const express = require("express");
const app = express();
const connectDB = require("./config/mongodb-configuration");

const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const indexRoute = require("./routes/indexRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/AdminRoute");
const productRoute = require("./routes/ProductRoute");

const debug = require("debug")("development:app");
const config = require("config");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/", indexRoute);

connectDB();


// console.log(process.env.NODE_ENV);

app.listen(config.get("port"), () => {
    console.log("Server started on port " + config.get("port"));
});

