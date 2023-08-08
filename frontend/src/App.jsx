// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleToggle = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
