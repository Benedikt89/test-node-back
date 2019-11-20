const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String
});
const User = mongoose.model('Users', userSchema);


const {readJsonFromFile, writeJsonToFile} = require("./fs-utils");

const getUsers = () => {
    return User.find();
};

const addUser = async (firstName) => {
    const user = new User({firstName});
    return user.save()
    //
    // let users = await getUsers();
    // let newUser = {
    //     id: users.length + 1,
    //     firstName: name,
    // };
    // return writeJsonToFile("db",[...users, newUser])
};

exports.getUsers = getUsers;
exports.addUser = addUser;