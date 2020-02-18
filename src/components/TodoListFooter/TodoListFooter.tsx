import React from 'react';
import './../../App.css';

interface IProps {
    filterValue: string
    changeFilter: (value: string) => void
}

class TodoListFooter extends React.Component<IProps> {

    state = {
      isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    };
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    };

    onShowFiltersClick = () => {
        this.setState({isHidden: true})
    };
    onHideFiltersClick = () => {
        this.setState({isHidden: false})
    };

    render () {

        let classForAll = this.props.filterValue === "All" ? "active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "active" : "";
        let classForActive = this.props.filterValue === "Active" ? "active" : "";

        return (
            <div className="todoList-footer">

                {!this.state.isHidden && <button onClick={this.onShowFiltersClick}>hide</button>}
                {this.state.isHidden && <button onClick={this.onHideFiltersClick}>show</button>}

                {!this.state.isHidden && <div className='filter-buttons'>
                    <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                </div>}



            </div>
        );
    }
}

export default TodoListFooter;