import {api} from "../api/api";
import {ITask, ITodolist} from "../types/types";
// import {ThunkAction} from "redux-thunk";
// import {AppStateType} from "./store";
import {Dispatch} from "redux";

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TASK = 'ADD_TASK';
export const SET_TASKS = 'SET_TASKS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const SET_TODOLIST = 'SET_TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';

const initialState = {
    todolists: []
};

interface IInitialState {
    todolists: Array<ITodolist>
}

const reducer = (state: IInitialState = initialState, action: TodolistsReducerActionTypes): IInitialState => {

    switch (action.type) {

        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };

        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            };

        case REMOVE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };

        case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, title: action.newTitle}
                    } else {
                        return tl
                    }
                })
            };

        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl;
                    }
                })
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
                    } else {
                        return tl;
                    }
                })
            };

        case REMOVE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: tl.tasks.filter(tl => tl.id !== action.taskId)}
                    } else {
                        return tl
                    }
                })
            };

        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.updatedTask}
                                } else {
                                    return t
                                }
                            }),
                        }
                    } else {
                        return tl
                    }
                })
            };

        default:
            return state;
    }
};

// ----------- INTERFACE FOR ACTION CREATORS -----------

interface ISetTodolist {
    type: typeof SET_TODOLIST
    todolists: Array<ITodolist>
}

interface IAddTodolist {
    type: typeof ADD_TODOLIST
    newTodolist: ITodolist
}

interface IRemoveTodolist {
    type: typeof REMOVE_TODOLIST
    todolistId: string
}

interface ISetTask {
    type: typeof SET_TASKS
    tasks: Array<ITask>
    todolistId: string
}

interface IChangeTodolistTitle {
    type: typeof CHANGE_TODOLIST_TITLE
    todolistId: string
    newTitle: string
}

interface IAddTask {
    type: typeof ADD_TASK
    todolistId: string
    newTask: ITask
}

interface IRemoveTask {
    type: typeof REMOVE_TASK
    todolistId: string
    taskId: string
}

interface IChangeTask {
    type: typeof CHANGE_TASK
    todolistId: string
    taskId: string
    updatedTask: ITask
}

type TodolistsReducerActionTypes =
    ISetTodolist
    | IAddTodolist
    | IRemoveTodolist
    | ISetTask
    | IChangeTodolistTitle
    | IAddTask
    | IRemoveTask
    | IChangeTask

// ----------- ACTION CREATORS -----------

export const setTodolistAc = (todolists: Array<ITodolist>): ISetTodolist => {
    return {type: SET_TODOLIST, todolists}
};

export const addTodolistAC = (newTodolist: ITodolist): IAddTodolist => {
    return {type: ADD_TODOLIST, newTodolist}
};

export const removeTodolistAC = (todolistId: string): IRemoveTodolist => {
    return {type: REMOVE_TODOLIST, todolistId}
};

export const setTaskAC = (tasks: Array<ITask>, todolistId: string): ISetTask => {
    return {type: SET_TASKS, tasks, todolistId}
};

export const addTaskAC = (todolistId: string, newTask: ITask): IAddTask => {
    return {type: ADD_TASK, todolistId, newTask}
};

export const updateTaskAC = (todolistId: string, taskId: string, updatedTask: ITask): IChangeTask => {
    return {type: CHANGE_TASK, todolistId, taskId, updatedTask}
};

export const removeTaskAC = (todolistId: string, taskId: string): IRemoveTask => {
    return {type: REMOVE_TASK, todolistId, taskId}
};

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): IChangeTodolistTitle => {
    return {type: CHANGE_TODOLIST_TITLE, todolistId, newTitle}
};

// ----------- TYPE FOR THUNK CREATORS -----------
/*
type IGetTodolistsTC = (todolists: ITodolist) => ThunkAction<void, AppStateType, null, Action>
type IAddTodolistsTC = (newTodolist: string) => ThunkAction<void, AppStateType, null, Action>
type IChangeTodolistTitleTC = (todolistId: string, newTitle: string) => ThunkAction<void, AppStateType, null, Action>
type IGetTasksTC = (taskId: string) => ThunkAction<void, AppStateType, null, Action>
type IAddTasksTC = (todolistId: string, newTask: string) => ThunkAction<void, AppStateType, null, Action>
type IupdateTaskTC = (todolistId: string, taskId: string, updatedTask: ITask) => ThunkAction<void, AppStateType, null, Action>
type IRemoveTodolistTC = (todolistId: string) => ThunkAction<void, AppStateType, null, Action>
type IRemoveTaskTC = (todolistId: string, taskId: string) => ThunkAction<void, AppStateType, null, Action>
*/

// ----------- THUNK CREATORS -----------
/*
export const getTodolistsTC: IGetTodolistsTC = () => {
    return (dispatch) => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodolistAc(res.data))
            })
    }
};

export const addTodolistTC: IAddTodolistsTC = (newTodolist: string) => {
    return (dispatch) => {
        api.addTodoList(newTodolist)
            .then(res => {
                let newTodolist = res.data.data.item;
                dispatch(addTodolistAC(newTodolist))
            })
    };
};

export const changeTodolistTitleTC: IChangeTodolistTitleTC = (todolistId: string, newTitle: string) => {
    return (dispatch) => {
        api.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            })
    }
};

export const getTasksTC: IGetTasksTC = (taskId: string) => {
    return (dispatch) => {
        api.getTasks(taskId)
            .then(res => {
                let allTasks = res.data.items;
                dispatch(setTaskAC(allTasks, taskId));
            })
    }
};

export const addTaskTC: IAddTasksTC = (todolistId: string, newTask: string) => {
    return (dispatch) => {
        api.addItem(todolistId, newTask)
            .then(res => {
                let newTitle = res.data.data.item;
                dispatch(addTaskAC(todolistId, newTitle))
            });
    }
};

export const updateTaskTC: IupdateTaskTC = (todolistId: string, taskId: string, updatedTask: ITask) => {
    return (dispatch) => {
        api.changeTask(todolistId, taskId, updatedTask)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, updatedTask))
            })
    }
};

export const removeTodolistTC: IRemoveTodolistTC = (todolistId: string) => {
    return (dispatch) => {
        api.removeTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
};

export const removeTaskTC: IRemoveTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch) => {
        api.removeTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
};
*/

export const getTodolistsTC: Function = () => {
    return (dispatch: Dispatch) => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodolistAc(res.data))
            })
    }
};

export const addTodolistTC: Function = (newTodolist: string) => {
    return (dispatch: Dispatch) => {
        api.addTodoList(newTodolist)
            .then(res => {
                let newTodolist = res.data.data.item;
                dispatch(addTodolistAC(newTodolist))
            })
    };
};

export const changeTodolistTitleTC: Function = (todolistId: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        api.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            })
    }
};

export const getTasksTC: Function = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items;
                dispatch(setTaskAC(allTasks, todolistId));
            })
    }
};

export const addTaskTC: Function = (todolistId: string, newTask: string) => {
    return (dispatch: Dispatch) => {
        api.addItem(todolistId, newTask)
            .then(res => {
                let newTitle = res.data.data.item;
                dispatch(addTaskAC(todolistId, newTitle))
            });
    }
};

export const updateTaskTC: Function = (todolistId: string, taskId: string, updatedTask: ITask) => {
    return (dispatch: Dispatch) => {
        api.changeTask(todolistId, taskId, updatedTask)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, updatedTask))
            })
    }
};

export const removeTodolistTC: Function = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.removeTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
};

export const removeTaskTC: Function = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.removeTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
};

export default reducer;
