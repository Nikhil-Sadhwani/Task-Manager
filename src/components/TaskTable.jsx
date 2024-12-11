import React, { useRef } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";
import { toast } from "react-toastify";

const TaskTable = ({ tasks, setTasks, searchTerm }) => {
  const tableRef = useRef(null);

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const highlightSearchTerm = (value) => {
    if (!searchTerm) return value;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return value.replace(regex, `<span class="bg-yellow-200">$1</span>`);
  };

  const columns = [
    { title: "Task ID", field: "id", hozAlign: "center", minWidth: 100 },
    {
      title: "Title",
      field: "title",
      editor: "input",
      formatter: (cell) => highlightSearchTerm(cell.getValue()),
      cellEdited: (cell) => {
        const newValue = cell.getValue();
        const oldValue = cell.getOldValue();
        if (newValue !== oldValue) {
          toast.success(`Title updated successfully!`);
        }
      },
      minWidth: 200,
    },
    {
      title: "Description",
      field: "description",
      editor: "input",
      formatter: (cell) => highlightSearchTerm(cell.getValue()),
      cellEdited: (cell) => {
        const newValue = cell.getValue();
        const oldValue = cell.getOldValue();
        if (newValue !== oldValue) {
          toast.success(`Description updated successfully!`);
        }
      },
      minWidth: 200,
    },
    {
      title: "Status",
      field: "status",
      formatter: (cell) => {
        const value = cell.getValue();
        const options = ["To Do", "In Progress", "Done"];
        return `
      <select class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
        ${options
          .map(
            (option) =>
              `<option value="${option}" ${
                option === value ? "selected" : ""
              }>${option}</option>`
          )
          .join("")}
      </select>
    `;
      },
      cellClick: (e, cell) => {
        const dropdown = cell.getElement().querySelector("select");
        if (dropdown) {
          dropdown.addEventListener("change", (event) => {
            const newValue = event.target.value;
            const oldValue = cell.getValue();
            const taskId = cell.getRow().getData().id;

            cell.setValue(newValue);

            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newValue } : task
              )
            );

            if (newValue !== oldValue) {
              toast.success(`Status updated to: ${newValue}`);
            }
          });
        }
      },
      width: 150,
    },
    {
      title: "Actions",
      field: "actions",
      formatter: (cell) =>
        `<button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>`,
      cellClick: (e, cell) => {
        const id = cell.getRow().getData().id;
        handleDelete(id);
      },
      hozAlign: "center",
      minWidth: 100,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-md p-1 overflow-x-auto">
      <ReactTabulator
        data={tasks}
        columns={columns}
        ref={tableRef}
        layout="fitDataTable"
        responsiveLayout="true"
        options={{
          pagination: "local",
          paginationSize: 20,
          cellEdited: (cell) => {
            const updatedData = cell.getData();
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === updatedData.id ? updatedData : task
              )
            );
          },
        }}
      />
    </div>
  );
};

export default TaskTable;
