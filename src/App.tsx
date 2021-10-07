import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string,
    titleTodoList: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, titleTodoList: "What to Learn", filter: "all"},
        {id: todoListId2, titleTodoList: "What to Buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), titleTask: "HTML&CSS", isDone: false},
            {id: v1(), titleTask: "JS", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), titleTask: "Milk", isDone: false},
            {id: v1(), titleTask: "Book", isDone: true}
        ],
    })

    function removeTask(taskId: string, todoListId: string) {
        // // достанем нужный массив по todoListId:
        // let todoListTasks = tasks[todoListId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом:
        // tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks})
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        // // достанем нужный массив по todoListId:
        // let todoListTasks = tasks[todoListId];
        // // найдём нужную таску
        // let task = todoListTasks.find(t => t.id === id);
        // if (task) {
        //     task.isDone = isDone;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     setTasks({...tasks});
        // }
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t =>
                t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    function addTask(titleTask: string, todoListId: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // // достанем нужный массив по todoListId:
        // let todoListTasks = tasks[todoListId];
        // // перезапишем в этом объекте массив для нужного тудулиста копией,
        // // добавив в начало новую таску
        // tasks[todoListId] = [task, ...todoListTasks];
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        setTasks({
            ...tasks, [todoListId]:
                [...tasks[todoListId], {id: v1(), titleTask: titleTask, isDone: false}]
        })
    }

    function updateTask(titleTask: string, taskId: string, todoListId: string) {

        let currentTask = tasks[todoListId].find(t => t.id === taskId);
        if (currentTask) {
           currentTask.titleTask = titleTask
            setTasks({...tasks})
        }

    }

    function updateTodoList(titleTodoList: string, todoListId: string) {

        let currentTodoList = todoLists.find(tl => tl.id === todoListId)
        if (currentTodoList) {
            currentTodoList.titleTodoList = titleTodoList;
            setTodoLists([...todoLists])
        }

    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        // let todoList = todoLists.find(tl => tl.id === todoListId)
        // if (todoList) {
        //     todoList.filter = value;
        //     setTodoLists([...todoLists])
        // }
        setTodoLists(todoLists.map(tl =>
            tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId];
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let todoListId = v1();
        let newTodoList:TodoListType = {id: todoListId, titleTodoList: title, filter: "all"}
        setTodoLists([newTodoList,...todoLists])
        setTasks({...tasks, [todoListId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
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
                        todoListId={tl.id}
                        titleTodoList={tl.titleTodoList}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        updateTask={updateTask}
                        updateTodoList={updateTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
