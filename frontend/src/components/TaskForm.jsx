// src/TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskForm;
