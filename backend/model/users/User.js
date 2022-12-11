import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim: true,
        required: true
    },
    lastname:{
        type:String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password:{
        type:String
    },
    token:{
        type:String
    }

})


const UserModel = mongoose.model("User", userSchema);
export default UserModel;