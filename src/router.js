const express = require("express");
const app = express();
const router = express.Router();
const { getTodo, getTodos, createTodo, updateTodo, deleteTask } = require("./controllers/Todo");

// List of tasks
router.get("/todos", getTodos);

// Read one item
router.get("/todos/:id", getTodo);

// Update one item by id
router.put("/todos/:id", updateTodo);

//delete 
router.delete("/todos/:id", deleteTask);
//Create 

router.post('/todos', createTodo);

module.exports = router;
