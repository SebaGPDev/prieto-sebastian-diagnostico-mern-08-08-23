// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Conexion
const connectToMongoDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/todo-list', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  connectToMongoDB();

// Esquema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// API endpoints
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title, completed: false });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
