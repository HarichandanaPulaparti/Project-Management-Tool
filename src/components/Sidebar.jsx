import logo from "../assets/no-projects.png";
import Task from "./Task";
import { useState, useRef } from "react";

export default function Sidebar() {
  const [display, setDisplay] = useState("Home");
  const [userDetails, setUserDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState({});
  const formRef = useRef();

  function addProject() {
    setDisplay("Add_New");
  }

  function onSave(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const userInfo = {
      title: formData.get('title'),
      description: formData.get('description'),
      dueDate: formData.get('due-date'),
      tasks: [] // Initialize an empty tasks array for each project
    };
    setUserDetails((prev) => [...prev, userInfo]);
    setDisplay("Home");
  }

  function onButtonClick(index) {
    setSelectedDetails(userDetails[index]);
    setDisplay("ADD_TASK");
  }

  function updateTask(index, newTasks) {
    const updatedProject = userDetails.map((project, i) => {
      if (i === index) {
        return { ...project, tasks: newTasks };
      }
      return project;
    });
    setUserDetails(updatedProject);
    setSelectedDetails(updatedProject[index]);
  }
  function handleClearProject(index){
    const newProjects= userDetails.filter((project,i)=> i!==index);
    setUserDetails(newProjects);
    setDisplay("Home")
  }

  return (
    <div className="flex">
      <div className="bg-black text-white w-64 h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          onClick={addProject}
        >
          + Add Project
        </button>
        <ul>
          {userDetails.map((project, index) => (
            <li key={index} className="text-white">
              <button onClick={() => onButtonClick(index)}>
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {display === "Home" && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center mt-10 mb-10">
          <img src={logo} className="h-16 w-16" alt="No Projects" />
          <p>No Projects Selected</p>
          <p>Select a Project or Create a new Project</p>
          <button
            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            onClick={addProject}
          >
            Create a New Project
          </button>
        </div>
      )}

      {display === "Add_New" && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center mt-10 mb-10">
          <form ref={formRef} onSubmit={onSave}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Project Title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                placeholder="Project Description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due-date">
                Due Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="due-date"
                name="due-date"
                type="date"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300"
                type="button"
                onClick={() => setDisplay("Home")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {display === "ADD_TASK" && selectedDetails && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center mt-10 mb-10">
<Task key={selectedDetails.title} project={selectedDetails} 
updateTasks={function forAddTask(newTasks) {updateTask(userDetails.indexOf(selectedDetails), newTasks)}}
deleteProject={()=>{handleClearProject(userDetails.indexOf(selectedDetails))}} />
        </div>
      )}
    </div>
  );
}
