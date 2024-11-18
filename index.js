const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let todos = [
{ id: 1, task: "Learn Node.js", completed: false, priority: "medium"  },
{ id: 2, task: "Build a REST API", completed: false, priority: "medium"  }
];

app.get('/todos', (req, res) =>{
res.json(todos)
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});

app.post('/todos', (req, res) => {
const { task, priority = "medium" } = req.body; // Default priority to "medium"
const validPriorities = ["high", "medium", "low"];
const newTodo = {
id: todos.length + 1,
task: req.body.task,
completed: false,
priority: priority
};

todos.push(newTodo);
res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {

const id = parseInt(req.params.id);
const todo = todos.find(t => t.id === id);

  if (!todo) {
return res.status(404).send("To-Do item not found");

  }

  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.priority = req.body.priority || todo.priority;
  res.json(todo);
});


app.delete('/todos/:id', (req, res) => {
 const id = parseInt(req.params.id);
const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
  return res.status(404).send("To-Do item not found");
}

todos.splice(index, 1);
res.status(204).send();

});
