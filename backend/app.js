require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/database")
const todoRoutes = require("./routes/todoRoute")
const userRoutes = require("./routes/userRoute")
var cookieParser = require('cookie-parser')
const app = express()

//custom middleware


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


connectToDB();

app.use("/",todoRoutes)
app.use("/userRoutes",userRoutes)

module.exports = app;