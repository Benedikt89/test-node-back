import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  name: {type: String, required: 'Please enter Name!'},
  phone: {type: String, required: 'Please enter Phone!'},
  surname: {type: String, required: 'Please enter Surname!'},
});

const User = mongoose.model('user', userSchema);

export default User;