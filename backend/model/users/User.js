const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Maximum length of title must be 30 charecters"]
    },
    username:{
        type:String,
        required: [true, "Please Enter username"],
        maxLength: [30, "Maximum length of title must be 30 charecters"]
    },
    email:{
        type:String,
        required: [true, "Please Enter email"],
    },
    password:{
        type:String,
        required: [true, "Please Enter a password"],
        maxLength: [8, "Password length must be 8 "]
    },
    // confirmpassword:{
    //     type:String,
    //     required: [true, "Please reEnter password"],
    // },
    token: {
        type: String,
    }
})

module.exports = mongoose.model('User' , userSchema)