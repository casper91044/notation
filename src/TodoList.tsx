import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    updateTask: (titleTask: string, taskId: string, todoListId: string) => void
}


export function TodoList({todoListId,titleTodoList,tasks,removeTask,removeTodoList,
                             changeFilter,changeStatus,filter,addTask,...props}: PropsType)
{

    const onChangeFilterClickHandler = (value: FilterValuesType) => changeFilter(value, todoListId);

    const onRemoveTodoListClickHandler = () => removeTodoList(todoListId);

    return (
        <div>
            <h3>
                {/*<EditableSpan title={titleTodoList} updateTask={props.updateTask} todoListId={todoListId} taskId={'1'}/>*/}
                {titleTodoList}
                <button onClick={onRemoveTodoListClickHandler}>x</button>
            </h3>

            <AddItemForm addTask={addTask} todoListId={todoListId}/>

            <ul>
                {
                    tasks.map(t => {
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            changeStatus(t.id, newIsDoneValue, todoListId);
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={onChangeTaskStatus} checked={t.isDone}/>
                            <EditableSpan title={t.titleTask}
                                          updateTask={props.updateTask}
                                          taskId={t.id}
                                          todoListId={todoListId}

                            />
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