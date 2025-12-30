const express = require("express");
const app = express();

app.use(express.json());

var Todos = [
  {
    id: 1,
    title: "First Todo",
    desc: "This is my first todo",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Second Todo",
    desc: "This is my second todo",
    isCompleted: true,
  },
  {
    id: 3,
    title: " Third Todo",
    desc: "This is my third todo",
    isCompleted: true,
  },
  {
    id: 4,
    title: "fourth Todo",
    desc: "This is my fourth todo",
    isCompleted: true,
  },
];

app.get("/", (req, res) => {
  console.log("called the api");
  console.log("====================================");
  console.log("====================================");
  res.send("Hello, World!");
});

//get all the todos
app.get("/todos", (req, res) => {
  console.log("called the api");
  console.log("====================================");
  console.log("====================================");
  res.status(200).json(Todos);
});

//get a single todo
app.get("/todos/:id", (req, res) => {
  console.log("called the api");
  console.log("====================================");
  console.log("====================================");
  const { id } = req.params;
  const todo = Todos.find((t) => t.id == id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// post any todo
app.post("/todos", (req, res) => {
  const { title, desc, isCompleted } = req.body;

  // Generate new ID (auto-increment)
  const newId = Todos.length > 0 ? Math.max(...Todos.map(t => t.id)) + 1 : 1;
  const newTodo = { id: newId, title, desc, isCompleted };

  Todos.push(newTodo);
  res.status(201).json(newTodo); 
});

// upadte a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, desc, isCompleted } = req.body;

  const index = Todos.findIndex(t => t.id === id);
  if (index !== -1) {
    Todos[index] = { id, title, desc, isCompleted };
    res.json(Todos[index]); // ✅ Return updated todo
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

//delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = Todos.findIndex(t => t.id === id);
  if (index !== -1) {
    const deletedTodo = Todos.splice(index, 1)[0];
    res.json(deletedTodo); // ✅ Return the deleted todo (as per your Android expectation)
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(3000, () => {
  console.log("server is listening on the port 3000");
});
