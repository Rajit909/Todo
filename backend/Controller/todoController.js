// const TodoModel = require("../model/Todo");
import Todo from "../model/Todo.js"



//CreateTodo Controller
const createTodo = async (req, res) =>{
    try {
        const {title, tasks, isImportant } = req.body

        const todoObj = {}

        if(!title){
            throw new Error("Title required, Please pass title to create a todo")
        }

        if(typeof title !== "string"){
            throw new Error("Title should have a string value")
        }

        Object.defineProperty(todoObj, "title", {
            value: title,
            enumerable: true 
        })

        if(tasks && !(Array.isArray(tasks))){
            throw new Error("Tasks should be a array object")
        }

        if(tasks){
            Object.defineProperty(todoObj, "tasks", {
                value: tasks,
                enumerable: true 
            })
        }
        
        if (isImportant && typeof isImportant !== "boolean") {
            throw new Error("isImportant should have a boolean value")
        }

        if (isImportant === true || isImportant === false) {
            Object.defineProperty(todoObj, "isImportant", {
                value: isImportant,
                enumerable: true
            })
        }

        const todo = await Todo.create(todoObj)

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        })
    } catch (error) {
        console.log("Error in create todo")
        console.log("Error: ",error)
        res.status(400).json({
            success: false,
            message: "Error in create todo",
            error
        })
    }
};



// Get todos Controller
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json({
            success: true,
            message: "Todos find successfully",
            todos
        })
        
    } catch (error) {
        console.log("Error in get todos")
        console.log("Error: ", error)
        res.status(500).json({
            success: false,
            message: "Error in todos",
            error
        })
    }
}

const getTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        
        if (!todoId) {
            throw new Error("Todo id is required to find the todo")
        }

        if (typeof todoId !== "string") {
            throw new Error("Todo Id should be type of String")
        }

        const todo = await Todo.findById(todoId)

        if (!todo) {
            throw new Error("Todo not find in DataBase")
        }

        res.status(200).json({
            success: true,
            message: "Todo founded successfully",
            todo
        })

    } catch (error) {
        console.log("Error in get todo")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            message: "Error in gettodo",
            error
        })
    }
   
}



const editTodo = async (req, res) =>{
    try {
        const { todoId, userId } = req.params

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }


        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const todo = await Todo.findById(todoId.trim())

        if(!todo){
            throw new Error("Todo not found in DB")
        }

        
        const {title, tasks, isImportant, isCompleted} = req.body

        if(title && typeof title !== "string"){
            throw new Error("Iitle should have a string value")
        }

        if(title){
            todo.title = title
        }

        if(tasks && !(Array.isArray(tasks))){
            throw new Error("Tasks should be a array object")
        }

        if(tasks){
           todo.tasks = tasks
        }

        if(isImportant && typeof isImportant !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isImportant===true||isImportant===false){
           todo.isImportant = isImportant
        }

        if(isCompleted && typeof isCompleted !== "boolean"){
            throw new Error("Isimportant should have a boolean value")
        }

        if(isCompleted===true||isCompleted===false){
           todo.isCompleted = isCompleted
        }

        await todo.save()

        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            todo
        })
        
    } catch (error) {
         console.log("Error in edit todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in edit todo controller",
            error
        })
    }
}

const deleteTodo = async (req, res) =>{

    try {
        const todoId = req.params

        if(!userId){
            throw new Error("User ID is required to delete the todo")
        }

        if(typeof userId !== "string"){
            throw new Error("User Id should of type string")
        }

        if(!todoId){
            throw new Error("Todo ID is required to fetch the todo")
        }

        if(typeof todoId !== "string"){
            throw new Error("Todo Id should of type string")
        }

        const todo = await Todo.findByIdAndDelete(todoId)

        if(!todo){
            throw new Error("Todo not found in DB")
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            deleteTodo: todo
        })
        
    } catch (error) {
        console.log("Error in delete todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in delete todo controller",
            error
        })
    }
}

const searchTodo = async (req, res) =>{
    try {
        const search = req.query

        if (!search) {
            throw new Error("Search value is required to fetch the todos")
        }

        if (typeof search !== "string") {
            throw new Error("Search value should be a type string")
        }

        const unfilteredTodos = await 
        Todo.find({title: new RegExp(search, 'i')},
        {tasks: new RegExp(search, 'i')})

        if (!unfilteredTodos) {
            throw new Error("Searched todo or tasks returned false value")
        }

        res.status(200).json({
            success: true,
        })



    } catch (error) {
        console.log("Error in search todos controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in search todos controller",
            error
        })
    }
}


export  { createTodo, getTodos, getTodo, editTodo, deleteTodo, searchTodo}