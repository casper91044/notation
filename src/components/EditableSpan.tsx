import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    update: (newTitle: string) => void
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
        props.update(title);
    }

    return (
        edit
        ? <input value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )

}