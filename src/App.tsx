import React from 'react';
import './App.css';
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "./store/reducer";
import {ITodolist} from "./types/types";
import {AppStateType} from "./store/store";
import Todolist from './components/Todolist/Todolist'
import {Dispatch} from 'redux';

interface IProps {
}

interface IMapStateToProps {
    todolists: Array<ITodolist>
}

interface IMapDispatchToProps {
    addTodolist: (newTodolist: string) => void
    getTodolists: () => void
}

class App extends React.Component<IProps & IMapStateToProps & IMapDispatchToProps> {

    componentDidMount(): void {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodolists();
    };

    addTodoList = (newTodolist: string) => {
        this.props.addTodolist(newTodolist);
    };


    render() {
        const todolists = this.props.todolists.map(tl => <Todolist id={tl.id}
                                                                   key={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}/>);

        return (
            <>
                <div className="mainInput">
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
    todolists: state.todolists
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
        addTodolist: (newTodolist: string) => {
            dispatch(addTodolistTC(newTodolist));
        },
        getTodolists: () => {
            dispatch(getTodolistsTC());
        }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;


