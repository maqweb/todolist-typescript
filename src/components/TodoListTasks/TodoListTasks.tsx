import React from "react";
import Task from "./Task/Task";
import {ITask} from "../../types/types";

interface IProps {
    tasks: Array<ITask>
    changeStatus: (taskId: string, status: number) => void
    changeTitle: (taskId: string, newTitle: string) => void
    onRemoveTask: (taskId: string) => void
}

class TodoListTasks extends React.Component<IProps> {

    render = () => {

        const tasksElement = this.props.tasks.map(task => {
            return <Task key={task.id}
                         task={task}
                         changeStatus={this.props.changeStatus}
                         changeTitle={this.props.changeTitle}
                         onRemoveTask={this.props.onRemoveTask}/>
        });

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;
