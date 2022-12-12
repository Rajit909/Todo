import mongoose from "mongoose"
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
    uuid:{
        type:String
    },
    // timestamps: true
})

const TodoModel = mongoose.model('Todo' , todoSchema) 

export default TodoModel;