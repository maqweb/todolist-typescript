import React, {ChangeEvent} from 'react';
import '../../App.css'


interface IProps {
    addItem: (newTitle: string) => void
}

class AddNewItemForm extends React.Component<IProps> {

    state = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        let newTitle = this.state.title;
        this.setState({title: ''});
        if (newTitle.trim() === '') {
            this.setState({
                error: true
            })
        } else {
            this.props.addItem(newTitle);
            this.setState({
                error: false
            })
        }
    };

    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
            this.setState({
                title: ''
            })
        }
    };

    render = () => {

        let errorClass = this.state.error === true ? 'error' : '';

        return (
            <div className="todoList-newTaskForm">

                <input type="text"
                       onChange={this.onInputChange}
                       onKeyPress={this.onKeyPress}
                       className={`input ${errorClass}`}
                       value={this.state.title}
                       placeholder="New item name"/>

                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;

