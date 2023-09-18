const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI

const DB =MONGO_URI

mongoose.connect(DB,{    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection stablished")).catch((error)=>console.log(error.message));