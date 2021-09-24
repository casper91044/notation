import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "Node js", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        setTasks(newTask);
    }

    let[filter,setFilter] = useState<FilterValuesType>("all");
    let tasksForTodoList = tasks;
    if(filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

  return (
    <div className="App">
      <TodoList title="What to Learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
