import Todo from "./Todo";

export const todosRepository = {
    async getTodos(search) {
        let result = await Todo.find();
        if (search) {
            result = await Todo.find({_id: new RegExp(search)});
        }
        return new Promise((resolve, reject) => {
            resolve(
                {
                    count: +result.length,
                    todos: result.map((todo) => {
                        return {
                            id: todo.id,
                            title: todo.title,
                            value: todo.value,
                            status: todo.status,
                            isDone: todo.isDone,
                        }
                    })
                }
            )
        })
    },

    async getTodo(search) {
        let todo = await Todo.find({_id: search});
        if (todo[0]?.id) {
            let found = todo[0];
            return new Promise((resolve, reject) => {
                resolve(
                    {
                        id: found.id,
                        title: found.title,
                        value: found.value,
                        status: todo.status,
                        isDone: found.isDone,
                    }
                )
            })
        } else {
            throw new Error('Nothing Found.')
        }
    },

    async addTodo(todo) {
        const newTodo = new Todo({
            title: todo.title,
            value: todo.value,
            status: todo.status,
            isDone: todo.isDone,
        });
        let result = await newTodo.save();
        return new Promise(((resolve, reject) => resolve
        ({
            id: result.id,
            title: result.title,
            value: result.value,
            status: todo.status,
            isDone: result.isDone,
        })))
    },

    async updateTodo(newTodo) {
        return await Todo.update({_id: newTodo.id}, newTodo)
    },

    async deleteTodo(todoId) {
        return Todo.deleteOne({_id: todoId});
    },
};