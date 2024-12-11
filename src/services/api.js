export const fetchTasks = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const data = await response.json();
  return data.slice(0, 20).map((task) => ({
    id: task.id,
    title: task.title,
    description: `Description for task ${task.id}`,
    status: task.completed ? "Done" : "To Do",
  }));
};
