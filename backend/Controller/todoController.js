const { deleteModel } = require("mongoose");
// const TodoModel = require("../model/Todo");
const Todo = require("../model/Todo")

exports.home = (req,res)=>{
    res.send("This is Home Page")
};

exports.createTodo = async (req, res)=>{
    try {
        const {title, tasks, isImportant } = req.body

        const todoObject = {}

        //Ttile-
        if (!title) {
            throw new Error("Please Enter a title to create a todo")
        }

        if (typeof title !== String) {
            throw new Error("Title must be a string value")
        }

        Object.defineProperty(todoObject,"title", {
            value: title,
            enumerable: true
        })

        //Task-
        if (tasks && !(Array.isArray(tasks))) {
            throw new Error("")
        }


    } catch (error) {
        
    }
};

exports.getTodo = async (req, res) => {
    const { todoId } = req.params
    const allTodos = await Todo.findById(todoId)
    res.json(allTodos)
}

exports.deleteTodo = async (req, res) =>{
    const todoId = req.params.todoId
    const deletedTodo = await Todo.findByIdAndDelete(todoId)
    res.status(201).json(deletedTodo)
}


exports.getTodos = async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
}

exports.createTask = async (req, res)=>{
    const todoId = req.params.todoId;
    const todo = await TodoModel.findById(todoId)
    if(!todo) 
    return
     res.status(400).send("Todo don't exists")
    const { text } = req.body
    todo.tasks.push(text);
    await todo.save();
    res.json(todo);
};
