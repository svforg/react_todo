import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    id: string
    title: string
    removeTodoList: (id: string) => void
    tasks: Array<TaskType>
    createTask: (title: string, todoListId: string) => void
    updateTaskTitle: (title: string, taskId: string, todoListId: string) => void
    updateTodoListTitle: (title: string, todoListId: string) => void
    deleteTask: (taskId: string, todoListId: string) => void
    updateTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeFilter: (newFilterValueType: FilterValueType, todoListId: string) => void
    filter: FilterValueType
};

export function TodoList(props: TodoListPropsType) {
    const updateTodoListTitle = (title: string) => props.updateTodoListTitle(title, props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);

    const createTask = (title: string) => props.createTask(title, props.id);

    const btnFilterAll = () => props.changeFilter("all", props.id);
    const btnFilterActive = () => props.changeFilter("active", props.id);
    const btnFilterCompleted = () => props.changeFilter("completed", props.id);

    return (
        <div className="TodoList">
            <div>
                <strong style={{marginBottom: "40px", display:"inline-block"}}>
                    <EditableSpan value={props.title} updateValue={updateTodoListTitle}/>
                </strong>

                <IconButton
                    onClick={deleteTodoList}>
                    <Delete />
                </IconButton >

                <AddItemForm addItem={createTask}/>

                <ul>
                    {
                        props.tasks.map(task => {
                            const updateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.updateTaskStatus(task.id, e.currentTarget.checked, props.id);
                            };
                            const updateTaskTitle = (title: string) => props.updateTaskTitle(title, task.id, props.id);
                            const deleteTask = () => props.deleteTask(task.id, props.id);

                            return (
                                <li key={task.id} className={task.isDone ? "" : "is-done"}>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={updateTaskStatus}
                                        name="checkedB"
                                        color="primary"/>

                                    <EditableSpan
                                        value={task.title}
                                        updateValue={updateTaskTitle}/>

                                    <IconButton
                                        onClick={deleteTask}>
                                        <Delete />
                                    </IconButton >
                                </li>
                            )
                        })
                    }
                </ul>

                <div>

                    <Button
                        size="small"
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color="primary"
                        onClick={btnFilterAll}>All</Button>

                    <Button
                        size="small"
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color="primary"
                        onClick={btnFilterActive}>Active</Button>

                    <Button
                        size="small"
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color="primary"
                        onClick={btnFilterCompleted}>Completed</Button>
                </div>
            </div>
        </div>
    );
}


