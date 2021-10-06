import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    updateTask: (titleTask: string, taskId: string, todoListId: string) => void
    todoListId: string
    taskId: string
}

export const EditableSpan = (props: PropsType) => {

    let[edit, setEdit] = useState(false)

    let [title, setTitle] = useState(props.title);

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.updateTask(title, props.taskId, props.todoListId);
    }

    return (
        edit
        ? <input value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )

}