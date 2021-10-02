import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to Learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "What to Buy",
            filter: "all"
        }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true}
        ],
    })

    function removeTask(id: string, todoListId: string) {
        // достанем нужный массив по todoListId:
        let todoListTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом:
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        // достанем нужный массив по todoListId:
        let todoListTasks = tasks[todoListId];
        // найдём нужную таску
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        // достанем нужный массив по todoListId:
        let todoListTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста копией,
        // добавив в начало новую таску
        tasks[todoListId] = [task, ...todoListTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let allTodoListTasks = tasks[tl.id];
                    let tasksForTodoList = allTodoListTasks;
                    if (tl.filter === "active") {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true);
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
