const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String
});
const User = mongoose.model('Users', userSchema);


const {readJsonFromFile, writeJsonToFile} = require("./fs-utils");

const getUsers = (search) => {
    if (!search)
    return User.find();
    else return User.find({firstName: new RegExp(search)})
};
const getUser = (userId) => {
    return User.find({_id: userId})
};
const updateUser = (userId, newName) => {
    return User.update({_id: userId}, {firstName: newName})
};
const deleteUser = (id) => {
    return User.deleteOne({_id: id});
};
const addUser = async (firstName) => {
    const user = new User({firstName});
    return user.save()
    // let users = await getUsers();
    // let newUser = {
    //     id: users.length + 1,
    //     firstName: name,
    // };
    // return writeJsonToFile("db",[...users, newUser])
};

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;