const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    spoc:{
        type:String,
        required:true
    },
    add:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    datecreated:Date
});

const users = new mongoose.model("users", userSchema);


module.exports = users;