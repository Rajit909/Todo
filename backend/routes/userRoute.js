// Url Path
import express from "express"
import auth from "../middleware/auth.js"
import { 
    home,
    register,
    login,
    dashboard
} from "../Controller/userController.js"

const router = express.Router();

router.get("/",home)

router.post("/register", register)

router.post("/login", login)

router.get("/dashboard",auth,dashboard)

export default router