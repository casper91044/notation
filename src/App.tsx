import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Rest API", isDone: true},
        {id: 5, title: "Node js", isDone: false},
    ]);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
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
                changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
