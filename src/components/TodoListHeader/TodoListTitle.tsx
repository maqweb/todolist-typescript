import React, {ChangeEvent} from 'react';
import '../../App.css'
import delIcon from './../../assets/trash.svg'

interface IProps {
    id: string
    title: string
    onRemoveTodolist: () => void
    onChangeTodolistTitle: (todolistId: string, newTitle: string) => void
}

// interface IState {
//     editMode: boolean
//     title: string
// }


class TodoListTitle extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.onChangeTodolistTitle(this.props.id, this.state.title)
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    render = () => {
        return (
                <div className="todolist-title">
                    {this.state.editMode
                        ? <input value={this.state.title}
                                 className='editTitleInput'
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                                 autoFocus={true} type="text"/>
                        : <h3 className="todoList-header__title"
                              onClick={this.activateEditMode}>{this.state.title}</h3>}

                    <button onClick={this.props.onRemoveTodolist} className="btn btn-title">
                        <img className='del-icon' src={delIcon} alt=""/>
                    </button>
                </div>
        );
    }
}

export default TodoListTitle;
