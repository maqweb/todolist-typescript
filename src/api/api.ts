import axios from "axios";
import {ITask} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
});

export const api = {
    getTodolists() {
        return instance.get(``)
    },
    getTasks(todolistId: string) {
        return instance.get(`${todolistId}/tasks`)
    },
    addTodoList(newTitle: string) {
        return instance.post(``, {title: newTitle})
    },
    addItem(todolistId: string, newTitle: string) {
        return instance.post(`${todolistId}/tasks`, {title: newTitle})
    },
    removeTodolist(todolistId: string) {
        return instance.delete(`${todolistId}`)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete(`${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId: string, taskId: string, updatedTask: ITask) {
        return instance.put(`${todolistId}/tasks/${taskId}`, updatedTask)
    },
    changeTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put(`${todolistId}`, {title: newTitle})
    }
};