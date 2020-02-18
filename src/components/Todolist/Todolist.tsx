import React from 'react';
import './../../App.css';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import TodoListTasks from '../TodoListTasks/TodoListTasks';
import AddNewItemForm from '../TodoListHeader/AddNewItemForm';
import TodoListTitle from "../TodoListHeader/TodoListTitle";
import {connect} from "react-redux";
import {
    updateTaskTC,
    removeTodolistTC,
    removeTaskTC,
    changeTodolistTitleTC,
    addTaskTC,
    getTasksTC
} from "../../store/reducer";
import {IObjTask, ITask} from "../../types/types";
import { Dispatch } from 'redux';

interface IProps {
    id: string
    title: string
    tasks: Array<ITask>
}

interface IMapStateProps {
}

interface IMapDispatchProps {
    getTasks: (todolistId: string) => void
    addTask: (todolistId: string, newTask: string) => void
    changeTask: (todolistId: string, taskId: string, obj: ITask) => void
    removeTodolist: (todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


class Todolist extends React.Component<IProps & IMapStateProps & IMapDispatchProps> {

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [],
        filterValue: "All"
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    restoreState = () => {
        this.props.getTasks(this.props.id);
    };

    addItem = (newTitle: string) => {
        this.props.addTask(this.props.id, newTitle)
    };

    changeStatus = (taskId: string, status: number) => {
        this.onChangeTask(taskId, {status: status})
    };

    changeTitle = (taskId: string, newTitle: string) => {
        this.onChangeTask(taskId, {title: newTitle})
    };

    onChangeTodolistTitle = (todolistId: string, newTitle: string) => {
        this.props.changeTodolistTitle(todolistId, newTitle);
    };

    onChangeTask = (taskId: string, obj: IObjTask) => {

        let task: any = this.props.tasks.find(t => (t.id === taskId)); // ANY REFACTOR !!!

        let updatedTask = {
            addedDate: task.addedDate,
            completed: task.completed,
            deadline: task.deadline,
            order: task.order,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            id: task.id,
            title: task.title,
            todolistId: task.todolistId,

            // title: task.title,
            // description: task.description,
            // completed: task.completed,
            // status: task.status,
            // priority: task.priority,
            // startDate: task.startDate,
            // deadline: task.deadline,

            ...obj
        };

        this.props.changeTask(this.props.id, taskId, updatedTask)
    };

    onRemoveTodolist = () => {
        this.props.removeTodolist(this.props.id);
    };

    onRemoveTask = (taskId: string) => {
        this.props.removeTask(this.props.id, taskId)
    };

    render = () => {

        let {tasks = []} = this.props;

        const getFilterTasks = (tasks: Array<ITask>): Array<ITask> => {
            return tasks.filter(t => {
                    if (this.state.filterValue === 'Active') {
                        return t.status === 0;
                    } else if (this.state.filterValue === 'Completed') {
                        return t.status === 2;
                    } else {
                        return true;
                    }
                }
            )
        };

        return (
            <div className="App">
                <div className="todoList">

                    <div className="todoList-header">
                        <TodoListTitle id={this.props.id}
                                       title={this.props.title}
                                       onRemoveTodolist={this.onRemoveTodolist}
                                       onChangeTodolistTitle={this.onChangeTodolistTitle}/>

                        <AddNewItemForm addItem={this.addItem}/>
                    </div>

                    <TodoListTasks tasks={getFilterTasks(tasks)}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   onRemoveTask={this.onRemoveTask}/>

                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchProps => {
    return {
        getTasks: (todolistId) => {
            const thunk = getTasksTC(todolistId);
            dispatch(thunk);
        },
        addTask: (todolistId: string, newTask: string) => {
            const thunk = addTaskTC(todolistId, newTask);
            dispatch(thunk);
        },
        changeTask: (todolistId: string, taskId: string, obj: ITask) => {
            const thunk = updateTaskTC(todolistId, taskId, obj);
            dispatch(thunk);
        },
        removeTodolist: (todolistId: string) => {
            const thunk = removeTodolistTC(todolistId);
            dispatch(thunk);
        },
        removeTask: (todolistId: string, taskId: string) => {
            const thunk = removeTaskTC(todolistId, taskId);
            dispatch(thunk);
        },
        changeTodolistTitle: (todolistId: string, newTitle: string) => {
            const thunk = changeTodolistTitleTC(todolistId, newTitle);
            dispatch(thunk);
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(Todolist);
export default ConnectedTodolist;