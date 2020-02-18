import {applyMiddleware, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk'


export type AppStateType = ReturnType<typeof reducer>

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;