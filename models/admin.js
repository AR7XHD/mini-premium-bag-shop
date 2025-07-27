const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    profilePicture: {
        type:String,
    },
    products: {
        type:Array,
        default:[]
    }


});

module.exports = mongoose.model("Admin", adminSchema);
