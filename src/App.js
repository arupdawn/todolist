import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("maintask")) {
      let tasks = JSON.parse(localStorage.getItem("maintask"));
      if (tasks && tasks?.length > 0) {
        setTaskList(tasks);
      }
    }
  }, []);

  const onChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const onClickAddTask = () => {
    let tasks = [...taskList];
    tasks.push(taskName);
    setTaskName("");
    setTaskList(tasks);
    localStorage.setItem("maintask", JSON.stringify(tasks));
  };

  const onClickEditTask = (taskindex) => {
    let taskVal = taskList[taskindex];
    let updatedTaskVal = prompt("Enter new value", taskVal);
    let newTask = [...taskList];
    newTask[taskindex] = updatedTaskVal;
    setTaskList(newTask);
    localStorage.setItem("maintask", JSON.stringify(newTask));
  };

  const onClickDeleteTask = (taskindex) => {
    let newTask = [...taskList];
    newTask.splice(taskindex, 1);
    setTaskList(newTask);
    localStorage.setItem("maintask", JSON.stringify(newTask));
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>To Do App</h1>

      <input
        type="text"
        placeholder="Enter your task"
        value={taskName}
        onChange={onChangeTaskName}
        className="input-listtext-style"
      />
      <button onClick={onClickAddTask}>Add</button>

      {/* List view */}

      {taskList && taskList?.length > 0 && (
        <div className="task-list-container">
          {taskList.map((eachTask, index) => (
            <div id={index} className="each-task-container">
              <div>
                {`${index + 1}.) `}
                {eachTask}
              </div>
              <div>
                <button onClick={() => onClickEditTask(index)}>Edit</button>
                <button onClick={() => onClickDeleteTask(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
