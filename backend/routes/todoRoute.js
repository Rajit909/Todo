// Url Path
import express from "express";
const { 
    home,
    createTodo,
    getTodo,
    getTodos,
    editTodo,
    deleteTodo,
    searchTodo
} = require("../Controller/todoController.js");
const router = express.Router();

router.get("/",home)
router.post("/createTodo",createTodo)
router.get("/getTodo",getTodo)
router.get("/getTodos",getTodos)
router.put("/editTodo",editTodo)
router.delete("/deleteTodo",deleteTodo)
router.get("/searchTodo",searchTodo)

module.exports = router