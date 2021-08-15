const mongoose = require("mongoose");
const userschema = mongoose.Schema;

const userSchema = new userschema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("user",userSchema);