// src/TaskList.js
import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
