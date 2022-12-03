const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, "Please Enter Todo name"],
        maxLength: [30, "Maximum length of title must be 30 charecters"]
    },
    tasks:{
       type: [{
         type: String
        }],
    },
    isImportant: {
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model('Todo' , todoSchema)