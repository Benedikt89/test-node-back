import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
    title: {type: String, required: 'Please enter title!'},
    value: {type: String, required: true},
    isDone: {type: Boolean, required: true},
    status: {type: String, required: true},
});

const Todo = mongoose.model('todos', todoSchema);
export default Todo;