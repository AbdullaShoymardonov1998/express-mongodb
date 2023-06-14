const Task = require("../models/Task");

// Read
const getTodos = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read only one
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ message: "Todo does not exist" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create
const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = new Task({
      title,
      description,
      completed,
    });
    if (!title || !description || !completed) {
      return res.status(400).json({ message: "Missing fields....!!!" });
    }
    const saveTodo = await todo.save();
    return res.send(saveTodo);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Update

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const checkId = await Task.findById(id);
    if (!checkId) {
      return res.status(400).json({ message: "Todo does not exist" });
    }
    if (!title || !description || !completed) {
      return res.status(400).json({ message: "Missing fields....!!!" });
    }
    const updatedResult = await Task.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        completed,
      }
    );
    return res.send(updatedResult);
  } catch (error) {
    console.error("Update task: ", error.message);
    return res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
  }
};

//Delete
const deleteTask = async (req, res) => {
  try {
    const checkId = await Task.findById(id);
    if (!checkId) {
      return res.status(400).json({ message: "Todo does not exist" });
    }

    const { id } = req.params;
    const deleteTodo = await Task.findByIdAndDelete(id);
    res.send(deleteTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Exports
module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTask,
};
