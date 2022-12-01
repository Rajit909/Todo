require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/database")
const todoRoutes = require("./routes/todoRoute")
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));

connectToDB();
app.use("/",todoRoutes)

module.exports = app;