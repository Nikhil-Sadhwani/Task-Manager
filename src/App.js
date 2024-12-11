import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { fetchTasks } from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = (newTask) => {
    const newTaskData = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskData]);
    toast.success("Task added successfully!");
  };

  const filteredTasks = tasks
    .filter((task) =>
      statusFilter === "All" ? true : task.status === statusFilter
    )
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const taskCounts = {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    Done: tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Title or Description"
          className="border rounded-md p-2 w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="text-end">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      <div className="flex mb-4 gap-6">
        <div className="text-red-500 font-bold">
          To Do: {taskCounts["To Do"]}
        </div>
        <div className="text-blue-500 font-bold">
          In Progress: {taskCounts["In Progress"]}
        </div>
        <div className="text-green-500 font-bold">
          Done: {taskCounts["Done"]}
        </div>
      </div>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          onClose={() => setShowForm(false)}
        />
      )}

      <TaskTable
        tasks={filteredTasks}
        setTasks={setTasks}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;
