import React, {useState} from 'react';
import {TodoList, TaskType} from './TodoList/TodoList';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import {classes} from "istanbul-lib-coverage";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

export type FilterValueType = "all" | "active" | "completed"

export type TaskStateType = {
    [key: string]: Array<TaskType>
};
export type TodoListType = {
    id: string,
    title: string
    filter: FilterValueType
};

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all",},
        {id: todoListId2, title: "What to buy", filter: "all",},
    ]);
    const createTodoList = (title: string) => {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        });
    };
    const updateTodoListTitle = (title: string, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = title;
            setTodoLists([...todoLists]);
        }
    };
    const deleteTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId];
        setTasks({...tasks});
    };

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML5", isDone: true,},
            {id: v1(), title: "CSS3", isDone: true,},
            {id: v1(), title: "JS", isDone: true,},
            {id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Redux", isDone: false,},
        ],
        [todoListId2]: [
            {id: v1(), title: "Sass", isDone: true,},
            {id: v1(), title: "TypeScript", isDone: false,},
            {id: v1(), title: "Rest API", isDone: false,},
            {id: v1(), title: "GSAP", isDone: false,},
        ],
    });
    const createTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        let totoListTaks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...totoListTaks];
        setTasks({...tasks});
    };
    const updateTaskTitle = (title: string, taskId: string, todoListId: string) => {
        let totoListTasks = tasks[todoListId];
        let task = totoListTasks.find(task => task.id === taskId);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    };
    const updateTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let totoListTasks = tasks[todoListId];
        let task = totoListTasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };
    const deleteTask = (taskId: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(task => task.id !== taskId);
        setTasks({...tasks});
    };

    const changeFilter = (newFilterValue: FilterValueType, todoListId: string) => {
        let currentTL = todoLists.find(tl => tl.id === todoListId);

        if (currentTL) {
            currentTL.filter = newFilterValue;
            setTodoLists([...todoLists]);
        }
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>

                    <Typography variant="h6">
                        ToDo
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={createTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                {
                    todoLists.map(tl => {
                        let allTasksTodoList = tasks[tl.id];
                        let tasksForTodoList = allTasksTodoList;

                        if (tl.filter === "active")
                            tasksForTodoList = allTasksTodoList.filter(task => task.isDone === true);

                        if (tl.filter === "completed")
                            tasksForTodoList = allTasksTodoList.filter(task => task.isDone === false);

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                            <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            removeTodoList={deleteTodoList}
                            tasks={tasksForTodoList}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            filter={tl.filter}
                            updateTaskStatus={updateTaskStatus}
                            updateTodoListTitle={updateTodoListTitle}
                            createTask={createTask}
                            updateTaskTitle={updateTaskTitle}/>
                                </Paper>
                        </Grid>
                    })
                }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
