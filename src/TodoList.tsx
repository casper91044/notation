import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    titleTask: string,
    isDone: boolean
}

type PropsType = {
    todoListId: string
    titleTodoList: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
}


export function TodoList({todoListId,titleTodoList,tasks,removeTask,removeTodoList,
                             changeFilter,changeStatus,filter,...props}: PropsType)
{

    let [title, setTitle] = useState("");

    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, todoListId);
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
            props.addTask(title, todoListId);
            setTitle("");
        }
    }

    const onChangeFilterClickHandler = (value: FilterValuesType) => changeFilter(value, todoListId);

    const onRemoveTodoListClickHandler = () => removeTodoList(todoListId);

    return (
        <div>
            <h3>
                {titleTodoList}
                <button onClick={onRemoveTodoListClickHandler}>x</button>
            </h3>

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
                    tasks.map(t => {
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            changeStatus(t.id, newIsDoneValue, todoListId);
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={onChangeTaskStatus} checked={t.isDone}/>
                            <span>{t.titleTask}</span>
                            <button onClick={() => {
                                removeTask(t.id, todoListId)
                            }}>x
                            </button>
                        </li>
                    })
                }
            </ul>

            <div>
                <button className={filter === "all" ? "active-filter" : ""}
                        onClick={() => onChangeFilterClickHandler("all")}>All
                </button>

                <button className={filter === "active" ? "active-filter" : ""}
                        onClick={() => onChangeFilterClickHandler("active")}>Active
                </button>

                <button className={filter === "completed" ? "active-filter" : ""}
                        onClick={() => onChangeFilterClickHandler("completed")}>Completed
                </button>
            </div>
        </div>
    )
}