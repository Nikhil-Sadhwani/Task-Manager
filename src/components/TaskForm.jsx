import React, { useState } from "react";

const TaskForm = ({ onAddTask, onClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      onAddTask(newTask);
      setNewTask({ title: "", description: "", status: "To Do" });
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Task</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
