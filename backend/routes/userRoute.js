// Url Path
const express = require("express")
const auth = require("../middleware/auth")
const { 
    register,
    login,
    dashboard
} = require("../Controller/userController");

const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.get("/dashboard",auth, dashboard)

module.exports = router