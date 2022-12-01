// Url Path
const express = require("express")
const { 
    home,
    createTodo,
    createTask,
    getTodo,
    getTodos,
    deleteTodo
} = require("../Controller/todoController");
const router = express.Router();

router.get("/",home)
router.get("/createTodo",createTodo)
router.get("/createTask",createTask)
router.get("/getTodo",getTodo)
router.get("/getTodos",getTodos)
router.get("/deleteTodo",deleteTodo)

module.exports = router