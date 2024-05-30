import { useState, useRef } from "react";

export default function Task({ project, updateTasks , deleteProject}) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const taskInputRef = useRef();

  const handleAddTask = () => {
    const task = taskInputRef.current.value.trim();
    if (task !== "") {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      updateTasks(newTasks);
      taskInputRef.current.value = "";
    }
  };

  const handleClearTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    updateTasks(newTasks);
  };
  

  return (
    <div className="mt-10 ml-10">
      <button
              onClick={deleteProject}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
      <p className="text-red-500 font-semibold text-3xl">{project.title}</p>
      <p className="text-gray-500">{project.dueDate}</p>
      <p className="text-black">{project.description}</p>

      <hr className="my-4 border-gray-300" />

      <h2 className="text-2xl font-bold">Tasks</h2>
      <div className="mt-4">
        <input
          type="text"
          ref={taskInputRef}
          placeholder="Enter task"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{task}</span>
            <button
              onClick={() => handleClearTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
