import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const task1 = [
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true}
    ];

    const task2 = [
        {id: 1, title: "Milk", isDone: true},
        {id: 2, title: "Sugar", isDone: true},
        {id: 3, title: "Bread", isDone: false}
    ];

  return (
    <div className="App">
      <TodoList title="What to Learn" tasks={task1}/>
      <TodoList title="Product" tasks={task2}/>
    </div>
  );
}

export default App;
