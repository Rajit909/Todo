const User = require("../model/users/User")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


    //check if email is in correct format
    // if (!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) || email == "") {
    //     res.status(401).send("Please enter a email")
    // }

exports.register = async (req,res) => {
    try {

        //collect all information

        const {firstname, lastname, email, password } = req.body
        //validate the data, if exists
        if (!(firstname && lastname && email && password)) {
            throw new Error("All fields are Required.");
        }

        //check if email is in correct format
        //check if user exists or not
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new Error("User already exists");
        }

        //encrypt the password
        const myEncyPassword = await bcrypt.hash(password, 10)


        //create a new entry in database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: myEncyPassword,
        })
        
        await user.save()

        //create a token and send it to user

        const token = jwt.sign({
            id: user._id, email
        },
        process.env.SECRET_CODE
        ,{expiresIn: process.env.EXPIRY_TIME })
        

        user.token = token
        //don't want to send the password
        user.password = undefined

        res.status(201).json({
            success: true,
            user,
        })


    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}


exports.login = async (req, res) => {
    try {
        // Collect info from frontend
        const {email, password} = req.body

        // validate
        if (!(email && password)) {
            res.status(401).send("Email and password required")
        }

        // check user in DataBase
        const user = await User.findOne({email})

        if (! email) {
            res.status(401).send("User or email not found plese create a account")
        }

        // match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({id: user._id, email}, 'shhhh', {expiresIn: '2h'})
        
            user.password = undefined
            user.token = token

            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
                httpOnly: true
            }

            res.status(200).cookie("token", token, option).json({
                success: true,
                token,
                user
            })        
        }

        // create token and send
        res.status(400).send("Email or password is incorrect")

    } catch (error) {
        console.log(error)
    }
}

exports.dashboard = async (req, res) =>{
    res.send("Welcome to dashboard")
}