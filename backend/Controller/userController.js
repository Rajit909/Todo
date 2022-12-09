const User = require("../model/users/User")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


exports.register = async (req,res) => {
    try {
        // Collect all information
        const {name, username, email, password } = req.body
    
    // validate the data, if exists
    if (!(email && password && name && username)) {
        res.status(401).send("All fields are required")
    }

    //check if email is in correct format
    // if (!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) || email == "") {
    //     res.status(401).send("Please enter a email")
    // }

    // check if user exists or not
    const existingUser = await User.findOne({email})

    if (existingUser) {
        res.status(401).send("User already exists in our DataBase")
    }

    // encrypt the password

    const myEncryptPassword = await bcrypt.hash(password, 10)

    // Create a new entry in DataBase

    const user = await User.create({
        name,
        username,
        email,
        password:myEncryptPassword,
    })


    
    //create a token and send it to user
    const token = jwt.sign({
        id: user._id, email
    },'shhhh',{expiresIn: '2h'})
    
    user.token = token
    // don't want to send the password
    user.password = undefined

    res.status(201).json(user)
    
    } catch (error) {
        console.log(error)
        console.log("Error is response route")
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