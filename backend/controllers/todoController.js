const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "error geting todos"
        });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await Todo.create({
            title,
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "error creating todo",
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                completed,
            },
            { returnDocument: "after" }
        );
        if (!todo) {
            return res.status(404).json({
                message: "todo not found",
            });
        }
        return res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "error updating todo"
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({
                message: "todo not found",
            });
        }
        res.status(200).
            json({ message: "todo delete successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error deleing todo",
       error:error.message
        });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};