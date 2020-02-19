export interface ITask {
    addedDate: string
    completed: boolean
    deadline: null
    order: number
    priority: number
    startDate: null
    status: number
    id: string
    title: string
    todolistId: string
    description: null
}

export interface ITodolist {
    addedDate: string
    id: string
    order: number
    title: string
    tasks: Array<ITask>
}

export interface IObjTask {
    title?: string
    status?: number
}
