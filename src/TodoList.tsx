import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
}


export function TodoList(props: PropsType) {

    let [title, setTitle] = useState("");

    let[error, setError] = useState<string | null>(null);

    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title, props.id);
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(title,props.id);
            setTitle("");
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return (
        <div>
            <h3>{props.title}<button onClick={() => {props.removeTodoList(props.id)}}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeStatus(t.id, newIsDoneValue, props.id);
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={onChangeTaskStatus} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {props.removeTask(t.id, props.id)}}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}