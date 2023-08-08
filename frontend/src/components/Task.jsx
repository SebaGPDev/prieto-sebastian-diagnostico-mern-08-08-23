// src/Task.js
import React from "react";

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-title" onClick={() => onToggle(task._id)}>
        {task.title}
      </div>
      <div className="task-actions">
        <button className="toggle-button" onClick={() => onToggle(task._id)}>
          {task.completed ? "✅" : "☑️"}
        </button>
        <button className="delete-button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
